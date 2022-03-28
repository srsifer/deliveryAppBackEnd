const express = require('express');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT || 3001;
const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: {
      origin: 'http://localhost:3000', // url aceita pelo cors
      methods: ['GET', 'POST'], // Métodos aceitos pela url
    } });

const root = require('../controllers/root');
const { errorHandler } = require('../middlewares');

app.use(cors());

app.use(express.json());

app.use(express.static('public/build'));

app.get('/images/:name', async (req, res, _next) => {
    const { name } = req.params;
    res.sendFile(path.join(__dirname, '../../public/images', name));
});

app.use(root);

require('../sockets/saleStatus')(io);

app.use(errorHandler);

const pathToBuild = path.join(__dirname, '../../public/build');

app.use((req, res, _next) => {
  res.sendFile(path.join(pathToBuild, 'index.html'));
});

http.listen(port);
console.log(`Api rodando na porta ${port}`);
