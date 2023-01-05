import React from "react";
import { FormField } from "react-form";
import DatePicker from "react-datepicker";
import { fi } from "date-fns/locale";
import { format, parse } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

import { isValidDate } from "./formik/FormikCustomDatePicker";

// TODO input field width cannot be set to 100% wait for bug fix:
// https://github.com/Hacker0x01/react-datepicker/pull/944

// TODO: this seems to show some flickering after 3.x upgrade, check css

class CustomDatePickerWrapper extends React.Component {
  handleChange = (date) =>
    this.props.fieldApi.setValue(
      isValidDate(date)
        ? format(date, this.props.dateFormat || "dd.MM.yyyy")
        : null
    );
  render() {
    const {
      fieldApi,
      field,
      className,
      id,
      placeholder,
      readOnly,
      dateFormat = "dd.MM.yyyy",
      ...rest
    } = this.props;

    const { getValue } = fieldApi;

    return (
      <DatePicker
        {...rest}
        locale={fi}
        dateFormat={dateFormat}
        className={className}
        disabled={readOnly}
        selected={getValue() ? parse(getValue(), dateFormat, new Date()) : null}
        onChange={this.handleChange}
      />
    );
  }
}

export const CustomDatePicker = FormField(CustomDatePickerWrapper);
