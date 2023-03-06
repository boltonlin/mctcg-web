import type { Socket } from 'socket.io';
import type { GameSetupConfig, PlayerForm } from '../../common';
import GameStateModel from '../models/gameStateModel';
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
  let gameState;

  if (io.connected) {
    console.log('a user is connected');
    io.emit('hello', io.id);
  }

  io.on('start-game', async () => {
    const [playerPerspective, setupGameState] = await setup_1(
      playerForm,
      gameSetupConfig,
    );
    io.emit('update-perspective', await playerPerspective);
    gameState = await setupGameState;
    io.emit('log', `Game Start! id: ${gameState?._id}`);
  });
}
