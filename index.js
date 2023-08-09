import { config } from 'dotenv';
import express from 'express';
import { initApp } from './src/app.routes.js';
config();
const app = express()
const port = 5000


initApp(app, express) ;


app.listen(port, () => console.log(`Example app listening on port ${port}!`))