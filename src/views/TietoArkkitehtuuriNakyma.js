import React from "react";
import {Link} from "react-router";
import {fullURL} from "../App";

const TietoArkkitehtuuriNakyma = () => (
    <div className="form-group row">
        <div className="col-sm-12 col-md-7">
            <h1>Tietoarkkitehtuuri</h1>
            <p>
                Tietokatalogin tietoarkkitehtuuri-osio tulee antamaan vastauksia kysymyksiin mitä tietoa Väylällä on,
                missä
                se sijaitsee ja kuka siitä vastaa. Tiedot kuvataan tietolajitasolla ja tiedot linkitetään toisiinsa,
                joten myös tietojen riippuvuudet saadaan kuvattua.
            </p>
            <p>
                Tietokatalogin tietoarkkitehtuuri-osio mahdollistaa rekisterilistauksien ja niiden tietojen nopean
                saamisen.
            </p>
            <p>
                Tietoarkkitehtuuripuoleen tullaan myös lisäämään tietopalvelukuvaukset. Myös liitokset järjestelmiin
                tullaan
                lisäämään.
            </p>
            <p>
                Tietokatalogi-osiosta tulee myös näkyville automaattiset kuvaukset tietojen riippuvuuksista sekä
                sijoittumisesta
                Väylän päätietoryhmiin.
            </p>
        </div>

        <div className="col-sm-12 col-md-offset-1 col-md-4">
            <Link
                to={fullURL("/tietoarkkitehtuuriform")}
            >
                <button type="button" className="btn btn-primary">
                    Dynaaminen lomake
                </button>
            </Link>
        </div>
    </div>
);

export {TietoArkkitehtuuriNakyma};
