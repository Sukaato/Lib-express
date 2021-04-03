import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";

const log = logger.getLogger("[CONTROLLER] [TAG] [PATCH]");

/**
 * 
 * @returns {Promise<{ modified: boolean }>}
 */
export const patchTagByID = async ({id, tag}) => {
    log.info("Modifiaction du tag");

    const req = `UPDATE Tags SET tag = "${tag}" WHERE id = "${id}";`;

    return database.query(req)
        .then(( [rows] ) => {
            return {modified: true, result: rows};

        }).catch((err) => {
            log.error(err);
            return {modified: false, message: err};
        });
}