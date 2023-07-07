const MainInitializer = require("../../../main")
const { logError, logInfo } = require("../../../logger")

class EasyNFT extends MainInitializer {
    
    constructor(configFilePath) {
        super(configFilePath)
        const easyNftContextPath = '/api/v0/easy-nft'
        this.easyNfturl = this.apiGatewayBaseUrl + easyNftContextPath
    }

    async createERC721Collection(){

    }

    async createERC1155Collection(){

    }

    async mintNFT(){

    }


}

module.exports = EasyNFT