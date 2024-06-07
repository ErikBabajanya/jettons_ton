require("dotenv").config();
const sendTransaction = require("./sendTransaction");
const fetchData = require("./tonApi");
const getGeckoTransactions = require("./getGeckoTransaction");
const mongoose = require("mongoose");
const addressModel = require("./schema.mongo");
const { MongoClient, ServerApiVersion } = require("mongodb");

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     console.log(11);
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("Wallet").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     console.log(11);
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run();

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

async function address() {
  const TonFishPools = await getGeckoTransactions(
    "EQCVflRjTn91FKGZzy2UTHgLn3hG3TsOlQIsAOPcB57K5gT5"
  );
  await findAdress(TonFishPools);

  await sleep(2000);
  const TonUsdtPools = await getGeckoTransactions(
    "EQD8TJ8xEWB1SpnRE4d89YO3jl0W0EiBnNS4IBaHaUmdfizE"
  );
  await findAdress(TonUsdtPools);

  await sleep(2000);
  const TonNotPools = await getGeckoTransactions(
    "EQCaY8Ifl2S6lRBMBJeY35LIuMXPc8JfItWG4tl7lBGrSoR2"
  );
  await findAdress(TonNotPools);

  await sleep(2000);
  const TonWethPools = await getGeckoTransactions(
    "0x4b62fa30fea125e43780dc425c2be5acb4ba743b"
  );
  await findAdress(TonWethPools);

  await sleep(2000);
  const TonStonPools = await getGeckoTransactions(
    "EQDtZHOtVWaf9UIU6rmjLPNLTGxNLNogvK5xUZlMRgZwQ4Gt"
  );
  await findAdress(TonStonPools);

  await sleep(2000);
  const TonHifPools = await getGeckoTransactions(
    "EQCgsOdELK_Yl2Y_OCuzX4tIX0rILe-5T2rTeu5t0sWdTx1r"
  );
  await findAdress(TonHifPools);

  await sleep(2000);
  const TonGramPools = await getGeckoTransactions(
    "EQASBZLwa2vfdsgoDF2w96pdccBJJRxDNXXPUL7NMm0WdnMx"
  );
  await findAdress(TonGramPools);

  await sleep(2000);
  const TonTimePools = await getGeckoTransactions(
    "EQCDdHO1BiZc92d6J10DFjYxm6k2vGKIr3wNKAftPXCBjuph"
  );
  await findAdress(TonTimePools);

  await sleep(2000);
  const TonBabytonPools = await getGeckoTransactions(
    "EQD8YTdUUEthPoMS3UfClqGHsCUW-g1ut_TKhes9vcnVn0Fb"
  );
  await findAdress(TonBabytonPools);

  await sleep(2000);
  const TonTigerPools = await getGeckoTransactions(
    "EQBAPm-vz6rxbLH5U5pwJvpQGr1G7trYsICgOUvEDYMSa7WK"
  );
  await findAdress(TonTigerPools);
}

const intervalFunction = async () => {
  await address();
  setTimeout(intervalFunction, 10000);
};

intervalFunction();

const findAdress = async (TonFishPools) => {
  for (const key of TonFishPools) {
    await sleep(3000);
    const address = key.attributes.tx_from_address;
    const balance = await fetchData(address);
    const amoutTon = balance / 1000000000;
    if (amoutTon > 20) {
      await sendTransaction(address);
    }
  }
};
