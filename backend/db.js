const { Client } = require("pg");
const { DATABASE_URL } = require("./config");

const db = new Client({ connectionString: DATABASE_URL });

db.connect();

module.exports = db;
