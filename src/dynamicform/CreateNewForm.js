import React, { Component } from "react";
import { Form, Text } from "react-form";
import { LinkifyTextArea as TextArea } from "../form/LinkifyTextArea";
import { FormControls } from "../form/FormControls";
import TietolajiHelper from "./TietolajiHelper";
import { inject, observer } from "mobx-react";
import { action } from "mobx";
import { CreateNewFormSelect } from "./CreateNewFormSelect";

@inject("looginenTietovarantoStore")
@inject("tietolajiStore")
@observer
export default class CreateNewCategory extends Component {

    constructor(props) {
        super(props);
        this.updateTietolajiResources(props.tietoField.type);
    }

    @action
    updateTietolajiResources = type => {
        const store = this.getStoreForType(type);
        if (store)
            store.fetchResource();
    }

    getStoreForType = type => {
        switch (type) {
            case (TietolajiHelper.tietolajiType.LOOGINEN.value):
                return this.props.looginenTietovarantoStore;

            case (TietolajiHelper.tietolajiType.TIETOLAJI.value):
                return this.props.tietolajiStore;
        }
        return null;
    }

    getInputElement(field, type, resourceName) {
        const name = field.name;
        switch (field.type) {
            case TietolajiHelper.fieldTypes.TEXT:
                return (
                    <Text
                        field={name}
                        type="text"
                        className="tk-field form-control"
                        id={name}
                        placeholder=""
                        readOnly={false}
                    />
                );
            case TietolajiHelper.fieldTypes.TEXT_AREA:
                return (
                    <TextArea
                        field={name}
                        type="text"
                        className="tk-field form-control"
                        id={name}
                        rows="5"
                        placeholder=""
                        readOnly={false}
                    />
                );
            case TietolajiHelper.fieldTypes.SELECT:
                return (
                    <CreateNewFormSelect
                        field={name}
                        resourceStore={this.getStoreForType(type)}
                        resourceName={resourceName}
                        useID={field.useID}
                        multi={false}
                    />
                );
            case TietolajiHelper.fieldTypes.MULTISELECT:
                return (
                    <CreateNewFormSelect
                        field={name}
                        resourceStore={this.getStoreForType(type)}
                        resourceName={resourceName}
                        useID={field.useID}
                        multi={true}
                    />
                );
            default:
                return null;
        }
    }

    render() {
        const { tietoField, prefilled } = this.props;
        const fields = TietolajiHelper.getTietolajiFields(tietoField.type);

        let form = (
            <div>
                <h3>Luo uusi {tietoField.name}</h3>

                <Form
                    onSubmit={values => {
                        this.props.onSave(values, tietoField);
                    }}
                    defaultValues={prefilled}
                >
                    {formApi => (
                        <form onSubmit={formApi.submitForm}>
                            <div className="form-group row">
                                {fields.map(field => (
                                    <div className="col-sm-6" key={field.name}>
                                        <div className="col-sm-12">
                                            <label
                                                htmlFor={field.name}
                                                className="row"
                                            >
                                                {field.name}
                                            </label>
                                            <div className="row">
                                                {this.getInputElement(field, tietoField.type, field.resourceName)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <FormControls
                                edit={true}
                                values={formApi.values}
                                setEditable={() => {}}
                                submitForm={formApi.submitForm}
                                resetForm={formApi.resetAll}
                                cancelNew={this.props.onCancel}
                                // errors={{ hasErrors: !this.fullfilled }}
                                remove={() => {}}
                                inline={true}
                                noCheck={true}
                            />
                        </form>
                    )}
                </Form>
            </div>
        );

        return form;
    }
}
