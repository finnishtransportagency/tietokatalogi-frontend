import React from "react";
import { Form } from "react-form";
import {
  FormControls,
  validateAll,
  validateNotEmptyNumber,
} from "../form/FormControls";
import { CustomCollapse as Collapse } from "../form/CustomCollapse";
import { CustomSelect } from "../form/CustomSelect";
import { CustomScoredSelect } from "../form/CustomScoredSelect";

export class TietoOmaisuusForm extends React.Component {
  getDefaultValues(values) {
    if (!values) return {};
    const fieldValues = { ...values };
    fieldValues.jarjestelma = fieldValues.tietojarjestelma_tunnus;
    delete fieldValues.tietojarjestelma_tunnus;
    return fieldValues;
  }

  render() {
    const {
      edit,
      onSubmit,
      remove,
      setEditable,
      cancelNew,
      values,
      resources,
      title,
    } = this.props;

    const fieldDisplayNames = [
      "Tiedon ensisijainen käyttötarve",
      "Toissijaiset käyttötarpeet",
      "Asiakkaat / Käyttäjät",
      "Tiedon mallinnustapa",
      "Käyttöformaatit",
      "Historiatiedot",
      "Kattavuus ja laatu",
      "Metatiedot",
      "Muutostiedot",
      "Saatavuus",
      "Henkilötiedot",
      "Eheys",
      "Avoimuus",
      "Immateriaalioikeudet",
      "Yksilöivät tunnisteet",
      "Tiedon pysyvyys: Staattisuus / dynaamisuus",
      "Dokumentaatio",
      "Elinkaari",
      "Alustojen tyyppi ja sijainti",
    ];

    const fieldIDNames = [
      "primaarikayttotarve",
      "sekundaar_kayttotarpeet",
      "kayttajat",
      "mallinnustapa",
      "kayttoformaatit",
      "historiatiedot",
      "kattavuus_ja_laatu",
      "metatiedot",
      "muutostiedot",
      "saatavuus",
      "henkilotiedot",
      "eheys",
      "avoimuus",
      "immateriaalioikeudet",
      "yksiloivat_tunnisteet",
      "pysyvyys",
      "dokumentaatio",
      "elinkaari",
      "alustojen_tyyp_ja_sij",
    ];

    const fieldDescriptions = [
      "Tällä tarkoitetaan sitä käyttötarvetta, mitä varten tieto on alun perin kerätty tai tuotettu. Esim. Tiestövelhossa olevien tietojen ensisijainen käyttötarve on tienpito ja Digiroadin tieliikenteen reititys ja palvelut.",
      "Toissijaiset käyttötarpeet ovat järjestelmän ulkopuolisia käyttötarpeita. Esim. Tiestövelhon tietoja voidaan käyttää myös älyliikenteen palveluissa. Älyliikenteen palvelut ovat siten Tiestövelhon tiedoille toissijainen käyttötarve.",
      "Järjestelmässä olevien tietojen asiakkaat ja käyttäjät ovat tietojen ja tietojärjestelmän käyttäjiä. Asiakkaiden ja käyttäjien yhteystietojen tietäminen mahdollistaa yhteyden ottamisen heihin.",
      "Tietomalli tarkoittaa abstraktia tapaa kuvata tiedon sisältö, elementit ja elementtien keskinäiset suhteet. Standardilla mallinnustavalla tarkoitetaan tässä yhteydessä jotain Väylän sisäisesti suosimaa mallinnustapaa jos alalla ei ole omia laajempia standardeja.",
      "Käyttöformaatit ovat niistä tiedosto- tai rajapintamuotoja muotoja, joissa tietoa käytetään tai välitetään hyödyntäjille. Standardilla formaatilla voidaan tarkoittaa tässä Väylän omaa sisäistä standardia, jos alalla ei ole laajempia standardeja.",
      "Historiatiedoilla tarkoitetaan tietojen muutoshistorian tallentamista. Historiatietojen hallinnan toteutukseen on monia erilaisia tapoja esim. säännöllisin väliajoin tehtävän tietoirroituksen arkistointi tai kattavan muutoslokin säilyttäminen. Historiatietojen käytön suunnittelu käyttöliittymiin asti tarkoittaa, että tietojen hyödyntäjät voivat halutessaan selata myös tiedon historiaversioita.",
      "Kattavuudella tarkoitetaan tietojen maantieteellisen kattavuuden lisäksi sitä, kuinka laajasti tietoa on olemassa siltä kohdejoukolta, jota tieto koskee. Kuvitteellinen esimerkki: tien leveys-tieto koskee jokaista tielinkkiä, mutta tieto on olemassa vain 93% tielinkkejä.",
      "Metatiedot kuvaavat tietoaineiston sisällön. Metatietojen kuvaukseen on erilaisia standardeja. Metatietojen kattavuus koko tietoaineistolle tarkoittaa sitä, että tietojärjestelmän kaikki tietolajit on kuvattu. Metatietorajapinnalla tarkoitetaan mahdollisuutta välittää metatiedot koneellisesti esim. karttakäyttöliittymiin tai muihin välineisiin, missä varsinaista tietoakin käytetään.",
      "Muutoksien tunnistaminen mahdollistaa tiedon edistyneen hyödyntämisen. Muutosten tunnistamisella tarkoitetaan sitä, että tietojärjestelmään jää merkintä tiedossa tapahtuvista muutoksista. Jos tämä merkintä tai jonkinlainen muutossanoma välitetään myös tiedon hyödyntäjille, on aineiston hyödyntäminen mahdollista muutossanomien avulla. ",
      "Tiedon saatavuuden vaatimukset voivat olla mm. käyttäjälähtöisiä tai lakisääteisiä. Saatavuuden vaatimukset määrittelevät sen, kuinka kauan (tai paljon esim. tunteina vuodessa) hyödyntäjät voivat olla ilman järjestelmän tarjoamia tietoja. ",
      "Henkilötietoja ovat kaikki tiedot, jotka liittyvät tunnistettuun tai tunnistettavissa olevaan henkilöön. Järjestelmän sisältämissä tiedoissa mm. yhteystiedot, kuvatiedot voivat sisältää henkilötietoja.",
      "Eheydellä tarkoitetaan sitä, että järjestelmän tiedot ovat tietomallin mukaisia eikä tietojen rakenne ja sisältö esimerkiksi muutu hallitsemattomasti. Tiedon eheyttä voidaan hallitsemattomien muutoksien varalta seurata esim. manuaalisilla tarkastuksilla, säännöllisillä analyyseillä tai monitoroimalla järjestelmän toimintaa.",
      "Järjestelmän sisältämien tietojen avoimuus on tärkeä tunnistaa, jotta tietoja osataan käsitellä oikeilla menetelmillä. Lähtökohtaisesti Väylän tiedot ovat avoimia ellei toisin ole perustellusti päätetty.",
      "Sekä avoimien tietojen että ei-avoimien tietojen kohdalla käyttöoikeuksien ja lisenssin määrittely helpottaa tietojen hallintaa ja jakamista. Väylän avoimiin tietoihin sovelletaan säännönmukaisesti lisenssiä CC 4.0 By. ",
      'Yksilöivillä tunnisteilla tarkoitetaan tiedoille annettavia id-tunnuksia, joiden avulla tietoja voidaan yksilöidä ja tunnistaa myös silloin, kun ne irrotetaan alkuperäisestä yhteydestään. Yksilöivät tunnisteet ovat yksikäsitteisiä, pysyviä ja jäljitettäviä. Tunnisteet ovat yksilöiviä silloin, kun niitä ei voida sekoittaa muissa tietojärjestelmissä oleviin tunnisteisiin, tunnisteiden tulee siis olla "globaaleja". Tunnisteita voidaan soveltaa tiedoissa vain peruselementeille tai "päätietolajille" tai kattavasti kaikille järjestelmän tietolajeille.',
      "Staattinen data muuttuu hitaasti ja dynaaminen data jatkuvasti. Tiukkoja raja-arvoja ei yleensä ole mahdollista määritellä, mutta esim. kuukausitasolla muuttuva data on tyypillisesti staattista ja päivittäin muuttuva dynaamista.",
      "Dokumentaatiolla tarkoitetaan tietojärjestelmän rakennetta kuvaavaa dokumentaatiota. Esim. tieto- ja käsitemallit ja niiden selitteet löytyvät dokumentaatiosta. ",
      "Elinkaari on se aikajänne, jonka ajan järjestelmän ajatellaan olevan käytössä. Elinkaaren kuvaamiseen ei ole tässä yhteydessä mitään tiettyjä sääntöjä, mutta asiaa voi pohtia mm. teknisen toteutuksen vanhenemisen, ylläpidon sopimustilanteen tai asiakastarpeiden kehittymisen kautta.",
      "Tietojärjestelmien käyttämät palvelimet voivat sijaita perinteisesti konesaleissa tai pilvipalvelualustoilla. Pilvipalveluiden käyttämät palvelinkeskukset voivat sijaita lähes missäpäin maailmaa tahansa, mutta jossain tapauksissa lait tai muut määräykset rajoittavat sitä minkälaisia pilvipalveluita tietojärjestelmien alustapalveluissa voidaan käyttää.",
    ];

    const nFields = fieldDisplayNames.length;
    const nFullRows = Math.floor(fieldDisplayNames.length / 2);

    const defaultValues = this.getDefaultValues(values);

    return (
      <Form
        validateError={(values) =>
          validateAll(values, validateNotEmptyNumber(["jarjestelma"]))
        }
        onSubmit={(values) => {
          const submitValues = { ...values };
          submitValues.tietojarjestelma_tunnus = submitValues.jarjestelma;
          delete submitValues.jarjestelma;
          delete submitValues.noRightsToModify;
          onSubmit(submitValues);
        }}
        defaultValues={defaultValues}
        dontValidateOnMount={true}
      >
        {(formApi) => (
          <form onSubmit={formApi.submitForm}>
            <Collapse
              header={`Kaikki tiedot: ${title || ""}`}
              isOpened={true}
              lastModified={values.rivimuokattupvm}
            >
              <div className="form-group row">
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <label htmlFor="jarjestelma" className="row">
                      Tietojärjestelmä
                    </label>
                    <div className="row">
                      <CustomSelect
                        field="jarjestelma"
                        className="tk-field form-control"
                        id="jarjestelma"
                        placeholder=""
                        readOnly={!edit}
                        resources={resources}
                        useID={true}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {Array(nFullRows)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="form-group row">
                    <div className="col-sm-6">
                      <div className="col-sm-12">
                        <label htmlFor={fieldIDNames[2 * i]} className="row">
                          {fieldDisplayNames[2 * i]}
                        </label>
                        <p className="row">{fieldDescriptions[2 * i]}</p>
                        <div className="row">
                          <CustomScoredSelect
                            field={fieldIDNames[2 * i]}
                            type="text"
                            className="tk-field form-control"
                            id={fieldIDNames[2 * i]}
                            placeholder=""
                            readOnly={!edit}
                            resources={resources}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="col-sm-12">
                        <label
                          htmlFor={fieldIDNames[2 * i + 1]}
                          className="row"
                        >
                          {fieldDisplayNames[2 * i + 1]}
                        </label>
                        <p className="row">{fieldDescriptions[2 * i + 1]}</p>
                        <div className="row">
                          <CustomScoredSelect
                            field={fieldIDNames[2 * i + 1]}
                            type="text"
                            className="tk-field form-control"
                            id={fieldIDNames[2 * i + 1]}
                            placeholder=""
                            readOnly={!edit}
                            resources={resources}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {nFields % 2 !== 0 && (
                <div key={nFields - 1} className="form-group row">
                  <div className="col-sm-6">
                    <div className="col-sm-12">
                      <label
                        htmlFor={fieldIDNames[nFields - 1]}
                        className="row"
                      >
                        {fieldDisplayNames[nFields - 1]}
                      </label>
                      <p className="row">{fieldDescriptions[nFields - 1]}</p>
                      <div className="row">
                        <CustomScoredSelect
                          field={fieldIDNames[nFields - 1]}
                          type="text"
                          className="tk-field form-control"
                          id={fieldIDNames[nFields - 1]}
                          placeholder=""
                          readOnly={!edit}
                          resources={resources}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Collapse>

            <FormControls
              noRightsToModify={values.noRightsToModify}
              edit={edit}
              values={formApi.values}
              errors={formApi.errors}
              setEditable={setEditable}
              submitForm={formApi.submitForm}
              resetForm={formApi.resetAll}
              cancelNew={cancelNew}
              remove={remove}
            />
          </form>
        )}
      </Form>
    );
  }
}
