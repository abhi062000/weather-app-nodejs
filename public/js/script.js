const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const loading = document.querySelector("#loading");
const temp = document.querySelector("#temp");
const weather = document.querySelector("#weather");
const country = document.querySelector("#country");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  loading.textContent = "Loading...";
  weather.textContent = "";
  temp.textContent = "";
  country.textContent = "";

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.err) {
        loading.textContent = data.err;
      } else {
        loading.textContent = "";
        temp.textContent = "Temperature : " + data.main.temp + " Celsius";
        weather.textContent = "Weather : " + data.weather;
        country.textContent = "Country : " + data.country;
      }
    });
  });
});
