"use strict";

require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const SECRET_KEY = process.env.SECRET_KEY || "temp-secrete-key";
const COOKIE_SECRET = process.env.COOKIE_SECRET || "temp-secrete-key";

const PORT = +process.env.PORT || "3001";

const DATABASE_URL = isProduction
  ? process.env.DATABASE_URL
  : "clients_tracker";

const SSL_CONFIG = isProduction ? { rejectUnauthorized: false } : false;

const BCRYPT_WORK_FACTOR = 12;

console.log("isProduction: ", isProduction);
console.log("SECRET_KEY: ", SECRET_KEY);
console.log("COOKIE_SECRET: ", COOKIE_SECRET);
console.log("PORT: ", PORT);
console.log("DATABASE_URL: ", DATABASE_URL);
console.log("SSL_CONFIG: ", SSL_CONFIG);

module.exports = {
  SECRET_KEY,
  COOKIE_SECRET,
  PORT,
  DATABASE_URL,
  BCRYPT_WORK_FACTOR,
  SSL_CONFIG,
};
