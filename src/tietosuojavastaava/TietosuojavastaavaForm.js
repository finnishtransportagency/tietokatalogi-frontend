import React from "react";
import { Form, Text } from "react-form";
import { FormControls, validate, validateAll } from "../form/FormControls";
import { CustomCollapse as Collapse } from "../form/CustomCollapse";

export class TietosuojavastaavaForm extends React.Component {
  render() {
    const { edit, values } = this.props;

    return (
      <Form
        validateError={(values) => validateAll(values, validate)}
        onSubmit={(values) => {
          delete values.noRightsToModify;
          this.props.onSubmit(values);
        }}
        getApi={(formApi) => {
          formApi.setAllValues(values);
        }}
        defaultValues={values}
      >
        {(formApi) => (
          <form onSubmit={formApi.submitForm}>
            <Collapse
              header={`Kaikki tiedot: ${values.nimi || ""}`}
              isOpened={true}
              lastModified={values.rivimuokattupvm}
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
                    <label htmlFor="osoite" className="row">
                      Osoite
                    </label>
                    <div className="row">
                      <Text
                        field="osoite"
                        type="text"
                        className="tk-field form-control"
                        id="osoite"
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
                    <label htmlFor="sahkoposti" className="row">
                      Sähköposti
                    </label>
                    <div className="row">
                      <Text
                        field="sahkoposti"
                        type="text"
                        className="tk-field form-control"
                        id="sahkoposti"
                        placeholder=""
                        readOnly={!edit}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="puhelinnumero" className="row">
                      Puhelinnumero
                    </label>
                    <div className="row">
                      <Text
                        field="puhelinnumero"
                        type="text"
                        className="tk-field form-control"
                        id="puhelinnumero"
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
              setEditable={this.props.setEditable}
              submitForm={formApi.submitForm}
              resetForm={formApi.resetAll}
              cancelNew={this.props.cancelNew}
              remove={this.props.remove}
            />
          </form>
        )}
      </Form>
    );
  }
}
