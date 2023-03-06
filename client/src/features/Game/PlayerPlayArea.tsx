import React from 'react';
import { Pile, Zone } from '../../../../common/index';

type Props = {
  zones: Zone[];
  piles: Pile[];
};

export default function PlayerPlayArea({ zones, piles }: Props) {
  return <div className="h-full">PlayerPlayArea</div>;
}
