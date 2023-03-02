import type {
  ResourceType,
  Classification,
  ProductSet,
  CardType,
  CardSet,
} from './constants';

export type Traits = Set<string>;
export type ResourceMap = Map<ResourceType, number>;
export type Abilities = [number];
export type CardCode = string;
export type CardList = Map<CardCode, number>;

export interface ICardInfo {
  _id?: string;
  abilities?: number[];
  accelerationFactor?: number;
  attack?: number;
  attackConsequential?: number;
  backFlavor?: string;
  backImageSrc?: string;
  backText?: string;
  boostIcons?: number;
  cardSet: CardSet;
  cardSetNumber?: number;
  cardSetQty?: number;
  cardSetType?: string;
  class: Classification;
  code: CardCode;
  cost?: number;
  ctype: CardType;
  defense?: number;
  flavorText?: string;
  handSize?: number;
  hitPoints?: number;
  imagesrc: string;
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
  url: string;
}
