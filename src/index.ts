import * as Express from 'express';
import * as BodyParser from 'body-parser';
import Router from './routes';
import * as Cors from 'cors';

require('dotenv').config();

const {
  PORT
} = process.env;

const app = Express();

app.use(BodyParser.json());

const corsSettings = {
  origin: [
    'http://productbreakfastclub.com/',
    'https://productbreakfastclub.com/',
    'http://vue-poc.jakubemfoto.pl/',
    'https://vue-poc.jakubemfoto.pl/',
  ]
};

app.use(Cors(corsSettings)); 
app.use('/', Router);

app.listen(PORT);