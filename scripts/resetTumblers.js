require("dotenv").config();

const fs = require("fs");
const console = require("console");
const ethers = require("ethers");

// to talk to a contract, you need the contract address
const padlockContractAddress = "0xC0E762e209b73dB223B8b615C255afE224F374e6";

// it helps if you know what functions exist on the contract
// the abi is the interface to the contract, and is frequently
// avaialble on etherscan, or in artifacts/contracts/<contractname>.sol/<contractname>.json
const abiFilePath = "artifacts/contracts/padlock.sol/padlock.json";
const abiFileParsed = JSON.parse(fs.readFileSync(abiFilePath));
const padlockContractAbi = abiFileParsed.abi;
// we also need to talk to a node on the network
// this can be a node you run yourself, or a friend
// or run by a third party.  we're going to use alchemy for this

// also note, we're useing WebSocketProvider, not JsonRpcProvider
// WebSockets are faster, and more reliable, and uses the wss:// protocol
// JsonRpcProvider uses the http:// protocol
const provider = new ethers.providers.WebSocketProvider(
  process.env.ALCHEMY_OP_GOERLI_KEY_WSS
);

const wallet = new ethers.Wallet(
  process.env.ALCHEMY_OP_GOERLI_PRIVATE_KEY,
  provider
);

// create the ethers contract object
// note that wagmi and alchemy sdk use similar naming conventions
const padlockContract = new ethers.Contract(
  padlockContractAddress,
  padlockContractAbi,
  wallet
);

async function main() {

	// this contract includes a while loop, soit has trouble guessing how much
	// gas we need to rpeallocate.  so I set to a large number
  await padlockContract.resetTumblers({
    gasLimit: 1000000,
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
