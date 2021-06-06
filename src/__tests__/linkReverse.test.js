import { getReversedLink } from "../jarjestelmasalkku/JarjestelmaLinkUtils.js";

test("linking should be reversed correctly", () => {
    expect(getReversedLink({
        "tietojarjestelmaTunnus": 123,
        "linkattavaTunnus": 456,
        "suunta": "Luku",
        "tietovirta": "999"
    })).toEqual({
        "tietojarjestelmaTunnus": 456,
        "linkattavaTunnus": 123,
        "suunta": "Kirjoitus",
        "tietovirta": "999"
    });
});