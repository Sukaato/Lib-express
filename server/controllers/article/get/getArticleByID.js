import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";
import { isModifiedArticle } from "../utils/isModifiedArticle";
import { stringToList } from "../utils/stringToList";

const log = logger.getLogger("[CONTROLLER] [ARTICLE] [GET]");

/**
 * 
 * @param {number} id id de l'article
 * @returns {Promise<{id_article: number, content: string, createdAt: string, updatedAt: string, author: string, tagsList: string[]}>}
 */
export const getArticleByID = async (id) => {
    log.info("Article by ID:", id);

    const req = `SELECT a.id, a.title, a.content, DATE_FORMAT(a.createdAt, "%d/%m/%Y") AS createdAt, DATE_FORMAT(a.updatedAt, "%d/%m/%Y") AS updatedAt, u.login as author, _tag.list
                    FROM Articles a
                    LEFT JOIN Users u ON u.id = a.id_user
                    LEFT JOIN (
                        SELECT ta.id_article, GROUP_CONCAT(t.tag SEPARATOR ';') as list FROM TagsArticles ta
                        LEFT JOIN Tags t ON t.id = ta.id_tag
                        GROUP BY ta.id_article
                    ) AS _tag
                    ON a.id = _tag.id_article
                    WHERE a.id = "${id}";`;

    return database.query(req)
        .then(( [rows] ) => {
            return rows.map(row => {
                log.info("row", row);
                return {
                    id: row.id,
                    title: row.title,
                    content: row.content,
                    createdAt: row.createdAt,
                    updatedAt: row.updatedAt,
                    author: row.author,
                    tags: stringToList(row.list),
                    isModified: isModifiedArticle(row.createdAt, row.updatedAt)
                }
            })[0];
        }).catch((err) => {
            log.error(err);
        });
};