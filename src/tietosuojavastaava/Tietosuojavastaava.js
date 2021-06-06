import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

import { TietosuojavastaavaForm } from "./TietosuojavastaavaForm";
import { fullURL } from "../App";

@inject("routing")
@inject("tietosuojavastaavaStore")
@inject("notificationStore")
@observer
export default class Tietosuojavastaava extends React.Component {
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
            this.props.tietosuojavastaavaStore.fetchDetails(tunnus);
        }
        if (!this.props.tietosuojavastaavaStore.resources) {
            this.props.tietosuojavastaavaStore.fetchResource();
        }
    }

    get tietosuojavastaava() {
        return Number(this.props.params.tunnus) ===
            this.props.tietosuojavastaavaStore.details.tunnus
            ? this.props.tietosuojavastaavaStore.details
            : null;
    }


    setEditable(editable) {
        if (editable) this.props.tietosuojavastaavaStore.fetchResource();
        this.setState({ edit: editable });
    }

    onCreateSuccess(data) {
        const { tunnus } = data;
        const { replace } = this.props.routing;
        if (tunnus && replace) {
            replace(fullURL("tietosuojavastaava/tunnus/", tunnus));
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
        this.props.tietosuojavastaavaStore
            .save(values)
            .then(response => isNew ? this.onCreateSuccess(response.data) : this.onSuccess(response.data))
            .catch(error => this.props.notificationStore.addError("Virhe tallennuksessa", error));
    }

    onRemove = (tunnus) => {
        if (!this.props) return;
        this.props.tietosuojavastaavaStore
            .remove(tunnus)
            .then(() => this.onRemoveSuccess())
            .catch(error => this.props.notificationStore.addError("Virhe poistamisessa", error));
    }

    onRemoveSuccess() {
        this.props.routing.replace(fullURL("tietosuojavastaavat"));
    }

    cancelNew() {
        this.props.routing.replace(fullURL("tietosuojavastaavat"));
    }

    render() {
        if ((!this.props.params.tunnus && this.tietosuojavastaava) || (this.props.params.tunnus && !this.tietosuojavastaava)) {
            return <div>ei tietoja</div>;
        }

        const isNew = !this.props.params.tunnus && !this.tietosuojavastaava;
        return (
            <div>
                <TietosuojavastaavaForm
                    values={isNew ? {} : toJS(this.tietosuojavastaava)}
                    resources={this.props.tietosuojavastaavaStore.resources}
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
