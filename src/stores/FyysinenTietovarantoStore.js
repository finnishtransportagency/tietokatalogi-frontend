import BaseStore from "./BaseStore";

export class FyysinenTietovarantoStore extends BaseStore {
    constructor() {
        super({
            restUrl: "fyysinen", 
            itemUrl: "/fyysinen/tunnus/", 
            resourceUrl: null,
        });
    }
}

const fyysinenTietovarantoStore = new FyysinenTietovarantoStore();
export default fyysinenTietovarantoStore;