const salesServices = require('../../services/sales');

module.exports = async (req, res, _next) => {
  const { id: userId } = req.params;
    const result = await salesServices.getByUser(userId);
    return res.status(result.status).json(result.message);
  };
