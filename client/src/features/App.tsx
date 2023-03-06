import React, { ReactElement, useState } from 'react';
import Setup from './Setup';
import { Phase } from '../../../common';
import GameLog from './GameLog';
// import { Stage } from '@inlet/react-pixi';

const { io } = require('socket.io-client');
const socket = io();

export default function App() {
  const [phase, setPhase] = useState<Phase>('SETUP_PHASE');
  const [perspective, setPerspective] = useState({});

  const renderPhase = (): ReactElement => {
    switch (phase) {
      case 'SETUP_PHASE':
        return (
          <Setup
            socket={socket}
            setPerspective={setPerspective}
            movePhase={() => setPhase('PLAYER_PHASE')}
          />
        );
      case 'PLAYER_PHASE':
        return <div>Player Phase</div>;
      case 'VILLAIN_PHASE':
        return <div>Villain Phase</div>;
    }
  };

  return (
    <div>
      <GameLog socket={socket} />
      {renderPhase()}
    </div>
  );
}
