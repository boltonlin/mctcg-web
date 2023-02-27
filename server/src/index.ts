const path = require('path');
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
// const router = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../client/dist')));
// app.use('/api', router);

app.listen(3000);
console.log('Server listening at port 3000');
