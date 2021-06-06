/* eslint no-restricted-globals: 0 */
import React, { Component } from "react";
import PaaTietoryhmaGriddle from "./PaaTietoryhmaGriddle";
import { inject } from "mobx-react";

@inject("paaTietoryhmaStore")
export default class PaaTietoryhmaLista extends Component {
    constructor(props, context) {
        super(props);
    }

    render() {
        const { paaTietoryhmaStore } = this.props;
        return <PaaTietoryhmaGriddle dataStore={paaTietoryhmaStore} />;
    }
}
