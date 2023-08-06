import React, { useEffect, useState, useRef } from "react";
import { ethers, formatEther } from "ethers";

const Metamask = () => {
  const [signer, setSigner] = useState(null);
  const [blockNumber, setBlockNumber] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transactionCount, setTransactionCount] = useState(null);
  const providerRef = useRef(null);

  const windowEthereum = async () => {
    let provider;
    if (!window.ethereum) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      try {
        const signerInstance = await provider.getSigner();
        setSigner(signerInstance);
      } catch (error) {
        console.error("Error getting signer", error);
      }
    }
    // Provider ref for all the other functions
    providerRef.current = provider;
  };

  const blockNumberFn = async () => {
    if (providerRef.current) {
      const provider = providerRef.current;
      // Look up the current block number (i.e. height)
      const signersBlock = await provider.getBlockNumber();
      setBlockNumber(signersBlock);
      // 17831911
    } else {
      console.log("signer not assigned", "signerError");
    }
  };
  const balanceFn = async () => {
    if (providerRef.current) {
      const provider = providerRef.current;
      // Get the current balance of an account (by address or ENS name)
      const signersBalance = await provider.getBalance(signer.address);
      // Since the balance is in wei, format to display it in ether
      setBalance(formatEther(signersBalance));
    } else {
      console.log("balance not assigned", "balanceError");
    }
  };
  const transactionCountFn = async () => {
    if (providerRef.current) {
      const provider = providerRef.current;
      // Get the next nonce required to send a transaction
      const signersTransaction = await provider.getTransactionCount(signer.address);
      setTransactionCount(signersTransaction);
      // 3
    } else {
      console.log("transaction not assigned", "transactionCountError");
    }
  };

  useEffect(() => {
    windowEthereum();
  }, []);

  useEffect(() => {
    if (signer) {
      windowEthereum();
      blockNumberFn();
      balanceFn();
      transactionCountFn();
    }
  }, [signer]);

  return (
    <div className="w-80 mx-auto text-white">
      <h1 className="text-center py-4 my-4 rounded-lg tracking-widest font-bold bg-slate-500/90">Metamask Page</h1>
      <div className="p-4 rounded-lg bg-slate-500/90 leading-8 tracking-widest text-xs flex flex-col">
        <h3 className="truncate hover:truncate-none">Signer:{signer?.address}</h3>
        <h3>BlockNumber: {blockNumber}</h3>
        <h3>Balance: {balance?.toString()}</h3>
        <h3>Transaction Count: {transactionCount}</h3>
        <hr className="my-3"/>
        <h5 className="tracking-normal leading-4 text-[8px]">This is a simple blockchain app to test connection using EthersJs with Metamask as a Provider</h5>
      </div>
    </div>
  );
};

export default Metamask;
