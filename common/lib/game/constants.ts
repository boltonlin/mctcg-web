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
