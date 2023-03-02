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
      SELECT cl.*, ch.name AS from_channel_name, st.name AS current_status_name
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

    // const client_updates = await this.getAllCommentsByClient(id);

    client = {
      ...client,
      status_updated_dates: client_status,
      // updates: client_updates,
    };

    return client;
  }

  static async searchClient({ searchTerm }) {
    const result = await db.query(
      `
      SELECT cl.*, ch.name AS from_channel_name, st.name AS current_status_name
      FROM clients AS cl 
      LEFT JOIN channels AS ch 
      ON ch.id = cl.from_channel
      LEFT JOIN statuses AS st
      ON st.id = cl.current_status
      WHERE cl.first_name ILIKE $1 OR cl.last_name ILIKE $1
      `,
      [`%${searchTerm}%`]
    );

    let clients = result.rows;

    if (!clients) throw new NotFoundError("No such client");

    return clients;
  }

  static async create(data) {
    const jsToSql = {
      firstName: "first_name",
      lastName: "last_name",
      channel: "from_channel",
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
      RETURNING id, first_name, last_name
      `,
      [id]
    );
    const client = result.rows[0];
    if (!client) throw new NotFoundError("No such client");

    return client;
  }

  /*********************************************************************************************/
  /***************************************STATUS***********************************************/
  /*********************************************************************************************/

  static async findStatusId(id) {
    const statusId = await db.query(
      `
        SELECT status_id
        FROM clients_statuses
        WHERE id = $1
        `,
      [id]
    );
    if (!statusId) throw new NotFoundError("No such status");
    return statusId.rows[0];
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

  // static async updateStatusDate(id, updateDate) {
  //   const result = await db.query(
  //     `
  //     SELECT * FROM clients_statuses WHERE id=$1
  //     `,
  //     [id]
  //   );

  //   const original = result.rows[0];
  //   if (!original) throw new NotFoundError("No such client/status");

  //   const client_status = await db.query(
  //     `
  //     UPDATE clients_statuses
  //     SET update_date = $1
  //     WHERE id = $2
  //     RETURNING *
  //       `,
  //     [updateDate, original.id]
  //   );

  //   return client_status.rows[0];
  // }

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

  /*********************************************************************************************/
  /***************************************UPDATES***********************************************/
  /*********************************************************************************************/

  static async getAllCommentsByClient(clientId) {
    const results = await db.query(
      `
    SELECT updates.id, updates.user_id,updates.comment, updates. commented_at, clients.first_name AS client_first_name, clients.last_name AS client_last_name, users.email, users.first_name AS user_first_name, users.last_name AS user_last_name
    FROM updates 
    LEFT JOIN clients 
    ON updates.client_id = clients.id
    LEFT JOIN users
    ON updates.user_id = users.id
    WHERE client_id = $1
    ORDER BY updates.commented_at DESC
    `,
      [clientId]
    );

    const comments = results.rows;

    if (!comments) throw new NotFoundError("No such comments");

    return comments;
  }

  static async createComment(data) {
    const jsToSql = {
      clientId: "client_id",
      userId: "user_id",
    };

    const cols = Object.keys(data)
      .map((key) => jsToSql[key] || key)
      .join(", ");
    const valIdx = Object.keys(data)
      .map((key, idx) => `$${idx + 1}`)
      .join(", ");

    const result = await db.query(
      `
    INSERT INTO updates (${cols})
    VALUES (${valIdx})
    RETURNING *`,
      [...Object.values(data)]
    );

    let comment = result.rows[0];

    return comment;
  }

  // static async updateComment(id, { comment }) {
  //   const result = await db.query(
  //     `
  //       UPDATE updates
  //       SET comment = $1
  //       WHERE id = $2
  //       RETURNING *
  //   `,
  //     [comment, id]
  //   );

  //   let update = result.rows[0];

  //   if (!update) throw new NotFoundError("No such comment");

  //   return update;
  // }

  static async deleteComment(id) {
    const result = await db.query(
      `
      DELETE FROM updates WHERE id = $1 RETURNING *
      `,
      [+id]
    );

    if (!result.rows[0]) throw new NotFoundError("No such comment");

    return result.rows[0];
  }
}

module.exports = PotentialClient;
