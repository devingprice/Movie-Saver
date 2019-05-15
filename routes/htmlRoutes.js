var db = require("../models");
var omdb = require("../controllers/omdb.controller");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    console.log("Got index route");
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
    db.Movie.findOne({ where: { id: req.params.id } }).then(function(dbMovie) {
      res.render("movie", {
        movie: dbMovie
      });
    });
  });

  app.get("/wishList", function(req, res) {
    res.render("wishList");
  });

  app.get("/watchedList", function(req, res) {
    res.render("watchedList");
  });

  app.get("/search/:title/:type?", function(req, res) {
    var title = req.params.title;
    var type = req.params.type || "movie";

    omdb.search(title, type, function(data) {
      res.render("search", data);
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next;
  }
  res.redirect("/register");
}
