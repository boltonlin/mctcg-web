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
import { Card, Deck } from '../../common';
import type {
  CardState,
  DeckList,
  DeckType,
  ICardInfo,
  ModularSet,
  Owner,
  VillainName,
  VillainSet,
  Zone,
} from '../../common';
import PlayerDeckListModel from '../db/playerDeckListModel';
import CardModel from '../db/cardModel';

// async function tryCatch(promise: any, ...args: any[]) {
//   let toReturn: [any | null, any | null];
//   try {
//     const result = await promise(...args);
//     toReturn = [result, null];
//   } catch (err) {
//     toReturn = [null, err];
//   }
//   return toReturn;
// }

// ! placeholder
const playerId: Owner = 'PLAYER1';
const villainName: VillainName = 'Rhino';

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
  deckList: DeckList,
  owner: Owner,
  zone: Zone,
  dtype: DeckType,
  state: CardState
) => {
  let deck: Deck = new Deck([], dtype, owner);
  for await (const [code, qty] of deckList.entries()) {
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

const createDeckList = (tuples: Tuples) => {
  return tuples.reduce(
    (acc, tuple) => acc.set(tuple._id, tuple.cardSetQty),
    new Map()
  ) as DeckList;
};

const combineDecks = (deckA: Deck, deckB: Deck, owner: Owner): Deck => {
  if (deckA.dtype !== deckB.dtype)
    throw new Error('Decks are not the same type');
  return new Deck(deckA.cards.concat(deckB.cards), deckA.dtype, owner);
};

const createPlayerDeck = (heroDeck: Deck, nonHeroDeck: Deck, owner: Owner) =>
  combineDecks(heroDeck, nonHeroDeck, owner);

const createBaseEncounterDeck = async (
  villainSet: VillainSet,
  modSetNames: ModularSet[]
) => {
  let res = (await CardModel.find(
    { cardSet: villainSet, ctype: { $not: /villain|main scheme/i } },
    'cardSetQty'
  )) as Tuples;
  let deckList = createDeckList(res);
  let encounterDeck = await createDeck(
    deckList,
    'VILLAIN',
    'EncounterDeck',
    'Encounter',
    'IN_DECK'
  );
  let sets = [];
  for await (const set of modSetNames) {
    res = await CardModel.find({ cardSet: set }, 'cardSetQty');
    deckList = createDeckList(res);
    encounterDeck = combineDecks(
      encounterDeck,
      await createDeck(
        deckList,
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

// const createNemesisPile = (nemesisList: DeckList) => {};

// const createMainSchemePile = () => {};

// const initializeIdentity = () => {};

// const initializeVillain = () => {};

async function main() {
  const [
    {
      // heroList,
      heroCardList,
      nonHeroList,
      // obligations,
      nemesisList,
    },
    _err,
  ] = await tryCatch(fetchPlayerDeckList, '63ffec30ba725eaeca9b5b97');
  const heroDeck = await createDeck(
    heroCardList,
    playerId,
    'PlayerDeck',
    'Player',
    'IN_DECK'
  );
  const nonHeroDeck = await createDeck(
    nonHeroList,
    playerId,
    'PlayerDeck',
    'Player',
    'IN_DECK'
  );
  const playerDeck = await createPlayerDeck(heroDeck, nonHeroDeck, playerId);
  const encounterDeck = await createBaseEncounterDeck(villainName, [
    'Standard',
    'Bomb Scare',
  ]);
  // createNemesisPile(nemesisList);
  console.log(playerDeck.prettyPrint());
  console.log(encounterDeck.prettyPrint());
  // createPlayerDeck(heroCardList, nonHeroList);
}

main();
