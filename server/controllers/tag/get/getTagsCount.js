import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";

const log = logger.getLogger("[CONTROLLER] [TAG] [GET]");

/**
 * 
 * @returns {Promise<{ length: number }>}
 */
export const getTagsCount = async () => {
    log.info("Number of tags");

    const req = `SELECT COUNT(t.id) AS count FROM Tags t;`;

    return database.query(req)
    .then(( [rows] ) => {
        return {length: rows[0].count};

    }).catch((err) => {
        log.error(err);
    });
}