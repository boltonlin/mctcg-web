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

export type ProductSet = 'Core Set';

// TODO: add more
export type HeroName =
  | 'Spider-Man'
  | 'Captain Marvel'
  | 'Black Panther'
  | 'She-Hulk'
  | 'Iron Man';

// need this for Spider-Man - Miles Morales
export type HeroSet =
  | 'Spider-Man'
  | 'Captain Marvel'
  | 'Black Panther'
  | 'She-Hulk'
  | 'Iron Man';

export type ModularSet =
  | 'Bomb Scare'
  | 'Expert'
  | 'Legions of Hydra'
  | 'Masters of Evil'
  | 'Standard'
  | 'The Doomsday Chair'
  | 'Under Attack';

export type NemesisSet =
  | 'Black Panther Nemesis'
  | 'Captain Marvel Nemesis'
  | 'She-Hulk Nemesis'
  | 'Spider-Man Nemesis'
  | 'Iron Man Nemesis';

export type VillainSet = 'Klaw' | 'Rhino' | 'Ultron';

export type CardSet = HeroSet | ModularSet | NemesisSet | VillainSet;

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
  | 'IN_DECK'
  | 'IN_DISCARD'
  | 'IN_HAND'
  | 'IN_PILE'
  | 'IN_PLAY'
  | 'REMOVED';

export type CardStateTransition =
  | 'ADD_TO_HAND' // ANY -> IN_HAND
  | 'DISCARD' // ANY -> IN_DISCARD
  | 'PLAY' // ANY -> IN_PLAY
  | 'RETURN' // ANY -> IN_DECK
  | 'REMOVE'; // ANY -> REMOVED
