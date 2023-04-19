"use strict";

const express = require("express");
const jsonschema = require("jsonschema");
const { BadRequestError } = require("../ExpressError");
const { ensureLoggedIn, ensureEditorOrAdmin } = require("../middleware/auth");
const PotentialClient = require("../models/potentialClient");
const User = require("../models/user");
const clientSchema = require("../schemas/clientSchema.json");
const { sendNewClientEmail } = require("../helper/sendEmail");

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

router.get("/:id/updates", ensureLoggedIn, async (req, res, next) => {
  try {
    const updates = await PotentialClient.getAllCommentsByClient(req.params.id);
    return res.json({ updates });
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

    const clientAdded = await PotentialClient.create(req.body);
    const client = await PotentialClient.getClient(clientAdded.id);
    const users = await User.getAllUsers();

    const emails = users.map((user) => user.email);

    sendNewClientEmail(emails, client, res.locals.user.email);

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
