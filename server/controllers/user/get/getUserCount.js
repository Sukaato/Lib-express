import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";

const log = logger.getLogger("[CONTROLLER] User");

/**
 * 
 * @returns {Promise<{ length: number }>}
 */
export const getUserCount = async () => {
    log.info("GET number of users");

    const req = `SELECT COUNT(u.id) AS count FROM Users u;`;

    return database.query(req)
    .then(( [rows] ) => {
        return {length: rows[0].count};

    }).catch((err) => {
        log.error(err);
    });
};