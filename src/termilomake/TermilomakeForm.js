import React from "react";
import { Form, StyledText, Text, Radio, RadioGroup } from "react-form";

import { CustomCollapse } from "../form/CustomCollapse";
import { FormControls, validate, validateAll } from "../form/FormControls";
import { CustomMultiselect } from "../form/CustomMultiselect";
import { LinkifyTextArea as TextArea } from "../form/LinkifyTextArea";

export class TermilomakeForm extends React.Component {
  render() {
    const {
      edit,
      values,
      setEditable,
      resources,
      onSubmit,
      cancelNew,
      remove,
    } = this.props;

    return (
      <Form
        getApi={(formApi) => {
          formApi.setAllValues(values);
        }}
        validateError={(values) => {
          return {
            ...validateAll(values, validate),
          };
        }}
        onSubmit={(values) => {
          delete values.noRightsToModify;
          onSubmit(values);
        }}
        defaultValues={values}
      >
        {(formApi) => (
          <form onSubmit={formApi.submitForm}>
            <CustomCollapse
              header={`Kaikki tiedot: ${values.nimi || ""}`}
              isOpened={true}
              lastModified={values.rivimuokattupvm}
              created={values.riviluotupvm}
              modifyUser={values.rivimuokkaajatunnus}
            >
              <div className="form-group row">
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="nimi" className="row">
                      Ensisijainen termi
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
                    <label htmlFor="valmis" className="row">
                      Valmis / luonnos
                    </label>
                    <div className="row">
                      <RadioGroup
                        id="valmis"
                        className="tk-field form-control"
                        readOnly={!edit}
                        field="valmis"
                      >
                        {(group) => (
                          <div className="row">
                            <div className="col-xs-6 col-md-6 col-lg-2">
                              <Radio
                                group={group}
                                value={"true"}
                                disabled={!edit}
                              />
                              &nbsp;
                              <span>Valmis</span>
                            </div>
                            <div className="col-xs-6 col-md-6 col-lg-2">
                              <Radio
                                group={group}
                                value={"false"}
                                disabled={!edit}
                              />
                              &nbsp;
                              <span>Luonnos</span>
                            </div>
                          </div>
                        )}
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="maaritelma" className="row">
                      Määritelmä
                    </label>
                    <div className="row">
                      <TextArea
                        field="maaritelma"
                        type="text"
                        className="tk-field form-control"
                        id="maaritelma"
                        placeholder=""
                        readOnly={!edit}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="kayttoaluerajaus" className="row">
                      Määritelmän käyttöaluerajaus
                    </label>
                    <div className="row">
                      <Text
                        field="kayttoaluerajaus"
                        type="text"
                        className="tk-field form-control"
                        id="kayttoaluerajaus"
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
                    <label htmlFor="huomautusList" className="row">
                      Huomautukset
                    </label>
                  </div>
                </div>
              </div>

              <div id="huomautusList">
                {formApi.values.huomautusList &&
                  formApi.values.huomautusList.map((huomautus, i) => (
                    <div className="form-group row" key={`huomautus-${i}`}>
                      <div className="col-sm-6">
                        <TextArea
                          field={["huomautusList", i]}
                          type="text"
                          className="tk-field form-control"
                          id={`huomautus-${i}`}
                          placeholder=""
                          readOnly={!edit}
                        />
                      </div>

                      <div className="col-sm-6">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() =>
                            formApi.removeValue("huomautusList", i)
                          }
                          disabled={!edit}
                        >
                          Poista huomautus
                        </button>
                      </div>
                    </div>
                  ))}

                {edit && (
                  <div className="form-group row">
                    <div className="col-sm-12">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => formApi.addValue("huomautusList", "")}
                        disabled={!edit}
                      >
                        Lisää huomautus
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-group row">
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="synonyymit" className="row">
                      Synonyymi(t)
                    </label>
                    <div className="row">
                      <Text
                        field="synonyymit"
                        type="text"
                        className="tk-field form-control"
                        id="synonyymit"
                        placeholder=""
                        readOnly={!edit}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="ei_suosit_termi" className="row">
                      Termi, jonka käyttöä ei suositella
                    </label>
                    <div className="row">
                      <Text
                        field="ei_suosit_termi"
                        type="text"
                        className="tk-field form-control"
                        id="ei_suosit_termi"
                        placeholder=""
                        readOnly={!edit}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="hierarkk_ylakasite" className="row">
                      Hierarkkinen yläkäsite
                    </label>
                    <div className="row">
                      <CustomMultiselect
                        field="hierarkk_ylakasite"
                        type="text"
                        className="tk-field form-control"
                        id="hierarkk_ylakasite"
                        placeholder=""
                        readOnly={!edit}
                        resources={resources}
                        noResultsText="Ei tuloksia"
                        clearable={true}
                        resetValue="reset"
                        useID={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="koostumussuht_ylakasite" className="row">
                      Koostumussuhteinen yläkäsite
                    </label>
                    <div className="row">
                      <CustomMultiselect
                        field="koostumussuht_ylakasite"
                        type="text"
                        className="tk-field form-control"
                        id="koostumussuht_ylakasite"
                        placeholder=""
                        readOnly={!edit}
                        resources={resources}
                        noResultsText="Ei tuloksia"
                        clearable={true}
                        resetValue="reset"
                        useID={true}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="assosiatiiv_kasite" className="row">
                      Käsite, johon on assosiatiivinen suhde
                    </label>
                    <div className="row">
                      <CustomMultiselect
                        field="assosiatiiv_kasite"
                        type="text"
                        className="tk-field form-control"
                        id="assosiatiiv_kasite"
                        placeholder=""
                        readOnly={!edit}
                        resources={resources}
                        noResultsText="Ei tuloksia"
                        clearable={true}
                        resetValue="reset"
                        useID={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="hakutermit" className="row">
                      Hakutermit
                    </label>
                    <div className="row">
                      <Text
                        field="hakutermit"
                        type="text"
                        className="tk-field form-control"
                        id="hakutermit"
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
                    <label htmlFor="muokattava_tunnus" className="row">
                      Käsitteen tunnus
                    </label>
                    <div className="row">
                      <StyledText
                        field="muokattava_tunnus"
                        type="text"
                        className="tk-field form-control"
                        id="muokattava_tunnus"
                        placeholder=""
                        readOnly={!edit}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="ydinkasite" className="row">
                      Ydinkäsite
                    </label>
                    <div className="row">
                      <RadioGroup
                        id="ydinkasite"
                        className="tk-field form-control"
                        readOnly={!edit}
                        field="ydinkasite"
                      >
                        {(group) => (
                          <div className="row">
                            <div className="col-xs-6 col-md-6 col-lg-2">
                              <Radio
                                group={group}
                                value={"true"}
                                disabled={!edit}
                              />
                              &nbsp;
                              <span>Kyllä</span>
                            </div>
                            <div className="col-xs-6 col-md-6 col-lg-2">
                              <Radio
                                group={group}
                                value={"false"}
                                disabled={!edit}
                              />
                              &nbsp;
                              <span>Ei</span>
                            </div>
                          </div>
                        )}
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="omistaja" className="row">
                      Omistaja
                    </label>
                    <div className="row">
                      <Text
                        field="omistaja"
                        type="text"
                        className="tk-field form-control"
                        id="omistaja"
                        placeholder=""
                        readOnly={!edit}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="lahde" className="row">
                      Lähde / master
                    </label>
                    <div className="row">
                      <Text
                        field="lahde"
                        type="text"
                        className="tk-field form-control"
                        id="lahde"
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
                    <label htmlFor="kommentit" className="row">
                      Kommentteja jatkokäsittelyä varten
                    </label>
                    <div className="row">
                      <Text
                        field="kommentit"
                        type="text"
                        className="tk-field form-control"
                        id="kommentit"
                        placeholder=""
                        readOnly={!edit}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="kasitekaavio_linkki" className="row">
                      Käsitekaavio (linkki)
                    </label>
                    {edit ? (
                      <React.Fragment>
                        <div
                          className="row"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "0.5em",
                          }}
                        >
                          <small style={{ width: "8em" }}>Linkin osoite</small>
                          <TextArea
                            field="kasitekaavio_linkki"
                            type="text"
                            className="tk-field form-control"
                            id="kasitekaavio_linkki"
                            placeholder=""
                            readOnly={!edit}
                            rows="1"
                          />
                        </div>
                        <div
                          className="row"
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <small style={{ width: "8em" }}>Linkin teksti</small>
                          <TextArea
                            field="kasitekaavio_linkki_nimi"
                            type="text"
                            className="tk-field form-control"
                            id="kasitekaavio_linkki_nimi"
                            placeholder=""
                            readOnly={!edit}
                            rows="1"
                          />
                        </div>
                      </React.Fragment>
                    ) : (
                      <div className="row">
                        <a
                          className="tk-field form-control"
                          readOnly
                          href={formApi.values["kasitekaavio_linkki"]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {formApi.values["kasitekaavio_linkki_nimi"]}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="pdf_linkki" className="row">
                      Sanasto Pdf-muodossa (linkki)
                    </label>
                    {edit ? (
                      <React.Fragment>
                        <div
                          className="row"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "0.5em",
                          }}
                        >
                          <small style={{ width: "8em" }}>Linkin osoite</small>
                          <TextArea
                            field="pdf_linkki"
                            type="text"
                            className="tk-field form-control"
                            id="pdf_linkki"
                            placeholder=""
                            readOnly={!edit}
                            rows="1"
                          />
                        </div>
                        <div
                          className="row"
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <small style={{ width: "8em" }}>Linkin teksti</small>
                          <TextArea
                            field="pdf_linkki_nimi"
                            type="text"
                            className="tk-field form-control"
                            id="pdf_linkki_nimi"
                            placeholder=""
                            readOnly={!edit}
                            rows="1"
                          />
                        </div>
                      </React.Fragment>
                    ) : (
                      <div className="row">
                        <a
                          className="tk-field form-control"
                          readOnly
                          href={formApi.values["pdf_linkki"]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {formApi.values["pdf_linkki_nimi"]}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CustomCollapse>

            <FormControls
              noRightsToModify={values.noRightsToModify}
              edit={edit}
              values={formApi.values}
              errors={formApi.errors}
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
