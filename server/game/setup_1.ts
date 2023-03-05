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
  GameState,
  Pile,
  PlayerAvatar,
  VillainAvatar,
  Zone,
} from '../../common';
import type {
  CardList,
  CardState,
  Difficulty,
  GameSetupConfig,
  HeroSet,
  ICardInfo,
  ModularSet,
  Owner,
  PlayerForm,
  PlayerPerspective,
  VillainName,
  VillainSet,
  ZoneName,
} from '../../common';
import PlayerDeckListModel from '../models/playerDeckListModel';
import CardModel from '../models/cardModel';
import shuffle from '../utils/shuffle';
import { ObjectId } from 'bson';
import GameStateModel from '../models/gameStateModel';

type Tuples = { _id: string; cardSetQty: number }[];

const fetchPlayerDeckList = async (id: string) =>
  PlayerDeckListModel.findById(id).exec();

const createCard = (
  cardInfo: ICardInfo,
  owner: Owner,
  state: CardState,
  zone: ZoneName,
) => {
  return new Card(cardInfo, owner, state, zone);
};

const createDeck = async (
  cardList: CardList,
  owner: Owner,
  zone: ZoneName,
  state: CardState,
) => {
  let deck: Deck = new Deck([], owner, zone);
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
  zone: ZoneName,
  state: CardState,
) => {
  let pile: Pile = new Pile([], owner, zone);
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
    new Map(),
  ) as CardList;
};

const combineDecks = (
  deckA: Deck,
  deckB: Deck,
  owner: Owner,
  zone: ZoneName,
): Deck => {
  if (deckA.zone !== deckB.zone) throw new Error('Decks are not the same type');
  return new Deck(deckA.cards.concat(deckB.cards), owner, zone);
};

const createPlayerDeck = (heroDeck: Deck, nonHeroDeck: Deck, owner: Owner) =>
  combineDecks(heroDeck, nonHeroDeck, owner, 'PlayerDeck');

// TODO: this step needs to interpret side1A of the main scheme card
const createEncounterDeck = async (
  villainSet: VillainSet,
  modSetNames: ModularSet[],
  heroSets: HeroSet[],
) => {
  let res = (await CardModel.find(
    { cardSet: villainSet, ctype: { $not: /villain|main scheme/i } },
    'cardSetQty',
  )) as Tuples;
  let cardList = createCardList(res);
  let encounterDeck = await createDeck(
    cardList,
    'VILLAIN',
    'EncounterDeck',
    'IN_DECK',
  );
  for await (const set of modSetNames) {
    res = await CardModel.find({ cardSet: set }, 'cardSetQty');
    cardList = createCardList(res);
    encounterDeck = combineDecks(
      encounterDeck,
      await createDeck(cardList, 'VILLAIN', 'EncounterDeck', 'IN_DECK'),
      'VILLAIN',
      'EncounterDeck',
    );
  }
  for await (const set of heroSets) {
    res = await CardModel.find(
      { cardSet: set, ctype: 'Obligation' },
      'cardSetQty',
    );
    cardList = createCardList(res);
    encounterDeck = combineDecks(
      encounterDeck,
      await createDeck(cardList, 'VILLAIN', 'EncounterDeck', 'IN_DECK'),
      'VILLAIN',
      'EncounterDeck',
    );
  }
  return await encounterDeck;
};

const createNemesisPile = (nemesisList: CardList) =>
  createPile(nemesisList, 'VILLAIN', 'NemesisPile', 'REMOVED');

const createMainSchemePile = async (villainSet: VillainSet) => {
  let res = (await CardModel.find(
    { cardSet: villainSet, ctype: 'Main Scheme' },
    'cardSetQty',
  )) as Tuples;
  let mainSchemeList = createCardList(res);
  return createPile(mainSchemeList, 'VILLAIN', 'MainSchemePile', 'IN_PILE');
};

const initializePlayer = async (
  heroList: CardList,
  playerForm: PlayerForm,
  config: GameSetupConfig,
) => {
  const identityPile = (await createPile(
    heroList,
    playerForm.designation,
    'IdentityPile',
    'IN_PILE',
  )) as Pile;

  const playerAvatar = new PlayerAvatar(
    playerForm.name,
    playerForm.designation,
    identityPile?.cards[0]?.originalInfo?.hitPoints as number,
    config.firstPlayer === playerForm.designation ? true : false,
  );

  return [identityPile, playerAvatar];
};

