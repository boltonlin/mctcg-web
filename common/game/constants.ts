export type Phase = 'SETUP_PHASE' | 'PLAYER_PHASE' | 'VILLAIN_PHASE';

export type Zone =
  | 'EncounterDiscardPile'
  | 'EncounterDeck'
  | 'VillainZone'
  | 'AttachmentZone'
  | 'MainSchemeZone_InPlay'
  | 'MainSchemeZone_Hidden'
  | 'SideSchemeZone'
  // below are in player specific areas
  | 'MinionZone'
  | 'IdentityZone'
  | 'AllyZone'
  | 'UpgradeZone'
  | 'SupportZone'
  | 'PlayerDiscardPile'
  | 'PlayerDeck'
  | 'Removed'
  | 'NemesisPile';

export type Owner = 'VILLAIN' | 'PLAYER1' | 'PLAYER2' | 'PLAYER3' | 'PLAYER4';
