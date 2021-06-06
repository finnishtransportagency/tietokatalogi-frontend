/* eslint no-restricted-globals: 0 */
import React, { Component } from "react";
import TietolajiGriddle from "./TietolajiGriddle";
import { inject } from "mobx-react";

@inject("tietolajiStore")
export default class TietolajiLista extends Component {
    constructor(props, context) {
        super(props);
    }

    render() {
        const { tietolajiStore } = this.props;
        return <TietolajiGriddle dataStore={tietolajiStore} />;
    }
}
