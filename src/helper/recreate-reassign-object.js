export const recreateAndReplace = (obj, recreateObj, value) => {
    let newValue = JSON.parse(JSON.stringify(obj))
    newValue[recreateObj] = value
    return newValue
}