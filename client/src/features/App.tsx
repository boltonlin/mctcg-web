import React, { ReactElement, useEffect, useState } from 'react';
import Setup from './Setup';
import { Card, Phase, PlayerPerspective } from '../../../common';
import GameLog from './GameLog';
import Game from './Game';
import FocusCard from './FocusCard';
import pback from '../assets/pback.png';

const { io } = require('socket.io-client');
const socket = io();

export default function App() {
  const [phase, setPhase] = useState<Phase>('SETUP_PHASE');
  const [perspective, setPerspective] = useState({} as PlayerPerspective);
  const [focusCard, setFocusCard] = useState({} as Card);

  const renderPhase = (): ReactElement => {
    switch (phase) {
      case 'SETUP_PHASE':
        return (
          <Setup
            socket={socket}
            setPerspective={setPerspective}
            movePhase={() => setPhase('GAME_PHASE')}
          />
        );
      case 'GAME_PHASE':
        return (
          <>
            <FocusCard card={focusCard} />
            <Game
              io={socket}
              perspective={perspective}
              setFocusCard={setFocusCard}
            />
            <GameLog socket={socket} />
          </>
        );
    }
  };

  useEffect(() => {
    console.log(perspective);
  }, [perspective]);

  return <div className="flex w-[99vw] justify-between">{renderPhase()}</div>;
}
