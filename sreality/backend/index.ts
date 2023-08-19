import express, { Express } from 'express';
import dotenv from 'dotenv';
const path = require('path')

const flatsRouter = require('./routes/flats.routes')

dotenv.config({ path: path.resolve(__dirname, './../.env') });

const app: Express = express();
const port = process.env.NODE_APP_PORT || 5000;

app.use(express.json())

app.use('/api', (flatsRouter));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});