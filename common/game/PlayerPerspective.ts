import type { ObjectId } from 'bson';
import type { Owner } from './constants';
import type Pile from './Pile';
import type PlayerAvatar from './PlayerAvatar';
import type { ZoneMap, PileMap } from './types';
import type VillainAvatar from './VillainAvatar';
import type Zone from './Zone';

export default interface PlayerPerspective {
  _id: ObjectId;
  owner: Owner;

  hand: Pile;
  zones: ZoneMap;
  piles: PileMap; // not MainSchemePile or VillainPile
  removed: Zone;

  pDeckSize: number;
  eDeckSize: number;

  avatar: PlayerAvatar;
  villain: VillainAvatar;
}
