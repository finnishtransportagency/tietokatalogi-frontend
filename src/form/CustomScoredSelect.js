import React from "react";
import { FormField } from "react-form";
import Select from "react-select";
import { observer } from "mobx-react";

/**
 * A select wrapper for kasite data with a "score" field.
 */
@observer
class CustomSelectWrapper extends React.Component {

    handleChange = selection => {
        if (selection && Number.isInteger(selection.value))
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

        let options = [];


        const fieldName = fieldApi.getFieldName();
    

        const resources = this.props.resources || {}; // destructuring default does not apply to null
        const fieldResources = resources[fieldName] || {};

        Object.entries(fieldResources).forEach(([key, value]) => {
            const optionValue = Number(key);
            options.push({ value: optionValue, label: `${value} (${Number(key)} p)` });
        });


        options = options.sort((a, b) => a - b);
        let val = getValue();

        const error = getError();
        const newClassName =
            className + (error ? " react-form-input-error" : "");

        return (
            <div>
                <Select
                    options={options}
                    disabled={readOnly}
                    value={val}
                    className={newClassName}
                    onChange={this.handleChange}
                    onBlur={() => setTouched()}
                    noResultsText="Ei tuloksia"
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

export const CustomScoredSelect = FormField(CustomSelectWrapper);
