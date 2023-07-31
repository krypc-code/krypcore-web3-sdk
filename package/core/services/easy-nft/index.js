const MainInitializer = require("../../../main")
const { logError, logInfo } = require("../../../logger")
const { CustomError } = require("../../../helpers")

class EasyNFT extends MainInitializer {
    
    constructor() {
        super()
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
            const response = await fetch(this.easyNfturl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            throw new CustomError(error.message, error.error);
        }
    }

    async mintNFT(chainId, contractAddress, standard,  name, description, quantity, attributes, file, recipientAddress, custodialWalletAccessToken){
        const fileBlob = new Blob([file]);
        try {
            const apiMethod = 'createNFT'
            const headers = {
                'Authorization': this.userAuthKey,
                'instanceId': this.easyNftInstanceId
            };
            const formData = new FormData()
            formData.append("file", fileBlob)
            formData.append("name", name)
            formData.append("description", description)
            formData.append("recepientAddress", recipientAddress)
            formData.append("attributes", attributes)
            formData.append("quantity", quantity)
            formData.append("erc", standard)
            formData.append("contractAddress", contractAddress)
            formData.append("chainId", chainId)
            formData.append("walletType", "custodial")
            formData.append("custodialWalletAccessToken", custodialWalletAccessToken)

            const options = {
                method: 'POST',
                body: formData,
                headers: headers
            };
            const response = await fetch(this.easyNfturl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            throw new CustomError(error.message, error.error);
        }

    }
      
}

module.exports = EasyNFT