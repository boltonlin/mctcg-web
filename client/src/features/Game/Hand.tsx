import React from 'react';
import { Card } from '../../../../common/index';
import CardView from './CardView';

type Props = {
  hand: Card[];
};

export default function Hand({ hand }: Props) {
  return (
    <div>
      {hand.map((card, index) => {
        return (
          <CardView
            key={`${index}_${card.zone}${card.originalInfo.code}`}
            card={card}
            w={300}
          />
        );
      })}
    </div>
  );
}
