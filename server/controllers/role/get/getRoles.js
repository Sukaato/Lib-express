import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";
const log = logger.getLogger("[CONTROLLER] [ROLE] [GET]");

/**
 * 
 * @returns {Promise<{ id: number, tag: string }[] | []>}
 */
export const getRoles = async () => {
    log.info("List of role");

    const req = `SELECT * FROM Roles`;

    return database.query(req)
        .then(( [rows] ) => {
            return rows;

        }).catch((err) => {
            log.error(err);
        });
}