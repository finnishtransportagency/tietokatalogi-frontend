import React from "react";
import { FormField } from "react-form";
import Select from "react-select";

class CustomSelitysMultiselectInner extends React.Component {
    render () {
        const { fieldApi, useID, readOnly } = this.props;

        const fieldName = fieldApi.getFieldName();
        const resources = this.props.resources || {}; // destructuring default does not apply to null
        const fieldResources = resources[fieldName] || {};

        const fieldOptions = Object.entries(fieldResources)
            .map(([k, v]) => ({value: useID ? k : v, label: `${v.value} (${v.selitys})`}))
            .sort((a, b) => a.label.localeCompare(b.label));

        return (
            <Select
                className="tk-field form-control tk-field-autoheight"
                options={fieldOptions}
                value={this.props.fieldApi.getValue()}
                onChange={(selection) => this.props.fieldApi.setValue(
                    selection && selection.map(s => s.value)
                )}
                multi={true}
                disabled={readOnly}
                noResultsText="Ei tuloksia"
            />
        );
    }
}

export const CustomSelitysMultiselect = FormField(CustomSelitysMultiselectInner);
