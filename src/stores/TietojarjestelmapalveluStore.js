import BaseStore from "./BaseStore";
import { action } from "mobx";
import axios from "axios";

export class TietojarjestelmapalveluStore extends BaseStore {
    constructor() {
        super({
            restUrl: "tietojarjestelmapalvelu",
            itemUrl: "/tietojarjestelmapalvelu/tunnus/",
            searchUrl: "/minimalAll"
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

    @action
    fetchDetails(tunnus) {
        this.storeDetails({});
        return axios
            .get(`${this.url}/${tunnus}`)
            .then(response => {
                this.details = Object.entries(response.data).reduce((acc, [k, v]) => ({
                    ...acc,
                    [k === "relatedJarjestelmaIds" ? "liittyvaJarjestelma" : k]: v
                }), []);
                return response;
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}

const tietojarjestelmapalveluStore = new TietojarjestelmapalveluStore();
export default tietojarjestelmapalveluStore;
