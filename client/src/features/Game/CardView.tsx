import React from 'react';
import { Card } from '../../../../common/index';

type Props = {
  card: Card;
  w: number;
  setFocusCard: React.Dispatch<React.SetStateAction<Card>>;
};

export default function CardView({ card, w, setFocusCard }: Props) {
  return (
    <img
      className="w-[10rem] p-1"
      onMouseEnter={() => setFocusCard(card)}
      src={`https://marvelcdb.com${card.originalInfo.imagesrc}`}
    ></img>
  );
}
