
  const filterByRankLessThan5 = (coinData) => {
    return coinData
      .filter((coin) => coin.rank <= 5)
      .map((coin) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        rank: coin.rank,
        price: coin.priceUsd,
      }));
  };
  module.exports = filterByRankLessThan5;

