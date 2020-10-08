import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Mercury from "@postlight/mercury-parser";
import { getActiveArticle, setActiveArticle } from "../../redux/Index";
import "./Modal.scss";
import "./Spinner.scss";

function Modal() {
  const dispatch = useDispatch();
  const activeArticle = useSelector(getActiveArticle);
  const [parsedArticle, setParsedArticle] = useState(undefined);

  const cors = "https://desolate-ocean-10959.herokuapp.com/";

  useEffect(() => {
    (async () => {
      const res = await Mercury.parse(`${cors}${activeArticle}`);
      setParsedArticle(res);
    })();
  }, [activeArticle]);

  return parsedArticle ? (
    <>
      <div
        className="modal-overlay"
        onClick={() => dispatch(setActiveArticle(null))}
      ></div>
      <div className="modal">
        <div
          className="modal-content"
          dangerouslySetInnerHTML={{ __html: parsedArticle.content }}
        ></div>
      </div>
    </>
  ) : (
    <div className="modal-overlay">
      <div className="spinner"></div>
    </div>
  );
}

export default Modal;
