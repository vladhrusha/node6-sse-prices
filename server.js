const express = require("express");
require("dotenv").config();
const fetchData = require("./utils/fetchData.js");
const sendSSEUpdate = require("./utils/sendSSEUpdate.js");
const logger = require("./utils/logger.js");
const handleGetUpdate = require("./endpoints/handleGetUpdate.js");

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
  const newClient = handleGetUpdate.addClient({ res, clients });
  logger.info(`Client ${newClient.id} connected`);

  // initial update
  coinData = await fetchData();
  sendSSEUpdate(clients, coinData.data);

  // remove reduntant data
  req.on("close", () => {
    logger.info(`Client ${newClient.id} disconnected`);
    handleGetUpdate.removeClient({ newClient, clients });
  });
});
// set update interval
setInterval(async () => {
  coinData = await fetchData();
  sendSSEUpdate(clients, coinData.data);
}, 30000);

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
