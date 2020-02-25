import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createError from 'http-errors';

import { lib_express } from './database/connection/dbConnection';
import { indexRouter } from './routes/index';
import { usersRouter } from './routes/users';

const app = express();
const PORT = process.env.NODE_PORT || 3000;
const dirs = {
  views: '../public/views/',
  public: 'public'
};

app.set('views', path.join(__dirname, dirs.views));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, dirs.public)));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
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
  res.render({title: "SERVER ERROR", error: {status: err.status.toString()}});
});

lib_express.connect(err => {
  if (err) {
    console.log(`[ DATABASE ] [ ERROR ] ${err.sqlMessage}`);
    throw `[ APP      ] [       ] L'application ne peux se lancer car la base de bonnée n'est pas accésible`;
  } else {
    app.listen(PORT, (err) => {
      if (err) console.error('Unable to connect the server: ', err);
      console.log(`Server listening on port ${PORT}`);
    });
  }
});

export default app;
