const fetchData = require("../../utils/fetchData.js");
const sendSSEUpdate = require("../../utils/sendSSEUpdate.js");

const handleUpdate = async ({ clients, coinData }) => {
  try {
    coinData = await fetchData();
    sendSSEUpdate(clients, coinData.data);
  } catch (err) {
    clients.forEach((client) => {
      client.res.write(`${err}\n\n`);
    });
  }
};
module.exports = handleUpdate;
