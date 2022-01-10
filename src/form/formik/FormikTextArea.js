import React from "react";
import { useField } from "formik";
import Linkify from "react-linkify";

export const FormikTextArea = ({ label, name, readOnly, rows = "5" }) => {
    const [field, meta] = useField(name);

    return (
        <div className="col-sm-12">
            <label htmlFor={name} className="row">
                {label}
            </label>

            <div className="row">
                {readOnly ? (
                    <div
                        name={name}
                        id={name}
                        className="tk-field form-control textarea-div"
                        placeholder=""
                        readOnly={true}
                        {...field}
                    >
                        <Linkify properties={{target: "_blank", rel:"noopener noreferrer"}}>
                            {field.value}
                        </Linkify>
                    </div>
                ) : (
                    <textarea
                        name={name}
                        id={name}
                        className="tk-field form-control"
                        placeholder=""
                        rows={rows}
                        {...field}
                    />
                )}
            </div>

            {meta.touched && meta.error &&
                    <small className="react-form-message react-form-message-error">
                        {meta.error}
                    </small>}
        </div>
    );
};