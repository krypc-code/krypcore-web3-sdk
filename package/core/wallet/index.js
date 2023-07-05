const MainInitializer = require("../../main")
const logger = require("../../logger")

class Wallet extends MainInitializer {

    constructor(configFilePath) {
        super(configFilePath)
    }


    async getBalance(address, chainId) {
        const ethers = this.wrappers.ethers;
        const isValidAddress = ethers.utils.isAddress(address);

        if (!isValidAddress) {
            const errorMessage = {
                data: null,
                status: 'error',
                message: 'InvalidAddress',
                error: 'Invalid address passed for balance query',
            };
            logError(errorMessage.message, new Error(errorMessage.error));
            return errorMessage;
        }

        try {
            // First need to get RPC URL for given ChainID to perform action
            const userRpc = this.blockchainEndpointsIndexed[String(chainId)]
            if(!userRpc) {
                const errorMessage = {
                    data: null,
                    status: 'error',
                    message: 'Invalid chain ID passed. Please pass correct chain ID or link the endpoint to your project and try again',
                    error: 'Invalid address passed for balance query',
                };
                logger.error(errorMessage)
                return errorMessage
            }
            const userRpcUrl = userRpc.rpcURL
            const provider = new ethers.providers.JsonRpcProvider(userRpcUrl);
            const balance = await provider.getBalance(address);

            const successMessage = {
                data: balance,
                status: 'success',
                message: 'Balance fetched successfully',
            };
            logger.info(successMessage); // Log the success message
            return successMessage;
        } catch (error) {
            const errorMessage = {
                data: null,
                status: 'error',
                message: 'FetchBalanceFailed',
                error: error.message,
            };
            logger.error(errorMessage)
            return errorMessage;
        }
    }

    async setProviderAndSigner() {
        // Sets the provider and signer using ethers.js temporarily using private key and uses the configured RPC URL


    }




}

module.exports = Wallet