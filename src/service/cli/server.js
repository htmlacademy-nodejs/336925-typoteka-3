"use strict";

const express = require(`express`);
const chalk = require(`chalk`);

const routes = require(`../api`);
const {HttpCode} = require(`../../constants`);

const DEFAULT_PORT = 3000;


const app = express();
app.use(express.json());

app.use(`/api`, routes);

app.use((req, res) => res.status(HttpCode.NOT_FOUND).send(`Not found`));

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, (err) => {
      if (err) {
        return console.error(`Ошибка при создании сервера`, err);
      }

      return console.info(chalk.green(`Сервер запущен на порту ${port}`));
    });
  }
};
