import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";

const log = logger.getLogger("[CONTROLLER] [USER] [DELETE]");

/**
 * @param {number} id ID de l'utilisateur à supprimer
 * @returns {Promise<{ deleted: boolean }>}
 */
export const deleteUserByID = async (id) => {
    const req = `DELETE FROM Users WHERE id = "${id}";`;

    return database.query(req)
    .then(( [rows] ) => {
        return {deleted: true, result: rows};
        
    }).catch((err) => {
        log.error(err);
        return {deleted: false, result: err};
    });
};