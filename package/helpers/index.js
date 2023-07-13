const fs = require('fs');
const { logger, logError, logInfo } = require("../logger")

class CustomError extends Error {
    constructor(message, error) {
      super(message);
      this.name = 'CustomError';
      this.message = message
      this.error = error;
      Error.captureStackTrace(this, CustomError);
    }
}
  
function readConfigFile(configFilePath) {
    try {
        const configFile = fs.readFileSync(configFilePath);
        const config = JSON.parse(configFile);
        return config;
    } catch (error) {
        // Log the error with 'error' level
        logError('Error while reading config file:', error);
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
    } catch (error) {
        // Log the error with 'error' level
        logError('Error while finding blockchain endpoints:', error);
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
    return indexedMapping;
}

function getRpcUrlforChainId(blockchainEndpointsIndexed, chainId) {
    const userRpc = blockchainEndpointsIndexed[String(chainId)];
    if (!userRpc) {
        const errorMessage = {
            data: null,
            status: 'error',
            message: 'Invalid chain ID passed. Please pass correct chain ID or link the endpoint to your project and try again',
            error: 'Invalid address passed for balance query',
        };
        logError(errorMessage.message, new Error(errorMessage.error));
        return errorMessage;
    }
    const userRpcUrl = userRpc.rpcURL;
    return userRpcUrl
}

module.exports = {
    readConfigFile,
    findAllBlockchainEndpoints,
    returnEndpointIndexedList,
    getRpcUrlforChainId,
    CustomError
}