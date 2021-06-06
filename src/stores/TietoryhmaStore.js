import BaseStore from "./BaseStore";

export class TietoryhmaStore extends BaseStore {
    constructor() {
        super({
            restUrl: "tietoryhma",
            itemUrl: "/tietoryhma/tunnus/"
        });
    }
}

const tietoryhmaStore = new TietoryhmaStore();
export default tietoryhmaStore;
