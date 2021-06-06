import React from "react";
import TermilomakeGriddle from "./TermilomakeGriddle";
import { inject } from "mobx-react";

@inject("termilomakeStore")
export default class TermilomakeLista extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { termilomakeStore } = this.props;
        return <TermilomakeGriddle dataStore={termilomakeStore} />;
    }
}
