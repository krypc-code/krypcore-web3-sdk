const base_services = require("../base");
const fs = require('fs');
const logger = require("../logger")

function readConfigFile(configFilePath) {
    try {
        const configFile = fs.readFileSync(configFilePath);
        const config = JSON.parse(configFile);
        return config;
    } catch (error) {
        // Log the error with 'error' level
        logger.error('Error while reading config file:', error);
        throw new Error("Config file not present. Download the config file from the project screen and try again.");
    }
}

function findAllBlockchainEndpoints(endpoints) {
    try {
        const blockchainEndpoints = [];

        for (const endpointName in endpoints) {
            const endpoint = endpoints[endpointName];

            // Check if the parent object name is "BlockchainEndpoint" to identify blockchain endpoints
            if (endpointName === "BlockchainEndpoint") {
                blockchainEndpoints.push({
                    protocol: endpoint.Protocol,
                    network: endpoint.Network,
                    rpcURL: endpoint.RPC_URL,
                    chainId: endpoint.chainId
                });
            }
        }

        return blockchainEndpoints;

    }
    catch (error) {
        console.error(error)
    }
}

function returnEndpointIndexedList(endpoints) {
    const indexedMapping = {};
    for (const endpoint of endpoints) {
    indexedMapping[endpoint.chainId] = {
        protocol: endpoint.protocol,
        network: endpoint.network,
        rpcURL: endpoint.rpcURL,
    };
    }
    return indexedMapping
}

class MainInitializer {
    constructor(configFilePath) {
        try {
            // Initializing the sdk from the config file.
            var config = readConfigFile(configFilePath);
            var blockchainEndpoints = findAllBlockchainEndpoints(config.endpoints)
            var blockchainEndpointsIndexed = returnEndpointIndexedList(blockchainEndpoints)
            this.userAuthKey = config.subscriptionId + "_" + config.token;
            this.walletMgrInstanceId = config.services.CustodialWallet.InstanceID;
            this.easyNftInstanceId = config.services.EasyNFT.InstanceID;
            this.ftManagerInstanceId = config.services.FT_Manager.InstanceID;
            this.didManagerInstanceId = config.services.DID_Manager.InstanceID;
            this.scStudioInstanceId = config.services.SmartContractStudio.InstanceID;
            this.storageManagerInstanceId = config.services.StorageManager.InstanceID;
            this.blockchainEndpoints = blockchainEndpoints
            this.blockchainEndpointsIndexed = blockchainEndpointsIndexed
            this.ipfsClientUrl = config.endpoints.StorageEndpoint.RPC_URL;
            this.ipfsGatewayUrl = config.endpoints.StorageEndpoint.IPFSGateway_URL;
            this.DIDEndpointUrl = config.endpoints.DIEndpoint.RPC_URL;
            this.wrappers = base_services.wrapperPackages;
            this.connectedProvider = ""
            this.connectedSigner = ""
            this._initializationStatus = true;

            // Log successful initialization with 'info' level
            logger.info('SDK initialized successfully.');
        } catch (error) {
            // Log the error with 'error' level
            logger.error('Error while initializing the SDK:', error);
            throw {
                data: null,
                status: 'error',
                message: "Incorrect config file provided. Unable to bootstrap SDK, please retry with a valid config file.",
            };
        }
    }
}

module.exports = MainInitializer;