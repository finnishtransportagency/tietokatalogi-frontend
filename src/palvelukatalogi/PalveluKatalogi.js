import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { fullURL } from "../App";
import { PalveluForm } from "./PalveluForm";
import { toJS } from "mobx";

@inject("routing")
@inject("palveluKatalogiStore")
@inject("notificationStore")
@observer
export default class PalveluKatalogi extends Component {
    constructor(props, context) {
        super(props, context);
        const { tunnus = null } = this.props.params;
        this.state = {
            edit: tunnus ? false : true,
            palveluFormValues: null
        };
        this.refresh(tunnus);
    }

    refresh(tunnus) {
        if (tunnus) {
            this.props.palveluKatalogiStore.fetchDetails(tunnus);
        }
        if (!this.props.palveluKatalogiStore.resources)
            this.props.palveluKatalogiStore.fetchResource();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.tunnus !== nextProps.params.tunnus) {
            this.refresh(nextProps.params.tunnus);
        }
    }

    get palvelu() {
        return parseInt(this.props.params.tunnus, 10) ===
            this.props.palveluKatalogiStore.details.tunnus
            ? this.props.palveluKatalogiStore.details
            : null;
    }

    setEditable(editable) {
        if (editable) this.props.palveluKatalogiStore.fetchResource();
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
            replace(fullURL("palvelu/tunnus/", tunnus));
            this.setEditable(false);
        }
    }

    onRemoveSuccess() {
        this.props.routing.replace(fullURL("palvelukatalogi"));
    }

    cancelNew() {
        this.props.routing.replace(fullURL("palvelukatalogi"));
    }

    updateValue(newValue) {
        let newState = {};
        if (this.state.palveluFormValues) {
            newState = {
                ...this.state.palveluFormValues,
                ylataso: newValue
            };
        } else {
            newState = {
                ...toJS(this.palvelu),
                ylataso: newValue
            };
        }
        this.setState({
            palveluFormValues: newState
        });
    }

    render() {
        const { notificationStore } = this.props;
        const { edit } = this.state;
        const valuesStore = toJS(this.palvelu) || {};
        const valuesState = this.state.palveluFormValues || {};
        const values = Object.assign(valuesStore, valuesState);
        let contentEl = <div>Ei tietoja</div>;
        if (values.tunnus) {
            contentEl = (
                <div>
                    <PalveluForm
                        values={values}
                        resources={this.props.palveluKatalogiStore.resources}
                        edit={edit}
                        onSubmit={values => {
                            this.props.palveluKatalogiStore
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
                            this.props.palveluKatalogiStore
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
                        onYlatasoChange={newval => {
                            this.updateValue(newval);
                        }}
                    />
                </div>
            );
        } else {
            contentEl = (
                <PalveluForm
                    values={values}
                    resources={this.props.palveluKatalogiStore.resources}
                    edit={edit}
                    onSubmit={values => {
                        this.props.palveluKatalogiStore
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
                    onYlatasoChange={newval => {
                        this.updateValue(newval);
                    }}
                />
            );
        }

        return contentEl;
    }
}
