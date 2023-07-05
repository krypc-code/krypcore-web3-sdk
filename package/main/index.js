const base_services = require("../base")
const fs = require('fs');

function readConfigFile() {
    try {
        const configFile = fs.readFileSync('config.json');
        const config = JSON.parse(configFile);
        return config;
    } catch (error) {
        throw new Error("Config file not present. Download the config file from the project screen and try again. ")
      return {};
    }
}


class MainInitializer {
    constructor() {
        try {
            // Initializing the sdk from the config file. 
            var config = readConfigFile()
            this.userAuthKey = config.subscriptionId + "_" + config.token
            this.walletMgrInstanceId = config.services.CustodialWallet.InstanceID
            this.easyNftInstanceId = config.services.EasyNFT.InstanceID
            this.ftManagerInstanceId = config.services.FT_Manager.InstanceID
            this.didManagerInstanceId = config.services.DID_Manager.InstanceID
            this.scStudioInstanceId = config.services.SmartContractStudio.InstanceID
            this.storageManagerInstanceId = config.services.StorageManager.InstanceID
            this.blockchainEndpointUrl = config.endpoints.BlockchainEndpoint.RPC_URL
            this.ipfsClientUrl  = config.endpoints.StorageEndpoint.RPC_URL
            this.ipfsGatewayUrl = config.endpoints.StorageEndpoint.IPFSGateway_URL
            this.DIDEndpointUrl = config.endpoints.DIEndpoint.RPC_URL
            this.wrappers = base_services.wrapperPackages
            this._initializationStatus = true
        }
        catch( error ){
            this._initializationStatus = false
            console.error({
                "status": "FAILURE",
                "message": "Incorrect config file provided. Unable to bootstrap SDK, please retry with a valid config file.",
                "data": error,
                "code": 401
            })
        }
    }
}

module.exports = MainInitializer