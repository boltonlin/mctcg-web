export * from './lib/card/types';
export * from './lib/card/constants';
export * from './lib/deck/types';
export * from './lib/phase/constants';

export type DeckId = number;
export type PlayerId = number;
export type Difficulty = 'normal';
export interface Player {
  id: PlayerId;
  name: string;
}
