/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');

const { DB_HOST, DB_COLL } = process.env;

async function main() {
  return mongoose.connect(`mongodb://${DB_HOST}/${DB_COLL}`);
}

const db = main()
  .then(() => console.log(`Connected to ${DB_HOST}/${DB_COLL}`))
  .catch((err) => console.error(err));

export default db;
