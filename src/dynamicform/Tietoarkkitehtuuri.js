import React, { Component } from "react";
import { observable, action, set, remove, computed, values } from "mobx";
import { inject, observer } from "mobx-react";
import TietolajiHelper from "./TietolajiHelper";
import { fullURL } from "../App";
import TietoarkkitehtuuriDynamicForm from "./TietoarkkitehtuuriForm";

@inject("routing")
@inject("tietoarkkitehtuuriStore")
@inject("notificationStore")
@observer
export default class Tietoarkkitehtuuri extends Component {
    @observable fyysinenFields = {};
    @observable looginenFields = {};
    @observable tietolajiFields = {};
    @observable tietoryhmaFields = {};
    @observable paatietoFields = {};

    @observable fyysinenOptions = [];
    @observable looginenOptions = [];
    @observable tietolajiOptions = [];
    @observable tietoryhmaOptions = [];
    @observable paatietoOptions = [];

    @observable noRightsToModify = [];

    counter = 0;

    /*
        fid = field ID
        did = data ID
    */

    constructor(props) {
        super(props);
        this.initNewTietoField(
            TietolajiHelper.tietolajiType.FYYSINEN,
            null,
            {},
            null,
            true
        );
        this.addNewLooginenRow(true);
    }

    nextUniqueId() {
        this.counter++;
        return this.counter + "";
    }

    lastUniqueId() {
        return this.counter + "";
    }

    @action
    componentDidMount() {
        this.props.tietoarkkitehtuuriStore.search({}, 0, -1).then(resp => {
            if (resp) {
                Object.values(TietolajiHelper.tietolajiType)
                    .map(tietoType => tietoType.value)
                    .forEach(tietoType => {
                        const newArr = resp.data[tietoType].items.map(
                            content => {
                                return {
                                    value: this.nextUniqueId(),
                                    label: content.nimi,
                                    type: tietoType,
                                    data: content || {}
                                };
                            }
                        );
                        this[`${tietoType}Options`].replace(newArr);
                    });

                this.noRightsToModify = resp.data.rights.noRightsToModify;
            }
        });
    }

    @computed
    get fullfilled() {
        const fyysinenOK = !values(this.fyysinenFields)
            .map(item => item.data)
            .includes(null);
        const looginenOK = !values(this.looginenFields)
            .map(item => item.data)
            .includes(null);
        const tietolajiOK = !values(this.tietolajiFields)
            .map(item => item.data)
            .includes(null);
        const tietoryhmaOK = !values(this.tietoryhmaFields)
            .map(item => item.data)
            .includes(null);
        const paatietoOK = !values(this.paatietoFields)
            .map(item => item.data)
            .includes(null);

        return (
            fyysinenOK &&
            looginenOK &&
            tietolajiOK &&
            tietoryhmaOK &&
            paatietoOK
        );
    }

    @action
    initNewTietoField = (
        tietoType,
        parentFid = null,
        data = { tunnus: null },
        did = null,
        created = false
    ) => {
        const fid = this.nextUniqueId();
        data.tunnus = data.tunnus || null;
        let tieto = {
            fid: fid,
            parentFid: parentFid,
            type: tietoType.value,
            data: data,
            did: did,
            created: created
        };
        set(this[`${tietoType.value}Fields`], { [tieto.fid]: tieto });
        return fid;
    };

    @action
    initTietolaji = (looginenFid, created = false) => {
        const tietolajiFid = this.initNewTietoField(
            TietolajiHelper.tietolajiType.TIETOLAJI,
            looginenFid,
            {},
            null,
            created
        );

        const tietoryhmaFid = this.initNewTietoField(
            TietolajiHelper.tietolajiType.TIETORYHMA,
            tietolajiFid,
            {},
            null,
            created
        );

        this.initNewTietoField(
            TietolajiHelper.tietolajiType.PAATIETO,
            tietoryhmaFid,
            {},
            null,
            created
        );
        return tietolajiFid;
    };

    @action
    deleteTietolajiRow = tietolajiFid => {
        const tietoryhmaChild = values(this.tietoryhmaFields).find(
            tr => tr.fid === tietolajiFid
        ) || { fid: null };
        const paatietoChild = values(this.paatietoFields).find(
            pt => pt.fid === tietoryhmaChild.fid
        ) || { fid: null };
        remove(this.paatietoFields, paatietoChild.fid);
        remove(this.tietoryhmaFields, tietoryhmaChild.fid);
        remove(this.tietolajiFields, tietolajiFid);
    };

