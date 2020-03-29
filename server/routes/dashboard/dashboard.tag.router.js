import { Router } from 'express';
import { tagController as controller } from '../../controllers/tag.controller';

export const dashboardTagRouter = Router();

/* Liste des aticles */
dashboardTagRouter.get('/', async (req, res, next) => {
    const tags = await controller.get.tags();

    return res.render('dashboard/tag', {
        title: 'Dashboard', 
        tags 
    });
});

/* Ajout d'un tag */
dashboardTagRouter.post('/', async (req, res, next) => {
    const { body } = req;
    const result = await controller.post(body.tag);

    return res.status(201).json(result);
});


/* Modification d'un tag */
dashboardTagRouter.patch('/:id', async (req, res, next) => {
    const { body } = req;
    const result = await controller.patch.by.id(body);

    return res.status(200).json(result);
});

/* Supression d'un tag */
dashboardTagRouter.delete('/:id', async (req, res, next) => {
    const { id } = req.body;
    const result = await controller.delete.by.id(id);

    return res.json(result);
});
