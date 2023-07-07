// Other Necessary Items
require('dotenv').config()
const sampleAbi = require("./resources/abi")

// SDK Initialization
const krypcore_web3_sdk = require("krypcore-web3-sdk")
const { sign } = require('crypto')
const configFilePath = '../../config.json'
const Web3Engine = new krypcore_web3_sdk.Web3Engine(configFilePath)

// Accessing the Core Service Methods - Kcw3 APIs
const WalletMgrService = new Web3Engine.Services.WalletManager(configFilePath)

async function testWalletManagerMethods() {

    // create wallet
    const WalletCreationStatus = await WalletMgrService.createWallet("sample-test-1234", "secp256k1")
    console.log(WalletCreationStatus)

    // Create and execute txn
    // const txStatus = await WalletMgrService.createAndExecuteTx(80001, "0xE396a584D29036c44c138E98072341C4174778BD", JSON.stringify(sampleAbi), true, "mintNFT", "27b0b01c-ada9-4a55-9331-83e5b22d18ab", 0, [])
    // console.log(txStatus)

    // Get All Wallets
    const myWallets = await WalletMgrService.getAllWallets()
    console.log(myWallets)

    // Get specific wallet details
    const myWalletDetails = await WalletMgrService.getWallet('DKYC Platform Wallet')
    console.log(myWalletDetails)

    // Get balance API for getting a wallet's balance
    const walletBalanceDetails = await WalletMgrService.getBalance('DKYC Platform Wallet')
    console.log(walletBalanceDetails)

    // Call contract view method
    const callContractStatus = await WalletMgrService.callContract(80001, "0xE396a584D29036c44c138E98072341C4174778BD", JSON.stringify(sampleAbi), "owner", [], process.env.WALLET_ACCESS_TOKEN)
    console.log(callContractStatus)

    // Get Tx History
    const txHistoryStatus = await WalletMgrService.getTxHistory(80001, process.env.WALLET_ACCESS_TOKEN)
    console.log(txHistoryStatus)

    // Sign Message
    const signMessageStatus = await WalletMgrService.signMessage("Hello there", process.env.WALLET_ACCESS_TOKEN)
    console.log(signMessageStatus)

    // Sign Tx Hash 
    const signTxHashStatus = await WalletMgrService.signTxHash("0x157755d6d077c508b02526308399d14b8c4e731849bcf81c51936405139d701f", process.env.WALLET_ACCESS_TOKEN)
    console.log(signTxHashStatus)




}

testWalletManagerMethods()