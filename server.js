require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");
var passport = require("passport");
var session = require("express-session");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Passport
app.use(
  session({ secret: "randomString", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
// var hbs = exphbs.create({
//   helpers: require("./config/handlebarsHelper"),
//   defaultLayout: "main"
// });
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
  // hbs.engine
);
app.set("view engine", "handlebars");

app.use(express.static("public"));

// Routes
require("./routes/apiRoutes")(app, passport);
require("./routes/htmlRoutes")(app, passport);

require("./config/passport")(passport, db.User);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
