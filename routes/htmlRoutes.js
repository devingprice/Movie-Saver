var omdb = require("../controllers/omdb.controller");

module.exports = function(app) {
  app.get("/", function(req, res) {
    if (req.isAuthenticated()) {
      var user = {
        id: req.session.passport.user,
        isLoggedIn: req.isAuthenticated()
      };
      console.log("Authenticated", user);
      res.render("index", user);
    } else {
      console.log("NOT Authenticated");
      res.render("index");
    }
  });

  app.get("/dashboard", isLoggedIn, function(req, res) {
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
    var imdbID = req.params.id;

    omdb.byId(imdbID, function(data) {
      res.render("movie", data);
    });
  });

  app.get("/wishList", function(req, res) {
    if (req.isAuthenticated()) {
      var id = req.session.passport.user;
      console.log("Authenticated", { id });

      res.render("wishList", { id }); //wishlist will request data from /api/wishList
    } else {
      console.log("NOT Authenticated");
      res.redirect("/signin"); //could make it display a placeholder
    }
  });

  app.get("/watchedList", function(req, res) {
    if (req.isAuthenticated()) {
      var id = req.session.passport.user;
      console.log("Authenticated", { id });

      res.render("watchedList", { id }); //watchedList will request data from /api/watchedList
    } else {
      console.log("NOT Authenticated");
      res.redirect("/signin"); //could make it display a placeholder
    }
  });

  app.get("/search/:title/:type?", function(req, res) {
    var title = req.params.title;
    var type = req.params.type || "movie";

    omdb.search(title, type, function(data) {
      res.render("search", data);
    });
  });

  app.get("*", function(req, res) {
    res.render("404");
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next;
  }
  res.redirect("/signin");
}
