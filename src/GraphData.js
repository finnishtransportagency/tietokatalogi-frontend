// http://raphaeljs.com/icons/#fullcube
import {Categories} from "./utils";

const iconData = {
    book:
        "M25.754,4.626c-0.233-0.161-0.536-0.198-0.802-0.097L12.16,9.409c-0.557,0.213-1.253,0.316-1.968,0.316c-0.997,0.002-2.029-0.202-2.747-0.48C7.188,9.148,6.972,9.04,6.821,8.943c0.056-0.024,0.12-0.05,0.193-0.075L18.648,4.43l1.733,0.654V3.172c0-0.284-0.14-0.554-0.374-0.714c-0.233-0.161-0.538-0.198-0.802-0.097L6.414,7.241c-0.395,0.142-0.732,0.312-1.02,0.564C5.111,8.049,4.868,8.45,4.872,8.896c0,0.012,0.004,0.031,0.004,0.031v17.186c0,0.008-0.003,0.015-0.003,0.021c0,0.006,0.003,0.01,0.003,0.016v0.017h0.002c0.028,0.601,0.371,0.983,0.699,1.255c1.034,0.803,2.769,1.252,4.614,1.274c0.874,0,1.761-0.116,2.583-0.427l12.796-4.881c0.337-0.128,0.558-0.448,0.558-0.809V5.341C26.128,5.057,25.988,4.787,25.754,4.626zM5.672,11.736c0.035,0.086,0.064,0.176,0.069,0.273l0.004,0.054c0.016,0.264,0.13,0.406,0.363,0.611c0.783,0.626,2.382,1.08,4.083,1.093c0.669,0,1.326-0.083,1.931-0.264v1.791c-0.647,0.143-1.301,0.206-1.942,0.206c-1.674-0.026-3.266-0.353-4.509-1.053V11.736zM10.181,24.588c-1.674-0.028-3.266-0.354-4.508-1.055v-2.712c0.035,0.086,0.065,0.176,0.07,0.275l0.002,0.053c0.018,0.267,0.13,0.408,0.364,0.613c0.783,0.625,2.381,1.079,4.083,1.091c0.67,0,1.327-0.082,1.932-0.262v1.789C11.476,24.525,10.821,24.588,10.181,24.588z",
    books:
        "M26.679,7.858c-0.176-0.138-0.404-0.17-0.606-0.083l-9.66,4.183c-0.42,0.183-0.946,0.271-1.486,0.271c-0.753,0.002-1.532-0.173-2.075-0.412c-0.194-0.083-0.356-0.176-0.471-0.259c0.042-0.021,0.09-0.042,0.146-0.064l8.786-3.804l1.31,0.561V6.612c0-0.244-0.106-0.475-0.283-0.612c-0.176-0.138-0.406-0.17-0.605-0.083l-9.66,4.183c-0.298,0.121-0.554,0.268-0.771,0.483c-0.213,0.208-0.397,0.552-0.394,0.934c0,0.01,0.003,0.027,0.003,0.027v14.73c0,0.006-0.002,0.012-0.002,0.019c0,0.005,0.002,0.007,0.002,0.012v0.015h0.002c0.021,0.515,0.28,0.843,0.528,1.075c0.781,0.688,2.091,1.073,3.484,1.093c0.66,0,1.33-0.1,1.951-0.366l9.662-4.184c0.255-0.109,0.422-0.383,0.422-0.692V8.471C26.961,8.227,26.855,7.996,26.679,7.858zM20.553,5.058c-0.017-0.221-0.108-0.429-0.271-0.556c-0.176-0.138-0.404-0.17-0.606-0.083l-9.66,4.183C9.596,8.784,9.069,8.873,8.53,8.873C7.777,8.874,6.998,8.699,6.455,8.46C6.262,8.378,6.099,8.285,5.984,8.202C6.026,8.181,6.075,8.16,6.13,8.138l8.787-3.804l1.309,0.561V3.256c0-0.244-0.106-0.475-0.283-0.612c-0.176-0.138-0.407-0.17-0.606-0.083l-9.66,4.183C5.379,6.864,5.124,7.011,4.907,7.227C4.693,7.435,4.51,7.779,4.513,8.161c0,0.011,0.003,0.027,0.003,0.027v14.73c0,0.006-0.001,0.013-0.001,0.019c0,0.005,0.001,0.007,0.001,0.012v0.016h0.002c0.021,0.515,0.28,0.843,0.528,1.075c0.781,0.688,2.091,1.072,3.485,1.092c0.376,0,0.754-0.045,1.126-0.122V11.544c-0.01-0.7,0.27-1.372,0.762-1.856c0.319-0.315,0.708-0.564,1.19-0.756L20.553,5.058z",
    database:
        "M15.499,23.438c-3.846,0-7.708-0.987-9.534-3.117c-0.054,0.236-0.09,0.48-0.09,0.737v3.877c0,3.435,4.988,4.998,9.625,4.998s9.625-1.563,9.625-4.998v-3.877c0-0.258-0.036-0.501-0.09-0.737C23.209,22.451,19.347,23.438,15.499,23.438zM15.499,15.943c-3.846,0-7.708-0.987-9.533-3.117c-0.054,0.236-0.091,0.479-0.091,0.736v3.877c0,3.435,4.988,4.998,9.625,4.998s9.625-1.563,9.625-4.998v-3.877c0-0.257-0.036-0.501-0.09-0.737C23.209,14.956,19.347,15.943,15.499,15.943zM15.5,1.066c-4.637,0-9.625,1.565-9.625,5.001v3.876c0,3.435,4.988,4.998,9.625,4.998s9.625-1.563,9.625-4.998V6.067C25.125,2.632,20.137,1.066,15.5,1.066zM15.5,9.066c-4.211,0-7.625-1.343-7.625-3c0-1.656,3.414-3,7.625-3s7.625,1.344,7.625,3C23.125,7.724,19.711,9.066,15.5,9.066z",
    box:
        "M15.5,3.029l-10.8,6.235L4.7,21.735L15.5,27.971l10.8-6.235V9.265L15.5,3.029zM15.5,7.029l6.327,3.652L15.5,14.334l-6.326-3.652L15.5,7.029zM24.988,10.599L16,15.789v10.378c0,0.275-0.225,0.5-0.5,0.5s-0.5-0.225-0.5-0.5V15.786l-8.987-5.188c-0.239-0.138-0.321-0.444-0.183-0.683c0.138-0.238,0.444-0.321,0.683-0.183l8.988,5.189l8.988-5.189c0.238-0.138,0.545-0.055,0.684,0.184C25.309,10.155,25.227,10.461,24.988,10.599z"
};

