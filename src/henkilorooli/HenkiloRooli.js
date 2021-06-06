import * as React from "react";
import {
    personCustomResourceSelectClassName,
    personCustomResourceSelectRequestUrl,
    personSelectToLabel
} from "./HenkiloRooliUtils";
import {RoleList} from "../form/RoleList";
import {roleIdToRooliName} from "../utils";

export class HenkiloRooli extends React.Component {
    constructor(props, modifyRoles, singlePersonRoles) {
        super(props);
        this.modifyRoles = modifyRoles;
        this.singlePersonRoles = singlePersonRoles;
        // fetchRooliHenkiloList is only defined if the form is related to
        // an existing jarjestelma.
        props.values.fetchRooliHenkiloList = props.values.fetchRooliHenkiloList || [];
        this.state = {
            initialRooliPersonList: this.initializeRooliPersonList([...props.values.fetchRooliHenkiloList]),
            rooliPersonList: this.initializeRooliPersonList([...props.values.fetchRooliHenkiloList]),
        };
        // Stores complete person objects so that they aren't lost when 
        // henkiloRooli form is rendered again with new CustomResourceSelect instances.
        this.tmpPeopleData = {};
    }
    

    /**
     * Maps the received values to a flat array, e.g.
     * [
     *      {rooliId: 0, henkiloId: null},
     *      {rooliId: 1, henkiloId: 100},
     *      {rooliId: 1, henkiloId: 101}
     * ]
     * @param values Received values
     */
    initializeRooliPersonList(values) {
        let result = values && values.map(personRole => {
            const roleId = personRole.rooli.tunnus;
            if (!roleId || !this.modifyRoles.includes(roleId)) {
                return this.toRoleHenkilo(roleId, personRole.henkilo.tunnus);
            }
            return this.toRoleHenkilo(roleId, personRole.henkilo.tunnus);
        });

        this.modifyRoles.forEach(roleId => {
            if (!result.map(rolePerson => rolePerson.rooliId).includes(roleId)) {
                result.push(this.toRoleWithoutHenkilo(roleId));
            }
        });
        return result;
    }

    /**
     * Groups role person data by role id.
     * @param rolePersonList Flat array of role person data
     */
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

    toRoleWithoutHenkilo = (rooliId) => this.toRoleHenkilo(rooliId, null);

    toRoleHenkilo = (rooliId, henkiloId) => ({rooliId: rooliId, henkiloId: henkiloId});

    onRowAdd = (roleId) => {
        let newRooliPersonList = this.state.rooliPersonList;
        newRooliPersonList.push(this.toRoleWithoutHenkilo(parseInt(roleId, 10)));
        this.setState({rooliPersonList: newRooliPersonList});
    };

    onRowDelete = (henkiloRooli, formApi) => {
        const currHenkiloId = (henkiloRooli.henkilo) ? henkiloRooli.henkilo.tunnus : null;

        let newRooliPersonList = [...this.state.rooliPersonList];
        const idxDel = this.state.rooliPersonList.findIndex(
            rooliPerson => rooliPerson.rooliId === henkiloRooli.rooli.tunnus && rooliPerson.henkiloId === currHenkiloId);
        // Don't delete last value of current role
        if (newRooliPersonList.filter(rooliPerson => rooliPerson.rooliId === henkiloRooli.rooli.tunnus).length > 1) {
            newRooliPersonList.splice(idxDel, 1);
        }
        else {
            newRooliPersonList[idxDel] = this.toRoleWithoutHenkilo(parseInt(henkiloRooli.rooli.tunnus, 10));
        }

        this.setState({rooliPersonList: newRooliPersonList});
        formApi.setValue("henkiloRooliList", newRooliPersonList);
    };

    customResourceSelectOnChange = () => {
        return (currHenkiloRooli, selection, rooliId, formApi) => {
            let newPerson = this.toRoleWithoutHenkilo(rooliId);
            if (selection) {
                newPerson.henkiloId = selection.value;
            }
            const currHenkiloId = (currHenkiloRooli.henkilo) ? currHenkiloRooli.henkilo.tunnus : null;
            
            const newRooliPersonList = [...this.state.rooliPersonList];
            const changeIdx = this.state.rooliPersonList.findIndex(
                rooliPerson => rooliPerson.rooliId === currHenkiloRooli.rooli.tunnus && rooliPerson.henkiloId === currHenkiloId);
            newRooliPersonList[changeIdx] = newPerson;
            
            this.setState({rooliPersonList: newRooliPersonList});
            // The state is added to the formApi state so that these fields can be validated on change
            formApi.setValue("henkiloRooliList", newRooliPersonList);

            if (newPerson.henkiloId) {
                this.tmpPeopleData[newPerson.henkiloId] = selection.person;
            }
        };
    };

    roleList(formApi, rooliPersons, roleId, label, edit) {
        // Here henkilö and rooli ids are replaced with their full
        // respective objects, retrieved from the formApi.
        const rolePersons = rooliPersons.map(rooliPerson => {
            const roleName = roleIdToRooliName(rooliPerson.rooliId);
            let henkilo = null;
            if (rooliPerson.henkiloId !== null) {
                henkilo = formApi.values.fetchRooliHenkiloList.find(
                    henkiloRooli => henkiloRooli.henkilo.tunnus === rooliPerson.henkiloId);
                if (!henkilo) {
                    henkilo = this.tmpPeopleData[rooliPerson.henkiloId] || {tunnus: rooliPerson.henkiloId};
                } else {
                    henkilo = henkilo.henkilo;
                }
            }

            return {henkilo: henkilo, rooli: {tunnus: rooliPerson.rooliId, nimi: roleName}};
        });

        return <RoleList
            field="fetchRooliHenkiloList"
            formApi={formApi}
            edit={edit}
            roleId={roleId}
            rolePersons={rolePersons}
            label={label}
            customOnChange={
                this.customResourceSelectOnChange
            }
            singlePersonRoles={this.singlePersonRoles}
            selectToLabel={personSelectToLabel}
            selectRequestUrl={personCustomResourceSelectRequestUrl}
            customResourceSelectClassName={personCustomResourceSelectClassName}
            onRowAdd={this.onRowAdd}
            onRowDelete={this.onRowDelete}
        />;
    }
}