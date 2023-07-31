const MainInitializer = require("./main")
const core = require("./core")
const { logError, logInfo } = require("./logger")
const {CustomError, getDappConfig} = require("./helpers")

class Web3Engine extends MainInitializer {

    constructor() {
        super()
        this.Wallet = new core.Wallet()
        this.Utils = new core.Utils()
        this.Services = core.Services
    }

}

async function initialize(configParams) {
    try {
        const dappConfig = await getDappConfig(configParams.authorization, configParams.dappId)
        if(!dappConfig){
            throw new CustomError("Invalid credentials passed, unable to get the config for your Dapp !", "Invalid credentials")
        }
        Web3Engine.initSDKParams(dappConfig) 
        const Web3EngineObj = new Web3Engine() 
        return Web3EngineObj
    }
    catch(error){
        throw new CustomError(error.message, error.error);
    }
}



module.exports = { initialize }
module.exports.default = {initialize}