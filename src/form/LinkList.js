import React from "react";
import { CustomSelect as Select } from "./CustomSelect";
import { TietojarjestelmapalveluSelectWrapper } from "./TietojarjestelmapalveluSelectWrapper";
import { TietovirtaSelectFieldWrapper } from "./TietovirtaSelectWrapper";
import { lowerWithoutScandics } from "../utils";
import { observer } from "mobx-react";



@observer
export class LinkList extends React.Component {

    onDropdownChange(mainListField, rowIdToChange, fieldToSet, selection, fieldsToClear = []) {
        // This is the onChange event for a specific dropdown in the list, which also clears other dropdowns since this value has changed
        // To do this with formApi we need to update the whole list in the form state
        // The mainListField parameter is for example "jarjestelmaLinkkausList"
        const changedValues = this.props.formApi.values[mainListField].map((row, i) => {
            // For the row to change, return a new object with the changed dropdown value (fieldToSet, selection)
            // and any other specified values set to null (fieldsToClear)
            return (i !== rowIdToChange) ? row : {
                ...row,
                [fieldToSet]: selection && selection.value,
                ...fieldsToClear.reduce((result, fieldName) => {
                    return {
                        ...result,
                        [fieldName]: null,
                    };
                }, {}),
            };
        });

        this.props.formApi.setValue(mainListField, changedValues);
    }



    render() {

        const { edit, resources, field, formApi: { values = {} } } = this.props;

        const links = values[field] || [];

        const addButtonEl = edit ? (
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                    const newItem = {
                        id: null,
                        tietojarjestelmaTunnus: values.tunnus,
                        linkattavaTunnus: null,
                        suunta: null,
                        tietojarjestelmapalveluTunnus: null,
                        tietovirta: "",
                        tyyppi: null
                    };
                    this.props.formApi.addValue(field, newItem);
                }}
                disabled={!edit}
            >
                Lisää
            </button>
        ) : null;

        return (
            <div>
                <div className="form-group row">
                    <div className="col-sm-2">
                        <label>Tyyppi</label>
                    </div>
                    <div className="col-sm-3">
                        <label>Linkattava</label>
                    </div>
                    <div className="col-sm-2">
                        <label>Suunta</label>
                    </div>
                    <div className="col-sm-2">
                        <label>Tietojärjestelmäpalvelu</label>
                    </div>
                    <div className="col-sm-3">
                        <label>Tietovirta</label>
                    </div>
                </div>
                {links.map((link, i) => {
                    return (
                        <div className="form-group row" key={`link-${i}`}>
                            <div className="col-sm-2">
                                <Select
                                    field={[field, i, "tyyppi"]}
                                    type="text"
                                    className="tk-field form-control"
                                    id={`tyyppi_${i}`}
                                    placeholder=""
                                    readOnly={!edit}
                                    clearable={false}
                                    resources={resources}
                                    noResultsText="Ei tuloksia"
                                    onChange={selection => this.onDropdownChange(field, i, "tyyppi", selection, [
                                        "linkattavaTunnus", "suunta", "tietojarjestelmapalveluTunnus", "tietovirta"
                                    ])}
                                />
                            </div>
                            <div className="col-sm-3">
                                <Select
                                    field={[field, i, "linkattavaTunnus"]}
                                    type="text"
                                    className="tk-field form-control"
                                    id={`linkattavaTunnus_${i}`}
                                    placeholder=""
                                    readOnly={!edit}
                                    clearable={false}
                                    resources={resources}
                                    resourceField={lowerWithoutScandics(
                                        link["tyyppi"]
                                    )}
                                    useID={true}
                                    noResultsText="Ei tuloksia"
                                    onChange={selection => this.onDropdownChange(field, i, "linkattavaTunnus", selection, [
                                        "suunta", "tietojarjestelmapalveluTunnus", "tietovirta"
                                    ])}
                                />
                            </div>
                            <div className="col-sm-2">
                                <Select
                                    field={[field, i, "suunta"]}
                                    type="text"
                                    className="tk-field form-control"
                                    id={`suunta_${i}`}
                                    placeholder=""
                                    readOnly={!edit}
                                    clearable={false}
                                    resources={resources}
                                    noResultsText="Ei tuloksia"
                                    onChange={selection => this.onDropdownChange(field, i, "suunta", selection, [])}
                                />
                            </div>
                            <div className="col-sm-2">
                                <TietojarjestelmapalveluSelectWrapper
                                    field={[field, i, "tietojarjestelmapalveluTunnus"]}
                                    type="text"
                                    className="tk-field form-control"
                                    id={`tietojarjestelmapalvelu_${i}`}
                                    placeholder=""
                                    readOnly={!edit}
                                    useID={false}
                                    tietojarjestelmapalveluRowData={this.props.formApi.values[field][i]}
                                    onChange={selection => this.onDropdownChange(field, i, "tietojarjestelmapalveluTunnus", selection, [
                                        "tietovirta"
                                    ])}
                                />
                            </div>
                            <div className={edit ? "col-sm-2" : "col-sm-3"}>
                                <TietovirtaSelectFieldWrapper
                                    field={[field, i, "tietovirta"]}
                                    type="text"
                                    className="tk-field form-control tk-field-autoheight"
                                    id={`tietovirta_${i}`}
                                    placeholder=""
                                    readOnly={!edit}
                                    useID={false}
                                    tietovirtaRowData={this.props.formApi.values[field][i]}
                                />
                            </div>
                            {edit && (
                                <div className="col-sm-1">
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => {
                                            // Compare object references if there's 
                                            // no id available (new items).
                                            const existingId = link.id ? 
                                                links.findIndex(item => link.id === item.id) : 
                                                links.findIndex(item => link === item);
                                            
                                            this.props.formApi.removeValue(
                                                this.props.field,
                                                existingId
                                            );
                                        }}
                                        disabled={!edit}
                                    >
                                        <i className="fa fa-remove" />
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
                {addButtonEl}
            </div>
        );
    }
}

// TODO: find a way to curry the field value
export function validateLinkList(values, field = "jarjestelmaLinkkausListMultiselect") {
    const linkField = values[field] || null;
    let result = {};
    if (linkField) {
        result[field] = new Array(linkField.length);
        linkField.forEach((link, i) => {
            const { linkattavaTunnus = null, suunta = "", tyyppi = "" } = link;
            result[field][i] = {};
            if (linkattavaTunnus === null) {
                result[field][i].linkattavaTunnus = "Vaaditaan";
                result.hasErrors = true;
            } else {
                result[field][i].linkattavaTunnus = null;
            }
            if (!suunta || suunta.length === 0) {
                result[field][i].suunta = "Vaaditaan";
                result.hasErrors = true;
            } else {
                result[field][i].suunta = null;
            }
            if (!tyyppi || tyyppi.length === 0) {
                result[field][i].tyyppi = "Vaaditaan";
                result.hasErrors = true;
            } else {
                result[field][i].tyyppi = null;
            }
        });
    }
    return result;
}
