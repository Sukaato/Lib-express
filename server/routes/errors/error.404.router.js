import { Router } from "express";
import { logger } from '../../utils/logger';

const log = logger.getLogger("[ROUTER] Error 404");

export const error404Router = Router();

error404Router.use((req, res, next) => {
    const { ip } = req.local;
    log.info(`[${ip}]`, req.originalUrl);

    return res.status(404).render('errors/404');
});