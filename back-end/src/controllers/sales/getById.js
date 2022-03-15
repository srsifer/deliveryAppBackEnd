const salesServices = require('../../services/sales');

module.exports = async (req, res, _next) => {
  const { id: orderId } = req.params;
    const result = await salesServices.getById(orderId);
    return res.status(result.status).json(result.message);
  };
