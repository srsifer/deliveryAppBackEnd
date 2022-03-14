const Models = require('../database/models');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('changeStatus', async ({ id, status }) => {
    await Models.sales.update({ status }, { where: { id } });
    
    const updatedOrder = await Models.sales.findByPk(id);
    const updatedOrders = await Models.sales.findAll();

    io.emit('updatedStatus', { status: updatedOrder.status });
    io.emit('updatedOrders', updatedOrders);
  });
});
