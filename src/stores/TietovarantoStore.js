import BaseStore from "./BaseStore";
import { action } from "mobx";

export class TietovarantoStore extends BaseStore {
    constructor() {
        super({
            restUrl: "tietovaranto",
            itemUrl: "/tietovaranto/tunnus/"
        });
    }
}

const tietovarantoStore = new TietovarantoStore();
export default tietovarantoStore;
