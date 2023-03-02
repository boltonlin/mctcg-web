import type { Owner, Phase } from './constants';

export type PlayerForm = {
  designation: Owner;
  name: string;
};

export interface IGameState {
  phase: Phase;
}
