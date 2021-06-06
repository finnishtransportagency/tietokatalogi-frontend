import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import CustomFilterInput from "../form/CustomFilterInput";
import { CreateNewButton } from "../form/CreateNewButton";

@inject("toimintaprosessiStore")
@observer
export class ToimintaprosessiFilter extends Component {

    render () {
        return (
            <div className="row filter-toolbar">
                <CustomFilterInput 
                    searchFilter={this.props.filters.filter}
                    setFilter={this.props.setFilter}
                />
                <CreateNewButton urlString="toimintaprosessi" />
            </div>
        );
    }
}
