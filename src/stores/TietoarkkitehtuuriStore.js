import { action, observable } from "mobx";

import BaseStore from "./BaseStore";
import TietolajiHelper from "../dynamicform/TietolajiHelper";


export class TietoarkkitehtuuriStore extends BaseStore {
    // This could be expanded to also hold the rest of the 
    // tietoarkkitehtuuri data if needed
    @observable looginen = [];
    @observable tietolaji = [];
    @observable tietoryhma = [];

    constructor() {
        super({
            restUrl: "tietoarkkitehtuuri",
            itemUrl: "",
            resourceUrl: null
        });
    }


    @action
    resetAll() {
        this.looginen = [];
        this.tietolaji = [];
        this.tietoryhma = [];
    }

    @action
    setTietovirtaFromObject(obj) {
        this.looginen = obj.looginen;
        this.tietolaji = obj.tietolaji;
        this.tietoryhma = obj.tietoryhma;
    }

    /**
     * Populates this store with a subset of tietoarkkitehtuuri data that can
     * be used to describe the data flow between jarjestelma entities.
     */
    @action
    fetchAndSaveTietovirtaData() {
        return this.search({}, 0, -1).then(res => {
            const data = {};
            const { LOOGINEN, TIETOLAJI, TIETORYHMA } = TietolajiHelper.tietolajiType;
            [LOOGINEN.value, TIETOLAJI.value, TIETORYHMA.value].forEach(category => {
                data[category] = res.data[category].items;
            });
            this.setTietovirtaFromObject(data);
        });
    }

}

const tietoarkkitehtuuriStore = new TietoarkkitehtuuriStore();
export default tietoarkkitehtuuriStore;