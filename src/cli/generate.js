'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {ExitCode} = require(`../constants`);
const {getRandomNumber, randomDate, shuffle} = require(`../utils`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mock.json`;
const MONTH_LIMIT_AGO = 3;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучше рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят. Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов. Он написал больше 30 хитов. Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];

const getStartDate = (date = new Date()) => {
  date.setMonth(date.getMonth() - MONTH_LIMIT_AGO);
  return date;
};

const generateOffers = (count) => {
  return Array(count).fill({}).map(() => ({
    title: TITLES[getRandomNumber(0, TITLES.length - 1)],
    createdDate: randomDate(getStartDate(), new Date()).toLocaleDateString(),
    announce: shuffle(SENTENCES).slice(0, 5).join(` `),
    fullText: shuffle(SENTENCES).slice(0, getRandomNumber(1, SENTENCES.length - 1)).join(` `),
    сategory: shuffle(CATEGORIES).slice(0, getRandomNumber(1, CATEGORIES.length - 1)),
  }));
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    let countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > MAX_COUNT) {
      console.info(`Не больше 1000 публикаций`);
      process.exit(ExitCode.error);
    }

    if (countOffer < DEFAULT_COUNT) {
      countOffer = DEFAULT_COUNT;
    }

    const content = JSON.stringify(generateOffers(countOffer));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.greenBright(`Operation success. File created.`));
    } catch (error) {
      console.info(chalk.redBright(`Can't write data to file...`));
    }
  }
};
