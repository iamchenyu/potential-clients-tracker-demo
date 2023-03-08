const express = require("express");
const User = require("../models/user");
const jsonschema = require("jsonschema");
const addUserSchema = require("../schemas/addUserSchema.json");
const editUserSchema = require("../schemas/editUserSchema.json");
const { BadRequestError } = require("../ExpressError");
const { ensureAdmin, ensureAdminOrSameUser } = require("../middleware/auth");

const route = express.Router();

route.get("/", ensureAdmin, async (req, res, next) => {
  try {
    const users = await User.getAllUsers();
    return res.json({ users });
  } catch (e) {
    return next(e);
  }
});

route.get("/:id", ensureAdminOrSameUser, async (req, res, next) => {
  try {
    console.log(req.params.id);
    const user = await User.getUser({ id: req.params.id });
    return res.json({ user });
  } catch (e) {
    return next(e);
  }
});

route.post("/", ensureAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, addUserSchema);

    if (!validator.valid) {
      const errs = validator.errors.map((err) => err.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.register(req.body);
    return res.status(201).json({ user });
  } catch (e) {
    return next(e);
  }
});

route.patch("/:id", ensureAdminOrSameUser, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, editUserSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((err) => err.stack);
      throw new BadRequestError(errs);
    }
    const user = await User.update(req.params.id, req.body);
    return res.json({ user });
  } catch (e) {
    return next(e);
  }
});

route.delete("/:id", ensureAdmin, async (req, res, next) => {
  try {
    const user = await User.delete(req.params.id);
    return res.json({ user });
  } catch (e) {
    return next(e);
  }
});

module.exports = route;
