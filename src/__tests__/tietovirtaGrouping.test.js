import { convertLinksFromFetchedToMultiselectFormat, convertLinksFromMultiselectToSendableFormat,
    getKeyForLinkTvPair, getKeyForJarjestelmaLink } from "../jarjestelmasalkku/JarjestelmaLinkUtils.js";


describe("transformation from fetched to multiselect format", () => {

    it("should correctly group up entries", () => {

        const fetchedFormatLinks = [
            {
                "id": 221,
                "tietojarjestelmaTunnus": 320,
                "linkattavaTunnus": 309,
                "suunta": "Kirjoitus",
                "tietojarjestelmapalveluTunnus": 21,
                "tietovirta": "398",
                "tyyppi": "Järjestelmä"
            },
            {
                "id": 222,
                "tietojarjestelmaTunnus": 320,
                "linkattavaTunnus": 309,
                "suunta": "Kirjoitus",
                "tietojarjestelmapalveluTunnus": 21,
                "tietovirta": "401",
                "tyyppi": "Järjestelmä"
            },
            {
                "id": 181,
                "tietojarjestelmaTunnus": 320,
                "linkattavaTunnus": 309,
                "suunta": "Kirjoitus",
                "tietojarjestelmapalveluTunnus": 2,
                "tietovirta": "447",
                "tyyppi": "Järjestelmä",
                "isReversed": true
            },
            {
                "id": 163,
                "tietojarjestelmaTunnus": 320,
                "linkattavaTunnus": 309,
                "suunta": "Luku",
                "tietojarjestelmapalveluTunnus": 1,
                "tietovirta": "143",
                "tyyppi": "Järjestelmä"
            },
            {
                "id": 201,
                "tietojarjestelmaTunnus": 320,
                "linkattavaTunnus": 309,
                "suunta": "Kirjoitus",
                "tietojarjestelmapalveluTunnus": 21,
                "tietovirta": "415",
                "tyyppi": "Järjestelmä",
                "isReversed": true
            }
        ];
    
        const multiselectFormatLinks = [
            {
                "id": 221,
                "tietojarjestelmaTunnus": 320,
                "linkattavaTunnus": 309,
                "suunta": "Kirjoitus",
                "tietojarjestelmapalveluTunnus": 21,
                "tietovirta": [
                    398,
                    401,
                    415
                ],
                "tyyppi": "Järjestelmä"
            },
            {
                "id": 181,
                "tietojarjestelmaTunnus": 320,
                "linkattavaTunnus": 309,
                "suunta": "Kirjoitus",
                "tietojarjestelmapalveluTunnus": 2,
                "tietovirta": [
                    447
                ],
                "tyyppi": "Järjestelmä",
                "isReversed": true
            },
            {
                "id": 163,
                "tietojarjestelmaTunnus": 320,
                "linkattavaTunnus": 309,
                "suunta": "Luku",
                "tietojarjestelmapalveluTunnus": 1,
                "tietovirta": [
                    143
                ],
                "tyyppi": "Järjestelmä"
            }
        ];
    
        const dataToStore = { 
            "Järjestelmä|309|Kirjoitus|21|320|398": { id: 221, isReversed: undefined },
            "Järjestelmä|309|Kirjoitus|21|320|401": { id: 222, isReversed: undefined },
            "Järjestelmä|309|Kirjoitus|2|320|447": { id: 181, isReversed: true },
            "Järjestelmä|309|Luku|1|320|143": { id: 163, isReversed: undefined },
            "Järjestelmä|309|Kirjoitus|21|320|415": { id: 201, isReversed: true }
        };

        const [ converted, metadata ] = convertLinksFromFetchedToMultiselectFormat(fetchedFormatLinks);
        expect(converted).toEqual(multiselectFormatLinks);
        expect(metadata).toEqual(dataToStore);

    });

    it("should keep two otherwise different links separated even if they have the same tietojarjestelmapalvelu", () => {
        expect(convertLinksFromFetchedToMultiselectFormat(
            [
                {
                    "id": 1,
                    "tietojarjestelmaTunnus": 1,
                    "linkattavaTunnus": 2,
                    "suunta": "Kirjoitus",
                    "tietojarjestelmapalveluTunnus": 1,
                    "tietovirta": "1",
                    "tyyppi": "Järjestelmä"
                },
                {
                    "id": 2,
                    "tietojarjestelmaTunnus": 1,
                    "linkattavaTunnus": 2,
                    "suunta": "Kirjoitus",
                    "tietojarjestelmapalveluTunnus": 1,
                    "tietovirta": "2",
                    "tyyppi": "Järjestelmä"
                },
                {
                    "id": 3,
                    "tietojarjestelmaTunnus": 1,
                    "linkattavaTunnus": 3,
                    "suunta": "Kirjoitus",
                    // note how the following tjp ids are the same as above but should still belong to a different link
                    "tietojarjestelmapalveluTunnus": 1,
                    "tietovirta": "1",
                    "tyyppi": "Järjestelmä"
                },
                {
                    "id": 4,
                    "tietojarjestelmaTunnus": 1,
                    "linkattavaTunnus": 3,
                    "suunta": "Kirjoitus",
                    "tietojarjestelmapalveluTunnus": 1,
                    "tietovirta": "3",
                    "tyyppi": "Järjestelmä"
                }
            ]
        )[0]).toEqual(
            [
                {
                    "id": 1,
                    "tietojarjestelmaTunnus": 1,
                    "linkattavaTunnus": 2,
                    "suunta": "Kirjoitus",
                    "tietojarjestelmapalveluTunnus": 1,
                    "tietovirta": [ 1, 2 ],
                    "tyyppi": "Järjestelmä"
                },
                {
                    "id": 3,
                    "tietojarjestelmaTunnus": 1,
                    "linkattavaTunnus": 3,
                    "suunta": "Kirjoitus",
                    "tietojarjestelmapalveluTunnus": 1,
                    "tietovirta": [ 1, 3 ],
                    "tyyppi": "Järjestelmä"
                }
            ]
        );

 
    });

    it("should handle reversed links correctly", () => {
        const fetched = [
            { 
                id: 1, tietojarjestelmaTunnus: 1, linkattavaTunnus: 2, suunta: "Luku", tietojarjestelmapalveluTunnus: 1,
                tietovirta: 1, tyyppi: "Jarjestelma" 
            },
            {
                id: 2, tietojarjestelmaTunnus: 1, linkattavaTunnus: 2, suunta: "Luku", tietojarjestelmapalveluTunnus: 1,
                tietovirta: 2, tyyppi: "Jarjestelma", isReversed: true 
            },
            {
                id: 3, tietojarjestelmaTunnus: 2, linkattavaTunnus: 1, suunta: "Luku", tietojarjestelmapalveluTunnus: 2,
                tietovirta: 1, tyyppi: "Jarjestelma" 
            }
        ];
        const expected = [
            {
                id: 1, tietojarjestelmaTunnus: 1, linkattavaTunnus: 2, suunta: "Luku", tietojarjestelmapalveluTunnus: 1,
                tietovirta: [1, 2], tyyppi: "Jarjestelma"
            },
            {
                id: 3, tietojarjestelmaTunnus: 2, linkattavaTunnus: 1, suunta: "Luku", tietojarjestelmapalveluTunnus: 2,
                tietovirta: [1], tyyppi: "Jarjestelma" 
            }
        ];
        expect(convertLinksFromFetchedToMultiselectFormat(fetched)[0]).toEqual(expected);
    });

});


