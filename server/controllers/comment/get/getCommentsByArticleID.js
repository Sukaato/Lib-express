import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";

const log = logger.getLogger("[CONTROLLER] [COMMENT] [GET]");

/**
 * 
 * @param {number} id ID de l'article
 * @returns {Promise<{id: number, comment: string, createdAt: string, author: string}[] | []>}
 */
export const getCommentsByArticleID = async (id) => {
    log.info("Comment for article, ID:", id);

    const req = `SELECT c.id, c.comment, DATE_FORMAT(c.createdAt, "%d/%m/%Y") AS createdAt, u.login as author FROM Comments c
                    LEFT JOIN Users u ON u.id = c.id_user
                    WHERE c.id_article = ${id};`;

    return database.query(req)
        .then(( [rows] ) => {
            return rows;

        }).catch((err) => {
            log.error(err);
        });
};