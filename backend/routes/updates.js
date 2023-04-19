"use strict";

const express = require("express");
const {
  ensureEditorOrAdmin,
  ensureAdminOrSameUser,
  ensureLoggedIn,
} = require("../middleware/auth");
const PotentialClient = require("../models/potentialClient");
const User = require("../models/user");
const addUpdatesSchema = require("../schemas/addUpdatesSchema.json");
const jsonschema = require("jsonschema");
const { BadRequestError } = require("../ExpressError");
const { sendCommentEmail } = require("../helper/sendEmail");

const router = express.Router();

router.post("/", ensureEditorOrAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, addUpdatesSchema);

    if (!validator.valid) {
      const errs = validator.errors.map((err) => err.stack);
      throw new BadRequestError(errs);
    }

    const newComment = await PotentialClient.createComment(req.body);

    const users = await User.getAllUsers();

    const emails = users.map((user) => user.email);

    sendCommentEmail(
      emails,
      newComment.firstname,
      newComment.lastname,
      newComment.comment,
      newComment.email
    );

    return res.json({ newComment });
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
