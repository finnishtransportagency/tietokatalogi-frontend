import React from "react";
import { inject, observer } from "mobx-react";
import { TietoOmaisuusForm } from "./TietoOmaisuusForm";
import { toJS } from "mobx";
import { fullURL } from "../App";

@inject("routing")
@inject("tietoOmaisuusStore")
@inject("notificationStore")
@observer
export default class TietoOmaisuus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: !(props.params.tunnus)
        };
        this.refresh();
    }

    refresh() {
        if (this.props.params.tunnus) {
            this.props.tietoOmaisuusStore.fetchDetails(this.props.params.tunnus);
        }
        this.props.tietoOmaisuusStore.fetchResource();
    }

    get tietoOmaisuus() {
        return Number(this.props.params.tunnus) ===
            this.props.tietoOmaisuusStore.details.tunnus
            ? this.props.tietoOmaisuusStore.details
            : null;
    }

    setEditable(editable) {
        if (editable) this.props.tietoOmaisuusStore.fetchResource();
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
            replace(fullURL("tieto-omaisuus/tunnus/", tunnus));
            this.setEditable(false);
        }
    }

    cancelNew() {
        this.props.routing.replace(fullURL("tieto-omaisuuslista"));
    }

    onRemoveSuccess() {
        this.props.routing.replace(fullURL("tieto-omaisuuslista"));
    }

    render() {
        if (this.props.params.tunnus) {
            if (this.tietoOmaisuus) {
                // existing entity
                return (
                    <TietoOmaisuusForm
                        values={toJS(this.tietoOmaisuus)}
                        resources={this.props.tietoOmaisuusStore.resources}
                        title={"Tieto-omaisuus"}
                        setEditable={(e) => this.setEditable(e)}
                        edit={this.state.edit}
                        onSubmit={values => {
                            this.props.tietoOmaisuusStore
                                .save(values)
                                .then(response => {
                                    this.onSuccess(response.data);
                                })
                                .catch(error => {
                                    this.props.notificationStore.addError(
                                        "Virhe tallennuksessa",
                                        error
                                    );
                                });
                        }}
                        cancelNew={() => this.cancelNew()}
                        remove={(tunnus) => {
                            this.props.tietoOmaisuusStore
                                .remove(tunnus)
                                .then(() => {
                                    this.onRemoveSuccess();
                                })
                                .catch((error) => {
                                    this.props.notificationStore.addError(
                                        "Virhe tallennuksessa",
                                        error
                                    );
                                });
                        }}
                    />
                );
            }
            return <div>Ei tietoja</div>;
        }

        // create new entity
        return (
            <TietoOmaisuusForm
                values={{}}
                resources={this.props.tietoOmaisuusStore.resources}
                title={"Uusi tieto-omaisuus"}
                setEditable={(e) => this.setEditable(e)}
                edit={this.state.edit}
                onSubmit={values => {
                    this.props.tietoOmaisuusStore
                        .save(values)
                        .then(response => {
                            this.onCreateSuccess(response.data);
                        })
                        .catch(error => {
                            this.props.notificationStore.addError(
                                "Virhe tallennuksessa",
                                error
                            );
                        });
                }}
                cancelNew={() => this.cancelNew()}
            />
        );

    }
}