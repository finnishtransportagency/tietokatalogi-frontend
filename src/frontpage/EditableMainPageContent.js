import React from "react";

import * as DOMPurify from "dompurify";
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";

export const EditableMainPageContent = ({ value, onChange }) => {
  const textareaRef = React.useRef(null);
  const [editor, setEditor] = React.useState(null);

  React.useEffect(() => {
    const createdEasyMDE = new EasyMDE({
      element: textareaRef && textareaRef.current,
      spellChecker: false,
      renderingConfig: {
        sanitizerFunction: (html) => DOMPurify.sanitize(html),
      },
      initialValue: value,
      autoRefresh: { delay: 300 },
    });
    createdEasyMDE.codemirror.on("change", (e) => {
      onChange(createdEasyMDE.value());
    });

    setEditor(createdEasyMDE);
  }, []);

  React.useEffect(() => {
    if (!editor || value === editor.value()) return;
    editor.value(value);
  }, [value]);

  return <textarea ref={textareaRef} />;
};
