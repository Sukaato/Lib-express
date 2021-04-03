import bcrypt from 'bcrypt';
import { Router } from 'express';
import jwt from 'jsonwebtoken';

export const passwordValidator = Router();

passwordValidator.get('*', async (req, res, next) => {
    const { ip } = req.local;
    const passwordForm = req.local.password;
    const { password, login, role } = req.local.user;

    const passwordMatch = await bcrypt.compare(passwordForm, password);
    if (passwordMatch) {
        const token = jwt.sign({ 
                password,
                login,
                role,
                ip
            },
            'qslkdfjbbp-@213dfvovihsverf'
        );
        res.cookie('token', token, {maxAge: 900000});

        if (role === "Admin" || role === "Editor") {
            return res.redirect('/dashboard');
        }
        return res.redirect('/');
    } else {
        return next(401);
    }
});

