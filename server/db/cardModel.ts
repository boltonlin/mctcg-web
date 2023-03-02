/* eslint-disable import/no-relative-packages */
import mongoose from 'mongoose';
import type { ICardInfo } from '../../common';

const cardSchema = new mongoose.Schema<ICardInfo>({
  _id: String,
  code: String,
  class: String,
  productSet: String,
  productSetNumber: Number,
  cardSet: String,
  title: String,
  ctype: String,
  text: String,
  url: String,
  imagesrc: String,
  // below are optional
  cardSetNumber: Number,
  cardSetQty: Number,
  cardSetType: String,
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
  accelerationFactor: Number,
  targetThreat: Number,
  stageNumber: Number,
  unique: Boolean,
  subtitle: String,
  abilities: {
    type: [Number],
    default: undefined,
  },
  backFlavor: String,
  backImageSrc: String,
  backText: String,
  flavorText: String,
});

const CardModel = mongoose.model('Card', cardSchema);

export default CardModel;
