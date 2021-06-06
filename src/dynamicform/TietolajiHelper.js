export default class TietolajiHelper {
    static tietolajiType = {
        FYYSINEN: { name: "Fyysinen tietovaranto", value: "fyysinen", urlString: "fyysinen" },
        LOOGINEN: { name: "Looginen tietovaranto", value: "looginen", urlString: "looginen" },
        TIETOLAJI: { name: "Tietolaji", value: "tietolaji", urlString: "tietolaji" },
        TIETORYHMA: { name: "Tietoryhmä", value: "tietoryhma", urlString: "tietoryhma" },
        PAATIETO: { name: "Päätietoryhmä", value: "paatieto", urlString: "paatietoryhma" }
    };

    static getUrlStringForCategoryValue = value => {
        for (const category of Object.values(TietolajiHelper.tietolajiType)) {
            if (category.value === value) {
                return category.urlString;
            }
        }
    }

    static fieldTypes = {
        TEXT: 1,
        TEXT_AREA: 2,
        SELECT: 3,
        MULTISELECT: 4
    };

    static getTietolajiFields(tietolajiType) {
        const nimi = { name: "nimi", type: this.fieldTypes.TEXT };
        const kuvaus = { name: "kuvaus", type: this.fieldTypes.TEXT_AREA };
        const omistaja = { name: "omistaja", type: this.fieldTypes.TEXT };
        const jarjestelmaLinks = { name: "jarjestelma", type: this.fieldTypes.MULTISELECT, resourceName: "jarjestelma", useID: true };
        const alue = { name: "alue", type: this.fieldTypes.TEXT };
        const paivitystiheys = {
            name: "paivitystiheys",
            type: this.fieldTypes.TEXT
        };
        const tietosuojataso = {
            name: "tietosuojataso",
            type: this.fieldTypes.TEXT
        };
        const muuta = { name: "muuta", type: this.fieldTypes.TEXT_AREA };
        const lahde = { name: "lahde", type: this.fieldTypes.TEXT };
        const tila = { name: "tila", type: this.fieldTypes.SELECT, resourceName: "tila", useID: false };

        let fields = [nimi, kuvaus];
        switch (tietolajiType) {
            case this.tietolajiType.FYYSINEN.value:
                return fields.concat([omistaja, muuta]);
            case this.tietolajiType.LOOGINEN.value:
                return fields.concat([omistaja, jarjestelmaLinks, alue, paivitystiheys]);
            case this.tietolajiType.TIETOLAJI.value:
                return fields.concat([omistaja, lahde, tila, tietosuojataso]);
            case this.tietolajiType.TIETORYHMA.value:
                return fields;
            case this.tietolajiType.PAATIETO.value:
                return fields.concat([omistaja]);
            default:
                return null;
        }
    }
}
