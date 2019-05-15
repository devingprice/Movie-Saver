var axios = require("axios");
//require("dotenv").config(); // comment out when running through server

var omdbKey = process.env.OMDB_API_KEY;
var urlRoot = "http://www.omdbapi.com/?apikey=" + omdbKey;

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
  }
};
