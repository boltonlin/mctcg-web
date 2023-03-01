/* eslint-disable import/no-relative-packages */
import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  _id: String,
  code: String,
  class: String,
  linkedCard: String,
  title: String,
  ctype: String,
  traits: String, // TODO: transform to array, problem 'S.H.I.E.L.D.'
  abilities: {
    type: [Number],
    default: undefined,
  },
  text: String,
  cost: Number,
  hitPoints: Number,
  resourceEnergy: Number,
  resourceMental: Number,
  resourcePhysical: Number,
  resourceWild: Number,
  scheme: Number,
  thwart: Number,
  attack: Number,
  defense: Number,
  recovery: Number,
  attackConsequential: Number,
  thwartConsequential: Number,
  boostIcons: Number, // star icons are NOT considered boost icons, and will be in abilities and text fields
  handSize: Number,
  startingThreat: Number,
  acclerationFactor: Number,
  targetThreat: Number,
  stageNumber: Number,
  productSet: String,
  productSetNumber: Number,
  deckSet: String,
  deckSetNumber: Number,
  unique: Boolean,
  subtitle: String,
  url: String,
  imagesrc: String,
});

const CardModel = mongoose.model('Card', cardSchema);

export default CardModel;
