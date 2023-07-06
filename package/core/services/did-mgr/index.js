const MainInitializer = require("../../../main")
const { logError, logInfo } = require("../../../logger")

class DidManager extends MainInitializer {

    constructor(configFilePath) {
        super(configFilePath)
        const DidMgrContextPath = '/api/v0/did'
        this.DidMgrUrl = this.apiGatewayBaseUrl + DidMgrContextPath
    }

    async createIssuerProfile() {
        try {
            const apiMethod = 'createIssuerProfile'

        }
        catch(error){

        }
    }

}