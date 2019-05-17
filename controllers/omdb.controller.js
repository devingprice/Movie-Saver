var axios = require("axios");

var movieDbKey = process.env.MOVIE_DB_API_KEY;
var movieDbUrl = "https://api.themoviedb.org/3/";

var cached = {
  trending: null,
  trendingLastUpdated: null,
  topRated: null,
  topRatedLastUpdated: null,
  upcoming: null,
  upcomingLastUpdated: null,
  nowPlaying: null,
  nowPlayingLastUpdated: null
};

var dayInMs = 1000 * 60 * 60 * 24;

function requestMovieDbListIfNotCached(varName, reqPath, cb) {
  if (
    cached[varName] !== null &&
    cached[varName + "LastUpdated"] !== null &&
    Date.now() - cached[varName + "LastUpdated"] < dayInMs
  ) {
    console.log("used cache");
    cb(cached[varName]);
  } else {
    console.log("no cache");
    var requestUrl = movieDbUrl + reqPath;
    axios
      .get(requestUrl, {
        params: {
          // eslint-disable-next-line camelcase
          api_key: movieDbKey,
          language: "en-US"
        }
      })
      .then(response => {
        var data = response.data;
        if (data.results.length > 0) {
          data.hasResults = true;
        }
        cached[varName] = data;
        cached[varName + "LastUpdated"] = Date.now();

        cb(data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

module.exports = {
  searchMovie: function (query, cb) {
    var requestUrl = movieDbUrl + "search/movie";
    axios
      .get(requestUrl, {
        params: {
          // eslint-disable-next-line camelcase
          api_key: movieDbKey,
          language: "en-US",
          // eslint-disable-next-line camelcase
          include_adult: "false",
          query: query
        }
      })
      .then(response => {
        cb(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  movieById: function (id, cb) {
    var requestUrl = movieDbUrl + "movie/" + id;
    axios
      .get(requestUrl, {
        params: {
          // eslint-disable-next-line camelcase
          api_key: movieDbKey,
          language: "en-US"
        }
      })
      .then(response => {
        cb(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  trending: function (cb) {
    var reqPath = "trending/movie/week";
    var varName = "trending";
    requestMovieDbListIfNotCached(varName, reqPath, cb);
  },
  upcoming: function (cb) {
    var reqPath = "movie/upcoming";
    var varName = "upcoming";
    requestMovieDbListIfNotCached(varName, reqPath, cb);
  },
  nowPlaying: function (cb) {
    var reqPath = "movie/now_playing";
    var varName = "nowPlaying";
    requestMovieDbListIfNotCached(varName, reqPath, cb);
  },
  topRated: function (cb) {
    var reqPath = "movie/top_rated";
    var varName = "topRated";
    requestMovieDbListIfNotCached(varName, reqPath, cb);
  }
};

// This route then hands the data it receives to handlebars so index can be rendered.
// router.get('/', function (req, res) {
//   db.Movie.findAll({
//     order: 'movie_name ASC'

//   }).then(function (data) {
//     var hbsObject = {
//       movies: data
//     };
//     res.render('index', hbsObject);
//   });
// });

// router.get('/year', function (req, res) {
//   db.Movie.findAll({
//     order: 'movie_year DESC'

//   }).then(function (data) {
//     var hbsObject = {
//       movies: data
//     };
//     res.render('index', hbsObject);
//   });
// });

// router.get('/rating', function (req, res) {
//   db.Movie.findAll({
//     order: 'movie_ratingImdb DESC'

//   }).then(function (data) {
//     var hbsObject = {
//       movies: data
//     };
//     res.render('index', hbsObject);
//   });
// });

// // testing trailer 
// request(queryUrl, function (error, response, body) {


//   if (!error && JSON.parse(body).Response !== 'False') {
//     console.log(JSON.parse(body));

//     var imdbId = JSON.parse(body).imdbID;

//     console.log(imdbId);

//     var videos = "";

//     var options = {
//       method: 'GET',
//       url: 'https://api.themoviedb.org/3/movie/' + imdbId + '/videos',
//       body: '{}'
//     };

//     request(options, function (error, response, result) {

//       if (error) res.redirect('/');


//       // if (error) {
//       //     alert("Seems to be a problem with your input. Please try again");
//       //     //res.redirect('/');
//       // } else {
//       if (!JSON.parse(result).results) {
//         // res.send('SOMETHING WENT WRONG');
//         res.redirect('/')
//       } else {
//         videos = JSON.parse(result).results[0].key;
//         console.log(videos);
//         db.Movie.create({
//           movie_name: JSON.parse(body).Title,
//           movie_poster: JSON.parse(body).Poster,
//           movie_genre: JSON.parse(body).Genre,
//           movie_time: JSON.parse(body).Runtime,
//           movie_plot: JSON.parse(body).Plot,
//           movie_director: JSON.parse(body).Director,
//           movie_actors: JSON.parse(body).Actors,
//           movie_year: JSON.parse(body).Year,
//           movie_trailer: videos,
//           movie_ratingImdb: JSON.parse(body).Ratings[0].Value,
//           movie_ratingRotten: JSON.parse(body).Ratings[1].Value

//         }).then(function () {
//           res.redirect('/');
//         });

//       }
//     });

//   } else {
//     console.log("Oops...something went wrong with you movie search. Try again...");
//     res.redirect('/');
//   }
// });

// // Deleting a movie

// router.delete('/api/new/delete/:id', function (req, res) {

//   var ID = req.params.id;

//   db.Movie.destroy({
//     where: { id: ID }
//   }).then(function () {
//     res.redirect('/');
//   });
// });

// // Export routes for server.js.
// module.exports = router;