import React, { ReactElement, useState } from 'react';
import Setup from './setup/Setup';
import { Phase } from '../../../common';
import { Stage } from '@inlet/react-pixi';

export default function App() {
  const [phase, setPhase] = useState<Phase>('SETUP_PHASE');
  const renderPhase = (): ReactElement => {
    switch (phase) {
      case 'SETUP_PHASE':
        return <Setup />;
      case 'PLAYER_PHASE':
        return <div>Player Phase</div>;
      case 'VILLAIN_PHASE':
        return <div>Villain Phase</div>;
    }
  };
  return <Stage>{renderPhase()}</Stage>;
}
