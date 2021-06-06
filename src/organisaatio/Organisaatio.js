import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

import { OrganisaatioForm } from "./OrganisaatioForm";
import { fullURL } from "../App";

@inject("routing")
@inject("organisaatioStore")
@inject("notificationStore")
@observer
export default class Organisaatio extends React.Component {
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
            this.props.organisaatioStore.fetchDetails(tunnus);
        }
        if (!this.props.organisaatioStore.resources) {
            this.props.organisaatioStore.fetchResource();
        }
    }

    get organisaatio() {
        return Number(this.props.params.tunnus) ===
            this.props.organisaatioStore.details.tunnus
            ? this.props.organisaatioStore.details
            : null;
    }


    setEditable(editable) {
        if (editable) this.props.organisaatioStore.fetchResource();
        this.setState({ edit: editable });
    }

    onCreateSuccess(data) {
        const { tunnus } = data;
        const { replace } = this.props.routing;
        if (tunnus && replace) {
            replace(fullURL("organisaatio/tunnus/", tunnus));
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
        this.props.organisaatioStore
            .save(values)
            .then(response => isNew ? this.onCreateSuccess(response.data) : this.onSuccess(response.data))
            .catch(error => this.props.notificationStore.addError("Virhe tallennuksessa", error));
    }

    onRemove = (tunnus) => {
        if (!this.props) return;
        this.props.organisaatioStore
            .remove(tunnus)
            .then(() => this.onRemoveSuccess())
            .catch(error => this.props.notificationStore.addError("Virhe poistamisessa", error));
    }

    onRemoveSuccess() {
        this.props.routing.replace(fullURL("organisaatiot"));
    }

    cancelNew() {
        this.props.routing.replace(fullURL("organisaatiot"));
    }

    render() {
        if ((!this.props.params.tunnus && this.organisaatio) || (this.props.params.tunnus && !this.organisaatio)) {
            return <div>ei tietoja</div>;
        }

        const isNew = !this.props.params.tunnus && !this.organisaatio;
        return (
            <div>
                <OrganisaatioForm
                    values={isNew ? {} : toJS(this.organisaatio)}
                    resources={this.props.organisaatioStore.resources}
                    setEditable={(editable) => this.setEditable(editable)}
                    cancelNew={() => this.cancelNew()}
                    edit={this.state.edit}
                    onSubmit={values => this.onSubmit(values, isNew)}
                    remove={tunnus => this.onRemove(tunnus)}
                />
            </div>
        );
    }
}
