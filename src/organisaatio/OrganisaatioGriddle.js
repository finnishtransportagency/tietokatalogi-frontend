import React from "react";
import CustomGriddle from "../grid/CustomGriddle";
import { RowDefinition, ColumnDefinition } from "griddle-react";
import { OrganisaatioFilter } from "./OrganisaatioFilter";
import { LinkToItem } from "../grid/CustomColumns";

export default class OrganisaatioGriddle extends React.Component {
    render() {
        const { dataStore } = this.props;

        return (
            <CustomGriddle
                dataStore={dataStore}
                customfilter={OrganisaatioFilter}
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
