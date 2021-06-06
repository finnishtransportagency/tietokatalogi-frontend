import React from "react";
import classnames from "classnames";

/* eslint indent : ["error", 4, { "ignoredNodes": ["ReturnStatement *"] }] */
export class CustomPager extends React.Component {

    _pageChangeHandler;

    constructor(props) {
        super(props);
        this._pageChangeHandler = (event) => {
            this.props.setPage(parseInt(event.currentTarget.getAttribute("data-value"), 10));
        };
    }

    render() {
        const {currentPage, maxPages} = this.props;
        const options = [];
        const startIndex = Math.max(currentPage - 5, 0);
        const endIndex = Math.min(currentPage + 5 , maxPages);

        if (currentPage > 1) {
            options.push(
                <button key={"first"} data-value={1} className={"btn btn-default"} onClick={this._pageChangeHandler}>
                    <i className="fa fa-angle-double-left"></i>
                </button>);
        }

        for(let i = startIndex; i < endIndex ; i++) {
            const selected = classnames({
                "btn": true,
                "btn-primary" : currentPage === i + 1,
                "btn-default" : currentPage !== i + 1
            });
            options.push(<button key={i} data-value={parseInt(i + 1, 10)} className={selected} onClick={this._pageChangeHandler}>{i + 1}</button>);
        }

        if (currentPage < maxPages) {
            options.push(
                <button key={"last"} data-value={maxPages} className={"btn btn-default"} onClick={this._pageChangeHandler}>
                    <i className="fa fa-angle-double-right"></i>
                </button>);
        }
        return <div className="btn-group">{options}</div>;
    }
}

export class CustomPreviousPage extends React.Component {
    render() {
        return this.props.hasPrevious ? (
                <button className="btn btn-default" onClick={this.props.onClick}>
                    <i className="fa fa-chevron-left"></i>
                </button>
            ) : null;
    }
}

export class CustomNextPage extends React.Component {
    render() {
        return this.props.hasNext ? (
                <button className="btn btn-default" onClick={this.props.onClick}>
                    <i className="fa fa-chevron-right"></i>
                </button>
            ) : null;
    }
}
