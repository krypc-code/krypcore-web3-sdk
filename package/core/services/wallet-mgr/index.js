const MainInitializer = require("../../../main")
const { logError, logInfo } = require("../../../logger")
const { CustomError } = require("../../../helpers")

class WalletManager extends MainInitializer {
    constructor() {
        super()
        const walletMgrContextPath = '/api/v0/wallet'
        this.walletMgrUrl = this.apiGatewayBaseUrl + walletMgrContextPath
    }

    async createWallet(walletName, algorithm) {
        try {
            const apiMethod = 'createWallet'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.walletMgrInstanceId
            };
            const data = {
                algorithm: algorithm,
                name: walletName,
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.walletMgrUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            throw new CustomError(error.message, error.error);
        }
    }

    async createAndExecuteTx(chainId, contractAddress, contractAbi, isContractTx, method, walletAccessToken, value, params) {
        try {
            const apiMethod = 'createAndExecuteTx'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.walletMgrInstanceId
            };
            const data = {
                mode: "api",
                chainId: chainId,
                to: contractAddress,
                contractABI: contractAbi,
                isContractTxn: isContractTx,
                method: method,
                serviceAPIKey: walletAccessToken,
                params: params,
                value: value
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.walletMgrUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            throw new CustomError(error.message, error.error);
        }

    }

    async getAllWallets() {
        try {
            const apiMethod = 'getAllWallets'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.walletMgrInstanceId
            };
            const data = {
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.walletMgrUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            throw new CustomError(error.message, error.error);
        }
    }

    async getWallet(walletName) {
        try {
            const apiMethod = 'getWallet'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.walletMgrInstanceId
            };
            const data = {
                mode: "creds",
                name: walletName
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.walletMgrUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            throw new CustomError(error.message, error.error);
        }

    }

    async getBalance(walletName) {
        try {
            const apiMethod = 'getBalance'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.walletMgrInstanceId
            };
            const data = {
                mode: "creds",
                name: walletName
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.walletMgrUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            throw new CustomError(error.message, error.error);
        }
    }

    async callContract(chainId, contractAddress, contractAbi, method, params, walletAccessToken) {
        try {
            const apiMethod = 'callContract'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.walletMgrInstanceId
            };
            const data = {
                mode: "api",
                chainId: chainId,
                serviceAPIKey: walletAccessToken,
                to: contractAddress,
                contractABI: contractAbi,
                method: method,
                params: params
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.walletMgrUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            throw new CustomError(error.message, error.error);
        }
    }

    async getTxHistory(chainId, walletAccessToken){
        try {
            const apiMethod = 'listWalletTxnsByChainId'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.walletMgrInstanceId
            };
            const data = {
                mode: "api",
                chainId: String(chainId),
                serviceAPIKey: walletAccessToken,
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.walletMgrUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            throw new CustomError(error.message, error.error);
        }
    }

    async signMessage(message, walletAccessToken){
        try {
            const apiMethod = 'signMessage'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.walletMgrInstanceId
            };
            const data = {
                mode: "api",
                message: message,
                serviceAPIKey: walletAccessToken,
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.walletMgrUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            throw new CustomError(error.message, error.error);
        }
    }

    async signTxHash(txHash, walletAccessToken){
        try {
            const apiMethod = 'signTxHash'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.walletMgrInstanceId
            };
            const data = {
                mode: "api",
                txnHash: txHash,
                serviceAPIKey: walletAccessToken,
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.walletMgrUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            throw new CustomError(error.message, error.error);
        }
    }

    async signTx(txBytes, walletAccessToken){

        try {
            const apiMethod = 'signTx'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.walletMgrInstanceId
            };
            const data = {
                mode: "api",
                txnBytes: txBytes,
                serviceAPIKey: walletAccessToken,
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.walletMgrUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            throw new CustomError(error.message, error.error);
        }
    }

    async verifySignatureOffChain(message, signature, walletAccessToken) {
        try {
            const apiMethod = 'verifySignatureOffChain'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.walletMgrInstanceId
            };
            const data = {
                mode: "api",
                message: message,
                signature: signature,
                serviceAPIKey: walletAccessToken,
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.walletMgrUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            throw new CustomError(error.message, error.error);
        }
    }

    async deployContract(chainId, abi, bytecode, walletAccessToken, params){

        try {
            const apiMethod = 'deployContract'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.walletMgrInstanceId
            };
            const data = {
                mode: "api",
                chainId: chainId,
                abi: abi,
                byteCode: bytecode,
                serviceAPIKey: walletAccessToken,
                params: params
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.walletMgrUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            throw new CustomError(error.message, error.error);
        }

    }

    async signEip712TypedData(typedData, walletAccessToken){
        try {
            const apiMethod = 'signEIP712Tx'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.walletMgrInstanceId
            };
            const data = {
                mode: "api",
                data: typedData,
                serviceAPIKey: walletAccessToken,
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.walletMgrUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            throw new CustomError(error.message, error.error);
        }

    }

    async signAndExecuteTx(chainId, txBytes, walletAccessToken){
        try {
            const apiMethod = 'signAndExecuteTx'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.walletMgrInstanceId
            };
            const data = {
                mode: "api",
                chainId: chainId,
                txnBytes: txBytes,
                serviceAPIKey: walletAccessToken,
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.walletMgrUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            throw new CustomError(error.message, error.error);
        }
    }

}

module.exports = WalletManager