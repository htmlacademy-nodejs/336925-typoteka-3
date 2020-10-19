"use strict";

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {ExitCode} = require(`../../constants`);
const {getRandomNumber, randomDate, shuffle} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mock.json`;
const MONTH_LIMIT_AGO = 3;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf-8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const getStartDate = (date = new Date()) => {
  date.setMonth(date.getMonth() - MONTH_LIMIT_AGO);
  return date;
};

const generateOffers = (count, titles, categories, sentences) => {
  return Array(count)
    .fill({})
    .map(() => ({
      title: titles[getRandomNumber(0, titles.length - 1)],
      createdDate: randomDate(getStartDate(), new Date()).toLocaleDateString(),
      announce: shuffle(sentences)
        .slice(0, 5)
        .join(` `),
      fullText: shuffle(sentences)
        .slice(0, getRandomNumber(1, sentences.length - 1))
        .join(` `),
      сategory: shuffle(categories).slice(0, getRandomNumber(1, categories.length - 1))
    }));
};

module.exports = {
  name: `--generate`,
  run(args) {
    const sentencesPromise = readContent(FILE_SENTENCES_PATH);
    const titlesPromise = readContent(FILE_TITLES_PATH);
    const categoriesPromise = readContent(FILE_CATEGORIES_PATH);

    const promiseMocks = Promise.all([
      sentencesPromise,
      titlesPromise,
      categoriesPromise
    ]);

    const [count] = args;
    let countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > MAX_COUNT) {
      console.info(`Не больше 1000 публикаций`);
      process.exit(ExitCode.error);
    }

    if (countOffer < DEFAULT_COUNT) {
      countOffer = DEFAULT_COUNT;
    }

    promiseMocks
      .then(([sentences, titles, categories]) =>
        JSON.stringify(
            generateOffers(countOffer, titles, categories, sentences)
        )
      )
      .then(async (content) => {
        try {
          await fs.writeFile(FILE_NAME, content);
          console.info(chalk.greenBright(`Operation success. File created.`));
        } catch (error) {
          console.info(chalk.redBright(`Can't write data to file...`));
        }
      });
  }
};
