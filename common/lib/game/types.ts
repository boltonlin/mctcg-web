import { Phase } from './constants';

export type PlayerId = number;

export type PlayerInfo = {
  id: PlayerId;
  name: string;
};

// export type PlayerState = {};

// export interface IPlayer {
//   info: PlayerInfo;
//   state: PlayerState;
// }

export interface IGameState {
  phase: Phase;
}
