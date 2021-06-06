import React from "react";

// TODO: refactor other classes to use this version
export default class CustomFilterInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchFilter: props.searchFilter
        };
    }

    render() {
        return (
            <div className="col col-sm-2 filter">
                <input
                    type="text"
                    name="filter"
                    placeholder="Etsi"
                    value={this.state.searchFilter}
                    onChange={(e) => {
                        this.setState({searchFilter: e.target.value});
                    }}
                    onKeyPress={(e) => {
                        const keyCode = e.keyCode || e.which;
                        if (keyCode === 13){
                            this.props.setFilter([{filter: this.state.searchFilter}]);
                        }
                    }}
                    className={this.props.customClassName + " form-control"}
                />
            </div>
        );
    }
    
}
