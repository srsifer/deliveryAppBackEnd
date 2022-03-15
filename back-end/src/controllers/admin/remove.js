const adminServices = require('../../services/admin');

module.exports = async (req, res, _next) => {
    const { id } = req.params;
  
    const result = await adminServices.remove(id);

    return res.status(result.status).json(result.message);
  };
