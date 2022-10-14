import * as React from "react";
import { useField } from "formik";
import { Creatable } from "react-select";
import { getFieldOptions } from "../SelectHelpers";

export const FormikCreatableCustomSelect = ({
  label,
  name,
  readOnly,
  resources,
}) => {
  const [field, meta, helpers] = useField(name);

  const initialOptions = getFieldOptions(resources, field.name, false);
  // If the current value is not in options (free text), add it there
  let options = [...initialOptions];
  const val = field.value;
  if (val && !initialOptions.map((obj) => obj.value).includes(val)) {
    options.push({ value: val, label: val });
  }
  options = options.sort((a, b) => a.label.localeCompare(b.label));

  return (
    <div className="col-sm-12">
      <label htmlFor={name} className="row">
        {label}
      </label>
      <div className="row">
        <Creatable
          {...field}
          onChange={(selection) => {
            helpers.setValue(selection && selection.value);
          }}
          id={name}
          options={options}
          className={"tk-field form-control"}
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
