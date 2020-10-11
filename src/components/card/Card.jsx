import React from "react";
import moment from "moment";
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
        {rssData.map(
          ({
            categories,
            media,
            creator,
            title,
            link,
            guid,
            contentSnippet,
            pubDate,
            color,
          }) => {
            return (
              <div key={guid} className="card" style={{ background: color }}>
                {/* card images */}
                {media?.$?.url ? (
                  <img
                    className="article-image"
                    onClick={() => dispatch(setActiveArticle(link))}
                    src={media.$.url}
                    style={{ width: "100%" }}
                    alt=""
                  />
                ) : (
                  // in case the item has categories, but no images, add a margin so the categories don't display on top of text
                  <div className="margin" style={{ background: color }}></div>
                )}
                <div className="text-content">
                  {/* card categories */}
                  <div className="category-container">
                    {categories?.map((cat, i) => (
                      <span key={i} className="category">
                        {cat._ || cat}
                      </span>
                    ))}
                  </div>
                  <h3
                    className="article-title"
                    onClick={() => dispatch(setActiveArticle(link))}
                  >
                    {title}
                  </h3>
                  <div
                    onClick={() => dispatch(setActiveArticle(link))}
                    className="article-description"
                  >
                    {contentSnippet}
                  </div>
                  <div className="bottom">
                    {creator && <span className="creator">{creator}</span>}
                    <span className="pubDate">{moment(pubDate).fromNow()}</span>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    );
  }
  // display spinner while laoding the cards
  return (
    <div
      style={{ color: "#673ab7", fontSize: "50px", marginTop: "1em" }}
      className="spinner"
    ></div>
  );
});

export default Card;
