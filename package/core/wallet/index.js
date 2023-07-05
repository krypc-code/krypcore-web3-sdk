const MainInitializer = require("../../main")
const { logger, logInfo, logError } = require("../../logger")
const {getRpcUrlforChainId} = require("../../helpers")

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
            const userRpcUrl = getRpcUrlforChainId(this.blockchainEndpointsIndexed, chainId)
            const provider = new ethers.providers.JsonRpcProvider(userRpcUrl);
            const balance = await provider.getBalance(address);

            const successMessage = {
                data: balance,
                status: 'success',
                message: 'Balance fetched successfully',
            };
            logInfo(successMessage.message, successMessage); // Log the success message
            return successMessage;
        } catch (error) {
            const errorMessage = {
                data: null,
                status: 'error',
                message: 'Failed to fetch balance',
                error: error.message,
            };
            logError(errorMessage.message, error);
            return errorMessage;
        }
    }

    async setProviderAndSigner(privateKey, chainId) {
        // when wallet is connected ideally it will set the provider and signer in the frontend
        const userRpcUrl = getRpcUrlforChainId(this.blockchainEndpointsIndexed, chainId)
        const ethers = this.wrappers.ethers
        const provider = new ethers.providers.JsonRpcProvider(userRpcUrl)
        const signer = new ethers.Wallet(privateKey, provider);
        this.connectedProvider = provider
        this.connectedSigner = signer
        console.log("Provider and signer set successfully")
    }


    async signMessage(message) {
        if(!this.connectedProvider && !this.connectedSigner){
            console.error("Provider and signer not initialized ")
        }
        var signature;
        try {
            signature = await this.connectedSigner.signMessage(message)
            return signature
        } 
        catch(err) {
            console.error(err)
            return 
        }
    }



}

module.exports = Wallet