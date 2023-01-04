import React from "react";
import Select from "react-select";
import { useField } from "formik";
import { getScoredFieldOptions } from "../SelectHelpers";

export const CustomScoredSelect = ({ name, readOnly, resources }) => {
  const [field, _, helpers] = useField(name);
  const options = getScoredFieldOptions(resources, field.name);

  return (
    <Select
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
  );
};
