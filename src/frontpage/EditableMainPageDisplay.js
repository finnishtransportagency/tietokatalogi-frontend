import React from "react";

import * as marked from "marked";
import * as DOMPurify from "dompurify";

export const EditableMainPageDisplay = ({ markdown }) => {
  return (
    <React.Fragment>
      <div
        className="frontpage-readonly-textarea"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked.parse(markdown)) || "(ei sisältöä)",
        }}
      ></div>
    </React.Fragment>
  );
};
