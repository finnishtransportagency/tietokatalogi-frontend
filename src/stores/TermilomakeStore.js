import BaseStore from "./BaseStore";
import { action } from "mobx";
import axios from "axios";

export class TermilomakeStore extends BaseStore {
    constructor() {
        super({
            restUrl: "sanasto",
            itemUrl: "/sanasto/tunnus/",
        });
    }

    // Custom version of the search function from BaseStore
    @action
    searchAll(filters = {}, offset = 0, size = 15, sort = "asc") {
        let params = this.createSearchParams(filters);
        params.append("offset", offset);
        if (size) {
            params.append("size", size);
        }
        params.append("sort", sort);
        // Fetch from 'url', which uses 'restUrl' instead of 'searchUrl', in order to get everything, not just the minimal data
        return axios
            .get(this.url, {
                params: params
            })
            .then(response => {
                const { data: { items } } = response;
                this.storeList(items);
                this.count = response.data.count;
                this.offset = offset;
                this.size = size;
                return response;
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}

const termilomakeStore = new TermilomakeStore();
export default termilomakeStore;
