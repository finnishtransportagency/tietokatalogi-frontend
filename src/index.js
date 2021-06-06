import "babel-polyfill";
import "url-search-params-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, Redirect, hashHistory } from "react-router";
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import { Provider } from "mobx-react";

import App from "./App";
import { fullURL } from "./App";
import { ContactsView } from "./views/ContactsView";
import { PalveluKatalogiNakyma } from "./views/PalveluKatalogiNakyma";
import { JarjestelmaSalkkuNakyma } from "./views/JarjestelmaSalkkuNakyma";
import { SovellusSalkkuNakyma } from "./views/SovellusSalkkuNakyma";
import { FyysinenTietovarantoNakyma } from "./views/FyysinenTietovarantoNakyma";
import { LooginenTietovarantoNakyma } from "./views/LooginenTietovarantoNakyma";
import { PaaTietoryhmaNakyma } from "./views/PaaTietoryhmaNakyma";
import { TietoryhmaNakyma } from "./views/TietoryhmaNakyma";
import { TietolajiNakyma } from "./views/TietolajiNakyma";
import { TietoArkkitehtuuriNakyma } from "./views/TietoArkkitehtuuriNakyma";
import { TietojarjestelmapalveluNakyma } from "./views/TietojarjestelmapalveluNakyma";
import { SwaggerNakyma } from "./views/SwaggerNakyma";
import { TietoOmaisuusNakyma } from "./views/TietoOmaisuusNakyma";
import { TietovarantoNakyma } from "./views/TietovarantoNakyma";
import { ToimintaprosessiNakyma } from "./views/ToimintaprosessiNakyma";
import { OrganisaatioNakyma } from "./views/OrganisaatioNakyma";
import { TietosuojavastaavaNakyma } from "./views/TietosuojavastaavaNakyma";
import { TermilomakeNakyma } from "./views/TermilomakeNakyma";

import JarjestelmaSalkku from "./jarjestelmasalkku/JarjestelmaSalkku";
import SovellusSalkku from "./sovellussalkku/SovellusSalkku";
import FyysinenTietovaranto from "./fyysinentietovaranto/FyysinenTietovaranto";
import LooginenTietovaranto from "./looginentietovaranto/LooginenTietovaranto";
import PalveluKatalogi from "./palvelukatalogi/PalveluKatalogi";
import PaaTietoryhma from "./paatietoryhma/PaaTietoryhma";
import Tietoryhma from "./tietoryhma/Tietoryhma";
import Tietolaji from "./tietolaji/Tietolaji";
import Tietojarjestelmapalvelu from "./tietojarjestelmapalvelu/Tietojarjestelmapalvelu";
import TietoOmaisuus from "./tieto-omaisuus/TietoOmaisuus";
import Tietovaranto from "./tietovaranto/Tietovaranto";
import Toimintaprosessi from "./toimintaprosessi/Toimintaprosessi";
import Organisaatio from "./organisaatio/Organisaatio";
import Tietosuojavastaava from "./tietosuojavastaava/Tietosuojavastaava";
import Termilomake from "./termilomake/Termilomake";


import jarjestelmaSalkkuStore from "./stores/JarjestelmaSalkkuStore.js";
import sovellusSalkkuStore from "./stores/SovellusSalkkuStore.js";
import palveluKatalogiStore from "./stores/PalveluKatalogiStore.js";
import fyysinenTietovarantoStore from "./stores/FyysinenTietovarantoStore.js";
import looginenTietovarantoStore from "./stores/LooginenTietovarantoStore.js";
import paaTietoryhmaStore from "./stores/PaaTietoryhmaStore.js";
import tietoryhmaStore from "./stores/TietoryhmaStore.js";
import tietolajiStore from "./stores/TietolajiStore.js";
import tietoarkkitehtuuriStore from "./stores/TietoarkkitehtuuriStore.js";
import notificationStore from "./stores/NotificationStore.js";
import tietojarjestelmapalveluStore from "./stores/TietojarjestelmapalveluStore";
import tietoOmaisuusStore from "./stores/TietoOmaisuusStore";
import tietovarantoStore from "./stores/TietovarantoStore";
import toimintaprosessiStore from "./stores/ToimintaprosessiStore";
import organisaatioStore from "./stores/OrganisaatioStore";
import tietosuojavastaavaStore from "./stores/TietosuojavastaavaStore";
import termilomakeStore from "./stores/TermilomakeStore";

import "./styles/index.scss";
import { MainView } from "./views/MainView";
import Tietoarkkitehtuuri from "./dynamicform/Tietoarkkitehtuuri";

const routingStore = new RouterStore();

const stores = {
    routing: routingStore,
    jarjestelmaSalkkuStore: jarjestelmaSalkkuStore,
    sovellusSalkkuStore: sovellusSalkkuStore,
    palveluKatalogiStore: palveluKatalogiStore,
    fyysinenTietovarantoStore: fyysinenTietovarantoStore,
    looginenTietovarantoStore: looginenTietovarantoStore,
    paaTietoryhmaStore: paaTietoryhmaStore,
    tietoryhmaStore: tietoryhmaStore,
    tietolajiStore: tietolajiStore,
    tietoarkkitehtuuriStore: tietoarkkitehtuuriStore,
    notificationStore: notificationStore,
    tietojarjestelmapalveluStore: tietojarjestelmapalveluStore,
    tietoOmaisuusStore: tietoOmaisuusStore,
    tietovarantoStore: tietovarantoStore,
    toimintaprosessiStore: toimintaprosessiStore,
    organisaatioStore: organisaatioStore,
    tietosuojavastaavaStore: tietosuojavastaavaStore,
    termilomakeStore: termilomakeStore
};
const history = syncHistoryWithStore(hashHistory, routingStore);

