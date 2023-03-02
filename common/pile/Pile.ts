import type Card from '../card/Card';
import type { Owner } from '../game/constants';

export default class Pile {
  cards: Card[];
  owner: Owner;
  size: number;

  constructor(cards: Card[], owner: Owner) {
    this.cards = cards;
    this.size = cards.length;
    this.owner = owner;
  }

  add(card: Card, qty?: number): void {
    if (!qty) {
      this.cards.push(card);
      this.size += 1;
    } else {
      for (let i = 0; i < qty; i += 1) {
        this.cards.push(card);
      }
      this.size += qty;
    }
  }

  prettyPrint(): string {
    const str = `Size: ${this.size}\n`;
    return str + this.prettyPrintCards();
  }

  prettyPrintCards(): string {
    let str = '[\n';
    for (let i = 0; i < this.cards.length; i += 1) {
      str += '  "';
      str += this.cards[i]?.originalInfo?.title ?? '';
      str += '"\n';
    }
    str += ']\n';
    return str;
  }
}
