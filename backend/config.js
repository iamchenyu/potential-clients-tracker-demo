"use strict";

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "temp-secrete-key";
const COOKIE_SECRET = process.env.COOKIE_SECRET || "temp-secrete-key";

const PORT = +process.env.PORT || "3001";

const DATABASE_URL = process.env.DATABASE_URL || "clients_tracker";

const BCRYPT_WORK_FACTOR = 12;

module.exports = {
  SECRET_KEY,
  COOKIE_SECRET,
  PORT,
  DATABASE_URL,
  BCRYPT_WORK_FACTOR,
};
