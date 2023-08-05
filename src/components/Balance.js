// Balance.js

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const Balance = () => {
  // Balance state
  const [balance, setBalance] = useState("");

  // Fetch Balance function
  const fetchBalance = async () => {
    try {
      // Use default provider (Can change this to any Ethereum node URL)
      let provider = ethers.getDefaultProvider();
      // Ethereum address to fetch balance
      let address = "0xA6A05612d6C24061E1841f10d87af5bE7B8e6804";

      // Fetch Balance from Provider
      let balance = await provider.getBalance(address);
      balance = ethers.utils.formatEther(balance);

      // Update Balance
      setBalance(balance);
    } catch (error) {
      console.log("Failed to fetch balance:", error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [])

  return (
    <div>
      <p>this is the balance page</p>
      <h1>Balance:</h1>
      <h2>{balance}</h2>
    </div>
  );
};

export default Balance;
