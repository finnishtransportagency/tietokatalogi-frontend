
import React from "react";
import { inject, observer } from "mobx-react";
import { action } from "mobx";
import { FormField } from "react-form";

import { CustomSelect } from "../form/CustomSelect";
import { TietolajiSelectWrapper } from "../form/TietolajiSelectWrapper";
import { TietoryhmaSelectWrapper } from "../form/TietoryhmaSelectWrapper";


/**
 * Handles the form logic for the tietovirta area of
 * the tietojarjestelmapalvelu form.
 */
@inject("tietoarkkitehtuuriStore")
@observer
class TietovirtaFormWrapper extends React.Component {
    
    /**
     * An idempotent mapping from the format of fetched data to the format expected by the select components.
     * 
     * @param {[{tunnus: Number, nimi: String} | {value: Number, label: String}]} arr
     * @returns {[{value: Number, label: String}]}
     */
    mapToFormFormat(arr) {
        if (!arr) return;
        return arr.map(obj => {
            if (obj.hasOwnProperty("value")) return obj;
            return {
                value: obj.tunnus,
                label: obj.nimi
            };
        });
    }

    // TODO: the use of the following three methods could be optimized by e.g. memoization

    /**
     * Returns the possible options for tietolaji select.
     * 
     * While editing, these options are based on the selected jarjestelma
     * and tietoarkkitehtuuri data.
     * 
     * While not editing, the options are the same as the displayed values.
     */
    @action
    getTietolajiOptions(looginen, tietolaji, jarjestelmaTunnus) {
        if (!this.props.edit) {
            return this.mapToFormFormat(this.props.formApi.values["tietolajit"]);
        }
        const filteredLooginen = looginen.filter(l => l.jarjestelmaIds.includes(jarjestelmaTunnus));
        const looginenTunnusList = filteredLooginen.map(l => l.tunnus);
        const filteredTietolaji = tietolaji.filter(tl => {
            return looginenTunnusList.includes(tl.looginenTietovarantoTunnus);
        });

        return this.mapToFormFormat(filteredTietolaji);
    }

    /**
     * Returns the values to be displayed by the tietolaji select.
     * 
     * When editing, these are based on the selected values stored by the form
     * api, which are a subset of possible values given by _getTietolajiOptions_.
     * 
     * When not editing, the displayed values are what have been fetched from the backend.
     */
    @action
    getTietolajiValues(looginen, tietolaji, jarjestelmaTunnus) {
        const formValues = this.mapToFormFormat(this.props.formApi.values["tietolajit"]) || [];
        if (!this.props.edit) {
            return formValues;
        }
        
        const options = this.getTietolajiOptions(looginen, tietolaji, jarjestelmaTunnus);
        const optionsValues = options.map(opt => opt.value);
        return formValues.filter(v => optionsValues.includes(v.value));
    }


    /**
     * Returns the data needed to display matching tietoryhma options based
     * on the jarjestelma and tietolajit values.
     * 
     * When not editing, the displayed values are what have been fetched from the backend.
     */
    @action
    getTietoryhmaData(looginen, tietolaji, tietoryhma, jarjestelmaTunnus) {
        if (!this.props.edit) {
            return this.mapToFormFormat(this.props.formApi.values["tietoryhmat"]) || [];
        }

        const formTietolaji = this.getTietolajiValues(looginen, tietolaji, jarjestelmaTunnus);
        const formTietolajiIDs = formTietolaji.map(tl => tl.value);
        const completeTietolaji = tietolaji.filter(tl => formTietolajiIDs.includes(tl.tunnus));
        const filteredTietoryhma = tietoryhma.filter(tr => {
            return completeTietolaji.map(tl => tl.tietoryhmatunnus).includes(tr.tunnus);
        });

        return this.mapToFormFormat(filteredTietoryhma);
    }

    render() {
        const { 
            edit,
            resources,
            formApi,
            tietoarkkitehtuuriStore: s
        } = this.props;


        let jarjestelmaTunnus;
        if (edit && formApi) {
            jarjestelmaTunnus = formApi.values["jarjestelma"];
    
        }
        
        return (
            <div>
                <div className="form-group row">
                    <div className="col-sm-6">
                        <div className="col-sm-12">
                            <label htmlFor="jarjestelma" className="row">
                                Tarjoava järjestelmä
                            </label>
                            <div className="row">
                                <CustomSelect
                                    field="jarjestelma"
                                    id="jarjestelma"
                                    readOnly={!edit}
                                    resources={resources}
                                    className="tk-field form-control"
                                    noResultsText="Ei tuloksia"
                                    useID={true}
                                />
                            </div>
                        </div>
                    </div>
    
                </div>
    
                <div className="form-group row">

                    <div className="col-sm-6">
                        <div className="col-sm-12">
                            <label htmlFor="tietolajit" className="row">
                                Tietolajit
                            </label>
                            <div className="row">
                                <TietolajiSelectWrapper
                                    field="tietolajit"
                                    id="tietolajit"
                                    disabled={!edit}
                                    className="tk-field form-control"
                                    noResultsText="Ei tuloksia"
                                    clearable={false}
                                    options={
                                        this.getTietolajiOptions(s.looginen, s.tietolaji, 
                                            jarjestelmaTunnus)
                                    }
                                    values={
                                        this.getTietolajiValues(s.looginen, s.tietolaji,
                                            jarjestelmaTunnus)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="col-sm-12">
                            <label htmlFor="tietoryhmat" className="row">
                                Tietoryhmät
                            </label>
                            <div className="row">
                                <TietoryhmaSelectWrapper
                                    field="tietoryhmat"
                                    id="tietoryhmat"
                                    className="tk-field form-control"
                                    noResultsText="Ei tuloksia"
                                    clearable={false}
                                    data={
                                        this.getTietoryhmaData(
                                            s.looginen,
                                            s.tietolaji,
                                            s.tietoryhma,
                                            jarjestelmaTunnus)
                                    }
                                    edit={edit}
                                />
                            </div>
                        </div>
                    </div>



                </div>

            </div>
        );
    }
    
}

export default FormField(TietovirtaFormWrapper);