import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

import { TietovarantoForm } from "./TietovarantoForm";
import { fullURL } from "../App";
import Graph from "../Graph";
import { Categories } from "../utils";

@inject("routing")
@inject("tietovarantoStore")
@inject("notificationStore")
@observer
export default class Tietovaranto extends React.Component {
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
            this.props.tietovarantoStore.fetchDetails(tunnus);
            this.props.tietovarantoStore.fetchLinkitys("tietovaranto", tunnus);
        }
        if (!this.props.tietovarantoStore.resources) {
            this.props.tietovarantoStore.fetchResource();
        }
    }

    get tietovaranto() {
        return Number(this.props.params.tunnus) ===
            this.props.tietovarantoStore.details.tunnus
            ? this.props.tietovarantoStore.details
            : null;
    }


    setEditable(editable) {
        if (editable) this.props.tietovarantoStore.fetchResource();
        this.setState({ edit: editable });
    }

    onCreateSuccess(data) {
        const { tunnus } = data;
        const { replace } = this.props.routing;
        if (tunnus && replace) {
            replace(fullURL("tietovaranto/tunnus/", tunnus));
            this.setEditable(false);
        }
    }

    onSuccess(data) {
        const { tunnus } = data;
        if (tunnus) {
            this.setEditable(false);
            this.refresh(tunnus);
        }
    }

    onSubmit = (values, isNew) => {
        if (!this.props) return;
        this.props.tietovarantoStore
            .save(values)
            .then(response => {
                isNew ? this.onCreateSuccess(response.data) : this.onSuccess(response.data);

                // Fetch the resources again to update the creatable dropdown values
                this.props.tietovarantoStore.fetchResource();
            })
            .catch(error => this.props.notificationStore.addError("Virhe tallennuksessa", error));
    }

    onRemove = (tunnus) => {
        if (!this.props) return;
        this.props.tietovarantoStore
            .remove(tunnus)
            .then(() => {
                this.onRemoveSuccess();

                // Fetch the resources again to update the creatable dropdown values
                this.props.tietovarantoStore.fetchResource();
            })
            .catch(error => this.props.notificationStore.addError("Virhe poistamisessa", error));
    }

    onRemoveSuccess() {
        this.props.routing.replace(fullURL("tietovarannot"));
    }

    cancelNew() {
        this.props.routing.replace(fullURL("tietovarannot"));
    }

    render() {
        if ((!this.props.params.tunnus && this.tietovaranto) || (this.props.params.tunnus && !this.tietovaranto)) {
            return <div>ei tietoja</div>;
        }
        
        const isNew = !this.props.params.tunnus && !this.tietovaranto;
        return (
            <div>
                <TietovarantoForm
                    values={isNew ? {} : toJS(this.tietovaranto)}
                    resources={this.props.tietovarantoStore.resources}
                    setEditable={(editable) => this.setEditable(editable)}
                    cancelNew={() => this.cancelNew()}
                    edit={this.state.edit}
                    onSubmit={values => this.onSubmit(values, isNew)}
                    remove={tunnus => this.onRemove(tunnus)}
                />
                {this.props.tietovarantoStore.links && (
                    <Graph
                        data={toJS(this.props.tietovarantoStore.links)}
                        category={Categories.TIETOVARANTO}
                    />
                )}
            </div>
        );
    }
}
