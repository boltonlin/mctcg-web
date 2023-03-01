/* eslint-disable import/no-relative-packages */
import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  _id: String,
  code: String,
  class: String,
  productSet: String,
  productSetNumber: Number,
  deckSet: String,
  title: String,
  ctype: String,
  text: String,
  url: String,
  imagesrc: String,
  // below are optional
  deckSetNumber: Number,
  linkedCard: String,
  traits: String, // TODO: transform to array, problem 'S.H.I.E.L.D.'
  cost: Number,
  hitPoints: Number,
  resourceEnergy: Number,
  resourceMental: Number,
  resourcePhysical: Number,
  resourceWild: Number,
  attack: Number,
  thwart: Number,
  defense: Number,
  recovery: Number,
  scheme: Number,
  attackConsequential: Number,
  thwartConsequential: Number,
  boostIcons: Number, // star icons are NOT considered boost icons, and will be in abilities and text fields
  handSize: Number,
  startingThreat: Number,
  acclerationFactor: Number,
  targetThreat: Number,
  stageNumber: Number,
  unique: Boolean,
  subtitle: String,
  abilities: {
    type: [Number],
    default: undefined,
  },
});

const CardModel = mongoose.model('Card', cardSchema);

export default CardModel;
