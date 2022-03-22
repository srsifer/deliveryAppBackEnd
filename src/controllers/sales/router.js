const express = require('express');
const rescue = require('express-rescue');

const { auth } = require('../../middlewares');
const create = require('./create');
const getByUser = require('./getByUser');
const getById = require('./getById');

const router = express.Router({ mergeParams: true });

router.post('/', rescue(auth), rescue(create));
router.get('/:id', rescue(auth), rescue(getByUser));
router.get('/sales/:id', rescue(auth), rescue(getById));

module.exports = router;
