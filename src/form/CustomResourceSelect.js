import React, {Component} from "react";
import {FormField} from "react-form";
import Select from "react-select";
import axios from "axios";
import {inject} from "mobx-react";
import {fullRestURL} from "../App";

@inject("notificationStore")

class CustomResourceSelectWrapper extends Component {
    constructor(props) {
        super(props);

        const initialPerson = props.person;
        const initialSelected = initialPerson ? {
            value: initialPerson.tunnus,
            label: props.selectToLabel(initialPerson),
            person: initialPerson
        } : {};

        this.state = {
            selected: initialSelected,
            options: [],
            input: {},
            isLoading: false
        };
    }

    componentWillReceiveProps(props) {
        const initialPerson = props.person;
        //HOX! Be careful with this ugly hack...
        if (this.state.selected && initialPerson && initialPerson.tunnus === this.state.selected.value) {
            return;
        }
        const initialSelected = initialPerson ? {
            value: initialPerson.tunnus,
            label: props.selectToLabel(initialPerson),
            person: initialPerson
        } : {};
        this.setState({selected: initialSelected});
    }

    componentWillUnmount() {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
    }

    validateNameInput(input, encode) {
        return encode ? input.replace(" ", "%20") : input.replace("%20", " ");
    }

    setOptions = input => {
        if (!input) {
            this.setState({options: []});
            return;
        }
        input = input.trim();
        const {notificationStore} = this.props;
        input = this.validateNameInput(input, true);
        this.setState({isLoading: true}, function () {
            axios.get(`${fullRestURL()}/FIM`, {params: {filter: input}}).then(response => {
                const options = response.data.items.map(person => ({
                    value: person.tunnus,
                    label: this.props.selectToLabel(person),
                    person: person
                }));
                this.setState({options: options, isLoading: false});
            })
                .catch(function (error) {
                    notificationStore.addError("Virhe tallennuksessa", error);
                });
        });
    };

    debounceTimer;

    debounceOptions = (waitTime) => {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            this.setOptions(this.state.input);
        }, waitTime);
    }

    onInputChange = inputVal => {
        this.setState({input: inputVal});
        this.debounceOptions(200);
    };

    onInputKeyDown = event => {
        switch (event.keyCode) {
            case 13: // ENTER
                // Override default ENTER behavior by doing stuff here and then preventing default
                event.preventDefault();
                this.setOptions(this.state.input);
                break;
            default:
                // Satisfy linter
                break;
        }
    };

    onChange = selection => {
        this.setState({selected: selection}, function () {
            this.props.customOnChange(selection, this);
        });
    };

    render() {
        const {
            fieldApi,
            readOnly,
            getClassName,
            edit,
            ...rest
        } = this.props;
        const field = fieldApi.getFieldName().toLowerCase();

        const errors = fieldApi.getError();
        const error = errors && errors[this.props.fieldTypeName.toLowerCase()];

        const selected = (Array.isArray(this.state.selected)) ? {} : this.state.selected;

        return (
            <div>
                <Select
                    className={getClassName(
                        this.state.selected && this.state.selected.person
                    )}
                    field={field}
                    disabled={readOnly}
                    onInputChange={this.onInputChange}
                    onChange={this.onChange}
                    value={selected}
                    onInputKeyDown={this.onInputKeyDown}
                    options={this.state.options}
                    isLoading={this.state.isLoading}
                    noResultsText="Ei tuloksia"
                    filterOption={() => true}
                    {...rest}
                />
                {edit && error ? (
                    <small className="react-form-message react-form-message-error">
                        {error}
                    </small>
                ) : null}
            </div>
        );
    }
}

export const CustomResourceSelect = FormField(CustomResourceSelectWrapper);
