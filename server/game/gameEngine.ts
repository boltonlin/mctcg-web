import type { Socket } from 'socket.io';
import type { GameSetupConfig, PlayerForm } from '../../common';
import { default as setup_1 } from './setup_1';

// ! placeholders
const playerForm: PlayerForm = {
  deckId: '63ffec30ba725eaeca9b5b97',
  designation: 'PLAYER1',
  name: 'PROXYPLAYER',
};
const gameSetupConfig: GameSetupConfig = {
  difficulty: 'Normal',
  firstPlayer: 'PLAYER1',
  heroSets: ['Spider-Man'],
  modularSets: ['Standard', 'Bomb Scare'],
  numPlayers: 1,
  villainSet: 'Rhino',
};

export default function GameEngine(io: Socket) {
  if (io.connected) {
    console.log('a user is connected');
    io.emit('hello', io.id);
  }

  io.on('start-game', async () =>
    io.emit('update-perspective', await setup_1(playerForm, gameSetupConfig)),
  );

  io.on('send-message', (message) => {
    console.log(message);
    io.broadcast.emit('print-log', message);
  });
}
