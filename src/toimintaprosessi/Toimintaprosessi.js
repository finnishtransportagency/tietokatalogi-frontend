import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

import { ToimintaprosessiForm } from "./ToimintaprosessiForm";
import { fullURL } from "../App";
import Graph from "../Graph";
import { Categories } from "../utils";

@inject("routing")
@inject("toimintaprosessiStore")
@inject("notificationStore")
@observer
export default class Toimintaprosessi extends React.Component {
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
            this.props.toimintaprosessiStore.fetchDetails(tunnus);
            this.props.toimintaprosessiStore.fetchLinkitys("toimintaprosessi", tunnus);
        }
        if (!this.props.toimintaprosessiStore.resources) {
            this.props.toimintaprosessiStore.fetchResource();
        }
    }

    get toimintaprosessi() {
        return Number(this.props.params.tunnus) ===
            this.props.toimintaprosessiStore.details.tunnus
            ? this.props.toimintaprosessiStore.details
            : null;
    }


    setEditable(editable) {
        if (editable) this.props.toimintaprosessiStore.fetchResource();
        this.setState({ edit: editable });
    }

    onCreateSuccess(data) {
        const { tunnus } = data;
        const { replace } = this.props.routing;
        if (tunnus && replace) {
            replace(fullURL("toimintaprosessi/tunnus/", tunnus));
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
        this.props.toimintaprosessiStore
            .save(values)
            .then(response => {
                isNew ? this.onCreateSuccess(response.data) : this.onSuccess(response.data);

                // Fetch the resources again to update the 'vastaava organisaatio' values
                this.props.toimintaprosessiStore.fetchResource();
            })
            .catch(error => this.props.notificationStore.addError("Virhe tallennuksessa", error));
    }

    onRemove = (tunnus) => {
        if (!this.props) return;
        this.props.toimintaprosessiStore
            .remove(tunnus)
            .then(() => {
                this.onRemoveSuccess();

                // Fetch the resources again to update the 'vastaava organisaatio' values
                this.props.toimintaprosessiStore.fetchResource();
            })
            .catch(error => this.props.notificationStore.addError("Virhe poistamisessa", error));
    }

    onRemoveSuccess() {
        this.props.routing.replace(fullURL("toimintaprosessit"));
    }

    cancelNew() {
        this.props.routing.replace(fullURL("toimintaprosessit"));
    }

    render() {
        if ((!this.props.params.tunnus && this.toimintaprosessi) || (this.props.params.tunnus && !this.toimintaprosessi)) {
            return <div>ei tietoja</div>;
        }

        const isNew = !this.props.params.tunnus && !this.toimintaprosessi;
        return (
            <div>
                <ToimintaprosessiForm
                    values={isNew ? {} : toJS(this.toimintaprosessi)}
                    resources={this.props.toimintaprosessiStore.resources}
                    setEditable={(editable) => this.setEditable(editable)}
                    cancelNew={() => this.cancelNew()}
                    edit={this.state.edit}
                    onSubmit={values => this.onSubmit(values, isNew)}
                    remove={tunnus => this.onRemove(tunnus)}
                />
                {this.props.toimintaprosessiStore.links && (
                    <Graph
                        data={toJS(this.props.toimintaprosessiStore.links)}
                        category={Categories.TOIMINTAPROSESSI}
                    />
                )}
            </div>
        );
    }
}
