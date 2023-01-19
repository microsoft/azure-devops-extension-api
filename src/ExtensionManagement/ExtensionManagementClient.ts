/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as ExtensionManagement from "../ExtensionManagement/ExtensionManagement";
import * as Gallery from "../Gallery/Gallery";

export class ExtensionManagementRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "6c2b0933-3600-42ae-bf8b-93d4f7e83594";

    /**
     * @param itemId - 
     * @param testCommerce - 
     * @param isFreeOrTrialInstall - 
     * @param isAccountOwner - 
     * @param isLinked - 
     * @param isConnectedServer - 
     * @param isBuyOperationValid - 
     */
    public async getAcquisitionOptions(
        itemId: string,
        testCommerce?: boolean,
        isFreeOrTrialInstall?: boolean,
        isAccountOwner?: boolean,
        isLinked?: boolean,
        isConnectedServer?: boolean,
        isBuyOperationValid?: boolean
        ): Promise<ExtensionManagement.AcquisitionOptions> {

        const queryValues: any = {
            itemId: itemId,
            testCommerce: testCommerce,
            isFreeOrTrialInstall: isFreeOrTrialInstall,
            isAccountOwner: isAccountOwner,
            isLinked: isLinked,
            isConnectedServer: isConnectedServer,
            isBuyOperationValid: isBuyOperationValid
        };

        return this.beginRequest<ExtensionManagement.AcquisitionOptions>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/ExtensionManagement/AcquisitionOptions",
            queryParams: queryValues
        });
    }

    /**
     * @param acquisitionRequest - 
     */
    public async requestAcquisition(
        acquisitionRequest: ExtensionManagement.ExtensionAcquisitionRequest
        ): Promise<ExtensionManagement.ExtensionAcquisitionRequest> {

        return this.beginRequest<ExtensionManagement.ExtensionAcquisitionRequest>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/ExtensionManagement/AcquisitionRequests",
            body: acquisitionRequest
        });
    }

    /**
     * @param publisherName - 
     * @param extensionName - 
     */
    public async getAuditLog(
        publisherName: string,
        extensionName: string
        ): Promise<ExtensionManagement.ExtensionAuditLog> {

        return this.beginRequest<ExtensionManagement.ExtensionAuditLog>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/ExtensionManagement/AuditLog/{publisherName}/{extensionName}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName
            }
        });
    }

    /**
     * @param publisherName - 
     * @param extensionName - 
     * @param registrationId - 
     */
    public async registerAuthorization(
        publisherName: string,
        extensionName: string,
        registrationId: string
        ): Promise<ExtensionManagement.ExtensionAuthorization> {

        return this.beginRequest<ExtensionManagement.ExtensionAuthorization>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/ExtensionManagement/InstalledExtensions/{publisherName}/{extensionName}/Authorizations/{registrationId}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                registrationId: registrationId
            }
        });
    }

    /**
     * @param doc - 
     * @param publisherName - 
     * @param extensionName - 
     * @param scopeType - 
     * @param scopeValue - 
     * @param collectionName - 
     */
    public async createDocumentByName(
        doc: any,
        publisherName: string,
        extensionName: string,
        scopeType: string,
        scopeValue: string,
        collectionName: string
        ): Promise<any> {

        return this.beginRequest<any>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/ExtensionManagement/InstalledExtensions/{publisherName}/{extensionName}/Data/Scopes/{scopeType}/{scopeValue}/Collections/{collectionName}/Documents/{documentId}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                scopeType: scopeType,
                scopeValue: scopeValue,
                collectionName: collectionName
            },
            body: doc
        });
    }

    /**
     * @param publisherName - 
     * @param extensionName - 
     * @param scopeType - 
     * @param scopeValue - 
     * @param collectionName - 
     * @param documentId - 
     */
    public async deleteDocumentByName(
        publisherName: string,
        extensionName: string,
        scopeType: string,
        scopeValue: string,
        collectionName: string,
        documentId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/ExtensionManagement/InstalledExtensions/{publisherName}/{extensionName}/Data/Scopes/{scopeType}/{scopeValue}/Collections/{collectionName}/Documents/{documentId}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                scopeType: scopeType,
                scopeValue: scopeValue,
                collectionName: collectionName,
                documentId: documentId
            }
        });
    }

    /**
     * @param publisherName - 
     * @param extensionName - 
     * @param scopeType - 
     * @param scopeValue - 
     * @param collectionName - 
     * @param documentId - 
     */
    public async getDocumentByName(
        publisherName: string,
        extensionName: string,
        scopeType: string,
        scopeValue: string,
        collectionName: string,
        documentId: string
        ): Promise<any> {

        return this.beginRequest<any>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/ExtensionManagement/InstalledExtensions/{publisherName}/{extensionName}/Data/Scopes/{scopeType}/{scopeValue}/Collections/{collectionName}/Documents/{documentId}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                scopeType: scopeType,
                scopeValue: scopeValue,
                collectionName: collectionName,
                documentId: documentId
            }
        });
    }

    /**
     * @param publisherName - 
     * @param extensionName - 
     * @param scopeType - 
     * @param scopeValue - 
     * @param collectionName - 
     */
    public async getDocumentsByName(
        publisherName: string,
        extensionName: string,
        scopeType: string,
        scopeValue: string,
        collectionName: string
        ): Promise<any[]> {

        return this.beginRequest<any[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/ExtensionManagement/InstalledExtensions/{publisherName}/{extensionName}/Data/Scopes/{scopeType}/{scopeValue}/Collections/{collectionName}/Documents/{documentId}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                scopeType: scopeType,
                scopeValue: scopeValue,
                collectionName: collectionName
            }
        });
    }

    /**
     * @param doc - 
     * @param publisherName - 
     * @param extensionName - 
     * @param scopeType - 
     * @param scopeValue - 
     * @param collectionName - 
     */
    public async setDocumentByName(
        doc: any,
        publisherName: string,
        extensionName: string,
        scopeType: string,
        scopeValue: string,
        collectionName: string
        ): Promise<any> {

        return this.beginRequest<any>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/ExtensionManagement/InstalledExtensions/{publisherName}/{extensionName}/Data/Scopes/{scopeType}/{scopeValue}/Collections/{collectionName}/Documents/{documentId}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                scopeType: scopeType,
                scopeValue: scopeValue,
                collectionName: collectionName
            },
            body: doc
        });
    }

    /**
     * @param doc - 
     * @param publisherName - 
     * @param extensionName - 
     * @param scopeType - 
     * @param scopeValue - 
     * @param collectionName - 
     */
    public async updateDocumentByName(
        doc: any,
        publisherName: string,
        extensionName: string,
        scopeType: string,
        scopeValue: string,
        collectionName: string
        ): Promise<any> {

        return this.beginRequest<any>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/ExtensionManagement/InstalledExtensions/{publisherName}/{extensionName}/Data/Scopes/{scopeType}/{scopeValue}/Collections/{collectionName}/Documents/{documentId}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                scopeType: scopeType,
                scopeValue: scopeValue,
                collectionName: collectionName
            },
            body: doc
        });
    }

    /**
     * Query for one or more data collections for the specified extension.  Note: the token used for authorization must have been issued on behalf of the specified extension.
     * 
     * @param collectionQuery - 
     * @param publisherName - Name of the publisher. Example: "fabrikam".
     * @param extensionName - Name of the extension. Example: "ops-tools".
     */
    public async queryCollectionsByName(
        collectionQuery: ExtensionManagement.ExtensionDataCollectionQuery,
        publisherName: string,
        extensionName: string
        ): Promise<ExtensionManagement.ExtensionDataCollection[]> {

        return this.beginRequest<ExtensionManagement.ExtensionDataCollection[]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/ExtensionManagement/InstalledExtensions/{publisherName}/{extensionName}/ExtensionDataCollectionQuery",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName
            },
            body: collectionQuery
        });
    }

    /**
     * List state and version information for all installed extensions.
     * 
     * @param includeDisabled - If true (the default), include disabled extensions in the results.
     * @param includeErrors - If true, include installed extensions in an error state in the results.
     * @param includeInstallationIssues - 
     * @param forceRefresh - 
     */
    public async getStates(
        includeDisabled?: boolean,
        includeErrors?: boolean,
        includeInstallationIssues?: boolean,
        forceRefresh?: boolean
        ): Promise<ExtensionManagement.ExtensionState[]> {

        const queryValues: any = {
            includeDisabled: includeDisabled,
            includeErrors: includeErrors,
            includeInstallationIssues: includeInstallationIssues,
            forceRefresh: forceRefresh
        };

        return this.beginRequest<ExtensionManagement.ExtensionState[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/ExtensionManagement/ExtensionStates",
            queryParams: queryValues
        });
    }

    /**
     * @param query - 
     */
    public async queryExtensions(
        query: ExtensionManagement.InstalledExtensionQuery
        ): Promise<ExtensionManagement.InstalledExtension[]> {

        return this.beginRequest<ExtensionManagement.InstalledExtension[]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/ExtensionManagement/InstalledExtensionQuery",
            body: query
        });
    }

    /**
     * List the installed extensions in the account / project collection.
     * 
     * @param includeDisabledExtensions - If true (the default), include disabled extensions in the results.
     * @param includeErrors - If true, include installed extensions with errors.
     * @param assetTypes - Determines which files are returned in the files array.  Provide the wildcard '*' to return all files, or a colon separated list to retrieve files with specific asset types.
     * @param includeInstallationIssues - 
     */
    public async getInstalledExtensions(
        includeDisabledExtensions?: boolean,
        includeErrors?: boolean,
        assetTypes?: string[],
        includeInstallationIssues?: boolean
        ): Promise<ExtensionManagement.InstalledExtension[]> {

        const queryValues: any = {
            includeDisabledExtensions: includeDisabledExtensions,
            includeErrors: includeErrors,
            assetTypes: assetTypes && assetTypes.join(":"),
            includeInstallationIssues: includeInstallationIssues
        };

        return this.beginRequest<ExtensionManagement.InstalledExtension[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/ExtensionManagement/InstalledExtensions/{extensionId}",
            queryParams: queryValues
        });
    }

    /**
     * Update an installed extension. Typically this API is used to enable or disable an extension.
     * 
     * @param extension - 
     */
    public async updateInstalledExtension(
        extension: ExtensionManagement.InstalledExtension
        ): Promise<ExtensionManagement.InstalledExtension> {

        return this.beginRequest<ExtensionManagement.InstalledExtension>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/ExtensionManagement/InstalledExtensions/{extensionId}",
            body: extension
        });
    }

    /**
     * Get an installed extension by its publisher and extension name.
     * 
     * @param publisherName - Name of the publisher. Example: "fabrikam".
     * @param extensionName - Name of the extension. Example: "ops-tools".
     * @param assetTypes - Determines which files are returned in the files array.  Provide the wildcard '*' to return all files, or a colon separated list to retrieve files with specific asset types.
     */
    public async getInstalledExtensionByName(
        publisherName: string,
        extensionName: string,
        assetTypes?: string[]
        ): Promise<ExtensionManagement.InstalledExtension> {

        const queryValues: any = {
            assetTypes: assetTypes && assetTypes.join(":")
        };

        return this.beginRequest<ExtensionManagement.InstalledExtension>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/ExtensionManagement/InstalledExtensionsByName/{publisherName}/{extensionName}/{version}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName
            },
            queryParams: queryValues
        });
    }

    /**
     * Install the specified extension into the account / project collection.
     * 
     * @param publisherName - Name of the publisher. Example: "fabrikam".
     * @param extensionName - Name of the extension. Example: "ops-tools".
     * @param version - 
     */
    public async installExtensionByName(
        publisherName: string,
        extensionName: string,
        version?: string
        ): Promise<ExtensionManagement.InstalledExtension> {

        return this.beginRequest<ExtensionManagement.InstalledExtension>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/ExtensionManagement/InstalledExtensionsByName/{publisherName}/{extensionName}/{version}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                version: version
            }
        });
    }

    /**
     * Uninstall the specified extension from the account / project collection.
     * 
     * @param publisherName - Name of the publisher. Example: "fabrikam".
     * @param extensionName - Name of the extension. Example: "ops-tools".
     * @param reason - 
     * @param reasonCode - 
     */
    public async uninstallExtensionByName(
        publisherName: string,
        extensionName: string,
        reason?: string,
        reasonCode?: string
        ): Promise<void> {

        const queryValues: any = {
            reason: reason,
            reasonCode: reasonCode
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/ExtensionManagement/InstalledExtensionsByName/{publisherName}/{extensionName}/{version}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName
            },
            queryParams: queryValues
        });
    }

    /**
     * @param userId - 
     */
    public async getPolicies(
        userId: string
        ): Promise<Gallery.UserExtensionPolicy> {

        return this.beginRequest<Gallery.UserExtensionPolicy>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/ExtensionManagement/Policies/{userId}",
            routeValues: {
                userId: userId
            }
        });
    }

    /**
     * @param rejectMessage - 
     * @param publisherName - 
     * @param extensionName - 
     * @param requesterId - 
     * @param state - 
     */
    public async resolveRequest(
        rejectMessage: string,
        publisherName: string,
        extensionName: string,
        requesterId: string,
        state: ExtensionManagement.ExtensionRequestState
        ): Promise<number> {

        const queryValues: any = {
            state: state
        };

        return this.beginRequest<number>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/ExtensionManagement/RequestedExtensions/{publisherName}/{extensionName}/requests/{requesterId}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                requesterId: requesterId
            },
            queryParams: queryValues,
            body: rejectMessage
        });
    }

    /**
     */
    public async getRequests(
        ): Promise<ExtensionManagement.RequestedExtension[]> {

        return this.beginRequest<ExtensionManagement.RequestedExtension[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/ExtensionManagement/RequestedExtensions"
        });
    }

    /**
     * @param rejectMessage - 
     * @param publisherName - 
     * @param extensionName - 
     * @param state - 
     */
    public async resolveAllRequests(
        rejectMessage: string,
        publisherName: string,
        extensionName: string,
        state: ExtensionManagement.ExtensionRequestState
        ): Promise<number> {

        const queryValues: any = {
            state: state
        };

        return this.beginRequest<number>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/ExtensionManagement/RequestedExtensions/{publisherName}/{extensionName}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName
            },
            queryParams: queryValues,
            body: rejectMessage
        });
    }

    /**
     * @param publisherName - 
     * @param extensionName - 
     */
    public async deleteRequest(
        publisherName: string,
        extensionName: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/ExtensionManagement/RequestedExtensions/{publisherName}/{extensionName}/requests/me",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName
            }
        });
    }

    /**
     * @param publisherName - 
     * @param extensionName - 
     * @param requestMessage - 
     */
    public async requestExtension(
        publisherName: string,
        extensionName: string,
        requestMessage: string
        ): Promise<ExtensionManagement.RequestedExtension> {

        return this.beginRequest<ExtensionManagement.RequestedExtension>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/ExtensionManagement/RequestedExtensions/{publisherName}/{extensionName}/requests/me",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName
            },
            body: requestMessage
        });
    }

    /**
     */
    public async getToken(
        ): Promise<string> {

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/ExtensionManagement/Token"
        });
    }

}
