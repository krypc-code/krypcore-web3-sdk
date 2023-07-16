// Other Necessary Items
require('dotenv').config()
const sampleAbi = require("./resources/abi")
const sampleAbiBase64 = Buffer.from(JSON.stringify(sampleAbi)).toString('base64');
const sampleBytecode = require("./resources/bytecode")
const typedData = require("./resources/typedData")

// SDK Initialization
const krypcore_web3_sdk = require("krypcore-web3-sdk")
const configFilePath = '../../config.json'
const Web3Engine = new krypcore_web3_sdk.Web3Engine(configFilePath)
const ethers = Web3Engine.wrappers.ethers
const userRpcUrl = Web3Engine.blockchainEndpointsIndexed['80001'].rpcURL

// Accessing the Core Service Methods - Kcw3 APIs
const WalletMgrService = new Web3Engine.Services.WalletManager(configFilePath)

const sampleProvider = new ethers.providers.JsonRpcProvider(userRpcUrl)

async function createUnsignedTransaction(senderAddress, contractAddress, contractAbi, methodName, methodArgs, provider, msgSender) {

    // Get the sender's nonce
    const nonce = await provider.getTransactionCount(senderAddress);

    // Estimate gas price
    const gasPrice = await provider.getGasPrice();

    // Create a new contract instance
    const contract = new ethers.Contract(contractAddress, contractAbi, provider);

    // Estimate gas limit
    const estimateGasPromise = contract.estimateGas[methodName](...methodArgs, { from: msgSender });
    const estimatedGas = await estimateGasPromise;

    // Create the transaction object
    const transaction = {
        nonce: nonce,
        gasPrice: gasPrice,
        gasLimit: estimatedGas.mul(2), // Add some margin for safety
        to: contractAddress,
        value: ethers.constants.Zero, // No value to send
        data: contract.interface.encodeFunctionData(methodName, methodArgs),

    };

    // Convert the transaction to bytes
    const unsignedTransactionBytes = ethers.utils.arrayify(ethers.utils.serializeTransaction(transaction));

    // Convert the unsigned transaction bytes to Base64
    const unsignedTransactionBase64 = Buffer.from(unsignedTransactionBytes).toString('base64');
    return unsignedTransactionBase64;

}


async function testWalletManagerMethods() {

    // Sign Tx - Tx is in bytes - WIP
    // const unsignedTransaction = await createUnsignedTransaction("0xE129D672cE1B741C94f5bffcB003cDf7570Bb2B8", "0xE396a584D29036c44c138E98072341C4174778BD", sampleAbi, "mintNFT", [], sampleProvider, "0xE129D672cE1B741C94f5bffcB003cDf7570Bb2B8")
    // const signTxStatus = await WalletMgrService.signTx(unsignedTransaction, process.env.WALLET_ACCESS_TOKEN)
    // console.log(signTxStatus)

    // create wallet
    // const WalletCreationStatus = await WalletMgrService.createWallet("sample-test-123456789012", "secp256k1")
    // console.log(WalletCreationStatus)

    // Create and execute txn
    // const txStatus = await WalletMgrService.createAndExecuteTx(80001, "0xE396a584D29036c44c138E98072341C4174778BD", JSON.stringify(sampleAbi), true, "mintNFT", process.env.WALLET_ACCESS_TOKEN, 0, [])
    // console.log(txStatus)

    // Get All Wallets
    // const myWallets = await WalletMgrService.getAllWallets()
    // console.log(myWallets)


    // Get specific wallet details
    const myWalletDetails = await WalletMgrService.getWallet(process.env.WALLET_NAME)
    console.log(myWalletDetails)

    // Get balance API for getting a wallet's balance
    const walletBalanceDetails = await WalletMgrService.getBalance(process.env.WALLET_NAME)
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
    const verifySignatureStatus = await WalletMgrService.verifySignatureOffChain("Hello there", "0x00e6ec512a9496c9ecb63cb0875f2357e5e0e4e7f3b5741bac9ac0f8e17a17df538b66bde141e083bf6ef0bc74129b6295e72bce792755a9a5937bd7ef35053701", process.env.WALLET_ACCESS_TOKEN)
    console.log(verifySignatureStatus)

    // Sign Typed Data API
    const signTypedDataStatus = await WalletMgrService.signEip712TypedData(JSON.stringify(typedData), process.env.WALLET_ACCESS_TOKEN)
    console.log(signTypedDataStatus)

    // Deploy contract API
    const deployContractParams = ["Test Collection", "TEST"]
    const deployContractStatus = await WalletMgrService.deployContract(80001, sampleAbiBase64, sampleBytecode, process.env.WALLET_ACCESS_TOKEN, deployContractParams)
    console.log(deployContractStatus)


    // Sign Tx - Tx is in bytes - WIP
    // const sampleProvider = new ethers.providers.JsonRpcProvider(userRpcUrl)
    // const unsignedTransaction = await createUnsignedTransaction("0xE129D672cE1B741C94f5bffcB003cDf7570Bb2B8", "0xE396a584D29036c44c138E98072341C4174778BD", sampleAbi, "mintNFT", [], sampleProvider, "0xE129D672cE1B741C94f5bffcB003cDf7570Bb2B8")
    // console.log(unsignedTransaction)
    // const signTxStatus = await WalletMgrService.signTx(unsignedTransaction, process.env.WALLET_ACCESS_TOKEN)
    // console.log(signTxStatus)

    // Sign and Execute Tx - WIP
    // const signAndExecuteTxApiStatus = await WalletMgrService.signAndExecuteTx(80001, unsignedTransaction, process.env.WALLET_ACCESS_TOKEN)
    // console.log(signAndExecuteTxApiStatus)

}

testWalletManagerMethods()
// createUnsignedTransaction()