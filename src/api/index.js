import Parser from "rss-parser";

const cors = "https://desolate-ocean-10959.herokuapp.com/";
let parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'media', {keepArray: false}],
    ]
  }
})

const feedAPI = {
  async getFeed(feeds) {
    return feeds.map(async (feed) => {
      const res = await parser.parseURL(`${cors}${feed}`);
      return res;
    });
  },
};

export default feedAPI;
