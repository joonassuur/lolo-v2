import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRssData, setActiveArticle, getLoading } from "../../redux/Index";

import "./Card.scss";

const Card = React.memo(() => {
  const dispatch = useDispatch();

  const rssData = useSelector(getRssData);
  const loading = useSelector(getLoading);

  if (!loading) {
    return (
      <div className="flex-grid">
        {rssData.map(({ items, color }) => {
          return items.map(
            ({
              categories,
              media,
              creator,
              title,
              link,
              guid,
              contentSnippet,
              pubDate,
            }) => {
              return (
                <div
                  key={guid}
                  className="card"
                  style={{ background: color }}
                  onClick={() => dispatch(setActiveArticle(link))}
                >
                  {media?.$?.url && (
                    <img src={media.$.url} style={{ width: "100%" }} alt="" />
                  )}
                  <div className="text-content">
                    <div className="category-container">
                      {categories?.map((cat, i) => (
                        <span key={i} className="category">{cat._}</span>
                      ))}
                    </div>
                    <h3>{title}</h3>
                    <div className="description">{contentSnippet}</div>
                    <div className="bottom">
                      <span>{creator}</span>
                    </div>
                  </div>
                </div>
              );
            }
          );
        })}
      </div>
    );
  }
  return <div>spinner</div>;
});

export default Card;
