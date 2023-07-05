const krypcore_web3_sdk = require("krypcore-web3-sdk")
const configFilePath = 'config.json'
const Web3Engine = new krypcore_web3_sdk.Web3Engine(configFilePath)
const ethers = Web3Engine.wrappers.ethers
const testProvider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com")

async function test() {
    const balance = await Web3Engine.Wallet.getBalance("0xE6D5514b8De7ef9E5F5c4cc2E8cA0207129DEB65")
    console.log(balance)
}

test()