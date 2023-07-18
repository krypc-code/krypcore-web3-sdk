const MainInitializer = require("../../../main")
const { logError, logInfo } = require("../../../logger")
const { CustomError } = require("../../../helpers")

class FTManager extends MainInitializer {

    constructor(configFilePath) {
        super(configFilePath)
        const ftManagerContextPath = '/api/v0/ft-manager'
        this.ftManagerUrl = this.apiGatewayBaseUrl + ftManagerContextPath
    }

    async createERC20Token(chainId, tokenName, tokenSymbol, decimals, premintAddress, premintQuantity, custodialWalletAccessToken) {
        try {
            const apiMethod = 'createERC20'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.ftManagerInstanceId
            };
            const data = {
                ERCStandard: "ERC20",
                chainId: chainId,
                tokenName: tokenName,
                tokenSymbol: tokenSymbol,
                decimal: decimals,
                premintAddress: premintAddress,
                quantity: premintQuantity,
                walletType: "custodial",
                custodialWalletAccessToken: custodialWalletAccessToken
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.ftManagerUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            throw new CustomError(error.message, error.error);
        }
    }

    async mintERC20Token(chainId, contractAddress, quantity, recipientAddress,custodialWalletAccessToken) {
        try {
            const apiMethod = 'mintFT'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.ftManagerInstanceId
            };
            const data = {
                erc: "ERC20",
                chainId: chainId,
                contractAddress: contractAddress,
                "name": "KrypC Token",
                "symbol": "KC01",
                recipientAddress: recipientAddress,
                quantity: quantity,
                walletType: "custodial",
                custodialWalletAccessToken: custodialWalletAccessToken
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.ftManagerUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            throw new CustomError(error.message, error.error);
        }
    }

    async getTotalSupply(chainId, contractAddress) {
        try {
            const apiMethod = 'getTotalSupply'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.ftManagerInstanceId
            };
            const data = {
                contractAddress: contractAddress,
                chainId: chainId,
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.ftManagerUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            throw new CustomError(error.message, error.error);
        }
    }


    async transferERC20(chainId, contractAddress, quantity, recipientAddress, custodialWalletAccessToken) {
        try {
            const apiMethod = 'transferFT'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.ftManagerInstanceId
            };
            const data = {
                contractAddress: contractAddress,
                chainId: chainId,
                quantity: quantity,
                recipientAddress: recipientAddress,
                custodialWalletAccessToken: custodialWalletAccessToken,
                walletType: "custodial",
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.ftManagerUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            throw new CustomError(error.message, error.error);
        }
    }

    async approveERC20(chainId, contractAddress, quantity, approveAddress, custodialWalletAccessToken) {
        try {
            const apiMethod = 'approveFT'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.ftManagerInstanceId
            };
            const data = {
                contractAddress: contractAddress,
                chainId: chainId,
                quantity: quantity,
                approveAddress: approveAddress,
                custodialWalletAccessToken: custodialWalletAccessToken,
                walletType: "custodial",
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.ftManagerUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            throw new CustomError(error.message, error.error);
        }
    }

    
}

module.exports = FTManager