import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import feedAPI from "../../api/index";
import {
  setRssData,
  getRssData,
  setActiveArticle,
  getActiveArticle,
  getFeeds
} from "../../redux/Index";

import { Modal } from "../index";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const activeArticle = useSelector(getActiveArticle);
  const feeds = useSelector(getFeeds);

  const rssData = useSelector(getRssData);

  useEffect(() => {
    (async () => {
      // fetch the data
      const { items } = await feedAPI.getFeed(feeds);

      if (items) dispatch(setRssData(items));
    })();
  }, [dispatch, feeds]);

  useEffect(() => {
    console.log(rssData);
  }, [rssData]);

  const renderFeed = () =>
    rssData.map(({ categories, creator, title, link, guid }) => (
      <div
        className="card"
        key={guid}
        onClick={() => dispatch(setActiveArticle(link))}
      >
        <div>{categories?.map((cat) => cat._)}</div>
        <div>{creator}</div>
        <div>{title}</div>
      </div>
    ));

  return rssData ? (
    <div className="App">
      <div className="flex-grid">{renderFeed()}</div>
      {activeArticle && <Modal />}
    </div>
  ) : null;
}

export default App;
