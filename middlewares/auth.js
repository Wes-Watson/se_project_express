const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { err401 } = require("../utils/errors");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(err401.status).send({ message: err401.message });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(err401.status).send({ message: err401.message });
  }

  req.user = payload;
  next();
};

module.exports = auth;
