/**
 * Given: PlayerDeckId, PlayerId, Villain, Difficulty, ModularSets,
 * Give: GameState:
 *    PlayerDeck(s)
 *    NemesisDeck(s)
 *    EncounterDeck
 *    MainSchemeDeck
 *    PlayerAvatar(s)
 *    Villain
 */

import '../db';
import tryCatch from '../utils/tryCatch';
import {
  Card,
  Deck,
  Difficulty,
  Pile,
  PlayerAvatar,
  VillainAvatar,
  VillainName,
  Zone,
} from '../../common';
import type {
  CardList,
  CardState,
  DeckType,
  GameSetupConfig,
  HeroSet,
  ICardInfo,
  ModularSet,
  Owner,
  PileType,
  PlayerForm,
  VillainSet,
  ZoneName,
} from '../../common';
import PlayerDeckListModel from '../db/playerDeckListModel';
import CardModel from '../db/cardModel';

// ! placeholders
const playerForm: PlayerForm = {
  deckId: '63ffec30ba725eaeca9b5b97',
  designation: 'PLAYER1',
  name: 'PROXYPLAYER',
};
const gameSetupConfig: GameSetupConfig = {
  difficulty: 'Normal',
  firstPlayer: 'PLAYER1',
  heroSets: ['Spider-Man'],
  modularSets: ['Standard', 'Bomb Scare'],
  numPlayers: 1,
  villainSet: 'Rhino',
};

type Tuples = { _id: string; cardSetQty: number }[];

const fetchPlayerDeckList = async (id: string) =>
  PlayerDeckListModel.findById(id).exec();

const createCard = (
  cardInfo: ICardInfo,
  owner: Owner,
  state: CardState,
  zone: ZoneName
) => {
  return new Card(cardInfo, owner, state, zone);
};

const createDeck = async (
  cardList: CardList,
  owner: Owner,
  zone: ZoneName,
  dtype: DeckType,
  state: CardState
) => {
  let deck: Deck = new Deck([], dtype, owner, zone);
  for await (const [code, qty] of cardList.entries()) {
    let cardInfo: ICardInfo;
    cardInfo = (await CardModel.findById(code, {
      _id: 0,
      __v: 0,
    })) as ICardInfo;
    const card = createCard(cardInfo, owner, state, zone);
    deck.add(card, qty);
  }
  return deck;
};

const createPile = async (
  cardList: CardList,
  owner: Owner,
  name: PileType,
  zone: ZoneName,
  state: CardState
) => {
  let pile: Pile = new Pile([], owner, name, zone);
  for await (const [code, qty] of cardList.entries()) {
    let cardInfo: ICardInfo;
    cardInfo = (await CardModel.findById(code, {
      _id: 0,
      __v: 0,
    })) as ICardInfo;
    const card = createCard(cardInfo, owner, state, zone);
    pile.add(card, qty);
  }
  return pile;
};

const createCardList = (tuples: Tuples) => {
  return tuples.reduce(
    (acc, tuple) => acc.set(tuple._id, tuple.cardSetQty),
    new Map()
  ) as CardList;
};

const combineDecks = (
  deckA: Deck,
  deckB: Deck,
  owner: Owner,
  zone: ZoneName
): Deck => {
  if (deckA.type !== deckB.type) throw new Error('Decks are not the same type');
  return new Deck(
    deckA.cards.concat(deckB.cards),
    deckA.type as DeckType,
    owner,
    zone
  );
};

const createPlayerDeck = (heroDeck: Deck, nonHeroDeck: Deck, owner: Owner) =>
  combineDecks(heroDeck, nonHeroDeck, owner, 'PlayerDeck');

