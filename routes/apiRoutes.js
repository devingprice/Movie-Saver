var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  //WATCHEDLIST

  //Get all examples
  app.get("/api/watchedlist", function(req, res) {
    db.WatchedList.findAll({}).then(function(dbWatchedList) {
      res.json(dbWatchedList);
    });
  });

  // Create a new example
  app.post("/api/watchedList", function(req, res) {
    db.WatchedList.create(req.body).then(function(dbWatchedList) {
      res.json(dbWatchedList);
    });
  });

  // Delete an example by id
  app.delete("/api/watchedList/:id", function(req, res) {
    db.WatchedList.destroy({ where: { id: req.params.id } }).then(function(dbWatchedList) {
      res.json(dbWatchedList);
    });
  });

  //WISHLIST

  //Get all examples
  app.get("/api/wishlist", function(req, res) {
    db.WishList.findAll({}).then(function(dbWishList) {
      res.json(dbWishList);
    });
  });

  // Create a new example
  app.post("/api/wishList", function(req, res) {
    db.WishList.create(req.body).then(function(dbWishList) {
      res.json(dbWishList);
    });
  });

  // Delete an example by id
  app.delete("/api/wishList/:id", function(req, res) {
    db.WishList.destroy({ where: { id: req.params.id } }).then(function(dbWishList) {
      res.json(dbWishList);
    });
  });
};
