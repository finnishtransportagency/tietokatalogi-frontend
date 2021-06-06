import BaseStore from "./BaseStore";

export class TietoOmaisuusStore extends BaseStore {
    constructor() {
        super({
            restUrl: "tieto-omaisuus",
            itemUrl: "/tieto-omaisuus/tunnus/"
        });
    }

}

const tietoOmaisuusStore = new TietoOmaisuusStore();
export default tietoOmaisuusStore;
