import { Owner, Zone } from '../game/constants';
import type {
  CardState,
  ResourceType,
  Classification,
  ProductSet,
  DeckSet,
  CardType,
} from './constants';

export type Location = [Zone, Owner?];
export type Traits = Set<string>;
export type ResourceMap = Map<ResourceType, number>;
export type Abilities = [number];
export type CollectorInfo = [ProductSet, number];

export interface ICardInfo {
  accelerationFactor?: number;
  attack?: number;
  attackConsequential?: number;
  boostIcons?: number;
  class: Classification;
  code: string;
  cost?: number;
  ctype: CardType;
  deckSet: DeckSet;
  deckSetNumber?: number;
  defense?: number;
  handSize?: number;
  hitPoints?: number;
  linkedCard?: string;
  productSet: ProductSet;
  productSetNumber: number;
  recovery?: number;
  resourceEnergy?: number;
  resourceMental?: number;
  resourcePhysical?: number;
  resourceWild?: number;
  scheme?: number;
  stageNumber?: number;
  startingThreat?: number;
  subtitle?: string;
  targetThreat?: number;
  text: string;
  thwart?: number;
  thwartConsequential?: number;
  title: string;
  traits?: string;
  unique?: boolean;
}

export interface ICardMeta {
  imagesrc: string;
  url: string;
}

export abstract class Card {
  currentInfo: ICardInfo;
  readonly linkedInfo?: ICardInfo;
  location: Location;
  readonly originalInfo: ICardInfo;
  owner: Owner;
  state: CardState;

  constructor(
    info: ICardInfo,
    location: Location,
    owner: Owner,
    state: CardState,
    linkedInfo?: ICardInfo
  ) {
    this.currentInfo = info;
    this.originalInfo = info;
    this.location = location;
    this.owner = owner;
    this.state = state;
    if (linkedInfo) this.linkedInfo = linkedInfo;
  }
}
