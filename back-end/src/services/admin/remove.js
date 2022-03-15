const { StatusCodes } = require('http-status-codes');
const { USER_NOT_EXIST } = require('../../../utils/errorSet');
const Models = require('../../database/models');

module.exports = async (id) => {  
  const userById = await Models.users.findByPk(id);

  if (!userById) {
    return USER_NOT_EXIST;
  }

  await Models.users.destroy({ where: { id } });

  return { status: StatusCodes.NO_CONTENT, message: '' };
};
