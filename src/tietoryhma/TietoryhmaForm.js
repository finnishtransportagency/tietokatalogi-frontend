import React from "react";
import { Form, Text } from "react-form";
import { LinkifyTextArea as TextArea } from "../form/LinkifyTextArea";
import { FormControls, validate, validateAll } from "../form/FormControls";
import { CustomCollapse as Collapse } from "../form/CustomCollapse";
import { CustomSelect as Select } from "../form/CustomSelect";
import { fullURL } from "../App";

export class TietoryhmaForm extends React.Component {
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
            paatietoryhma: paatietoryhmaLista = [], tietovaranto: tietovarantoLista = []
        } = resources ? resources : {};

        const linkToPTR = values.paatietoryhma
            ? fullURL("#/paatietoryhma/tunnus", values.paatietoryhma)
            : null;
        let linkToPTREl = null;
        if (linkToPTR) {
            linkToPTREl = (
                <span>
                    <a
                        href={linkToPTR}
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
                                            htmlFor="paatietoryhma"
                                            className="row"
                                        >
                                            Päätietoryhmä{linkToPTREl}
                                        </label>
                                        <div className="row">
                                            <Select
                                                field="paatietoryhma"
                                                className="tk-field form-control"
                                                id="paatietoryhma"
                                                placeholder=""
                                                readOnly={!edit}
                                                useID={true}
                                                resources={{
                                                    paatietoryhma: paatietoryhmaLista
                                                }}
                                                noResultsText="Ei tuloksia"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="tietovaranto"
                                            className="row"
                                        >
                                            Tietovaranto
                                        </label>
                                        <div className="row">
                                            <Select
                                                field="tietovaranto"
                                                className="tk-field form-control"
                                                id="tietovaranto"
                                                placeholder=""
                                                readOnly={!edit}
                                                useID={true}
                                                resources={{
                                                    tietovaranto: tietovarantoLista
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
