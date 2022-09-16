import React from "react";
import { Link } from "react-router";
import Linkify from "react-linkify";
import { connect } from "react-redux";
import { fullURL } from "../App";

// eslint-disable-next-line react/display-name
const CustomLink =
  (linkKey) =>
  ({ value, griddleKey, rowData }) =>
    (
      <Link
        to={fullURL(rowData.itemUrl || "", rowData.tunnus)}
        className="name-link"
      >
        {rowData[linkKey] || griddleKey}
      </Link>
    );

const CustomStatus = ({ value, griddleKey, rowData }) => (
  <div>{rowData.aktiivinen === 1 ? "Aktiivinen" : "Ei-aktiivinen"}</div>
);

const rowDataSelector = (state, { griddleKey }) => {
  return state
    .get("data")
    .find((r) => r.get("griddleKey") === griddleKey)
    .toJSON();
};

const EnhanceWithRowData = connect((state, props) => ({
  rowData: rowDataSelector(state, props),
}));

export const LinkToItemWithLinkKey = (linkKey) =>
  EnhanceWithRowData(CustomLink(linkKey));

export const LinkToItem = EnhanceWithRowData(CustomLink("nimi"));
// Termilomake uses ensisijainen termi instead of nimi
export const LinkToItemTermilomake = EnhanceWithRowData(CustomLink("nimi"));
export const ActiveStatus = EnhanceWithRowData(CustomStatus);

export const LinkifiedItem = ({ value }) => (
  <Linkify properties={{ target: "_blank", rel: "noopener noreferrer" }}>
    {value}
  </Linkify>
);
