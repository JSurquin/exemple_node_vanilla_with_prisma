const http = require("http");

http
  .createServer((req, res) => {})
  .listen(3000, () => {
    console.log("Le serveur est en cours d'écoute sur le port 3000");
  });
