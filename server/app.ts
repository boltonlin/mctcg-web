import path = require('path');
import express = require('express');
import morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../../client/dist')));

app.listen(3000);
console.log('Server listening at port 3000');
