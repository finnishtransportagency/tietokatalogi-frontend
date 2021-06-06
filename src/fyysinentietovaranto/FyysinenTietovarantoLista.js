/* eslint no-restricted-globals: 0 */
import React, { Component } from "react";
import FyysinenTietovarantoGriddle from "./FyysinenTietovarantoGriddle";
import { inject } from "mobx-react";

@inject("fyysinenTietovarantoStore")
export default class FyysinenTietovarantoLista extends Component {
    constructor(props, context) {
        super(props);
    }

    render() {
        const { fyysinenTietovarantoStore } = this.props;
        return (
            <FyysinenTietovarantoGriddle
                dataStore={fyysinenTietovarantoStore}
            />
        );
    }
}
