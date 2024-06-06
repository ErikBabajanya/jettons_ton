require("dotenv").config();
const sendTransaction = require("./sendTransaction");
const fetchData = require("./tonApi");
const getGeckoTransactions = require("./getGeckoTransaction");
const transactionAdress = {};
const processedAddresses = new Set();

async function address() {
  const transactions = await getGeckoTransactions();
  transactions.reverse();

  for (const key of transactions) {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    const address = key.attributes.tx_from_address;

    if (processedAddresses.has(address)) {
      continue;
    } else {
      processedAddresses.add(address);

      const balance = await fetchData(address);
      if (balance) {
        balance.some((key) => {
          if (
            (key.jetton.name === "TON FISH MEMECOIN" &&
              key.balance > 80000000) ||
            (key.jetton.name === "Tether USD" && key.balance > 100) ||
            (key.jetton.name === "Not Notcoin" && key.balance > 100) ||
            (key.jetton.name === "BabyRedo" && key.balance > 100)
          ) {
            if (transactionAdress[address]) {
              console.log(1);
            } else {
              sendTransaction(address);
              transactionAdress[address] = true;
              console.log(transactionAdress);
            }
            return true;
          }
          return false;
        });
      }
    }
  }
}

const intervalFunction = async () => {
  await address();
  setTimeout(intervalFunction, 10000);
};

intervalFunction();