const blue = "#6baed6";
const green = "#74c476";
const orange = "#fdae6b";
const red = "#e6550d";
const yellow = "#fff200";
const purple = "#800080";

const icons = {
    paatietoryhma: {
        label: "Päätietoryhmä",
        path: iconData.book,
        fill: red
    },
    tietoryhma: {
        label: "Tietoryhmä",
        path: iconData.books,
        fill: orange
    },
    looginen: {
        label: "Looginen tietovaranto",
        path: iconData.database,
        fill: green
    },
    fyysinen: {
        label: "Fyysinen tietovaranto",
        path: iconData.box,
        fill: blue
    },
    jarjestelma: {
        label: "Tietojärjestelmäsalkku",
        path: iconData.book,
        fill: red
    },
    sovellus: {
        label: "Sovellus",
        path: iconData.book,
        fill: yellow
    },
    tietolaji: {
        label: "Tietolaji",
        path: iconData.database,
        fill: purple
    },
    tietovaranto: {
        label: "Tietovaranto",
        path: iconData.box,
        fill: yellow
    },
    toimintaprosessi: {
        label: "Toimintaprosessi",
        path: iconData.books,
        fill: blue
    },
    sanasto: {
        label: "Sanasto",
        path: iconData.box,
        fill: red
    }
};

function getIconList(Category) {
    const tietoarkkitehtuuri = [
        icons.paatietoryhma,
        icons.tietoryhma,
        icons.tietolaji,
        icons.looginen,
        icons.fyysinen
    ];

    const jarjestelma = [icons.jarjestelma];
    const sovellus = [icons.sovellus];

    const toimintaprosessi = [
        icons.toimintaprosessi,
        icons.tietovaranto,
        icons.tietoryhma,
        icons.jarjestelma
    ];

    const tietovaranto = [
        icons.tietovaranto,
        icons.tietoryhma,
        icons.jarjestelma
    ];

    const sanasto = [
        icons.sanasto,
    ]

    switch (Category) {
        case Categories.TIETOARKKITEHTUURI:
            return tietoarkkitehtuuri;
        case Categories.JARJESTELMASALKKU:
        case Categories.TIETOJARJESTELMAPALVELU:
            return jarjestelma.concat(sovellus);
        case Categories.PALVELUKATALOGI:
            return null;
        case Categories.SOVELLUSSALKKU:
            return sovellus.concat(jarjestelma);
        case Categories.TOIMINTAPROSESSI:
            return toimintaprosessi;
        case Categories.TIETOVARANTO:
            return tietovaranto;
        case Categories.TERMILOMAKE:
            return sanasto;
        default:
            return null;
    }
}

