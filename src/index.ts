import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './routes/all_routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

/**
 * All routes should go within this routes file
 * Base url can be defined here
 */
app.use(`/`, routes());

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});