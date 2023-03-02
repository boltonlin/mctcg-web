import type Card from '../card/Card';
import type { DeckType } from '../card/constants';
import type { Owner } from '../game/constants';
import Pile from '../pile/Pile';

export default class Deck extends Pile {
  dtype: DeckType;

  constructor(cards: Card[], dtype: DeckType, owner: Owner) {
    super(cards, owner);
    this.dtype = dtype;
  }

  override prettyPrint(): string {
    let str = `Size: ${this.size}\n`;
    str += `Type: ${this.dtype}\n`;
    str += super.prettyPrintCards();
    return str;
  }
}
