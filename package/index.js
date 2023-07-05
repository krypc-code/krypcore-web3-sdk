const MainInitializer = require("./main")
const coreServices = require("./core")


class Web3Engine extends MainInitializer {

    constructor() {
        const initializer = super()
        if (initializer._initializationStatus) {
            console.log("Package has been successfully initialized")
            this.Wallet = new coreServices.Wallet()
        }
        else {
            console.log("Initialization of package has failed. ")
        }
    }

}



module.exports = { Web3Engine }

