import { unlinkTagsArticle } from "../delete/unlinkTagsArticle";
import { linkTagsArticle } from "../post/linkTagsArticle";
import { logger } from "../../../utils/logger";
const log = logger.getLogger("[CONTROLLER] [TAG-ARTICLE] [PUT]");

/**
 * @param {number} id_article id de l'article
 * @param {number[]} ids_tag liste d'ID correspondant à des tags
 * @returns {Promise<{ updated: boolean }>}
 */
export const renewLinkTagsArticle = async (id_article, ids_tag) => {
    log.info("Renouvellement des tags de l'article", id_article);

    await unlinkTagsArticle(id_article);
    if (ids_tag.length > 0) {
        await linkTagsArticle(id_article, ids_tag);
        return {updated: true}
    }
    return {updated: false}
};