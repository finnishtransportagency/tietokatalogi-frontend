import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import CustomFilterInput from "../form/CustomFilterInput";
import { CreateNewButton } from "../form/CreateNewButton";

@inject("termilomakeStore")
@observer
export class TermilomakeFilter extends Component {

    render () {
        return (
            <div className="row filter-toolbar">
                <CustomFilterInput
                    searchFilter={this.props.filters.filter}
                    customClassName={this.props.className}
                    setFilter={this.props.setFilter}
                />
                <CreateNewButton urlString="sanasto" />
            </div>
        );
    }
}
