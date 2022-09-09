import React from "react";

import axios from "axios";

import { EditableMainPageContent } from "../frontpage/EditableMainPageContent";
import { EditableMainPageDisplay } from "../frontpage/EditableMainPageDisplay";
import { fullRestURL } from "../App";


// TODO: add proper addresses here
const sendPost = ({mainText, sideText}) => {
  axios
    .post(`${fullRestURL()}/frontpage/`, {
      mainText,
      sideText,
    })
    .then((response) => {
      console.log(response);
    })
    .catch(function (error) {
      console.log("error", error);
    });
};

const getTest = () => {
  return axios
    .get(`${fullRestURL()}/frontpage`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const EditableMainPageView = () => {
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
          <EditableMainPageContent
            onChange={(text) => setMainText(text)}
            value={mainText}
          />
        </div>
        {!edit && <EditableMainPageDisplay markdown={mainText} />}
      </div>
      <div className="col-xs-1" />
      <div className="col-xs-3">
        <div style={{ display: edit ? "inline" : "none" }}>
          <EditableMainPageContent
            onChange={(text) => setSideText(text)}
            value={sideText}
          />
        </div>
        {!edit && <EditableMainPageDisplay markdown={sideText} />}
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
