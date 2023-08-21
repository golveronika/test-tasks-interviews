import express, { Express } from 'express';
import dotenv from 'dotenv';
const path = require('path')

const flatsRouter = require('./routes/flats.routes')

dotenv.config({ path: path.resolve(__dirname, './../.env') });

const app: Express = express();
const port = process.env.NODE_APP_PORT || 8080;

app.use(express.json())

app.use((_,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers','*');
  next(); 
})

app.use('/api', (flatsRouter));


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});