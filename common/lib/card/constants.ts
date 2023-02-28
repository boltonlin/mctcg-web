export type PlayerCardType =
  | 'ALLY'
  | 'EVENT'
  | 'IDENTITY_ALTER'
  | 'IDENTITY_HERO'
  | 'RESOURCE'
  | 'SUPPORT'
  | 'UPGRADE';

export type ScenarioCardType =
  | 'ATTACHMENT'
  | 'ENVIRONMENT'
  | 'MINION'
  | 'OBLIGATION'
  | 'SCHEME_MAIN'
  | 'SCHEME_SIDE'
  | 'TREACHERY'
  | 'VILLAIN';

export type CardType = PlayerCardType | ScenarioCardType;

export type DeckType = 'PLAYER' | 'SCENARIO';

export type CollectorSet =
  | 'Core Set'
  | 'The Green Goblin'
  | 'The Wrecking Crew'
  | 'Captain America'
  | 'Ms. Marvel'
  | 'Thor'
  | 'Black Widow'
  | 'Doctor Strange'
  | 'Hulk'
  | 'The Rise of Red Skull'
  | 'The Once and Future Kang'
  | 'Ant-man'
  | 'Wasp'
  | 'Quicksilver'
  | 'Scarlet Witch'
  | "Galaxy's Most Wanted"
  | 'Star-Lord'
  | 'Gamora'
  | 'Drax'
  | 'Venom'
  | "The Mad Titan's Shadow"
  | 'Nebula'
  | 'War Machine'
  | 'The Hood'
  | 'Valkyrie'
  | 'Vision'
  | 'Sinister Motives'
  | 'Nova'
  | 'Ironheart'
  | 'Spider-Ham'
  | 'SP//dr'
  | 'Mutant Genesis'
  | 'Cyclops'
  | 'Phoenix'
  | 'Wolverine'
  | 'Storm'
  | 'Gambit'
  | 'Rogue'
  | 'Mojo Mania'
  | 'Ronan Modular Set';

// TODO: add more
export type IdentityName = 'Spider-Man' | 'Captain Marvel';

export type VillainName = 'Rhino' | 'Klaw' | 'Ultron';

export type EncounterSet = 'Standard' | 'Rhino' | 'Bomb Scare';
