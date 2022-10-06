import React from "react";
import { FormControls, formikValidateName } from "../form/FormControls";
import { CustomCollapse as Collapse } from "../form/CustomCollapse";
import { FormikText as CustomText } from "../form/formik/FormikText";
import { FormikTextArea as CustomTextArea } from "../form/formik/FormikTextArea";
import { Formik, Field, Form } from "formik";

export const FyysinenTietovarantoForm = ({
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
      kuvaus: "",
      omistaja: "",
      muuta: "",
      rivimuokattupvm: "",
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
        modifyUser={initialValues.rivimuokkaajatunnus}
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
            <CustomText name="omistaja" label="Omistaja" readOnly={!edit} />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-12">
            <CustomTextArea name="muuta" label="Muuta" readOnly={!edit} />
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
