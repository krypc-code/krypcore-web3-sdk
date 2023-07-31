require('dotenv').config()

async function tryUtilsPowerMethods() {
    try {

        // SDK Initialization
        const krypcoreWeb3SDK = require("@krypc/krypcore-web3-sdk").default
        const Web3Engine = await krypcoreWeb3SDK.initialize({
            authorization: process.env.authorization,
            dappId: process.env.dappId
        }) 

        const ensResolution = await Web3Engine.Utils.resolveAddresstoENS("0xE6D5514b8De7ef9E5F5c4cc2E8cA0207129DEB65")

        console.log(ensResolution)

    }
    catch(error){
        console.error(error)
    }
}

tryUtilsPowerMethods()