/* eslint no-restricted-globals: 0 */
import React, { Component } from "react";
import JarjestelmaGriddle from "./JarjestelmaGriddle";
import { inject } from "mobx-react";

@inject("jarjestelmaSalkkuStore")
export default class JarjestelmaSalkkuLista extends Component {
    constructor(props, context) {
        super(props);
    }

    render() {
        const { jarjestelmaSalkkuStore } = this.props;
        return <JarjestelmaGriddle dataStore={jarjestelmaSalkkuStore} />;
    }
}
