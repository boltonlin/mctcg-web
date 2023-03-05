import Pile from '../game/Pile';
import type { Card } from '../index';

export default class Deck extends Pile {
  // draw() {}
  // search() {}
  // shuffle() {}
  deal(target: Pile, num: number): void {
    const temp: Card[] = [];
    if (this.size >= num) {
      for (let i = 0; i < num; i += 1) {
        temp.push(this.cards?.shift() as Card);
      }
    }
    target.unshift(...temp);
  }
}
