const MainInitializer = require("../../main")
const { logger, logInfo, logError } = require("../../logger")
const { CustomError, getRpcUrlforChainId } = require("../../helpers")

class Utils extends MainInitializer {

    constructor() {
        super()
    }

    async resolveAddresstoENS(address) {
        // Requires an ETH Mainnet Endpoint
        try {
            const ethers = this.wrappers.ethers;
            var isValidAddress = ethers.utils.isAddress(address)
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
            if (!resolvedDomain) {
                return
            }
            return resolvedDomain

        }
        catch (errorMessage) {
            throw new CustomError(errorMessage.message, errorMessage.error)
        }
    }

    async connectWallet() {
        try {

            const Web3Modal = this.wrappers.web3Modal
            const ethers = this.wrappers.ethers
            const web3Modal = new Web3Modal({
            });
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection, "any")
            const signer = provider.getSigner()
            const address = await signer.getAddress()
            this.connectedProvider = provider
            this.connectedSigner = signer
            return [provider, signer, address]

        }
        catch (errorMessage) {
            throw new CustomError(errorMessage.message, errorMessage.error)
        }
    }
}

module.exports = Utils