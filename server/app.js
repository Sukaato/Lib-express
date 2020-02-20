import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { lib_express } from './database/connection/dbConnection';
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

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404);

  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  err.status = err.status || 500;

  // console.log("ERROR STATUS: ", err.status);
  
  // render the error page
  res.status(err.status);
  res.render(err.status.toString());
});

lib_express.connect(err => {
  if (err) {
    throw `[DATABASE] [ERROR] ${err.sqlMessage}`;
  }
  app.listen(3333, () => {
    console.log('Server listening...');
  });
});

export default app;
