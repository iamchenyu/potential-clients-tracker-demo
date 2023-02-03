const express = require("express");
const jsonschema = require("jsonschema");
const { BadRequestError } = require("../ExpressError");
const PotentialClient = require("../models/potentialClient");
const addStatusSchema = require("../schemas/addStatusSchema.json");
const editStatusSchema = require("../schemas/editStatusSchema.json");

const route = express.Router();

route.post("/", async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, addStatusSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const result = await PotentialClient.addStatusDate(req.body);

    // update client's current status
    const client = await PotentialClient.update(result.client_id, {
      current_status: result.status_id,
    });

    return res.json({ client });
  } catch (e) {
    return next(e);
  }
});

route.patch("/", async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, editStatusSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    const { id, updateDate } = req.body;
    const result = await PotentialClient.updateStatusDate(id, updateDate);

    return res.json({ message: "Updated", result });
  } catch (e) {
    return next(e);
  }
});

route.delete("/:id", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await PotentialClient.deleteStatusDate(req.params.id);
    return res.json({ message: "Deleted", result });
  } catch (e) {
    return next(e);
  }
});
module.exports = route;
