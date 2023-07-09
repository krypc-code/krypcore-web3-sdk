require('dotenv').config()

// SDK Initialization
const krypcore_web3_sdk = require("krypcore-web3-sdk")
const configFilePath = '../../config.json'
const Web3Engine = new krypcore_web3_sdk.Web3Engine(configFilePath)

// Accessing SDK Power Methods
async function testPowerMethods() {
    const balance = await Web3Engine.Wallet.getBalance("0xE6D5514b8De7ef9E5F5c4cc2E8cAs0207129DEB65", 80001)
    console.log(balance)
    Web3Engine.Wallet.setProviderAndSigner(process.env.PRIVATE_KEY_FOR_TESTING, 80001)
    const signature = await Web3Engine.Wallet.signMessage("hello")
    console.log(signature)
}

testPowerMethods()