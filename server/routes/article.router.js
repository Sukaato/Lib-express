import { Router } from 'express';
import { articleController } from '../controllers/article.controller';
import { commentController } from '../controllers/comment.controller';
import { idUrlValidator } from '../middlewares/validators/id.params.validator';

export const articleRouter = Router();

articleRouter.get('/:id', idUrlValidator, async (req, res, next) => {
    const { id } = req.local;

    const article = await articleController.get.by.id(id);
    const comments = await commentController.get.comments.by.article.id(id);

    return res.render('article', {
        article,
        comments
    });
});

