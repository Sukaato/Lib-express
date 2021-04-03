import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";

const log = logger.getLogger("[CONTROLLER] [USER] [PUT]");

/**
 * @param {{id: number, login: string, id_role: number}}
 * @returns {Promise<{ updated: boolean }>}
 */
export const putUserByID = async ({id, login, id_role}) => {
    log.info("Update user with ID", id);

    const req = `UPDATE Users SET 
                        \`id\` = '${title}',
                        \`login\` = '${login}',
                        \`id_role\` = '${id_role}'
                    WHERE id = '${id}';`;

    return database.query(req)
    .then(( [rows] ) => {
        return {
            updated: true,
            result: rows
        }
    
    }).catch((err) => {
        log.error(err);
        return {
            updated: false,
            result: err
        }

    });
};