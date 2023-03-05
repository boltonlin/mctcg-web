import type Card from '../card/Card';
import type { Owner, ZoneName } from '../game/constants';
import type { DeckType } from '../index';
import type { PileType } from './types';

export default class Pile {
  cards: Card[];
  owner: Owner;
  size: number;
  type: PileType | DeckType;
  zone: ZoneName;

  constructor(
    cards: Card[],
    owner: Owner,
    type: PileType | DeckType,
    zone: ZoneName
  ) {
    this.cards = cards;
    this.type = type;
    this.size = cards.length;
    this.owner = owner;
    this.zone = zone;
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

  findByAttribute(
    keyQuery: string,
    valueQuery: string | number | boolean
  ): number {
    for (let i = 0; i < this.cards.length; i += 1) {
      if (this.cards[i]?.originalInfo?.[keyQuery] === valueQuery) return i;
    }
    return -1;
  }

  findByTitle(titleQuery: string): number {
    for (let i = 0; i < this.cards.length; i += 1) {
      if (this.cards[i]?.originalInfo?.title === titleQuery) return i;
    }
    return -1;
  }

  prettyPrint(): string {
    let str = `Name: ${this.type} ${this.constructor.name}\n`;
    str += `Size: ${this.size}\n`;
    str += `Zone: ${this.zone}\n`;
    str += `Owner: ${this.owner}\n`;
    return str + this.prettyPrintCards();
  }

  prettyPrintCards(): string {
    let str = '[\n';
    for (let i = 0; i < this.cards.length; i += 1) {
      str += '  "';
      str += `${this.cards[i]?.originalInfo?.title}` ?? '';
      if (this.cards[i]?.originalInfo?.stageNumber)
        str += ` ${this.cards[i]?.originalInfo?.stageNumber}` ?? '';
      str += '"\n';
    }
    str += ']\n';
    return str;
  }

  take(index: number): Card {
    const result = this.cards[index] as Card;
    this.cards.splice(index, 1);
    this.size -= 1;
    return result;
  }
}
