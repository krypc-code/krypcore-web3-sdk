const MainInitializer = require("../../../main")
const { logError, logInfo } = require("../../../logger")

class WalletManager extends MainInitializer {
    constructor(configFilePath) {
        super(configFilePath)
        const walletMgrContextPath = '/api/v0/wallet'
        this.walletMgrUrl = this.apiGatewayBaseUrl + walletMgrContextPath
    }

    async createWallet() {
        try {
            console.log(this.walletMgrUrl)

        }
        catch(error){

        }
    }
}

module.exports = WalletManager