// Other Necessary Items
require('dotenv').config()
const sampleAbi = require("./resources/abi")
const sampleAbiBase64 = Buffer.from(JSON.stringify(sampleAbi)).toString('base64');
const sampleBytecode = require("./resources/bytecode")
const typedData = require("./resources/typedData")

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

    try {

        // SDK Initialization
        const krypcoreWeb3SDK = require("@krypc/krypcore-web3-sdk").default
        const Web3Engine = await krypcoreWeb3SDK.initialize({
            authorization: process.env.authorization,
            dappId: process.env.dappId
        }) 

        // Accessing wrapper packages
        const ethers = Web3Engine.wrappers.ethers

        // Accessing wallet mgr service
        const WalletMgrService = new Web3Engine.Services.WalletManager()

        // Sign Tx - Tx is in bytes - WIP
        // const unsignedTransaction = await createUnsignedTransaction("0xE129D672cE1B741C94f5bffcB003cDf7570Bb2B8", "0xE396a584D29036c44c138E98072341C4174778BD", sampleAbi, "mintNFT", [], sampleProvider, "0xE129D672cE1B741C94f5bffcB003cDf7570Bb2B8")
        // const signTxStatus = await WalletMgrService.signTx(unsignedTransaction, process.env.WALLET_ACCESS_TOKEN)
        // console.log(signTxStatus)

        // create wallet
        const WalletCreationStatus = await WalletMgrService.createWallet("sample-test-123456789012", "secp256k1")
        console.log("Create Wallet Response:")
        console.log(WalletCreationStatus)
        console.log()

        

        // Create and execute txn
        const txStatus = await WalletMgrService.createAndExecuteTx(80001, "0xE396a584D29036c44c138E98072341C4174778BD", JSON.stringify(sampleAbi), true, "mintNFT", process.env.WALLET_ACCESS_TOKEN, 0, [])
        console.log("Create and Execute Tx Response")
        console.log(txStatus)
        console.log()

        // Get All Wallets
        const myWallets = await WalletMgrService.getAllWallets()
        console.log("Get all wallets response")
        console.log(myWallets)
        console.log()


        // Get specific wallet details
        const myWalletDetails = await WalletMgrService.getWallet(process.env.WALLET_NAME)
        console.log("Get specific wallet response")
        console.log(myWalletDetails)
        console.log()


        // Get balance API for getting a wallet's balance
        const walletBalanceDetails = await WalletMgrService.getBalance(process.env.WALLET_NAME)
        console.log("Get balance api response")
        console.log(walletBalanceDetails)
        console.log()

        // Call contract view method
        const callContractStatus = await WalletMgrService.callContract(80001, "0xE396a584D29036c44c138E98072341C4174778BD", JSON.stringify(sampleAbi), "owner", [], process.env.WALLET_ACCESS_TOKEN)
        console.log("Call contract view method response")
        console.log(callContractStatus)
        console.log()

        // Get Tx History
        const txHistoryStatus = await WalletMgrService.getTxHistory(80001, process.env.WALLET_ACCESS_TOKEN)
        console.log("Get tx history response")
        console.log(txHistoryStatus)
        console.log()

        // Sign Message
        const signMessageStatus = await WalletMgrService.signMessage("Hello there", process.env.WALLET_ACCESS_TOKEN)
        console.log("Sign message response")
        console.log(signMessageStatus)
        console.log()

        // Sign Tx Hash 
        const signTxHashStatus = await WalletMgrService.signTxHash("0x157755d6d077c508b02526308399d14b8c4e731849bcf81c51936405139d701f", process.env.WALLET_ACCESS_TOKEN)
        console.log("Sign tx hash response")
        console.log(signTxHashStatus)
        console.log()

        // Verify signature
        const verifySignatureStatus = await WalletMgrService.verifySignatureOffChain("Hello there", "0x00e6ec512a9496c9ecb63cb0875f2357e5e0e4e7f3b5741bac9ac0f8e17a17df538b66bde141e083bf6ef0bc74129b6295e72bce792755a9a5937bd7ef35053701", process.env.WALLET_ACCESS_TOKEN)
        console.log("Verify signature response")
        console.log(verifySignatureStatus)
        console.log()

        // Sign Typed Data API
        const signTypedDataStatus = await WalletMgrService.signEip712TypedData(JSON.stringify(typedData), process.env.WALLET_ACCESS_TOKEN)
        console.log("Sign typed data response")
        console.log(signTypedDataStatus)
        console.log()

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

    catch (err) {
        console.error(err)
    }

}

testWalletManagerMethods()
// createUnsignedTransaction()