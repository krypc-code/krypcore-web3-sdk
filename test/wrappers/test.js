require('dotenv').config()

// SDK Initialization
const krypcore_web3_sdk = require("krypcore-web3-sdk")
const configFilePath = '../config.json'
const Web3Engine = new krypcore_web3_sdk.Web3Engine(configFilePath)

async function testWrapperPackages() {

    // Testing wrapper package ethers.js
    const ethers = Web3Engine.wrappers.ethers

    const userRpcUrl = Web3Engine.blockchainEndpointsIndexed['80001'].rpcURL
    const testProvider = new ethers.providers.JsonRpcProvider(userRpcUrl)
    const balanceFetchedfromProvider = await testProvider.getBalance("0xE6D5514b8De7ef9E5F5c4cc2E8cA0207129DEB65")
    console.log(balanceFetchedfromProvider)
}

testWrapperPackages()