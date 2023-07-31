const MainInitializer = require("../../main")
const { logger, logInfo, logError } = require("../../logger")
const { CustomError, getRpcUrlforChainId } = require("../../helpers")

class Utils extends MainInitializer {

    constructor() {
        super()
    }

    async resolveAddresstoENS(address) {
        // Requires an ETH Mainnet Endpoint
        try{
            const ethers = this.wrappers.ethers;
            var isValidAddress =  ethers.utils.isAddress(address)
            if (!isValidAddress) {
                throw new CustomError("Invalid address input", "Invalid address")
            }
            // const userRpcUrl = getRpcUrlforChainId(this.blockchainEndpointsIndexed, 1)
            const userRpcUrl = "https://eth.llamarpc.com"
            if (!userRpcUrl) {
                throw new CustomError("ETH Mainnet Endpoint Required", "Invalid endpoint")
            }
            const ensReverseLookupProvider = ethers.providers.JsonRpcProvider(userRpcUrl);
            const resolvedDomain = await ensReverseLookupProvider.lookupAddress(address);
            if(!resolvedDomain){
                return
            }
            return resolvedDomain

        }
        catch(errorMessage){
            throw new CustomError(errorMessage.message, errorMessage.error)
        }
    }
}

module.exports = Utils