// TODO: this step needs to interpret side1A of the main scheme card
const createEncounterDeck = async (
  villainSet: VillainSet,
  modSetNames: ModularSet[],
  heroSets: HeroSet[]
) => {
  let res = (await CardModel.find(
    { cardSet: villainSet, ctype: { $not: /villain|main scheme/i } },
    'cardSetQty'
  )) as Tuples;
  let cardList = createCardList(res);
  let encounterDeck = await createDeck(
    cardList,
    'VILLAIN',
    'EncounterDeck',
    'Encounter',
    'IN_DECK'
  );
  for await (const set of modSetNames) {
    res = await CardModel.find({ cardSet: set }, 'cardSetQty');
    cardList = createCardList(res);
    encounterDeck = combineDecks(
      encounterDeck,
      await createDeck(
        cardList,
        'VILLAIN',
        'EncounterDeck',
        'Encounter',
        'IN_DECK'
      ),
      'VILLAIN',
      'EncounterDeck'
    );
  }
  for await (const set of heroSets) {
    res = await CardModel.find(
      { cardSet: set, ctype: 'Obligation' },
      'cardSetQty'
    );
    cardList = createCardList(res);
    encounterDeck = combineDecks(
      encounterDeck,
      await createDeck(
        cardList,
        'VILLAIN',
        'EncounterDeck',
        'Encounter',
        'IN_DECK'
      ),
      'VILLAIN',
      'EncounterDeck'
    );
  }
  return await encounterDeck;
};

const createNemesisPile = (nemesisList: CardList) =>
  createPile(nemesisList, 'VILLAIN', 'Nemesis', 'NemesisPile', 'REMOVED');

const createMainSchemePile = async (villainSet: VillainSet) => {
  let res = (await CardModel.find(
    { cardSet: villainSet, ctype: 'Main Scheme' },
    'cardSetQty'
  )) as Tuples;
  let mainSchemeList = createCardList(res);
  return createPile(
    mainSchemeList,
    'VILLAIN',
    'Main Scheme',
    'MainSchemePile',
    'IN_PILE'
  );
};

const initializePlayer = async (heroList: CardList, playerForm: PlayerForm) => {
  const identityPile = (await createPile(
    heroList,
    playerForm.designation,
    'Identity',
    'IdentityPile',
    'IN_PILE'
  )) as Pile;

  const playerAvatar = new PlayerAvatar(
    playerForm.name,
    playerForm.designation,
    identityPile?.cards[0]?.originalInfo?.hitPoints as number,
    gameSetupConfig.firstPlayer === playerForm.designation ? true : false
  );

  return [identityPile, playerAvatar];
};

const initializeVillain = async (
  difficulty: Difficulty,
  villainName: VillainName,
  numPlayers: number
) => {
  const stageFilter = difficulty === 'Normal' ? { $lte: 2 } : { $gte: 2 };
  const villainPile = await createPile(
    await createCardList(
      (await CardModel.find(
        {
          ctype: 'Villain',
          cardSet: villainName,
          stageNumber: stageFilter,
        },
        'cardSetQty'
      )) as Tuples
    ),
    'VILLAIN',
    'Villain',
    'VillainPile',
    'IN_PILE'
  );
  const villainAvatar = new VillainAvatar(
    villainName,
    (villainPile?.cards[0]?.originalInfo?.hitPoints as number) * numPlayers,
    difficulty === 'Normal' ? 1 : 2,
    difficulty === 'Normal' ? 2 : 3
  );
  return [villainPile, villainAvatar];
};

const initializeEmptyZones = (): Zone[] => [
  new Zone('AttachmentZone', 'VILLAIN'),
  new Zone('SideSchemeZone', 'VILLAIN'),
  new Zone('MainSchemeZone', 'VILLAIN'),
  new Zone('Removed', 'VILLAIN'),
  new Zone('AllyZone', 'PLAYER1'),
  new Zone('SupportZone', 'PLAYER1'),
  new Zone('UpgradeZone', 'PLAYER1'),
  new Zone('MinionZone', 'PLAYER1'),
];

// const initializeEmptyPiles = (): Pile[] => new Pile([], 'PLAYER1', );

