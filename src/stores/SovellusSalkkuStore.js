import BaseStore from "./BaseStore";
import { observable, action } from "mobx";
import axios from "axios";

export class SovellusSalkkuStore extends BaseStore {
    @observable latestImport;
    @observable latestSuccessfulImport;

    constructor() {
        super({
            restUrl: "sovellushallinta",
            itemUrl: "/sovellus/tunnus/"
        });
    }

    @action
    search(filters = {}, offset = 0, size = 15, sort = "asc") {
        let params = this.createSearchParams(filters);
        params.append("offset", offset);
        if (size) {
            params.append("size", size);
        }
        params.append("sort", sort);
        return axios
            .get(this.searchUrl, {
                params: params
            })
            .then(response => {
                const { data: { items } } = response;
                this.storeList(items);
                this.count = response.data.count;
                this.offset = offset;
                this.size = size;
                this.latestImport = response.data.latestImport;
                this.latestSuccessfulImport = response.data.latestSuccessfulImport;
                return response;
            })
            .catch(function(error) {
                console.log(error);
            });
    }

}


const sovellusSalkkuStore = new SovellusSalkkuStore();
export default sovellusSalkkuStore;