    @action
    deleteLooginenRow = looginenFid => {
        const tietolajiChilds = values(this.looginenFields).filter(
            tl => tl.fid === looginenFid
        );
        tietolajiChilds.forEach(tl => this.deleteTietolajiRow(tl.fid));
        remove(this.looginenFields, looginenFid);
    };

    @action
    addNewTietolajiRow = (looginenFid, created = false) => {
        this.initTietolaji(looginenFid, created);
    };

    @action
    addNewLooginenRow = (created = false) => {
        const looginenFid = this.initNewTietoField(
            TietolajiHelper.tietolajiType.LOOGINEN,
            values(this.fyysinenFields)[0].fid,
            {},
            null,
            created
        );
        this.addNewTietolajiRow(looginenFid, created);
    };

    @action
    onSelect = (fid, type, data, did) => {
        this.updateField(fid, type, data, did);
        this.populateChilds(fid, type);
    };

    @action
    onCreateTieto = (data = { tunnus: null }, fid, type) => {
        data.tunnus = data.tunnus || null;
        const tietoOption = {
            value: this.nextUniqueId(),
            label: data.nimi,
            type: type,
            data: data
        };
        this[`${type}Options`].push(tietoOption);
        this.updateField(fid, type, data, tietoOption.value);
    };

    @action
    updateField = (fid, type, data = { tunnus: null }, did = null) => {
        data.tunnus = data.tunnus || null;
        this[`${type}Fields`][fid].data = data;
        this[`${type}Fields`][fid].did = did;
    };

    @action
    populateChilds = (fid, type) => {
        switch (type) {
            case TietolajiHelper.tietolajiType.FYYSINEN.value:
                this.populateFyysinen(fid);
                break;
            case TietolajiHelper.tietolajiType.LOOGINEN.value:
                this.populateLooginen(fid);
                break;
            case TietolajiHelper.tietolajiType.TIETOLAJI.value:
                this.populateTietolaji(fid);
                break;
            case TietolajiHelper.tietolajiType.TIETORYHMA.value:
                this.populateTietoryhma(fid);
                break;
            default:
                break;
        }
    };

    @action
    populateFyysinen = fid => {
        //clear child fields
        this.looginenFields = {};
        this.tietolajiFields = {};
        this.tietoryhmaFields = {};
        this.paatietoFields = {};
        if (!this.fyysinenFields[fid].data.tunnus) return;
        // get looginen data
        this.looginenOptions
            .filter(
                looginen =>
                    looginen.data.fyysinenTietovarantoId ===
                    this.fyysinenFields[fid].data.tunnus
            )
            .forEach(looginenOpt => {
                const looginenFid = this.initNewTietoField(
                    TietolajiHelper.tietolajiType.LOOGINEN,
                    fid,
                    looginenOpt.data,
                    looginenOpt.value,
                    false
                );
                this.populateLooginen(looginenFid);
            });
    };

    @action
    populateLooginen = fid => {
        // new looginen don't populate childs
        if (!this.looginenFields[fid].data.tunnus) return;
        // clear child fields
        values(this.tietolajiFields)
            .filter(tl => tl.parentFid === fid)
            .forEach(tietolaji => this.deleteTietolajiRow(tietolaji.fid));
        // get tietolaji data and create fieldrows
        this.tietolajiOptions
            .filter(
                tietolaji =>
                    tietolaji.data.looginenTietovarantoTunnus ===
                    this.looginenFields[fid].data.tunnus
            )
            .forEach(tietolajiOpt => {
                const tietolajiFid = this.initTietolaji(fid);
                this.updateField(
                    tietolajiFid,
                    TietolajiHelper.tietolajiType.TIETOLAJI.value,
                    tietolajiOpt.data,
                    tietolajiOpt.value
                );
                if (this.tietolajiFields[tietolajiFid].data.tietoryhmatunnus)
                    this.populateTietolaji(tietolajiFid);
            });
    };

    @action
    populateTietolaji = fid => {
        if (!this.tietolajiFields[fid].data.tietoryhmatunnus) return;
        const childTietoryhmaField = values(this.tietoryhmaFields).find(
            tr => tr.parentFid === fid
        );
        const tietoryhmaOpt = this.tietoryhmaOptions.find(
            tr =>
                tr.data.tunnus ===
                this.tietolajiFields[fid].data.tietoryhmatunnus
        );
        if (tietoryhmaOpt)
            this.updateField(
                childTietoryhmaField.fid,
                childTietoryhmaField.type,
                tietoryhmaOpt.data,
                tietoryhmaOpt.value
            );
        if (childTietoryhmaField.data.paatietoryhma)
            this.populateTietoryhma(childTietoryhmaField.fid);
    };

