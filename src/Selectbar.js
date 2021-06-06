import React from "react";
import { Link } from "react-router";
import { Collapse } from "react-collapse";
import { fullURL } from "./App";
import PhoneLogo from "./styles/images/logo_transparent.svg";

export class Selectbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selected: "Päätietoryhmät"
        };
    }
    render() {
        const { selected, isOpen } = this.state;
        return (
            <ul className="nav nav-pills">
                <li className={"nav-item"} key={"tietoarkkitehtuuri"}>
                    <a
                        className={"nav-header " + (isOpen ? "active" : "")}
                        onClick={() => {
                            this.setState({ isOpen: !isOpen });
                        }}
                    >
                        <span>
                            <PhoneLogo id="phoneLogo" />
                        </span>
                        {selected}
                        <span>
                            <i
                                className={
                                    "sidebar-arrow fa fa-lg fa-angle-" +
                                    (isOpen ? "up" : "down")
                                }
                            />
                        </span>
                    </a>

                    <Collapse isOpened={isOpen}>
                        <ul className="nav nav-pills">
                            <li className="nav-item" key={"sanastolista"}>
                                <Link
                                    to={fullURL("sanastolista")}
                                    className="nav-link"
                                    activeClassName="active"
                                    onClick={() => {
                                        this.setState({
                                            isOpen: false,
                                            selected: "Termilomake"
                                        });
                                    }}
                                >
                                    Sanasto
                                </Link>
                            </li>
                            <li className="nav-item" key={"tietoarkkitehtuuri"}>
                                <Link
                                    to={fullURL("tietoarkkitehtuuri")}
                                    className="nav-link"
                                    activeClassName="active"
                                    onClick={() => {
                                        this.setState({
                                            isOpen: false,
                                            selected: "Tietoarkkitehtuuri"
                                        });
                                    }}
                                >
                                    Tietoarkkitehtuuri
                                </Link>
                            </li>
                            <li className="nav-item" key={"paatietoryhmat"}>
                                <Link
                                    to={fullURL("paatietoryhmat")}
                                    className="nav-link"
                                    activeClassName="active"
                                    onClick={() => {
                                        this.setState({
                                            isOpen: false,
                                            selected: "Päätietoryhmät"
                                        });
                                    }}
                                >
                                    Päätietoryhmät
                                </Link>
                            </li>
                            <li className="nav-item" key={"tietoryhmat"}>
                                <Link
                                    to={fullURL("tietoryhmat")}
                                    className="nav-link"
                                    activeClassName="active"
                                    onClick={() => {
                                        this.setState({
                                            isOpen: false,
                                            selected: "Tietoryhmät"
                                        });
                                    }}
                                >
                                    Tietoryhmat
                                </Link>
                            </li>
                            <li className="nav-item" key={"tietolajit"}>
                                <Link
                                    to={fullURL("tietolajit")}
                                    className="nav-link"
                                    activeClassName="active"
                                    onClick={() => {
                                        this.setState({
                                            isOpen: false,
                                            selected: "Tietolajit"
                                        });
                                    }}
                                >
                                    Tietolajit
                                </Link>
                            </li>
                            <li
                                className="nav-item"
                                key={"looginentietovaranto"}
                            >
                                <Link
                                    to={fullURL("looginentietovaranto")}
                                    className="nav-link"
                                    activeClassName="active"
                                    onClick={() => {
                                        this.setState({
                                            isOpen: false,
                                            selected: "Looginen tietovaranto"
                                        });
                                    }}
                                >
                                    Looginen tietovaranto
                                </Link>
                            </li>
                            <li
                                className="nav-item"
                                key={"fyysinentietovaranto"}
                            >
                                <Link
                                    to={fullURL("fyysinentietovaranto")}
                                    className="nav-link"
                                    activeClassName="active"
                                    onClick={() => {
                                        this.setState({
                                            isOpen: false,
                                            selected: "Fyysinen tietovaranto"
                                        });
                                    }}
                                >
                                    Fyysinen tietovaranto
                                </Link>
                            </li>
                            <li className="nav-item" key={"jarjestelmasalkku"}>
                                <Link
                                    to={fullURL("jarjestelmasalkku")}
                                    className="nav-link"
                                    activeClassName="active"
                                    onClick={() => {
                                        this.setState({
                                            isOpen: false,
                                            selected: "Järjestelmäsalkku"
                                        });
                                    }}
                                >
                                    Järjestelmäsalkku
                                </Link>
                            </li>
                            {/* <li className="nav-item" key={"sovellussalkku"}>
                                <Link
                                    to={fullURL("sovellussalkku")}
                                    className="nav-link"
                                    activeClassName="active"
                                    onClick={() => {
                                        this.setState({
                                            isOpen: false,
                                            selected: "Sovellussalkku"
                                        });
                                    }}
                                >
                                    Sovellussalkku
                                </Link>
                            </li> */}
                            <li className="nav-item" key={"palvelukatalogi"}>
                                <Link
                                    to={fullURL("palvelukatalogi")}
                                    className="nav-link"
                                    activeClassName="active"
                                    onClick={() => {
                                        this.setState({
                                            isOpen: false,
                                            selected: "Palvelukatalogi"
                                        });
                                    }}
                                >
                                    Palvelukatalogi
                                </Link>
                            </li>
                            <li className="nav-item" key={"toimintaprosessit"}>
                                <Link
                                    to={fullURL("toimintaprosessit")}
                                    className="nav-link"
                                    activeClassName="active"
                                    onClick={() => {
                                        this.setState({
                                            isOpen: false,
                                            selected: "Toimintaprosessit"
                                        });
                                    }}
                                >
                                    Toimintaprosessit
                                </Link>
                            </li>
                            <li className="nav-item" key={"yhteystiedot"}>
                                <Link
                                    to={fullURL("yhteystiedot")}
                                    className="nav-link"
                                    activeClassName="active"
                                    onClick={() => {
                                        this.setState({
                                            isOpen: false,
                                            selected: "Yhteystiedot"
                                        });
                                    }}
                                >
                                    Yhteystiedot
                                </Link>
                            </li>
                        </ul>
                    </Collapse>
                </li>
            </ul>
        );
    }
}
