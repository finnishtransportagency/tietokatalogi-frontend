import React from "react";
import { FormControls, formikValidateName } from "../form/FormControls";
import { CustomCollapse as Collapse } from "../form/CustomCollapse";
import { FormikCustomSelect } from "../form/formik/FormikSelect";
import { fullURL } from "../App";
import { Formik, Form, Field } from "formik";
import { FormikText as CustomText } from "../form/formik/FormikText";
import { FormikTextArea as CustomTextArea } from "../form/formik/FormikTextArea";


export const TietoryhmaForm = ({
    edit,
    onSubmit,
    remove,
    setEditable,
    cancelNew,
    values: initialValues,
    resources
}) => {
    const {
        paatietoryhma: paatietoryhmaLista = [], tietovaranto: tietovarantoLista = []
    } = resources ? resources : {};

    const linkToPTR = initialValues.paatietoryhma
        ? fullURL("#/paatietoryhma/tunnus", initialValues.paatietoryhma)
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
    const paatietoryhmaLabel = <React.Fragment>Päätietoryhmä{linkToPTREl}</React.Fragment>;

    return (
        <Formik
            initialValues={{
                nimi: "",
                kuvaus: "",
                paatietoryhma: "",
                tietovaranto: "",
                ...initialValues
            }}
            validate={formikValidateName}
            onSubmit={onSubmit}
        >
            <Form>
                <Collapse
                    header={`Kaikki tiedot: ${initialValues.nimi || ""}`}
                    isOpened={true}
                >
                    <div className="form-group row">
                        <div className="col-sm-6">
                            <CustomText name="nimi" label="Nimi" readOnly={!edit} />
                        </div>
                        <div className="col-sm-6">
                            <CustomTextArea name="kuvaus" label="Kuvaus" readOnly={!edit} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-6">
                            <FormikCustomSelect
                                label={paatietoryhmaLabel}
                                name="paatietoryhma"
                                readOnly={!edit}
                                resources={{
                                    paatietoryhma: paatietoryhmaLista
                                }}
                                useID
                            />
                        </div>
                        <div className="col-sm-6">
                            <FormikCustomSelect
                                label="Tietovaranto"
                                name={"tietovaranto"}
                                readOnly={!edit}
                                resources={{
                                    tietovaranto: tietovarantoLista
                                }}
                                useID
                            />
                        </div>
                    </div>
                </Collapse>

                <Field name="formControls">
                    {({ form }) => (
                        <FormControls
                            noRightsToModify={initialValues.noRightsToModify}
                            edit={edit}
                            values={form.values}
                            errors={form.errors}
                            setEditable={setEditable}
                            submitForm={form.submitForm}
                            resetForm={form.handleReset}
                            cancelNew={cancelNew}
                            remove={remove}
                            formikValidation
                        />
                    )}
                </Field>
            </Form>
        </Formik>
    );
};