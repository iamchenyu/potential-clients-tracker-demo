const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { BadRequestError } = require("../ExpressError");

const createToken = (user) => {
  const payload = { id: user.id, email: user.email, role: user.role };
  return jwt.sign(payload, SECRET_KEY);
};

const createResetToken = (user) => {
  const payload = { user: user.email };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "10m" });
};

const verifyResetToken = (token) => {
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) throw new BadRequestError("Invalid link or time expired");

    return decoded;
  });
};

module.exports = { createToken, createResetToken, verifyResetToken };
