const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError, ForbiddenError } = require("../ExpressError");

const authenticateJWT = (req, res, next) => {
  try {
    const authCookies = req.signedCookies.access_token;
    if (authCookies) {
      res.locals.user = jwt.verify(authCookies.token, SECRET_KEY);
    }
    return next();
  } catch (e) {
    return next();
  }
};

const ensureLoggedIn = (req, res, next) => {
  try {
    if (!res.locals.user) {
      throw new UnauthorizedError("Log In Failed");
    }
    return next();
  } catch (e) {
    return next(e);
  }
};

const ensureEditorOrAdmin = (req, res, next) => {
  try {
    if (
      res.locals.user &&
      (res.locals.user.role === "editor" || res.locals.user.role === "admin")
    ) {
      return next();
    } else {
      throw new ForbiddenError("Not Editor/Admin");
    }
  } catch (e) {
    return next(e);
  }
};

const ensureAdmin = (req, res, next) => {
  try {
    if (res.locals.user && res.locals.user.role === "admin") {
      return next();
    } else {
      throw new ForbiddenError("Not Admin");
    }
  } catch (e) {
    return next(e);
  }
};

const ensureAdminOrSameUser = (req, res, next) => {
  try {
    if (
      res.locals.user &&
      (res.locals.user.role === "admin" || res.locals.user.id === req.params.id)
    ) {
      return next();
    } else {
      throw new ForbiddenError("Not Admin");
    }
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureEditorOrAdmin,
  ensureAdmin,
  ensureAdminOrSameUser,
};
