import { Router } from 'express';
import { articleController } from '../controllers/article.controller';
import { tagController } from '../controllers/tag.controller';
import { pageValidator } from '../middlewares/validators/page.validator.js';
import { tagValidator } from '../middlewares/validators/tag.params.validator.js';

export const tagRouter = Router();

/* GET home page. */
tagRouter.get('/', async (req, res, next) => {
    const tags = await tagController.get.tags();

    return res.render('tag', {
        tags 
    });
});

tagRouter.get('/:tag', tagValidator, pageValidator, async (req, res, next) => {
    const { tag, page } = req.local;
    
    const articles = await articleController.get.list.by.pageAndTag(tag, page);

    return res.render('index', {
        articles 
    });
});

