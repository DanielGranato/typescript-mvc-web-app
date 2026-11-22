import http from "http";
import app from "./config/express.js";

const server = http.createServer(app);

server.listen(8080, () => {
  console.log(`Servidor escutando na porta: ${server.address().port}`);
});