const initializeVillain = async (
  difficulty: Difficulty,
  villainName: VillainName,
  numPlayers: number,
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
        'cardSetQty',
      )) as Tuples,
    ),
    'VILLAIN',
    'VillainPile',
    'IN_PILE',
  );
  const villainAvatar = new VillainAvatar(
    villainName,
    (villainPile?.cards[0]?.originalInfo?.hitPoints as number) * numPlayers,
    difficulty === 'Normal' ? 1 : 2,
    difficulty === 'Normal' ? 2 : 3,
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

const initializeIdentityZone = async (
  heroTitle: HeroSet,
  identityPile: Pile,
) => {
  const identityZone = new Zone('IdentityZone', 'PLAYER1');
  const { title: alterEgoTitle } = (await CardModel.findOne(
    {
      ctype: 'Alter-Ego',
      cardSet: heroTitle,
    },
    'title',
  )) as { title: string };
  identityZone.place(
    identityPile.take(identityPile.findByTitle(alterEgoTitle)),
  );
  return identityZone;
};

const initializeVillainZone = (difficulty: Difficulty, villainPile: Pile) => {
  const villainZone = new Zone('VillainZone', 'VILLAIN');
  villainZone.place(
    villainPile.take(
      villainPile.findByAttribute(
        'stageNumber',
        difficulty === 'Normal' ? 1 : 2,
      ),
    ),
  );
  return villainZone;
};

const createZoneMap = (...zones: Zone[]) =>
  zones.reduce((acc, zone) => ({ ...acc, [zone.name]: zone }), {});

const createPileMap = (...piles: Pile[]) =>
  piles.reduce((acc, pile) => ({ ...acc, [pile.zone]: pile }), {});

const setup_1 = async (playerForm: PlayerForm, config: GameSetupConfig) => {
  const [{ hero, heroList, heroCardList, nonHeroList, nemesisList }, _err] =
    await tryCatch(fetchPlayerDeckList, playerForm.deckId);

  const heroDeck = await createDeck(
    heroCardList,
    playerForm.designation,
    'PlayerDeck',
    'IN_DECK',
  );

  const nonHeroDeck = await createDeck(
    nonHeroList,
    playerForm.designation,
    'PlayerDeck',
    'IN_DECK',
  );

  const playerDeck = await createPlayerDeck(
    heroDeck,
    nonHeroDeck,
    playerForm.designation,
  );

  const encounterDeck = await createEncounterDeck(
    config.villainSet,
    config.modularSets,
    config.heroSets,
  );

  const nemesisPile = await createNemesisPile(nemesisList);

  const mainSchemePile = await createMainSchemePile(config.villainSet);

  const [identityPile, playerAvatar] = (await initializePlayer(
    heroList,
    playerForm,
    config,
  )) as [Pile, PlayerAvatar];

  const [villainPile, villainAvatar] = (await initializeVillain(
    config.difficulty,
    config.villainSet,
    config.numPlayers,
  )) as [Pile, VillainAvatar];

  const [
    attachmentZone,
    sideSchemeZone,
    mainSchemeZone,
    removedZone,
    allyZone,
    supportZone,
    upgradeZone,
    minionZone,
  ] = initializeEmptyZones();

  const encounterDiscardPile = new Pile([], 'VILLAIN', 'EncounterDiscardPile');

  const playerDiscardPile = new Pile(
    [],
    playerForm.designation,
    'PlayerDiscardPile',
  );

  const identityZone = await initializeIdentityZone(hero, identityPile);

  const villainZone = initializeVillainZone(config.difficulty, villainPile);

  const playerHand = new Pile([], playerForm.designation, 'PlayerHand');

  shuffle(playerDeck);
  shuffle(encounterDeck);

  playerDeck.deal(
    playerHand,
    identityZone.cards[0]?.originalInfo?.handSize as number,
  );

  // ! placeholder
  const gameId = new ObjectId('TESTTESTTEST');

  const playerPerspective: PlayerPerspective = {
    _id: gameId,
    owner: playerForm.designation,

    hand: playerHand,
    zones: createZoneMap(
      attachmentZone as Zone,
      mainSchemeZone as Zone,
      sideSchemeZone as Zone,
      villainZone as Zone,
      allyZone as Zone,
      upgradeZone as Zone,
      supportZone as Zone,
      minionZone as Zone,
      identityZone as Zone,
    ),
    piles: createPileMap(
      encounterDiscardPile as Pile,
      playerDiscardPile as Pile,
      nemesisPile as Pile,
      identityPile as Pile,
    ),
    removed: removedZone as Zone,

    pDeckSize: playerDeck.size,
    eDeckSize: encounterDeck.size,

    avatar: playerAvatar,
    villain: villainAvatar,
  };

  const gameState: GameState = {
    _id: gameId,

    hands: [playerHand],
    zones: createZoneMap(
      attachmentZone as Zone,
      mainSchemeZone as Zone,
      sideSchemeZone as Zone,
      villainZone as Zone,
      allyZone as Zone,
      upgradeZone as Zone,
      supportZone as Zone,
      minionZone as Zone,
      identityZone as Zone,
    ),
    piles: createPileMap(
      encounterDiscardPile as Pile,
      playerDiscardPile as Pile,
      nemesisPile as Pile,
      identityPile as Pile,
      mainSchemePile as Pile,
    ),
    removed: removedZone as Zone,

    playerDecks: [playerDeck],
    encounterDeck: encounterDeck,

    avatars: [playerAvatar],
    villain: villainAvatar,

    config: config,
  };

  await GameStateModel.findOneAndUpdate({ _id: gameState._id }, gameState, {
    upsert: true,
  }).exec();

  return playerPerspective;
};

export default setup_1;
