import { Router } from 'express';
import { roleController as controller } from '../../controllers/role.controller';

export const dashboardRoleRouter = Router();

/* Liste des aticles */
dashboardRoleRouter.get('/', async (req, res, next) => {
    const roles = await controller.get.list();

    return res.json({
        roles 
    });
});
