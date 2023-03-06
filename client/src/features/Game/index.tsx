import React, { ReactElement, useEffect, useState } from 'react';
const { Socket } = require('socket.io-client');
import { Card, PlayerPerspective } from '../../../../common/index';
import Hand from './Hand';

type Props = {
  io: typeof Socket;
  perspective: PlayerPerspective;
  setFocusCard: React.Dispatch<React.SetStateAction<Card>>;
};

export default function Game({ io, perspective, setFocusCard }: Props) {
  const [ready, setReady] = useState(false);
  const render = (): ReactElement | null => {
    if (!ready) return null;
    return (
      <div className="flex flex-col">
        {/* <PlayerZones /> */}
        <Hand hand={perspective.hand.cards} setFocusCard={setFocusCard} />
      </div>
    );
  };
  useEffect(() => {
    if (Object.keys(perspective).length) {
      setReady(true);
    }
  }, [perspective]);
  return render();
}
