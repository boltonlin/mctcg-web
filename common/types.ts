import type { CardType, DeckType, CollectorSet } from './constants';

type CollectorInfo = [CollectorSet, number];

export interface Ability {
  scripts: [Function];
}

export interface Card {
  title: string;
  ctype: CardType;
  ability: Ability;
  cinfo: CollectorInfo;
  dtype: DeckType;
}
