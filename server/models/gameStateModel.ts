import mongoose, { Schema } from 'mongoose';
import type { GameState } from '../../common';

const gameStateSchema = new mongoose.Schema<GameState>({
  _id: Schema.Types.ObjectId,
  hands: [Schema.Types.Mixed],
  zones: Schema.Types.Mixed,
  piles: Schema.Types.Mixed,
  removed: Schema.Types.Mixed,

  playerDecks: [Schema.Types.Mixed],
  encounterDeck: Schema.Types.Mixed,

  avatars: [Schema.Types.Mixed],
  villain: Schema.Types.Mixed,

  config: Schema.Types.Mixed,
});

const GameStateModel = mongoose.model('GameState', gameStateSchema);

export default GameStateModel;
