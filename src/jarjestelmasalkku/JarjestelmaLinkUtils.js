import { tietovirtaDirections } from "../utils";

export function getReversedLink(link) {
    const { READ, WRITE } = tietovirtaDirections;
    return {
        ...link,
        tietojarjestelmaTunnus: link.linkattavaTunnus,
        linkattavaTunnus: link.tietojarjestelmaTunnus,
        suunta: link.suunta === READ ? WRITE : READ
    };
}

/**
 * Creates a string identifier for a jarjestelma link.
 * In practise this should uniquely identify the link 
 * except for the tietovirta, id, and isReversed fields.
 */
export function getKeyForJarjestelmaLink(tietovirtaObject) {
    const {
        tyyppi: t,
        tietojarjestelmaTunnus: tjt,
        linkattavaTunnus: lt,
        suunta: s,
        tietojarjestelmapalveluTunnus: tjpt
    } = tietovirtaObject;
    return `${t}|${lt}|${s}|${tjpt || ""}|${tjt}`;
}

export function getKeyForLinkTvPair(linkKey, tietovirta) {
    return `${linkKey}|${tietovirta || ""}`;
}


/**
 * Groups link objects together by the fields:
 *   tyyppi, tietojarjestelmaTunnus, linkattavaTunnus, suunta, tietojarjestelmapalveluTunnus.
 * Tietovirta values are combined into an array. The other properties are taken (arbitrarily)
 * from the first matching object.
 * The original id and isReversed properties for a link are stored in a metadata object.
 *
 * Returns an array containing the links and the metadata object, respectively.
 * @returns {[[], {String: {}}]}
 */
export function convertLinksFromFetchedToMultiselectFormat(jarjestelmaLinkkausList) {
    const [grouped, metadata] = jarjestelmaLinkkausList.reduce(([res, meta], jl) => {
        const key = getKeyForJarjestelmaLink(jl);
        if (!res[key]) {
            res[key] = {...jl, tietovirta: []};
        }
        res[key].tietovirta = [...res[key].tietovirta, Number(jl.tietovirta)];
        meta[getKeyForLinkTvPair(key, jl.tietovirta)] = { id: jl.id, isReversed: jl.isReversed };
        return [ res, meta ];
    }, [{}, {}]);
    return [Object.values(grouped), metadata];
}



/**
  * Splits the multiselect format link array into an array where each tietovirta
  * is in its own link object.
  * The potentially missing id and isReversed properties are taken from the metadata
  * array.
  */
export function convertLinksFromMultiselectToSendableFormat(groupedUpList, metadata) {
    return groupedUpList.reduce((res, groupedJl) => {
        const arr = groupedJl.tietovirta;
        const arrWithDefault = (Array.isArray(arr) && arr.length === 0) ? [null] : (arr || [null]);
        const newRows = arrWithDefault.map(tv => {
            const k = getKeyForLinkTvPair(getKeyForJarjestelmaLink(groupedJl), tv);
            return { ...groupedJl, tietovirta: tv, ...(metadata[k] || {id: null, isReversed: undefined }) };
        });
        return [ ...res, ...newRows ];
    }, []);

}

export function convertFetchedLinksToOneDirectional(linkList = [], jarjestelmaId) {
    // If linkattavaTunnus is same as own tunnus that link comes from another
    // jarjestelma and we must swap the link direction
    return linkList.map(link => {
        if ((link.linkattavaTunnus === jarjestelmaId) && (link.tietojarjestelmaTunnus !== jarjestelmaId)) {
            const reversed = getReversedLink(link);
            // Mark link as reversed, so that it can be identified 
            // and turned back on form submit.
            reversed.isReversed = true;
            return reversed;
        }
        return link;
    });
}

export function removeNameData(linkList) {
    const fieldsToRemove = [ "tietojarjestelmapalveluNimi", "tietovirtaNimi" ];
    
    return linkList.map(link => {
        return Object.keys(link).reduce((linkWithoutFields, key) => {
            return fieldsToRemove.includes(key) ?
                (linkWithoutFields) : { ...linkWithoutFields, [key]: link[key] };
        }, {});
    });
}