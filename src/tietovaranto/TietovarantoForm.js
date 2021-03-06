import React from "react";
import { Form, Text } from "react-form";
import { FormControls, validate, validateAll } from "../form/FormControls";
import { CustomCollapse as Collapse } from "../form/CustomCollapse";
import { CustomMultiselect } from "../form/CustomMultiselect";
import { CustomSelitysMultiselect } from "../form/CustomSelitysMultiselect";
import { LinkifyTextArea as TextArea } from "../form/LinkifyTextArea";
import { CreatableCustomSelect } from "../form/CreatableCustomSelect";
import { CreatableCustomMultiselect } from "../form/CreatableCustomMultiselect";

export class TietovarantoForm extends React.Component {
    render() {
        const {
            edit,
            values,
            resources,
        } = this.props;

        const { toimintaprosessi: toimintaprosessiIds = [], organisaatio: organisaatioIds = [] } = resources ? resources : {};

        return (
            <Form
                validateError={values => 
                    validateAll(values, validate)
                }
                onSubmit={values => {
                    delete values.noRightsToModify;
                    this.props.onSubmit(values);
                }}
                getApi={formApi => {
                    formApi.setAllValues(values);
                }}
                defaultValues={values}
            >
                {formApi => (
                    <form onSubmit={formApi.submitForm}>
                        <Collapse
                            header={`Yleiset: ${values.nimi || ""}`}
                            isOpened={true}
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
                                        <label
                                            htmlFor="vastaava"
                                            className="row"
                                        >
                                            Vastaava
                                        </label>
                                        <div className="row">
                                            <Text
                                                field="vastaava"
                                                type="text"
                                                className="tk-field form-control"
                                                id="vastaava"
                                                placeholder=""
                                                readOnly={!edit}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label htmlFor="lisatieto" className="row">
                                            Lis??tieto
                                        </label>
                                        <div className="row">
                                            <Text
                                                field="lisatieto"
                                                type="text"
                                                className="tk-field form-control"
                                                id="lisatieto"
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
                                        <label htmlFor="toimintaprosessiIds" className="row">
                                            Toimintaprosessit
                                        </label>
                                        <div className="row">
                                            <CustomMultiselect
                                                field="toimintaprosessiIds"
                                                className="tk-field form-control"
                                                id="toimintaprosessiIds"
                                                readOnly={!edit}
                                                resources={{ toimintaprosessiIds: toimintaprosessiIds }}
                                                useID={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label htmlFor="kuvaus_sidoksesta" className="row">
                                            Kuvaus sidoksesta
                                        </label>
                                        <div className="row">
                                            <TextArea
                                                field="kuvaus_sidoksesta"
                                                type="text"
                                                className="tk-field form-control"
                                                id="kuvaus_sidoksesta"
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
                                        <label htmlFor="tiedonohjaussuunnitelmat" className="row">
                                            Teht??v??luokka
                                        </label>
                                        <div className="row">
                                            <CustomSelitysMultiselect
                                                field="tiedonohjaussuunnitelmat"
                                                className="tk-field form-control"
                                                id="tiedonohjaussuunnitelmat"
                                                readOnly={!edit}
                                                resources={resources}
                                                useID={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Collapse>

                        <Collapse header={"Tiedot henkil??tietojen k??sittelyst??"} isOpened={true}>
                            <h4>Rekisterinpit??j??t</h4>

                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label htmlFor="rekisterinpitaja" className="row">
                                            Rekisterinpit??j??
                                        </label>
                                        <div className="row">
                                            <CreatableCustomSelect
                                                field="rekisterinpitaja"
                                                type="text"
                                                className="tk-field form-control"
                                                id="rekisterinpitaja"
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
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label htmlFor="yhteisrekisterinpitajat" className="row">
                                            Yhteisrekisterinpit??j?? ja t??m??n yhteystiedot
                                        </label>
                                        <div className="row">
                                            <CustomMultiselect
                                                field="yhteisrekisterinpitajat"
                                                className="tk-field form-control"
                                                id="yhteisrekisterinpitajat"
                                                readOnly={!edit}
                                                resources={{ yhteisrekisterinpitajat: organisaatioIds }}
                                                useID={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h4>K??sittelyn perustiedot</h4>

                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label htmlFor="kasittelyn_perusteet" className="row">
                                            K??sittelyn perusteet
                                        </label>
                                        <div className="row">
                                            <CustomMultiselect
                                                field="kasittelyn_perusteet"
                                                className="tk-field form-control"
                                                id="kasittelyn_perusteet"
                                                readOnly={!edit}
                                                resources={resources}
                                                useID={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label htmlFor="kasittelyn_tarkoitus" className="row">
                                            K??sittelyn tarkoitus
                                        </label>
                                        <div className="row">
                                            <TextArea
                                                field="kasittelyn_tarkoitus"
                                                type="text"
                                                className="tk-field form-control"
                                                id="kasittelyn_tarkoitus"
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
                                        <label htmlFor="rekisteroityjenryhmat" className="row">
                                            Rekister??ityjen ryhm??t
                                        </label>
                                        <div className="row">
                                            <CreatableCustomMultiselect
                                                field="rekisteroityjenryhmat"
                                                type="text"
                                                className="tk-field form-control tk-field-autoheight"
                                                id="rekisteroityjenryhmat"
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
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label htmlFor="henkilotietojenryhmat" className="row">
                                            Henkil??tietojen ryhm??t
                                        </label>
                                        <div className="row">
                                            <CreatableCustomMultiselect
                                                field="henkilotietojenryhmat"
                                                type="text"
                                                className="tk-field form-control tk-field-autoheight"
                                                id="henkilotietojenryhmat"
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

                            <h4>Vastaanottajat</h4>

                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label htmlFor="yllapito_muut_tahot" className="row">
                                            K??sittelyyn osallistuvat tahot, kuten henkil??tietojen k??sittelij??t
                                        </label>
                                        <div className="row">
                                            <CreatableCustomMultiselect
                                                field="yllapito_muut_tahot"
                                                type="text"
                                                className="tk-field form-control tk-field-autoheight"
                                                id="yllapito_muut_tahot"
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
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label htmlFor="viittaus_henktieto_sopimukseen" className="row">
                                            Viittaus solmittuun henkil??tietojen k??sittely?? koskevaan sopimukseen
                                        </label>
                                        <p className="row">
                                            Viittaus (mahdolliseen) henkil??tietojen k??sittelij??n kanssa solmittuun henkil??tietojen k??sittely?? koskevaan sopimukseen
                                        </p>
                                        <div className="row">
                                            <Text
                                                field="viittaus_henktieto_sopimukseen"
                                                type="text"
                                                className="tk-field form-control"
                                                id="viittaus_henktieto_sopimukseen"
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
                                        <label htmlFor="vastaanottajaryhmat" className="row">
                                            Luovutuksensaajat
                                        </label>
                                        <div className="row">
                                            <CreatableCustomMultiselect
                                                field="vastaanottajaryhmat"
                                                type="text"
                                                className="tk-field form-control tk-field-autoheight"
                                                id="vastaanottajaryhmat"
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

                            <h4>K??sittelyn turvallisuus</h4>

                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label htmlFor="turvatoimenpiteet" className="row">
                                            Tekniset ja organisatoriset turvatoimenpiteet
                                        </label>
                                        <div className="row">
                                            <CreatableCustomMultiselect
                                                field="turvatoimenpiteet"
                                                type="text"
                                                className="tk-field form-control tk-field-autoheight"
                                                id="turvatoimenpiteet"
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
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label htmlFor="tekniset_org_turvatoimenpiteet" className="row">
                                            Linkit turvallisuutta koskevien toimenpiteiden kuvauksiin
                                        </label>
                                        <div className="row">
                                            <TextArea
                                                field="tekniset_org_turvatoimenpiteet"
                                                type="text"
                                                className="tk-field form-control"
                                                id="tekniset_org_turvatoimenpiteet"
                                                rows="5"
                                                placeholder=""
                                                readOnly={!edit}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h4>Henkil??tietojen siirto EU/ETA-alueen ulkopuolelle tai kansainv??lisiin j??rjest??ihin</h4>

                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label htmlFor="kolmannet_maat_ja_jarjestot" className="row">
                                            Kolmannet maat ja kansainv??liset j??rjest??t
                                        </label>
                                        <p className="row">
                                            Kolmannet maat ja kansainv??liset j??rjest??t, joihin tietoja siirret????n tai tieto siit??, ettei henkil??tietoja siirret?? kolmansiin maihin tai kansainv??lisiin j??rjest??ihin
                                        </p>
                                        <div className="row">
                                            <Text
                                                field="kolmannet_maat_ja_jarjestot"
                                                type="text"
                                                className="tk-field form-control"
                                                id="kolmannet_maat_ja_jarjestot"
                                                placeholder=""
                                                readOnly={!edit}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label htmlFor="suojatoimia_dokumentaatio" className="row">
                                            Asianmukaisia suojatoimia koskeva dokumentaatio
                                        </label>
                                        <p className="row">
                                            Asianmukaisia suojatoimia koskeva dokumentaatio, jos henkil??tietoja siirret????n kolmansiin maihin tai kansainv??lisiin j??rjest??ihin tietosuoja-asetuksen 49 artiklan 1 kohdan toisessa alakohdassa tarkoitetulla siirrolla
                                        </p>
                                        <div className="row">
                                            <Text
                                                field="suojatoimia_dokumentaatio"
                                                type="text"
                                                className="tk-field form-control"
                                                id="suojatoimia_dokumentaatio"
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