    @action
    populateTietoryhma = fid => {
        if (!this.tietoryhmaFields[fid].data.paatietoryhma) return;
        const childPaatietoField = values(this.paatietoFields).find(
            ptr => ptr.parentFid === fid
        );
        const paatietoOpt = this.paatietoOptions.find(
            ptr =>
                ptr.data.tunnus ===
                this.tietoryhmaFields[fid].data.paatietoryhma
        );
        if (paatietoOpt)
            this.updateField(
                childPaatietoField.fid,
                childPaatietoField.type,
                paatietoOpt.data,
                paatietoOpt.value
            );
    };

    onSubmit = () => {
        const { notificationStore } = this.props;
        const values = this.convert();

        this.props.tietoarkkitehtuuriStore
            .save(values)
            .then(response => {
                this.props.routing.replace(fullURL("tietoarkkitehtuuri"));
            })
            .catch(function(error) {
                notificationStore.addError("Virhe tallennuksessa", error);
            });
    };

    convert = () => {
        let result = {
            fyysinen: values(this.fyysinenFields)[0].data || null,
            looginenPaaTietoryhmaTietolajiList: []
        };
        values(this.looginenFields).forEach(looginen => {
            let looginenPaaTietoryhmaTietolaji = {
                looginen: {},
                paatietoTietoryhmaTietolajiList: []
            };

            values(this.tietolajiFields)
                .filter(tietolaji => tietolaji.parentFid === looginen.fid)
                .forEach(tietolaji => {
                    let paatietoTietoryhmaTietolaji = {
                        tietolaji: {},
                        tietoryhma: {},
                        paatieto: {}
                    };

                    values(this.tietoryhmaFields)
                        .filter(
                            tietoryhma => tietoryhma.parentFid === tietolaji.fid
                        )
                        .forEach(tietoryhma => {
                            values(this.paatietoFields)
                                .filter(
                                    paatieto =>
                                        paatieto.parentFid === tietoryhma.fid
                                )
                                .forEach(paatieto => {
                                    paatietoTietoryhmaTietolaji.paatieto =
                                        paatieto.data;
                                    paatietoTietoryhmaTietolaji.tietoryhma =
                                        tietoryhma.data;
                                    paatietoTietoryhmaTietolaji.tietolaji =
                                        tietolaji.data;

                                    paatietoTietoryhmaTietolaji.tietoryhma.paatietoryhma =
                                        typeof paatieto.data.tunnus === "number"
                                            ? paatieto.data.tunnus
                                            : null;
                                    paatietoTietoryhmaTietolaji.tietolaji.tietoryhmatunnus =
                                        typeof tietoryhma.data.tunnus ===
                                        "number"
                                            ? tietoryhma.data.tunnus
                                            : null;
                                    paatietoTietoryhmaTietolaji.tietolaji.looginenTietovarantoTunnus =
                                        typeof looginen.data.tunnus === "number"
                                            ? looginen.data.tunnus
                                            : null;
                                    looginenPaaTietoryhmaTietolaji.paatietoTietoryhmaTietolajiList.push(
                                        paatietoTietoryhmaTietolaji
                                    );
                                });
                        });
                });
            looginenPaaTietoryhmaTietolaji.looginen = looginen.data;

            result.looginenPaaTietoryhmaTietolajiList.push(
                looginenPaaTietoryhmaTietolaji
            );
        });
        return result;
    };

    render() {
        return (
            <TietoarkkitehtuuriDynamicForm
                fyysinenFields={this.fyysinenFields}
                looginenFields={this.looginenFields}
                tietolajiFields={this.tietolajiFields}
                tietoryhmaFields={this.tietoryhmaFields}
                paatietoFields={this.paatietoFields}
                fyysinenOptions={this.fyysinenOptions}
                looginenOptions={this.looginenOptions}
                tietolajiOptions={this.tietolajiOptions}
                tietoryhmaOptions={this.tietoryhmaOptions}
                paatietoOptions={this.paatietoOptions}
                noRightsToModify={this.noRightsToModify}
                deleteTietolajiRow={this.deleteTietolajiRow}
                deleteLooginenRow={this.deleteLooginenRow}
                addNewTietolajiRow={this.addNewTietolajiRow}
                addNewLooginenRow={this.addNewLooginenRow}
                onCreateTieto={this.onCreateTieto}
                onClose={this.onClose}
                onSubmit={this.onSubmit}
                onSelect={this.onSelect}
            />
        );
    }
}
