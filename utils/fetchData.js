const fetchURL = `https://api.coincap.io/v2/assets`;
const logger = require("./logger.js");
const fetchData = async () => {
  const response = await fetch(fetchURL);
  if (response.ok) return await response.json();
  throw new Error("Backend cannot fetch external api ");
};
module.exports = fetchData;
