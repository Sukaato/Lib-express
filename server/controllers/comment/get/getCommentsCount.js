import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";

const log = logger.getLogger("[CONTROLLER] [COMMENT] [GET]");

/**
 * 
 * @returns {Promise<{ length: number }>}
 */
export const getCommentsCount = async () => {
    log.info("Number of comments");

    const req = `SELECT COUNT(c.id) AS count FROM Comments c;`;

    return database.query(req)
    .then(( [rows] ) => {
        return {length: rows[0].count};

    }).catch((err) => {
        log.error(err);
    });
};