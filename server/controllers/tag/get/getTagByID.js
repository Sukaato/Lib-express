import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";

const log = logger.getLogger("[CONTROLLER] [TAG] [GET]");

/**
 * 
 * @returns {Promise<{ id: number, tag: string }>}
 */
export const getTagByID = async (id) => {
    log.info("Tag by ID");

    const req = `SELECT * FROM Tags WHERE id = "${id}";`;

    return database.query(req)
    .then(( [rows] ) => {
        return rows[0];

    }).catch((err) => {
        log.error(err);
    });
}