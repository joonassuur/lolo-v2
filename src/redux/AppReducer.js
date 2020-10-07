const INITIAL_STATE = {
  rssData: undefined,
  activeArticle: undefined,
};

function AppReducer(state = INITIAL_STATE, { payload, type }) {
  switch (type) {
    case "SET_RSS_DATA":
      return {
        ...state,
        rssData: payload,
      };
    case "SET_ACTIVE_ARTICLE":
      return {
        ...state,
        activeArticle: payload,
      };
    default:
      return state;
  }
}
export default AppReducer;
