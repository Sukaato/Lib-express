import { Router } from 'express';
import { tagController } from '../../controllers/tag.controller';
import { logger } from '../../utils/logger';

const log = logger.getLogger("[VALIDATOR] [TAG/URL]");

export const tagValidator = Router();

tagValidator.get('/:tag', async (req, res, next) => {
    const { tag } = req.params;
    log.info("tag:", tag);

    const exist = await tagController.get.by.name(tag);
    if (!exist) return res.render('errors/404');

    req.local.tag = tag;

    return next();
});

