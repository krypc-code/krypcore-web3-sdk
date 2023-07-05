const MainInitializer = require("./main")
const coreServices = require("./core")
const {logError, logInfo} = require("./logger")


class Web3Engine extends MainInitializer {

    constructor(configFilePath) {
        const initializer = super(configFilePath)
        if (initializer._initializationStatus) {
            logInfo("Package has been successfully initialized")
            this.Wallet = new coreServices.Wallet(configFilePath)
        }
        else {
            logError("Initialization of package has failed.")
        }
    }

}



module.exports = { Web3Engine }

