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
          return items.map(({ categories, creator, title, link, guid }) => {
            return (
              <div
                key={guid}
                className="card"
                style={{ background: color }}
                onClick={() => dispatch(setActiveArticle(link))}
              >
                <div>{categories?.map((cat) => cat._)}</div>
                <div>{creator}</div>
                <div>{title}</div>
              </div>
            );
          });
        })}
      </div>
    );
  }
  return <div>spinner</div>;
});

export default Card;
