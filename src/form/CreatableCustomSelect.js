import React from "react";
import { Creatable } from "react-select";
import { FormField } from "react-form";

/**
 * A select menu that also allows free text.
 */
export class CreatableWrapper extends React.Component {

    handleChange = selection => {
        if (selection && selection.value)
            this.props.fieldApi.setValue(selection.value);
        else
            this.props.fieldApi.setValue(null);
    };


    render() {

        const {
            fieldApi,
            readOnly,
            className,
            ...rest
        } = this.props;

        const { getError, getValue, setTouched } = fieldApi;
        
        const fieldName = fieldApi.getFieldName();
        
        const resources = this.props.resources || {}; // destructuring default does not apply to null
        const fieldResources = resources[fieldName] || {};
        
        let options = [];
        Object.entries(fieldResources).forEach(([key, value]) => {
            options.push({ value: value, label: value });
        });
        // If the current value is not in options (free text), add it there
        const val = getValue();
        if (val && !options.map(obj => obj.value).includes(val)) {
            options.push({ value: val, label: val });
        }
        options = options.sort((a, b) => a.label.localeCompare(b.label));

        const error = getError();
        const newClassName =
            className + (error ? " react-form-input-error" : "");

        return (
            <div>
                <Creatable
                    field={fieldName}
                    options={options}
                    disabled={readOnly}
                    value={val}
                    className={newClassName}
                    onChange={this.handleChange}
                    onBlur={() => setTouched()}
                    noResultsText="Ei tuloksia"
                    promptTextCreator={label => `Luo uusi: ${label}`}
                    clearable={true}
                    resetValue={""}
                    {...rest}
                />
                {error ? (
                    <small className="react-form-message react-form-message-error">
                        {error}
                    </small>
                ) : null}
            </div>
        );
    }
}

export const CreatableCustomSelect = FormField(CreatableWrapper);