import type {
  CardType,
  DeckType,
  PlayerCardType,
  ScenarioCardType,
  CollectorSet,
} from './constants';

type CollectorInfo = [CollectorSet, number];

// ! CHANGE THIS
type Script = (TBD: any) => void;

export interface Ability {
  scripts: [Script];
}

export interface Card {
  ability: Ability | null;
  cinfo: CollectorInfo;
  ctype: CardType;
  dtype: DeckType;
  flavor: string | null;
  title: string;
}

export interface PlayerCard extends Card {
  ctype: PlayerCardType;
  dtype: 'PLAYER';
}

export interface ScenarioCard extends Card {
  ctype: ScenarioCardType;
  dtype: 'SCENARIO';
}

export interface CharacterCard extends Card {
  ATK: number;
  active: boolean;
  ctype: 'ALLY' | 'IDENTITY_ALTER' | 'IDENTITY_HERO' | 'MINION' | 'VILLAIN';
  hitPoints: number;
  traits: Set<string>;
}

/**
 * Characters can use exhaust themselves to use a basic power, at minimum they
 * have an ATK stat, but they may have SCH and THW.
 * @prop {number} ATK Attack stat
 * @prop {boolean} active False if exhausted, True if not
 */
export abstract class Character implements CharacterCard {
  ATK: number;
  ability: Ability | null;
  active: boolean;
  cinfo: CollectorInfo;
  ctype: 'ALLY' | 'IDENTITY_ALTER' | 'IDENTITY_HERO' | 'MINION' | 'VILLAIN';
  dtype: DeckType;
  flavor: string | null;
  hitPoints: number;
  title: string;
  traits: Set<string>;

  constructor(sheet: CharacterCard) {
    this.ATK = sheet.ATK;
    this.ability = sheet.ability;
    this.active = false;
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
