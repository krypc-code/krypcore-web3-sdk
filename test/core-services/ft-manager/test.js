require('dotenv').config()

async function testFtManagerMethods() {

    try {

        // SDK Initialization
        const krypcoreWeb3SDK = require("@krypc/krypcore-web3-sdk").default
        const Web3Engine = await krypcoreWeb3SDK.initialize({
            authorization: process.env.authorization,
            dappId: process.env.dappId
        }) 


        const FTManagerService = new Web3Engine.Services.FTManager()

        // Deploy an ERC-20 Token
        // const deployERC20tokenStatus = await FTManagerService.createERC20Token("80001", "Stacks Token", "STX", 18, "0xf782678E53d1bd5B5d23633158e0EC9504FbA8DF", 100000, process.env.WALLET_ACCESS_TOKEN)
        // console.log(deployERC20tokenStatus)

        // Mint ERC 20 Token
        const mintERC20Status = await FTManagerService.mintERC20Token("80001", "0x9B0205B7747451B0b6F4652bF8E2ec0C93e4B503", 1000, "0xf42Da078a8e97D399677fB19FA706deaAdDC922B", process.env.WALLET_ACCESS_TOKEN)
        console.log(mintERC20Status)

        // Get total supply of ERC 20 Token
        const totalSupplyStatus = await FTManagerService.getTotalSupply("80001","0x9B0205B7747451B0b6F4652bF8E2ec0C93e4B503")
        console.log(totalSupplyStatus)

        // Transfer ERC 20 Token
        const transferERC20Status = await FTManagerService.transferERC20("80001", "0x9B0205B7747451B0b6F4652bF8E2ec0C93e4B503", 100, "0xf782678E53d1bd5B5d23633158e0EC9504FbA8DF", process.env.WALLET_ACCESS_TOKEN)
        console.log(transferERC20Status)

        // Approve ERC 20 Token
        const approveFTSStatus = await FTManagerService.approveERC20("80001", "0x9B0205B7747451B0b6F4652bF8E2ec0C93e4B503", 100, "0xf782678E53d1bd5B5d23633158e0EC9504FbA8DF", process.env.WALLET_ACCESS_TOKEN)
        console.log(approveFTSStatus)

    }

    catch(err) {

        console.error(err)

    }

}

testFtManagerMethods()