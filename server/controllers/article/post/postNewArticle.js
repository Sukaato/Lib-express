import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";

const log = logger.getLogger("[CONTROLLER] [ARTICLE] [POST]");

/**
 * @param {{title: string, content: Text, createdAt: Date, updatedAt: Date}}
 * @param {id_user: number}
 * @returns {Promise<{ created: boolean, result: {fieldCount: number, affectedRows: number, insertId: number, info: string, serverStatus: number, warningStatus: number} }>}
 */
export const postNewArticle = async ({title, content, createdAt, updatedAt}, id_user) => {
    log.info("Added new article");

    const req = `INSERT INTO Articles 
                    (\`title\`, 
                    \`content\`, 
                    \`createdAt\`, 
                    \`updatedAt\`, 
                    \`id_user\`)
                VALUES (
                    '${title}', 
                    '${content}', 
                    DATE_FORMAT('${createdAt}', '%Y-%m-%d'), 
                    DATE_FORMAT('${updatedAt}', '%Y-%m-%d'), 
                    '${1}');`;

    return database.query(req)
        .then(( [rows] ) => {
            return {
                created: true,
                result: rows
            }

        }).catch((err) => {
            log.error(err);
            return {
                created: false,
                result: rows
            }
        });
};