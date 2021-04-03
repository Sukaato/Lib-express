import { Router } from 'express';
import { articleController as controller } from '../controllers/article.controller';
import { pageValidator } from '../middlewares/validators/page.validator.js';

export const indexRouter = Router();

indexRouter.get('/', pageValidator, async (req, res, next) => {
    const { page } = req.local;
    const articles = await controller.get.list.by.page(page);

    return res.render('index', { 
        articles 
    });
});

