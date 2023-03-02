import { Phase } from './constants';

export type PlayerId = number;

export type PlayerInfo = {
  id: PlayerId;
  name: string;
};

export interface IGameState {
  phase: Phase;
}
