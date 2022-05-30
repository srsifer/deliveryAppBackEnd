const path = require('path');

module.exports = async (req, res, _next) => {
  const { name } = req.params;

  res.sendFile(path.join(__dirname, '../../../public/images', name));
  };
