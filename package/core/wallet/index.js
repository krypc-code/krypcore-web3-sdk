const MainInitializer = require("../../main")
const { logger, logInfo, logError } = require("../../logger")
const { CustomError, getRpcUrlforChainId } = require("../../helpers")

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
                message: 'Invalid Address',
                error: 'Invalid address passed for balance query',
            };
            logError(errorMessage.message, errorMessage.error);
            throw new CustomError(errorMessage.message, errorMessage.error);
        }

        try {
            // First need to get RPC URL for given ChainID to perform action
            const userRpcUrl = getRpcUrlforChainId(this.blockchainEndpointsIndexed, chainId)
            const provider = new ethers.providers.JsonRpcProvider(userRpcUrl);
            const balance = await provider.getBalance(address);
            return balance
        } catch (error) {
            const errorMessage = {
                data: null,
                status: 'error',
                message: 'Failed to fetch balance',
                error: error.message,
            };
            console.error(error)
            logError(errorMessage.message, error);
            throw new CustomError(errorMessage.message, errorMessage.error)
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
        return {provider, signer}
    }


    async signMessage(message) {
        var signature;
        if (!this.connectedProvider && !this.connectedSigner) {
            throw new CustomError("Provider and signer not initialized", "Invalid signer")
        }
        try {
            signature = await this.connectedSigner.signMessage(message)
            return signature
        }
        catch (err) {
            throw new CustomError(err.message, err.error)
        }
    }

    async getConnectedChainId(){
        if (!this.connectedProvider && !this.connectedSigner) {
            throw new CustomError("Provider and signer not initialized", "Invalid signer")
        }
        try {
            const network = await this.connectedProvider.getNetwork()
            return network.chainId
        }
        catch(error){
            throw new CustomError(error.message, error.error)
        }
    }

    async getConnectedChainName(){
        if (!this.connectedProvider && !this.connectedSigner) {
            throw new CustomError("Provider and signer not initialized", "Invalid values passed")
        }
        try {
            const network = await this.connectedProvider.getNetwork()
            return network.name
        }
        catch(error){
            throw new CustomError(error.message, error.error)
        }
    }

    async switchNetwork(chainId){
        if (!this.connectedProvider && !this.connectedSigner) {
            throw new CustomError("Provider and signer not initialized", "Invalid values passed")
        }
        const network = await this.connectedProvider.getNetwork()
        if(network.chainId == chainId){
            throw new CustomError("Already on the desired network", "Already on the desired network")
        }
        else{
            try{
                await this.connectedProvider.provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: `0x${chainId.toString(16)}` }]
                  });
                return true
            }
            catch(switchError){
                if(switchError.code == 4902){
                    throw new CustomError("Network not present in wallet", switchError)
                }
                else{
                    console.log(switchError)
                    throw new CustomError("Error in switching network", switchError)
                }
            }
        }
    }

    async transfer(receiver_address, transfer_amount) {
        if (!this.connectedProvider && !this.connectedSigner) {
            throw new CustomError("Provider and signer not initialized", "Invalid values passed")
        }
        const ethers = this.wrappers.ethers;
        var isValidAddress =  ethers.utils.isAddress(receiver_address)
        if (!isValidAddress) {
            throw new CustomError("invalid address passed", "Invalid address passed for transfer");
        }
        var tx
        try{
            tx = await this.connectedSigner.sendTransaction({
                to: receiver_address,
                value: transfer_amount
             })
            return tx.hash
        }

        catch(err){
            throw new CustomError(err.message, err.error)
        }

    }



}

module.exports = Wallet