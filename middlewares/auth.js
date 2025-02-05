const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { err401 } = require("../utils/errors");
const UnauthorizedError = require("../errors/UnauthorizedError");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    console.log(req.headers, authorization);
    next(new UnauthorizedError(err401.message));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(err401.message));
  }

  req.user = payload;
  return next();
};

module.exports = auth;
