// Metamask.js

import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';

const Metamask = () => {
    const [balance, setBalance] = useState("");

    useEffect(() => {
        if (window.ethereum) {
            try {
                // Request account access
                window.ethereum.request({ method: 'eth_requestAccounts' });

                // Create new provider
                const provider = new ethers.providers.JsonRpcProvider(window.ethereum);

                // Get account address
                window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
                    if (accounts.length === 0) {
                        console.log('No account');
                    } else {
                        const address = accounts[0];

                        // Fetch balance
                        provider.getBalance(address).then((balance) => {
                            const formattedBalance = ethers.utils.formatEther(balance);
                            setBalance(formattedBalance);
                        });
                    }
                });

                // Handle accounts changing
                window.ethereum.on('accountsChanged', (accounts) => {
                    if (accounts.length === 0) {
                        console.log('No account');
                    } else {
                        const address = accounts[0];

                        // Fetch balance
                        provider.getBalance(address).then((balance) => {
                            const formattedBalance = ethers.utils.formatEther(balance);
                            setBalance(formattedBalance);
                        });
                    }
                });

                // Handle chain changing
                window.ethereum.on('chainChanged', (chainId) => {
                    window.location.reload();
                });

            } catch (error) {
                // User denied account access...
                console.error("User denied account access");
            }
        } else {
            console.error("Non-Ethereum browser detected. You should consider trying MetaMask!");
        }
    }, []);

    return (
        <div>
            <h1>Metamask Balance</h1>
            <p>{balance}</p>
        </div>
    );
};

export default Metamask;
