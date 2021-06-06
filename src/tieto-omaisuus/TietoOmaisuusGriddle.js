import React from "react";
import CustomGriddle from "../grid/CustomGriddle";
import { RowDefinition, ColumnDefinition } from "griddle-react";
import { TietoOmaisuusFilter } from "./TietoOmaisuusFilter";
import { LinkToItemWithLinkKey } from "../grid/CustomColumns";

export default class TietoOmaisuusGriddle extends React.Component {
    render() {
        const { dataStore } = this.props;
        
        return (
            <CustomGriddle
                dataStore={dataStore}
                customfilter={TietoOmaisuusFilter}
            >
                <RowDefinition>
                    <ColumnDefinition
                        id="tietojarjestelma_nimi"
                        customComponent={LinkToItemWithLinkKey("tietojarjestelma_nimi")}
                        customHeadingComponent={() => null}
                    />
                </RowDefinition>
            </CustomGriddle>
        );
    }
}
