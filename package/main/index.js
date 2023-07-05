const base_services = require("../base");
const {readConfigFile, findAllBlockchainEndpoints, returnEndpointIndexedList} = require("../helpers")
const {logError, logInfo} = require("../logger")
  
  class MainInitializer {
    constructor(configFilePath) {
      try {
        // Initializing the sdk from the config file.
        var config = readConfigFile(configFilePath);
        var blockchainEndpoints = findAllBlockchainEndpoints(config.endpoints);
        var blockchainEndpointsIndexed = returnEndpointIndexedList(blockchainEndpoints);
        this.userAuthKey = config.subscriptionId + "_" + config.token;
        this.walletMgrInstanceId = config.services.CustodialWallet.InstanceID;
        this.easyNftInstanceId = config.services.EasyNFT.InstanceID;
        this.ftManagerInstanceId = config.services.FT_Manager.InstanceID;
        this.didManagerInstanceId = config.services.DID_Manager.InstanceID;
        this.scStudioInstanceId = config.services.SmartContractStudio.InstanceID;
        this.storageManagerInstanceId = config.services.StorageManager.InstanceID;
        this.blockchainEndpoints = blockchainEndpoints;
        this.blockchainEndpointsIndexed = blockchainEndpointsIndexed;
        this.ipfsClientUrl = config.endpoints.StorageEndpoint.RPC_URL;
        this.ipfsGatewayUrl = config.endpoints.StorageEndpoint.IPFSGateway_URL;
        this.DIDEndpointUrl = config.endpoints.DIEndpoint.RPC_URL;
        this.wrappers = base_services.wrapperPackages;
        this.connectedProvider = "";
        this.connectedSigner = "";
        this._initializationStatus = true;
  
        // Log successful initialization with 'info' level
        logInfo('SDK initialized successfully.');
      } catch (error) {
        // Log the error with 'error' level
        logError('Error while initializing the SDK:', error);
        throw {
          data: null,
          status: 'error',
          message: "Incorrect config file provided. Unable to bootstrap SDK, please retry with a valid config file.",
        };
      }
    }
  }
  
  module.exports = MainInitializer  