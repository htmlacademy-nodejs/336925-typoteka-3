'use strict';

const {Router} = require(`express`);

const articlesRouter = new Router();

articlesRouter.get(`/category/:id`, (req, res) => res.render(`admin/admin-categories`));
articlesRouter.get(`/add`, (req, res) => res.render(`post/new-post`));
articlesRouter.get(`/edit/:id`, (req, res) => res.render(`post/new-post`));
articlesRouter.get(`/:id`, (req, res) => res.render(`post/post-user`));

module.exports = articlesRouter;
