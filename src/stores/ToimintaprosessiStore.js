import BaseStore from "./BaseStore";

export class ToimintaprosessiStore extends BaseStore {
    constructor() {
        super({
            restUrl: "toimintaprosessi",
            itemUrl: "/toimintaprosessi/tunnus/"
        });
    }
}

const toimintaprosessiStore = new ToimintaprosessiStore();
export default toimintaprosessiStore;
