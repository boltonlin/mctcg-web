import '..';
import * as fs from 'fs/promises';
import yaml from 'yaml';
import CardModel from '../cardModel';
import PlayerDeckListModel from '../playerDeckListModel';

const intoMap = (acc: any, result: any) => ({
  ...acc,
  [result._id]: result.cardSetQty,
});

async function main() {
  const file = await fs.readFile(
    '../../config/spiderman_starterDeck.yml',
    'utf8'
  );
  const deck = yaml.parse(file);
  const heroResults: any = await CardModel.findOne(
    { code: deck.heroCode },
    'title cardSet productSet'
  );
  const heroListResults: any = await CardModel.find(
    {
      cardSet: heroResults.cardSet,
    },
    'title ctype cardSetQty'
  );
  const nemesisListResults: any = await CardModel.find(
    {
      cardSet: `${heroResults.title} Nemesis`,
      productSet: heroResults.productSet,
    },
    'title cardSetQty'
  );
  const heroList = heroListResults
    .filter((result: any) => result.ctype.match(/hero|alter-ego/i)?.length)
    .reduce(intoMap, {});
  const heroCardList = heroListResults
    .filter(
      (result: any) => result.ctype.match(/hero|alter-ego|obligation/i) === null
    )
    .reduce(intoMap, {});
  const obligations = heroListResults
    .filter((result: any) => result.ctype.match(/obligation/i)?.length)
    .reduce(intoMap, {});
  const nemesisList = nemesisListResults.reduce(intoMap, {});
  const { nonHeroList } = deck;
  const insert = {
    name: deck.name,
    hero: heroResults.title,
    heroCode: heroResults._id,
    heroList,
    heroCardList,
    nonHeroList,
    obligations,
    nemesisList,
  };
  PlayerDeckListModel.create(insert)
    .then(() => console.log('done!'))
    .catch((err: any) => console.error(err));
}

main();
