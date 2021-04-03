import { Router } from 'express';
import { userController as controller } from '../../controllers/user.controller';
import { pageValidator } from '../../middlewares/validators/page.validator';

export const dashboardUserRouter = Router();

/* Liste des aticles */
dashboardUserRouter.get('/', pageValidator, async (req, res, next) => {
    const { page } = req.local;
    const users = await controller.get.list.by.page(page);

    return res.render('dashboard/user', {
        title: 'Dashboard', 
        users 
    });
});

/* Ajout d'un tag */
dashboardUserRouter.post('/', async (req, res, next) => {
    const { body } = req;
    const result = await controller.post(body.tag);

    return res.status(201).json(result);
});


/* Modification d'un tag */
dashboardUserRouter.put('/:id', async (req, res, next) => {
    const { body } = req;
    const result = await controller.put.by.id(body);

    return res.status(200).json(result);
});

/* Supression d'un tag */
dashboardUserRouter.delete('/:id', async (req, res, next) => {
    const { id } = req.body;
    const result = await controller.delete.by.id(id);

    return res.json(result);
});
