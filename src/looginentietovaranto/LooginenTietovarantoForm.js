import React from "react";
import { fullURL } from "../App";
import { FormControls, formikValidateName } from "../form/FormControls";
import { CustomCollapse as Collapse } from "../form/CustomCollapse";
import { FormikCustomSelect } from "../form/formik/FormikSelect";
import { FormikText as CustomText } from "../form/formik/FormikText";
import { FormikTextArea as CustomTextArea } from "../form/formik/FormikTextArea";
import { Formik, Field, Form } from "formik";

export const LooginenTietovarantoForm = ({
  edit,
  onSubmit,
  remove,
  setEditable,
  cancelNew,
  values: initialValues,
  resources,
}) => {
  const { fyysinen: fyysinenLista = [], jarjestelma: jarjestelmaIds = [] } =
    resources ? resources : {};

  const linkToFys = initialValues.fyysinenTietovarantoId
    ? fullURL("#/fyysinen/tunnus", initialValues.fyysinenTietovarantoId)
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

  const fyysinenLabel = (
    <React.Fragment>Fyysinen tietovaranto{linkToFysEl}</React.Fragment>
  );

  return (
    <Formik
      initialValues={{
        nimi: "",
        kuvaus: "",
        omistaja: "",
        jarjestelmaIds: [],
        alue: "",
        paivitystiheys: "",
        fyysinenTietovarantoId: "",
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
            <div className="col-sm-6">
              <FormikCustomSelect
                name="jarjestelmaIds"
                label="Tietojärjestelmät"
                readOnly={!edit}
                resources={{ jarjestelmaIds: jarjestelmaIds }}
                useID
                isMulti
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-6">
              <FormikCustomSelect
                name="alue"
                label="Alue"
                readOnly={!edit}
                resources={resources}
                useID
              />
            </div>
            <div className="col-sm-6">
              <CustomText
                name="paivitystiheys"
                label="Päivitystiheys"
                readOnly={!edit}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-6">
              <FormikCustomSelect
                label={fyysinenLabel}
                name={"fyysinenTietovarantoId"}
                readOnly={!edit}
                resources={{
                  fyysinenTietovarantoId: fyysinenLista,
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
