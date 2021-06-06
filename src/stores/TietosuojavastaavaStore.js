import BaseStore from "./BaseStore";

export class TietosuojavastaavaStore extends BaseStore {
    constructor() {
        super({
            restUrl: "tietosuojavastaava",
            itemUrl: "/tietosuojavastaava/tunnus/",
            resourceUrl: null
        });
    }
}

const tietosuojavastaavaStore = new TietosuojavastaavaStore();
export default tietosuojavastaavaStore;
