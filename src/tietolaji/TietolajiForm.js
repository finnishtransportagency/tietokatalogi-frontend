import React from "react";
import { Formik, Form, Field } from "formik";
import { FormControls, formikValidateName } from "../form/FormControls";
import { CustomCollapse as Collapse } from "../form/CustomCollapse";
import { FormikText as CustomText } from "../form/formik/FormikText";
import { FormikTextArea as CustomTextArea } from "../form/formik/FormikTextArea";
import { FormikCustomSelect } from "../form/formik/FormikSelect";
import { fullURL } from "../App";

export const TietolajiForm = ({
  edit,
  onSubmit,
  remove,
  setEditable,
  cancelNew,
  values: initialValues,
  resources,
}) => {
  const {
    tietoryhma: tietoryhmatunnusLista = [],
    looginen: looginenTietovarantoTunnusLista = [],
  } = resources ? resources : {};

  const linkToTR = initialValues.tietoryhmatunnus
    ? fullURL("#/tietoryhma/tunnus", initialValues.tietoryhmatunnus)
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
  const tietoryhmaLabel = (
    <React.Fragment>Tietoryhmä{linkToTREl}</React.Fragment>
  );

  const linkToLog = initialValues.looginenTietovarantoTunnus
    ? fullURL("#/looginen/tunnus", initialValues.looginenTietovarantoTunnus)
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
  const looginenLabel = (
    <React.Fragment>Looginen tietovaranto{linkToLogEl}</React.Fragment>
  );

  return (
    <Formik
      initialValues={{
        nimi: "",
        kuvaus: "",
        omistaja: "",
        lahde: "",
        tila: "",
        tietoryhmatunnus: "",
        looginenTietovarantoTunnus: "",
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
              <CustomText name="lahde" label="Lähde" readOnly={!edit} />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-6">
              <FormikCustomSelect
                name="tila"
                label="Tila"
                readOnly={!edit}
                resources={resources}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-6">
              <FormikCustomSelect
                name="tietoryhmatunnus"
                label={tietoryhmaLabel}
                readOnly={!edit}
                resources={{ tietoryhmatunnus: tietoryhmatunnusLista }}
                useID
              />
            </div>
            <div className="col-sm-6">
              <FormikCustomSelect
                name="looginenTietovarantoTunnus"
                label={looginenLabel}
                readOnly={!edit}
                resources={{
                  looginenTietovarantoTunnus: looginenTietovarantoTunnusLista,
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
