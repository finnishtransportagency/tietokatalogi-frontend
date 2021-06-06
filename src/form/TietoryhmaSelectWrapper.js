import React from "react";
import Select from "react-select";

/**
 * Renders a disabled multiple choice menu for displaying tietoryhma values.
 */
export const TietoryhmaSelectWrapper = (props) => {

    const options = props.data;
    const values = options.map(o => o.value);

    return (
        <Select
            value={values}
            options={options}
            multi={true}
            disabled={true}
            clearable={props.clearable}
            noResultsText={props.noResultsText}
        />
    );
};