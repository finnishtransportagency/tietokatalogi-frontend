/* eslint no-restricted-globals: 0 */
import React, { Component } from "react";
import TietoryhmaGriddle from "./TietoryhmaGriddle";
import { inject } from "mobx-react";

@inject("tietoryhmaStore")
export default class TietoryhmaLista extends Component {
    constructor(props, context) {
        super(props);
    }

    render() {
        const { tietoryhmaStore } = this.props;
        return <TietoryhmaGriddle dataStore={tietoryhmaStore} />;
    }
}
