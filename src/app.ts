import express from "express";
// import { join } from "path";
import logger from "morgan";

import indexRouter from "./routes/index";

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(join(__dirname, 'public')));

app.use('/api', indexRouter);

export default app;