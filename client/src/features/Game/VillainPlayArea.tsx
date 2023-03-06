import React from 'react';
import { Pile, Zone } from '../../../../common/index';

type Props = {
  zones: Zone[];
  piles: Pile[];
};

export default function VillainPlayArea({ zones, piles }: Props) {
  return <div className="h-full">VillainPlayArea</div>;
}
