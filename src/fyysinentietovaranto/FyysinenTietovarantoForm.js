import React from "react";
import { Form, Text } from "react-form";
import { LinkifyTextArea as TextArea } from "../form/LinkifyTextArea";
import { FormControls, validate, validateAll } from "../form/FormControls";
import { CustomCollapse as Collapse } from "../form/CustomCollapse";
import { UrlTextField } from "../form/UrlTextField";

export class FyysinenTietovarantoForm extends React.Component {
    render() {
        const {
            edit,
            onSubmit,
            remove,
            setEditable,
            cancelNew,
            values
        } = this.props;
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
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-12">
                                    <div className="col-sm-12">
                                        <label htmlFor="muuta" className="row">
                                            Muuta
                                        </label>
                                        <div className="row">
                                            <TextArea
                                                field="muuta"
                                                type="text"
                                                className="tk-field form-control"
                                                id="muuta"
                                                rows="5"
                                                placeholder=""
                                                readOnly={!edit}
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
