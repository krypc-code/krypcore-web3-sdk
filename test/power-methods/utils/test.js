require('dotenv').config()

// SDK Initialization
const krypcore_web3_sdk = require("@krypc/krypcore-web3-sdk")
const configFilePath = '../../config.json'
const Web3Engine = new krypcore_web3_sdk.Web3Engine(configFilePath)
const ethers = Web3Engine.wrappers.ethers

async function tryUtilsPowerMethods() {
    try {
        const ensResolution = await Web3Engine.Utils.resolveAddresstoENS("0xE6D5514b8De7ef9E5F5c4cc2E8cA0207129DEB65")

    }
    catch(error){
        console.error(error)
    }
}

tryUtilsPowerMethods()