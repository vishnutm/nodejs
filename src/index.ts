import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import  config  from 'config';
import connectionToDb from './utils/connectionDb';
import router from './routes'

dotenv.config();
const port = config.get("port")
const app: Express = express();
app.use(router)


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);

  connectionToDb()
  
});