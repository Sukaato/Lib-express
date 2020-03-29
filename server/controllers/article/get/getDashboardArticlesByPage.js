import { database } from "../../../database/connection";
import { logger } from "../../../utils/logger";

const log = logger.getLogger("[CONTROLLER] [ARTICLE] [GET]");

/**
 * 
 * @returns {Promise<{ id: number, title: string, author: string, count: { tag: number, comment: number }}[] | []>}
 */
export const getDashboardArticlesByPage = async (page) => {
    log.info("Article list for dashboard");

    const req = `SELECT a.id, a.title, u.login AS author, COALESCE(_tag.count, 0) AS tagCount, COALESCE(_comments.count, 0) AS commentCount 
                    FROM Articles a
                    LEFT JOIN Users u ON u.id = a.id_user 
                    LEFT JOIN (
                            SELECT c.id_article, COUNT(1) AS count FROM Comments c
                            GROUP BY c.id_article
                        ) AS _comments
                    ON a.id = _comments.id_article
                    LEFT JOIN (
                            SELECT ta.id_article, COUNT(1) AS count FROM TagsArticles ta
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
                    author: row.author,
                    count: {
                        tag: row.tagCount,
                        comment: row.commentCount
                    }
                }
            });
        }).catch((err) => {
            log.error(err);
        });
};