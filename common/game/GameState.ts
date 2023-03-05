import type { Deck, GameSetupConfig } from '../index';
import type Pile from './Pile';
import type PlayerAvatar from './PlayerAvatar';
import type VillainAvatar from './VillainAvatar';
import type Zone from './Zone';

export default interface GameState {
  hands: Pile[];
  zones: Map<string, Zone>;
  piles: Map<string, Pile>; // not MainSchemePile or VillainPile
  removed: Zone;

  playerDeck: Deck;
  encounterDeck: Deck;

  avatars: PlayerAvatar[];
  villain: VillainAvatar;

  config: GameSetupConfig;
}
