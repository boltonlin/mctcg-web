import React from 'react';
import { Card } from '../../../../common/index';
import CardView from './CardView';

type Props = {
  hand: Card[];
  setFocusCard: React.Dispatch<React.SetStateAction<Card>>;
};

export default function Hand({ hand, setFocusCard }: Props) {
  return (
    <div>
      {hand.map((card, index) => {
        return (
          <CardView
            key={`${index}_${card.zone}${card.originalInfo.code}`}
            card={card}
            w={300}
            setFocusCard={setFocusCard}
          />
        );
      })}
    </div>
  );
}
