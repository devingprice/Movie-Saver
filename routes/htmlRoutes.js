var omdb = require("../controllers/omdb.controller");

module.exports = function(app) {
  app.get("/", function(req, res) {
    var user = null;
    if (req.isAuthenticated()) {
      user = {
        userid: req.session.passport.user,
        isLoggedIn: req.isAuthenticated()
      };
      console.log("Authenticated", user);
    } else {
      console.log("NOT Authenticated");
    }

    var results = {};
    if (user) {
      results.isLoggedIn = user.isLoggedIn;
    }

    omdb.trending(function(trendingData) {
      results.trending = trendingData;

      omdb.nowPlaying(function(nowPlayingData) {
        results.nowPlaying = nowPlayingData;

        omdb.topRated(function(topRatedData) {
          results.topRated = topRatedData;

          omdb.upcoming(function(upcomingData) {
            results.upcoming = upcomingData;

            res.render("index", results);
          });
        });
      });
    });
  });

  app.get("/dashboard", redirectIfNotLoggedIn, function(req, res) {
    res.render("dashboard");
  });

  app.get("/register", function(req, res) {
    res.render("register");
  });

  app.get("/signin", function(req, res) {
    res.render("signin");
  });

  app.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
      console.log(err);
      res.redirect("/");
    });
  });

  app.get("/movie/:id", function(req, res) {
    var movieDbId = req.params.id;

    omdb.movieById(movieDbId, function(data) {
      console.log(data);
      if (req.isAuthenticated()) {
        data.userid = req.session.passport.user;
        data.isLoggedIn = req.isAuthenticated();
      }
      // eslint-disable-next-line camelcase
      data.release_date = data.release_date.substring(0, 4);
      res.render("movie", data);
    });
  });

  app.get("/wishList", function(req, res) {
    if (req.isAuthenticated()) {
      var user = {
        userid: req.session.passport.user,
        isLoggedIn: req.isAuthenticated()
      };
      console.log("Authenticated", user);

      res.render("wishList", user); //wishlist will request data from /api/wishList
    } else {
      console.log("NOT Authenticated");
      res.redirect("/signin"); //could make it display a placeholder
    }
  });

  app.get("/watchedList", function(req, res) {
    if (req.isAuthenticated()) {
      var user = {
        userid: req.session.passport.user,
        isLoggedIn: req.isAuthenticated()
      };
      console.log("Authenticated", user);

      res.render("watchedList", user); //watchedList will request data from /api/watchedList
    } else {
      console.log("NOT Authenticated");
      res.redirect("/signin"); //could make it display a placeholder
    }
  });

  app.get("/search/:title?", function(req, res) {
    var title = req.params.title;
    var searchTerm = req.query.q || title;

    omdb.searchMovie(searchTerm, function(data) {
      console.log(data);
      if (data.results.length > 0) {
        data.hasResults = true;
      }
      if (req.isAuthenticated()) {
        data.userid = req.session.passport.user;
        data.isLoggedIn = req.isAuthenticated();
        console.log("is logged in ");
      }

      data.results.forEach(element => {
        if (element.poster_path === "") {
          // eslint-disable-next-line camelcase
          element.poster_path = false;
        }
      });
      res.render("search", data);
    });
  });

  app.get("*", function(req, res) {
    if (req.isAuthenticated()) {
      isLoggedIn = req.isAuthenticated();
      res.render("404", { isLoggedIn });
    } else {
      res.render("404");
    }
  });
};

function redirectIfNotLoggedIn(req, res, next) {
  console.log("is logged function");
  if (req.isAuthenticated()) {
    console.log("is authed | next");
    return next;
  } else {
    console.log("not authed | signin");
    res.redirect("/signin");
  }
}
