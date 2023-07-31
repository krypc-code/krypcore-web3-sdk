require('dotenv').config()


async function testDidManagerMethods() {

    const krypcoreWeb3SDK = require("@krypc/krypcore-web3-sdk").default
    const Web3Engine = await krypcoreWeb3SDK.initialize({
        authorization: process.env.authorization,
        dappId: process.env.dappId
    }) 

    const DidManagerService = new Web3Engine.Services.DidManager()

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

    // list issuer profiles
    const issuerProfiles = await DidManagerService.listIssuerProfiles(5, 1)
    console.log(issuerProfiles.Data)

    // list subject profiles
    const subjectProfiles = await DidManagerService.listSubjectProfiles(5, 1)
    console.log(subjectProfiles.Data)

    // create vc
    const vcCreationStatus = await DidManagerService.createVC("did:key:z6MkhnAbbQsrPQGNyHDLNqjt5ywa9cQWwS7bmLzM7seCqtQ4", "did:key:z6MkiAXLfj9beATvYJLy7w2A9z9p63FWAGo7cV79yvQ4aCqd", "LD_PROOF", "StatusList2021Entry")
    console.log(vcCreationStatus)

    // list vc
    const listVcStatus = await DidManagerService.listVC(5, 1)
    console.log(listVcStatus.Data)

    // list vc templates
    const listVcTemplatesStatus = await DidManagerService.listVCTemplates()
    console.log(listVcTemplatesStatus)
}

testDidManagerMethods()