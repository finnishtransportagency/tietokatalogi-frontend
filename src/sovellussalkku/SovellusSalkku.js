import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { fullURL } from "../App";
import { SovellusForm } from "./SovellusForm";
import { toJS } from "mobx";
import {
  getRoles,
  getInitialPersonList,
} from "../henkilorooli/HenkiloRooliUtils";
import { Roles } from "../utils";

@inject("routing")
@inject("sovellusSalkkuStore")
@inject("notificationStore")
@observer
export default class SovellusSalkku extends Component {
  constructor(props, context) {
    super(props, context);

    const { tunnus = null } = this.props.params;

    this.state = {
      edit: tunnus ? false : true,
    };
    this.refresh(tunnus);
  }

  refresh(tunnus) {
    if (tunnus) {
      this.props.sovellusSalkkuStore.fetchDetails(tunnus);
    }
    if (!this.props.sovellusSalkkuStore.resources)
      this.props.sovellusSalkkuStore.fetchResource();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.tunnus !== nextProps.params.tunnus) {
      this.refresh(nextProps.params.tunnus);
    }
  }

  sovellusPersonRoleToDisplayPerson(personRole) {
    if (personRole && personRole[0]) {
      const person = personRole[0].henkilo;
      if (person.nayttonimi) {
        return person.nayttonimi;
      } else {
        return person.objectID;
      }
    }
    return null;
  }

  get sovellus() {
    let sovellus =
      parseInt(this.props.params.tunnus, 10) ===
      this.props.sovellusSalkkuStore.details.tunnus
        ? this.props.sovellusSalkkuStore.details
        : null;
    if (sovellus) {
      sovellus["tuotantoonHyvaksynyt"] = this.sovellusPersonRoleToDisplayPerson(
        getRoles(sovellus, "TUOTANTOON_HYVAKSYNYT")
      );
      sovellus["asennuksenHyvaksynyt"] = this.sovellusPersonRoleToDisplayPerson(
        getRoles(sovellus, "ASENNUKSEN_HYVAKSYNYT")
      );
    }
    return sovellus;
  }

  setEditable(editable) {
    if (editable) this.props.sovellusSalkkuStore.fetchResource();
    this.setState({ edit: editable });
  }

  onSuccess(data) {
    const { tunnus } = data;
    if (tunnus) {
      this.setEditable(false);
      this.refresh(tunnus);
    }
  }

  onCreateSuccess(data) {
    const { tunnus } = data;
    const { replace } = this.props.routing;
    if (tunnus && replace) {
      replace(fullURL("sovellus/tunnus/", tunnus));
      this.setEditable(false);
    }
  }

  onRemoveSuccess() {
    this.props.routing.replace(fullURL("sovellussalkku"));
  }

  cancelNew() {
    this.props.routing.replace(fullURL("sovellussalkku"));
  }

  render() {
    const { notificationStore } = this.props;
    const { edit } = this.state;

    const values = toJS(this.sovellus);

    let contentEl = <div>Ei tietoja</div>;
    if (this.sovellus) {
      contentEl = (
        <SovellusForm
          values={{
            ...values,
            omistaja: roleToPersonId(
              Roles.OMISTAJA,
              values.fetchRooliHenkiloList
            ),
            vastaava: roleToPersonId(
              Roles.VASTAAVA,
              values.fetchRooliHenkiloList
            ),
            tuotantoonHyvaksynyt: roleToPersonId(
              Roles.TUOTANTOON_HYVAKSYNYT,
              values.fetchRooliHenkiloList
            ),
            asennuksenHyvaksynyt: roleToPersonId(
              Roles.ASENNUKSEN_HYVAKSYNYT,
              values.fetchRooliHenkiloList
            ),
          }}
          resources={{
            ...this.props.sovellusSalkkuStore.resources,
            people: getInitialPersonList(values.fetchRooliHenkiloList),
          }}
          edit={edit}
          onSubmit={(values) => {
            this.props.sovellusSalkkuStore
              .save(values)
              .then((response) => {
                this.onSuccess(response.data);
              })
              .catch(function (error) {
                notificationStore.addError("Virhe tallennuksessa", error);
              });
          }}
          remove={(tunnus) => {
            this.props.sovellusSalkkuStore
              .remove(tunnus)
              .then((response) => {
                this.onRemoveSuccess();
              })
              .catch(function (error) {
                notificationStore.addError("Virhe tallennuksessa", error);
              });
          }}
          setEditable={(editable) => this.setEditable(editable)}
        />
      );
    } else if (!this.props.params.tunnus) {
      contentEl = (
        <SovellusForm
          values={{}}
          resources={this.props.sovellusSalkkuStore.resources}
          edit={edit}
          onSubmit={(values) => {
            this.props.sovellusSalkkuStore
              .save(values)
              .then((response) => {
                this.onCreateSuccess(response.data);
              })
              .catch(function (error) {
                notificationStore.addError("Virhe tallennuksessa", error);
              });
          }}
          setEditable={(editable) => this.setEditable(editable)}
          cancelNew={() => this.cancelNew()}
        />
      );
    }
    return contentEl;
  }
}

const roleToPersonId = (roleId, fetchList) =>
  fetchList
    .filter(({ rooli: { tunnus } }) => tunnus === roleId)
    .map(({ henkilo }) => henkilo.tunnus);
