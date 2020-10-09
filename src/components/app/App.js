import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import feedAPI from "../../api/index";
import {
  setRssData,
  getRssData,
  setActiveArticle,
  getActiveArticle,
  getFeeds,
  setLoading,
  getLoading,
  pushFeed,
} from "../../redux/Index";

import { Modal, ActiveFeeds } from "../index";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const activeArticle = useSelector(getActiveArticle);
  const feeds = useSelector(getFeeds);
  const loading = useSelector(getLoading);
  const [input, setInput] = useState("");

  const rssData = useSelector(getRssData);

  useEffect(() => {
    // make sure the datafeed is empty on first load
    dispatch(setRssData(null));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      // fetch the data
      if (feeds) {
        dispatch(setLoading(true));
        const res = await feedAPI.getFeed(feeds);
        Promise.allSettled(res)
          .then((x) => {
            x.forEach((e) => {
              if (e.status === "fulfilled") {
                dispatch(setRssData(e.value.items));
                dispatch(setLoading(false));
              }
            });
          })
          .catch((err) => console.error(err));
      }
    })();
  }, [dispatch, feeds]);

  const renderFeed = () => {
    if (!loading) {
      return rssData.map(({ categories, creator, title, link }, iteration) => (
        <div
          className="card"
          key={iteration}
          onClick={() => dispatch(setActiveArticle(link))}
        >
          <div>{categories?.map((cat) => cat._)}</div>
          <div>{creator}</div>
          <div>{title}</div>
        </div>
      ));
    }
    return <div>spinner</div>;
  };

  const addFeed = () => {
    if (!feeds.includes(input)) {
      dispatch(setRssData(null));
      dispatch(pushFeed(input));
      setInput("")
    }
  };

  return (
    <div className="App">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
      />
      <button onClick={addFeed}>add</button>

      <ActiveFeeds />
      <div className="flex-grid">{renderFeed()}</div>
      {activeArticle && <Modal />}
    </div>
  );
}

export default App;
