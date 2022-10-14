import React from "react";
import { Collapse } from "react-collapse";
import { parseJSON, format} from "date-fns";

const ModifiedInformationText = ({ createdDate, modifiedDate, modifyUser }) => {
  const missingUserText = "tuntematon käyttäjä";
  const dateFormat = "d.M.yyyy HH:mm";
  if (modifiedDate) {
    // eslint-disable-next-line no-unused-vars
    const [modifiedNoMillisecond, __] = modifiedDate.split(".");
    const parsedModifyDate = parseJSON(modifiedNoMillisecond);
    return (
      <p>
        (Viimeisin päivitys: {format(parsedModifyDate, dateFormat)}, {modifyUser || missingUserText})
      </p>
    );
  }
  if (createdDate) {
    // eslint-disable-next-line no-unused-vars
    const [createdNoMillisecond, __] = createdDate.split(".");
    const parsedCreatedDate = parseJSON(createdNoMillisecond);
    return (
      <p>
        (Luotu: {format(parsedCreatedDate, dateFormat)}, {modifyUser || missingUserText})
      </p>
    );
  }
  return null;
};

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
          {
            <ModifiedInformationText
              createdDate={this.props.created}
              modifiedDate={this.props.lastModified}
              modifyUser={this.props.modifyUser}
            />
          }
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
