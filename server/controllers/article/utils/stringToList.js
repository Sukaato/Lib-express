/**
 * 
 * @param {string} string 
 * @param {string} [splitter] 
 * @returns {string[]}
 */
export const stringToList = (string, splitter) => {
    return string && typeof string === "string" ? string.split(splitter ? splitter : ';') : [];
};