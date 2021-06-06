import React from "react";
import {Form, Text} from "react-form";
import {CustomCollapse as Collapse} from "../form/CustomCollapse";
import {CustomDatePicker} from "../form/CustomDatePicker";
import {FormControls, validate, validateAll} from "../form/FormControls";
import {LinkifyTextArea as TextArea} from "../form/LinkifyTextArea";
import {HenkiloRooli} from "../henkilorooli/HenkiloRooli";
import {capitalize, roleIdToRooliDescription, Roles} from "../utils";

export class SovellusForm extends HenkiloRooli {

    constructor(props) {
        const modifyRoles = [Roles.OMISTAJA, Roles.VASTAAVA];
        super(props, modifyRoles);
        this.modifyRoles = modifyRoles;
    }

    preSubmit(values) {
        const henkiloRooliList = values.henkiloRooliList.filter(henkiloRooli =>
            (henkiloRooli !== null && (henkiloRooli.rooliId !== null && henkiloRooli.henkiloId !== null) &&
                this.modifyRoles.includes(parseInt(henkiloRooli.rooliId, 10)))
        );
        return {
            tunnus: values.tunnus,
            elinkaaritieto: values.elinkaaritieto,
            henkiloRooliList: henkiloRooliList
        };
    }

    isEditable(fieldName) {
        const editableFields = ["elinkaaritieto", "henkiloRooliList"];
        const isEditable = editableFields.includes(fieldName);
        return this.props.edit && isEditable;
    }

    mapRoleToRolePersons(rolePersonList) {
        let result = {};
        rolePersonList.forEach(rooliPerson => {
            if (Array.isArray(result[rooliPerson.rooliId])) {
                result[rooliPerson.rooliId].push(rooliPerson);
            } else {
                result[rooliPerson.rooliId] = [];
                result[rooliPerson.rooliId].push(rooliPerson);
            }
        });
        return result;
    }

