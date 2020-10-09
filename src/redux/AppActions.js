export const setRssData = (payload) => {
  return {
    type: "SET_RSS_DATA",
    payload,
  };
};
export const setActiveArticle = (payload) => {
  return {
    type: "SET_ACTIVE_ARTICLE",
    payload,
  };
};
export const setLoading = (payload) => {
  return {
    type: "SET_LOADING",
    payload,
  };
};
export const pushFeed = (payload) => {
  return {
    type: "PUSH_FEED",
    payload,
  };
};
export const removeFeed = (payload) => {
  return {
    type: "REMOVE_FEED",
    payload,
  };
};
