import React, { Component } from "react";
import TietovarantoGriddle from "./TietovarantoGriddle";
import { inject } from "mobx-react";

@inject("tietovarantoStore")
export default class TietovarantoLista extends Component {

    render() {
        return <TietovarantoGriddle dataStore={this.props.tietovarantoStore} />;
    }
}
