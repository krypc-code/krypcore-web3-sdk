const MainInitializer = require("../../main")
const logger = require("../../logger")

function logError(message, error) {
    logger.error({
        message,
        error: error.message,
        stack: error.stack,
    });
}

class Wallet extends MainInitializer {

    constructor(configFilePath) {
        super(configFilePath)
    }


    async getBalance(address) {
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
            const provider = new ethers.providers.JsonRpcProvider(this.blockchainEndpointUrl);
            const balance = await provider.getBalance(address);

            const successMessage = {
                data: balance,
                status: 'success',
                message: 'BalanceFetched',
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
            logError(errorMessage.message, error);
            return errorMessage;
        }
    }




}

module.exports = Wallet