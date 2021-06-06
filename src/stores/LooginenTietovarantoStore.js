import BaseStore from "./BaseStore";

export class LooginenTietovarantoStore extends BaseStore {
    constructor() {
        super({
            restUrl: "looginen", 
            itemUrl: "/looginen/tunnus/", 
        });
    }
}

const looginenTietovarantoStore = new LooginenTietovarantoStore();
export default looginenTietovarantoStore;