/* eslint no-restricted-globals: 0 */
import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("sovellusSalkkuStore")
@observer
export class SovellusFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchFilter: this.props.filters.filter
        };
    }

    render() {
        return (
            <div className="row filter-toolbar">
                <div className="col col-sm-2 filter">
                    <input
                        type="text"
                        name="filter"
                        placeholder="Etsi"
                        value={this.state.searchFilter}
                        onChange={e => {
                            this.setState({ searchFilter: e.target.value });
                        }}
                        onKeyPress={e => {
                            const keyCode = e.keyCode || e.which;
                            if (keyCode === 13) {
                                this.props.setFilter([
                                    { filter: this.state.searchFilter }
                                ]);
                            }
                        }}
                        style={this.props.style}
                        className={this.props.className + " form-control"}
                    />
                </div>
            </div>
        );
    }
}
