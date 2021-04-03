import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";

const log = logger.getLogger("[CONTROLLER] [TAG] [DELETE]");

/**
 * 
 * @returns {Promise<{deleted: boolean}>}
 */
export const deleteTagByID = async (id) => {
    const req = `DELETE FROM Tags WHERE id = "${id}";`;

    return database.query(req)
        .then(( [rows] ) => {
            return {deleted: true, result: rows};

        }).catch((err) => {
            log.error(err);
            return {deleted: false, error: err};
        });
};