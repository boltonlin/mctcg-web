import React, { FormEvent, MouseEvent, ReactElement, useState } from 'react';
const { Socket } = require('socket.io-client');

type FormName = 'initial' | 'selectSet' | 'resolveMulligan';

type Props = {
  socket: typeof Socket;
  setPerspective: React.Dispatch<React.SetStateAction<{}>>;
  movePhase: () => void;
};

export default function Setup({ socket, setPerspective, movePhase }: Props) {
  const [formTracker, setFormTracker] = useState<FormName>('initial');

  const renderSetupForm = (): ReactElement => {
    switch (formTracker) {
      case 'initial':
        return <div>Initial Form</div>;
      case 'selectSet':
        return <div>Select Modular Set</div>;
      case 'resolveMulligan':
        return <div>Resolve Mulligan</div>;
    }
  };

  const handleStart = (e: MouseEvent) => {
    socket.emit('start-game');
    movePhase();
  };

  return (
    <div>
      <button type="button" onClick={handleStart}>
        Start
      </button>
    </div>
  );
}
