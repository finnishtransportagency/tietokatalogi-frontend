import React from "react";
import { Collapse } from "react-collapse";

export class CustomCollapse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpened || false,
      isFullyOpen: props.isOpened || false,
    };
  }

  openTimer;

  // In some cases, the open animation doesn't finish and overflow style
  // isn't set to "visible" as intended, so some dropdown menus get
  // partially hidden.
  // For this reason we manually set the style with a delay when opening.
  openWithDelay() {
    this.setState({ isOpen: true });
    this.openTimer = setTimeout(
      () => this.setState({ isFullyOpen: true }),
      1000
    );
  }

  toggle() {
    if (this.props.edit && !this.state.isOpen) {
      return this.openWithDelay();
    }
    this.setState({
      isOpen: !this.state.isOpen,
      isFullyOpen: !this.state.isOpen,
    });
    clearTimeout(this.openTimer);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.edit && !this.state.isOpen && nextProps.isOpened) {
      return this.openWithDelay();
    }
    this.setState({
      isOpen: nextProps.isOpened,
      isFullyOpen: nextProps.isOpened,
    });
    clearTimeout(this.openTimer);
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <i
            className={
              "fa fa-2x fa-angle-" + (this.state.isOpen ? "up" : "down")
            }
            onClick={() => this.toggle()}
          />
          <h4>&nbsp;{this.props.header}</h4>
          {this.props.lastModified && (
            <p>
              &nbsp; (Viimeisin päivitys: {this.props.lastModified},{" "}
              {this.props.modifyUser})
            </p>
          )}
        </div>
        <Collapse
          isOpened={this.state.isOpen}
          // Set overflow manually if needed
          style={
            this.props.edit && this.state.isFullyOpen
              ? { overflow: "visible" }
              : {}
          }
        >
          <div className="panel-body">{this.props.children}</div>
        </Collapse>
      </div>
    );
  }
}
