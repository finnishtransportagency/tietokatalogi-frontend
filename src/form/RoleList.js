import React from "react";
import {CustomResourceSelect} from "../form/CustomResourceSelect";
import {roleIdToRooliDescription} from "../utils";

export class RoleList extends React.Component {

    render() {
        const {
            edit,
            customOnChange,
            label,
            formApi
        } = this.props;
        const customResourceOuterClass = (edit) ? "col-md-11 col-xs-10" : "col-sm-12";
        const removeButtonOuterClass = (edit) ? "col-md-1 col-xs-2" : "";
        const showAddButton = edit && (!this.props.singlePersonRoles || !this.props.singlePersonRoles.includes(parseInt(this.props.roleId, 10)));

        return (
            <div>
                <div className="form-group row">
                    {this.props.rolePersons.map((henkiloRooli, i) => {
                        return henkiloRooli && (
                            <div className="col-lg-11 col-custom-lg-11" key={i}>
                                <label htmlFor={label["for"]}>
                                    {label["value"]}
                                </label>

                                <div className="row">
                                    <div className={customResourceOuterClass}>
                                        <CustomResourceSelect
                                            getClassName={this.props.customResourceSelectClassName}
                                            field="henkiloRooliList"
                                            fieldTypeName={henkiloRooli.rooli.nimi}
                                            readOnly={!edit}
                                            person={henkiloRooli.henkilo}
                                            customOnChange={(selection) =>
                                                customOnChange()(henkiloRooli, selection, henkiloRooli.rooli.tunnus, formApi)
                                            }
                                            selectToLabel={this.props.selectToLabel}
                                            selectRequestUrl={this.props.selectRequestUrl}
                                            edit={edit}
                                        />
                                    </div>
                                    <div className={removeButtonOuterClass}>
                                        {edit && (
                                            <button
                                                type="button"
                                                className="btn btn-danger float-right"
                                                onClick={() => this.props.onRowDelete(henkiloRooli, formApi)}
                                                disabled={!edit}
                                            >
                                                <i className="fa fa-remove"/>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {showAddButton && (
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    this.props.onRowAdd(this.props.roleId);
                                }}
                                disabled={!edit}
                            >
                                Lisää {roleIdToRooliDescription(this.props.roleId)}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
