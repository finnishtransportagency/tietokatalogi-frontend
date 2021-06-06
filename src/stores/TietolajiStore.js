import BaseStore from "./BaseStore";

export class TietolajiStore extends BaseStore {
    constructor() {
        super({
            restUrl: "tietolaji",
            itemUrl: "/tietolaji/tunnus/"
        });
    }
}

const tietolajiStore = new TietolajiStore();
export default tietolajiStore;
