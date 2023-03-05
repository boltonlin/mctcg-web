import type { Request } from 'express';
import type { Response } from 'express-serve-static-core';
import type { GameSetupConfig, PlayerForm } from '../../common';
import setup_1 from '../game/setup_1';

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

export default {
  async getInitSetup(req: Request, res: Response) {
    req;
    const playerPerspective = await setup_1(playerForm, gameSetupConfig);
    res.status(200).send(playerPerspective);
  },
};
