/* eslint no-restricted-globals: 0 */
import React, { Component } from "react";
import Select from "react-select";
import { Link } from "react-router";
import { inject, observer } from "mobx-react";
import { fullURL } from "../App";
import { lowerWithoutScandics } from "../utils";

@inject("palveluKatalogiStore")
@observer
export class PalveluFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchFilter: this.props.filters.filter
        };
    }

    updateFilter(filterName, filters = []) {
        let filterValues = filters
            .filter(item => {
                // 'KAIKKI' == null
                return item.value !== null;
            })
            .map(item => {
                return item.value;
            });

        // if the 'KAIKKI' selected filterarray should be empty instead of
        // having one item with null-value
        filterValues = filterValues.length > 0 ? filterValues : null;

        let newFilters = [];
        if (filterName === "toplevel") {
            newFilters.push({ toplevel: filterValues, header: null });
        } else {
            newFilters.push({ [filterName]: filterValues });
        }
        newFilters.push({ filter: this.state.searchFilter });
        this.props.setFilter(newFilters);
    }

    render() {
        const resources = this.props.palveluKatalogiStore.resources || {};
        const {
            filters: { toplevel, header }
        } = this.props;
        const toplevelResources = resources["ylataso"] || {};
        let toplevelOptions = [];
        let headerOptions = [];
        const selectedToplevel =
            toplevel && toplevel.length > 0 ? toplevel[0] : null;
        toplevelOptions.push({ value: null, label: "KAIKKI" });
        Object.entries(toplevelResources).forEach(([key, value]) => {
            toplevelOptions.push({ value: value, label: value });
        });

        const headerResources =
            resources[lowerWithoutScandics(selectedToplevel)];

        if (selectedToplevel && headerResources) {
            Object.entries(headerResources).forEach(([key, value]) => {
                headerOptions.push({ value: value, label: value });
            });
        }
        const selectedHeader = header && header.length > 0 ? header : null;

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
                <div className="col col-sm-3 filter">
                    <Select
                        name="ylataso"
                        options={toplevelOptions}
                        placeholder={"Ylätaso"}
                        multi={false}
                        searchable={false}
                        value={selectedToplevel}
                        clearable={false}
                        resetValue={undefined}
                        onChange={values =>
                            this.updateFilter("toplevel", [values])
                        }
                        noResultsText="Ei tuloksia"
                    />
                </div>
                <div className="col col-sm-3 filter">
                    <Select
                        name="otsikko"
                        options={headerOptions}
                        placeholder={"Otsikko"}
                        multi={true}
                        searchable={false}
                        value={selectedHeader}
                        clearable={false}
                        resetValue={undefined}
                        onChange={values => this.updateFilter("header", values)}
                        noResultsText="Ei tuloksia"
                    />
                </div>
                <div className="col col-sm-1 col-sm-offset-3 filter">
                    <Link
                        type="button"
                        className="btn btn-primary pull-right"
                        to={fullURL("palvelu")}
                    >
                        Uusi
                    </Link>
                </div>
            </div>
        );
    }
}
