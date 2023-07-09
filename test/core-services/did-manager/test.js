// Other Necessary Items
require('dotenv').config()

// SDK Initialization
const krypcore_web3_sdk = require("krypcore-web3-sdk")
const configFilePath = '../../config.json'
const Web3Engine = new krypcore_web3_sdk.Web3Engine(configFilePath)

// Accessing the Core Service Methods - Kcw3 APIs
const DidManagerService = new Web3Engine.Services.DidManager(configFilePath)

async function testDidManagerMethods() {

    // Create issuer profile
    const issuerProfileCreationStatus = await DidManagerService.createIssuerProfile("Bharathq", "Hello", "Desig", "key")
    console.log(issuerProfileCreationStatus)

    // Create subject profile
    const subjectProfileCreationStatus = await DidManagerService.createSubjectProfile("nick@krypqc.com", "nick", "desc", "key")
    console.log(subjectProfileCreationStatus)

    // resolve DID to its document
    const resolveDidStatus = await DidManagerService.resolveDid("did:key:z6MkfUupa7JeZcjg44SH86vpHSFVSK3sVNtugwYH77bkJfrs")
    console.log(resolveDidStatus)

    // delete issuer DID
    const deleteIssuerDidStatus = await DidManagerService.deleteIssuerDid("did:key:z6MkfUupa7JeZcjg44SH86vpHSFVSK3sVNtugwYH77bkJfrs")
    console.log(deleteIssuerDidStatus)

    // delete subject DID
    const deleteSubjectDidStatus = await DidManagerService.deleteSubjectDid("did:key:z6MkfUupa7JeZcjg44SH86vpHSFVSK3sVNtugwYH77bkJfrs")
    console.log(deleteSubjectDidStatus)

}

testDidManagerMethods()