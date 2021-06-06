import React from "react";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { fullURL } from "../App";
import Graph from "../Graph";
import { Categories } from "../utils";


import { TietojarjestelmapalveluForm } from "./TietojarjestelmapalveluForm";

/**
 * A container that handles the logic for tietojarjestelmapalvelu form.
 */
@inject("routing")
@inject("tietojarjestelmapalveluStore")
@inject("notificationStore")
@inject("tietoarkkitehtuuriStore")
@observer
class Tietojarjestelmapalvelu extends React.Component {
    constructor(props) {
        super(props);
        const { tunnus = null } = this.props.params;
        this.state = {
            edit: tunnus ? false : true
        };

        this.refresh(tunnus);
    }

    setEditable(nextEditable) {
        if (nextEditable) {
            this.props.tietojarjestelmapalveluStore.fetchResource();
            return this.props.tietoarkkitehtuuriStore.fetchAndSaveTietovirtaData()
                .then(() => this.setState({ edit: nextEditable }));
        }
        this.setState({ edit: nextEditable });
    }

    refresh(tunnus) {
        if (tunnus) {
            this.props.tietojarjestelmapalveluStore.fetchDetails(tunnus);
            this.props.tietojarjestelmapalveluStore.fetchLinkitys("tietojarjestelmapalvelu", this.props.params.tunnus);
        }
        if (!this.props.tietojarjestelmapalveluStore.resources) {
            this.props.tietojarjestelmapalveluStore.fetchResource();
        }
        if (this.state.edit) {
            this.props.tietoarkkitehtuuriStore.fetchAndSaveTietovirtaData();
        }
    }


    get tietojarjestelmapalvelu() {
        return parseInt(this.props.params.tunnus, 10) ===
            this.props.tietojarjestelmapalveluStore.details.tunnus
            ? this.props.tietojarjestelmapalveluStore.details
            : null;
    }

    onCreateSuccess(response) {
        const { tunnus } = response;
        const { replace } = this.props.routing;
        if (tunnus && replace) {
            this.setEditable(false);
            replace(fullURL("tietojarjestelmapalvelu/tunnus/", tunnus));
            this.refresh(tunnus);
        }
    }

    onRemoveSuccess() {
        this.props.routing.replace(fullURL("tietojarjestelmapalvelut"));
    }

    cancelNew() {
        this.props.routing.replace(fullURL("tietojarjestelmapalvelut"));
    }

    onSubmit(values) {
        this.props.tietojarjestelmapalveluStore
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
        if (this.tietojarjestelmapalvelu) {
            return (
                <div>
                    <TietojarjestelmapalveluForm
                        edit={this.state.edit}
                        values={toJS(this.tietojarjestelmapalvelu)}
                        setEditable={editable => this.setEditable(editable)}
                        resources={this.props.tietojarjestelmapalveluStore.resources}
                        remove={tunnus => {
                            this.props.tietojarjestelmapalveluStore
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
                    {this.props.tietojarjestelmapalveluStore.links && (
                        <Graph
                            data={toJS(this.props.tietojarjestelmapalveluStore.links)}
                            category={Categories.TIETOJARJESTELMAPALVELU}
                        />
                    )}
                </div>
            );
        }
        // creating new entity
        else if (!this.props.params.tunnus) {
            return (
                <div>
                    <TietojarjestelmapalveluForm 
                        edit={this.state.edit}
                        values={{}}
                        setEditable={editable => this.setEditable(editable)}
                        resources={this.props.tietojarjestelmapalveluStore.resources}
                        onSubmit={values => this.onSubmit(values)}
                        cancelNew={() => this.cancelNew()}
                    />
                </div>
            );
        }
        return <div>ei tietoja</div>;
        
    }
}

export default Tietojarjestelmapalvelu;