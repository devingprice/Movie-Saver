var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
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

  app.get("/search", function(req, res) {
    res.render("search");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
