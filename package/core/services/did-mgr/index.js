const MainInitializer = require("../../../main")
const { logError, logInfo } = require("../../../logger")

class DidManager extends MainInitializer {

    constructor(configFilePath) {
        super(configFilePath)
        const DidMgrContextPath = '/api/v0/did'
        this.DidMgrUrl = this.apiGatewayBaseUrl + DidMgrContextPath
    }

    async createIssuerProfile(issuerName, issuerDescription, issuerDesignation, method) {
        try {
            const apiMethod = 'createIssuerProfile'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.didManagerInstanceId
            };
            const data = {
                issuerName: issuerName,
                issuerDescription: issuerDescription,
                issuerDesignation: issuerDesignation,
                method: method

            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.DidMgrUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            console.log(error)
        }
    }

    async createSubjectProfile(subjectId, subjectName, subjectDescription, method) {
        try {
            const apiMethod = 'createSubjectProfile'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.didManagerInstanceId
            };
            const data = {
                subjectName: subjectName,
                subjectId: subjectId,
                subjectDescription: subjectDescription,
                method: method

            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.DidMgrUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            console.log(error)
        }
    }

    async resolveDid(did) {
        try {
            const apiMethod = 'resolveDid'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.didManagerInstanceId
            };
            const data = {
                did: did
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.DidMgrUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            console.log(error)
        }

    }

    async deleteIssuerDid(did) {
        try {
            const apiMethod = 'deleteIssuerDid'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.didManagerInstanceId
            };
            const data = {
                did: did
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.DidMgrUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            console.log(error)
        }

    }

    async deleteSubjectDid(did) {

        try {
            const apiMethod = 'deleteSubjectDid'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.didManagerInstanceId
            };
            const data = {
                did: did
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const response = await fetch(this.DidMgrUrl + "/" + apiMethod, options)
            const responseData = await response.json()
            return responseData
        }
        catch (error) {
            console.log(error)
        }

    }

}

module.exports = DidManager