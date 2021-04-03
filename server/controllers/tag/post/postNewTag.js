import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";

const log = logger.getLogger("[CONTROLLER] [TAG] [POST]");

/**
 * @param {string} name nom du tag à ajouter
 * @returns {Promise<{ created: boolean, result: {fieldCount: number, affectedRows: number, insertId: number, info: string, serverStatus: number, warningStatus: number} }>}
 */
export const postNewTag = async (name) => {
    log.info("List of tags");

    const req = `INSERT INTO Tags (tag) VALUE ("${name}");`;

    return database.query(req)
        .then(( [rows] ) => {
            return {created: true, result: rows};

        }).catch((err) => {
            log.error(err);
            return {created: false, result: err};
        });
}