const initializeIdentityZone = async (
  heroTitle: HeroSet,
  identityPile: Pile
) => {
  const identityZone = new Zone('IdentityZone', 'PLAYER1');
  const { title: alterEgoTitle } = (await CardModel.findOne(
    {
      ctype: 'Alter-Ego',
      cardSet: heroTitle,
    },
    'title'
  )) as { title: string };
  identityZone.place(
    identityPile.take(identityPile.findByTitle(alterEgoTitle))
  );
  return identityZone;
};

const initializeVillainZone = (difficulty: Difficulty, villainPile: Pile) => {
  const villainZone = new Zone('VillainZone', 'VILLAIN');
  villainZone.place(
    villainPile.take(
      villainPile.findByAttribute(
        'stageNumber',
        difficulty === 'Normal' ? 1 : 2
      )
    )
  );
  return villainZone;
};

async function main() {
  const [{ hero, heroList, heroCardList, nonHeroList, nemesisList }, _err] =
    await tryCatch(fetchPlayerDeckList, playerForm.deckId);

  const heroDeck = await createDeck(
    heroCardList,
    playerForm.designation,
    'PlayerDeck',
    'Player',
    'IN_DECK'
  );

  const nonHeroDeck = await createDeck(
    nonHeroList,
    playerForm.designation,
    'PlayerDeck',
    'Player',
    'IN_DECK'
  );

  const playerDeck = await createPlayerDeck(
    heroDeck,
    nonHeroDeck,
    playerForm.designation
  );

  const encounterDeck = await createEncounterDeck(
    gameSetupConfig.villainSet,
    gameSetupConfig.modularSets,
    gameSetupConfig.heroSets
  );

  const nemesisPile = await createNemesisPile(nemesisList);

  const mainSchemePile = await createMainSchemePile(gameSetupConfig.villainSet);

  const [identityPile, playerAvatar] = (await initializePlayer(
    heroList,
    playerForm
  )) as [Pile, PlayerAvatar];

  const [villainPile, villainAvatar] = (await initializeVillain(
    gameSetupConfig.difficulty,
    gameSetupConfig.villainSet,
    gameSetupConfig.numPlayers
  )) as [Pile, VillainAvatar];

  const [
    attachmentZone,
    sideSchemeZone,
    mainSchemePlayZone,
    removedZone,
    allyZone,
    supportZone,
    upgradeZone,
    minionZone,
  ] = initializeEmptyZones();

  const encounterDiscardPile = new Pile(
    [],
    'VILLAIN',
    'Encounter Discards',
    'EncounterDiscardPile'
  );

  const playerDiscardPile = new Pile(
    [],
    playerForm.designation,
    'Player Discards',
    'PlayerDiscardPile'
  );

  const identityZone = await initializeIdentityZone(hero, identityPile);

  const villainZone = initializeVillainZone(
    gameSetupConfig.difficulty,
    villainPile
  );

  console.log(playerDeck.prettyPrint());
  console.log(encounterDeck.prettyPrint());
  console.log(nemesisPile.prettyPrint());
  console.log(mainSchemePile.prettyPrint());
  console.log(attachmentZone?.prettyPrint());
  console.log(sideSchemeZone?.prettyPrint());
  console.log(mainSchemePlayZone?.prettyPrint());
  console.log(removedZone?.prettyPrint());
  console.log(allyZone?.prettyPrint());
  console.log(supportZone?.prettyPrint());
  console.log(upgradeZone?.prettyPrint());
  console.log(minionZone?.prettyPrint());
  console.log(encounterDiscardPile.prettyPrint());
  console.log(playerDiscardPile.prettyPrint());
  console.log(identityPile.prettyPrint());
  console.log(identityZone.prettyPrint());
  console.log(villainPile.prettyPrint());
  console.log(villainZone.prettyPrint());
  console.log(playerAvatar);
  console.log(villainAvatar);
}

main();
