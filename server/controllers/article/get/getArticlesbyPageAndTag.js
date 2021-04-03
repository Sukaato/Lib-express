import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";
import { isModifiedArticle } from "../utils/isModifiedArticle";
import { stringToList } from "../utils/stringToList";

const log = logger.getLogger("[CONTROLLER] [ARTICLE] [GET]");

/**
 * 
 * @param {number} tag Tag que doit contenir un article
 * @param {number} page Numéro de la page actuel
 * @returns {Promise<{id_article: number, content: string, createdAt: string, updatedAt: string, author: string, tagsList: string[], commentsCount: number}[]>}
 */
export const getArticlesByPageAndTag = async (tag, page) => {
    log.info("By page and tag")

    const req = `SELECT a.id, a.title, LEFT(a.content, 200) as content, DATE_FORMAT(a.createdAt, "%d/%m/%Y") AS createdAt, DATE_FORMAT(a.updatedAt, "%d/%m/%Y") AS updatedAt, u.login as author, _tag.list, COALESCE(_comments.count, 0) as commentsCount 
                    FROM Articles a
                    LEFT JOIN Users u ON u.id = a.id_user 
                    LEFT JOIN (
                        SELECT c.id_article, COUNT(1) as count FROM Comments c
                        GROUP BY c.id_article
                    ) AS _comments
                    ON a.id = _comments.id_article
                    LEFT JOIN (
                        SELECT ta.id_article, GROUP_CONCAT(t.tag SEPARATOR ';') as list FROM TagsArticles ta
                        LEFT JOIN Tags t ON t.id = ta.id_tag
                        GROUP BY ta.id_article
                    ) AS _tag
                    ON a.id = _tag.id_article
                    GROUP BY a.id
                    LIMIT 25 OFFSET ${25 * (page - 1)};`;

    return database.query(req)
        .then(( [rows] ) => {
            return rows.map(row => {
                return {
                    id: row.id,
                    title: row.title,
                    content: row.content,
                    createdAt: row.createdAt,
                    updatedAt: row.updatedAt,
                    author: row.author,
                    tagList: stringToList(row.list),
                    commentsCount: row.commentsCount,
                    isModified: isModifiedArticle(row.createdAt, row.updatedAt)
                }
            });

        }).catch((err) => {
            log.error(err);
        });
};