import path = require('path');
import express = require('express');
import morgan = require('morgan');
import { default as router } from './routes';
import './db';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../../client/dist')));
app.use('/', router);

app.listen(3000);
// eslint-disable-next-line
console.log('Server listening at port 3000');