    render() {
        const {
            edit,
            onSubmit,
            remove,
            setEditable,
            cancelNew,
            values
        } = this.props;


        const roleToRolepersonList = this.mapRoleToRolePersons(this.state.rooliPersonList);
        // Populates henkiloRooliList before henkiloRooli fields are edited
        values.henkiloRooliList = this.state.rooliPersonList;

        return (
            <Form
                validateError={values => 
                    validateAll(values, validate)
                }
                onSubmit={values => {
                    this.props.onSubmit(this.preSubmit(values));
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
                                                readOnly={!this.isEditable("nimi")}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="aliasNimet"
                                            className="row"
                                        >
                                            Aliakset
                                        </label>
                                        <div className="row">
                                            <TextArea
                                                field="aliasNimet"
                                                type="text"
                                                className="tk-field form-control"
                                                id="aliasNimet"
                                                rows="5"
                                                placeholder=""
                                                readOnly={!this.isEditable("aliasNimet")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="valmistaja"
                                            className="row"
                                        >
                                            Valmistaja
                                        </label>
                                        <div className="row">
                                            <Text
                                                field="valmistaja"
                                                type="text"
                                                className="tk-field form-control"
                                                id="valmistaja"
                                                placeholder=""
                                                readOnly={!this.isEditable("valmistaja")}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="col-sm-12">
                                        <label htmlFor="versio" className="row">
                                            Versio
                                        </label>
                                        <div className="row">
                                            <Text
                                                field="versio"
                                                type="text"
                                                className="tk-field form-control"
                                                id="versio"
                                                placeholder=""
                                                readOnly={!this.isEditable("versio")}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="konfiguraatioVersio"
                                            className="row"
                                        >
                                            KonfiguraatioVersio
                                        </label>
                                        <div className="row">
                                            <Text
                                                field="konfiguraatioVersio"
                                                type="text"
                                                className="tk-field form-control"
                                                id="konfiguraatioVersio"
                                                placeholder=""
                                                readOnly={!this.isEditable("konfiguraatioVersio")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="kayttojarjestelmavaatimus"
                                            className="row"
                                        >
                                            Käyttöjärjestelmävaatimus
                                        </label>
                                        <div className="row">
                                            <Text
                                                field="kayttojarjestelmavaatimus"
                                                type="text"
                                                className="tk-field form-control"
                                                id="kayttojarjestelmavaatimus"
                                                placeholder=""
                                                readOnly={!this.isEditable("kayttojarjestelmavaatimus")}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="arkkitehtuuri"
                                            className="row"
                                        >
                                            Arkkitehtuuri
                                        </label>
                                        <div className="row">
                                            <Text
                                                field="arkkitehtuuri"
                                                type="text"
                                                className="tk-field form-control"
                                                id="arkkitehtuuri"
                                                placeholder=""
                                                readOnly={!this.isEditable("arkkitehtuuri")}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="col-sm-12">
                                        <label htmlFor="alusta" className="row">
                                            Alusta
                                        </label>
                                        <div className="row">
                                            <Text
                                                field="alusta"
                                                type="text"
                                                className="tk-field form-control"
                                                id="alusta"
                                                placeholder=""
                                                readOnly={!this.isEditable("alusta")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="sovelluksenTyyppi"
                                            className="row"
                                        >
                                            Sovelluksen tyyppi
                                        </label>
                                        <div className="row">
                                            <Text
                                                field="sovelluksenTyyppi"
                                                type="text"
                                                className="tk-field form-control"
                                                id="sovelluksenTyyppi"
                                                placeholder=""
                                                readOnly={!this.isEditable("sovelluksenTyyppi")}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="kielisyys"
                                            className="row"
                                        >
                                            Kielisyys
                                        </label>
                                        <div className="row">
                                            <Text
                                                field="kielisyys"
                                                type="text"
                                                className="tk-field form-control"
                                                id="kielisyys"
                                                placeholder=""
                                                readOnly={!this.isEditable("kielisyys")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="lisatietoja"
                                            className="row"
                                        >
                                            Lisätietoja
                                        </label>
                                        <div className="row">
                                            <TextArea
                                                field="lisatietoja"
                                                type="text"
                                                className="tk-field form-control"
                                                id="lisatietoja"
                                                rows="5"
                                                placeholder=""
                                                readOnly={!this.isEditable("lisatietoja")}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="tuotekoodi"
                                            className="row"
                                        >
                                            Tuotekoodi
                                        </label>
                                        <div className="row">
                                            <TextArea
                                                field="tuotekoodi"
                                                type="text"
                                                className="tk-field form-control"
                                                id="tuotekoodi"
                                                rows="5"
                                                placeholder=""
                                                readOnly={!this.isEditable("tuotekoodi")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Collapse>

                        <Collapse header={"Asennus"} isOpened={true}>
                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="riippuvuustieto"
                                            className="row"
                                        >
                                            Riippuvuustieto
                                        </label>
                                        <div className="row">
                                            <Text
                                                field="riippuvuustieto"
                                                type="text"
                                                className="tk-field form-control"
                                                id="riippuvuustieto"
                                                placeholder=""
                                                readOnly={!this.isEditable("riippuvuustieto")}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="liittymatJarjestelmiin"
                                            className="row"
                                        >
                                            Liittymät jarjestelmiin
                                        </label>
                                        <div className="row">
                                            <Text
                                                field="liittymatJarjestelmiin"
                                                type="text"
                                                className="tk-field form-control"
                                                id="liittymatJarjestelmiin"
                                                placeholder=""
                                                readOnly={!this.isEditable("liittymatJarjestelmiin")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Collapse>

                        <Collapse header={"Tuki"} isOpened={true}>
                            <div className="form-group row">
                                {Object.keys(roleToRolepersonList).map(roleId => {
                                    const allowToMod = this.modifyRoles.includes(parseInt(roleId, 10));
                                    return (
                                        <div className="col-sm-6" key={roleId}>
                                            <div className="col-sm-12">
                                                <label
                                                    htmlFor="sovellusomistaja"
                                                    className="row"
                                                >
                                                    {capitalize(roleIdToRooliDescription(roleId))}
                                                </label>
                                                <div className="row">
                                                    {this.roleList(formApi,
                                                        roleToRolepersonList[parseInt(roleId, 10)],
                                                        roleId,
                                                        {for: "sovellusomistaja", value: ""},
                                                        allowToMod && edit
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Collapse>

                        <Collapse header={"Muuta"} isOpened={true}>
                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="tuotantoonHyvaksymispaiva"
                                            className="row"
                                        >
                                            Tuotantoonhyväksymispäivä
                                        </label>
                                        <div className="row">
                                            <CustomDatePicker
                                                field="tuotantoonHyvaksymispaiva"
                                                className="tk-field form-control"
                                                id="tuotantoonHyvaksymispaiva"
                                                dateFormat="DD.MM.YYYY"
                                                readOnly={!this.isEditable("tuotantoonHyvaksymispaiva")}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="kriittisyys"
                                            className="row"
                                        >
                                            Kriittisyys
                                        </label>
                                        <div className="row">
                                            <Text
                                                field="kriittisyys"
                                                type="text"
                                                className="tk-field form-control"
                                                id="kriittisyys"
                                                placeholder=""
                                                readOnly={!this.isEditable("kriittisyys")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-12">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="elinkaaritieto"
                                            className="row"
                                        >
                                            Elinkaaritieto
                                        </label>
                                        <div className="row">
                                            <TextArea
                                                field="elinkaaritieto"
                                                type="text"
                                                className="tk-field form-control"
                                                id="elinkaaritieto"
                                                placeholder=""
                                                readOnly={!this.isEditable("elinkaaritieto")}
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
                            setEditable={(editable) => {
                                setEditable(editable);
                                if (!editable)
                                    this.setState({rooliPersonList: this.state.initialRooliPersonList});
                            }}
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
