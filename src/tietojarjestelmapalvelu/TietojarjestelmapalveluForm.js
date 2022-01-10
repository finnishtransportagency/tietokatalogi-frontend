import React from "react";
import { Form, StyledText } from "react-form";

import { CustomCollapse } from "../form/CustomCollapse";
import { LinkifyTextArea as TextArea } from "../form/LinkifyTextArea";
import { FormControls, validate, validateAll } from "../form/FormControls";
import { CustomSelect } from "../form/CustomSelect";
import TietovirtaFormWrapper from "./TietovirtaFormWrapper";
import { HenkiloRooli } from "../henkilorooli/HenkiloRooli";
import {capitalize, roleIdToRooliDescription, Roles} from "../utils";

export class TietojarjestelmapalveluForm extends HenkiloRooli {
    constructor(props) {
        const modifyRoles = [Roles.OMISTAJA, Roles.VASTAAVA, Roles.SIJAINEN];
        const singlePersonRoles = [Roles.OMISTAJA, Roles.VASTAAVA];
        super(props, modifyRoles, singlePersonRoles);
        this.modifyRoles = modifyRoles;
    }


    render() {
        const { 
            edit,
            values,
            setEditable,
            resources,
            onSubmit,
            cancelNew,
            remove
        } = this.props;

        // rooliPersonList is inherited from superclass
        const roleToRolepersonList = this.mapRoleToRolePersons(this.state.rooliPersonList);

        return (
            <Form
                getApi={formApi => {
                    formApi.setAllValues(values);
                }}
                validateError={values => {
                    return {
                        ...validateAll(values, validate)
                    };
                }}
                onSubmit={values => {
                    const mappedValues = {
                        ...values,
                        tietolajit: values.tietolajit ? values.tietolajit.map(tl => ({
                            tunnus: tl.value,
                            nimi: tl.label,
                            ...(tl.liittyvaJarjestelmaTunnus ? { liittyvaJarjestelmaTunnus: tl.liittyvaJarjestelmaTunnus } : {} ),
                        })) : [],
                        relatedJarjestelmaIds: values.liittyvaJarjestelma,
                    };
                    delete mappedValues["fetchRooliHenkiloList"];
                    delete mappedValues["noRightsToModify"];
                    delete mappedValues["liittyvaJarjestelma"];
                    onSubmit(mappedValues);
                }}
                defaultValues={values}
            >
                { formApi => (
                    <form onSubmit={formApi.submitForm}>
                        <CustomCollapse
                            header={`Kaikki tiedot: ${values.nimi || ""}`}
                            isOpened={true}
                        >
                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="nimi"
                                            className="row"
                                        >
                                            Nimi
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
                                        <label
                                            htmlFor="kuvaus"
                                            className="row"
                                        >
                                            Kuvaus
                                        </label>
                                        <div className="row">
                                            <TextArea
                                                field="kuvaus"
                                                type="text"
                                                className="tk-field form-control"
                                                id="kuvaus"
                                                placeholder=""
                                                readOnly={!edit}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <TietovirtaFormWrapper 
                                edit={edit} 
                                formApi={formApi}
                                resources={resources}
                            />

                            <div className="form-group row">
                                {Object.keys(roleToRolepersonList).map(roleId => {
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
                                                    {this.roleList(formApi,
                                                        roleToRolepersonList[parseInt(roleId, 10)],
                                                        roleId,
                                                        {for: roleIdToRooliDescription(roleId), value: ""},
                                                        false
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
                                        <label htmlFor="kayttajaroolit" className="row">
                                            Käyttäjäroolit
                                        </label>
                                        <div className="row">
                                            <TextArea
                                                field="kayttajaroolit"
                                                type="text"
                                                className="tk-field form-control"
                                                id="kayttajaroolit"
                                                placeholder=""
                                                readOnly={!edit}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="col-sm-12">
                                        <label htmlFor="elinkaaritila" className="row">
                                            Elinkaaritila
                                        </label>
                                        <div className="row">
                                            <CustomSelect
                                                field="elinkaaritila"
                                                id="elinkaaritila"
                                                resources={resources}
                                                readOnly={!edit}
                                                className="tk-field form-control"
                                                noResultsText="Ei tuloksia"
                                            />
                                        </div>
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
