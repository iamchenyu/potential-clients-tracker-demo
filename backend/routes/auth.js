const express = require("express");
const User = require("../models/user");
const jsonschema = require("jsonschema");
const addUserSchema = require("../schemas/addUserSchema.json");
const loginUserSchema = require("../schemas/loginUserSchema.json");
const { BadRequestError } = require("../ExpressError");
const createToken = require("../helper/createToken");

const route = express.Router();

route.post("/register", async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, addUserSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((err) => err.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.register({ ...req.body, role: "viewer" });
    const token = createToken(user);
    return res
      .status(201)
      .cookie(
        "access_token",
        { token, id: user.id },
        {
          // httpOnly: true,
          sameSite: "strict",
          signed: true,
          maxAge: 24 * 3600000,
        }
      )
      .json({
        message: "Registered Successfully",
        userId: user.id,
        remember: false,
      });
  } catch (e) {
    return next(e);
  }
});

route.post("/login", async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, loginUserSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((err) => err.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.authenticate(req.body);

    const token = createToken(user);
    if (req.body.remember) {
      return res
        .cookie(
          "access_token",
          { token, id: user.id },
          {
            // httpOnly: true,
            sameSite: "strict",
            signed: true,
          }
        )
        .json({ message: "Logged In Successfully", userId: user.id });
    } else {
      return res
        .cookie(
          "access_token",
          { token, id: user.id },
          {
            // httpOnly: true,
            sameSite: "strict",
            signed: true,
            maxAge: 24 * 3600000,
          }
        )
        .json({
          message: "Logged In Successfully",
          userId: user.id,
          remember: req.body.remember,
        });
    }
  } catch (e) {
    return next(e);
  }
});

route.post("/logout", async (req, res, next) => {
  try {
    return res
      .clearCookie("access_token", {
        // httpOnly: true,
        sameSite: "strict",
        signed: true,
      })
      .json({ message: "Logged Out Successfully" });
  } catch (e) {
    return next(e);
  }
});

module.exports = route;
