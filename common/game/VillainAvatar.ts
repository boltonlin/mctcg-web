import { Owner } from './constants';

export default class VillainAvatar {
  currentHitPoints: number;
  currentStage: number;
  designation: Owner = 'VILLAIN';
  finalStage: number;
  maxHitPoints: number;
  name: string;

  constructor(
    name: string,
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
