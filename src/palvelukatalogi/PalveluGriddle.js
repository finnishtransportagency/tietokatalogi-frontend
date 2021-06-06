import React from "react";
import CustomGriddle from "../grid/CustomGriddle";
import { RowDefinition, ColumnDefinition } from "griddle-react";
import { PalveluFilter } from "./PalveluFilter";
import { LinkToItem } from "../grid/CustomColumns";

export default class PalveluGriddle extends React.Component {
    render() {
        const { dataStore, itemUrl } = this.props;

        return (
            <CustomGriddle
                dataStore={dataStore}
                customfilter={PalveluFilter}
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
                        id="ylataso"
                        customHeadingComponent={() => null}
                    />
                    <ColumnDefinition
                        id="otsikko"
                        customHeadingComponent={() => null}
                    />
                </RowDefinition>
            </CustomGriddle>
        );
    }
}
