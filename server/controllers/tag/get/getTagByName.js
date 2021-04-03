import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";

const log = logger.getLogger("[CONTROLLER] [TAG] [GET]");

/**
 * 
 * @returns {Promise<{ id: number, tag: string }>}
 */
export const getTagByName = async (name) => {
    log.info("Tag by Name");

    const req = `SELECT * FROM Tags WHERE tag = "${name}";`;

    return database.query(req)
    .then(( [rows] ) => {
        return !!rows[0];

    }).catch((err) => {
        log.error(err);
    });
}