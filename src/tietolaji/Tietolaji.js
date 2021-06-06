import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { fullURL } from "../App";
import { TietolajiForm } from "./TietolajiForm";
import Graph from "../Graph";
import { toJS } from "mobx";
import {Categories} from "../utils";

@inject("routing")
@inject("tietolajiStore")
@inject("notificationStore")
@observer
export default class Tietolaji extends Component {
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
            this.props.tietolajiStore.fetchDetails(tunnus);
            this.props.tietolajiStore.fetchLinkitys("tietolaji", tunnus);
        }
        if (!this.props.tietolajiStore.resources)
            this.props.tietolajiStore.fetchResource();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.tunnus !== nextProps.params.tunnus) {
            this.refresh(nextProps.params.tunnus);
        }
    }

    get tietolaji() {
        return parseInt(this.props.params.tunnus, 10) ===
            this.props.tietolajiStore.details.tunnus
            ? this.props.tietolajiStore.details
            : null;
    }

    setEditable(editable) {
        if (editable) this.props.tietolajiStore.fetchResource();
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
            replace(fullURL("tietolaji/tunnus/", tunnus));
            this.setEditable(false);
        }
    }

    onRemoveSuccess() {
        this.props.routing.replace(fullURL("tietolajit"));
    }

    cancelNew() {
        this.props.routing.replace(fullURL("tietolajit"));
    }

    render() {
        const { notificationStore } = this.props;
        const { edit } = this.state;

        let contentEl = <div>Ei tietoja</div>;
        if (this.tietolaji) {
            contentEl = (
                <div>
                    <TietolajiForm
                        values={toJS(this.tietolaji)}
                        resources={this.props.tietolajiStore.resources}
                        edit={edit}
                        onSubmit={values => {
                            this.props.tietolajiStore
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
                            this.props.tietolajiStore
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
                    {this.props.tietolajiStore.links && (
                        <Graph
                            data={this.props.tietolajiStore.links}
                            category={Categories.TIETOARKKITEHTUURI}
                        />
                    )}
                </div>
            );
        } else if (!this.props.params.tunnus) {
            contentEl = (
                <TietolajiForm
                    values={{}}
                    resources={this.props.tietolajiStore.resources}
                    edit={edit}
                    onSubmit={values => {
                        this.props.tietolajiStore
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
