import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import feedAPI from "../../api/index";
import {
  setRssData,
  getRssData,
  setActiveArticle,
} from "../../redux/Index";

import { Modal } from "../index";
import "./App.scss";

function App() {
  const dispatch = useDispatch();

  const rssData = useSelector(getRssData);

  useEffect(() => {
    (async () => {
      // fetch the data
      const { items } = await feedAPI.getFeed();

      if (items) dispatch(setRssData(items));
    })();
  }, [dispatch]);

  useEffect(() => {
    console.log(rssData);
  }, [rssData]);

  const renderFeed = () => {
    return rssData.map(({ categories, creator, title, link, guid }) => {
      return (
        <div key={guid} onClick={() => dispatch(setActiveArticle(link))}>
          <div>{categories?.map((cat) => cat._)}</div>
          <div>{creator}</div>
          <div>{title}</div>
        </div>
      );
    });
  };

  return rssData ? (
    <div className="App">
      {renderFeed()}
      <Modal />
    </div>
  ) : null;
}

export default App;
