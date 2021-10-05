"use strict";

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/search`, route);

  route.get(`/`, (req, res) => {
    const {query} = req.query;

    const articles = service.findAll(query);
    res.status(HttpCode.OK)
      .json(articles);
  });
};
