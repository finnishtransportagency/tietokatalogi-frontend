import React from "react";
import CustomGriddle from "../grid/CustomGriddle";
import { RowDefinition, ColumnDefinition } from "griddle-react";
import { TietojarjestelmapalveluFilter } from "../tietojarjestelmapalvelu/TietojarjestelmapalveluFilter";
import { LinkToItem } from "../grid/CustomColumns";

export default class TietojarjestelmapalveluGriddle extends React.Component {
    render() {
        const { dataStore, itemUrl} = this.props;

        return (
            <CustomGriddle
                dataStore={dataStore}
                customfilter={TietojarjestelmapalveluFilter}
                itemUrl={itemUrl}
            >
                <RowDefinition>
                    <ColumnDefinition
                        id="nimi"
                        itemUrl={itemUrl}
                        customComponent={LinkToItem}
                        customHeadingComponent={() => null}
                    />
                    <ColumnDefinition
                        id="kuvaus"
                        customHeadingComponent={() => null}
                    />
                </RowDefinition>
            </CustomGriddle>
        );
    }
}
