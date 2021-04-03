import { Router } from "express";
import { logger } from '../../utils/logger';

const log = logger.getLogger("[ROUTER] Error 404");

export const error500Router = Router();

error500Router.use((err, req, res, next) => {
    const { ip } = req.local;
    log.info(`[${ip}]`, req.originalUrl);
    log.error(err.stack);

    return res.status(500).render('errors/500', {
        title: "Internal server Error - code 500", 
        error: err.stack
    });
})