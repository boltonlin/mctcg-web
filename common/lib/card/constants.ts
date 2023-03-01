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

export type ProductSet = 'Core Set';

// TODO: add more
export type HeroName = 'Spider-Man' | 'Captain Marvel';

// need this for Spider-Man - Miles Morales
export type HeroSet = 'Spider-Man' | 'Captain Marvel';

export type DeckSet =
  | 'Black Panther'
  | 'Black Panther Nemesis'
  | 'Bomb Scare'
  | 'Captain Marvel'
  | 'Captain Marvel Nemesis'
  | 'Expert'
  | 'Iron Man'
  | 'Iron Man Nemesis'
  | 'Klaw'
  | 'Legions of Hydra'
  | 'Masters of Evil'
  | 'Rhino'
  | 'She-Hulk'
  | 'She-Hulk Nemesis'
  | 'Spider-Man'
  | 'Spider-Man Nemesis'
  | 'Standard'
  | 'The Doomsday Chair'
  | 'Ultron'
  | 'Under Attack';

export type VillainName = 'Rhino' | 'Klaw' | 'Ultron';

export type ResourceType = 'Physical' | 'Mental' | 'Energy' | 'Wild';

export type Classification =
  | 'Aggression'
  | 'Justice'
  | 'Leadership'
  | 'Protection'
  | 'Basic'
  | 'Campaign'
  | 'Encounter'
  | 'Hero';

export type CardState =
  | 'IN_PLAY'
  | 'IN_HAND'
  | 'IN_DISCARD'
  | 'IN_DECK'
  | 'REMOVED';
