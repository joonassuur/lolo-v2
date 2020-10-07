import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Mercury from "@postlight/mercury-parser";
import { getActiveArticle } from "../../redux/Index";

function Modal() {
  const activeArticle = useSelector(getActiveArticle);
  const cors = "https://desolate-ocean-10959.herokuapp.com/";
  const [parsedArticle, setParsedArticle] = useState(undefined);

  useEffect(() => {
    (async () => {
      let res = await Mercury.parse(`${cors}${activeArticle}`);
      setParsedArticle(res);
    })();
  }, [activeArticle]);

  return parsedArticle ? (
    <div dangerouslySetInnerHTML={{ __html: parsedArticle.content }}></div>
  ) : null;
}

export default Modal;
