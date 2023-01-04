import React from "react";
import Select from "react-select";
import { lowerWithoutScandics } from "../../utils";
import { useField, useFormikContext } from "formik";
import { getFieldOptions } from "../../form/SelectHelpers";

export const OtsikkoSelect = ({ readOnly, resources }) => {
  let options = [];
  const {
    values: { ylataso },
  } = useFormikContext();
  if (ylataso) {
    const resourceName = lowerWithoutScandics(ylataso);
    options = getFieldOptions(resources, resourceName, false);
  }

  const name = "otsikko";
  const [field, meta, helpers] = useField(name);

  return (
    <div className="col-sm-12">
      <label htmlFor={name} className="row">
        Otsikko
      </label>
      <div className="row">
        <Select
          {...field}
          onChange={(selection) => {
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
