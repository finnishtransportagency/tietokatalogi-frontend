import React from "react";
import { FormControls, formikValidateName } from "../form/FormControls";
import { CustomCollapse as Collapse } from "../form/CustomCollapse";
import { YlatasoSelect, OtsikkoSelect } from "./components";
import { Formik, Form, Field } from "formik";
import { FormikText as CustomText } from "../form/formik/FormikText";
import { FormikTextArea as CustomTextArea } from "../form/formik/FormikTextArea";

export const PalveluForm = ({
  edit,
  onSubmit,
  remove,
  setEditable,
  cancelNew,
  values: initialValues,
  resources,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validate={formikValidateName}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form>
        <Collapse
          header={`Kaikki tiedot: ${initialValues.nimi || ""}`}
          isOpened={true}
        >
          <div className="form-group row">
            <div className="col-sm-6">
              <CustomTextArea
                label="Nimi"
                name="nimi"
                readOnly={!edit}
                rows="3"
              />
            </div>
            <div className="col-sm-6">
              <CustomText
                label="Vastuuhenkilö"
                name="vastuuhenkilo"
                readOnly={!edit}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-6">
              <YlatasoSelect
                label="Ylätaso"
                name="ylataso"
                readOnly={!edit}
                resources={resources}
              />
            </div>
            <div className="col-sm-6">
              <OtsikkoSelect readOnly={!edit} resources={resources} />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-12">
              <CustomTextArea label="Kuvaus" name="kuvaus" readOnly={!edit} />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-6">
              <CustomTextArea
                label="Asiakkaat"
                name="asiakkaat"
                readOnly={!edit}
              />
            </div>
            <div className="col-sm-6">
              <CustomText label="Saatavuus" name="saatavuus" readOnly={!edit} />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-6">
              <CustomText
                label="Vasteajat"
                name="vasteajat"
                readOnly={!edit}
                rows="3"
              />
            </div>
            <div className="col-sm-6">
              <CustomTextArea
                label="Palvelun tilaus"
                name="ohje_pt"
                readOnly={!edit}
                rows="2"
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-6">
              <CustomTextArea
                label="Ohjeistus"
                name="ohjeistus"
                readOnly={!edit}
                rows="3"
              />
            </div>
            <div className="col-sm-6">
              <CustomTextArea
                label="Ohjesäännöt"
                name="ohjesaannot"
                readOnly={!edit}
                rows="2"
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
