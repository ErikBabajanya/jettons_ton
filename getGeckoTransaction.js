const axios = require("axios");
const url =
  "https://api.geckoterminal.com/api/v2/networks/ton/pools/EQCVflRjTn91FKGZzy2UTHgLn3hG3TsOlQIsAOPcB57K5gT5/trades";

const headers = {
  accept: "application/json",
};

const getGeckoTransactions = async () => {
  try {
    const response = await axios.get(url, { headers });
    const data = response.data.data;
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = getGeckoTransactions;
