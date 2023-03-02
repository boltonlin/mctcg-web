import type { CardCode } from '../card/types';
import type { DeckType } from '../card/constants';

export type DeckList = Map<CardCode, number>;

export interface IDeckInfo {
  decklist: DeckList;
  dtype: DeckType;
  id: number;
  name: string;
}

export interface IPlayerDeckList {
  hero: string;
  heroCardList: Map<string, number>;
  heroCode: string;
  heroList: Map<string, number>;
  name: string;
  nemesisList: Map<string, number>;
  nonHeroList: Map<string, number>;
  obligations: Map<string, number>;
}
