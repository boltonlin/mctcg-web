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

export interface IDeckInfo {
  decklist: Map<CollectorInfo, number>;
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

export interface MainSchemeDeckInfo extends IDeckInfo {
  dtype: 'SCENARIO';
  villain: VillainName;
}
