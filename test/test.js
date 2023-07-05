require('dotenv').config()

// SDK Initialization
const krypcore_web3_sdk = require("krypcore-web3-sdk")
const configFilePath = 'config.json'
const Web3Engine = new krypcore_web3_sdk.Web3Engine(configFilePath)


// Accessing SDK wrapper packages directly
const ethers = Web3Engine.wrappers.ethers


// Accessing the Core Service Methods - Kcw3 APIs
const WalletMgrService = new Web3Engine.Services.WalletManager(configFilePath)
const StorageMgrService = new Web3Engine.Services.StorageManager(configFilePath)

// Accessing SDK Power Methods
async function test() {

    // SDK Power Methods
    // const balance = await Web3Engine.Wallet.getBalance("0xE6D5514b8De7ef9E5F5c4cc2E8cA0207129DEB65", 80001)
    // console.log(balance)
    // Web3Engine.Wallet.setProviderAndSigner(process.env.PRIVATE_KEY_FOR_TESTING, 80001)
    // const signature = await Web3Engine.Wallet.signMessage("hello")
    // console.log(signature)

    // Wrapper Package
    const userRpcUrl = Web3Engine.blockchainEndpointsIndexed['80001'].rpcURL
    const testProvider = new ethers.providers.JsonRpcProvider(userRpcUrl)
    const balanceFetchedfromProvider = await testProvider.getBalance("0xE6D5514b8De7ef9E5F5c4cc2E8cA0207129DEB65")
    console.log(balanceFetchedfromProvider)

    // Wallet Methods
    const WalletCreationStatus = await WalletMgrService.createWallet("sample-test-1234", "secp256k1")
    console.log(WalletCreationStatus)
}

test()