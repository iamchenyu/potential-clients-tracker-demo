const db = require("../db");
const { NotFoundError } = require("../ExpressError");
const sqlUpdateHelper = require("../helper/sqlUpdateHelper");

class PotentialClient {
  static async getAllClients() {
    const clients = await db.query(
      `
      SELECT DISTINCT ON (cl.id) 
             cl.*, ch.name AS from_channel_name, st.name AS current_status_name, cs.update_date 
      FROM clients AS cl 
      LEFT JOIN channels AS ch 
      ON ch.id = cl.from_channel
      LEFT JOIN statuses AS st
      ON st.id = cl.current_status
      LEFT JOIN clients_statuses AS cs
      ON cl.id = cs.client_id AND cl.current_status = cs.status_id
      ORDER BY cl.id, update_date DESC
      `
    );
    return clients.rows;
  }

  static async getClient(id) {
    const result = await db.query(
      `
      SELECT cl.*, ch.name AS from_channel, st.name AS current_status
      FROM clients AS cl 
      LEFT JOIN channels AS ch 
      ON ch.id = cl.from_channel
      LEFT JOIN statuses AS st
      ON st.id = cl.current_status
      WHERE cl.id=$1
      `,
      [id]
    );

    let client = result.rows[0];

    if (!client) throw new NotFoundError("No such client");

    const client_status = await this.getStatusDates(id);

    client = { ...client, status_updated_dates: client_status };

    return client;
  }

  static async create(data) {
    const jsToSql = {
      firstName: "first_name",
      lastName: "last_name",
      channel: "from_channel",
      isEnrolled: "is_enrolled",
    };

    const cols = Object.keys(data)
      .map((key) => jsToSql[key] || key)
      .join(", ");
    const valIdx = Object.keys(data)
      .map((key, idx) => `$${idx + 1}`)
      .join(", ");

    const result = await db.query(
      `
    INSERT INTO clients (${cols})
    VALUES (${valIdx})
    RETURNING *`,
      [...Object.values(data)]
    );

    let client = result.rows[0];

    // update the status change date
    const statusData = {
      clientId: client.id,
      statusId: client.current_status,
      updateDate: new Date(),
    };

    const client_status = await this.addStatusDate(statusData);

    client = { ...client, status_updated_dates: client_status };

    return client;
  }

  static async update(id, data) {
    const { cols, vals } = sqlUpdateHelper(data, {
      firstName: "first_name",
      lastName: "last_name",
      channel: "from_channel",
      isEnrolled: "is_enrolled",
    });

    const result = await db.query(
      `
        UPDATE clients
        SET ${cols}
        WHERE id = $${vals.length + 1}
        RETURNING *
    `,
      [...vals, id]
    );

    let client = result.rows[0];

    const status_updated_dates = await this.getStatusDates(id);

    client = { ...client, status_updated_dates };

    return client;
  }

  static async delete(id) {
    const result = await db.query(
      `
      DELETE FROM clients 
      WHERE id=$1 
      RETURNING id, first_name AS firstName, last_name AS lastName
      `,
      [id]
    );
    const client = result.rows[0];
    if (!client) throw new NotFoundError("No such client");

    return client;
  }

  static async getStatusDates(clientId) {
    const client_status = await db.query(
      `
        SELECT *
        FROM clients_statuses
        WHERE client_id = $1
        ORDER BY update_date ASC
        `,
      [clientId]
    );
    if (!client_status) throw new NotFoundError("No such client/status");
    return client_status.rows;
  }

  static async addStatusDate({ clientId, statusId, updateDate }) {
    const client_status = await db.query(
      `
        INSERT INTO clients_statuses (client_id, status_id, update_date)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
      [clientId, statusId, updateDate]
    );
    return client_status.rows[0];
  }

  static async updateStatusDate(id, updateDate) {
    const result = await db.query(
      `
      SELECT * FROM clients_statuses WHERE id=$1
      `,
      [id]
    );

    const original = result.rows[0];
    if (!original) throw new NotFoundError("No such client/status");

    const client_status = await db.query(
      `
      UPDATE clients_statuses
      SET update_date = $1
      WHERE id = $2
      RETURNING *
        `,
      [updateDate, original.id]
    );

    return client_status.rows[0];
  }

  static async deleteStatusDate(id) {
    const client_status = await db.query(
      `
      DELETE FROM clients_statuses
      WHERE id=$1
      RETURNING *
      `,
      [id]
    );
    if (!client_status.rows[0])
      throw new NotFoundError("No such client/status");

    return client_status.rows[0];
  }
}

module.exports = PotentialClient;
