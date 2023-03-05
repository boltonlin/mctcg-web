import type { Card, Deck } from '../../common';

export default function shuffle(deck: Deck) {
  const cards: Card[] = deck.cards;
  var m: number = cards.length,
    t: Card,
    i: number;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = cards[m] as Card;
    cards[m] = cards[i] as Card;
    cards[i] = t;
  }

  return deck;
}
