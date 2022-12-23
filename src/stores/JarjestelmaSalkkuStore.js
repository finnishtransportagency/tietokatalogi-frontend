import { observable, action } from "mobx";
import axios from "axios";

import BaseStore from "./BaseStore";

export class JarjestelmaSalkkuStore extends BaseStore {
  constructor() {
    super({
      restUrl: "jarjestelma",
      itemUrl: "/jarjestelma/tunnus/",
      resourceNameMapping: {
        turvallisuusluokka: "liik_turvallisuusluokka",
      },
      searchUrl: "/minimalAll",
    });
  }

  @observable noRightsToModify = [];

  @action
  fetchRights() {
    return axios
      .get(`${this.baseUrl}/${this.restUrl}/rights`)
      .then((response) => {
        if (response && response.data)
          this.noRightsToModify = response.data.noRightsToModify;
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

const jarjestelmaSalkkuStore = new JarjestelmaSalkkuStore();
export default jarjestelmaSalkkuStore;
