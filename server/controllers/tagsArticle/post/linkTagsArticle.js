import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";
const log = logger.getLogger("[CONTROLLER] [TAG-ARTICLE] [POST]");

/**
 * @param {number} id_article id de l'article
 * @param {number[]} ids_tag liste d'ID correspondant à des tags
 * @returns {Promise<{ created: boolean, result: {fieldCount: number, affectedRows: number, insertId: number, info: string, serverStatus: number, warningStatus: number} }>}
 */
export const linkTagsArticle = async (id_article, ids_tag) => {
    if (ids_tag.length > 0) {
        log.info("IDS", ids_tag, "length", ids_tag.length);
        const VALUES = ids_tag.map(id => {
            return `('${id_article}', '${id}')`;
        }).join(',');
    
        const req = `INSERT INTO TagsArticles (id_article, id_tag) VALUES ${VALUES}`;
    
        log.info("DB REQUEST", req)
        return database.query(req)
            .then(( [rows] ) => {
                return {created: true, result: rows};
    
            }).catch((err) => {
                log.error(err);
                return {created: false, result: err};
            });
    }
    return {created: true};
};