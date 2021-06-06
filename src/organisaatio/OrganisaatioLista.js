import React, { Component } from "react";
import OrganisaatioGriddle from "./OrganisaatioGriddle";
import { inject } from "mobx-react";

@inject("organisaatioStore")
export default class OrganisaatioLista extends Component {

    render() {
        return <OrganisaatioGriddle dataStore={this.props.organisaatioStore} />;
    }
}
