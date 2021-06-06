import React from "react";
import { FormField } from "react-form";
import Select from "react-select";
import { getFieldOptions } from "./SelectHelpers";

class CustomAreaCodedSelectInner extends React.Component {
    render () {
        const { resources, fieldApi, readOnly } = this.props;
        const fieldOptions = getFieldOptions(resources, fieldApi.getFieldName(), true);

        return (
            <Select
                className="tk-field form-control"
                options={fieldOptions}
                value={this.props.fieldApi.getValue()}
                onChange={(selection) => this.props.fieldApi.setValue(
                    selection && selection.value
                )}
                disabled={readOnly}
            />
        );
    }
}

export const CustomAreaCodedSelect = FormField(CustomAreaCodedSelectInner);