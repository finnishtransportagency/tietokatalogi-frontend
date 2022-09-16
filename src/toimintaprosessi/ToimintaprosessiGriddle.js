import React from "react";
import CustomGriddle from "../grid/CustomGriddle";
import { RowDefinition, ColumnDefinition } from "griddle-react";
import { ToimintaprosessiFilter } from "./ToimintaprosessiFilter";
import { LinkifiedItem, LinkToItem } from "../grid/CustomColumns";

export default class ToimintaprosessiGriddle extends React.Component {
  render() {
    const { dataStore } = this.props;

    return (
      <CustomGriddle
        dataStore={dataStore}
        customfilter={ToimintaprosessiFilter}
      >
        <RowDefinition>
          <ColumnDefinition
            id="nimi"
            width={"20%"}
            customComponent={LinkToItem}
            customHeadingComponent={() => null}
          />
          <ColumnDefinition
            id="vastaava_organisaatio"
            customHeadingComponent={() => null}
          />
          <ColumnDefinition
            id="tyotila"
            customComponent={({ value }) => <LinkifiedItem value={value} />}
            customHeadingComponent={() => null}
          />
        </RowDefinition>
      </CustomGriddle>
    );
  }
}