if (process.env.NODE_ENV === "development") {
    console.log("Including VorlonJS");
    const script = document.createElement("script");
    script.src = `http://${window.location.hostname}:1337/vorlon.js`;
    script.async = true;
    document.head.appendChild(script);
}

ReactDOM.render(
    <Provider {...stores}>
        <Router history={history}>
            <Route path={"/"} component={App}>
                <IndexRoute component={MainView} />
                <Route
                    path="sanastolista"
                    component={TermilomakeNakyma}
                />
                <Route
                    path="tietoarkkitehtuuri"
                    component={TietoArkkitehtuuriNakyma}
                />
                <Route
                    path="tietoarkkitehtuuriForm"
                    component={Tietoarkkitehtuuri}
                />
                <Route
                    path="fyysinentietovaranto"
                    component={FyysinenTietovarantoNakyma}
                />
                <Route
                    path="looginentietovaranto"
                    component={LooginenTietovarantoNakyma}
                />
                <Route
                    path="jarjestelmasalkku"
                    component={JarjestelmaSalkkuNakyma}
                />
                <Route path="sovellussalkku" component={SovellusSalkkuNakyma} />
                <Route
                    path="palvelukatalogi"
                    component={PalveluKatalogiNakyma}
                />
                <Route path="paatietoryhmat" component={PaaTietoryhmaNakyma} />
                <Route path="tietoryhmat" component={TietoryhmaNakyma} />
                <Route path="tietolajit" component={TietolajiNakyma} />
                <Route path="yhteystiedot" component={ContactsView} />
                <Route path="tieto-omaisuuslista" component={TietoOmaisuusNakyma} />
                <Route path="tietovarannot" component={TietovarantoNakyma} />

                <Route path="sanasto" component={Termilomake}>
                    <IndexRoute component={Termilomake} />
                    <Route path="tunnus/:tunnus" component={Termilomake} />
                </Route>

                <Route path="paatietoryhma" component={PaaTietoryhma}>
                    <IndexRoute component={PaaTietoryhma} />
                    <Route path="tunnus/:tunnus" component={PaaTietoryhma} />
                </Route>

                <Route path="tietoryhma" component={Tietoryhma}>
                    <IndexRoute component={Tietoryhma} />
                    <Route path="tunnus/:tunnus" component={Tietoryhma} />
                </Route>

                <Route path="tietolaji" component={Tietolaji}>
                    <IndexRoute component={Tietolaji} />
                    <Route path="tunnus/:tunnus" component={Tietolaji} />
                </Route>

                <Route path="fyysinen" component={FyysinenTietovaranto}>
                    <IndexRoute component={FyysinenTietovaranto} />
                    <Route
                        path="tunnus/:tunnus"
                        component={FyysinenTietovaranto}
                    />
                </Route>

                <Route path="looginen" component={LooginenTietovaranto}>
                    <IndexRoute component={LooginenTietovaranto} />
                    <Route
                        path="tunnus/:tunnus"
                        component={LooginenTietovaranto}
                    />
                </Route>

                <Route path="jarjestelma" component={JarjestelmaSalkku}>
                    <IndexRoute component={JarjestelmaSalkku} />
                    <Route
                        path="tunnus/:tunnus"
                        component={JarjestelmaSalkku}
                    />
                </Route>

                <Route path="sovellus" component={SovellusSalkku}>
                    <IndexRoute component={SovellusSalkku} />
                    <Route path="tunnus/:tunnus" component={SovellusSalkku} />
                </Route>

                <Route path="palvelu" component={PalveluKatalogi}>
                    <IndexRoute component={PalveluKatalogi} />
                    <Route path="tunnus/:tunnus" component={PalveluKatalogi} />
                </Route>

                <Route path="tietojarjestelmapalvelu" component={Tietojarjestelmapalvelu}>
                    <IndexRoute component={Tietojarjestelmapalvelu} />
                    <Route path="tunnus/:tunnus" component={Tietojarjestelmapalvelu} />
                </Route>

                <Route path="tietojarjestelmapalvelut" component={TietojarjestelmapalveluNakyma}> </Route>

                <Route path="api" component={SwaggerNakyma}> </Route>

                <Route path="tieto-omaisuus" component={TietoOmaisuus}>
                    <IndexRoute component={TietoOmaisuus} />
                    <Route path="tunnus/:tunnus" component={TietoOmaisuus} />
                </Route>

                <Route path="tietovaranto" component={Tietovaranto}>
                    <IndexRoute component={Tietovaranto} />
                    <Route path="tunnus/:tunnus" component={Tietovaranto} />
                </Route>

                <Route path="toimintaprosessit" component={ToimintaprosessiNakyma} />
                <Route path="toimintaprosessi" component={Toimintaprosessi}>
                    <IndexRoute component={Toimintaprosessi} />
                    <Route path="tunnus/:tunnus" component={Toimintaprosessi} />
                </Route>

                <Route path="organisaatiot" component={OrganisaatioNakyma} />
                <Route path="organisaatio" component={Organisaatio}>
                    <IndexRoute component={Organisaatio} />
                    <Route path="tunnus/:tunnus" component={Organisaatio} />
                </Route>

                <Route path="tietosuojavastaavat" component={TietosuojavastaavaNakyma} />
                <Route path="tietosuojavastaava" component={Tietosuojavastaava}>
                    <IndexRoute component={Tietosuojavastaava} />
                    <Route path="tunnus/:tunnus" component={Tietosuojavastaava} />
                </Route>
            </Route>

            <Redirect from="*" to={fullURL()} />
        </Router>
    </Provider>,
    document.getElementById("root")
);
