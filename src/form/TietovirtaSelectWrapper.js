import React from "react";
import { FormField } from "react-form";
import Select from "react-select";
import { inject, observer } from "mobx-react";
import { action } from "mobx";

/**
 * Handles logic that is needed for the tietovirta select menu.
 * Available options depend on data in the same form row and tietojärjestelmäpalvelu data.
 */
@inject("tietojarjestelmapalveluStore")
@observer
class CustomSelectWrapper extends React.Component {

    handleChange = selection => {
        this.props.fieldApi.setValue(selection.map(s => s.value));
    };

    /**
     * Matches tietolaji values to a tietojärjestelmäpalvelu.
     */
    @action
    getTietolajiMatchingTietojarjestelmatunnus(tietojarjestelmapalvelu, tietojarjestelmapalveluTunnus) {
        const filteredTietojarjestelmapalvelu = tietojarjestelmapalvelu.filter(tjp => tjp.tunnus === tietojarjestelmapalveluTunnus);

        const filteredTietolaji = filteredTietojarjestelmapalvelu.reduce((results, tjp) => {
            return [...results, ...tjp.tietolajit];
        }, []);

        return filteredTietolaji;
    }

    // Similar matching could be later implemented for Sovellus ID's

    /**
     * Returns possible tietovirta values based on form values.
     */
    getTietovirtaOptions(tietojarjestelmapalvelu, tietojarjestelmapalveluTunnus) {
        if (!(tietojarjestelmapalvelu && tietojarjestelmapalveluTunnus))
            return [];
        
        return this.getTietolajiMatchingTietojarjestelmatunnus(
            tietojarjestelmapalvelu, tietojarjestelmapalveluTunnus)
            .map(({ tunnus, nimi, liittyvaJarjestelmaNimi }) => ({ value: tunnus, 
                label: liittyvaJarjestelmaNimi ? `${nimi} (${liittyvaJarjestelmaNimi})` : nimi }))
            .sort((a, b) => a.label.localeCompare(b.label));
    }

    render() {
        const {
            fieldApi,
            readOnly,
            className,
            tietovirtaRowData: r = {},
            tietojarjestelmapalveluStore: p,
            ...rest
        } = this.props;

        // tietovirtaRowData = {
        //     id: null,
        //     linkattavaTunnus: null,
        //     suunta: null,
        //     tietojarjestelmaTunnus: 000,
        //     tietojarjestelmapalveluTunnus: null,
        //     tietovirta: "",
        //     tyyppi: null
        // }

        const { getError, getValue, setTouched } = fieldApi;

        const field = fieldApi.getFieldName(); // [form area name, row index, form field name]

        // sort options
        let val = getValue();

        const error = getError();
        const newClassName =
            className + (error ? " react-form-input-error" : "");

        return (
            <div>
                <Select
                    field={field}
                    options={
                        // We need to access the store's observables directly here so that mobx
                        // knows to call render on store updates.
                        this.getTietovirtaOptions(p.list, r.tietojarjestelmapalveluTunnus)}
                    disabled={readOnly}
                    value={val}
                    className={newClassName}
                    onChange={this.handleChange}
                    onBlur={() => setTouched()}
                    noResultsText="Ei tuloksia"
                    {...rest}
                    clearable={false}
                    multi={true}
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

export const TietovirtaSelectFieldWrapper = FormField(CustomSelectWrapper);
