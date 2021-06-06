import React, { Component } from "react";
import TietoOmaisuusGriddle from "./TietoOmaisuusGriddle";
import { inject } from "mobx-react";

@inject("tietoOmaisuusStore")
export default class TietoOmaisuusLista extends Component {

    render() {
        return <TietoOmaisuusGriddle dataStore={this.props.tietoOmaisuusStore} />;
    }
}
