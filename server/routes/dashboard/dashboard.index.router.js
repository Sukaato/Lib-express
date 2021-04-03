import { Router } from 'express';
import { articleController } from '../../controllers/article.controller';
// import { commentController } from '../../controllers/comment.controller';
import { tagController } from '../../controllers/tag.controller';
import { userController } from '../../controllers/user.controller';

export const dashboardIndexRouter = Router();

/* GET home page. */
dashboardIndexRouter.get('/', async (req, res, next) => {
    const articleNumber = await articleController.get.count();
    const tagNumber = await tagController.get.count();
    const userNumber = await userController.get.count();
    // const commentNumber = await commentController.get.count();

    return res.render('dashboard/index', {
        title: 'Dashboard',
        article: articleNumber,
        tag: tagNumber,
        user: userNumber,
        // comment: commentNumber
    });
});

