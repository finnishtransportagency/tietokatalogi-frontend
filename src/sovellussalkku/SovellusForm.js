import React from "react";
import { CustomCollapse as Collapse } from "../form/CustomCollapse";
import { FormikCustomDatePicker } from "../form/formik/FormikCustomDatePicker";
import { FormControls, formikValidateName } from "../form/FormControls";
import { Roles } from "../utils";

import { Formik, Form, Field } from "formik";
import { FormikText as CustomText } from "../form/formik/FormikText";
import { FormikTextArea as CustomTextArea } from "../form/formik/FormikTextArea";
import { FormikPersonRoleList } from "../form/formik/FormikRoleList";

const preSubmit = (values) => {
  return {
    tunnus: values.tunnus,
    elinkaaritieto: values.elinkaaritieto,
    henkiloRooliList: [
      ...values.omistaja.map((person_id) => ({
        rooliId: Roles.OMISTAJA,
        henkiloId: person_id,
      })),
      ...values.vastaava.map((person_id) => ({
        rooliId: Roles.VASTAAVA,
        henkiloId: person_id,
      })),
    ],
  };
};

export const SovellusForm = ({
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
      onSubmit={(values) => onSubmit(preSubmit(values))}
      enableReinitialize
    >
      <Form>
        <Collapse
          header={`Yleiset: ${initialValues.nimi || ""}`}
          isOpened={true}
        >
          <div className="form-group row">
            <div className="col-sm-6">
              <CustomText label="Nimi" name="nimi" readOnly />
            </div>
            <div className="col-sm-6">
              <CustomTextArea label="Aliakset" name="aliasNimet" readOnly />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-6">
              <CustomText label="Valmistaja" name="valmistaja" readOnly />
            </div>
            <div className="col-sm-3">
              <CustomText label="Versio" name="versio" readOnly />
            </div>
            <div className="col-sm-3">
              <CustomText
                label="KonfiguraatioVersio"
                name="konfiguraatioVersio"
                readOnly
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-6">
              <CustomText
                label="Käyttöjärjestelmävaatimus"
                name="kayttojarjestelmavaatimus"
                readOnly
              />
            </div>
            <div className="col-sm-3">
              <CustomText label="Arkkitehtuuri" name="arkkitehtuuri" readOnly />
            </div>
            <div className="col-sm-3">
              <CustomText label="Alusta" name="alusta" readOnly />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-6">
              <CustomText
                label="Sovelluksen tyyppi"
                name="sovelluksenTyyppi"
                readOnly
              />
            </div>
            <div className="col-sm-6">
              <CustomText label="Kielisyys" name="kielisyys" readOnly />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-6">
              <CustomTextArea label="Lisätietoja" name="lisatietoja" readOnly />
            </div>
            <div className="col-sm-6">
              <CustomText label="Tuotekoodi" name="tuotekoodi" readOnly />
            </div>
          </div>
        </Collapse>

        <Collapse header={"Asennus"} isOpened={true}>
          <div className="form-group row">
            <div className="col-sm-6">
              <CustomText
                label="Riippuvuustieto"
                name="riippuvuustieto"
                readOnly
              />
            </div>
            <div className="col-sm-6">
              <CustomText
                label="Liittymät jarjestelmiin"
                name="liittymatJarjestelmiin"
                readOnly
              />
            </div>
          </div>
        </Collapse>

        <Collapse header={"Tuki"} isOpened={true}>
          <div className="form-group row">
            <FormikPersonRoleList
              name="omistaja"
              label="Omistaja"
              readOnly={!edit}
              resources={resources}
              allowAddAndRemove
            />
            <FormikPersonRoleList
              name="vastaava"
              label="Vastaava"
              readOnly={!edit}
              resources={resources}
              allowAddAndRemove
            />
          </div>
          <div className="form-group row">
            <FormikPersonRoleList
              name="tuotantoonHyvaksynyt"
              label="Tuotantoon hyväksynyt"
              readOnly
              resources={resources}
              allowAddAndRemove
            />
            <FormikPersonRoleList
              name="asennuksenHyvaksynyt"
              label="Asennuksen hyväksyjä"
              readOnly
              resources={resources}
              allowAddAndRemove
            />
          </div>
        </Collapse>

        <Collapse header={"Muuta"} isOpened={true}>
          <div className="form-group row">
            <div className="col-sm-6">
              <FormikCustomDatePicker
                label="Tuotantoonhyväksymispäivä"
                name="tuotantoonHyvaksymispaiva"
                readOnly
              />
            </div>
            <div className="col-sm-6">
              <CustomText label="Kriittisyys" name="kriittisyys" readOnly />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-12">
              <CustomTextArea
                label="Elinkaaritieto"
                name="elinkaaritieto"
                rows="2"
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
};
