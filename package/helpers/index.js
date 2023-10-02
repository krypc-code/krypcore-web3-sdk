const { logger, logError, logInfo } = require("../logger")

class CustomError extends Error {
    constructor(message, error) {
      super(message);
      this.name = 'CustomError';
      this.ErrorMessage = message
      this.error = error;
    }
}

async function getDappConfig(userAuthKey, dappId){
    const apiGatewayBaseUrl  = 'https://api.krypcore.com'
    try {
        const apiMethod = 'findMyProject'
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': userAuthKey
        };
        const data = {
            "projectId": dappId
        }
        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        };
        const response = await fetch(apiGatewayBaseUrl + "/api/v0/" + apiMethod, options)
        const responseData = await response.json()
        const dappConfigData = responseData.Data
        return dappConfigData
    }
    catch (error) {
        throw new CustomError(error.message, error.error);
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
                    chainId: endpoint.ChainId
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
            status: 'error',
            message: 'Requested endpoint not found in Dapp',
            error: 'Requested endpoint not found in Dapp',
        };
        logError(errorMessage.message, new Error(errorMessage.error));
        throw new CustomError(errorMessage, errorMessage)
    }
    const userRpcUrl = userRpc.rpcURL;
    return userRpcUrl
}

module.exports = {
    findAllBlockchainEndpoints,
    returnEndpointIndexedList,
    getRpcUrlforChainId,
    CustomError,
    getDappConfig
}