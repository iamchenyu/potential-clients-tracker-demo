"use strict";

const express = require("express");
const jsonschema = require("jsonschema");
const { BadRequestError } = require("../ExpressError");
const { ensureLoggedIn, ensureEditorOrAdmin } = require("../middleware/auth");
const PotentialClient = require("../models/potentialClient");
const clientSchema = require("../schemas/clientSchema.json");

const router = express.Router();

router.get("/", ensureLoggedIn, async (req, res, next) => {
  try {
    const clients = await PotentialClient.getAllClients();
    return res.json({ clients });
  } catch (e) {
    return next(e);
  }
});

router.get("/:id", ensureLoggedIn, async (req, res, next) => {
  try {
    const client = await PotentialClient.getClient(req.params.id);
    return res.json({ client });
  } catch (e) {
    return next(e);
  }
});

router.post("/search", ensureLoggedIn, async (req, res, next) => {
  try {
    const client = await PotentialClient.searchClient(req.body);
    return res.json({ client });
  } catch (e) {
    return next(e);
  }
});

router.post("/", ensureEditorOrAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, clientSchema);

    if (!validator.valid) {
      const errs = validator.errors.map((err) => err.stack);
      throw new BadRequestError(errs);
    }

    const client = await PotentialClient.create(req.body);

    return res.status(201).json({ client });
  } catch (e) {
    return next(e);
  }
});

router.patch("/:id", ensureEditorOrAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, clientSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((err) => err.stack);
      throw new BadRequestError(errs);
    }

    const client = await PotentialClient.update(req.params.id, req.body);
    return res.json({ client });
  } catch (e) {
    return next(e);
  }
});

router.delete("/:id", ensureEditorOrAdmin, async (req, res, next) => {
  try {
    const client = await PotentialClient.delete(req.params.id);
    return res.json({ client });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
