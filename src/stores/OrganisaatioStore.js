import BaseStore from "./BaseStore";

export class OrganisaatioStore extends BaseStore {
    constructor() {
        super({
            restUrl: "organisaatio",
            itemUrl: "/organisaatio/tunnus/",
            resourceUrl: null
        });
    }
}

const organisaatioStore = new OrganisaatioStore();
export default organisaatioStore;
