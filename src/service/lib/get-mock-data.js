"use strict";

const fs = require(`fs`).promises;
const FILENAME = `mock.json`;
let data = null;

const getMockData = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.readFile(FILENAME);
    data = JSON.parse(fileContent);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }

  return Promise.resolve(data);
};

module.exports = getMockData;
