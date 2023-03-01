import React, { ReactElement, useState } from 'react';
import Setup from './setup/Setup';
import { Phase } from '../../../common';
import { Stage } from '@inlet/react-pixi';

export default function App() {
  const [phase, setPhase] = useState<Phase>('setup');
  const renderPhase = (): ReactElement => {
    switch (phase) {
      case 'setup':
        return <Setup />;
      case 'player':
        return <div>Player Phase</div>;
      case 'villain':
        return <div>Villain Phase</div>;
    }
  };
  return <Stage>{renderPhase()}</Stage>;
}
