
/**
 * 
 * @param {string} date1 date de création de l'article
 * @param {string} date2 date de modification de l'article
 */
export const isModifiedArticle = (date1, date2) => {
    const array1 = date1.split("/");
    const array2 = date2.split("/");

    date1 = new Date(array1[2], array1[1], array1[0]);
    date2 = new Date(array2[2], array2[1], array2[0]);

    return date1 < date2;
};