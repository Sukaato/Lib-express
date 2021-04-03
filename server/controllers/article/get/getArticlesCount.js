import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";

const log = logger.getLogger("[CONTROLLER] [ARTICLE] [GET]");

/**
 * 
 * @returns {Promise<{ length: number }>}
 */
export const getArticlesCount = async () => {
    log.info("number of articles");

    const req = `SELECT COUNT(a.id) AS count FROM Articles a;`;

    return database.query(req)
    .then(( [rows] ) => {
        return {length: rows[0].count};

    }).catch((err) => {
        log.error(err);
    });
};