require('dotenv').config()
const krypcore_web3_sdk = require("krypcore-web3-sdk")
const configFilePath = '../../config.json'
const Web3Engine = new krypcore_web3_sdk.Web3Engine(configFilePath)
const ethers = Web3Engine.wrappers.ethers
const userRpcUrl = Web3Engine.blockchainEndpointsIndexed['80001'].rpcURL
console.log(userRpcUrl)

const EasyNftService = new Web3Engine.Services.EasyNFT(configFilePath)

async function testEasyNftMethods() {

    try {

        const createCollectionStatus  = await EasyNftService.createNFTCollection("ERC721", "80001", "Bored Apes", "Its a nft collection", "APE", process.env.WALLET_ACCESS_TOKEN, false)
        console.log(createCollectionStatus)

    }

    catch(err){
        console.error(err)
    }

}

testEasyNftMethods()
