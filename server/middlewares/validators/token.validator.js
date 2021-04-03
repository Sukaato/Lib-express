import { Router } from 'express';
import jwt from 'jsonwebtoken';

export const tokenValidator = Router();

tokenValidator.all('*', async (req, res, next) => {
    try {
        const decoded = jwt.verify(req.cookies.token, 'qslkdfjbbp-@213dfvovihsverf');
    
        const { login, password, role, ip } = decoded;
    
        if (decoded && login && password && (role === "Admin" || role === "Editor")  && ip === req.local.ip) {
            return next();
        } else {
            return res.sendStatus(401);
        }
    } catch (error) {
        return res.sendStatus(401);
    }
});

