import Parser from "rss-parser";

const cors = "https://desolate-ocean-10959.herokuapp.com/";
const feedURL = "https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss";
const parser = new Parser();

const feedAPI = {
  getFeed() {
    return parser.parseURL(`${cors}${feedURL}`);
  },
};

export default feedAPI;
