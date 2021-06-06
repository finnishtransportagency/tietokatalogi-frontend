import React from "react";
import CustomGriddle from "../grid/CustomGriddle";
import { RowDefinition, ColumnDefinition } from "griddle-react";
import { TietolajiFilter } from "./TietolajiFilter";
import { LinkToItem, ActiveStatus } from "../grid/CustomColumns";

export default class TietolajiGriddle extends React.Component {
    render() {
        const { dataStore, itemUrl } = this.props;

        return (
            <CustomGriddle
                dataStore={dataStore}
                customfilter={TietolajiFilter}
                itemUrl={itemUrl}
            >
                <RowDefinition>
                    <ColumnDefinition
                        id="nimi"
                        itemUrl={itemUrl}
                        width={"20%"}
                        customComponent={LinkToItem}
                        customHeadingComponent={() => null}
                    />
                    <ColumnDefinition
                        id="kuvaus"
                        width={"40%"}
                        customHeadingComponent={() => null}
                    />
                    <ColumnDefinition
                        id="tila"
                        customHeadingComponent={() => null}
                    />
                </RowDefinition>
            </CustomGriddle>
        );
    }
}
