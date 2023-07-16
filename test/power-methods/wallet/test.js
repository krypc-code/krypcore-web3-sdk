require('dotenv').config()

// SDK Initialization
const krypcore_web3_sdk = require("krypcore-web3-sdk")
const configFilePath = '../../config.json'
const Web3Engine = new krypcore_web3_sdk.Web3Engine(configFilePath)

// Accessing SDK Power Methods
async function testPowerMethods() {
    try {
        // Get balance power method
        const balance = await Web3Engine.Wallet.getBalance("0xE6D5514b8De7ef9E5F5c4cc2E8cA0207129DEB65", 80001)
        console.log(balance)

        const {provider, signer} = await Web3Engine.Wallet.setProviderAndSigner(process.env.PRIVATE_KEY_FOR_TESTING, 80001)

        const accountAddress = await signer.getAddress()
        console.log(accountAddress)

        const signature = await Web3Engine.Wallet.signMessage("hello")
        console.log(signature)

        const chainId = await Web3Engine.Wallet.getConnectedChainId()
        console.log(chainId)

        const chainName = await Web3Engine.Wallet.getConnectedChainName()
        console.log(chainName)

        // const switchNetwork  = await Web3Engine.Wallet.switchNetwork(5)
        // console.log(switchNetwork)

        const txHash = await Web3Engine.Wallet.transfer("0xE6D5514b8De7ef9E5F5c4cc2E8cA0207129DEB65", "10")
        console.log(txHash)


    }
    catch(error){
        console.error(JSON.stringify(error))
    }
}

testPowerMethods()