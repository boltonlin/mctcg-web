import type { VillainName } from '../index';
import type { Owner } from './constants';

export default class VillainAvatar {
  currentHitPoints: number;
  currentStage: number;
  designation: Owner = 'VILLAIN';
  finalStage: number;
  maxHitPoints: number;
  name: VillainName;

  constructor(
    name: VillainName,
    hitPoints: number,
    currentStage: number,
    finalStage: number
  ) {
    this.name = name;
    this.currentHitPoints = hitPoints;
    this.maxHitPoints = hitPoints;
    this.currentStage = currentStage;
    this.finalStage = finalStage;
  }
}
