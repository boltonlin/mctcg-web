import type {
  Difficulty,
  HeroSet,
  ModularSet,
  Pile,
  VillainSet,
  Zone,
} from '../index';
import type { Phase, PlayerTitle, ZoneName } from './constants';

export type PlayerForm = {
  deckId: string;
  designation: PlayerTitle;
  name: string;
};

export type GameSetupConfig = {
  difficulty: Difficulty;
  firstPlayer: PlayerTitle;
  heroSets: HeroSet[];
  modularSets: ModularSet[];
  numPlayers: number;
  villainSet: VillainSet;
};

export interface IGameState {
  phase: Phase;
}

export type ZoneMap =
  | {
      [key in ZoneName]: Zone;
    }
  | Record<string, never>;

export type PileMap =
  | {
      [key in ZoneName]: Pile;
    }
  | Record<string, never>;
