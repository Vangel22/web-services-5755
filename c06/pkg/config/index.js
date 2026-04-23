const fs = require("fs");

const CONFIG_SOURCE = `${__dirname}/../../config.json`;
// c04/pkg/config -> __dirname, ../ -> pkg ../ -> c04

let config = null;

if (config === null) {
  const file = fs.readFileSync(CONFIG_SOURCE, "utf-8");
  config = JSON.parse(file);

  //  Config file: {
  //   development: {
  //     port: 3000,
  //     MONGO_USERNAME: 'Your_username',
  //     MONGO_PASSWORD: 'Your_password',
  //     jwt_secret: 'Your_secret'
  //   },
  //   staging: { port: 3000, MONGO_USERNAME: 'test', MONGO_PASSWORD: 'test' },
  //   live: { port: 8080, MONGO_USERNAME: 'admin', MONGO_PASSWORD: 'admin' }
  // }
}

const getSection = (section) => {
  // config e objekt
  // config.development - no nie znaeme deka postoi development objektot vo config

  if (!config[section]) {
    // ako config["semos"] postoi ova ke bide true
    throw `Configuration section ${section} does not exist!`;
  }

  return config[section];
};

// getSection("semos"); // Configuration section semos does not exist!
// getSection("development"); // ke se vrati development objektot
// {
//  port: 3000,
//  MONGO_USERNAME: "Your_username",
//  MONGO_PASSWORD: "Your_password",
//  jwt_secret: "Your_secret"
// }

module.exports = {
  getSection,
};
