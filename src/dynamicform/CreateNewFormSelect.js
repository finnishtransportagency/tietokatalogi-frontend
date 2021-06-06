import React from "react";
import Select from "react-select";
import { observer } from "mobx-react";
import { FormField } from "react-form";
import { getFieldOptions } from "../form/SelectHelpers";


/**
 * This select component renders its options based on
 * the given store and the resource name.
 */
@observer
class CreateNewFormSelectInner extends React.Component {
    render () {
        const { resourceStore, resourceName, useID } = this.props;
        const fieldOptions = getFieldOptions(resourceStore.resources, resourceName, useID);

        return (
            <Select
                className="tk-field form-control tk-field-autoheight"
                field={this.props.name}
                options={fieldOptions}
                value={this.props.fieldApi.getValue()}
                onChange={(selection) => {
                    this.props.fieldApi.setValue((selection && 
                        (this.props.multi ? selection.map(s => s.value) : selection.value)));
                }}
                multi={this.props.multi}
            />
        );
    }
}

export const CreateNewFormSelect = FormField(CreateNewFormSelectInner);
