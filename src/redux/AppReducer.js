const INITIAL_STATE = {
  rssData: [],
  activeArticle: undefined,
  feeds: [
    "https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss"
  ],
};

function AppReducer(state = INITIAL_STATE, { payload, type }) {
  switch (type) {
    case "SET_RSS_DATA":
      if (payload === null) {
        return {
          ...state,
          rssData: [],
        };
      }
      return {
        ...state,
        rssData: state.rssData.concat(payload),
      };
    case "SET_ACTIVE_ARTICLE":
      return {
        ...state,
        activeArticle: payload,
      };
    case "PUSH_FEED":
      return {
        ...state,
        feeds: state.feeds.concat(payload),
      };
    default:
      return state;
  }
}
export default AppReducer;
