import { observable, action } from "mobx";
import axios from "axios";
import { fullRestURL } from "../App";

export default class BaseStore {
    @observable details = {};
    @observable list = null;
    @observable resources = null;
    @observable count = 0;
    @observable offset = 0;
    @observable size = 15;
    @observable links = null;

    baseUrl = fullRestURL();
    restUrl = "";
    itemUrl = "";
    resourceUrl = "";
    resourceNameMapping = {};
    searchUrl = "";

    constructor({
        restUrl = "",
        itemUrl = "",
        resourceUrl = "kasite",
        resourceNameMapping = {},
        searchUrl = ""
    }) {
        this.restUrl = restUrl;
        this.itemUrl = itemUrl;
        this.resourceUrl = resourceUrl;
        this.resourceNameMapping = resourceNameMapping;
        this.searchUrl = this.url + searchUrl;
    }

    transform(data) {
        data.itemUrl = this.itemUrl;
        return data;
    }

    transformAll(data = []) {
        return data.map(item => this.transform(item));
    }

    get url() {
        return `${this.baseUrl}/${this.restUrl}`;
    }

    storeList(items) {
        this.list = this.transformAll(items);
        // TODO seems suspicious to fetch resources here? Does more than the function name suggests
        if (this.resources === null && this.resourceUrl) this.fetchResource();
    }

    storeLinks(links) {
        if (links) {
            this.links = links;
        }
    }

    storeDetails(newData) {
        this.details = newData;
        // TODO seems suspicious to fetch resources here? Does more than the function name suggests
        if (this.resources === null && this.resourceUrl) this.fetchResource();
    }

    storeResources(data = {}) {
        const { resources = [] } = data;
        let resourceTree = {};
        resources.forEach(res => {
            let resourceName = res.resourceName
                .toLowerCase()
                .replace(/ä/g, "a")
                .replace(/ö/g, "ö")
                .replace(/å/g, "a");
            if (this.resourceNameMapping.hasOwnProperty(resourceName))
                resourceName = this.resourceNameMapping[resourceName];
            if (!resourceTree.hasOwnProperty(resourceName))
                resourceTree[resourceName] = {};
            if (res.hasOwnProperty("score")) {
                resourceTree[resourceName][res.score] = res.value;
            }
            else if (res.hasOwnProperty("areaCode")) {
                resourceTree[resourceName][res.areaCode] = res.value;
            }
            else if (res.hasOwnProperty("selitys")) {
                resourceTree[resourceName][res.id] = {value: res.value, selitys: res.selitys};
            }
            else {
                resourceTree[resourceName][res.id] = res.value;
            }
        });
        this.resources = resourceTree;
    }

    storeResource(resource = {}) {
        if (!this.resources) {
            this.resources = resource;
        } else {
            Object.assign(this.resources, resource);
        }
    }

    createSearchParams(filters) {
        let searchParams = new URLSearchParams();
        Object.keys(filters).forEach(filterName => {
            const param = filters[filterName];
            if (!param) return;
            if (param.constructor === Array) {
                param.forEach(value => {
                    searchParams.append(filterName, value);
                });
            } else {
                searchParams.append(filterName, param);
            }
        });
        return searchParams;
    }

    @action
    fetchAll() {
        // TODO fetchall not really supported on backend
        let params = new URLSearchParams();
        params.append("offset", 0);
        params.append("size", 999999999);
        params.append("sort", "asc");
        return axios
            .get(this.url, {
                params: params
            })
            .then(response => {
                const { data: { items } } = response;
                this.storeList(items);
                return response;
            });
    }

    @action
    fetchLinkitys(kategoria, tunnus) {
        return axios
            .get(`${this.baseUrl}/linkitys/tunnus/${kategoria}/${tunnus}`)
            .then(response => {
                this.storeLinks(response.data);
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
                this.storeDetails(response.data);
                return response;
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    @action
    fetchResource() {
        if (!this.resourceUrl) return Promise.resolve({ data: {} });
        return axios
            .get(`${this.url}/${this.resourceUrl}`)
            .then(response => {
                this.storeResources(response.data);
                return response;
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    @action
    save(values) {
        delete values.itemUrl;
        if (values.tunnus && values.tunnus != null) {
            return axios
                .put(this.url, { ...values })
                .then(response => {
                    this.storeDetails(response.data);
                    return response;
                })
                .catch(function(error) {
                    return Promise.reject(error);
                });
        } else {
            delete values.tunnus;
            return axios
                .post(this.url, { ...values })
                .then(response => {
                    this.storeDetails(response.data);
                    return response;
                })
                .catch(function(error) {
                    return Promise.reject(error);
                });
        }
    }

    @action
    remove(tunnus) {
        return axios
            .delete(this.url + "/" + tunnus)
            .then(response => {
                return response;
            })
            .catch(function(error) {
                return Promise.reject(error);
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
                return response;
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}
