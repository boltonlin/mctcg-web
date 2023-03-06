import React, { ReactElement, useEffect, useState } from 'react';
const { Socket } = require('socket.io-client');
import { PlayerPerspective } from '../../../../common/index';
import Hand from './Hand';

type Props = {
  io: typeof Socket;
  perspective: PlayerPerspective;
};

export default function Game({ io, perspective }: Props) {
  const [ready, setReady] = useState(false);
  const render = (): ReactElement | null => {
    if (!ready) return null;
    return <Hand hand={perspective.hand.cards} />;
  };
  useEffect(() => {
    console.log(perspective);
    if (Object.keys(perspective).length) {
      setReady(true);
    }
  }, [perspective]);
  return <div>{render()}</div>;
}
