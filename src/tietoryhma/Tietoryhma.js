import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { fullURL } from "../App";
import { TietoryhmaForm } from "./TietoryhmaForm";
import Graph from "../Graph";
import { toJS } from "mobx";
import {Categories} from "../utils";

@inject("routing")
@inject("tietoryhmaStore")
@inject("notificationStore")
@observer
export default class Tietoryhma extends Component {
    constructor(props, context) {
        super(props, context);
        const { tunnus = null } = this.props.params;
        this.state = {
            edit: tunnus ? false : true
        };
        this.refresh(tunnus);
    }

    refresh(tunnus) {
        if (tunnus) {
            this.props.tietoryhmaStore.fetchDetails(tunnus);
            this.props.tietoryhmaStore.fetchLinkitys("tietoryhma", tunnus);
        }
        if (!this.props.tietoryhmaStore.resources)
            this.props.tietoryhmaStore.fetchResource();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.tunnus !== nextProps.params.tunnus) {
            this.refresh(nextProps.params.tunnus);
        }
    }

    get tietoryhma() {
        return parseInt(this.props.params.tunnus, 10) ===
            this.props.tietoryhmaStore.details.tunnus
            ? this.props.tietoryhmaStore.details
            : null;
    }

    setEditable(editable) {
        if (editable) this.props.tietoryhmaStore.fetchResource();
        this.setState({ edit: editable });
    }

    onSuccess(data) {
        const { tunnus } = data;
        if (tunnus) {
            this.setEditable(false);
            this.refresh(tunnus);
        }
    }

    onCreateSuccess(data) {
        const { tunnus } = data;
        const { replace } = this.props.routing;
        if (tunnus && replace) {
            replace(fullURL("tietoryhma/tunnus/", tunnus));
            this.setEditable(false);
        }
    }

    onRemoveSuccess() {
        this.props.routing.replace(fullURL("tietoryhmat"));
    }

    cancelNew() {
        this.props.routing.replace(fullURL("tietoryhmat"));
    }

    render() {
        const { notificationStore } = this.props;
        const { edit } = this.state;

        let contentEl = <div>Ei tietoja</div>;
        if (this.tietoryhma) {
            contentEl = (
                <div>
                    <TietoryhmaForm
                        values={toJS(this.tietoryhma)}
                        resources={this.props.tietoryhmaStore.resources}
                        edit={edit}
                        onSubmit={values => {
                            this.props.tietoryhmaStore
                                .save(values)
                                .then(response => {
                                    this.onSuccess(response.data);
                                })
                                .catch(function(error) {
                                    notificationStore.addError(
                                        "Virhe tallennuksessa",
                                        error
                                    );
                                });
                        }}
                        remove={tunnus => {
                            this.props.tietoryhmaStore
                                .remove(tunnus)
                                .then(response => {
                                    this.onRemoveSuccess();
                                })
                                .catch(function(error) {
                                    notificationStore.addError(
                                        "Virhe tallennuksessa",
                                        error
                                    );
                                });
                        }}
                        setEditable={editable => this.setEditable(editable)}
                    />
                    {this.props.tietoryhmaStore.links && (
                        <Graph
                            data={this.props.tietoryhmaStore.links}
                            category={Categories.TIETOARKKITEHTUURI}
                        />

                    )}
                </div>
            );
        } else if (!this.props.params.tunnus) {
            contentEl = (
                <TietoryhmaForm
                    values={{}}
                    resources={this.props.tietoryhmaStore.resources}
                    edit={edit}
                    onSubmit={values => {
                        this.props.tietoryhmaStore
                            .save(values)
                            .then(response => {
                                this.onCreateSuccess(response.data);
                            })
                            .catch(function(error) {
                                notificationStore.addError(
                                    "Virhe tallennuksessa",
                                    error
                                );
                            });
                    }}
                    setEditable={editable => this.setEditable(editable)}
                    cancelNew={() => this.cancelNew()}
                />
            );
        }

        return contentEl;
    }
}
