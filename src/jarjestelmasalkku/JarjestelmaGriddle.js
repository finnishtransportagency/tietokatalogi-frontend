import React from "react";
import CustomGriddle from "../grid/CustomGriddle";
import { RowDefinition, ColumnDefinition } from "griddle-react";
import { JarjestelmaFilter } from "./JarjestelmaFilter";
import { LinkToItem } from "../grid/CustomColumns";

export default class JarjestelmaGriddle extends React.Component {
    render() {
        const { dataStore, itemUrl } = this.props;

        return (
            <CustomGriddle
                dataStore={dataStore}
                customfilter={JarjestelmaFilter}
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
                        id="jarjestelmaalue"
                        customHeadingComponent={() => null}
                    />
                    <ColumnDefinition
                        id="jarjestelmatyyppi"
                        customHeadingComponent={() => null}
                    />
                    <ColumnDefinition
                        id="elinkaaritila"
                        customHeadingComponent={() => null}
                    />
                </RowDefinition>
            </CustomGriddle>
        );
    }
}
