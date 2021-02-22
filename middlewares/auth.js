const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/constants');
const { authorizeErrorText } = require('../configs/errorTexts');
const AuthorizationError = require('../errorTypes/AuthorizationError');

module.exports = function (req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError({ message: authorizeErrorText });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthorizationError({ message: authorizeErrorText }));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return next(); // пропускаем запрос дальше
};
