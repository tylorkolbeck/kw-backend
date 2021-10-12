const axios = require("axios");
let Parser = require("rss-parser");
let parser = new Parser();

module.exports = {
  getKucoinNews: async (ctx) => {
    let feed = await parser.parseURL("https://www.kucoin.com/rss/news?lang=en");
    return feed;
  },
};
