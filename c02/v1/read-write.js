const fs = require("fs");

const read = async (fileName) => {
  return new Promise((resolve, reject) => {
    // resolve, reject se callback funkcii
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) reject(err);
      data = JSON.parse(data);
      resolve(data);
    });
  });
};

const write = async (fileName, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) reject(err);
      // catch delot, vo then().catch() ili pak so async/await try{}catch(err){}
      resolve();
      // then delot ili ako koristime async/await, ke si pomina na naredna linija
    });
  });
};

module.exports = {
  read,
  write,
};
