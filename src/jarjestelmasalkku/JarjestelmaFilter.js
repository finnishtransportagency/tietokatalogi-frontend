/* eslint no-restricted-globals: 0 */
import React, { Component } from "react";
import Select from "react-select";
import { Link } from "react-router";
import { inject, observer } from "mobx-react";
import { fullURL } from "../App";

@inject("jarjestelmaSalkkuStore")
@observer
export class JarjestelmaFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFilter: this.props.filters.filter,
    };
  }

  updateFilter(filterName, filters = []) {
    let filterValues = filters.map((item) => {
      return item.value;
    });

    let newFilters = [];
    newFilters.push({ [filterName]: filterValues });
    newFilters.push({ filter: this.state.searchFilter });
    this.props.setFilter(newFilters);
  }

  render() {
    const resources = this.props.jarjestelmaSalkkuStore.resources || {};

    const spanResources = resources["elinkaaritila"] || {};
    let spanOptions = [];
    const typeResources = resources["jarjestelmatyyppi"] || {};
    let typeOptions = [];
    const regionResources = resources["jarjestelmaalue"] || {};
    let regionOptions = [];

    //TODO: change to {value: key, label: value} when db is ready
    Object.entries(spanResources).forEach(([key, value]) => {
      spanOptions.push({ value: value, label: value });
    });
    Object.entries(typeResources).forEach(([key, value]) => {
      typeOptions.push({ value: value, label: value });
    });
    Object.entries(regionResources).forEach(([key, value]) => {
      regionOptions.push({ value: value, label: value });
    });

    return (
      <div className="row filter-toolbar">
        <div className="col col-sm-2 filter">
          <input
            type="text"
            name="filter"
            placeholder="Etsi"
            value={this.state.searchFilter}
            onChange={(e) => {
              this.setState({ searchFilter: e.target.value });
            }}
            onKeyPress={(e) => {
              const keyCode = e.keyCode || e.which;
              if (keyCode === 13) {
                this.props.setFilter([{ filter: this.state.searchFilter }]);
              }
            }}
            style={this.props.style}
            className={this.props.className + " form-control"}
          />
        </div>
        <div className="col col-sm-3 filter">
          <Select
            name="region"
            options={regionOptions}
            placeholder={"Järjestelmäalue"}
            multi={true}
            searchable={false}
            value={this.props.filters.region}
            clearable={false}
            resetValue={undefined}
            onChange={(values) => this.updateFilter("region", values)}
            noResultsText="Ei tuloksia"
          />
        </div>
        <div className="col col-sm-3 filter">
          <Select
            name="type"
            options={typeOptions}
            placeholder={"Järjestelmätyyppi"}
            multi={true}
            searchable={false}
            value={this.props.filters.type}
            clearable={false}
            resetValue={undefined}
            onChange={(values) => this.updateFilter("type", values)}
            noResultsText="Ei tuloksia"
          />
        </div>
        <div className="col col-sm-3 filter">
          <Select
            name="span"
            options={spanOptions}
            placeholder={"Elinkaari"}
            multi={true}
            searchable={false}
            value={this.props.filters.span}
            clearable={false}
            resetValue={undefined}
            onChange={(values) => this.updateFilter("span", values)}
            noResultsText="Ei tuloksia"
          />
        </div>
        <div className="col col-sm-1 filter">
          <Link
            type="button"
            className="btn btn-primary pull-right"
            to={fullURL("jarjestelma")}
          >
            Uusi
          </Link>
        </div>
      </div>
    );
  }
}
