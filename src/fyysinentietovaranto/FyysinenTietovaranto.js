import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { fullURL } from "../App";
import { FyysinenTietovarantoForm } from "./FyysinenTietovarantoForm";
import Graph from "../Graph";
import { toJS } from "mobx";
import {Categories} from "../utils";

@inject("routing")
@inject("fyysinenTietovarantoStore")
@inject("notificationStore")
@observer
export default class FyysinenTietovaranto extends Component {
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
            this.props.fyysinenTietovarantoStore.fetchDetails(tunnus);
            this.props.fyysinenTietovarantoStore.fetchLinkitys(
                "fyysinentietovaranto",
                tunnus
            );
        }
        if (!this.props.fyysinenTietovarantoStore.resources)
            this.props.fyysinenTietovarantoStore.fetchResource();
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.params.tunnus !== nextProps.params.tunnus) {
            this.refresh(nextProps.params.tunnus);
        }
    }

    get fyysinen() {
        return parseInt(this.props.params.tunnus, 10) ===
            this.props.fyysinenTietovarantoStore.details.tunnus
            ? this.props.fyysinenTietovarantoStore.details
            : null;
    }

    setEditable(editable) {
        if (editable) this.props.fyysinenTietovarantoStore.fetchResource();
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
            replace(fullURL("fyysinen/tunnus/", tunnus));
            this.setEditable(false);
        }
    }

    onRemoveSuccess() {
        this.props.routing.replace(fullURL("fyysinentietovaranto"));
    }

    cancelNew() {
        this.props.routing.replace(fullURL("fyysinentietovaranto"));
    }

    render() {
        const { notificationStore } = this.props;
        const { edit } = this.state;

        let contentEl = <div>Ei tietoja</div>;
        if (this.fyysinen) {
            contentEl = (
                <div>
                    <FyysinenTietovarantoForm
                        values={toJS(this.fyysinen)}
                        resources={
                            this.props.fyysinenTietovarantoStore.resources
                        }
                        edit={edit}
                        onSubmit={values => {
                            this.props.fyysinenTietovarantoStore
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
                            this.props.fyysinenTietovarantoStore
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
                    {this.props.fyysinenTietovarantoStore.links && (
                        <Graph
                            data={this.props.fyysinenTietovarantoStore.links}
                            category={Categories.TIETOARKKITEHTUURI}
                        />
                    )}
                </div>
            );
        } else if (!this.props.params.tunnus) {
            contentEl = (
                <FyysinenTietovarantoForm
                    values={{}}
                    resources={this.props.fyysinenTietovarantoStore.resources}
                    edit={edit}
                    onSubmit={values => {
                        this.props.fyysinenTietovarantoStore
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
