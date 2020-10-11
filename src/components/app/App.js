import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import feedAPI from "../../api/index";
import {
  setRssData,
  getActiveArticle,
  getFeeds,
  setLoading,
  pushFeed,
} from "../../redux/Index";

import { Modal, ActiveFeeds, Card } from "../index";

import "./App.scss";

// color pool for cards from different feeds
const colorPool = [
  "#fff",
  "#f1f1f1",
  "#c2d1f0",
  "#ccffe6",
  "#d1e0e0",
  "#e5e5cc",
  "#b3b3ff",
  "#ffb3b3",
  "#f2ffcc",
  "#d9f2e6",
  "#ccffff",
];

function App() {
  const dispatch = useDispatch();
  const activeArticle = useSelector(getActiveArticle);
  const feeds = useSelector(getFeeds);
  const [input, setInput] = useState("");

  useEffect(() => {
    // reset the datafeed on first load
    dispatch(setRssData(null));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      // fetch the data
      if (feeds.length > 0) {
        dispatch(setLoading(true));
        const res = await feedAPI.getFeed(feeds);
        Promise.allSettled(res)
          .then((x) => {
            x.forEach((e, i) => {
              if (e.status === "fulfilled") {
                dispatch(
                  setRssData({items: e.value.items, source: e.value.feedUrl, color: colorPool[i] })
                );
                dispatch(setLoading(false));
              }
            });
          })
          .catch((err) => console.error(err));
      }
    })();
  }, [dispatch, feeds]);

  const addFeed = () => {
    if (!feeds.includes(input)) {
      dispatch(setRssData(null));
      dispatch(pushFeed(input));
      setInput("");
    }
  };

  return (
    <div className="app">
      <div className="head">
        <p>Add feed</p>
        <input
          value={input}
          className="feed-input"
          onChange={(e) => setInput(e.target.value)}
          type="text"
        />
        <button onClick={addFeed}>Add</button>
        <ActiveFeeds />
      </div>
      <Card />
      {activeArticle && <Modal />}
    </div>
  );
}

export default App;