describe("transformation from multiselect to sendable format", () => {

    it("should split tietovirta to separate rows and match metadata to links", () => {
        expect(convertLinksFromMultiselectToSendableFormat([
            { 
                id: 123,
                tyyppi: "Järjestelmä",
                suunta: "Kirjoitus",
                tietojarjestelmaTunnus: 1,
                linkattavaTunnus: 2,
                tietojarjestelmapalveluTunnus: 1,
                tietovirta: [10, 20] 
            },
            { 
                id: 234,
                tyyppi: "Järjestelmä",
                suunta: "Kirjoitus",
                tietojarjestelmaTunnus: 1,
                linkattavaTunnus: 3,
                tietojarjestelmapalveluTunnus: 2,
                tietovirta: [30] 
            }
        ], {
            "Järjestelmä|2|Kirjoitus|1|1|20" : { id: 2, isReversed: undefined },
            "Järjestelmä|2|Kirjoitus|1|1|10" : { id: 1, isReversed: true },
            "Järjestelmä|3|Kirjoitus|2|1|30" : { id: 3, isReversed: true }
        })).toEqual([
            { 
                id: 1,
                tyyppi: "Järjestelmä",
                suunta: "Kirjoitus",
                tietojarjestelmaTunnus: 1,
                linkattavaTunnus: 2,
                tietojarjestelmapalveluTunnus: 1,
                tietovirta: 10,
                isReversed: true
            },
            { 
                id: 2,
                tyyppi: "Järjestelmä",
                suunta: "Kirjoitus",
                tietojarjestelmaTunnus: 1,
                linkattavaTunnus: 2,
                tietojarjestelmapalveluTunnus: 1,
                tietovirta: 20
            },
            { 
                id: 3,
                tyyppi: "Järjestelmä",
                suunta: "Kirjoitus",
                tietojarjestelmaTunnus: 1,
                linkattavaTunnus: 3,
                tietojarjestelmapalveluTunnus: 2,
                tietovirta: 30,
                isReversed: true
            }
        ]);
    });

    it("should allow links to be created on different rows", () => {
        expect(convertLinksFromMultiselectToSendableFormat([
            { 
                id: null,
                tyyppi: "Järjestelmä",
                suunta: "Kirjoitus",
                tietojarjestelmaTunnus: 1,
                linkattavaTunnus: 2,
                tietojarjestelmapalveluTunnus: 1,
                tietovirta: [10] 
            },
            { 
                id: null,
                tyyppi: "Järjestelmä",
                suunta: "Kirjoitus",
                tietojarjestelmaTunnus: 1,
                linkattavaTunnus: 2,
                tietojarjestelmapalveluTunnus: 1,
                tietovirta: [20] 
            }
        ], {
            "Järjestelmä|2|Kirjoitus|1|1|10" : { id: 1, isReversed: undefined },
            "Järjestelmä|2|Kirjoitus|1|1|20" : { id: 2, isReversed: undefined }
        })).toEqual([
            { 
                id: 1,
                tyyppi: "Järjestelmä",
                suunta: "Kirjoitus",
                tietojarjestelmaTunnus: 1,
                linkattavaTunnus: 2,
                tietojarjestelmapalveluTunnus: 1,
                tietovirta: 10
            },
            { 
                id: 2,
                tyyppi: "Järjestelmä",
                suunta: "Kirjoitus",
                tietojarjestelmaTunnus: 1,
                linkattavaTunnus: 2,
                tietojarjestelmapalveluTunnus: 1,
                tietovirta: 20
            }
        ]);
    });

    it("should keep same tietovirta and tjp separated with otherwise different object values", () => {
        expect(convertLinksFromMultiselectToSendableFormat(
            [
                { 
                    id: null,
                    tyyppi: "Järjestelmä",
                    suunta: "Kirjoitus",
                    tietojarjestelmaTunnus: 1,
                    linkattavaTunnus: 2,
                    tietojarjestelmapalveluTunnus: 1,
                    tietovirta: [10, 20] 
                },
                { 
                    id: null,
                    tyyppi: "Järjestelmä",
                    suunta: "Kirjoitus",
                    tietojarjestelmaTunnus: 11,
                    linkattavaTunnus: 22,
                    tietojarjestelmapalveluTunnus: 1,
                    tietovirta: [10, 20] 
                }
            ],
            {
                "Järjestelmä|2|Kirjoitus|1|1|10": { id: 1, isReversed: undefined },
                "Järjestelmä|2|Kirjoitus|1|1|20": { id: 2, isReversed: undefined },
                "Järjestelmä|22|Kirjoitus|1|11|10": { id: 3, isReversed: undefined },
                "Järjestelmä|22|Kirjoitus|1|11|20": { id: 4, isReversed: undefined },
            }
        )).toEqual(
            [
                {
                    id: 1,
                    tyyppi: "Järjestelmä",
                    suunta: "Kirjoitus",
                    tietojarjestelmaTunnus: 1,
                    linkattavaTunnus: 2,
                    tietojarjestelmapalveluTunnus: 1,
                    tietovirta: 10
                },
                {
                    id: 2,
                    tyyppi: "Järjestelmä",
                    suunta: "Kirjoitus",
                    tietojarjestelmaTunnus: 1,
                    linkattavaTunnus: 2,
                    tietojarjestelmapalveluTunnus: 1,
                    tietovirta: 20
                },
                {
                    id: 3,
                    tyyppi: "Järjestelmä",
                    suunta: "Kirjoitus",
                    tietojarjestelmaTunnus: 11,
                    linkattavaTunnus: 22,
                    tietojarjestelmapalveluTunnus: 1,
                    tietovirta: 10
                },
                {
                    id: 4,
                    tyyppi: "Järjestelmä",
                    suunta: "Kirjoitus",
                    tietojarjestelmaTunnus: 11,
                    linkattavaTunnus: 22,
                    tietojarjestelmapalveluTunnus: 1,
                    tietovirta: 20
                }
            ]
        );
    });

    it("should allow creating a new entry", () => {
        const multiselectWithNewLink = [
            {
                "id": 1,
                "tietojarjestelmaTunnus": 10,
                "linkattavaTunnus": 20,
                "suunta": "Kirjoitus",
                "tietojarjestelmapalveluTunnus": 21,
                "tietovirta": [
                    1,
                    2,
                    3 // new entry
                ],
                "tyyppi": "Järjestelmä"
            },
        ];

        const metadata = {
            "Järjestelmä|20|Kirjoitus|21|10|1": { id: 1, isReversed: undefined },
            "Järjestelmä|20|Kirjoitus|21|10|2": { id: 2, isReversed: undefined }
        };

        const sendableWithNewLink = [
            {
                "id": 1,
                "tietojarjestelmaTunnus": 10,
                "linkattavaTunnus": 20,
                "suunta": "Kirjoitus",
                "tietojarjestelmapalveluTunnus": 21,
                "tietovirta": 1,
                "tyyppi": "Järjestelmä"
            },
            {
                "id": 2,
                "tietojarjestelmaTunnus": 10,
                "linkattavaTunnus": 20,
                "suunta": "Kirjoitus",
                "tietojarjestelmapalveluTunnus": 21,
                "tietovirta": 2,
                "tyyppi": "Järjestelmä"
            },
            {
                "id": null,
                "tietojarjestelmaTunnus": 10,
                "linkattavaTunnus": 20,
                "suunta": "Kirjoitus",
                "tietojarjestelmapalveluTunnus": 21,
                "tietovirta": 3,
                "tyyppi": "Järjestelmä"
            }
        ];
        expect(convertLinksFromMultiselectToSendableFormat(multiselectWithNewLink, metadata)).toEqual(sendableWithNewLink);
    });

    it("should allow removing an entry", () => {
        const multiselectWithRemovedLink = [
            {
                "id": 1,
                "tietojarjestelmaTunnus": 10,
                "linkattavaTunnus": 20,
                "suunta": "Kirjoitus",
                "tietojarjestelmapalveluTunnus": 21,
                "tietovirta": [
                    1,
                    // 2 is removed
                    3
                ],
                "tyyppi": "Järjestelmä"
            },
        ];

        const metadata = {
            "Järjestelmä|20|Kirjoitus|21|10|1": { id: 1, isReversed: undefined },
            "Järjestelmä|20|Kirjoitus|21|10|2": { id: 2, isReversed: undefined },
            "Järjestelmä|20|Kirjoitus|21|10|3": { id: 3, isReversed: undefined },
        };

        const sendableWithNewObject = [
            {
                "id": 1,
                "tietojarjestelmaTunnus": 10,
                "linkattavaTunnus": 20,
                "suunta": "Kirjoitus",
                "tietojarjestelmapalveluTunnus": 21,
                "tietovirta": 1,
                "tyyppi": "Järjestelmä"
            },
            {
                "id": 3,
                "tietojarjestelmaTunnus": 10,
                "linkattavaTunnus": 20,
                "suunta": "Kirjoitus",
                "tietojarjestelmapalveluTunnus": 21,
                "tietovirta": 3,
                "tyyppi": "Järjestelmä"
            }
        ];
        expect(convertLinksFromMultiselectToSendableFormat(multiselectWithRemovedLink, metadata)).toEqual(sendableWithNewObject);
    });

});



