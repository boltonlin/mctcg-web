export type PlayerCardType =
  | 'Ally'
  | 'Event'
  | 'Alter-Ego'
  | 'Hero'
  | 'Resource'
  | 'Support'
  | 'Upgrade';

export type ScenarioCardType =
  | 'Attachment'
  | 'Environment'
  | 'Minion'
  | 'Obligation'
  | 'Main Scheme'
  | 'Side Scheme'
  | 'Treachery'
  | 'Villain';

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

export type CardState =
  | 'IN_PLAY'
  | 'IN_HAND'
  | 'IN_DISCARD'
  | 'IN_DECK'
  | 'REMOVED';
