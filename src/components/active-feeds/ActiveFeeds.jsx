import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeeds, removeFeed, setRssData } from "../../redux/Index";

function ActiveFeeds() {
  const dispatch = useDispatch();
  const feeds = useSelector(getFeeds);

  const handleRemoveFeed = (i) => {
    dispatch(setRssData(null));
    dispatch(removeFeed(i))
  }

  return (
    <div>
      <p>Active feeds:</p>
      {feeds.map((feed, i) => (
        <div key={i}>
          <strong>{i + 1}: </strong>
          <span>{feed}</span>
          <button onClick={()=>handleRemoveFeed(i)}>remove</button>
        </div>
      ))}
    </div>
  );
}

export default ActiveFeeds;
