import React from "react";
import { EditableMainPageView } from './EditableMainPageView';


const MainView = () => {
    const versionNumber = process.env.REACT_APP_VERSION_HASH || null;
    const versionEl = versionNumber ? (
        <small>versiotiiviste: {versionNumber}</small>
    ) : null;


    return (
        <div>
            <h1>Tietokatalogi</h1>
            {versionEl}
            <EditableMainPageView />
        </div>
    );
};

export { MainView };
