import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import path from 'path';

/* Database */
import { database } from './database/connection';
/* Middlewares */
import { geolocationMiddleware } from './middlewares/geolocation.middleware';
import { loggerMiddleware } from './middlewares/logger.middleware';
/* Routes */
import { router } from './routes/router';
/* Logger */
import { logger } from './utils/logger';
import { tokenValidator } from './middlewares/validators/token.validator';

const log = logger.getLogger("[MAIN]");

const app = express();
const PORT = process.env.NODE_PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';
const dirs = {
    views: '../public/views',
    public: '../public'
}; 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(express.static(path.join(__dirname, dirs.public)));

/* Defined view engin and directory */
app.set('views', path.join(__dirname, dirs.views));
app.set('view engine', 'pug');

app.disable('x-powered-by');

/* Middleware globaux */
app.use(geolocationMiddleware);
app.use(loggerMiddleware);

/* Route */
app.use('/', router.index);
app.use('/article', router.article);
app.use('/tag', router.tag);
app.use('/dashboard', tokenValidator, router.dashboard.index);
app.use('/dashboard/article', tokenValidator, router.dashboard.article);
app.use('/dashboard/tag', tokenValidator, router.dashboard.tag);
app.use('/dashboard/user', tokenValidator, router.dashboard.user);
app.use('/dashboard/role', tokenValidator, router.dashboard.role);
app.use('/login', router.login);

/* Handle error middlewares */
app.use(router.error[404]);
app.use(router.error[500]);

database.getConnection()
    .then((poolConnection) => {
        app.listen(PORT, (err) => {
            if (err) {
                log.error('Unable to connect the server:', err);
            } else {
                log.info("Environement:", ENV);
                log.info("La base de donnée est connecter");
                log.info(`Server listening on http://localhost:${PORT}`);
            }
        });

    }).catch((err) => {
        log.fatal(`L'application ne peux se lancer car la base de bonnée n'est pas accésible`);
        log.fatal(err);
    });