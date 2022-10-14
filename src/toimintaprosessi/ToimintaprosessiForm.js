import React from "react";
import {
  FormControls,
  formikValidateName,
} from "../form/FormControls";
import { CustomCollapse as Collapse } from "../form/CustomCollapse";
import { Field, Form, Formik } from "formik";
import { FormikText } from "../form/formik/FormikText";
import { FormikCreatableCustomSelect } from "../form/formik/FormikCreatableCustomSelect";
import { FormikTextArea } from "../form/formik/FormikTextArea";

export const ToimintaprosessiForm = ({
  edit,
  onSubmit,
  remove,
  setEditable,
  cancelNew,
  values: initialValues,
  resources,
}) => (
  <Formik
    initialValues={{
      nimi: "",
      vastaava_organisaatio: "",
      tarkoitus: "",
      tyotila: "",
      rivimuokattupvm: "",
      riviluotupvm: "",
      rivimuokkaajatunnus: "",
      ...initialValues,
    }}
    validate={formikValidateName}
    onSubmit={onSubmit}
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
            <FormikText name="nimi" label="Nimi" readOnly={!edit} />
          </div>
          <div className="col-sm-6">
            <FormikCreatableCustomSelect
              label="Vastuutaho"
              name="vastaava_organisaatio"
              resources={resources}
              readOnly={!edit}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-6">
            <FormikTextArea
              name="tarkoitus"
              label="Tarkoitus"
              readOnly={!edit}
              rows={5}
            />
          </div>
          <div className="col-sm-6">
            <FormikTextArea
              name="tyotila"
              label="Prosessin toimintajärjestelmän työtila"
              readOnly={!edit}
              rows={2}
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
