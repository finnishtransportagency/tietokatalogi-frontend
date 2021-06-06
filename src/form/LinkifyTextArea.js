import React from "react";
import Linkify from "react-linkify";
import { FormField, TextArea } from "react-form";

class LinkifyTextAreaWrapper extends React.Component {
    render() {
        const { fieldApi, className, placeholder,readOnly, ...rest } = this.props;

        const {
            getValue,
        } = fieldApi;

        const text = getValue() || "";

        let textArea = (
            <div
                className={className + " textarea-div"}
                readOnly={true}
                {...rest}
            >
                <Linkify properties={{target: "_blank", rel:"noopener noreferrer"}}>
                    {text}
                </Linkify>
            </div>
        );

        if (!readOnly) {
            textArea = (
                <TextArea
                    fieldApi={fieldApi}
                    className={className}
                    readOnly={false}
                    placeholder={placeholder}
                    {...rest}
                />
            );
        }

        return textArea;
    }
}

export const LinkifyTextArea = FormField(LinkifyTextAreaWrapper);
