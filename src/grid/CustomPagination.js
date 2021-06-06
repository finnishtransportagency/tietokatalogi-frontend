import React from "react";

export class CustomPagination extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-8 col-md-9 col-lg-10 float-bottom griddle-paginator">
                    <div>
                        <this.props.Previous/>
                        <this.props.PageDropdown/>
                        <this.props.Next/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomPagination;