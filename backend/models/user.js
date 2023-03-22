const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { NotFoundError, UnauthorizedError } = require("../ExpressError");
const sqlUpdateHelper = require("../helper/sqlUpdateHelper");

class User {
  static async getAllUsers() {
    const users = await db.query(
      `SELECT id, first_name, last_name, email, role FROM users`
    );
    return users.rows;
  }

  static async getUser(filter) {
    const key = Object.keys(filter)[0];
    const value = Object.values(filter)[0];

    const user = await db.query(
      `SELECT id, first_name, last_name, email, role FROM users WHERE ${key}=$1`,
      [value]
    );
    if (user.rows.length === 0) throw new NotFoundError("No such user");
    return user.rows[0];
  }

  // static async getUserByEmail(email) {
  //   const user = await db.query(
  //     `SELECT id, first_name, last_name, email, role FROM users WHERE email=$1`,
  //     [email]
  //   );

  //   if (!user.rows) throw new NotFoundError("No such user");

  //   return user.rows[0];
  // }

  static async register({ email, password, firstName, lastName, role }) {
    const hashed_pwd = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const user = await db.query(
      `INSERT INTO users (email, password, first_name, last_name, role)
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING id, first_name, last_name, email, role`,
      [email, hashed_pwd, firstName, lastName, role]
    );
    return user.rows[0];
  }

  static async authenticate({ email, password }) {
    const result = await db.query(`SELECT * FROM users WHERE email=$1`, [
      email,
    ]);

    const user = result.rows[0];
    if (!user) throw new NotFoundError("No such user");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedError("invalid email/password");

    delete user.password;
    return user;
  }

  static async update(id, data) {
    if ("password" in data) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { cols, vals } = sqlUpdateHelper(data, {
      firstName: "first_name",
      lastName: "last_name",
    });

    const user = await db.query(
      `
        UPDATE users
        SET ${cols}
        WHERE id = $${vals.length + 1}
        RETURNING id, first_name, last_name, email, role, reset
    `,
      [...vals, id]
    );

    if (!user.rows[0]) throw new NotFoundError("No such user");

    return user.rows[0];
  }

  static async delete(id) {
    const result = await db.query(
      `
      DELETE FROM users 
      WHERE id=$1 
      RETURNING id, first_name, last_name, email, role
      `,
      [id]
    );

    const user = result.rows[0];

    if (!user) throw new NotFoundError("No such user");

    return user;
  }
}

module.exports = User;
