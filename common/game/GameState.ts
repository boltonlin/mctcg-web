import type { ObjectId } from 'bson';
import type { Deck, GameSetupConfig, PileMap, ZoneMap } from '../index';
import type Pile from './Pile';
import type PlayerAvatar from './PlayerAvatar';
import type VillainAvatar from './VillainAvatar';
import type Zone from './Zone';

export default interface GameState {
  _id: ObjectId;

  hands: Pile[];
  zones: ZoneMap;
  piles: PileMap; // not MainSchemePile or VillainPile
  removed: Zone;

  playerDecks: Deck[];
  encounterDeck: Deck;

  avatars: PlayerAvatar[];
  villain: VillainAvatar;

  config: GameSetupConfig;
}
