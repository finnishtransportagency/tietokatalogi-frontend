/* eslint no-restricted-globals: 0 */
import React, { Component } from "react";
import PalveluGriddle from "./PalveluGriddle";
import { inject } from "mobx-react";

@inject("palveluKatalogiStore")
export default class PalveluKatalogiLista extends Component {
    constructor(props, context) {
        super(props);
    }

    render() {
        return <PalveluGriddle dataStore={this.props.palveluKatalogiStore} />;
    }
}