const testData = {
    nodes: [
        {
            code: 4,
            name: "Digiroad",
            content: "fyysinen"
        },
        {
            code: 163,
            name: "Tie- ja katuverkko tietovaranto",
            content: "looginen"
        },
        {
            code: 103,
            name: "IBNet",
            content: "fyysinen"
        },
        {
            code: 196,
            name: "Jäänmurron suunnittelu",
            content: "looginen"
        },
        {
            code: 118,
            name: "Katiska",
            content: "fyysinen"
        },
        {
            code: 295,
            name: "Merikartta-aineistot",
            content: "looginen"
        },
        {
            code: 7,
            name: "Kurre",
            content: "fyysinen"
        },
        {
            code: 316,
            name: "Kuntotietorekisteri (Kurre)",
            content: "looginen"
        },
        {
            code: 73,
            name: "Kuvatietovarasto",
            content: "fyysinen"
        },
        {
            code: 214,
            name: "Kuvatieto",
            content: "looginen"
        },
        {
            code: 49,
            name: "LAM",
            content: "fyysinen"
        },
        {
            code: 328,
            name: "LAM",
            content: "looginen"
        },
        {
            code: 115,
            name: "Locknet",
            content: "fyysinen"
        },
        {
            code: 292,
            name: "Kanavat",
            content: "looginen"
        },
        {
            code: 79,
            name: "MKL-yhteystietovarasto",
            content: "fyysinen"
        },
        {
            code: 220,
            name: "Yhteystiedot",
            content: "looginen"
        },
        {
            code: 100,
            name: "Merikartoituksen rekisterit",
            content: "fyysinen"
        },
        {
            code: 190,
            name: "Merikartoituksen perustiedot",
            content: "looginen"
        },
        {
            code: 121,
            name: "Meriliikenteen tilastotietokanta",
            content: "fyysinen"
        },
        {
            code: 268,
            name: "Meriliikennetilastot",
            content: "looginen"
        },
        {
            code: 16,
            name: "Newis",
            content: "fyysinen"
        },
        {
            code: 169,
            name: "Olosuhdetiedot",
            content: "looginen"
        },
        {
            code: 378,
            name: "Onnettomuus",
            content: "tietoryhma"
        },
        {
            code: 151,
            name: "Liikennetiedot",
            content: "paatietoryhma"
        },
        {
            code: 313,
            name: "onnettomuusteema",
            content: "looginen"
        },
        {
            code: 97,
            name: "PDF-dokumentit",
            content: "fyysinen"
        },
        {
            code: 187,
            name: "Väyläkortit",
            content: "looginen"
        },
        {
            code: 106,
            name: "PV-tietokannat",
            content: "fyysinen"
        },
        {
            code: 202,
            name: "Meriliikenteen tilannekuva (alusten sijainti ja liike)",
            content: "looginen"
        },
        {
            code: 1,
            name: "Paikkatietokanta (ESRI SDE)",
            content: "fyysinen"
        },
        {
            code: 160,
            name: "Tiestön paikkatiedot",
            content: "looginen"
        },
        {
            code: 124,
            name: "PortNet",
            content: "fyysinen"
        },
        {
            code: 238,
            name: "Aluksen turvataso",
            content: "looginen"
        },
        {
            code: 262,
            name: "Aluskäynti",
            content: "looginen"
        },
        {
            code: 199,
            name: "Ennakkoilmoitukset laivakäynneistä",
            content: "looginen"
        },
        {
            code: 304,
            name: "Satamakäyntien tiedot",
            content: "looginen"
        },
        {
            code: 31,
            name: "Primar",
            content: "fyysinen"
        },
        {
            code: 247,
            name: "ENC-aineistot",
            content: "looginen"
        },
        {
            code: 70,
            name: "Raisu",
            content: "fyysinen"
        },
        {
            code: 319,
            name: "Raisu",
            content: "looginen"
        },
        {
            code: 109,
            name: "Ratapurkki",
            content: "fyysinen"
        },
        {
            code: 157,
            name: "Ratapurkki",
            content: "looginen"
        },
        {
            code: 43,
            name: "Ratarekisteri",
            content: "fyysinen"
        },
        {
            code: 322,
            name: "Ratarekisteri",
            content: "looginen"
        },
        {
            code: 88,
            name: "Reimari",
            content: "fyysinen"
        },
        {
            code: 241,
            name: "Turvalaitteiden tapahtumat",
            content: "looginen"
        },
        {
            code: 10,
            name: "SHIP alusrekisteri",
            content: "fyysinen"
        },
        {
            code: 166,
            name: "Alusten staattiset ominaisuustiedot",
            content: "looginen"
        },
        {
            code: 28,
            name: "Sabik",
            content: "fyysinen"
        },
        {
            code: 244,
            name: "Kaukovalvontalaitteet",
            content: "looginen"
        },
        {
            code: 46,
            name: "Siltarekisteri",
            content: "fyysinen"
        },
        {
            code: 325,
            name: "Siltatiedot",
            content: "looginen"
        },
        {
            code: 40,
            name: "Tierekisteri",
            content: "fyysinen"
        },
        {
            code: 205,
            name: "Kuntoteema",
            content: "looginen"
        },
        {
            code: 265,
            name: "Tiestöteema",
            content: "looginen"
        },
        {
            code: 310,
            name: "Varusteteema",
            content: "looginen"
        },
        {
            code: 52,
            name: "Tiira koontikanta",
            content: "fyysinen"
        },
        {
            code: 331,
            name: "Tiira, koontikanta ja tietopalvelut",
            content: "looginen"
        },
        {
            code: 25,
            name: "Turvalaiterekisteri (VATU)",
            content: "fyysinen"
        },
        {
            code: 181,
            name: "Turvalaitteet",
            content: "looginen"
        },
        {
            code: 58,
            name: "VTS-järjestelmä",
            content: "fyysinen"
        },
        {
            code: 274,
            name: "Sijainti ja liiketila",
            content: "looginen"
        },
        {
            code: 369,
            name: "Varusteet",
            content: "tietoryhma"
        },
        {
            code: 145,
            name: "Väyläomaisuus",
            content: "paatietoryhma"
        },
        {
            code: 13,
            name: "Väylärekisteri (VÄRE)",
            content: "fyysinen"
        },
        {
            code: 289,
            name: "Väylätiedot",
            content: "looginen"
        },
        {
            code: 375,
            name: "Väylätieto",
            content: "tietoryhma"
        },
        {
            code: 55,
            name: "Reittitietokanta",
            content: "fyysinen"
        },
        {
            code: 271,
            name: "Alusliikenteen reittitiedot",
            content: "looginen"
        }
    ],
    links: [
        { source: 1, target: 0 },
        { source: 0, target: 1 },
        { source: 2, target: 3 },
        { source: 4, target: 5 },
        { source: 6, target: 7 },
        { source: 8, target: 9 },
        { source: 10, target: 11 },
        { source: 12, target: 13 },
        { source: 14, target: 15 },
        { source: 16, target: 17 },
        { source: 18, target: 19 },
        { source: 20, target: 21 },
        { source: 22, target: 23 },
        { source: 22, target: 24 },
        { source: 25, target: 26 },
        { source: 27, target: 28 },
        { source: 29, target: 30 },
        { source: 31, target: 32 },
        { source: 31, target: 33 },
        { source: 31, target: 34 },
        { source: 31, target: 35 },
        { source: 36, target: 37 },
        { source: 38, target: 39 },
        { source: 40, target: 41 },
        { source: 42, target: 43 },
        { source: 44, target: 45 },
        { source: 46, target: 47 },
        { source: 48, target: 49 },
        { source: 50, target: 51 },
        { source: 52, target: 53 },
        { source: 52, target: 24 },
        { source: 52, target: 54 },
        { source: 52, target: 55 },
        { source: 56, target: 57 },
        { source: 58, target: 59 },
        { source: 60, target: 61 },
        { source: 62, target: 63 },
        { source: 62, target: 55 },
        { source: 64, target: 65 },
        { source: 66, target: 63 },
        { source: 66, target: 53 },
        { source: 66, target: 54 },
        { source: 67, target: 68 }
    ]
};

export { icons, getIconList, testData };
