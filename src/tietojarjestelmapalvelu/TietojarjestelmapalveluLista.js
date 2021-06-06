import React from "react";
import TietojarjestelmapalveluGriddle from "./TietojarjestelmapalveluGriddle";
import { inject } from "mobx-react";

// TODO
@inject("tietojarjestelmapalveluStore")
export default class TietojarjestelmapalveluLista extends React.Component {
    constructor(props, context) {
        super(props);
    }

    render() {
        const { tietojarjestelmapalveluStore } = this.props;
        return <TietojarjestelmapalveluGriddle dataStore={tietojarjestelmapalveluStore} />;
    }
}
