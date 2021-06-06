import React from "react";
import CustomGriddle from "../grid/CustomGriddle";
import { RowDefinition, ColumnDefinition } from "griddle-react";
import { FyysinenTietovarantoFilter } from "./FyysinenTietovarantoFilter";
import { LinkToItem } from "../grid/CustomColumns";

export default class FyysinenTietovarantoGriddle extends React.Component {
    render() {
        const { dataStore, itemUrl } = this.props;

        return (
            <CustomGriddle
                dataStore={dataStore}
                customfilter={FyysinenTietovarantoFilter}
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
                </RowDefinition>
            </CustomGriddle>
        );
    }
}
