import { fullRestURL } from "../App";
import { Roles } from "../utils";

export function getRoles(values, roleName) {
  return (
    values.fetchRooliHenkiloList &&
    values.fetchRooliHenkiloList.filter(
      (henkiloRooli) => henkiloRooli.rooli.nimi === roleName
    )
  );
}

export function getPersonValue(person, list) {
  if (list) {
    return (
      (person && person.length > 0 && person[0].henkilo && person) || [null]
    );
  }
  return (person && person[0] && person[0].henkilo) || null;
}

export function init(values) {
  if (!values) {
    return null;
  }
  let henkiloRooliList = {};
  Object.keys(Roles).forEach((role) => {
    henkiloRooliList[role] = values
      .filter((henkiloRooli) => henkiloRooli.rooli.nimi === role)
      .map((person) => person.henkilo);
  });
  return henkiloRooliList;
}

export function personSelectToLabel(selected) {
  return `${selected.nayttonimi}, email: ${selected.sahkoposti}, tunnustyyppi: ${selected.tunnustyyppi}`;
}

export function personCustomResourceSelectClassName(person) {
  return person && person.poistunut ? "inactive" : "";
}

export function personCustomResourceSelectRequestUrl(input) {
  return `${fullRestURL()}/FIM?filter=${input}`;
}

export const getInitialPersonList = (fetchList) => {
  return getUniquePersonList(fetchList.map(({ henkilo }) => henkilo));
};

export const getUniquePersonList = (fetchList) => {
  if (!fetchList) return;
  const idToPerson = fetchList
    .filter((henkilo) => !!henkilo)
    .reduce(
      (obj, henkilo) => ({
        ...obj,
        [henkilo.tunnus]: henkilo,
      }),
      {}
    );

  return Object.values(idToPerson);
};
