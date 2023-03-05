import type { Owner, ZoneName } from '../game/constants';
import type { CardState } from './constants';
import type { ICardInfo } from './types';

export default class Card {
  currentInfo: ICardInfo;
  // readonly linkedInfo?: ICardInfo;
  readonly originalInfo: ICardInfo;
  owner: Owner;
  ready?: boolean;
  state: CardState;
  zone: ZoneName;

  constructor(
    info: ICardInfo,
    owner: Owner,
    state: CardState,
    zone: ZoneName
    // linkedInfo?: ICardInfo
  ) {
    this.currentInfo = info;
    this.originalInfo = info;
    this.owner = owner;
    this.state = state;
    this.zone = zone;
    // if (linkedInfo) this.linkedInfo = linkedInfo;
  }
}
