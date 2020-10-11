import _ from "lodash";

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
      // assign a color to every card from a different source
      payload.items.forEach((e) => (e.color = payload.color));
      // take the existing rssData from the state and concat the incoming items to it
      const clonedData = _.cloneDeep(state.rssData).concat(payload.items);
      // sort the articles by date
      clonedData.sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));

      return {
        ...state,
        rssData: clonedData,
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
