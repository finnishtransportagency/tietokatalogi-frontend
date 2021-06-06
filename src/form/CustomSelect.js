import React from "react";
import { FormField } from "react-form";
import Select from "react-select";
import { lowerWithoutScandics } from "../utils";
import { observer } from "mobx-react";

@observer
class CustomSelectWrapper extends React.Component {
    getStandardYlataso(ylataso, ylatasoList) {
        let result;
        result = Object.values(ylatasoList).find(
            currYlataso => currYlataso.toLowerCase() === ylataso.toLowerCase()
        );

        // NB boilerplate for handling data misshapen by bug:
        // "TIET-238 Palvelun ylätaso tulee pienillä kirjaimilla"
        if (!result) {
            result = Object.values(ylatasoList).find(
                currYlataso =>
                    lowerWithoutScandics(currYlataso) ===
                    lowerWithoutScandics(ylataso)
            );
        }
        if (!result) result = "";
        return result;
    }

    handleChange = selection => {
        if (this.props.onChange) this.props.onChange(selection);
        else if (selection && selection.value)
            this.props.fieldApi.setValue(selection.value);
        else
            this.props.fieldApi.setValue(null);

    };

    render() {
        const {
            fieldApi,
            readOnly,
            resourceField = null,
            useID = false,
            palveluCustomOptions,
            className,
            ...rest
        } = this.props;

        const { getError } = fieldApi;

        const { getValue, setTouched } = fieldApi;
        const field = fieldApi.getFieldName();

        let options = [];

        // Use "resourceField" if specified else "field".
        // If field is array (see react-form doc) take the last item
        let fieldName = resourceField;
        if (!fieldName)
            fieldName = Array.isArray(field) ? field.slice(-1)[0] : field;
    

        const resources = this.props.resources || {}; // destructuring default does not apply to null
        const fieldResources = resources[fieldName] || {};

        Object.entries(fieldResources).forEach(([key, value]) => {
            const optionValue = useID ? parseInt(key, 10) : value;
            options.push({ value: optionValue, label: value });
        });


        options = options.sort((a, b) => a.label.localeCompare(b.label));
        let val = getValue();

        if (palveluCustomOptions) {
            val = this.getStandardYlataso(
                palveluCustomOptions.currYlataso,
                palveluCustomOptions.ylatasoList
            ).toUpperCase();
            options = options.map(item => {
                return { value: item.value.toUpperCase(), label: item.label };
            });
        }

        const error = getError();
        const newClassName =
            className + (error ? " react-form-input-error" : "");

        return (
            <div>
                <Select
                    field={field}
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

export const CustomSelect = FormField(CustomSelectWrapper);
