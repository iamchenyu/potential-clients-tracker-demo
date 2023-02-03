const { BadRequestError } = require("../ExpressError");

const sqlUpdateHelper = (dataToUpdate, jsToSqlMapper) => {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No Updated Data");

  const values = Object.values(dataToUpdate);

  const colSetup = keys.map(
    (key, idx) => `${jsToSqlMapper[key] || key} = $${idx + 1}`
  );

  return { cols: colSetup.join(", "), vals: values };
};

module.exports = sqlUpdateHelper;
