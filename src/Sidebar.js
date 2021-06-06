import React from "react";
import { Link } from "react-router";
import { fullURL } from "./App";
import { Collapse } from "react-collapse";

export class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tietoarkkitehtuuri: {
                isOpen: props.tietoarkkitehtuuri && props.tietoarkkitehtuuri.isOpen || false
            },
            palvelukatalogi: {
                isOpen: props.palvelukatalogi && props.palvelukatalogi.isOpen || false
            },
            yhteystiedot: {
                isOpen: props.yhteystiedot && props.yhteystiedot.isOpen || false
            }
        };
    }
    render() {
        const { tietoarkkitehtuuri, palvelukatalogi, yhteystiedot } = this.state;
        return (
            <ul className="nav nav-pills">

                <li className="nav-item" key={"sanastolista"}>
                    <Link
                        to={fullURL("sanastolista")}
                        className="nav-link"
                        activeClassName="active"
                    >
                        Sanasto
                    </Link>
                </li>

                <li className={"nav-item "} key={"tietoarkkitehtuuri"}>
                    <Link
                        to={fullURL("tietoarkkitehtuuri")}
                        activeClassName="active"
                    >
                        Tietoarkkitehtuuri
                        <span>
                            <i
                                className={
                                    "sidebar-arrow fa fa-lg fa-angle-" +
                                    (tietoarkkitehtuuri.isOpen ? "up" : "down")
                                }
                                onClick={() => {
                                    this.setState({
                                        tietoarkkitehtuuri: {isOpen: !tietoarkkitehtuuri.isOpen }
                                    });
                                }}
                            />
                        </span>
                    </Link>

                    <Collapse isOpened={tietoarkkitehtuuri.isOpen}>
                        <ul className="nav nav-pills nav-level-2">
                            <li className="nav-item" key={"tietovarannot"}>
                                <Link
                                    to={fullURL("tietovarannot")}
                                    className="nav-link"
                                    activeClassName="active"
                                >
                                    Tietovarannot
                                </Link>
                            </li>
                            <li className="nav-item" key={"paatietoryhmat"}>
                                <Link
                                    to={fullURL("paatietoryhmat")}
                                    className="nav-link"
                                    activeClassName="active"
                                >
                                    Päätietoryhmät
                                </Link>
                            </li>
                            <li className="nav-item" key={"tietoryhmat"}>
                                <Link
                                    to={fullURL("tietoryhmat")}
                                    className="nav-link"
                                    activeClassName="active"
                                >
                                    Tietoryhmät
                                </Link>
                            </li>
                            <li
                                className="nav-item nav-level-3"
                                key={"tietolajit"}
                            >
                                <Link
                                    to={fullURL("tietolajit")}
                                    className="nav-link"
                                    activeClassName="active"
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
                                >
                                    Fyysinen tietovaranto
                                </Link>
                            </li>
                        </ul>
                    </Collapse>
                </li>

                <li className="nav-item" key={"jarjestelmasalkku"}>
                    <Link
                        to={fullURL("jarjestelmasalkku")}
                        className="nav-link"
                        activeClassName="active"
                    >
                        Järjestelmäsalkku
                    </Link>
                </li>
                <li className="nav-item" key={"sovellussalkku"}>
                    <Link
                        to={fullURL("sovellussalkku")}
                        className="nav-link"
                        activeClassName="active"
                    >
                        Sovellussalkku
                    </Link>
                </li>
                <li className="nav-item" key={"palvelukatalogi"}>
                    <Link
                        to={fullURL("palvelukatalogi")}
                        activeClassName="active"
                    >
                        Palvelukatalogi
                        <span>
                            <i
                                className={
                                    "sidebar-arrow fa fa-lg fa-angle-" +
                                    (palvelukatalogi.isOpen ? "up" : "down")
                                }
                                onClick={() => {
                                    this.setState({
                                        palvelukatalogi: {isOpen: !palvelukatalogi.isOpen }
                                    });
                                }}
                            />
                        </span>
                    </Link>

                    <Collapse isOpened={palvelukatalogi.isOpen} >
                        <ul className="nav nav-pills nav-level-2">
                            <li className="nav-item" key={"tietojarjestelmapalvelut"}>
                                <Link
                                    to={fullURL("tietojarjestelmapalvelut")}
                                    className="nav-link"
                                    activeClassName="active"
                                >
                                    Tietojärjestelmäpalvelut
                                </Link>
                            </li>
                        </ul>
                    </Collapse>
                </li>

                <li className="nav-item" key={"tieto-omaisuuslista"}>
                    <Link
                        to={fullURL("tieto-omaisuuslista")}
                        className="nav-link"
                        activeClassName="active"
                    >
                        Tieto-omaisuus
                    </Link>
                </li>
                <li className="nav-item" key={"toimintaprosessit"}>
                    <Link
                        to={fullURL("toimintaprosessit")}
                        className="nav-link"
                        activeClassName="active"
                    >
                        Toimintaprosessit
                    </Link>
                </li>





                <li className="nav-item" key={"yhteystiedot"}>
                    <Link
                        to={fullURL("yhteystiedot")}
                        activeClassName="active"
                    >
                        Yhteystiedot
                        <span>
                            <i
                                className={
                                    "sidebar-arrow fa fa-lg fa-angle-" +
                                    (yhteystiedot.isOpen ? "up" : "down")
                                }
                                onClick={() => {
                                    this.setState({
                                        yhteystiedot: {isOpen: !yhteystiedot.isOpen }
                                    });
                                }}
                            />
                        </span>
                    </Link>

                    <Collapse isOpened={yhteystiedot.isOpen} >
                        <ul className="nav nav-pills nav-level-2">
                            <li className="nav-item" key={"organisaatiot"}>
                                <Link
                                    to={fullURL("organisaatiot")}
                                    className="nav-link"
                                    activeClassName="active"
                                >
                                    Organisaatiot
                                </Link>
                            </li>
                            <li className="nav-item" key={"tietosuojavastaavat"}>
                                <Link
                                    to={fullURL("tietosuojavastaavat")}
                                    className="nav-link"
                                    activeClassName="active"
                                >
                                    Tietosuojavastaavat
                                </Link>
                            </li>
                        </ul>
                    </Collapse>
                </li>

                <li className="nav-item" key={"api"}>
                    <Link
                        to={fullURL("api")}
                        className="nav-link"
                        activeClassName="active"
                    >
                        API
                    </Link>
                </li>
            </ul>
        );
    }
}
