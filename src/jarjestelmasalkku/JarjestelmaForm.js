import React from "react";
import {
  Form,
  StyledText,
  Text,
  Radio,
  RadioGroup,
  Checkbox,
} from "react-form";
import { LinkifyTextArea as TextArea } from "../form/LinkifyTextArea";
import {
  FormControls,
  validate,
  validateAll,
  validateNotEmpty,
  validateVastaava,
} from "../form/FormControls";
import { CustomCollapse as Collapse } from "../form/CustomCollapse";
import { UrlTextField } from "../form/UrlTextField";
import { CustomDatePicker } from "../form/CustomDatePicker";
import { CustomSelect as Select } from "../form/CustomSelect";
import { LinkList, validateLinkList } from "../form/LinkList";
import {
  getReversedLink,
  convertLinksFromMultiselectToSendableFormat,
} from "./JarjestelmaLinkUtils";
import { fullRestURL } from "../App.js";
import FileDownload from "react-file-download";
import axios from "axios";
import { CreatableCustomSelect } from "../form/CreatableCustomSelect";
import { HenkiloRooli } from "../henkilorooli/HenkiloRooli";
import { capitalize, roleIdToRooliDescription, Roles } from "../utils";

export class JarjestelmaForm extends HenkiloRooli {
  constructor(props) {
    const modifyRoles = [Roles.OMISTAJA, Roles.VASTAAVA, Roles.SIJAINEN];
    const singlePersonRoles = [Roles.OMISTAJA, Roles.VASTAAVA];
    super(props, modifyRoles, singlePersonRoles);
    this.modifyRoles = modifyRoles;
  }

