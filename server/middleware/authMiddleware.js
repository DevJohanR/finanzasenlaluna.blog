const jwt = require('jsonwebtoken');
const HttpError = require('../models/errorModel');

const authMiddleware = async (req, res, next) => {
  const Authorization = req.headers.authorization;

  if (Authorization && Authorization.startsWith("Bearer ")) {
    const token = Authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return next(new HttpError("Unauthorized. Invalid token.", 403));
      }
      req.user = user; // Aquí asignamos el usuario al objeto de la solicitud
      next();
    });
  } else {
    return next(new HttpError("Unauthorized. No token", 401));
  }
};

module.exports = authMiddleware;
