const MainInitializer = require("../../../main")
const { logError, logInfo } = require("../../../logger")
const { CustomError } = require("../../../helpers")

class EasyNFT extends MainInitializer {
    
    constructor(configFilePath) {
        super(configFilePath)
        const easyNftContextPath = '/api/v0/easy-nft'
        this.easyNfturl = this.apiGatewayBaseUrl + easyNftContextPath
    }

    async createNFTCollection(standard, chainId, collectionName, collectionDescription, collectionSymbol, custodialWalletAccessToken, isSoulBound) {
        try {
            const apiMethod = 'createNFTCollection'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.easyNftInstanceId
            };
            const data = {
                "ERCStandard": standard,
                "chainId": chainId,
                "collectionName": collectionName,
                "collectionDescription": collectionDescription,
                "collectionSymbol": collectionSymbol,
                "custodialWalletAccessToken": custodialWalletAccessToken,
                "isSoulBound": isSoulBound,
                "walletType": "custodial"
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            console.log(this.easyNfturl+"/"+apiMethod)
            const response = await fetch(this.easyNfturl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            throw new CustomError(error.message, error.error);
        }
    }

    async mintNFT(){

    }


}

module.exports = EasyNFT