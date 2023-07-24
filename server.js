const express = require("express");
require("dotenv").config();
const logger = require("./utils/logger.js");
const handleConnection = require("./endpoints/coins/handleConnection.js");
const handleUpdate = require("./endpoints/coins/handleUpdate.js");
const app = express();
const port = process.env.PORT;
const clients = [];
let coinData;
const appName = "task6SSE";
const appVersion = process.env.APP_VERSION;

// get update SSE
app.get(`/${appName}/${appVersion}/coins`, async (req, res) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);

  // add connection to update list
  const newClient = handleConnection.addClient({ res, clients });
  logger.info(`Client ${newClient.id} connected`);

  // initial update
  handleUpdate({ clients, coinData });

  // remove reduntant data
  req.on("close", () => {
    logger.info(`Client ${newClient.id} disconnected`);
    handleConnection.removeClient({ newClient, clients });
  });
});
// update interval
setInterval(async () => {
  handleUpdate({ clients, coinData });
}, 30000);

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
