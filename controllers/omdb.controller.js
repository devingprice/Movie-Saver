var axios = require("axios");
//require("dotenv").config(); // comment out when running through server

var omdbKey = process.env.OMDB_API_KEY;
var urlRoot = "http://www.omdbapi.com/?apikey=" + omdbKey;

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
  // search: function(title, type, cb) {
  //   var requestUrl = urlRoot;
  //   axios
  //     .get(requestUrl, {
  //       params: {
  //         s: title,
  //         type: type,
  //         r: "json"
  //       }
  //     })
  //     .then(response => {
  //       cb(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // },
  // byId: function(imdbID, cb) {
  //   var requestUrl = urlRoot;
  //   axios
  //     .get(requestUrl, {
  //       params: {
  //         i: imdbID,
  //         r: "json",
  //         plot: "full"
  //       }
  //     })
  //     .then(response => {
  //       cb(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // },
  searchMovie: function(query, cb) {
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
  movieById: function(id, cb) {
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
  trending: function(cb) {
    var reqPath = "trending/movie/week";
    var varName = "trending";
    requestMovieDbListIfNotCached(varName, reqPath, cb);
  },
  upcoming: function(cb) {
    var reqPath = "movie/upcoming";
    var varName = "upcoming";
    requestMovieDbListIfNotCached(varName, reqPath, cb);
    // var requestUrl = movieDbUrl + "movie/upcoming";
    // axios
    //   .get(requestUrl, {
    //     params: {
    //       // eslint-disable-next-line camelcase
    //       api_key: movieDbKey,
    //       language: "en-US"
    //     }
    //   })
    //   .then(response => {
    //     cb(response.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  },
  nowPlaying: function(cb) {
    var reqPath = "movie/now_playing";
    var varName = "nowPlaying";
    requestMovieDbListIfNotCached(varName, reqPath, cb);
    // var requestUrl = movieDbUrl + "movie/now_playing";
    // axios
    //   .get(requestUrl, {
    //     params: {
    //       // eslint-disable-next-line camelcase
    //       api_key: movieDbKey,
    //       language: "en-US"
    //     }
    //   })
    //   .then(response => {
    //     cb(response.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  },
  topRated: function(cb) {
    var reqPath = "movie/top_rated";
    var varName = "topRated";
    requestMovieDbListIfNotCached(varName, reqPath, cb);
  }
};