  render() {
    const {
      edit,
      resources,
      onSubmit,
      remove,
      setEditable,
      cancelNew,
      values,
    } = this.props;
    let downloadDescription = null;

    // rooliPersonList is inherited from superclass
    const roleToRolepersonList = this.mapRoleToRolePersons(
      this.state.rooliPersonList
    );

    //Scale this later
    let disabled = {};
    if (values.noRightsToModify) {
      disabled = {
        tietoturvasopimus:
          !edit || values.noRightsToModify.includes("tietoturvasopimus"),
      };
    }
    if (values.tunnus) {
      const descriptionName =
        values.nimi && values.nimi.length > 0
          ? `${values.nimi} - järjestelmäseloste`
          : "Järjestelmäseloste";
      const encodedDescriptionName = encodeURI(descriptionName);
      const url = fullRestURL(
        `/jarjestelma/generateReport/${encodedDescriptionName}/${values.tunnus}`
      );
      downloadDescription = (
        <button
          type="button"
          className="btn btn-default"
          onClick={() => {
            axios
              .get(url, { responseType: "arraybuffer" })
              .then((response) => {
                let name = descriptionName;
                let contentType = "application/pdf";
                try {
                  const filename =
                    response.headers["content-disposition"].split(
                      "filename="
                    )[1];
                  if (filename.length > 0) name = filename;
                } catch (e) {}
                try {
                  if (response.headers["content-type"].length > 0)
                    contentType = response.headers["content-type"];
                } catch (e) {}
                FileDownload(response.data, name, contentType);
              })
              .catch(function (error) {
                console.log("Error while fetching data:", error);
              });
          }}
        >
          Lataa järjestelmäseloste
        </button>
      );
    }

    values.henkiloRooliList = this.state.rooliPersonList;

    return (
      <Form
        validateError={(values) => {
          return validateAll(
            values,
            validate,
            validateLinkList,
            validateNotEmpty(["omistava_organisaatio"]),
            validateVastaava
          );
        }}
        onSubmit={(values) => {
          if (values && values.noRightsToModify) {
            if (values.noRightsToModify.includes("ALL_FIELDS"))
              return this.props.onSubmit({});
            values.noRightsToModify.forEach((field) => delete values[field]);
          }
          delete values.noRightsToModify;

          values["henkiloRooliList"] = values.henkiloRooliList.filter(
            (henkiloRooli) =>
              henkiloRooli !== null &&
              henkiloRooli.rooliId !== null &&
              henkiloRooli.henkiloId !== null &&
              this.modifyRoles.includes(parseInt(henkiloRooli.rooliId, 10))
          );

          if (values.jarjestelmaLinkkausListMultiselect) {
            const sendFormatValues =
              convertLinksFromMultiselectToSendableFormat(
                values.jarjestelmaLinkkausListMultiselect,
                values.jarjestelmaLinkkausMetadata || {}
              );
            delete values.jarjestelmaLinkkausListMultiselect;
            delete values.jarjestelmaLinkkausMetadata;

            values.jarjestelmaLinkkausList = sendFormatValues.map((link) => {
              if (link.isReversed && link.isReversed === true) {
                delete link.isReversed;
                return getReversedLink(link);
              }
              return link;
            });
          }
          onSubmit(values);
        }}
        defaultValues={values}
        dontValidateOnMount={true}
      >
        {(formApi) => (
          <form onSubmit={formApi.submitForm}>
            <Collapse
              header={`Yleiset: ${values.nimi || ""}`}
              isOpened={true}
              edit={edit}
              lastModified={values.rivimuokattupvm}
            >
              <div className="form-group row">
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="nimi" className="row">
                      Järjestelmän nimi
                    </label>
                    <div className="row">
                      <StyledText
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
                    <label htmlFor="lyhennetty_nimi" className="row">
                      Lyhyt nimi
                    </label>
                    <div className="row">
                      <Text
                        field="lyhennetty_nimi"
                        type="text"
                        className="tk-field form-control"
                        id="lyhennetty_nimi"
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
                {/* ANALPK-1181 - Järjestelmäalue hidden for now, to be taken into use later */}
                <div className="col-sm-6 hidden">
                  <div className="col-sm-12">
                    <label htmlFor="jarjestelmaalue" className="row">
                      Järjestelmäalue
                    </label>
                    <div className="row">
                      <Select
                        field="jarjestelmaalue"
                        className="tk-field form-control"
                        id="jarjestelmaalue"
                        placeholder=""
                        readOnly={!edit}
                        resources={resources}
                        noResultsText="Ei tuloksia"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="tunnus" className="row">
                      Järjestelmätunnus
                    </label>
                    <div className="row">
                      <Text
                        field="tunnus"
                        type="text"
                        className="tk-field form-control"
                        id="tunnus"
                        readOnly={true}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="jarjestelmatyyppi"
                                            className="row"
                                        >
                                            Järjestelmätyyppi
                                        </label>
                                        <div className="row">
                                            <Select
                                                field="jarjestelmatyyppi"
                                                type="text"
                                                className="tk-field form-control"
                                                id="jarjestelmatyyppi"
                                                placeholder=""
                                                readOnly={!edit}
                                                resources={resources}
                                                noResultsText="Ei tuloksia"
                                            />
                                        </div>
                                    </div>
                                </div> */}
                {/* <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="ulkoiset_kayttajat"
                                            className="row"
                                        >
                                            Ulkoiset käyttäjät
                                        </label>
                                        <div className="row">
                                            <Text
                                                field="ulkoiset_kayttajat"
                                                type="text"
                                                className="tk-field form-control"
                                                id="ulkoiset_kayttajat"
                                                placeholder=""
                                                readOnly={!edit}
                                            />
                                        </div>
                                    </div>
                                </div> */}
              </div>

              <div className="form-group row">
                {Object.keys(roleToRolepersonList).map((roleId) => {
                  const allowToMod = this.modifyRoles.includes(
                    parseInt(roleId, 10)
                  );
                  return (
                    <div className="col-sm-6" key={roleId}>
                      <div className="col-sm-12">
                        <label
                          htmlFor={roleIdToRooliDescription(roleId)}
                          className="row"
                        >
                          {capitalize(roleIdToRooliDescription(roleId))}
                        </label>
                        <div className="row">
                          {this.roleList(
                            formApi,
                            roleToRolepersonList[parseInt(roleId, 10)],
                            roleId,
                            {
                              for: roleIdToRooliDescription(roleId),
                              value: "",
                            },
                            allowToMod && edit
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="form-group row">
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="toimittaja" className="row">
                      Toimittaja
                    </label>
                    <div className="row">
                      <Text
                        field="toimittaja"
                        type="text"
                        className="tk-field form-control"
                        id="toimittaja"
                        placeholder=""
                        readOnly={!edit}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="toimittajan_yhteyshenkilo" className="row">
                      Toimittajan yhteyshenkilö
                    </label>
                    <div className="row">
                      <Text
                        field="toimittajan_yhteyshenkilo"
                        type="text"
                        className="tk-field form-control"
                        id="toimittajan_yhteyshenkilo"
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
                    <label htmlFor="toimittajan_tekn_yh" className="row">
                      Toimittajan tekninen yhteyshenkilö
                    </label>
                    <div className="row">
                      <Text
                        field="toimittajan_tekn_yh"
                        type="text"
                        className="tk-field form-control"
                        id="toimittajan_tekn_yh"
                        placeholder=""
                        readOnly={!edit}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="muut_toimittajat" className="row">
                      Muut toimittajat
                    </label>
                    <div className="row">
                      <Text
                        field="muut_toimittajat"
                        type="text"
                        className="tk-field form-control"
                        id="muut_toimittajat"
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
                    <label htmlFor="kayttopalvelun_toimittaja" className="row">
                      Käyttöpalvelun toimittaja
                    </label>
                    <div className="row">
                      <Text
                        field="kayttopalvelun_toimittaja"
                        type="text"
                        className="tk-field form-control"
                        id="kayttopalvelun_toimittaja"
                        placeholder=""
                        readOnly={!edit}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="omistava_organisaatio" className="row">
                      Omistava organisaatio
                    </label>
                    <div className="row">
                      <Select
                        field="omistava_organisaatio"
                        type="text"
                        className="tk-field form-control"
                        id="omistava_organisaatio"
                        placeholder=""
                        readOnly={!edit}
                        resources={resources}
                        noResultsText="Ei tuloksia"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="alfresco_linkki" className="row">
                      Alfresco-linkki
                    </label>
                    <div className="row">
                      <UrlTextField
                        field="alfresco_linkki"
                        className="tk-field form-control"
                        id="alfresco_linkki"
                        placeholder=""
                        readOnly={!edit}
                        longLink={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="elinkaaritila" className="row">
                      Elinkaari
                    </label>
                    <div className="row">
                      <Select
                        field="elinkaaritila"
                        type="text"
                        className="tk-field form-control"
                        id="elinkaaritila"
                        placeholder=""
                        readOnly={!edit}
                        resources={resources}
                        noResultsText="Ei tuloksia"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="kayttoonottovuosi" className="row">
                      Käyttöönottovuosi
                    </label>
                    <div className="row">
                      <Text
                        field="kayttoonottovuosi"
                        type="text"
                        className="tk-field form-control"
                        id="kayttoonottovuosi"
                        placeholder=""
                        readOnly={!edit}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="poistovuosi" className="row">
                      Poistovuosi
                    </label>
                    <div className="row">
                      <Text
                        field="poistovuosi"
                        type="text"
                        className="tk-field form-control"
                        id="poistovuosi"
                        placeholder=""
                        readOnly={!edit}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="tietovarastot"
                                            className="row"
                                        >
                                            Tietovarastot
                                        </label>
                                        <div className="row">
                                            <Text
                                                field="tietovarastot"
                                                type="text"
                                                className="tk-field form-control"
                                                id="tietovarastot"
                                                placeholder=""
                                                readOnly={!edit}
                                            />
                                        </div>
                                    </div>
                                </div> */}
              </div>

              {/* <div className="form-group row">
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="sisaisten_kayttajien_maara"
                                            className="row"
                                        >
                                            Sisäisten käyttäjien määrä
                                        </label>
                                        <div className="row">
                                            <Text
                                                field="sisaisten_kayttajien_maara"
                                                type="text"
                                                className="tk-field form-control"
                                                id="sisaisten_kayttajien_maara"
                                                placeholder=""
                                                readOnly={!edit}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="tietoj_internet_osoite"
                                            className="row"
                                        >
                                            Tietojärjestelmän internet-osoite
                                        </label>
                                        <div className="row">
                                            <Text
                                                field="tietoj_internet_osoite"
                                                type="text"
                                                className="tk-field form-control"
                                                id="tietoj_internet_osoite"
                                                placeholder=""
                                                readOnly={!edit}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div> */}

              <div className="form-group row">
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="document_id" className="row">
                      Document ID
                    </label>
                    <div className="row">
                      <Text
                        field="document_id"
                        type="text"
                        className="tk-field form-control"
                        id="document_id"
                        placeholder=""
                        readOnly={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="confluence_linkki" className="row">
                      Confluence-linkki
                    </label>
                    <div className="row">
                      <UrlTextField
                        field="confluence_linkki"
                        className="tk-field form-control"
                        id="confluence_linkki"
                        placeholder=""
                        readOnly={!edit}
                        longLink={true}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="paasynhallinta" className="row">
                      Pääsynhallinta
                    </label>
                    <div className="row">
                      <Select
                        field="paasynhallinta"
                        type="text"
                        className="tk-field form-control"
                        id="paasynhallinta"
                        placeholder=""
                        readOnly={!edit}
                        resources={resources}
                        noResultsText="Ei tuloksia"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="budjetti" className="row">
                      Budjetti
                    </label>
                    <div className="row">
                      <CreatableCustomSelect
                        field="budjetti"
                        type="text"
                        className="tk-field form-control"
                        id="budjetti"
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
                    <label htmlFor="rahoitusmomentti" className="row">
                      Rahoitusmomentti
                    </label>
                    <div className="row">
                      <Select
                        field="rahoitusmomentti"
                        type="text"
                        className="tk-field form-control"
                        id="rahoitusmomentti"
                        placeholder=""
                        readOnly={!edit}
                        resources={resources}
                        noResultsText="Ei tuloksia"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Collapse>

            {/* <Collapse header={"Teknologia"} isOpened={true}>
                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="portaalipalvelu"
                                            className="row"
                                        >
                                            Portaali
                                        </label>
                                        <div className="row">
                                            <Select
                                                field="portaalipalvelu"
                                                type="text"
                                                className="tk-field form-control"
                                                id="portaalipalvelu"
                                                placeholder=""
                                                readOnly={!edit}
                                                resources={resources}
                                                noResultsText="Ei tuloksia"
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="toteutusteknologia"
                                            className="row"
                                        >
                                            Toteutusteknologia
                                        </label>
                                        <div className="row">
                                            <Select
                                                field="toteutusteknologia"
                                                type="text"
                                                className="tk-field form-control"
                                                id="toteutusteknologia"
                                                placeholder=""
                                                readOnly={!edit}
                                                resources={resources}
                                                noResultsText="Ei tuloksia"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="palvelimen_kayttojarjestelma"
                                            className="row"
                                        >
                                            Palvelimen käyttöjärjestelmä TODO
                                        </label>
                                        <div className="row">
                                            <Select
                                                field="palvelimen_kayttojarjestelma"
                                                type="text"
                                                className="tk-field form-control"
                                                id="palvelimen_kayttojarjestelma"
                                                placeholder=""
                                                readOnly={!edit}
                                                resources={resources}
                                                noResultsText="Ei tuloksia"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Collapse> */}

            <Collapse header={"Tietoturva"} isOpened={true} edit={edit}>
              <div className="form-group row">
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="liik_turvallisuusluokka" className="row">
                      Liikenneturvallisuusluokka
                    </label>
                    <div className="row">
                      <Select
                        field="liik_turvallisuusluokka"
                        type="text"
                        className="tk-field form-control"
                        id="liik_turvallisuusluokka"
                        placeholder=""
                        readOnly={!edit}
                        resources={resources}
                        noResultsText="Ei tuloksia"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="yhteisk_kriit_jarj" className="row">
                      Yhteiskuntakriittinen järjestelmä
                    </label>
                    <div className="row">
                      <RadioGroup
                        id="yhteisk_kriit_jarj"
                        className="tk-field form-control"
                        readOnly={!edit}
                        field="yhteisk_kriit_jarj"
                      >
                        {(group) => (
                          <div className="row">
                            <div className="col-xs-6 col-md-6 col-lg-2">
                              <Radio
                                group={group}
                                value={"kylla"}
                                disabled={!edit}
                              />
                              &nbsp;<span>Kyllä</span>
                            </div>
                            <div className="col-xs-6 col-md-6 col-lg-2">
                              <Radio
                                group={group}
                                value={"ei"}
                                disabled={!edit}
                              />
                              &nbsp;<span>Ei</span>
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
                    <label htmlFor="tietoturvatasoluokitus" className="row">
                      Tietoturvatasoluokitus
                    </label>
                    <div className="row">
                      <Select
                        field="tietoturvatasoluokitus"
                        type="text"
                        className="tk-field form-control"
                        id="tietoturvatasoluokitus"
                        placeholder=""
                        readOnly={!edit}
                        resources={resources}
                        noResultsText="Ei tuloksia"
                      />
                    </div>
                  </div>
                </div>
                {/*
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="ict_varautumisen_luokitus"
                                            className="row"
                                        >
                                            ICT varautumisen luokitus
                                        </label>
                                        <div className="row">
                                            <Select
                                                field="ict_varautumisen_luokitus"
                                                type="text"
                                                className="tk-field form-control"
                                                id="ict_varautumisen_luokitus"
                                                placeholder=""
                                                readOnly={!edit}
                                                resources={resources}
                                                noResultsText="Ei tuloksia"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="sla_luokitus_jhs"
                                            className="row"
                                        >
                                            SLA luokitus (JHS)
                                        </label>
                                        <div className="row">
                                            <Select
                                                field="sla_luokitus_jhs"
                                                type="text"
                                                className="tk-field form-control"
                                                id="sla_luokitus_jhs"
                                                placeholder=""
                                                readOnly={!edit}
                                                resources={resources}
                                                noResultsText="Ei tuloksia"
                                            />
                                        </div>
                                    </div>
                                </div>
                                */}
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="sla_luokitus_kayttopalvelu" className="row">
                      SLA luokitus
                    </label>
                    <div className="row">
                      <Select
                        field="sla_luokitus_kayttopalvelu"
                        type="text"
                        className="tk-field form-control"
                        id="sla_luokitus_kayttopalvelu"
                        placeholder=""
                        readOnly={!edit}
                        resources={resources}
                        noResultsText="Ei tuloksia"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="luokituksen_tarkastuspvm" className="row">
                      Luokituksen tarkastuspäivämäärä (pp.kk.vvvv)
                    </label>
                    <div className="row">
                      <CustomDatePicker
                        field="luokituksen_tarkastuspvm"
                        className="tk-field form-control"
                        id="luokituksen_tarkastuspvm"
                        dateFormat="DD.MM.YYYY"
                        readOnly={!edit}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label
                      htmlFor="turvallisuuskuvaus_laadittu"
                      className="row"
                    >
                      Turvallisuuskuvaus laadittu (Alfresco-linkki)
                    </label>
                    <div className="row">
                      <UrlTextField
                        field="turvallisuuskuvaus_laadittu"
                        className="tk-field form-control"
                        id="turvallisuuskuvaus_laadittu"
                        placeholder="https://www.vayla.fi"
                        readOnly={!edit}
                        longLink={true}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label
                      htmlFor="toipumissuunnitelma_laadittu"
                      className="row"
                    >
                      Toipumissuunnitelma laadittu (Alfresco-linkki)
                    </label>
                    <div className="row">
                      <UrlTextField
                        field="toipumissuunnitelma_laadittu"
                        className="tk-field form-control"
                        id="toipumissuunnitelma_laadittu"
                        placeholder=""
                        readOnly={!edit}
                        longLink={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="rekisteriseloste" className="row">
                      Rekisteriseloste (Alfresco-linkki)
                    </label>
                    <div className="row">
                      <UrlTextField
                        field="rekisteriseloste"
                        className="tk-field form-control"
                        id="rekisteriseloste"
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
                    <label htmlFor="tietojen_julkisuus" className="row">
                      Tietojen julkisuus
                    </label>
                    <div className="row">
                      <Select
                        field="tietojen_julkisuus"
                        type="text"
                        className="tk-field form-control"
                        id="tietojen_julkisuus"
                        placeholder=""
                        readOnly={!edit}
                        resources={resources}
                        noResultsText="Ei tuloksia"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="salassapidon_peruste" className="row">
                      Salassapidon peruste (jos ei julkista)
                    </label>
                    <div className="row">
                      <Text
                        field="salassapidon_peruste"
                        type="text"
                        className="tk-field form-control"
                        id="salassapidon_peruste"
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
                    <label htmlFor="turvallisuusluokitus" className="row">
                      Turvallisuusluokitus (jos turvallisuusluokiteltu)
                    </label>
                    <div className="row">
                      <Select
                        field="turvallisuusluokitus"
                        type="text"
                        className="tk-field form-control"
                        id="turvallisuusluokitus"
                        placeholder=""
                        readOnly={!edit}
                        resources={resources}
                        noResultsText="Ei tuloksia"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="tarvitaan_viikonloppuna" className="row">
                      Tarvitaanko järjestelmää viikonloppuna
                    </label>
                    <div className="row">
                      <RadioGroup
                        id="tarvitaan_viikonloppuna"
                        className="tk-field form-control"
                        readOnly={!edit}
                        field="tarvitaan_viikonloppuna"
                      >
                        {(group) => (
                          <div className="row">
                            <div className="col-xs-6 col-md-6 col-lg-2">
                              <Radio
                                group={group}
                                value={"kylla"}
                                disabled={!edit}
                              />
                              &nbsp;<span>Kyllä</span>
                            </div>
                            <div className="col-xs-6 col-md-6 col-lg-2">
                              <Radio
                                group={group}
                                value={"ei"}
                                disabled={!edit}
                              />
                              &nbsp;<span>Ei</span>
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
                    <label htmlFor="tarvitaan_audit_trail" className="row">
                      Tarvitaanko audit trail
                    </label>
                    <div className="row">
                      <RadioGroup
                        id="tarvitaan_audit_trail"
                        className="tk-field form-control"
                        readOnly={!edit}
                        field="tarvitaan_audit_trail"
                      >
                        {(group) => (
                          <div className="row">
                            <div className="col-xs-6 col-md-6 col-lg-2">
                              <Radio
                                group={group}
                                value={"kylla"}
                                disabled={!edit}
                              />
                              &nbsp;<span>Kyllä</span>
                            </div>
                            <div className="col-xs-6 col-md-6 col-lg-2">
                              <Radio
                                group={group}
                                value={"ei"}
                                disabled={!edit}
                              />
                              &nbsp;<span>Ei</span>
                            </div>
                          </div>
                        )}
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="tietoturvasopimus" className="row">
                      Tietoturvasopimus
                    </label>
                    <div className="row">
                      <Checkbox
                        field="tietoturvasopimus"
                        id="tietoturvasopimus"
                        disabled={disabled["tietoturvasopimus"]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Collapse>

            <Collapse
              header={"Järjestelmälinkkaus"}
              isOpened={
                (values.jarjestelmaLinkkausListMultiselect &&
                  values.jarjestelmaLinkkausListMultiselect.length > 0) ||
                edit
              }
              edit={edit}
            >
              <LinkList
                formApi={formApi}
                field={"jarjestelmaLinkkausListMultiselect"}
                resources={resources}
                edit={edit}
              />
            </Collapse>

            <FormControls
              noRightsToModify={values.noRightsToModify}
              edit={edit}
              errors={formApi.errors}
              values={formApi.values}
              setEditable={(editable) => {
                setEditable(editable);
                if (!editable) {
                  this.setState({
                    rooliPersonList: this.state.initialRooliPersonList,
                  });
                }
              }}
              submitForm={formApi.submitForm}
              resetForm={formApi.resetAll}
              cancelNew={cancelNew}
              remove={remove}
            >
              {downloadDescription}
            </FormControls>
          </form>
        )}
      </Form>
    );
  }
}
