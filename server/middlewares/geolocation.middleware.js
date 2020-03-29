import { Router } from 'express';
import fetch from 'node-fetch';
import { logger } from '../utils/logger';

const log = logger.getLogger("[LOGGER] [GEOLOCATION]");
export const geolocationMiddleware = Router();

geolocationMiddleware.use(async (req, res, next) => {
    req.local = {};

    const ip = req.ip === "::1" ? '127.0.0.1' : req.ip.replace("::ffff:", '');

    log.info("IP:", ip);

    if (ip !== "127.0.0.1") {
        log.info("GET GEOLOCATION");
        await fetch(`http://ip-api.com/json/${ip}?fields=33292287`, { "method": "GET" })
            .then(async (result) => {
                const json = await result.json();

                log.info(json);
                if (json.error) log.error("Result", json.error);

                req.local.ip = json.query;

            }).catch((err) => {
                log.error("Error", err);
            });
    } else {
        req.local.ip = ip;
    }

    return next();

});