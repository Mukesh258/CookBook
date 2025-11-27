// server.js
import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Allow mounting at a prefix (useful if you want /api). Set API_PREFIX to '' for root.
const API_PREFIX = process.env.API_PREFIX || '';

server.use(middlewares);
server.use(API_PREFIX, router); // routes will be `${API_PREFIX}/recipes` if prefix provided

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT} with prefix '${API_PREFIX}'`);
});
