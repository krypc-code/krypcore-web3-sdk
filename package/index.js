const MainInitializer = require("./main")
const core = require("./core")
const { logError, logInfo } = require("./logger")


class Web3Engine extends MainInitializer {

    constructor(configFilePath) {
        const initializer = super(configFilePath)
        if (initializer._initializationStatus) {
            logInfo("Package has been successfully initialized")
            this.Wallet = new core.Wallet(configFilePath)
            this.Services = core.Services
        }
        else {
            logError("Initialization of package has failed.")
        }
    }

}



module.exports = { Web3Engine }

