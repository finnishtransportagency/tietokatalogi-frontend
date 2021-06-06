import React, { Component } from "react";
import ToimintaprosessiGriddle from "./ToimintaprosessiGriddle";
import { inject } from "mobx-react";

@inject("toimintaprosessiStore")
export default class ToimintaprosessiLista extends Component {

    render() {
        return <ToimintaprosessiGriddle dataStore={this.props.toimintaprosessiStore} />;
    }
}
