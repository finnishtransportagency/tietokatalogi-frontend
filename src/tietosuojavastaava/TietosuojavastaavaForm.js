import React from "react";
import { Field, Form, Formik } from "formik";
import { FormControls, formikValidateName } from "../form/FormControls";
import { CustomCollapse as Collapse } from "../form/CustomCollapse";
import { FormikText as CustomText } from "../form/formik/FormikText";

export const TietosuojavastaavaForm = ({
  edit,
  onSubmit,
  remove,
  setEditable,
  cancelNew,
  values: initialValues,
}) => (
  <Formik
    initialValues={{
      nimi: "",
      osoite: "",
      sahkoposti: "",
      puhelinnumero: "",
      ...initialValues,
    }}
    validate={formikValidateName}
    onSubmit={(values) => {
      delete values.noRightsToModify;
      onSubmit(values);
    }}
    enableReinitialize
  >
    <Form>
      <Collapse
        header={`Kaikki tiedot: ${initialValues.nimi || ""}`}
        isOpened={true}
        lastModified={initialValues.rivimuokattupvm}
        created={initialValues.riviluotupvm}
        modifyUser={initialValues.rivimuokkaajatunnus}
      >
        <div className="form-group row">
          <div className="col-sm-6">
            <CustomText name="nimi" label="Nimi" readOnly={!edit} />
          </div>

          <div className="col-sm-6">
            <CustomText name="osoite" label="Osoite" readOnly={!edit} />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-6">
            <CustomText name="sahkoposti" label="Sähköposti" readOnly={!edit} />
          </div>

          <div className="col-sm-6">
            <CustomText
              name="puhelinnumero"
              label="Puhelinnumero"
              readOnly={!edit}
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
