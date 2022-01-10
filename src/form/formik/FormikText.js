import React from "react";
import { useField } from "formik";

export const FormikText = ({ label, name, readOnly }) => {
    const [field, meta] = useField(name);

    return (
        <div className="col-sm-12">
            <label htmlFor={name} className="row">
                {label}
            </label>
            <div className="row">
                <input
                    {...field}
                    id={name}
                    placeholder=""
                    type="text"
                    className="tk-field form-control"
                    readOnly={readOnly}
                />
            </div>
            {meta.touched && meta.error &&
                    <small className="react-form-message react-form-message-error">
                        {meta.error}
                    </small>}
        </div>
    );
};
