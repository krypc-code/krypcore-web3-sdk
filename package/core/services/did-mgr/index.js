const MainInitializer = require("../../../main")
const { logError, logInfo } = require("../../../logger")
const { CustomError } = require("../../../helpers")

class DidManager extends MainInitializer {

    constructor() {
        super()
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
            throw new CustomError(error.message, error.error);
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
            throw new CustomError(error.message, error.error);
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
            throw new CustomError(error.message, error.error);
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
            throw new CustomError(error.message, error.error);
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
            throw new CustomError(error.message, error.error);
        }

    }

    async listIssuerProfiles(limit, page) {

        try {
            const apiMethod = 'listIssuerProfile'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.didManagerInstanceId
            };
            const data = {
                limit: limit,
                page: page
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
            throw new CustomError(error.message, error.error);
        }

    }

    async listSubjectProfiles(limit, page) {

        try {
            const apiMethod = 'listSubjectProfile'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.didManagerInstanceId
            };
            const data = {
                limit: limit,
                page: page
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
            throw new CustomError(error.message, error.error);
        }

    }

    async listVC(limit, page) {

        try {
            const apiMethod = 'listVC'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.didManagerInstanceId
            };
            const data = {
                limit: limit,
                page: page
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
            throw new CustomError(error.message, error.error);
        }

    }

    async verifyVC(credentialId, policy) {

        try {
            const apiMethod = 'verifyVC'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.didManagerInstanceId
            };
            const data = {
                credentialId: credentialId,
                policy: policy
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
            throw new CustomError(error.message, error.error);
        }

    }

    async createVP(credentialId, holderId) {

        try {
            const apiMethod = 'createVP'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.didManagerInstanceId
            };
            const data = {
                credentialId: credentialId,
                holderId: holderId
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
            throw new CustomError(error.message, error.error);
        }
    }

    async revokeVC(issuerDid, proofType, statusType, subjectDid) {

        try {
            const apiMethod = 'revokeVC'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.didManagerInstanceId
            };
            const data = {
                issuerDid: issuerDid,
                proofType: proofType,
                statusType: statusType,
                subjectDid: subjectDid
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
            throw new CustomError(error.message, error.error);
        }
    }

    

    async listVCTemplates() {

        try {
            const apiMethod = 'listVCTemplates'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.didManagerInstanceId
            };
            const data = {
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
            throw new CustomError(error.message, error.error);
        }

    }

    async createVC(issuerDid, subjectDid, proofType, statusType) {

        try {
            const apiMethod = 'createVC'
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userAuthKey,
                'instanceId': this.didManagerInstanceId
            };
            const data = {
                config: {
                    "issuerDid": issuerDid,
                    "proofType": proofType,
                    "statusType": statusType,
                    "subjectDid": subjectDid
                },
                "credentialData": {
                    "credentialSubject": {
                        "additionalProp1": {}
                    }
                },
                "templateId": "VerifiableId"
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
            throw new CustomError(error.message, error.error);
        }

    }

}

module.exports = DidManager