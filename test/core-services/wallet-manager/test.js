// Other Necessary Items
require('dotenv').config()
const sampleAbi = require("./resources/abi")

// SDK Initialization
const krypcore_web3_sdk = require("krypcore-web3-sdk")
const configFilePath = '../../config.json'
const Web3Engine = new krypcore_web3_sdk.Web3Engine(configFilePath)

// Accessing the Core Service Methods - Kcw3 APIs
const WalletMgrService = new Web3Engine.Services.WalletManager(configFilePath)

async function testWalletManagerMethods() {
    
    // create wallet
    const WalletCreationStatus = await WalletMgrService.createWallet("sample-test-1234", "secp256k1")
    console.log(WalletCreationStatus)

    // Create and execute txn
    const txStatus = await WalletMgrService.createAndExecuteTx(80001, "0xE396a584D29036c44c138E98072341C4174778BD", JSON.stringify(sampleAbi), true, "mintNFT", "27b0b01c-ada9-4a55-9331-83e5b22d18ab", 0, [])
    console.log(txStatus)

    // Get All Wallets
    const myWallets = await WalletMgrService.getAllWallets()
    console.log(myWallets)

    // Get specific wallet
    const myWalletDetails = await WalletMgrService.getWallet('DKYC Platform Wallet')
    console.log(myWalletDetails)

}

testWalletManagerMethods()