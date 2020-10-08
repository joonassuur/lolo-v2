import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import feedAPI from "../../api/index";
import {
  setRssData,
  getRssData,
  setActiveArticle,
  getActiveArticle,
  getFeeds,
  pushFeed
} from "../../redux/Index";

import { Modal } from "../index";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const activeArticle = useSelector(getActiveArticle);
  const feeds = useSelector(getFeeds);
  const [input, setInput] = useState("");

  const rssData = useSelector(getRssData);

  useEffect(()=> {
    // make sure the datafeed is empty on first load
    dispatch(setRssData(null))
  }, [dispatch])

  useEffect(() => {
    (async () => {
      // fetch the data
      if (feeds) {
        const res = await feedAPI.getFeed(feeds);
        Promise.allSettled(res).then((x) => {
          x.forEach((e) => {
            if (e.status === "fulfilled") {
              dispatch(setRssData(e.value.items))
            };
          });
        }).catch((err)=>console.error(err))
      }
    })();
  }, [dispatch, feeds]);

  const renderFeed = () => {
    if (rssData.length > 0) {
      return rssData.map(({ categories, creator, title, link, guid }, i) => (
        <div
          className="card"
          key={i}
          onClick={() => dispatch(setActiveArticle(link))}
        >
          <div>{categories?.map((cat) => cat._)}</div>
          <div>{creator}</div>
          <div>{title}</div>
        </div>
      ));
    }
  };

  const addFeed = () => {
    dispatch(setRssData(null))
    dispatch(pushFeed(input))
  }

  return rssData ? (
    <div className="App">
      <input value={input} onChange={(e)=>setInput(e.target.value)} type="text"/>
      <button onClick={addFeed}>add</button>
      <div className="flex-grid">{renderFeed()}</div>
      {activeArticle && <Modal />}
    </div>
  ) : null;
}

export default App;
