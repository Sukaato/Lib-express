import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";

const log = logger.getLogger("[CONTROLLER] [USER] [GET]");

/**
 * @param {number} page Numéro de la page à afficher
 * @returns {Promise<{ id: number, login: string, role: string }[] | []>}
 */
export const getUserListByPage = async (page) => {
    log.info("user list");

    const req = `SELECT u.id, u.login, r.role FROM Users u
                    LEFT JOIN Roles r ON r.id = u.id_role
                    LIMIT 25 OFFSET ${25 * (page - 1)};`;

    return database.query(req)
    .then(( [rows] ) => {
        return rows;

    }).catch((err) => {
        log.error(err);
    });
};