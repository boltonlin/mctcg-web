import type { Card, Owner, ZoneName } from '../index';

// not a pile since cards will be laid out as a map
export default class Zone {
  cards: Card[];
  name: ZoneName;
  owner: Owner;
  size: number;

  constructor(name: ZoneName, owner: Owner) {
    this.name = name;
    this.owner = owner;
    this.cards = [];
    this.size = 0;
  }

  place(card: Card): void {
    this.cards.push(card);
    this.size += 1;
  }

  prettyPrint(): string {
    let str = `Zone: ${this.name}\n`;
    str += `Owner: ${this.owner}\n`;
    return str + this.prettyPrintCards();
  }

  prettyPrintCards(): string {
    let str = '[\n';
    this.cards.forEach((card, pos) => {
      str += `  ${pos}: `;
      str += `${card?.originalInfo?.title}` ?? '';
      if (card?.originalInfo?.stageNumber)
        str += ` ${card?.originalInfo?.stageNumber}` ?? '';
      str += '\n';
    });
    str += ']\n';
    return str;
  }
}
