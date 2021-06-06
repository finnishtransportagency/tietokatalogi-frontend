import React from "react";

const ContactsView = () => {
    const contact1 = {
        sector: "Tietoarkkitehtuuri",
        contactPerson: {
            name: "Tomi Mykkänen",
            phone: "029 534 3052",
            mobile: "040 673 6562",
            email: "tomi.mykkanen@vayla.fi"
        }
    };
    const contact2 = {
        sector: "Järjestelmäsalkku",
        contactPerson: {
            name: "Ivan Guerra-Toivonen",
            phone: "029 534 3295",
            mobile: "050 470 4178",
            email: "ivan.guerra-toivonen@vayla.fi"
        }
    };
    const contact3 = {
        sector: "Palvelukatalogi",
        contactPerson: {
            name: "Miina Vina",
            phone: "029 534 3213",
            mobile: "050 512 9341",
            email: "miina.vina@vayla.fi"
        }
    };

    const contact4 = {
        sector: "Sovellussalkku",
        contactPerson: {
            name: "Toni Kiri",
            phone: "029 534 3179",
            mobile: null,
            email: "toni.kiri@vayla.fi"
        }
    };

    const contactInfo = (contact, id) => {
        return (
            <div key={id} className="col-md-6">
                <h3>{contact.sector}</h3>
                {Object.entries(contact.contactPerson).map(function(
                    value,
                    idx
                ) {
                    const bold = value[0] === "name";
                    const val = value[1];
                    if (val === null) {
                        return <div key={id} />;
                    }
                    if (value[0] === "email")
                        return (
                            <div key={`${id}-${idx}`}>
                                <a href={`mailto:${val}`}>{val}</a>
                            </div>
                        );
                    return (
                        <div key={`${id}-${idx}`}>
                            {bold && <h4>{`${val}`}</h4>}
                            {!bold && <p>{`${val}`}</p>}
                        </div>
                    );
                })}
            </div>
        );
    };

    const contacts = [contact1, contact2, contact3, contact4];

    return (
        <div className="contacts">
            <h2>Yhteystiedot</h2>
            <div className="form-group row">
                {contacts.map(function(contact, idx) {
                    return contactInfo(contact, idx);
                })}
            </div>
        </div>
    );
};

export { ContactsView };
