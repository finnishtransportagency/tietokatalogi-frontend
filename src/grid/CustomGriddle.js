import React, { Component } from "react";
import { observer } from "mobx-react";
import Griddle from "griddle-react";
import CustomPagination from "./CustomPagination";
import { CustomPager, CustomNextPage, CustomPreviousPage } from "./CustomPager";
import {getSearchPage, storeSearchPage} from "../utils";

@observer
export default class CustomGriddle extends Component {

    constructor(props, context) {
        super(props, context);
        this.griddleName = props.dataStore.restUrl;
        const filters = this.getFilters(getSearchPage(this.griddleName));
        this.state = {
            filters: filters
        };
        this.getInitialSearch(filters);
         
    }


    getInitialSearch(filters) {
        if (JSON.stringify(filters) === JSON.stringify({})) {
            this.props.dataStore.search({}, this.getOffset(getSearchPage(this.griddleName)), this.getSize(getSearchPage(this.griddleName)));
        } else {
            this.props.dataStore.search(filters, this.getOffset(getSearchPage(this.griddleName)), this.getSize(getSearchPage(this.griddleName)));
        }
    }

    getFilters(searchPageState) {
        const defaultVal = (this.state && this.state.filters) || {};
        return (searchPageState.filters) ? searchPageState.filters : defaultVal;
    }

    getOffset(searchPageState) {
        return (searchPageState.offset) ? searchPageState.offset : this.props.dataStore.offset;
    }

    getSize(searchPageState) {
        return (searchPageState.size) ? searchPageState.size : this.props.dataStore.size;
    }

    render() {
        const { dataStore, customfilter: CustomFilter } = this.props;
        const searchPageState = getSearchPage(this.griddleName);
        const { list, count } = dataStore;
        const offset = this.getOffset(searchPageState);
        const size = this.getSize(searchPageState);
        const page = offset / size + 1;
        const griddleData = list || [];

        const styleConfig = {
            icons: {
                TableHeadingCell: {
                    sortDescendingIcon: <small>(desc)</small>,
                    sortAscendingIcon: <small>(asc)</small>
                }
            },
            classNames: {
                Cell: "",
                Filter: "",
                Loading: "",
                NextButton: "btn btn-default",
                NoResults: "",
                PageDropdown: "t",
                Pagination: "",
                PreviousButton: "btn btn-default",
                Row: "",
                RowDefinition: "",
                Settings: "",
                SettingsToggle: "",
                Table: "table table-striped table-no-border",
                TableBody: "",
                TableHeading: "",
                TableHeadingCell: "",
                TableHeadingCellAscending: "",
                TableHeadingCellDescending: ""
            },
            styles: {
                Filter: { fontSize: 18 }
                // Table: { border: "0px solid #555 "},
            }
        };

        return (
            <Griddle
                styleConfig={styleConfig}
                data={griddleData}
                pageProperties={{
                    currentPage: page,
                    pageSize: size,
                    recordCount: count
                }}
                events={{
                    onFilter: this._onFilter,
                    onNext: this._onNext,
                    onPrevious: this._onPrevious,
                    onGetPage: this._onGetPage
                }}
                components={{
                    Filter: () => (
                        <div
                            className="float-top col-xs-12 col-sm-8 col-sm-offset-4 col-md-9 col-md-offset-3 col-lg-10 col-lg-offset-2">
                            <CustomFilter
                                setFilter={filterObject =>
                                    this._onFilter(filterObject)
                                }
                                filters={this.getFilters(getSearchPage(this.griddleName))}
                            />
                        </div>
                    ),
                    SettingsToggle: () => null,
                    NoResults: () => (
                        <div className="no-results">Ei tuloksia</div>
                    ),
                    PageDropdown: CustomPager,
                    Pagination: CustomPagination,
                    PreviousButton: CustomPreviousPage,
                    NextButton: CustomNextPage
                }}
            >
                {this.props.children}
            </Griddle>
        );
    }

    _onFilter = newFilters => {
        let updatedFilters = {};
        newFilters.forEach(newFilter =>
            Object.assign(updatedFilters, newFilter)
        );

        this.setState({
            filters: Object.assign(this.state.filters, updatedFilters)
        });

        storeSearchPage({
            page: this.griddleName, filters: this.state.filters,
            offset: 0, size: this.props.dataStore.size
        });

        this.props.dataStore.search(this.getFilters(getSearchPage(this.griddleName)), 0);
    };

    _onNext = () => {
        const { offset, size } = this.props.dataStore;
        const newOffset = offset + size;

        storeSearchPage({page: this.griddleName, filters: this.state.filters, offset: newOffset, size: size});

        this.props.dataStore.search(this.state.filters, newOffset, size);
    };

    _onPrevious = () => {
        const { offset, size } = this.props.dataStore;
        const newOffset = offset - size;

        storeSearchPage({page: this.griddleName, filters: this.state.filters, offset: newOffset, size: size});

        this.props.dataStore.search(this.state.filters, newOffset, size);
    };

    _onGetPage = pageNumber => {
        const { size } = this.props.dataStore;
        const newOffset = (pageNumber - 1) * size;

        storeSearchPage({page: this.griddleName, filters: this.state.filters, offset: newOffset, size: size});
        this.props.dataStore.search(this.state.filters, newOffset, size);
    };
}
