import React, { ReactElement, useEffect, useState } from 'react';
const { Socket } = require('socket.io-client');
import { Card, PlayerPerspective } from '../../../../common/index';
import Hand from './Hand';
import PlayerPlayArea from './PlayerPlayArea';
import VillainPlayArea from './VillainPlayArea';

type Props = {
  io: typeof Socket;
  perspective: PlayerPerspective;
  setFocusCard: React.Dispatch<React.SetStateAction<Card>>;
};

export default function Game({ io, perspective, setFocusCard }: Props) {
  const [ready, setReady] = useState(false);
  const render = (): ReactElement | null => {
    if (!ready) return null;

    const {
      AllyZone,
      IdentityZone,
      SupportZone,
      UpgradeZone,
      MinionZone,
      VillainZone,
      AttachmentZone,
      MainSchemeZone,
      SideSchemeZone,
    } = perspective?.zones;

    const { EncounterDiscardPile, IdentityPile, PlayerDiscardPile } =
      perspective?.piles;
    return (
      <div className="flex flex-col w-full justify-between">
        <VillainPlayArea zones={[]} piles={[]} />
        <PlayerPlayArea
          zones={[AllyZone, IdentityZone, SupportZone, UpgradeZone, MinionZone]}
          piles={[IdentityPile, PlayerDiscardPile]}
        />
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
