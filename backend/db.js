const { Client } = require("pg");
const { DATABASE_URL, SSL_CONFIG } = require("./config");

const db = new Client({
  connectionString: DATABASE_URL,
  ssl: SSL_CONFIG,
});

db.connect();

module.exports = db;
