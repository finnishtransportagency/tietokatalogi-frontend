import React from "react";

import { EditableFrontPageEditor } from "./EditableFrontPageEditor";
import { EditableFrontPageDisplay } from "./EditableFrontPageDisplay";
import { getTest, sendPost } from "../axios/editableFrontPageContainer";


export const EditableFrontPageContainer = () => {
  const [mainText, setMainText] = React.useState("");
  const [sideText, setSideText] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [edit, setEdit] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    getTest().then((data) => {
      setLoading(false);
      if (!data) return; 
      const { mainText = "", sideText = "" } = data;
      setMainText(mainText);
      setSideText(sideText);
    });
  }, []);

  return loading ? <p>Ladataan...</p> : (
    <React.Fragment>
      <div className="col-xs-8">
        <div style={{ display: edit ? "inline" : "none" }}>
          <EditableFrontPageEditor
            onChange={(text) => setMainText(text)}
            value={mainText}
          />
        </div>
        {!edit && <EditableFrontPageDisplay markdown={mainText} />}
      </div>
      <div className="col-xs-1" />
      <div className="col-xs-3">
        <div style={{ display: edit ? "inline" : "none" }}>
          <EditableFrontPageEditor
            onChange={(text) => setSideText(text)}
            value={sideText}
          />
        </div>
        {!edit && <EditableFrontPageDisplay markdown={sideText} />}
      </div>
      <div className="float-bottom">
        {edit ? (
          <div className="btn-toolbar">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                sendPost({mainText, sideText});
                setEdit(false);
              }}
            >
              Tallenna
            </button>
            <button
              type="button"
              className="btn btn-default"
              onClick={() => setEdit(false)}
            >
              Peruuta
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setEdit(true)}
          >
            Muokkaa
          </button>
        )}
      </div>
    </React.Fragment>
  );
};
