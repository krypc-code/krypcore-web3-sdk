// Other Necessary Items
require('dotenv').config()
const sampleAbi = require("./resources/abi")
const sampleAbiBase64 = Buffer.from(JSON.stringify(sampleAbi)).toString('base64');
const sampleBytecode = require("./resources/bytecode")
const typedData = require("./resources/typedData")


// SDK Initialization
const krypcore_web3_sdk = require("krypcore-web3-sdk")
const { sign } = require('crypto')
const configFilePath = '../../config.json'
const Web3Engine = new krypcore_web3_sdk.Web3Engine(configFilePath)
const ethers = Web3Engine.wrappers.ethers
const userRpcUrl = Web3Engine.blockchainEndpointsIndexed['80001'].rpcURL

// Accessing the Core Service Methods - Kcw3 APIs
const WalletMgrService = new Web3Engine.Services.WalletManager(configFilePath)


async function createUnsignedTransaction(senderAddress, contractAddress, contractAbi, methodName, methodArgs, provider, msgSender) {
    const nonce = await provider.getTransactionCount(senderAddress);
    const gasPrice = await provider.getGasPrice();
    const contract = new ethers.Contract(contractAddress, contractAbi, provider);
    const estimateGasPromise = contract.estimateGas[methodName](...methodArgs, { from: msgSender });
    const estimatedGas = await estimateGasPromise;
    const transaction = {
        nonce: nonce,
        gasPrice: gasPrice,
        gasLimit: estimatedGas.mul(2), // Add some margin for safety
        to: contractAddress,
        value: ethers.constants.Zero, // No value to send
        data: contract.interface.encodeFunctionData(methodName, methodArgs),
    };
    const unsignedTransactionBytes = ethers.utils.serializeTransaction(transaction)
    const unsignedTransactionBase64 = Buffer.from(unsignedTransactionBytes).toString('base64');
    return unsignedTransactionBase64;
}

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

    // Verify signature
    const verifySignatureStatus = await WalletMgrService.verifySignatureOffChain("Hello there", "0x9d5726c70e92a589f6012be02ed64789feadc8f18a85d6354f3247d3a59c042523e30a783539c6f5708d6964e2e04d05cd4157d6c0516f124bc4d2795bd7726c01", process.env.WALLET_ACCESS_TOKEN)
    console.log(verifySignatureStatus)

    // Sign Typed Data API
    const signTypedDataStatus = await WalletMgrService.signEip712TypedData(JSON.stringify(typedData), process.env.WALLET_ACCESS_TOKEN)
    console.log(signTypedDataStatus)

    // Sign Tx - Tx is in bytes
    // const sampleProvider = new ethers.providers.JsonRpcProvider(userRpcUrl)
    // const unsignedTransaction = await createUnsignedTransaction("0xE129D672cE1B741C94f5bffcB003cDf7570Bb2B8", "0xE396a584D29036c44c138E98072341C4174778BD", sampleAbi, "mintNFT", [], sampleProvider, "0xE129D672cE1B741C94f5bffcB003cDf7570Bb2B8")
    // const signTxStatus = await WalletMgrService.signTx(unsignedTransaction, process.env.WALLET_ACCESS_TOKEN)
    // console.log(signTxStatus)

    // Deploy contract API
    // const deployContractParams = [
    //     {
    //         "type": "string",
    //         "value": "test collection"
    //     },
    //     {
    //         "type": "string",
    //         "value": "TEST"
    //     }
    // ]
    // const deployContractStatus = await WalletMgrService.deployContract(80001, sampleAbiBase64, sampleBytecode, process.env.WALLET_ACCESS_TOKEN, JSON.stringify(deployContractParams))
    // console.log(deployContractStatus)

    // const signAndExecuteTxApiStatus = await WalletMgrService.signAndExecuteTx(80001, unsignedTransaction, process.env.WALLET_ACCESS_TOKEN)
    // console.log(signAndExecuteTxApiStatus)

}

testWalletManagerMethods()
// createUnsignedTransaction()