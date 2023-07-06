const MainInitializer = require("../../../main")
const { logError, logInfo } = require("../../../logger")

class StorageManager extends MainInitializer {

    constructor(configFilePath) {
        super(configFilePath)
        const storageMgrContextPath = '/api/v0/storage'
        this.storageMgrUrl = this.apiGatewayBaseUrl + storageMgrContextPath
    }

    async uploadFile() {
        try {

            console.log(StorageMgrUrl)

        }

        catch (error) {

        }
    }
}

module.exports = StorageManager