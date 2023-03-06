import React, { ReactElement, useEffect, useState } from 'react';
import Setup from './Setup';
import { Phase, PlayerPerspective } from '../../../common';
import GameLog from './GameLog';
import Game from './Game';
// import { Stage } from '@inlet/react-pixi';

const { io } = require('socket.io-client');
const socket = io();

export default function App() {
  const [phase, setPhase] = useState<Phase>('SETUP_PHASE');
  const [perspective, setPerspective] = useState({} as PlayerPerspective);

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
        return <Game io={socket} perspective={perspective} />;
    }
  };

  useEffect(() => {
    console.log(perspective);
  }, [perspective]);

  return (
    <div>
      <GameLog socket={socket} />
      {renderPhase()}
    </div>
  );
}
