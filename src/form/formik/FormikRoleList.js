import React from "react";
import { CustomResourceSelect } from "./CustomResourceSelect";
import { useField, FieldArray } from "formik";
import {
  personCustomResourceSelectClassName,
  getUniquePersonList,
} from "../../henkilorooli/HenkiloRooliUtils";

export const FormikPersonRoleList = ({
  label,
  name,
  readOnly,
  resources,
  allowAddAndRemove = false,
}) => {
  const [field, meta, helpers] = useField(name);

  const customResourceOuterClass = !readOnly
    ? "col-md-11 col-xs-10"
    : "col-sm-12";
  const removeButtonOuterClass = !readOnly ? "col-md-1 col-xs-2" : "";

  console.log("resources", JSON.parse(JSON.stringify(resources)));

  const [selectedPeople, setSelectedPeople] = React.useState(resources.people);
  const addToSelectedPeople = (newPerson) => {
    setSelectedPeople(getUniquePersonList([...selectedPeople, newPerson]));
  };

  return (
    <div className="col-sm-6">
      <div className="col-sm-12">
        <label className="row">{label}</label>
        <div className="row">
          <FieldArray name={name}>
            {({ push, remove }) => (
              <div className="form-group row">
                {field.value.map((person, idx) => {
                  console.log("mapping", person, idx);
                  return (
                    person && (
                      <div className="col-lg-11 col-custom-lg-11" key={idx}>
                        <div className="row" style={{ height: "58px" }}>
                          <div className={customResourceOuterClass}>
                            <CustomResourceSelect
                              idx={idx}
                              getClassName={personCustomResourceSelectClassName(
                                person
                              )}
                              readOnly={readOnly}
                              addToSelectedPeopleList={(data) =>
                                addToSelectedPeople(data)
                              }
                              selectedPeople={selectedPeople}
                              arrayName={name}
                            />
                          </div>
                          <div className={removeButtonOuterClass}>
                            {!readOnly && allowAddAndRemove && (
                              <button
                                type="button"
                                className="btn btn-danger float-right"
                                onClick={() => remove(idx)}
                                disabled={readOnly}
                              >
                                <i className="fa fa-remove" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  );
                })}
                {!readOnly && allowAddAndRemove && (
                  <div className="col-sm-12">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => push(-1)}
                      disabled={readOnly}
                    >
                      Lisää
                    </button>
                  </div>
                )}
              </div>
            )}
          </FieldArray>
        </div>
      </div>
    </div>
  );
};
