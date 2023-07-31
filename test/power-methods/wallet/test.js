require('dotenv').config()


// Accessing SDK Power Methods
async function testPowerMethods() {
    try {

        // SDK Initialization
        const krypcoreWeb3SDK = require("@krypc/krypcore-web3-sdk").default
        const Web3Engine = await krypcoreWeb3SDK.initialize({
            authorization: process.env.authorization,
            dappId: process.env.dappId
        }) 

        const ethers = Web3Engine.wrappers.ethers

        // Get balance power method
        const balance = await Web3Engine.Wallet.getBalance("0xE6D5514b8De7ef9E5F5c4cc2E8cA0207129DEB65", 80001)
        console.log(balance)

        const {provider, signer} = await Web3Engine.Wallet.setProviderAndSigner(process.env.PRIVATE_KEY_FOR_TESTING, 80001)

        const accountAddress = await signer.getAddress()
        console.log(accountAddress)

        const message = "Hello World"
        const signature = await Web3Engine.Wallet.signMessage(message)
        console.log(signature)

        const verifySignatureStatus = await Web3Engine.Wallet.verifySignatureOffChain(message, signature, accountAddress)
        console.log(verifySignatureStatus)

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
        console.error(error)
    }
}

testPowerMethods()