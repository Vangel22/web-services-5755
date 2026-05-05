const express = require("express");

const { getSection } = require("./pkg/config/index");
const { getForCity, getFiveDayForecast } = require("./handlers/weather");

const app = express();

// Ruti za openweathermap
app.get("/api/weather/:city", getForCity);
app.get("/api/forecast/:lat/:lon", getFiveDayForecast);
// nova ruta tuka

app.listen(getSection("weather").port, () => {
  console.log(`Server started at port ${getSection("weather").port}`);
});
