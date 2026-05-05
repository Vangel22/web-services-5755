const config = require("../config");

const CACHE = {};

// CACHE = {
//     skopje: {
//         timestamp: 1234567,
//         data: {}
//     }
// }

// CACHE.skopje.data -> pristap do podatocite na gradot
// CACHE["skopje"].data

// getCityWeather("Skopje") -> Fri 13 Sep 20:12 -> se zema od openweatherapi
// getCityWeather("Skopje") -> Fri 13 Sep 20:13 -> se zema od cache
// getCityWeather("Strumica") -> Fri 13 Sep 20:12 -> se zema od openweatherapi
// getCityWeather("Stip") -> Fri 13 Sep 20:12 -> se zema od openweatherapi
// getCityWeather("Strumica") -> Fri 13 Sep 20:13 -> se zema od cache
// getCityWeather("Strumica") -> Fri 13 Sep 21:13 -> se zema od openweatherapi (eden chas podocna, istekol periodot za validen cache)

const getCityWeather = async (city) => {
  // new Date().getTime() - vremeto od 1 Jan 1970 vo milisekundi
  let now = new Date().getTime() / 1000; // 1 Jan 1970 (Unix) - vo sekundi vo vremeto na povikuvanje na funkcijata
  console.log("CACHE", CACHE); // vnimavajte koga se pecati ovaa linija, samo koga se povikuva funkcijata getCityWeather

  // 1. CACHE = {}
  // 2. CACHE = { skopje: { timestamp: 1778005982.503 } }
  // 3. CACHE = { skopje: { timestamp: 1778005982.503 } } -> no podatokot se zema od openweatherapi
  //   posle 60 sekundi: 1778006076.128
  // 4. CACHE = { skopje: { timestamp: 1778006076.128 } } -> podatokot se zema od CACHE

  // timestamp e vremeto vo momentot koga sme pobarale informacija za nekoj grad

  // CACHE["skopje"].timestamp e 20:12
  // config.getSection("weather").cache_expiery e 30min
  // CACHE za gradot skopje e validen do 20:42

  // "now" e momentalnoto vreme na pobaruvanje na podatokot za gradot skopje
  // ako chasot e 20:19 - dali CACHE["skopje"] e validno? Da validen e.

  if (
    CACHE[city] &&
    now < CACHE[city].timestamp + config.getSection("weather").cache_expiery
  ) {
    return CACHE[city];
  }

  const URL = `${
    config.getSection("weather").API_URL
  }/weather?q=${city}&units=metric&appid=${config.getSection("weather").api_key}`;

  // https://api.openweathermap.org/data/2.5/weather?q=Skopje&units=metric&appid=12345

  try {
    const res = await fetch(URL);
    const data = await res.json();

    CACHE[city] = {
      timestamp: new Date().getTime() / 1000,
      data: data,
    };

    return data;
  } catch (err) {
    throw err;
  }
};

const getFiveDaysForecastForCity = async (lat, lon) => {
  const URL = `${config.getSection("weather").API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${config.getSection("weather").api_key}`;

  try {
    const res = await fetch(URL);
    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
};

const getCityWeatherByLongitudeAndLatitude = () => {};

module.exports = {
  getCityWeather,
  getFiveDaysForecastForCity,
  getCityWeatherByLongitudeAndLatitude,
};
