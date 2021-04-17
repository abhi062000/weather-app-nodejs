var requests = require("requests");
require("dotenv").config();

const apiKey = process.env.API_KEY;

const getWeatherData = (city, callback) => {
  const cityName = encodeURIComponent(city);
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  requests(url)
    .on("data", function (chunk) {
      var data = JSON.parse(chunk);
      if (data.cod == 404)
        return callback("Unable to find location", undefined);
      return callback(undefined, data);
    })
    .on("end", function (err) {
      if (err) return callback(err, undefined);
    });
};

module.exports = getWeatherData;
