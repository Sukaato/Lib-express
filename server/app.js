import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { indexRouter } from './routes/index';
import { usersRouter } from './routes/users';

const app = express();
const directories = {
  views: "../public/views/",
  public: "../public/"
};

app.set('views', path.join(__dirname, directories.views));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, directories.public)));

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;
