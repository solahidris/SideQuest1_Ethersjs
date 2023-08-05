// Metamask.js

// Import everything
import { ethers, JsonRpcProvider, getBlockNumber } from "ethers";

// Import just a few select items
// import { BrowserProvider, parseUnits } from "ethers";

// Import from a specific export
// import { HDNodeWallet } from "ethers/wallet";

const Metamask = () => {

  const apikey = process.env.INFURA_API_KEY;

  var ethers = require("ethers");
  var url = `https://mainnet.infura.io/v3/${apikey}`;
  var customHttpProvider = new ethers.providers.JsonRpcProvider(url);
  customHttpProvider.getBlockNumber().then((result) => {
    console.log("Current block number: " + result);
  });

  return (
    <div>
      <h1>metamask page</h1>
    </div>
  );
};

export default Metamask;

// Ethers
// Save the following script to a file, e.g. index.js

// var ethers = require("ethers");
// var url = "https://mainnet.infura.io/v3/<API-KEY>";
// var customHttpProvider = new ethers.providers.JsonRpcProvider(url);
// customHttpProvider.getBlockNumber().then((result) => {
//   console.log("Current block number: " + result);
// });

// In a terminal window, run the script with node index.js

// Latest Ethereum Block is  14659509