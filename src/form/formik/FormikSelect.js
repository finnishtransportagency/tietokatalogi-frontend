import React from "react";

import Select from "react-select";
import { useField } from "formik";
import { getFieldOptions } from "../SelectHelpers";

export const FormikCustomSelect = ({
    label,
    name,
    readOnly,
    resources,
    useID = false,
    isMulti = false
}) => {
    const [field, meta, helpers] = useField(name);
    const options = getFieldOptions(resources, field.name, useID);

    return (
        <div className="col-sm-12">
            <label htmlFor={name} className="row">
                {label}
            </label>
            <div className="row">
                <Select
                    {...field}
                    onChange={selection => {
                        helpers.setValue((selection && 
                            (isMulti ? selection.map(s => s.value) : selection.value)));
                    }}
                    id={name}
                    options={options}
                    className={"tk-field form-control" + (isMulti ?  " tk-field-autoheight" : "")}
                    readOnly={readOnly}
                    noResultsText="Ei tuloksia"
                    placeholder=""
                    disabled={readOnly}
                    multi={isMulti}
                />
            </div>
            {meta.touched && meta.error &&
                    <small className="react-form-message react-form-message-error">
                        {meta.error}
                    </small>}
        </div>
    );
};