import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { fullURL } from "../App";
import { PaaTietoryhmaForm } from "./PaaTietoryhmaForm";
import Graph from "../Graph";
import { toJS } from "mobx";
import {Categories} from "../utils";

@inject("routing")
@inject("paaTietoryhmaStore")
@inject("notificationStore")
@observer
export default class PaaTietoryhma extends Component {
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
            this.props.paaTietoryhmaStore.fetchDetails(tunnus);
            this.props.paaTietoryhmaStore.fetchLinkitys(
                "paatietoryhma",
                tunnus
            );
        }
        if (!this.props.paaTietoryhmaStore.resources)
            this.props.paaTietoryhmaStore.fetchResource();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.tunnus !== nextProps.params.tunnus) {
            this.refresh(nextProps.params.tunnus);
        }
    }

    get paatietoryhma() {
        return parseInt(this.props.params.tunnus, 10) ===
            this.props.paaTietoryhmaStore.details.tunnus
            ? this.props.paaTietoryhmaStore.details
            : null;
    }

    setEditable(editable) {
        if (editable) this.props.paaTietoryhmaStore.fetchResource();
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
            replace(fullURL("paatietoryhma/tunnus/", tunnus));
            this.setEditable(false);
        }
    }

    onRemoveSuccess() {
        this.props.routing.replace(fullURL("paatietoryhmat"));
    }

    cancelNew() {
        this.props.routing.replace(fullURL("paatietoryhmat"));
    }

    render() {
        const { notificationStore } = this.props;
        const { edit } = this.state;

        let contentEl = <div>Ei tietoja</div>;
        if (this.paatietoryhma) {
            contentEl = (
                <div>
                    <PaaTietoryhmaForm
                        values={toJS(this.paatietoryhma)}
                        resources={this.props.paaTietoryhmaStore.resources}
                        edit={edit}
                        onSubmit={values => {
                            this.props.paaTietoryhmaStore
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
                            this.props.paaTietoryhmaStore
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
                    {this.props.paaTietoryhmaStore.links && (
                        <Graph
                            data={this.props.paaTietoryhmaStore.links}
                            category={Categories.TIETOARKKITEHTUURI}
                        />
                    )}
                </div>
            );
        } else if (!this.props.params.tunnus) {
            contentEl = (
                <PaaTietoryhmaForm
                    values={{}}
                    resources={this.props.paaTietoryhmaStore.resources}
                    edit={edit}
                    onSubmit={values => {
                        this.props.paaTietoryhmaStore
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
