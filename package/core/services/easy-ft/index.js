const MainInitializer = require("../../../main")
const { logError, logInfo } = require("../../../logger")
const { CustomError } = require("../../../helpers")

class FTManager extends MainInitializer {

    constructor(configFilePath) {
        super(configFilePath)
        const ftManagerContextPath = '/api/v0/ft-manager'
        this.ftManagerUrl = this.apiGatewayBaseUrl + ftManagerContextPath
    }

    
}

module.exports = EasyFT