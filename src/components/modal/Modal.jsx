import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Mercury from "@postlight/mercury-parser";
import DOMPurify from "dompurify";
import { getActiveArticle, setActiveArticle } from "../../redux/Index";

import "./Modal.scss";
import "./Spinner.scss";

function Modal() {
  const dispatch = useDispatch();
  const activeArticle = useSelector(getActiveArticle);
  const [parsedArticle, setParsedArticle] = useState(undefined);
  const sanitizer = DOMPurify.sanitize;

  const cors = "https://desolate-ocean-10959.herokuapp.com/";

  // sanitize the article just in case before dangerouslySetInnerHTML
  const createMarkup = (m) => {
    return { __html: sanitizer(m) };
  };

  useEffect(() => {
    (async () => {
      try {
        // parse the article from clutter
        const res = await Mercury.parse(`${cors}${activeArticle}`);
        setParsedArticle(res);
      } catch (err) {
        dispatch(setActiveArticle(null));
      }
    })();
  }, [activeArticle, dispatch]);

  return parsedArticle ? (
    <>
      <div
        className="modal-overlay"
        onClick={() => dispatch(setActiveArticle(null))}
      ></div>
      <div className="modal">
        <div
          className="modal-content"
          dangerouslySetInnerHTML={createMarkup(parsedArticle.content)}
        ></div>
      </div>
    </>
  ) : (
    // display spinner while loading the article
    <div className="modal-overlay" onClick={() => dispatch(setActiveArticle(null))}>
      <div className="spinner"></div>
    </div>
  );
}

export default Modal;
