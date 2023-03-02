"use strict";

const express = require("express");
const {
  ensureEditorOrAdmin,
  ensureAdminOrSameUser,
  ensureLoggedIn,
} = require("../middleware/auth");
const PotentialClient = require("../models/potentialClient");
const addUpdatesSchema = require("../schemas/addUpdatesSchema.json");
const jsonschema = require("jsonschema");
const { BadRequestError } = require("../ExpressError");

const router = express.Router();

router.post("/", ensureEditorOrAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, addUpdatesSchema);

    if (!validator.valid) {
      const errs = validator.errors.map((err) => err.stack);
      throw new BadRequestError(errs);
    }

    const comment = await PotentialClient.createComment(req.body);
    return res.json({ comment });
  } catch (e) {
    return next(e);
  }
});

router.delete("/:id", ensureLoggedIn, async (req, res, next) => {
  try {
    const update = await PotentialClient.deleteComment(req.params.id);
    return res.json({ message: "Deleted", update });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
