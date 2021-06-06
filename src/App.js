import React, { Component } from "react";
import { autorun } from "mobx";
import { inject, observer } from "mobx-react";
import urljoin from "url-join";
import Logo from "./styles/images/tietokatalogi_logo.svg";
// import DevTools from "mobx-react-devtools";
import { Sidebar } from "./Sidebar";
import { Selectbar } from "./Selectbar";
import NotificationSystem from "react-notification-system";
import {Link} from "react-router";

@inject("notificationStore")
@observer
class App extends Component {
    _notificationSystem = null;

    constructor(props) {
        super(props);
        autorun(() => {
            const { notificationStore } = this.props;
            notificationStore.notifications.forEach(item => {
                item.onRemove = notification => {
                    notificationStore.remove(notification);
                };
                if (this._notificationSystem != null) {
                    this._notificationSystem.addNotification(item);
                }
            });
        });
    }

    _addNotification(event) {
        event.preventDefault();
        this.props.notificationStore.add("Notification message");
    }

    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
    }

    render(props) {
        // NB: mobx devtools do not work in IE11
        const devtoolsEl = null; //process.env.NODE_ENV === "development" ? <DevTools /> : null;
        return (
            <div className="App">
                {devtoolsEl}
                <NotificationSystem ref="notificationSystem" />
                <div id="maincontainer">
                    <section id="firstrow" className="col-xs-12 col-sm-8 col-sm-offset-4 col-md-9 col-md-offset-3 col-lg-10 col-lg-offset-2">
                    </section>
                    <section id="secondrow" className="row">
                        <div
                            id="menu"
                            className="hidden-xs col-sm-4 col-md-3 col-lg-2"
                        >
                            <Link
                                to={fullURL("/")}
                            >
                                <Logo id="logo" className="column hidden-xs" />
                            </Link>
                            <Sidebar props={props} />
                        </div>
                        <div
                            id="phoneMenu"
                            className="hidden-sm hidden-md hidden-lg col-xs-12"
                        >
                            <Selectbar props={props} />
                        </div>
                        <div
                            id="content"
                            className="col-xs-12 col-sm-8 col-sm-offset-4 col-md-9 col-md-offset-3 col-lg-10 col-lg-offset-2"
                        >
                            <div className="footer-gutter">
                                {this.props.children || null}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default App;

// NB: user with browserhistory
// const BaseURL = process.env.REACT_APP_BASE_URL || "TietokatalogiUI";
const BaseRestURL =
    process.env.REACT_APP_BASE_REST_URL || "tietokatalogi/rest";

export function fullURL(...urls) {
    // NB: user with browserhistory
    // return urljoin(`/${BaseURL}`, ...urls);
    return urljoin(...urls);
}

export function fullRestURL(...urls) {
    return urljoin(`/${BaseRestURL}`, ...urls);
}
