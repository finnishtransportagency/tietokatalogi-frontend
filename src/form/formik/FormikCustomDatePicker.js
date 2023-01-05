import React from "react";
import DatePicker from "react-datepicker";
import { fi } from "date-fns/locale";
import { format, parse, isValid, isDate } from "date-fns";
import { useField } from "formik";

import "react-datepicker/dist/react-datepicker.css";

// isDate() and isValid() both return true
// for dates with a year of more than 4 digits, but such
// dates lead to a RangeError in format()
const isValidDate = (date) =>
  isDate(date) && isValid(date) && date.getFullYear().toString().length <= 4;

export const FormikCustomDatePicker = ({ label, name, readOnly }) => {
  const [field, _, helpers] = useField(name);
  const dateFormat = "dd.MM.yyyy";

  return (
    <div className="col-sm-12">
      <label htmlFor={name} className="row">
        {label}
      </label>
      <div className="row">
        <DatePicker
          locale={fi}
          dateFormat={dateFormat}
          className="tk-field form-control"
          disabled={readOnly}
          selected={
            field.value ? parse(field.value, dateFormat, new Date()) : null
          }
          onChange={(date) => {
            const newDate = isValidDate(date) ? format(date, dateFormat) : null;
            helpers.setValue(newDate);
          }}
        />
      </div>
    </div>
  );
};
