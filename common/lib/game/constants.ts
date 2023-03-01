export type Phase = 'SETUP_PHASE' | 'PLAYER_PHASE' | 'VILLAIN_PHASE';

export type Zone =
  | 'EncounterDiscardPile'
  | 'EncounterDeck'
  | 'VillainZone'
  | 'AttachmentZone'
  | 'MainSchemeZone'
  | 'SideSchemeZone'
  | 'MinionZone' // this is in the player area
  | 'IdentityZone'
  | 'AllyZone'
  | 'UpgradeZone'
  | 'SupportZone'
  | 'PlayerDiscardPile'
  | 'PlayerDeck'
  | 'Removed';

export type Owner = 'VILLAIN' | 'PLAYER1' | 'PLAYER2' | 'PLAYER3' | 'PLAYER4';

export type CardStateTransition =
  | 'ADD_TO_HAND' // ANY -> IN_HAND
  | 'DISCARD' // ANY -> IN_DISCARD
  | 'PLAY' // ANY -> IN_PLAY
  | 'RETURN' // ANY -> IN_DECK
  | 'REMOVE'; // ANY -> REMOVED
