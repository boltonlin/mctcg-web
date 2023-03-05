export type Phase = 'SETUP_PHASE' | 'PLAYER_PHASE' | 'VILLAIN_PHASE';

/**
 * piles are containers for cards in an order,
 * NOT IN_PLAY, meant to hold many cards
 *
 * zones are containers for cards laid out IN_PLAY, meant to hold few cards
 *
 * decks are containers for cards in an order, NOT IN_PLAY,
 * and are normally hidden to the player
 *
 * that said, they are all still 'zones' in the intuitive sense of the word
 */
export type ZoneName =
  | 'EncounterDeck'
  | 'VillainZone'
  | 'VillainPile'
  | 'AttachmentZone'
  | 'MainSchemePile'
  | 'SideSchemeZone'
  | 'MainSchemeZone'
  | 'EncounterDiscardPile'
  | 'Removed'
  // below are in player specific areas
  | 'IdentityZone'
  | 'IdentityPile'
  | 'PlayerDeck'
  | 'PlayerHand'
  | 'NemesisPile'
  | 'PlayerDiscardPile'
  | 'AllyZone'
  | 'SupportZone'
  | 'UpgradeZone'
  | 'MinionZone';

export type PlayerTitle = 'PLAYER1' | 'PLAYER2' | 'PLAYER3' | 'PLAYER4';

export type Owner = 'VILLAIN' | PlayerTitle;
