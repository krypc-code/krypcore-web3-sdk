const MainInitializer = require("../../../main")
const { logError, logInfo } = require("../../../logger")
const fs = require('fs');

class StorageManager extends MainInitializer {

    constructor(configFilePath) {
        super(configFilePath)
        const storageMgrContextPath = '/api/v0/storagemanageripfs'
        this.storageMgrUrl = this.apiGatewayBaseUrl + storageMgrContextPath
    } 

    async uploadFile(file) {
        const fileBlob = new Blob([file]);
        try {
            console.log("In upload file API")
            const apiMethod = 'storefile'
            const headers = {
                'Authorization': this.userAuthKey,
                'Instanceid': this.storageManagerInstanceId
            };
            const formData = new FormData()
            formData.append("files", fileBlob)

            const options = {
                method: 'POST',
                headers: headers,
                body: formData,
            };
            const response = await fetch(this.storageMgrUrl + "/" + apiMethod, options)
            console.log(this.storageMgrUrl + "/" + apiMethod)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            console.log(error)
        }
    }

    async getFileDetails(page, pageSize) {
        try {
            const apiMethod = 'getFileDetails'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'Instanceid': this.storageManagerInstanceId
            };
            const data = {
                "id": this.storageManagerInstanceId,
                "page": page,
                "pageSize": pageSize
            }

            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data),
            };
            const response = await fetch(this.storageMgrUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            console.log(error)
        }
    }
}

module.exports = StorageManager

