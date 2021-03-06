const getWeatherData = require("../utils/weatherData");
const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Andrew Mead",
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  getWeatherData(
    req.query.address,
    (err, { main, weather, name, sys } = {}) => {
      if (err) {
        return res.send({ err });
      } else {
        return res.send({
          main: main,
          name: name,
          weather: weather[0].description,
          country: sys.country,
        });
      }
    }
  );
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port 3000.");
});
