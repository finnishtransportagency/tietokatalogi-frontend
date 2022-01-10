
import React from "react";
import { inject, observer } from "mobx-react";
import { action } from "mobx";
import { FormField } from "react-form";

import { CustomSelect } from "../form/CustomSelect";
import { TietolajiSelectWrapper } from "../form/TietolajiSelectWrapper";
import { TietoryhmaSelectWrapper } from "../form/TietoryhmaSelectWrapper";
import { CustomMultiselect } from "../form/CustomMultiselect";


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
     * @param {[{tunnus: Number, nimi: String, liittyvaJarjestelmaTunnus: Number} | {value: Number, label: String}]} arr
     * @returns {[{value: Number, label: String}]}
     */
    mapToFormFormat(arr) {
        if (!arr) return;
        return arr.map(obj => {
            if (obj.hasOwnProperty("value")) return obj;
            const liittyvaJarjestelmaTunnus = obj.liittyvaJarjestelmaTunnus;
            return {
                value: obj.tunnus,
                label: obj.nimi,
                ...(liittyvaJarjestelmaTunnus ? { liittyvaJarjestelmaTunnus } : {} ),
            };
        });
    }


    filterTietolajiFromJarjestelma(looginen, tietolaji, jarjestelmaTunnus) {
        const looginenTunnusList = looginen
            .filter(l => l.jarjestelmaIds.includes(jarjestelmaTunnus))
            .map(l => l.tunnus);
        return tietolaji
            .filter(tl => looginenTunnusList.includes(tl.looginenTietovarantoTunnus));
    }

    /**
     * Returns the possible options for tietolaji select.
     * 
     * While editing, these options are based on the selected jarjestelma
     * and tietoarkkitehtuuri data.
     * 
     * While not editing, the options are the same as the displayed values.
     */
    @action
    getTietolajiOptions(looginen, tietolaji, jarjestelmaTunnus, relatedJarjestelmaTunnus, jarjestelmaNames) {
        if (!this.props.edit) {
            return this.props.formApi.values["tietolajit"];
        }
        const filteredTietolaji = this.filterTietolajiFromJarjestelma(looginen, tietolaji, jarjestelmaTunnus);
        if (!relatedJarjestelmaTunnus) return this.mapToFormFormat(filteredTietolaji);

        // Add tietolaji of current jarjestelma
        const tietolajiById = filteredTietolaji.reduce((acc, tl) => ({
            ...acc,
            [tl.tunnus]: acc[tl.tunnus] || tl
        }), {});

        // Add tietolaji of related jarjestelma, appending jarjestelma name to tietolaji name
        relatedJarjestelmaTunnus.forEach(jarjestelmaId => {
            const filteredTietolaji = this.filterTietolajiFromJarjestelma(looginen, tietolaji, Number(jarjestelmaId));
            filteredTietolaji.forEach(tl => {
                const oldName = tietolajiById[tl.tunnus] ? tietolajiById[tl.tunnus].nimi : tl.nimi;
                const newName = `${oldName} (${jarjestelmaNames[jarjestelmaId]})`;
                tietolajiById[tl.tunnus] =  {...tl, nimi: newName, liittyvaJarjestelmaTunnus: jarjestelmaId };
            });
        });
        return this.mapToFormFormat(Object.values(tietolajiById));
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
    getTietolajiValues(formValues, options) {
        if (!this.props.edit) {
            return formValues;
        }
        
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
    getTietoryhmaData(tietolajiValues, tietolaji, tietoryhma) {
        if (!this.props.edit) {
            return this.mapToFormFormat(this.props.formApi.values["tietoryhmat"]) || [];
        }
        const tietolajiIds = tietolajiValues.map(tl => tl.value);
        const tietoryhmaIds = tietolaji.filter(tl => tietolajiIds.includes(tl.tunnus)).map(tl => tl.tietoryhmatunnus);
        const filteredTietoryhma = tietoryhma.filter(tr => tietoryhmaIds.includes(tr.tunnus));
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
        const relatedJarjestelmaTunnus = formApi.values["liittyvaJarjestelma"];
        const tietolajiOptions = this.getTietolajiOptions(s.looginen, s.tietolaji, 
            jarjestelmaTunnus, relatedJarjestelmaTunnus, resources ? resources["jarjestelma"] : {});
        const tietolajiFormStateValues = formApi.values["tietolajit"] || [];
        const tietolajiValues = this.getTietolajiValues(tietolajiFormStateValues, tietolajiOptions);
        const tietoryhmaOptions = this.getTietoryhmaData(tietolajiValues, s.tietolaji, s.tietoryhma);

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

                    <div className="col-sm-6">
                        <div className="col-sm-12">
                            <label htmlFor="liittyvaJarjestelma" className="row">
                                Liittyvä järjestelmä
                            </label>
                            <div className="row">
                                <CustomMultiselect
                                    field="liittyvaJarjestelma"
                                    id="liittyvaJarjestelma"
                                    readOnly={!edit}
                                    resources={resources}
                                    className="tk-field form-control"
                                    noResultsText="Ei tuloksia"
                                    useID={true}
                                    resourceName="jarjestelma"
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
                                    options={tietolajiOptions}
                                    values={tietolajiValues}
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
                                    data={tietoryhmaOptions}
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