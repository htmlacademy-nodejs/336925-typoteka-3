'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class CommentsService {
  findAll(article) {
    return article.comments;
  }

  create(article, comment) {
    const newComment = Object.assign({id: nanoid(MAX_ID_LENGTH)}, comment);
    article.comments.push(newComment);
    return newComment;
  }

  drop(article, commentId) {
    const dropComment = article.comments
      .find((item) => item.id === commentId);

    if (!dropComment) {
      return null;
    }

    article.comments = article.comments
      .filter((item) => item.id !== commentId);

    return dropComment;
  }
}

module.exports = CommentsService;
