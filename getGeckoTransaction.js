const axios = require("axios");
const headers = {
  accept: "application/json",
};

const getGeckoTransactions = async (pools) => {
  try {
    const response = await axios.get(
      `https://api.geckoterminal.com/api/v2/networks/ton/pools/${pools}/trades`,
      { headers }
    );
    const data = response.data.data;
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = getGeckoTransactions;
