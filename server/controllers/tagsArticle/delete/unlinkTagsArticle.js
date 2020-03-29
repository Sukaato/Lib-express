import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";
const log = logger.getLogger("[CONTROLLER] [TAG-ARTICLE] [DELETE]");

/**
 * @param {number} id_article id de l'article
 * @param {number[]} ids_tag liste d'ID correspondant à des tags
 * @returns {Promise<{ deleted: boolean, result: {fieldCount: number, affectedRows: number, insertId: number, info: string, serverStatus: number, warningStatus: number} }>}
 */
export const unlinkTagsArticle = async (id_article) => {
    const req = `DELETE FROM TagsArticles WHERE id_article = ${id_article};`;

    return database.query(req)
        .then(( [rows] ) => {
            return {deleted: true, result: rows};

        }).catch((err) => {
            log.error(err);
            return {deleted: false, result: err};
        });
};