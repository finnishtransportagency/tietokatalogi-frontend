import React, { Component } from "react";
import Modal, { getCancelModal, getDeleteModal } from "./modal";
import {
  roleIdToRooliDescription,
  Roles,
  internalOrganisation,
} from "../utils";

/**
 * Validates that the "Vastaava" field has a non-empty value
 */
export function validateVastaava(values) {
  const errorObject = {};
  const roleName = roleIdToRooliDescription(Roles.VASTAAVA);
  errorObject[roleName] = "Pakollinen kenttä";
  const errorResponse = { henkiloRooliList: errorObject, hasErrors: true };

  if (!values.henkiloRooliList) return errorResponse;

  // TKYP-159: Vastaava is now only mandatory if the organisation is Väylävirasto
  if (
    !values.omistava_organisaatio ||
    values.omistava_organisaatio !== internalOrganisation
  ) {
    return { henkiloRooliList: null };
  } else {
    for (const v of values.henkiloRooliList) {
      if (v.rooliId === Roles.VASTAAVA && v.henkiloId !== null) {
        // Found non-empty value, return with no errors
        return { henkiloRooliList: null };
      }
    }
  }

  return errorResponse;
}

/**
 * Validates form fields with validation functions
 * @param values form data
 * @param  {...any} validationFunctions
 */
export function validateAll(values, ...validationFunctions) {
  let sum = Object.assign({}, values);
  Object.keys(sum).forEach((key) => (sum[key] = null));
  sum.hasErrors = false;

  if (values) {
    validationFunctions.forEach((func) => Object.assign(sum, func(values)));
  }
  return sum;
}

/**
 * Validates that the name field (nimi) is non-empty
 */
export function validate(values) {
  if (values) {
    let result = {};
    const valid = notEmpty(values.nimi);
    result.nimi = valid ? null : "Nimi vaaditaan";
    if (!valid) result.hasErrors = true;
    return result;
  } else {
    return null;
  }
}

/**
 * Returns a function that validates that the given fields are
 * non-empty.
 * @param {string[]} requiredFieldNames  The fields must hold data as string
 */
export function validateNotEmpty(requiredFieldNames) {
  return function (values) {
    let result = {};
    requiredFieldNames.forEach((fieldName) => {
      if (notEmpty(values[fieldName])) {
        result[fieldName] = null;
      } else {
        result[fieldName] = "Pakollinen kenttä";
        result.hasErrors = true;
      }
    });
    return result;
  };
}

function notEmpty(value) {
  return value !== undefined && value !== null && value.trim() !== "";
}

export function fieldIsEmpty(value) {
  return value === undefined || value === null || value.trim() === "";
}

/**
 * Returns a function that validates that the given fields are
 * non-empty.
 * @param {string[]} requiredFieldNames  The fields must hold data as a number
 */
export function validateNotEmptyNumber(requiredFieldNames) {
  return function (values) {
    let result = {};
    requiredFieldNames.forEach((fieldName) => {
      if (notEmptyNumber(values[fieldName])) {
        result[fieldName] = null;
      } else {
        result[fieldName] = "Pakollinen kenttä";
        result.hasErrors = true;
      }
    });
    return result;
  };
}

function notEmptyNumber(number) {
  return number !== undefined && number !== null;
}

export const formikValidateName = (values) => {
  if (!notEmpty(values.nimi))
    return {
      nimi: "Nimi vaaditaan",
    };
  return {};
};

export class FormControls extends Component {
  //TODO: refactor so that FormControls does not need values. Done in dynamic form
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      currModal: null,
    };
  }

  save = () => {
    if (this.props.values && this.props.values.tunnus) {
      this.props.setEditable(false);
      this.props.submitForm(this.props.values);
    } else {
      this.props.submitForm(this.props.values);
    }
  };

  cancel = () => {
    if (this.props.values && this.props.values.tunnus) {
      this.props.setEditable(false);
      this.props.resetForm();
    } else {
      this.props.cancelNew();
    }
  };

  showModalOnCancel = () => {
    if (this.props.noCheck) this.cancel();
    else {
      const noCallback = () => this.setState({ currModal: null });
      const yesCallback = () => {
        this.setState({ currModal: null });
        this.cancel();
      };
      this.setState({
        currModal: getCancelModal(noCallback, yesCallback),
      });
    }
  };

  showModalOnDelete = () => {
    if (this.props.noCheck) this.props.remove(this.props.values.tunnus);
    else {
      const noCallback = () => this.setState({ currModal: null });
      const yesCallback = () => {
        this.setState({ currModal: null });
        this.props.remove(this.props.values.tunnus);
      };
      this.setState({
        currModal: getDeleteModal(noCallback, yesCallback),
      });
    }
  };

  getCurrModal = () => {
    const currModal = this.state.currModal;
    const buttons = (currModal && currModal.buttons) || null;
    const header = (currModal && currModal.header) || null;
    const body = (currModal && currModal.body) || null;
    const isWide = (currModal && currModal.isWide) || false;
    return (
      <Modal
        buttons={buttons}
        header={header}
        body={body}
        showModal={this.state.currModal}
        isWide={isWide}
      />
    );
  };

  render() {
    const {
      edit,
      values = {},
      errors = {},
      setEditable,
      children,
      inline = false,
      noRightsToModify = [],
      formikValidation = false,
    } = this.props;

    const isFormikErrors = Object.values(errors).length > 0;
    const isNoModificationRights = noRightsToModify.includes("ALL_FIELDS");

    const disabled = {
      save: errors.hasErrors || (formikValidation && isFormikErrors),
      remove: false,
      create:
        errors.hasErrors ||
        isNoModificationRights ||
        (formikValidation && isFormikErrors),
      cancel: false,
      edit: isNoModificationRights,
    };
    const bottomControl = inline
      ? ""
      : "form-controls float-bottom col-xs-12 col-sm-8 col-sm-offset-4 col-md-9 col-md-offset-3 col-lg-10 col-lg-offset-2";
    return (
      /* eslint-disable indent */
      <div className={bottomControl}>
        {edit && values.tunnus && (
          <div className="btn-toolbar">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.save()}
              disabled={disabled && disabled.save}
            >
              Tallenna
            </button>

            <button
              type="button"
              className="btn btn-default"
              onClick={() => this.showModalOnCancel()}
              disabled={disabled && disabled.cancel}
            >
              Peruuta
            </button>

            <button
              type="button"
              className="btn btn-danger delete-button"
              onClick={() => this.showModalOnDelete()}
              disabled={disabled && disabled.remove}
            >
              Poista
            </button>
          </div>
        )}
        {edit && !values.tunnus && (
          <div className="btn-toolbar">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.save()}
              disabled={disabled && disabled.create}
              title={
                isNoModificationRights ? "Muokkausoikeudet puuttuvat" : null
              }
            >
              Luo
            </button>

            <button
              type="button"
              className="btn btn-default"
              onClick={() => this.showModalOnCancel()}
              disabled={disabled && disabled.cancel}
            >
              Peruuta
            </button>
          </div>
        )}
        {!edit && (
          <div className="btn-toolbar">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setEditable(true)}
              disabled={disabled.edit}
              title={
                isNoModificationRights ? "Muokkausoikeudet puuttuvat" : null
              }
            >
              Muokkaa
            </button>
            {children}
          </div>
        )}
        {this.getCurrModal()}
      </div>
    );
  }
}
