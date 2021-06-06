import React from "react";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { fullURL } from "../App";
import Graph from "../Graph";
import { Categories } from "../utils";


import { TermilomakeForm } from "./TermilomakeForm";

/**
 * A container that handles the logic for termilomake form.
 */
@inject("routing")
@inject("termilomakeStore")
@inject("notificationStore")
@observer
class Termilomake extends React.Component {
    constructor(props) {
        super(props);
        const { tunnus = null } = this.props.params;
        this.state = {
            edit: tunnus ? false : true
        };

        this.refresh(tunnus);
    }

    setEditable(editable) {
        if (editable) this.props.termilomakeStore.fetchResource();
        this.setState({ edit: editable });
    }

    refresh(tunnus) {
        if (tunnus) {
            this.props.termilomakeStore.fetchDetails(tunnus);
            this.props.termilomakeStore.fetchLinkitys(
                "sanasto",
                tunnus
            );
        }
        if (!this.props.termilomakeStore.resources)
            this.props.termilomakeStore.fetchResource();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.tunnus !== nextProps.params.tunnus) {
            this.refresh(nextProps.params.tunnus);
        }
    }

    get termilomake() {
        return parseInt(this.props.params.tunnus, 10) ===
            this.props.termilomakeStore.details.tunnus
            ? this.props.termilomakeStore.details
            : null;
    }

    onCreateSuccess(response) {
        const { tunnus } = response;
        const { replace } = this.props.routing;
        if (tunnus && replace) {
            this.setEditable(false);
            replace(fullURL("sanasto/tunnus/", tunnus));
            this.refresh(tunnus);
        }
    }

    onRemoveSuccess() {
        this.props.routing.replace(fullURL("sanastolista"));
    }

    cancelNew() {
        this.props.routing.replace(fullURL("sanastolista"));
    }

    onSubmit(values) {
        this.props.termilomakeStore
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
        return;
    }

    render() {
        // viewing existing entity
        if (this.termilomake) {
            return (
                <div>
                    <TermilomakeForm
                        edit={this.state.edit}
                        values={toJS(this.termilomake)}
                        setEditable={editable => this.setEditable(editable)}
                        resources={this.props.termilomakeStore.resources}
                        remove={tunnus => {
                            this.props.termilomakeStore
                                .remove(tunnus)
                                .then(() => this.onRemoveSuccess())
                                .catch((error) => {
                                    this.props.notificationStore.addError(
                                        "Virhe tallennuksessa",
                                        error
                                    );
                                });
                        }}
                        onSubmit={values => this.onSubmit(values)}
                    />
                    {this.props.termilomakeStore.links && (
                        <Graph
                            data={toJS(this.props.termilomakeStore.links)}
                            category={Categories.TERMILOMAKE}
                        />
                    )}
                </div>
            );
        }
        // creating new entity
        else if (!this.props.params.tunnus) {
            return (
                <div>
                    <TermilomakeForm
                        edit={this.state.edit}
                        values={{}}
                        setEditable={editable => this.setEditable(editable)}
                        resources={this.props.termilomakeStore.resources}
                        onSubmit={values => this.onSubmit(values)}
                        cancelNew={() => this.cancelNew()}
                    />
                </div>
            );
        }
        return <div>ei tietoja</div>;

    }
}

export default Termilomake;
