import type { Owner } from './constants';
import type Pile from './Pile';
import type PlayerAvatar from './PlayerAvatar';
import type VillainAvatar from './VillainAvatar';
import type Zone from './Zone';

export default interface PlayerPerspective {
  owner: Owner;

  hand: Pile;
  zones: Map<string, Zone>;
  piles: Map<string, Pile>; // not MainSchemePile or VillainPile
  removed: Zone;

  pDeckSize: number;
  eDeckSize: number;

  avatar: PlayerAvatar;
  villain: VillainAvatar;
}
