import React from 'react';
import { Card } from '../../../../common/index';
import CardView from './CardView';

type Props = {
  hand: Card[];
  setFocusCard: React.Dispatch<React.SetStateAction<Card>>;
};

export default function Hand({ hand, setFocusCard }: Props) {
  return (
    <div className="flex justify-center h-60 overflow-clip">
      {hand.map((card, index) => {
        return (
          <CardView
            key={`${index}_${card.zone}${card.originalInfo.code}`}
            card={card}
            setFocusCard={setFocusCard}
          />
        );
      })}
    </div>
  );
}
