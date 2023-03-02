import type { Difficulty, HeroSet, ModularSet, VillainSet } from '../index';
import type { Phase, PlayerTitle } from './constants';

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
  villainSet: VillainSet;
};

export interface IGameState {
  phase: Phase;
}
