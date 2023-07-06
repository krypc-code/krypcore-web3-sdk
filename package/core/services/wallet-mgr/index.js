const MainInitializer = require("../../../main")
const { logError, logInfo } = require("../../../logger")

class WalletManager extends MainInitializer {
    constructor(configFilePath) {
        super(configFilePath)
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
            console.log(error)
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
            console.log(error)
        }

    }

    async getAllWallets(){
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
            console.log(error)
        }
    }

    async getWallet(walletName){
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
            console.log(error)
        }

    }



}

module.exports = WalletManager