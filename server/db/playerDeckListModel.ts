import mongoose from 'mongoose';

const playerDeckListSchema = new mongoose.Schema({
  name: String,
  hero: String,
  heroCode: String,
  heroList: {
    type: Map,
    of: Number,
  },
  heroCardList: {
    type: Map,
    of: Number,
  },
  nonHeroList: {
    type: Map,
    of: Number,
  },
  obligations: {
    type: Map,
    of: Number,
  },
  nemesisList: {
    type: Map,
    of: Number,
  },
});

const PlayerDeckListModel = mongoose.model('PlayerDeck', playerDeckListSchema);

export default PlayerDeckListModel;
