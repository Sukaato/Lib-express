import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";

const log = logger.getLogger("[CONTROLLER] [USER] [GET]");

/**
 * @param {string} login Nom de l'utilisateur
 * @returns {Promise<{ id: number, login: string, password: string, role: string }>}
 */
export const getUsersByLogin = async (login) => {
    log.info("user", login);

    const req = `SELECT u.id, u.login, u.password, r.role FROM Users u
                    LEFT JOIN Roles r ON r.id = u.id_role
                    WHERE u.login LIKE "${login}";`;

    return database.query(req)
    .then(( [rows] ) => {
        return rows[0];

    }).catch((err) => {
        log.error(err);
    });
};