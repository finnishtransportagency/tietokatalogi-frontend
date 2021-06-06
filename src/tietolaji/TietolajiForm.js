import React from "react";
import { Form, Text } from "react-form";
import { FormControls, validate, validateAll } from "../form/FormControls";
import { CustomCollapse as Collapse } from "../form/CustomCollapse";
import { CustomSelect as Select } from "../form/CustomSelect";
import { LinkifyTextArea as TextArea } from "../form/LinkifyTextArea";
import { fullURL } from "../App";

export class TietolajiForm extends React.Component {
    render() {
        const {
            edit,
            onSubmit,
            remove,
            setEditable,
            cancelNew,
            values,
            resources
        } = this.props;

        const {
            tietoryhma: tietoryhmatunnusLista = [],
            looginen: looginenTietovarantoTunnusLista = []
        } = resources ? resources : {};

        const linkToTR = values.tietoryhmatunnus
            ? fullURL("#/tietoryhma/tunnus", values.tietoryhmatunnus)
            : null;
        let linkToTREl = null;
        if (linkToTR) {
            linkToTREl = (
                <span>
                    <a
                        href={linkToTR}
                        target="_blank"
                        rel="noopener noreferrer"
                        placeholder=""
                        readOnly={true}
                    >
                        {" "}
                        Linkki
                    </a>
                </span>
            );
        }

        const linkToLog = values.looginenTietovarantoTunnus
            ? fullURL("#/looginen/tunnus", values.looginenTietovarantoTunnus)
            : null;
        let linkToLogEl = null;
        if (linkToLog) {
            linkToLogEl = (
                <span>
                    <a
                        href={linkToLog}
                        target="_blank"
                        rel="noopener noreferrer"
                        placeholder=""
                        readOnly={true}
                    >
                        {" "}
                        Linkki
                    </a>
                </span>
            );
        }

        return (
            <Form
                validateError={values => 
                    validateAll(values, validate)
                }
                onSubmit={values => {
                    delete values.noRightsToModify;
                    onSubmit(values);
                }}
                getApi={formApi => {
                    formApi.setAllValues(values);
                }}
                defaultValues={values}
            >
                {formApi => (
                    <form onSubmit={formApi.submitForm}>
                        <Collapse
                            header={`Kaikki tiedot: ${values.nimi || ""}`}
                            isOpened={true}
                        >
                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label htmlFor="nimi" className="row">
                                            Nimi
                                        </label>
                                        <div className="row">
                                            <Text
                                                field="nimi"
                                                type="text"
                                                className="tk-field form-control"
                                                id="nimi"
                                                placeholder=""
                                                readOnly={!edit}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label htmlFor="kuvaus" className="row">
                                            Kuvaus
                                        </label>
                                        <div className="row">
                                            <TextArea
                                                field="kuvaus"
                                                type="text"
                                                className="tk-field form-control"
                                                id="kuvaus"
                                                rows="5"
                                                placeholder=""
                                                readOnly={!edit}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="omistaja"
                                            className="row"
                                        >
                                            Omistaja
                                        </label>
                                        <div className="row">
                                            <Text
                                                field="omistaja"
                                                type="text"
                                                className="tk-field form-control"
                                                id="omistaja"
                                                placeholder=""
                                                readOnly={!edit}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label htmlFor="lahde" className="row">
                                            Lähde
                                        </label>
                                        <div className="row">
                                            <Text
                                                field="lahde"
                                                type="text"
                                                className="tk-field form-control"
                                                id="lahde"
                                                placeholder=""
                                                readOnly={!edit}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label htmlFor="tila" className="row">
                                            Tila
                                        </label>
                                        <div className="row">
                                            <Select
                                                field="tila"
                                                type="text"
                                                className="tk-field form-control"
                                                id="tila"
                                                placeholder=""
                                                readOnly={!edit}
                                                resources={resources}
                                                noResultsText="Ei tuloksia"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="tietoryhmatunnus"
                                            className="row"
                                        >
                                            Tietoryhmä{linkToTREl}
                                        </label>
                                        <div className="row">
                                            <Select
                                                field="tietoryhmatunnus"
                                                className="tk-field form-control"
                                                id="tietoryhmatunnus"
                                                placeholder=""
                                                readOnly={!edit}
                                                useID={true}
                                                resources={{
                                                    tietoryhmatunnus: tietoryhmatunnusLista
                                                }}
                                                noResultsText="Ei tuloksia"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="looginenTietovarantoTunnus"
                                            className="row"
                                        >
                                            Looginen tietovaranto{linkToLogEl}
                                        </label>
                                        <div className="row">
                                            <Select
                                                field="looginenTietovarantoTunnus"
                                                className="tk-field form-control"
                                                id="looginenTietovarantoTunnus"
                                                placeholder=""
                                                readOnly={!edit}
                                                useID={true}
                                                resources={{
                                                    looginenTietovarantoTunnus: looginenTietovarantoTunnusLista
                                                }}
                                                noResultsText="Ei tuloksia"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Collapse>

                        <FormControls
                            noRightsToModify={values.noRightsToModify}
                            edit={edit}
                            values={formApi.values}
                            errors={formApi.errors}
                            setEditable={setEditable}
                            submitForm={formApi.submitForm}
                            resetForm={formApi.resetAll}
                            cancelNew={cancelNew}
                            remove={remove}
                        />
                    </form>
                )}
            </Form>
        );
    }
}
