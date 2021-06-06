import BaseStore from "./BaseStore";

export class PalveluKatalogiStore extends BaseStore {
    constructor() {
        super({ restUrl: "palvelu", itemUrl: "/palvelu/tunnus/" });
    }
}

const palveluKatalogiStore = new PalveluKatalogiStore();
export default palveluKatalogiStore;
