{
  const fetchURL = `https://api.coincap.io/v2/assets`;
  const fetchData = async () => {
    const response = await fetch(fetchURL);
    return await response.json();
  };
  module.exports = fetchData;
}
