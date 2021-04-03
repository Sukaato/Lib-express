import { Router } from 'express';
import { pageValidator } from '../../middlewares/validators/page.validator';
import { articleController } from '../../controllers/article.controller';
import { tagController } from '../../controllers/tag.controller';
import { idUrlValidator } from '../../middlewares/validators/id.params.validator';
import { logger } from '../../utils/logger';
import { tagsArticlesController } from '../../controllers/tagsArticle.controller';

const log = logger.getLogger("[ROUTER] dashboard/article");

export const dashboardArticleRouter = Router();

/* Liste des aticles */
dashboardArticleRouter.get('/',pageValidator, async (req, res, next) => {
    const { page } = req.local;

    const articles = await articleController.get.list.for.dashboard.by.page(page);
    const tags = await tagController.get.tags();
    return res.render('dashboard/article', {
        title: 'Dashboard', 
        articles,
        tags
    });
});

/* Affichage de la page de création d'un article */
dashboardArticleRouter.post('/', async (req, res, next) => {
    const { body } = req;
    log.info("body", body);
    const article = await articleController.post(body);

    log.info(article);
    if (article.created) {
        const id = article.result.insertId;
        const linkTag = await tagsArticlesController.link(id, body.tags);

        log.info(linkTag);
        if (linkTag.created) {
            return res.status(201).json({created: {article: true, linkTagsArticle: true}, id});
        }
        return res.status(201).json({created: {article: true, linkTagsArticle: false}, id, error: resultPostTags.result});
    }
    return res.status(400).json({created: {article: false, linkTagsArticle: false}, error: resultPostArticle.result});

});

/* Affichage de la page de création d'un article */
dashboardArticleRouter.get('/:id', idUrlValidator, async (req, res, next) => {
    const { id } = req.local;
    log.info("ID", id)
    const article = await articleController.get.by.id(id);

    return res.json({
        article
    });
});

/* Affichage de la page de création d'un article */
dashboardArticleRouter.put('/:id', async (req, res, next) => {
    const { body } = req;
    const article = await articleController.put.by.id(body);
    if (article.updated) {
        const tags = await tagsArticlesController.renewLink(body.id, body.tags);
        if (tags.updated) {
            return res.status(200).json({updated: {article: true, tags: true}, result: article.result });
        }
        return res.status(201).json({updated: {article: true, tags: false}, result: article.result });
    }
    return res.status(400).json({updated: {article: false, tags: false}, result: article.result });
});

/* Supression d'un article */
/* ex: /dashboard/article?id=2 */
dashboardArticleRouter.delete('/:id', async (req, res, next) => {
    const { id } = req.body;
    const result = await articleController.delete.by.id(id);

    return res.json(result);
});

