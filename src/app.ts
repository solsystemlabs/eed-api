import express, { Express, NextFunction, Request, Response } from "express";
import createError, { HttpError } from 'http-errors';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import usersRouter from './routes/users';
import indexRouter from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/user', usersRouter);
app.use('/api/v1', indexRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;