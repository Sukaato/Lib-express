import { Router } from 'express';

export const idUrlValidator = Router();

idUrlValidator.get('/:id', (req, res, next) => {
    let { id } = req.params;
    if (id) {
        id = parseInt(id, 10);
        if (isNaN(id) || id < 1) return res.render("404");
        req.local.id = id;
    }

    return next();
});
