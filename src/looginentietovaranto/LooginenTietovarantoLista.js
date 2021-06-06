/* eslint no-restricted-globals: 0 */
import React, { Component } from "react";
import LooginenTietovarantoGriddle from "./LooginenTietovarantoGriddle";
import { inject } from "mobx-react";

@inject("looginenTietovarantoStore")
export default class LooginenTietovarantoLista extends Component {
    constructor(props, context) {
        super(props);
    }

    render() {
        const { looginenTietovarantoStore } = this.props;
        return (
            <LooginenTietovarantoGriddle
                dataStore={looginenTietovarantoStore}
            />
        );
    }
}
