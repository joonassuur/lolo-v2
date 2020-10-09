const INITIAL_STATE = {
  rssData: [],
  activeArticle: undefined,
  loading: true,
  feeds: ["https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss"],
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
    case "SET_LOADING":
      return {
        ...state,
        loading: payload,
      };
    case "PUSH_FEED":
      return {
        ...state,
        feeds: state.feeds.concat(payload),
      };
    case "REMOVE_FEED":
      const modifiedFeeds = [
        ...state.feeds.slice(0, payload),
        ...state.feeds.slice(payload + 1),
      ];
      return {
        ...state,
        feeds: modifiedFeeds,
      };
    default:
      return state;
  }
}
export default AppReducer;
