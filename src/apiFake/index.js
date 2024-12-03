const express = require('express');
const cors = require('cors');
const jsonServer = require('json-server');
const path = require('path');

const server = express();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Habilita CORS
server.use(cors());
server.use(middlewares);
server.use(router);

// Porta será definida pela Vercel automaticamente
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
