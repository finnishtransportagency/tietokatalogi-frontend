import React, { Component } from "react";
import { toJS, values } from "mobx";
import { inject, observer } from "mobx-react";
import Select from "react-select";
import { FormControls } from "../form/FormControls";
import CreateNewCategory from "./CreateNewForm";
import Modal, { getCreateNewModal } from "../form/modal";
import { fullURL } from "../App";
import TietolajiHelper from "./TietolajiHelper";

@inject("routing")
@observer
export default class TietoarkkitehtuuriDynamicForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onCreate: null,
            currModCategory: null,
            hasErrors: false
        };
    }
    onCreateNewForm = (tietoField, nimi = "") => {
        this.setState({
            onCreate: { field: tietoField, prefilled: { nimi: nimi } }
        });
    };
    onCreateTieto = (data, tietoField) => {
        this.props.onCreateTieto(data, tietoField.fid, tietoField.type);
        this.setState({ onCreate: false });
    };
    onCancel = () => {
        this.setState({ onCreate: false });
    };

    valueRenderer = option => {
        const { type: categoryValue, data } = option;
        const categoryUrl = TietolajiHelper.getUrlStringForCategoryValue(categoryValue);
        return (
            data.tunnus ? 
                <a
                    href={fullURL("#", categoryUrl, "/tunnus/", data.tunnus)}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    {option.label}
                </a>
                :
                <span>{option.label}</span>
        );
    }

    categorySelector = tietoField => {
        const options = toJS(this.props[`${tietoField.type}Options`]);
        const editable =
            tietoField.created ||
            ["tietoryhma", "paatieto"].includes(tietoField.type);
        const SelectorName = editable ? Select.Creatable : Select;
        return (
            <SelectorName
                valueRenderer={(option) => this.valueRenderer(option)}
                name="form-field-name"
                value={tietoField.did}
                onChange={selected => {
                    selected = selected || {};
                    this.props.onSelect(
                        tietoField.fid,
                        tietoField.type,
                        selected.data,
                        selected.value
                    );
                }}
                onNewOptionClick={newOption => {
                    this.onCreateNewForm(tietoField, newOption.label);
                }}
                promptTextCreator={label => {
                    return `Luo uusi: "${label}"`;
                }}
                options={options}
                clearable={false}
                disabled={!editable}
            />
        );
    };

    formControls = () => {
        return (
            <div className="form-group row selected-category">
                <FormControls
                    edit={true}
                    submitForm={() => this.props.onSubmit()}
                    cancelNew={() =>
                        this.props.routing.replace(
                            fullURL("tietoarkkitehtuuri")
                        )
                    }
                    noRightsToModify={this.props.noRightsToModify}
                    // errors={{ hasErrors: !fullfilled }}
                />
            </div>
        );
    };

    tietolajiRow = tietolajiField => {
        const tietoryhmaField = values(this.props.tietoryhmaFields).find(
            tr => tr.parentFid === tietolajiField.fid
        );
        const paatietoryhmaField = values(this.props.paatietoFields).find(
            ptr => ptr.parentFid === tietoryhmaField.fid
        );

        return (
            <div className={"row"} key={tietolajiField.fid}>
                <div className="col-sm-1 col-sm-offset-1">
                    <button
                        type="button"
                        className="btn btn-danger pull-right"
                        onClick={() =>
                            this.props.deleteTietolajiRow(tietolajiField.fid)
                        }
                        disabled={!tietoryhmaField.created}
                    >
                        <i className="fa fa-minus" />
                    </button>
                </div>
                <div key={tietolajiField.fid} className="col-sm-3">
                    {this.categorySelector(tietolajiField)}
                </div>

                <div key={tietoryhmaField.fid} className="col-sm-3">
                    {this.categorySelector(tietoryhmaField)}
                </div>

                <div key={paatietoryhmaField.fid} className="col-sm-3">
                    {this.categorySelector(paatietoryhmaField)}
                </div>
            </div>
        );
    };

    looginenRow = looginen => {
        let tietolajiRows = [];
        values(this.props.tietolajiFields)
            .filter(tl => tl.parentFid === looginen.fid)
            .reverse()
            .forEach(tietolaji => {
                tietolajiRows.push(this.tietolajiRow(tietolaji));
            });
        return (
            <div key={looginen.fid}>
                <div className={"row"}>
                    <div className="col-sm-1">
                        <button
                            type="button"
                            className="btn btn-danger pull-right"
                            onClick={() =>
                                this.props.deleteLooginenRow(looginen.fid)
                            }
                            disabled={!looginen.created}
                        >
                            <i className="fa fa-minus" />
                        </button>
                    </div>
                    <div className="col-sm-10">
                        {this.categorySelector(looginen)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-1 col-sm-offset-1">
                        <button
                            type="button"
                            className="btn btn-success pull-right"
                            onClick={() =>
                                this.props.addNewTietolajiRow(
                                    looginen.fid,
                                    true
                                )
                            }
                            disabled={false}
                        >
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                    <div className="col-sm-3">
                        <h4>Tietolaji</h4>
                    </div>
                    <div className="col-sm-3">
                        <h4>Tietoryhmä</h4>
                    </div>
                    <div className="col-sm-3">
                        <h4>Päätietoryhmä</h4>
                    </div>
                </div>
                {tietolajiRows}
            </div>
        );
    };

    fyysinen = () => {
        const fyysinen = values(this.props.fyysinenFields)[0];
        return (
            <div>
                <div className="row">
                    <div className="col-sm-11">
                        <h4>Fyysinen tietovaranto</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-11">
                        {this.categorySelector(fyysinen)}
                    </div>
                </div>
            </div>
        );
    };

    categories = () => {
        let looginenRows = [];
        values(this.props.looginenFields)
            .reverse()
            .forEach(looginen => {
                looginenRows.push(this.looginenRow(looginen));
            });

        return (
            <div>
                {this.fyysinen(this.props.fyysinenFields)}
                <div className="row">
                    <div className="col-sm-1">
                        <button
                            type="button"
                            className="btn btn-success pull-right"
                            onClick={() => this.props.addNewLooginenRow(true)}
                            disabled={false}
                        >
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                    <div className="col-sm-9">
                        <h4>Loogiset tietovarannot</h4>
                    </div>
                </div>
                {looginenRows}
            </div>
        );
    };

    createNew = () => {
        if (!this.state.onCreate) return null;
        const createNewForm = (
            <CreateNewCategory
                tietoField={this.state.onCreate.field}
                prefilled={this.state.onCreate.prefilled}
                onSave={this.onCreateTieto}
                onCancel={this.onCancel}
            />
        );
        const modal = getCreateNewModal(
            this.onCancel,
            this.onCreateTieto,
            createNewForm
        );
        return (
            <Modal
                buttons={null}
                header={modal.header}
                body={modal.body}
                showModal={true}
                isWide={modal.isWide}
            />
        );
    };

    render() {
        return (
            <div>
                <div className={"dynamic-form"}>
                    <div className="container-fluid">{this.categories()}</div>
                    {this.formControls()}
                </div>
                {this.createNew()}
            </div>
        );
    }
}
