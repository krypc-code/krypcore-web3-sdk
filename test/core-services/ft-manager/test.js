require('dotenv').config()
const krypcore_web3_sdk = require("@krypc/krypcore-web3-sdk")
const configFilePath = '../../config.json'
const Web3Engine = new krypcore_web3_sdk.Web3Engine(configFilePath)
const ethers = Web3Engine.wrappers.ethers
const userRpcUrl = Web3Engine.blockchainEndpointsIndexed['80001'].rpcURL
// console.log(userRpcUrl)

const FTManagerService = new Web3Engine.Services.FTManager(configFilePath)

async function testFtManagerMethods() {

    try {

        // Deploy an ERC-20 Token
        const deployERC20tokenStatus = await FTManagerService.createERC20Token("80001", "Stacks Token", "STX", 18, "0xf782678E53d1bd5B5d23633158e0EC9504FbA8DF", 100000, process.env.WALLET_ACCESS_TOKEN)
        console.log(deployERC20tokenStatus)

        const mintERC20Status = await FTManagerService.mintERC20Token("80001", "0x6B233a8d2Fb394357c3E01d147cF52dabC7Ed75F", 10000, "0xf42Da078a8e97D399677fB19FA706deaAdDC922B", process.env.WALLET_ACCESS_TOKEN)
        console.log(mintERC20Status)

        const totalSupplyStatus = await FTManagerService.getTotalSupply("80001","0x6B233a8d2Fb394357c3E01d147cF52dabC7Ed75F")
        console.log(totalSupplyStatus)

        const transferERC20Status = await FTManagerService.transferERC20("80001", "0x6B233a8d2Fb394357c3E01d147cF52dabC7Ed75F", 100, "0xf782678E53d1bd5B5d23633158e0EC9504FbA8DF", process.env.WALLET_ACCESS_TOKEN)
        console.log(transferERC20Status)

        const approveFTSStatus = await FTManagerService.approveERC20("80001", "0x6B233a8d2Fb394357c3E01d147cF52dabC7Ed75F", 100, "0xf782678E53d1bd5B5d23633158e0EC9504FbA8DF", process.env.WALLET_ACCESS_TOKEN)
        console.log(approveFTSStatus)

    }

    catch(err) {

        console.error(err)

    }

}

testFtManagerMethods()