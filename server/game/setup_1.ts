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
import { Card, Deck, Pile, PlayerAvatar } from '../../common';
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
  Zone,
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
  villainSet: 'Rhino',
};

type Tuples = { _id: string; cardSetQty: number }[];

const fetchPlayerDeckList = async (id: string) =>
  PlayerDeckListModel.findById(id).exec();

const createCard = (
  cardInfo: ICardInfo,
  owner: Owner,
  state: CardState,
  zone: Zone
) => {
  return new Card(cardInfo, owner, state, zone);
};

const createDeck = async (
  cardList: CardList,
  owner: Owner,
  zone: Zone,
  dtype: DeckType,
  state: CardState
) => {
  let deck: Deck = new Deck([], dtype, owner);
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
  zone: Zone,
  state: CardState
) => {
  let pile: Pile = new Pile([], owner, name);
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

const combineDecks = (deckA: Deck, deckB: Deck, owner: Owner): Deck => {
  if (deckA.type !== deckB.type) throw new Error('Decks are not the same type');
  return new Deck(
    deckA.cards.concat(deckB.cards),
    deckA.type as DeckType,
    owner
  );
};

const createPlayerDeck = (heroDeck: Deck, nonHeroDeck: Deck, owner: Owner) =>
  combineDecks(heroDeck, nonHeroDeck, owner);

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
      'VILLAIN'
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
      'VILLAIN'
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
    'MainSchemeZone_Hidden',
    'IN_PILE'
  );
};

// create pile (heroes like Ant-Man and Wasp have 3 forms)
// create player avatar
const initializeIdentity = async (
  heroList: CardList,
  playerForm: PlayerForm
) => {
  const identityPile = (await createPile(
    heroList,
    playerForm.designation,
    'Identity',
    'IdentityZone',
    'IN_PILE'
  )) as Pile;

  const playerAvatar = new PlayerAvatar(
    playerForm.name,
    playerForm.designation,
    identityPile?.cards[0]?.originalInfo?.hitPoints as number,
    gameSetupConfig.firstPlayer === playerForm.designation ? true : false
  );

  return { identityPile, playerAvatar };
};

const initializeVillain = () => {};

async function main() {
  const [
    {
      heroList,
      heroCardList,
      nonHeroList,
      // obligations,
      nemesisList,
    },
    _err,
  ] = await tryCatch(fetchPlayerDeckList, playerForm.deckId);
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
  const { identityPile, playerAvatar } = await initializeIdentity(
    heroList,
    playerForm
  );
  console.log(playerDeck.prettyPrint());
  console.log(encounterDeck.prettyPrint());
  console.log(nemesisPile.prettyPrint());
  console.log(mainSchemePile.prettyPrint());
  console.log(identityPile.prettyPrint());
  console.log(playerAvatar);
}

main();
