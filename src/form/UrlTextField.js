import React from "react";
import { FormField, Text, TextArea } from "react-form";

class UrlTextFieldWrapper extends React.Component {
    render() {
        const { fieldApi, className, placeholder,readOnly, longLink, ...rest } = this.props;

        const {
            getValue,
        } = fieldApi;

        const field = this.props.field || this.props.id;

        let link = getValue() || "";
        link = link.length > 50 ? link.substring(0, 50) + "..." : link;

        let urlField = (
            <a
                className={className}
                style={{ overflow: "hidden" }}
                href={getValue()}
                target="_blank"
                rel="noopener noreferrer"
                readOnly={true}
                {...rest}
            >
                {link}
            </a>
        );

        if (!readOnly) {
            if (longLink) {
                urlField = (
                    <TextArea
                        field={field}
                        type="text"
                        className={className}
                        readOnly={false}
                        rows="3"
                        placeholder={placeholder}
                        {...rest}
                    />
                );
            } else {
                urlField = (
                    <Text
                        field={field}
                        type="url"
                        className={className}
                        readOnly={false}
                        placeholder={placeholder}
                        {...rest}
                    />
                );
            }
        }

        return urlField;
    }
}

export const UrlTextField = FormField(UrlTextFieldWrapper);
