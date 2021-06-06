import React from "react";
import { FormField } from "react-form";
import Select from "react-select";
import { getFieldOptions } from "./SelectHelpers";

class CustomMultiselectInner extends React.Component {
    render () {
        const { resources, fieldApi, useID, readOnly } = this.props;
        const fieldOptions = getFieldOptions(resources, fieldApi.getFieldName(), useID);

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

export const CustomMultiselect = FormField(CustomMultiselectInner);