import type Card from '../card/Card';
import type { DeckType } from '../card/constants';
import type { Owner } from '../game/constants';
import Pile from '../pile/Pile';

export default class Deck extends Pile {
  constructor(cards: Card[], type: DeckType, owner: Owner) {
    super(cards, owner, type);
  }
}
