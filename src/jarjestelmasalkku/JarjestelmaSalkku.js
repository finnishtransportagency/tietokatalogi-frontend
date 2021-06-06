import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { fullURL } from "../App";
import { JarjestelmaForm } from "./JarjestelmaForm";
import Graph from "../Graph";
import {Categories} from "../utils";
import { convertFetchedLinksToOneDirectional, convertLinksFromFetchedToMultiselectFormat, removeNameData } from "./JarjestelmaLinkUtils.js";
import { toJS } from "mobx";

@inject("routing")
@inject("jarjestelmaSalkkuStore")
@inject("tietojarjestelmapalveluStore")
@inject("notificationStore")
@observer 
export default class JarjestelmaSalkku extends Component {
    constructor(props, context) {
        super(props, context);
        const { tunnus = null } = this.props.params;
        this.state = {
            edit: tunnus ? false : true
        };
        this.refresh(tunnus, props);
    }

    refresh(tunnus) {
        if (tunnus) {
            this.props.jarjestelmaSalkkuStore.fetchDetails(tunnus).then(() => {
                // Note: this section needs to be formulated carefully so that the form
                // actually reacts to updated data.
                const listWithoutNameData = removeNameData(this.props.jarjestelmaSalkkuStore.details.jarjestelmaLinkkausList);
                const oneDirectional = convertFetchedLinksToOneDirectional(
                    listWithoutNameData, Number(tunnus)
                );
                delete this.props.jarjestelmaSalkkuStore.details.jarjestelmaLinkkausList;
                const [ multiLinks, metadata ] = convertLinksFromFetchedToMultiselectFormat(oneDirectional);

                this.props.jarjestelmaSalkkuStore.details.jarjestelmaLinkkausListMultiselect = multiLinks;
                this.props.jarjestelmaSalkkuStore.details.jarjestelmaLinkkausMetadata = metadata;
                this.props.jarjestelmaSalkkuStore.details = toJS(this.props.jarjestelmaSalkkuStore.details);
            });
        }
        if (!this.props.jarjestelmaSalkkuStore.resources) {
            this.props.jarjestelmaSalkkuStore.fetchResource();
        }
        this.props.tietojarjestelmapalveluStore.searchAll({}, 0, -1);
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.params.tunnus !== nextProps.params.tunnus) {
            this.refresh(nextProps.params.tunnus);
        }
    }

    get jarjestelma() {
        return parseInt(this.props.params.tunnus, 10) ===
            this.props.jarjestelmaSalkkuStore.details.tunnus
            ? this.props.jarjestelmaSalkkuStore.details
            : null;
    }

    setEditable(editable) {
        if (editable) this.props.jarjestelmaSalkkuStore.fetchResource();
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
            replace(fullURL("jarjestelma/tunnus/", tunnus));
            this.setEditable(false);
        }
    }

    onRemoveSuccess() {
        this.props.routing.replace(fullURL("jarjestelmasalkku"));
    }

    cancelNew() {
        this.props.routing.replace(fullURL("jarjestelmasalkku"));
    }

    validateBeforeSubmit(values) {
        if (values["henkiloRooliList"]) {
            values["henkiloRooliList"] = values["henkiloRooliList"].filter(henkiloRooli => {
                return henkiloRooli !== null &&
                    (henkiloRooli.henkiloId !== null && henkiloRooli.rooliId !== null);
            });
        }
    }

    render() {
        const { notificationStore } = this.props;
        const { edit } = this.state;

        let contentEl = <div>Ei tietoja</div>;

        if (this.jarjestelma) {
            contentEl = (
                <div>
                    <JarjestelmaForm
                        values={this.props.jarjestelmaSalkkuStore.details}
                        resources={this.props.jarjestelmaSalkkuStore.resources}
                        edit={edit}
                        onSubmit={values => {
                            this.validateBeforeSubmit(values);
                            this.props.jarjestelmaSalkkuStore
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
                            this.props.jarjestelmaSalkkuStore
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
                    {this.props.jarjestelmaSalkkuStore.details.linkData && (
                        <Graph
                            data={toJS(this.props.jarjestelmaSalkkuStore.details.linkData)}
                            category={Categories.JARJESTELMASALKKU}
                        />
                    )}
                </div>
            );
        } else if (!this.props.params.tunnus) {
            contentEl = (
                <JarjestelmaForm
                    values={{}}
                    resources={this.props.jarjestelmaSalkkuStore.resources}
                    edit={edit}
                    onSubmit={values => {
                        this.validateBeforeSubmit(values);
                        this.props.jarjestelmaSalkkuStore
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
