import Pile from '../game/Pile';
import type { Card } from '../index';

export default class Deck extends Pile {
  // draw() {}
  // search() {}
  // shuffle() {}

  /**
   * deals num cards to target pile
   * @param {Pile} target pile that cards from this deck will be dealt to
   * @param {number} num number of cards from the top of this deck that will be
   * dealt
   * @returns {number} difference in size after transaction
   */
  deal(target: Pile, num: number): number {
    const { size } = this;
    if (this.size >= num) {
      const temp: Card[] = [];
      for (let i = 0; i < num; i += 1) {
        const card = this.cards?.shift() as Card;
        card.zone = target.zone;
        if (target.zone === 'PlayerHand') card.state = 'IN_HAND';
        temp.push(card);
      }
      this.size -= num;
      target.unshift(...temp);
    }
    return size - this.size;
  }
}
