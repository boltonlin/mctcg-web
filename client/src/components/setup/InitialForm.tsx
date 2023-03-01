import React, { ReactElement } from 'react';
import axios from 'axios';
import {
  DeckId,
  Difficulty,
  IDeckInfo,
  Player,
  PlayerId,
  VillainName,
} from '../../../../common';

type InitialForm = {
  deck: DeckId;
  firstPlayer: PlayerId;
  villain: VillainName;
  difficulty: Difficulty;
};

const proxyPlayer: Player = {
  id: 0,
  name: 'PLAYER 1',
};

export default function InitialForm(): ReactElement {
  // TODO: actually fetch
  const fetchDeckSelection = (): DeckId[] => {
    return [0];
  };

  const fetchPlayerSelection = (): Player[] => {
    return [proxyPlayer];
  };

  const fetchVillainSelection = (): VillainName[] => {
    return ['Rhino', 'Klaw', 'Ultron'];
  };

  return <div>Initial Form</div>;
}
