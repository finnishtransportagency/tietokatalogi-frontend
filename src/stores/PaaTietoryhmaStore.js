import BaseStore from "./BaseStore";

export class PaaTietoryhmaStore extends BaseStore {
    constructor() {
        super({
            restUrl: "paatietoryhma",
            itemUrl: "/paatietoryhma/tunnus/",
            resourceUrl: null
        });
    }
}

const paaTietoryhmaStore = new PaaTietoryhmaStore();
export default paaTietoryhmaStore;
