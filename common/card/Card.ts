import type { Owner, Zone } from '../game/constants';
import type { CardState } from './constants';
import type { ICardInfo } from './types';

export default class Card {
  currentInfo: ICardInfo;
  readonly linkedInfo?: ICardInfo;
  readonly originalInfo: ICardInfo;
  owner: Owner;
  state: CardState;
  zone: Zone;

  constructor(
    info: ICardInfo,
    owner: Owner,
    state: CardState,
    zone: Zone,
    linkedInfo?: ICardInfo
  ) {
    this.currentInfo = info;
    this.originalInfo = info;
    this.zone = zone;
    this.owner = owner;
    this.state = state;
    if (linkedInfo) this.linkedInfo = linkedInfo;
  }
}
