import { Router } from 'express';

export const pageValidator = Router();

pageValidator.get('*', (req, res, next) => {
    let { page } = req.query;

    if (page) {
        page = parseInt(page, 10);
        if (isNaN(page) || page < 1) return res.render('404');
        req.local.page = page;

    } else {
        req.local.page = 1;
    }

    return next();
});

