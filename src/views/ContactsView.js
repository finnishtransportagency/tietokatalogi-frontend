import React, { useEffect, useState } from "react";
import { getTest } from "../axios/editableFrontPageContainer";
import { EditableFrontPageDisplay } from "../frontpage/EditableFrontPageDisplay";

const ContactsView = () => {
    const [sideText, setSideText] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getTest().then((data) => {
            setLoading(false);
            if (!data) return;
            const {sideText = "" } = data;
            const relevantText = sideText.split("#").find((s) => s.includes("Yhteystiedot"))
            if(!relevantText || relevantText === "") setSideText('Tietoa ei löytynyt, tarkista että etusivussa löytyy sivutiedosta tieto muodossa "### Yhteysteidot"')
            else setSideText(relevantText);
        });
    }, []);

    return (
        <div className="contacts-asdasd">
            <h2>Yhteystiedot</h2>
            {loading ? <p>Ladataan...</p> : (
                <EditableFrontPageDisplay markdown={sideText} />
            )}
        </div>
    );
};

export { ContactsView };
