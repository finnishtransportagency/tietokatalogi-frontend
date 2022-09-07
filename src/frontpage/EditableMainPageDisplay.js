import React from "react";

import * as marked from "marked";
import * as DOMPurify from "dompurify";

export const EditableMainPageDisplay = ({ markdown, onClk }) => {
  return (
    <React.Fragment>
      <div
        style={{ backgroundColor: "ghostwhite" }}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked.parse(markdown)) || "(ei sisältöä)",
        }}
      ></div>
    </React.Fragment>
  );
};
