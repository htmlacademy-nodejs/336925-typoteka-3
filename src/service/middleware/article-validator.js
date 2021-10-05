"use strict";

const {HttpCode} = require(`../../constants`);

const articleKeys = [`title`, `announce`, `fullText`, `сategory`];

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keyExist = articleKeys.every((key) => keys.includes(key));

  if (!keyExist) {
    res.status(HttpCode.BAD_REQUEST)
      .send(`BAD_REQUEST`);
  }

  next();
};
