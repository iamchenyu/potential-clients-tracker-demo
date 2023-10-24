const moment = require("moment");
const PotentialClient = require("../models/potentialClient");
const isArchived = require("./isArchived");

const addDays = async (clientsRaw) => {
  // based on the client's status to decide if still count days
  return await Promise.all(
    clientsRaw.map(async function (client) {
      if (isArchived(client)) {
        const statusDates = await PotentialClient.getStatusDates(client.id);
        // get the client's enrollment date or not-to-proceed date
        // and stop counting
        const endStatus = statusDates.filter(
          (s) => s.status_id === 14 || s.status_id === 15
        );
        return {
          ...client,
          days: moment(endStatus[0].update_date).diff(
            moment(client.created_at),
            "days"
          ),
        };
      } else {
        return {
          ...client,
          days: moment(new Date()).diff(moment(client.created_at), "days"),
        };
      }
    })
  );
};

module.exports = addDays;
