
  const filterByRankLessThan5 = require("./filterByRankLessThan5.js");

  const sendSSEUpdate = (clients, coinData) => {
    if (!clients) return;
    const data = filterByRankLessThan5(coinData);
    clients.forEach((client) => {
      client.res.write(`data: ${JSON.stringify(data)}\n\n`);
    });
  };
  module.exports = sendSSEUpdate;

