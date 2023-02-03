const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { NotFoundError, UnauthorizedError } = require("../ExpressError");
const sqlUpdateHelper = require("../helper/sqlUpdateHelper");

class User {
  static async getAllUsers() {
    const users = await db.query(
      `SELECT id, first_name AS firstName, last_name AS lastName, email, profile_url AS profileUrl, role FROM users`
    );
    return users.rows;
  }

  static async getUser(id) {
    const user = await db.query(
      `SELECT id, first_name AS firstName, last_name AS lastName, email, profile_url AS profileUrl, role FROM users WHERE id=$1`,
      [id]
    );
    if (user.rows.length === 0) throw new NotFoundError("No such user");
    return user.rows[0];
  }

  static async register({
    email,
    password,
    firstName,
    lastName,
    profileUrl,
    role,
  }) {
    const hashed_pwd = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const user = await db.query(
      `INSERT INTO users (email, password, first_name, last_name, profile_url, role)
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING id, first_name AS firstName, last_name AS lastName, email, profile_url AS profileUrl, role`,
      [email, hashed_pwd, firstName, lastName, profileUrl, role]
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
    const { cols, vals } = sqlUpdateHelper(data, {
      firstName: "first_name",
      lastName: "last_name",
      profileUrl: "profile_url",
    });

    const user = await db.query(
      `
        UPDATE users
        SET ${cols}
        WHERE id = $${vals.length + 1}
        RETURNING id, first_name AS firstName, last_name AS lastName, email, profile_url AS profileUrl, role
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
      RETURNING id, first_name AS firstName, last_name AS lastName, email
      `,
      [id]
    );

    const user = result.rows[0];

    if (!user) throw new NotFoundError("No such user");

    return user;
  }
}

module.exports = User;
