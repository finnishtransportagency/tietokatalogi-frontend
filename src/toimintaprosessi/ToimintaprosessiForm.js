import React from "react";
import { Form, Text } from "react-form";
import { FormControls, validate, validateAll } from "../form/FormControls";
import { CustomCollapse as Collapse } from "../form/CustomCollapse";
import { CreatableCustomSelect } from "../form/CreatableCustomSelect";
import { LinkifyTextArea as TextArea } from "../form/LinkifyTextArea";

export class ToimintaprosessiForm extends React.Component {
  render() {
    const { edit, values, resources } = this.props;

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
                    <label htmlFor="vastaava_organisaatio" className="row">
                      Vastuutaho
                    </label>
                    <div className="row">
                      <CreatableCustomSelect
                        field="vastaava_organisaatio"
                        type="text"
                        className="tk-field form-control"
                        id="vastaava_organisaatio"
                        placeholder=""
                        readOnly={!edit}
                        resources={resources}
                        noResultsText="Ei tuloksia"
                        clearable={true}
                        resetValue="reset"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="tarkoitus" className="row">
                      Tarkoitus
                    </label>
                    <div className="row">
                      <TextArea
                        field="tarkoitus"
                        type="text"
                        className="tk-field form-control"
                        id="tarkoitus"
                        rows="5"
                        placeholder=""
                        readOnly={!edit}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="tyotila" className="row">
                      Prosessin toimintajärjestelmän työtila
                    </label>
                    <div className="row">
                      <TextArea
                        field="tyotila"
                        type="text"
                        className="tk-field form-control"
                        id="tyotila"
                        rows="2"
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
