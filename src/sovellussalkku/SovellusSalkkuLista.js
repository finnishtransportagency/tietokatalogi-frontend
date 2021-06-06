/* eslint no-restricted-globals: 0 */
import React, { Component } from "react";
import SovellusGriddle from "./SovellusGriddle";
import { inject, observer } from "mobx-react";
import moment from "moment";

@inject("sovellusSalkkuStore")
@observer
export default class SovellusSalkkuLista extends Component {
    constructor(props, context) {
        super(props);
    }

    getImportMessageText(latestImport, latestSuccessfulImport) {
        if (!latestImport) return "";
        const latestLocale = moment(latestImport).format("LLL");
        if (!latestSuccessfulImport) {
            return `Virhe tuonnissa ${latestLocale}.`;
        }
        const importIsSuccessful = latestImport === latestSuccessfulImport;
        const successfulLocale = moment(latestSuccessfulImport).format("LLL");
        return importIsSuccessful ? 
            `Viimeisin tuonti  ${latestLocale}.` 
            : `Virhe tuonnissa ${latestLocale}. Viimeisin tuonti ${successfulLocale}.`;
    }

    render() {
        const { sovellusSalkkuStore } = this.props;
        const { latestImport, latestSuccessfulImport } = sovellusSalkkuStore;
        const importMessageText = this.getImportMessageText(latestImport, latestSuccessfulImport);
        
        return <div>
            <p>{ importMessageText }</p>
            <SovellusGriddle dataStore={sovellusSalkkuStore} /> 
        </div>;
    }
}
