var axios = require("axios");
//require("dotenv").config(); // comment out when running through server

var omdbKey = process.env.OMDB_API_KEY;
var urlRoot = "http://www.omdbapi.com/?apikey=" + omdbKey;

var movieDbKey = process.env.MOVIE_DB_API_KEY;
var movieDbUrl = "https://api.themoviedb.org/3/";

var cached = {
  trending: null,
  trendingLastUpdated: null
};

module.exports = {
  search: function(title, type, cb) {
    var requestUrl = urlRoot;
    axios
      .get(requestUrl, {
        params: {
          s: title,
          type: type,
          r: "json"
        }
      })
      .then(response => {
        cb(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  byId: function(imdbID, cb) {
    var requestUrl = urlRoot;
    axios
      .get(requestUrl, {
        params: {
          i: imdbID,
          r: "json",
          plot: "full"
        }
      })
      .then(response => {
        cb(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
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
    if (cached.trending) {
      console.log("used cache");
      cb(cached.trending);
    } else {
      console.log("no cache");
      var requestUrl = movieDbUrl + "trending/movie/week";
      axios
        .get(requestUrl, {
          params: {
            // eslint-disable-next-line camelcase
            api_key: movieDbKey
          }
        })
        .then(response => {
          cb(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  upcoming: function(cb) {
    var requestUrl = movieDbUrl + "movie/upcoming";
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
  nowPlaying: function(cb) {
    var requestUrl = movieDbUrl + "movie/now_playing";
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
  }
};
