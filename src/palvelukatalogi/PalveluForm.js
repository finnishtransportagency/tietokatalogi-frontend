import React from "react";
import { Form, Text } from "react-form";
import { LinkifyTextArea as TextArea } from "../form/LinkifyTextArea";
import { FormControls, validate, validateAll } from "../form/FormControls";
import { CustomCollapse as Collapse } from "../form/CustomCollapse";
import { CustomSelect } from "../form/CustomSelect";
import { lowerWithoutScandics } from "../utils";

export class PalveluForm extends React.Component {
  render() {
    const {
      edit,
      onSubmit,
      remove,
      setEditable,
      cancelNew,
      values,
      resources,
      onYlatasoChange,
    } = this.props;

    // TODO workaround until db accepts id's instead of names
    let otsikkoResources = null;

    if (values && values["ylataso"] && resources) {
      const currId = values["ylataso"];
      if (currId) {
        otsikkoResources = {
          otsikko: resources[lowerWithoutScandics(currId)],
        };
      }
    }

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
              modifyUser={values.rivimuokkaajatunnus}
            >
              <div className="form-group row">
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="nimi" className="row">
                      Nimi
                    </label>
                    <div className="row">
                      <TextArea
                        field="nimi"
                        type="text"
                        className="tk-field form-control"
                        id="nimi"
                        rows="3"
                        placeholder=""
                        readOnly={!edit}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="vastuuhenkilo" className="row">
                      Vastuuhenkilö
                    </label>
                    <div className="row">
                      <Text
                        field="vastuuhenkilo"
                        type="text"
                        className="tk-field form-control"
                        id="vastuuhenkilo"
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
                    <label htmlFor="ylataso" className="row">
                      Ylätaso
                    </label>
                    <div className="row">
                      <CustomSelect
                        field="ylataso"
                        type="text"
                        className="tk-field form-control"
                        id="ylataso"
                        placeholder=""
                        readOnly={!edit}
                        resources={resources}
                        onChange={(ylataso) => {
                          const newval =
                            ylataso && ylataso.value ? ylataso.value : null;
                          // NB react-form will not update
                          // otherwise
                          formApi.setValue("ylataso", newval);
                          onYlatasoChange(newval);
                        }}
                        palveluCustomOptions={
                          values &&
                          values["ylataso"] &&
                          resources &&
                          resources["ylataso"]
                            ? {
                                currYlataso: values["ylataso"],
                                ylatasoList: resources["ylataso"],
                              }
                            : null
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="otsikko" className="row">
                      Otsikko
                    </label>
                    <div className="row">
                      <CustomSelect
                        field="otsikko"
                        type="text"
                        className="tk-field form-control"
                        id="otsikko"
                        placeholder=""
                        readOnly={!edit}
                        resources={otsikkoResources}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12">
                  <div className="col-sm-12">
                    <label htmlFor="kuvaus" className="row">
                      Kuvaus
                    </label>
                    <div className="row">
                      <TextArea
                        field="kuvaus"
                        type="text"
                        className="tk-field form-control"
                        id="kuvaus"
                        rows="5"
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
                    <label htmlFor="asiakkaat" className="row">
                      Asiakkaat
                    </label>
                    <div className="row">
                      <TextArea
                        field="asiakkaat"
                        type="text"
                        className="tk-field form-control"
                        id="asiakkaat"
                        rows="5"
                        placeholder=""
                        readOnly={!edit}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="saatavuus" className="row">
                      Saatavuus
                    </label>
                    <div className="row">
                      <Text
                        field="saatavuus"
                        type="text"
                        className="tk-field form-control"
                        id="saatavuus"
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
                    <label htmlFor="vasteajat" className="row">
                      Vasteajat
                    </label>
                    <div className="row">
                      <Text
                        field="vasteajat"
                        type="text"
                        className="tk-field form-control"
                        id="vasteajat"
                        placeholder=""
                        readOnly={!edit}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="ohje_pt" className="row">
                      Palvelun tilaus
                    </label>
                    <div className="row">
                      <TextArea
                        field="ohje_pt"
                        className="tk-field form-control"
                        id="ohje_pt"
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
                    <label htmlFor="ohjeistus" className="row">
                      Ohjeistus
                    </label>
                    <div className="row">
                      <TextArea
                        field="ohjeistus"
                        type="text"
                        className="tk-field form-control"
                        id="ohjeistus"
                        rows="3"
                        placeholder=""
                        readOnly={!edit}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="ohjesaannot" className="row">
                      Ohjesäännöt
                    </label>
                    <div className="row">
                      <TextArea
                        field="ohjesaannot"
                        className="tk-field form-control"
                        id="ohjesaannot"
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
              errors={formApi.errors}
              values={formApi.values}
              setEditable={setEditable}
              submitForm={formApi.submitForm}
              resetForm={formApi.resetAll}
              cancelNew={cancelNew}
              remove={remove}
            />
          </form>
        )}
      </Form>
    );
  }
}
