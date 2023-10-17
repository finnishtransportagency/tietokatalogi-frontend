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
            // Regex explanation: find a line of text only containing the word "Yhteystiedot", with possibly some non-alphanumeric or white-space characters in the beginning or the end
            // I.e., if the word "Yhteystiedot" occurs in the middle of a sentence, it is not found by the regex
            // Reason for this pattern is due to how our text is stored in the database
            const relevantText = sideText.split(/^[^a-zA-Z\d\s:]*Yhteystiedot[^a-zA-Z\d\s:]*$/mg)[1]
            if(!relevantText) setSideText('Tietoa ei löytynyt, tarkista että etusivussa löytyy sivutiedosta tieto muodossa "### Yhteystiedot"')
            else setSideText(relevantText);
        });
    }, []);

    return (
        <div className="contacts">
            <h2>Yhteystiedot</h2>
            {loading ? <p>Ladataan...</p> : (
                <EditableFrontPageDisplay markdown={sideText} />
            )}
        </div>
    );
};

export { ContactsView };
