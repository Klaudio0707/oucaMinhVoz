const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('apiFake/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 5001; // Certifique-se de usar uma porta que não conflite
server.listen(PORT, () => {
  console.log(`JSON Server está rodando na porta ${PORT}`);
});
