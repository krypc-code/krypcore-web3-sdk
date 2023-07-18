// Other Necessary Items
const fs = require('fs');
require('dotenv').config()

// SDK Initialization
const krypcore_web3_sdk = require("@krypc/krypcore-web3-sdk")
const configFilePath = '../../config.json'

const Web3Engine = new krypcore_web3_sdk.Web3Engine(configFilePath)

const StorageMgrService = new Web3Engine.Services.StorageManager(configFilePath)

async function testStorageManagerMethods() {


    const fileStream = fs.readFileSync("./resources/test.jpeg")
    // Testing Upload File API
    const testUploadFileStatus = await StorageMgrService.uploadFile(fileStream)
    console.log(testUploadFileStatus)
    

    // Testing Get File API
    const getFileDetailsStatus = await StorageMgrService.getFileDetails(1, 5)
    console.log(JSON.stringify(getFileDetailsStatus))

}

testStorageManagerMethods()