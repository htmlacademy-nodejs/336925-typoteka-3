"use strict";

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll(searchValue) {
    return this._articles.filter((article) => article.title.includes(searchValue));
  }
}

module.exports = SearchService;
