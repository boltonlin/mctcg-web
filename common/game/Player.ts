import type { Owner } from './constants';

export default class Player {
  designation: Owner;
  hitPoints: number;
  name: string;

  constructor(name: string, designation: Owner, hitPoints: number) {
    this.name = name;
    this.designation = designation;
    this.hitPoints = hitPoints;
  }
}
