
const getResourcesWithName = (resources, resourceName) => {
    if (resources === null) return {};
    return resources[resourceName] || {};
};

export const getFieldOptions = (resources, resourceName, useID = false) => {
    const fieldResources = getResourcesWithName(resources, resourceName);
    return Object.entries(fieldResources)
        // fallback to empty string label since testing data may have missing labels
        .map(([k, v]) => ({value: useID ? k : v, label: v || ""}))
        .sort((a, b) => a.label.localeCompare(b.label));
};