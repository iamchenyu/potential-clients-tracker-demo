const isArchived = function (client) {
  return client.current_status === 14 || client.current_status === 15;
};

module.exports = isArchived;
