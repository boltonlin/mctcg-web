import type {
  CardType,
  DeckType,
  PlayerCardType,
  ScenarioCardType,
  CollectorSet,
} from './constants';

export type CollectorInfo = [CollectorSet, number];

// ! CHANGE THIS
type Script = (TBD: any) => void;

export type Ability = {
  scripts: [Script];
};

export interface ICardInfo {
  ability: Ability | null;
  cinfo: CollectorInfo;
  ctype: CardType;
  dtype: DeckType;
  flavor: string | null;
  title: string;
}

export interface IPlayerCard extends ICardInfo {
  ctype: PlayerCardType;
  dtype: 'PLAYER';
}

export interface IScenarioCard extends ICardInfo {
  ctype: ScenarioCardType;
  dtype: 'SCENARIO';
}

export interface ICharacterCardInfo extends ICardInfo {
  ATK: number;
  ctype: 'ALLY' | 'IDENTITY_ALTER' | 'IDENTITY_HERO' | 'MINION' | 'VILLAIN';
  hitPoints: number;
  traits: Set<string>;
}

/**
 * Represents state of a card
 * @prop {boolean} active False if exhausted, True if not
 */
export interface ICharacterCardState {
  active: boolean;
}

/**
 * Characters can use exhaust themselves to use a basic power, at minimum they
 * have an ATK stat, but they may have SCH and THW.
 * @prop {number} ATK Attack stat
 */
export abstract class Character implements ICharacterCardInfo {
  ATK: number;
  ability: Ability | null;
  cinfo: CollectorInfo;
  ctype: 'ALLY' | 'IDENTITY_ALTER' | 'IDENTITY_HERO' | 'MINION' | 'VILLAIN';
  dtype: DeckType;
  flavor: string | null;
  hitPoints: number;
  title: string;
  traits: Set<string>;

  constructor(sheet: ICharacterCardInfo) {
    this.ATK = sheet.ATK;
    this.ability = sheet.ability;
    this.cinfo = sheet.cinfo;
    this.ctype = sheet.ctype;
    this.dtype = sheet.dtype;
    this.flavor = sheet.flavor;
    this.hitPoints = sheet.hitPoints;
    this.title = sheet.title;
    this.traits = sheet.traits;
  }

  abstract receiveAttack(incomingAttack: number): void;
  abstract receiveDamage(damage: number): void;
  abstract triggerDefeat(): void;
  abstract useBasicAttack(target: Character): void;
}
