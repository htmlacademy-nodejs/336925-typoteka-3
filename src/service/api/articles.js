'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const articleExist = require(`../middleware/article-exist`);
const articleValidator = require(`../middleware/article-validator`);
const commentsValidator = require(`../middleware/comments-validator`);

const route = new Router();

module.exports = (app, articleService, commentsService) => {
  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    const articles = await articleService.findAll();

    res.status(HttpCode.OK).json(articles);
  });

  route.get(`/:articleId`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;

    return res.status(HttpCode.OK)
      .json(article);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const article = articleService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(article);
  });

  route.put(`/:articleId`, [articleExist(articleService), articleValidator], (req, res) => {
    const articleId = res.params;
    const article = articleService.update(articleId, req.body);

    return res.status(HttpCode.OK)
      .json(article);
  });

  route.delete(`/:articleId`, (req, res) => {
    const articleId = req.params;
    const article = articleService.drop(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(article);
  });

  route.get(`/:articleId/comments`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;

    const comments = commentsService.findAll(article);

    res.status(HttpCode.OK).json(comments);
  });

  route.post(`/:articleId/comments`, [articleExist(articleService), commentsValidator], (req, res) => {
    const {article} = res.locals;
    const newComment = commentsService.create(article, req.body);

    return res.status(HttpCode.CREATED)
      .json(newComment);
  });

  route.delete(`/:articleId/comments/:commentId`, articleExist(articleService), (req, res) => {
    const {commentId} = req.params;
    const {article} = res.locals;

    const deletedComment = commentsService.drop(article, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(deletedComment);
  });
};
