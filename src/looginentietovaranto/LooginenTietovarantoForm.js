import React from "react";
import { Form, Text } from "react-form";
import { LinkifyTextArea as TextArea } from "../form/LinkifyTextArea";
import { FormControls, validate, validateAll } from "../form/FormControls";
import { CustomCollapse as Collapse } from "../form/CustomCollapse";
import { CustomSelect as Select } from "../form/CustomSelect";
import { fullURL } from "../App";
import { CustomMultiselect } from "../form/CustomMultiselect";
import { CustomAreaCodedSelect } from "../form/CustomAreaCodedSelect";

export class LooginenTietovarantoForm extends React.Component {
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

        const { fyysinen: fyysinenLista = [], jarjestelma: jarjestelmaIds = [] } = resources ? resources : {};

        const linkToFys = values.fyysinenTietovarantoId
            ? fullURL("#/fyysinen/tunnus", values.fyysinenTietovarantoId)
            : null;
        let linkToFysEl = null;
        if (linkToFys) {
            linkToFysEl = (
                <span>
                    <a
                        href={linkToFys}
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
                                        <label htmlFor="jarjestelmaIds" className="row">
                                            Tietojärjestelmät
                                        </label>
                                        <div className="row">
                                            <CustomMultiselect
                                                field="jarjestelmaIds"
                                                className="tk-field form-control"
                                                id="jarjestelmaIds"
                                                readOnly={!edit}
                                                resources={{ jarjestelmaIds: jarjestelmaIds }}
                                                useID={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label htmlFor="alue" className="row">
                                            Alue
                                        </label>
                                        <div className="row">
                                            <CustomAreaCodedSelect
                                                field="alue"
                                                className="tk-field form-control"
                                                id="alue"
                                                readOnly={!edit}
                                                resources={resources}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="paivitystiheys"
                                            className="row"
                                        >
                                            Päivitystiheys
                                        </label>
                                        <div className="row">
                                            <Text
                                                field="paivitystiheys"
                                                type="text"
                                                className="tk-field form-control"
                                                id="paivitystiheys"
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
                                            htmlFor="fyysinenTietovarantoId"
                                            className="row"
                                        >
                                            Fyysisen tietovaranto{linkToFysEl}
                                        </label>
                                        <div className="row">
                                            <Select
                                                field="fyysinenTietovarantoId"
                                                className="tk-field form-control"
                                                id="fyysinenTietovarantoId"
                                                placeholder=""
                                                readOnly={!edit}
                                                useID={true}
                                                resources={{
                                                    fyysinenTietovarantoId: fyysinenLista
                                                }}
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
