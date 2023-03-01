import { CollectorInfo } from '../card/types';
import {
  DeckType,
  EncounterSet,
  IdentityName,
  VillainName,
} from '../card/constants';

type DeckAspect =
  | 'Aggression'
  | 'Justice'
  | 'Leadership'
  | 'Protection'
  | 'Adam';

export type Decklist = Map<CollectorInfo, number>;

export interface IDeckInfo {
  decklist: Decklist;
  dtype: DeckType;
  id: number;
  name: string;
}

export interface IPlayerDeckInfo extends IDeckInfo {
  aspect: DeckAspect;
  dtype: 'PLAYER';
  identity: IdentityName;
}

export interface IEncounterDeckInfo extends IDeckInfo {
  dtype: 'SCENARIO';
  encounterSets: Set<EncounterSet>;
}

export interface IVillainDeckInfo extends IDeckInfo {
  dtype: 'SCENARIO';
  villain: VillainName;
}

export interface IMainSchemeDeckInfo extends IDeckInfo {
  dtype: 'SCENARIO';
  villain: VillainName;
}

// export class PlayerDeck {
//   deck: Card[];
//   info: IPlayerDeckInfo;

//   constructor(deckInfo: IPlayerDeckInfo) {
//     this.deck = deckInfo.decklist.forEach((amount: number, cinfo: CollectorInfo): void => {

//     });
//     this.info =
//   }
// }
