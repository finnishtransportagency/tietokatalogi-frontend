import React from "react";
import CustomGriddle from "../grid/CustomGriddle";
import { RowDefinition, ColumnDefinition } from "griddle-react";
import { TietosuojavastaavaFilter } from "./TietosuojavastaavaFilter";
import { LinkToItem } from "../grid/CustomColumns";

export default class TietosuojavastaavaGriddle extends React.Component {
    render() {
        const { dataStore } = this.props;

        return (
            <CustomGriddle
                dataStore={dataStore}
                customfilter={TietosuojavastaavaFilter}
            >
                <RowDefinition>
                    <ColumnDefinition
                        id="nimi"
                        customComponent={LinkToItem}
                        customHeadingComponent={() => null}
                    />
                </RowDefinition>
            </CustomGriddle>
        );
    }
}
