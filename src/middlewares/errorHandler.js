const { StatusCodes } = require('http-status-codes');

module.exports = (err, _req, res, _next) => {

  if (err.message === 'jwt expired') {
    return res.status(StatusCodes.UNAUTHORIZED).send(err.message);
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
};
