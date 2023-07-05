const MainInitializer = require("./main")
const coreServices = require("./core")


class Web3Engine extends MainInitializer {

    constructor(configFilePath) {
        const initializer = super(configFilePath)
        if (initializer._initializationStatus) {
            console.log("Package has been successfully initialized")
            this.Wallet = new coreServices.Wallet(configFilePath)
        }
        else {
            console.log("Initialization of package has failed.")
        }
    }

}



module.exports = { Web3Engine }

