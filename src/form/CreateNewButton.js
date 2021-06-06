import React from "react";
import { Link } from "react-router";
import { fullURL } from "../App";

// TODO: refactor other classes to use this
export const CreateNewButton = (props) => {
    return (<div className="col col-sm-1 col-sm-offset-9 filter">
        <Link
            type="button"
            className="btn btn-primary pull-right"
            to={fullURL(props.urlString)}>
            Uusi
        </Link>
    </div>);
};
    