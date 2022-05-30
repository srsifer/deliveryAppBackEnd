const express = require('express');
const cors = require('cors');
const socketIo = require('socket.io');

const app = express();
const http = require('http').createServer(app);
const root = require('../controllers/root');
const saleStatusSocket = require('../sockets/saleStatus');
const { errorHandler } = require('../middlewares');

const io = socketIo(http, {
  cors: {
    origin: '*', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });

app.use(cors()); 

app.use(express.json());

app.use(root);

saleStatusSocket(io);

app.use(errorHandler);

module.exports = http;
