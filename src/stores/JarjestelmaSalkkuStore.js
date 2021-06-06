import BaseStore from "./BaseStore";

export class JarjestelmaSalkkuStore extends BaseStore {
    constructor() {
        super({
            restUrl: "jarjestelma", 
            itemUrl: "/jarjestelma/tunnus/", 
            resourceNameMapping:  {
                turvallisuusluokka: "liik_turvallisuusluokka",
            },
            searchUrl: "/minimalAll"
        });
    }
}

const jarjestelmaSalkkuStore = new JarjestelmaSalkkuStore();
export default jarjestelmaSalkkuStore;