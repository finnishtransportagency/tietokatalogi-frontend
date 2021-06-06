export function lowerWithoutScandics(str = "") {
    str = str || "";
    return str
        .toLowerCase()
        .replace(/ä/g, "a")
        .replace(/ö/g, "ö")
        .replace(/å/g, "a");
}

function removeNulls(value) {
    if (value) {
        for (let k in value) {
            if (value[k] === null) {
                delete value[k];
            } else if (typeof value[k] === "object") {
                removeNulls(value[k]);
            }
        }
    }
}

function storeAppState(key, value) {
    removeNulls(value);
    sessionStorage.setItem(key, JSON.stringify(value));
}

function getAppState(key) {
    return JSON.parse(sessionStorage.getItem(key));
}


export function storeSearchPage(searchPage) {
    const page = searchPage.page;

    storeAppState(`${page}-filters`, searchPage.filters);
    storeAppState(`${page}-offset`, searchPage.offset);
    storeAppState(`${page}-size`, searchPage.size);
}

export function getSearchPage(page) {
    return {
        filters: getAppState(`${page}-filters`),
        offset: getAppState(`${page}-offset`),
        size: getAppState(`${page}-size`)
    };
}

export const Categories = {
    TIETOARKKITEHTUURI: 1,
    JARJESTELMASALKKU: 2,
    SOVELLUSSALKKU: 3,
    PALVELUKATALOGI: 4,
    TIETOJARJESTELMAPALVELU: 5,
    TOIMINTAPROSESSI: 6,
    TIETOVARANTO: 7,
    TERMILOMAKE: 8
};

export const Roles = {
    OMISTAJA: 1,
    VASTAAVA: 2,
    SIJAINEN: 3,
    TUOTANTOON_HYVAKSYNYT: 4,
    ASENNUKSEN_HYVAKSYNYT: 5
};

export function roleIdToRooliName(roleId) {
    switch (parseInt(roleId, 10)) {
        case 1:
            return "OMISTAJA";
        case 2:
            return "VASTAAVA";
        case 3:
            return "SIJAINEN";
        case 4:
            return "TUOTANTOON_HYVAKSYNYT";
        case 5:
            return "ASENNUKSEN_HYVAKSYNYT";
        default: return null;
    }
}

export function roleIdToRooliDescription(roleId) {
    switch (parseInt(roleId, 10)) {
        case 1:
            return "omistaja";
        case 2:
            return "vastaava";
        case 3:
            return "sijainen";
        case 4:
            return "tuotantoon hyväksynyt";
        case 5:
            return "asennuksen hyväksyjä";
        default: return null;
    }
}

export function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const tietovirtaDirections = {
    READ: "Luku",
    WRITE: "Kirjoitus"
};

export const internalOrganisation = "Väylävirasto";
