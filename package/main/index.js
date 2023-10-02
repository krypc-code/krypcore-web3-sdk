const base_services = require("../base");
const { findAllBlockchainEndpoints, returnEndpointIndexedList, getDappConfig } = require("../helpers")
const { logError, logInfo } = require("../logger")

class MainInitializer {

  static initSDKParams(configData) {
    try {
      // Initializing the sdk from the config file.
      // var config = readConfigFile(configFilePath);
      MainInitializer.configData = configData
      MainInitializer.apiGatewayBaseUrl = 'https://api.krypcore.com'
      const blockchainEndpoints = findAllBlockchainEndpoints(configData.endpoints);
      const blockchainEndpointsIndexed = returnEndpointIndexedList(blockchainEndpoints);
      MainInitializer.userAuthKey = configData.token;
      MainInitializer.walletMgrInstanceId = configData.services.CustodialWallet.InstanceID;
      MainInitializer.easyNftInstanceId = configData.services.EasyNFT.InstanceID;
      MainInitializer.ftManagerInstanceId = configData.services.FT_Manager.InstanceID;
      MainInitializer.didManagerInstanceId = configData.services.DID_Manager.InstanceID;
      MainInitializer.scStudioInstanceId = configData.services.SmartContractStudio.InstanceID;
      MainInitializer.storageManagerInstanceId = configData.services.StorageManager.InstanceID;
      MainInitializer.blockchainEndpoints = blockchainEndpoints;
      MainInitializer.blockchainEndpointsIndexed = blockchainEndpointsIndexed;
      MainInitializer.ipfsClientUrl = configData.endpoints.StorageEndpoint.RPC_URL;
      MainInitializer.ipfsGatewayUrl = configData.endpoints.StorageEndpoint.IPFSGateway_URL;
      MainInitializer.DIDEndpointUrl = configData.endpoints.DIEndpoint.RPC_URL;
      MainInitializer.wrappers = base_services.wrapperPackages;
      MainInitializer.connectedProvider = "";
      MainInitializer.connectedSigner = "";
      MainInitializer._initializationStatus = true;

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

  constructor () {

    const configData =  MainInitializer.configData
    this.configData = configData
    this.apiGatewayBaseUrl = 'https://api.krypcore.com'
    const blockchainEndpoints = findAllBlockchainEndpoints(configData.endpoints);
    const blockchainEndpointsIndexed = returnEndpointIndexedList(blockchainEndpoints);
    this.userAuthKey = configData.token;
    this.walletMgrInstanceId = configData.services.CustodialWallet.InstanceID;
    this.easyNftInstanceId = configData.services.EasyNFT.InstanceID;
    this.ftManagerInstanceId = configData.services.FT_Manager.InstanceID;
    this.didManagerInstanceId = configData.services.DID_Manager.InstanceID;
    this.scStudioInstanceId = configData.services.SmartContractStudio.InstanceID;
    this.storageManagerInstanceId = configData.services.StorageManager.InstanceID;
    this.blockchainEndpoints = blockchainEndpoints;
    this.blockchainEndpointsIndexed = blockchainEndpointsIndexed;
    this.ipfsClientUrl = configData.endpoints.StorageEndpoint.RPC_URL;
    this.ipfsGatewayUrl = configData.endpoints.StorageEndpoint.IPFSGateway_URL;
    this.DIDEndpointUrl = configData.endpoints.DIEndpoint.RPC_URL;
    this.wrappers = base_services.wrapperPackages;
    this.connectedProvider = "";
    this.connectedSigner = "";
    this._initializationStatus = true;
    
  }
}

module.exports = MainInitializer  