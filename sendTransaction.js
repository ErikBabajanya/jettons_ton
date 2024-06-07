const { WalletContractV4, TonClient, internal } = require("ton");
const { mnemonicToWalletKey } = require("ton-crypto");
const { getHttpEndpoint } = require("@orbs-network/ton-access");

async function sendTransaction(address) {
  try {
    const mnemonic = "Secret Key";
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const sender = WalletContractV4.create({
      publicKey: key.publicKey,
      workchain: 0,
    });

    const endpoint = await getHttpEndpoint();

    const client = new TonClient({ endpoint });

    const contract = client.open(sender);
    const seqno = await contract.getSeqno();
    await contract.sendTransfer({
      secretKey: key.secretKey,
      seqno: seqno,
      messages: [
        internal({
          to: `${address}`,
          value: "0.0000001",
          body: "Message Text",
          bounce: false,
        }),
      ],
    });
    let currentSeqno = seqno;
    if (currentSeqno == seqno) {
      console.log("pending transaction");
      currentSeqno = await contract.getSeqno();
    }
    console.log("transaction sucsses");
    return true;
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
}

module.exports = sendTransaction;
