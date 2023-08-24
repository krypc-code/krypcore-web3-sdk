// Other Necessary Items
const fs = require('fs');
const { env } = require('process');
require('dotenv').config()

async function testStorageManagerMethods() {

    // Init SDK
    const krypcoreWeb3SDK = require("@krypc/krypcore-web3-sdk").default
    const Web3Engine = await krypcoreWeb3SDK.initialize({
        authorization: process.env.authorization,
        dappId: process.env.dappId
    }) 

    const StorageMgrService = new Web3Engine.Services.StorageManager()


    const fileStream = fs.readFileSync("./resources/test.jpeg")
    // Testing Upload File API
    const testUploadFileStatus = await StorageMgrService.uploadFile(fileStream)
    console.log(testUploadFileStatus)
    

    // Testing Get File API
    const getFileDetailsStatus = await StorageMgrService.getFileDetails(1, 5)
    console.log(JSON.stringify(getFileDetailsStatus))

}

testStorageManagerMethods()