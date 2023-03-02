import type { Owner } from './constants';

export default class PlayerAvatar {
  currentHitPoints: number;
  designation: Owner;
  isFirstPlayer: boolean;
  maxHitPoints: number;
  name: string;

  constructor(
    name: string,
    designation: Owner,
    hitPoints: number,
    isFirstPlayer: boolean
  ) {
    this.name = name;
    this.designation = designation;
    this.currentHitPoints = hitPoints;
    this.maxHitPoints = hitPoints;
    this.isFirstPlayer = isFirstPlayer;
  }
}
