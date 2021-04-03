import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";

const log = logger.getLogger("[CONTROLLER] [ARTICLE] [PUT]");

/**
 * @param {{title: string, content: Text, updatedAt: Date}}
 * @returns {Promise<{ updated: boolean, result: {fieldCount: number, affectedRows: number, insertId: number, info: string, serverStatus: number, warningStatus: number} }>}
 */
export const putArticlebyID = async ({id, title, content, updatedAt}) => {
    log.info("Modified article with ID", id);

    const req = `UPDATE Articles SET
                    \`title\` = '${title}',
                    \`content\` = '${content}',
                    \`updatedAt\` = DATE_FORMAT('${updatedAt}', '%Y-%m-%d')
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
                result: rows
            }
        });
};