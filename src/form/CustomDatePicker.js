import React from "react";
import {FormField} from "react-form";
import DatePicker from "react-datepicker";
import moment from "moment";
import {fi} from "moment/locale/fi";

// TODO input field width cannot be set to 100% wait for bug fix:
// https://github.com/Hacker0x01/react-datepicker/pull/944

class CustomDatePickerWrapper extends React.Component {
    handleChange = date => this.props.fieldApi.setValue(moment(date).format(this.props.dateFormat || "DD.MM.YYYY"))
    render() {

        const { fieldApi, field, className, id, placeholder,readOnly, dateFormat = "DD.MM.YYYY", ...rest } = this.props;
        
        const {
            getValue,
        } = fieldApi;

        return (
            <DatePicker
                {...rest}
                locale={fi}
                dateFormat={dateFormat}
                className={className}
                disabled={readOnly} 
                selected={getValue() ? moment(getValue(), dateFormat) : null}
                onChange={this.handleChange}
            />
        );
    }
}

export const CustomDatePicker = FormField(CustomDatePickerWrapper);