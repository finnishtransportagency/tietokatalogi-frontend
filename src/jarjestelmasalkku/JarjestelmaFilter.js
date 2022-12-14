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
    const organizationResources = resources["omistava_organisaatio"] || {};
    let owningOrganizationOptions = [];

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
    Object.entries(organizationResources).forEach(([key, value]) => {
      owningOrganizationOptions.push({ value: value, label: value });
    });

    return (
      <div className="row filter-toolbar">
        <div className="col col-sm-3 filter">
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
        <div className="col col-sm-2 filter">
          <JarjestelmaFilterSelect
            name="region"
            options={regionOptions}
            value={this.props.filters.region}
            placeholder={"Järjestelmäalue"}
            onChange={(values) => this.updateFilter("region", values)}
          />
        </div>
        <div className="col col-sm-2 filter">
          <JarjestelmaFilterSelect
            name="type"
            options={typeOptions}
            value={this.props.filters.type}
            placeholder={"Järjestelmätyyppi"}
            onChange={(values) => this.updateFilter("type", values)}
          />
        </div>
        <div className="col col-sm-2 filter">
          <JarjestelmaFilterSelect
            name="span"
            options={spanOptions}
            value={this.props.filters.span}
            placeholder={"Elinkaari"}
            onChange={(values) => this.updateFilter("span", values)}
          />
        </div>
        <div className="col col-sm-2 filter">
          <JarjestelmaFilterSelect
            name="owning_organization"
            options={owningOrganizationOptions || []}
            value={this.props.filters.owning_organization}
            placeholder={"Omistava organisaatio"}
            onChange={(values) =>
              this.updateFilter("owning_organization", values)
            }
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

const JarjestelmaFilterSelect = ({
  name,
  options,
  value,
  placeholder,
  onChange,
}) => (
  <Select
    name={name}
    options={options}
    placeholder={placeholder}
    multi={true}
    searchable={false}
    value={value}
    clearable={false}
    resetValue={undefined}
    onChange={onChange}
    noResultsText="Ei tuloksia"
  />
);
