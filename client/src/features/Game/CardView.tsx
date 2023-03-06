import React from 'react';
import { Card } from '../../../../common/index';

type Props = {
  card: Card;
  w: number;
};

export default function CardView({ card, w }: Props) {
  return <img src={`https://marvelcdb.com${card.originalInfo.imagesrc}`}></img>;
}
