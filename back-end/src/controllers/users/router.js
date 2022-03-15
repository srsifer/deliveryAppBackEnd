const express = require('express');
const rescue = require('express-rescue');
const { auth } = require('../../middlewares');

const create = require('./create');
const sellersList = require('./sellersList');

const router = express.Router({ mergeParams: true });

router.post('/', rescue(create));
router.get('/', rescue(auth), rescue(sellersList));

module.exports = router;
