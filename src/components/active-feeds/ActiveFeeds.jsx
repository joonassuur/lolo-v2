import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeeds, removeFeed, setRssData } from "../../redux/Index";

import "./ActiveFeeds.scss";

function ActiveFeeds() {
  const dispatch = useDispatch();
  const feeds = useSelector(getFeeds);

  const handleRemoveFeed = (i) => {
    dispatch(setRssData(null));
    dispatch(removeFeed(i));
  };

  return (
    <>
      <p>Active feeds:</p>
      {feeds.map((feed, i) => (
        <div className="feed" key={i}>
          <div className="feed-text">
            <strong>{i + 1}:</strong>
            <span>{feed}</span>
          </div>
          <button onClick={() => handleRemoveFeed(i)}>Remove</button>
        </div>
      ))}
    </>
  );
}

export default ActiveFeeds;
