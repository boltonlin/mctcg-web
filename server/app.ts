const path = require('path');
const express = require('express');
const morgan = require('morgan');
const http = require('http');
const { Server } = require('socket.io');
const { instrument } = require('@socket.io/admin-ui');

import './db';
import gameEngine from './game/gameEngine';
import { default as router } from './routes';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['https://admin.socket.io'],
    credentials: true,
  },
});

instrument(io, { auth: false, mode: 'development' });
io.on('connection', gameEngine);

app.use(morgan('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../../client/dist')));
app.use('/', router);

server.listen(3000, () => {
  console.log('listening on port 3000');
});
