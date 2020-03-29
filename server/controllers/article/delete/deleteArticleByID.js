import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";

const log = logger.getLogger("[CONTROLLER] [ARTICLE] [DELETE]");

/**
 * 
 * @returns {Promise<{deleted: boolean}>}
 */
export const deleteArticleByID = async (id) => {
    log.info("Delete article with ID", id)

    const req = `DELETE FROM Articles WHERE id = "${id}";`;

    return database.query(req)
        .then(( [rows] ) => {
            return {deleted: true, result: rows};

        }).catch((err) => {
            log.error(err);
            return {deleted: false, error: err};
        });
};