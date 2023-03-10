import React from 'react';
import { Card } from '../../../../common/index';

type Props = {
  card: Card;
  setFocusCard: React.Dispatch<React.SetStateAction<Card>>;
};

export default function CardView({ card, setFocusCard }: Props) {
  return (
    <img
      className="w-[10rem] h-max rounded-xl m-[2px]"
      onMouseEnter={() => setFocusCard(card)}
      src={`https://marvelcdb.com${card.originalInfo.imagesrc}`}
    />
  );
}
