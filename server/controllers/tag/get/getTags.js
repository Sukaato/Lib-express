import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";

const log = logger.getLogger("[CONTROLLER] [TAG] [GET]");

/**
 * 
 * @returns {Promise<{ id: number, tag: string }[] | []>}
 */
export const getTags = async () => {
    log.info("List of tags");

    const req = `SELECT * FROM Tags
                    ORDER BY id;`;

    return database.query(req)
        .then(( [rows] ) => {
            return rows;

        }).catch((err) => {
            log.error(err);
        });
}