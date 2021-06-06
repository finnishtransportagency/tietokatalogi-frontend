import React from "react";
import CustomGriddle from "../grid/CustomGriddle";
import { RowDefinition, ColumnDefinition } from "griddle-react";
import { TietovarantoFilter } from "./TietovarantoFilter";
import { LinkToItem } from "../grid/CustomColumns";

export default class TietovarantoGriddle extends React.Component {
    render() {
        const { dataStore } = this.props;

        return (
            <CustomGriddle
                dataStore={dataStore}
                customfilter={TietovarantoFilter}
            >
                <RowDefinition>
                    <ColumnDefinition
                        id="nimi"
                        width={"20%"}
                        customComponent={LinkToItem}
                        customHeadingComponent={() => <span>Nimi</span>}
                    />
                    <ColumnDefinition
                        id="kuvaus"
                        width={"40%"}
                        customHeadingComponent={() => <span>Kuvaus</span>}
                    />
                    <ColumnDefinition
                        id="vastaava"
                        customHeadingComponent={() => <span>Vastaava</span>}
                    />
                    <ColumnDefinition
                        id="lisatieto"
                        customHeadingComponent={() => <span>Lisätieto</span>}
                    />
                </RowDefinition>
            </CustomGriddle>
        );
    }
}
