const getResourcesWithName = (resources, resourceName) => {
  if (resources === null) return {};
  return resources[resourceName] || {};
};

export const getFieldOptions = (resources, resourceName, useID = false) => {
  const fieldResources = getResourcesWithName(resources, resourceName);
  return (
    Object.entries(fieldResources)
      // fallback to empty string label since testing data may have missing labels
      .map(([k, v]) => ({ value: useID ? k : v, label: v || "" }))
      .sort((a, b) => a.label.localeCompare(b.label))
  );
};

// Adds a "score" to the label, based on the key. Used in tieto-omaisuus form.
const getScoreLabel = (k, v) => `${v} (${k} p)`;

export const getScoredFieldOptions = (resources, resourceName) => {
  const fieldResources = getResourcesWithName(resources, resourceName);
  return Object.entries(fieldResources)
    .map(([k, v]) => ({
      value: k,
      label: getScoreLabel(k, v),
    }))
    .sort((a, b) => a.value - b.value);
};
