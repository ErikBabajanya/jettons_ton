const axios = require("axios");
async function fetchData(address) {
  try {
    const response = await axios.get(
      `https://tonapi.io/v2/accounts/${address}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    const balance = response.data.balance;
    return balance;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

module.exports = fetchData;
