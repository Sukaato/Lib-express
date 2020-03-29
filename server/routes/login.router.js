import { Router } from 'express';
import { userController as controller } from '../controllers/user.controller';
import { passwordValidator } from '../middlewares/validators/password.validator';
import { logger } from '../utils/logger';

const log = logger.getLogger('[ROUTER] [LOGIN] [POST]')

export const loginRouter = Router();

loginRouter.post('/', async (req, res, next) => {
    const { login, password } = req.body;

    if (!login) return res.json({error: {login: "Le login doit être remplis"}});
    if (!password) return res.json({error: {password: "Le mot de passe doit être remplis"}});

    const exist = await controller.get.by.login(login);
    if (!exist) return res.render('errors/404');

    req.local.user = {
        login: exist.login,
        password: exist.password,
        role: exist.role
    };
    req.local.password = password;

    return next();
}, passwordValidator);

