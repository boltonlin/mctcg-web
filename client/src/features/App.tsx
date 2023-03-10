import React, { ReactElement, useEffect, useState } from 'react';
import Setup from './Setup';
import { Card, Phase, PlayerPerspective } from '../../../common';
import GameLog from './GameLog';
import Game from './Game';
import Control from './Game/Control';
import pback from '../assets/pback.png';
import bg from '../assets/bg.jpg';

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
          <div className="relative w-full h-screen">
            <img
              className="absolute top-0 left-0 object-cover w-full h-full filter brightness-90 grayscale-50"
              src={bg}
              alt="background"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-95"></div>
            <div className="absolute inset-0 flex p-2">
              <Control
                card={focusCard}
                commands={['Fight', 'Magic', 'Item', 'Run']}
              />
              <Game
                io={socket}
                perspective={perspective}
                setFocusCard={setFocusCard}
              />
              <GameLog socket={socket} />
            </div>
          </div>
        );
    }
  };

  useEffect(() => {
    console.log(bg);
    console.log(perspective);
  }, [perspective]);

  return renderPhase();
}