describe("creation of id keys", () => {
    it("should create a string key for fetched jarjestelma link", () => {
        const link = {
            "id": 1,
            "tietojarjestelmaTunnus": 1,
            "linkattavaTunnus": 2,
            "suunta": "Kirjoitus",
            "tietojarjestelmapalveluTunnus": 1,
            "tietovirta": "1",
            "tyyppi": "Järjestelmä",
            "isReversed": true
        };
        expect(getKeyForJarjestelmaLink(link)).toEqual(
            "Järjestelmä|2|Kirjoitus|1|1"
        );
    });

    it("should create a string key for grouped up jarjestelma link", () => {
        const link = {
            "id": null,
            "tietojarjestelmaTunnus": 1,
            "linkattavaTunnus": 2,
            "suunta": "Kirjoitus",
            "tietojarjestelmapalveluTunnus": 1,
            "tietovirta": [ 1, 2, 3, 4, 5 ],
            "tyyppi": "Järjestelmä",
        };
        expect(getKeyForJarjestelmaLink(link)).toEqual(
            "Järjestelmä|2|Kirjoitus|1|1"
        );
    });

    it("should create a new key based on the link key and tietovirta", () => {
        const linkKey = "Järjestelmä|2|Kirjoitus|1|1";
        expect(getKeyForLinkTvPair(linkKey, "123")).toEqual(
            "Järjestelmä|2|Kirjoitus|1|1|123"
        );
    });
});