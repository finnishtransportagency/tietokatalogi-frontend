import React from "react";
import CustomGriddle from "../grid/CustomGriddle";
import { RowDefinition, ColumnDefinition } from "griddle-react";
import { SovellusFilter } from "./SovellusFilter";
import {LinkToItemWithLinkKey} from "../grid/CustomColumns";

export default class SovellusGriddle extends React.Component {
    render() {
        const { dataStore, itemUrl } = this.props;

        return (
            <CustomGriddle
                dataStore={dataStore}
                customfilter={SovellusFilter}
                itemUrl={itemUrl}
            >
                <RowDefinition>
                    <ColumnDefinition
                        id="aliasNimet"
                        itemUrl={itemUrl}
                        width={"30%"}
                        customComponent={LinkToItemWithLinkKey("aliasNimet")}
                        customHeadingComponent={() => null}
                    />
                    <ColumnDefinition
                        id="nimi"
                        width={"20%"}
                        customHeadingComponent={() => null}
                    />
                    <ColumnDefinition
                        id="valmistaja"
                        width={"15%"}
                        customHeadingComponent={() => null}
                    />
                    <ColumnDefinition
                        id="kayttojarjestelmavaatimus"
                        width={"15%"}
                        customHeadingComponent={() => null}
                    />
                </RowDefinition>
            </CustomGriddle>
        );
    }
}
