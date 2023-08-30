import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
const sdk = require("@krypc/krypcore-web3-sdk")


function App() {

  useEffect(()=>{
    initialize()
  }, []) 

  const [Web3Engine, setWeb3Engine] = useState('')
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState('')
  const [provider, setProvider] = useState('')
  const [signer, setSigner] = useState('')

  const connectWallet = async ()=> {
      const [provider, signer, address] = await Web3Engine.Utils.connectWallet()
      setProvider(provider)
      setSigner(signer)
      setAddress(address)
      const balance = await Web3Engine.Wallet.getBalance(address, 80001)
      setBalance(Number(balance))
  }

  async function initialize() {

    try {
      const Web3Engine = await sdk.initialize({
        authorization: process.env.REACT_APP_AUTH,
        dappId: process.env.REACT_APP_DAPPID
    }) 
    setWeb3Engine(Web3Engine)

    }
    catch(err) {
      console.error("SDK Initialization failed: ", err)
    }

  
  }

  return (
    <div className="App">
      <h1>Connect Wallet Demo </h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      <h3>Connected Wallet Address: {address}</h3>
      <h3>Balance on Polygon Mumbai: {balance}</h3>
    </div>
  );
}

export default App;
