import React from "react";
import { FormField } from "react-form";
import Select from "react-select";

/**
 * A wrapper that manages and renders a multiple choice select menu based on
 * tietolaji options.
 */
class SelectWrapper extends React.Component {

    componentDidUpdate() {
        // React to outside change (changed jarjestelma select)
        const propValues = this.props.values;
        const fieldApiValues = this.props.fieldApi.getValue();
        if (propValues && fieldApiValues && !valuesEquals(propValues, fieldApiValues)) {
            this.props.fieldApi.setValue(propValues);
        }
    }

    render() {        
        return (
            <Select
                onChange={value => this.props.fieldApi.setValue(value)}
                value={this.props.values}
                options={this.props.options}
                multi={true}
                disabled={this.props.disabled}
                clearable={this.props.clearable}
                noResultsText={this.props.noResultsText}
            />
        );
    }
}

/**
 * Equality comparison for arrays of selected values
 * @param {[]} values1 
 * @param {[]} values2 
 */
const valuesEquals = (values1, values2) => {
    if (values1.length !== values2.length) return false;
    for (let i = 0; i < values1.length; i++) {
        if (values1[i].value !== values2[i].value) return false;
    }
    return true;
};

export const TietolajiSelectWrapper = FormField(SelectWrapper);