const {
  getCityWeather,
  getFiveDaysForecastForCity,
} = require("../pkg/openweathermap");

const getForCity = async (req, res) => {
  try {
    const weather = await getCityWeather(req.params.city);
    return res.status(200).send(weather);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal sever error!");
  }
};

const getFiveDayForecast = async (req, res) => {
  try {
    const { lat, lon } = req.params;
    const forecast = await getFiveDaysForecastForCity(lat, lon);

    return res.status(200).send(forecast);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal sever error!");
  }
};

// https://api.openweathermap.org/data/2.5/weather?lat=41&lon=21&appid=
// Napravete funkcija koja ke cita lon, lat za nekoj makedonski grad

const getCityWeatherLonLat = async (req, res) => {
  // dopolni so getCityWeatherByLongitudeAndLatitude
};

module.exports = {
  getForCity,
  getFiveDayForecast,
  getCityWeatherLonLat,
};
