import { Owner, Zone } from '../game/constants';
import type {
  CardType,
  DeckType,
  PlayerCardType,
  ScenarioCardType,
  CollectorSet,
  CardState,
} from './constants';

// ! CHANGE THIS
type Script = (TBD: any) => void;
type Location = [Zone, Owner?];

export type Ability = { scripts: [Script] };
export type CollectorInfo = [CollectorSet, number];

export interface ICardInfo {
  ability: Ability | null;
  cinfo: CollectorInfo;
  code: string;
  ctype: CardType;
  dtype: DeckType;
  flavor: string | null;
  title: string;
}

export interface IPlayerCardInfo extends ICardInfo {
  ctype: PlayerCardType;
  dtype: 'PLAYER';
}

export interface IScenarioCardInfo extends ICardInfo {
  ctype: ScenarioCardType;
  dtype: 'SCENARIO';
}

export interface ICharacterCardInfo extends ICardInfo {
  ATK: number;
  ctype: 'Ally' | 'Alter-Ego' | 'Hero' | 'Minion' | 'Villain';
  hitPoints: number;
  traits: Set<string>;
}

export abstract class Card {
  currentInfo: ICardInfo;
  location: Location;
  readonly originalInfo: ICardInfo;
  owner: Owner;
  state: CardState;

  constructor(
    info: ICardInfo,
    location: Location,
    owner: Owner,
    state: CardState
  ) {
    this.currentInfo = info;
    this.originalInfo = info;
    this.location = location;
    this.owner = owner;
    this.state = state;
  }
}
