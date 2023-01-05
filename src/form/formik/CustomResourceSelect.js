import React from "react";
import Select from "react-select";
import axios from "axios";
import { fullRestURL } from "../../App";
import { useFormikContext } from "formik";
import { getPersonFieldOptions } from "../SelectHelpers";

function fetchHenkilo(input) {
  return axios
    .get(`${fullRestURL()}/FIM`, { params: { filter: input } })
    .then((response) => {
      return response.data.items;
    })
    .catch(function (error) {
      console.error(error);
    });
}

export const CustomResourceSelect = ({
  idx,
  readOnly,
  arrayName,
  selectedPeople,
  addToSelectedPeopleList,
  className,
}) => {
  const { values, setFieldValue } = useFormikContext();

  const [people, setPeople] = React.useState();
  const [debounceTimerId, setDebounceTimerId] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchAndSetNewOptions = (selection) => {
    setIsLoading(true);
    fetchHenkilo(selection).then((ret) => {
      setPeople(ret);
      setIsLoading(false);
    });
  };

  const callWithDebounce = (fn, waitTime) => {
    setDebounceTimerId(
      setTimeout(() => {
        fn();
      }, waitTime)
    );
  };

  // Update people (local options) when the selected people (shared, initial options) have been changed.
  React.useEffect(() => {
    setPeople(selectedPeople);
  }, [selectedPeople]);

  // Cancel previous debounce timer on new timer or unmount
  React.useEffect(() => {
    return () => {
      clearTimeout(debounceTimerId);
    };
  }, [debounceTimerId]);

  return (
    <Select
      onChange={(selection) => {
        // Once the updated selectedPeople list comes in through props, an effect hook updates
        // the local people array to match it.
        selection &&
          addToSelectedPeopleList(
            people.find((p) => p.tunnus === selection.value)
          );
        setFieldValue(`${arrayName}.${idx}`, selection && selection.value);
      }}
      onInputChange={(selection) => {
        selection &&
          callWithDebounce(() => fetchAndSetNewOptions(selection), 200);
      }}
      value={values[arrayName][idx]}
      options={getPersonFieldOptions(readOnly ? selectedPeople : people)}
      className={"tk-field form-control" + className}
      readOnly={readOnly}
      noResultsText="Ei tuloksia"
      placeholder=""
      disabled={readOnly}
      isLoading={isLoading}
    />
  );
};
