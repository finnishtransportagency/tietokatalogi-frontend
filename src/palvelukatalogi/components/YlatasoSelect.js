import React from "react";
import Select from "react-select";
import { useField, useFormikContext } from "formik";
import { getFieldOptions } from "../../form/SelectHelpers";

export const YlatasoSelect = ({ readOnly, resources }) => {
  const name = "ylataso";
  const [field, meta, helpers] = useField(name);

  const { setFieldValue } = useFormikContext();
  const options = getFieldOptions(resources, field.name, false);

  return (
    <div className="col-sm-12">
      <label htmlFor={name} className="row">
        Ylätaso
      </label>
      <div className="row">
        <Select
          {...field}
          onChange={(selection) => {
            setFieldValue("otsikko", "", false);
            helpers.setValue(selection && selection.value);
          }}
          id={name}
          options={options}
          className="tk-field form-control"
          readOnly={readOnly}
          noResultsText="Ei tuloksia"
          placeholder=""
          disabled={readOnly}
        />
      </div>
      {meta.touched && meta.error && (
        <small className="react-form-message react-form-message-error">
          {meta.error}
        </small>
      )}
    </div>
  );
};
