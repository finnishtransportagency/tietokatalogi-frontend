import React, { Component } from "react";
import TietosuojavastaavaGriddle from "./TietosuojavastaavaGriddle";
import { inject } from "mobx-react";

@inject("tietosuojavastaavaStore")
export default class TietosuojavastaavaLista extends Component {

    render() {
        return <TietosuojavastaavaGriddle dataStore={this.props.tietosuojavastaavaStore} />;
    }
}
