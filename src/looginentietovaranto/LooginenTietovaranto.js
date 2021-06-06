import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { fullURL } from "../App";
import { LooginenTietovarantoForm } from "./LooginenTietovarantoForm";
import Graph from "../Graph";
import { toJS } from "mobx";
import {Categories} from "../utils";

@inject("routing")
@inject("looginenTietovarantoStore")
@inject("notificationStore")
@observer
export default class LooginenTietovaranto extends Component {
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
            this.props.looginenTietovarantoStore.fetchDetails(tunnus);
            this.props.looginenTietovarantoStore.fetchLinkitys(
                "looginentietovaranto",
                tunnus
            );
        }
        if (!this.props.looginenTietovarantoStore.resources)
            this.props.looginenTietovarantoStore.fetchResource();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.tunnus !== nextProps.params.tunnus) {
            this.refresh(nextProps.params.tunnus);
        }
    }

    get looginen() {
        return parseInt(this.props.params.tunnus, 10) ===
            this.props.looginenTietovarantoStore.details.tunnus
            ? this.props.looginenTietovarantoStore.details
            : null;
    }

    setEditable(editable) {
        if (editable) this.props.looginenTietovarantoStore.fetchResource();
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
            replace(fullURL("looginen/tunnus/", tunnus));
            this.setEditable(false);
        }
    }

    onRemoveSuccess() {
        this.props.routing.replace(fullURL("looginentietovaranto"));
    }

    cancelNew() {
        this.props.routing.replace(fullURL("looginentietovaranto"));
    }

    render() {
        const { notificationStore } = this.props;
        const { edit } = this.state;

        let contentEl = <div>Ei tietoja</div>;
        if (this.looginen) {
            contentEl = (
                <div>
                    <LooginenTietovarantoForm
                        values={toJS(this.looginen)}
                        resources={
                            this.props.looginenTietovarantoStore.resources
                        }
                        edit={edit}
                        onSubmit={values => {
                            this.props.looginenTietovarantoStore
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
                            this.props.looginenTietovarantoStore
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
                    {this.props.looginenTietovarantoStore.links && (
                        <Graph
                            data={this.props.looginenTietovarantoStore.links}
                            category={Categories.TIETOARKKITEHTUURI}
                        />
                    )}
                </div>
            );
        } else if (!this.props.params.tunnus) {
            contentEl = (
                <LooginenTietovarantoForm
                    values={{}}
                    resources={this.props.looginenTietovarantoStore.resources}
                    edit={edit}
                    onSubmit={values => {
                        this.props.looginenTietovarantoStore
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
