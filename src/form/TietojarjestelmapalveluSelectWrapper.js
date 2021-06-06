import React from "react";
import { FormField } from "react-form";
import Select from "react-select";
import { inject, observer } from "mobx-react";
import { action } from "mobx";

/**
 * Handles logic that is needed for the tietojärjestelmäpalvelu select menu.
 * Available options depend on data in the same form row and tietojärjestelmäpalvelu data.
 */
@inject("tietojarjestelmapalveluStore")
@observer
class CustomSelectWrapper extends React.Component {

    handleChange = selection => {
        if (this.props.onChange) this.props.onChange(selection);
        else if (selection && selection.value)
            this.props.fieldApi.setValue(selection.value);
    };

    /**
     * Matches tietojärjestelmäpalvelu values to a jarjestelma.
     */
    @action
    getTietojarjestelmapalveluMatchingJarjestelma(tietojarjestelmapalvelu, jarjestelmaTunnus) {
        return tietojarjestelmapalvelu.filter(tjp => tjp.jarjestelma === jarjestelmaTunnus);
    }


    /**
     * Returns possible tietojärjestelmäpalvelu values based on form values.
     */
    getTietojarjestelmapalveluOptions(tietojarjestelmapalvelu, jarjestelmaTunnus, linkattavaTunnus=null, tyyppi=null) {
        // Filter tietojärjestelmäpalvelu options based on form state
        let currentJarjestelmaOptions = [];
        let linkedToJarjestelmaOptions = [];

        if (tietojarjestelmapalvelu) {
            // Tietojärjestelmäpalvelu values depend on current järjestelmä...
            currentJarjestelmaOptions = this.getTietojarjestelmapalveluMatchingJarjestelma(
                tietojarjestelmapalvelu, jarjestelmaTunnus
            );
            // ...and on the järjestelmä to be linked to, if it exists.
            // Matching with sovellus codes is not currently implemented, so the type
            // must be a jarjestelma.
            if (linkattavaTunnus && tyyppi === "Järjestelmä") {
                linkedToJarjestelmaOptions = this.getTietojarjestelmapalveluMatchingJarjestelma(
                    tietojarjestelmapalvelu, linkattavaTunnus
                );
            }
        }
        const allowedOptions = [ ...currentJarjestelmaOptions, ...linkedToJarjestelmaOptions ];

        return allowedOptions.map(tjp => ({
            value: tjp.tunnus,
            label: tjp.nimi
        })).sort((a, b) => a.label.localeCompare(b.label));
    }

    render() {
        const {
            fieldApi,
            readOnly,
            className,
            tietojarjestelmapalveluRowData: r = {},
            tietojarjestelmapalveluStore: p,
            ...rest
        } = this.props;

        const { getError, getValue, setTouched } = fieldApi;

        const field = fieldApi.getFieldName(); // [form area name, row index, form field name]

        // sort options
        let val = Number(getValue());

        const error = getError();
        const newClassName =
            className + (error ? " react-form-input-error" : "");

        // We need to access the store's observables directly here so that mobx
        // knows to call render on store updates.
        const options = this.getTietojarjestelmapalveluOptions(p.list,
            r.tietojarjestelmaTunnus, r.linkattavaTunnus, r.tyyppi
        );

        return (
            <div>
                <Select
                    field={field}
                    options={options}
                    disabled={readOnly}
                    value={val}
                    className={newClassName}
                    onChange={this.handleChange}
                    onBlur={() => setTouched()}
                    noResultsText="Ei tuloksia"
                    {...rest}
                    clearable={false}
                />
                {error ? (
                    <small className="react-form-message react-form-message-error">
                        {error}
                    </small>
                ) : null}
            </div>
        );
    }
}

export const TietojarjestelmapalveluSelectWrapper = FormField(CustomSelectWrapper);
