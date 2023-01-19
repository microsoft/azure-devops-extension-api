/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as Gallery from "../Gallery/Gallery";

export class GalleryRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "69d21c00-f135-441b-b5ce-3626378e0819";

    /**
     * @param extensionId - 
     * @param accountName - 
     */
    public async shareExtensionById(
        extensionId: string,
        accountName: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/gallery/extensions/{extensionId}/accounts/{accountName}",
            routeValues: {
                extensionId: extensionId,
                accountName: accountName
            }
        });
    }

    /**
     * @param extensionId - 
     * @param accountName - 
     */
    public async unshareExtensionById(
        extensionId: string,
        accountName: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/gallery/extensions/{extensionId}/accounts/{accountName}",
            routeValues: {
                extensionId: extensionId,
                accountName: accountName
            }
        });
    }

    /**
     * @param publisherName - 
     * @param extensionName - 
     * @param accountName - 
     */
    public async shareExtension(
        publisherName: string,
        extensionName: string,
        accountName: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/gallery/publisher/{publisherName}/extension/{extensionName}/accountsbyname/{accountName}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                accountName: accountName
            }
        });
    }

    /**
     * @param publisherName - 
     * @param extensionName - 
     * @param accountName - 
     */
    public async unshareExtension(
        publisherName: string,
        extensionName: string,
        accountName: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/gallery/publisher/{publisherName}/extension/{extensionName}/accountsbyname/{accountName}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                accountName: accountName
            }
        });
    }

    /**
     * @param itemId - 
     * @param installationTarget - 
     * @param testCommerce - 
     * @param isFreeOrTrialInstall - 
     */
    public async getAcquisitionOptions(
        itemId: string,
        installationTarget: string,
        testCommerce?: boolean,
        isFreeOrTrialInstall?: boolean
        ): Promise<Gallery.AcquisitionOptions> {

        const queryValues: any = {
            installationTarget: installationTarget,
            testCommerce: testCommerce,
            isFreeOrTrialInstall: isFreeOrTrialInstall
        };

        return this.beginRequest<Gallery.AcquisitionOptions>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/gallery/acquisitionoptions/{itemId}",
            routeValues: {
                itemId: itemId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param acquisitionRequest - 
     */
    public async requestAcquisition(
        acquisitionRequest: Gallery.ExtensionAcquisitionRequest
        ): Promise<Gallery.ExtensionAcquisitionRequest> {

        return this.beginRequest<Gallery.ExtensionAcquisitionRequest>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/gallery/acquisitionrequests",
            body: acquisitionRequest
        });
    }

    /**
     * @param publisherName - 
     * @param extensionName - 
     * @param version - 
     * @param assetType - 
     * @param accountToken - 
     * @param acceptDefault - 
     * @param accountTokenHeader - Header to pass the account token
     */
    public async getAssetByName(
        publisherName: string,
        extensionName: string,
        version: string,
        assetType: string,
        accountToken?: string,
        acceptDefault?: boolean,
        accountTokenHeader?: String
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            accountToken: accountToken,
            acceptDefault: acceptDefault
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "_apis/public/gallery/publisher/{publisherName}/extension/{extensionName}/{version}/assetbyname/{*assetType}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                version: version,
                assetType: assetType
            },
            customHeaders: {
                "X-Market-AccountToken": accountTokenHeader,
            },
            queryParams: queryValues
        });
    }

    /**
     * @param extensionId - 
     * @param version - 
     * @param assetType - 
     * @param accountToken - 
     * @param acceptDefault - 
     * @param accountTokenHeader - Header to pass the account token
     */
    public async getAsset(
        extensionId: string,
        version: string,
        assetType: string,
        accountToken?: string,
        acceptDefault?: boolean,
        accountTokenHeader?: String
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            accountToken: accountToken,
            acceptDefault: acceptDefault
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "_apis/public/gallery/extensions/{extensionId}/{version}/assets/{assetType}",
            routeValues: {
                extensionId: extensionId,
                version: version,
                assetType: assetType
            },
            customHeaders: {
                "X-Market-AccountToken": accountTokenHeader,
            },
            queryParams: queryValues
        });
    }

    /**
     * @param publisherName - 
     * @param extensionName - 
     * @param version - 
     * @param assetType - 
     * @param accountToken - 
     * @param accountTokenHeader - Header to pass the account token
     */
    public async getAssetAuthenticated(
        publisherName: string,
        extensionName: string,
        version: string,
        assetType: string,
        accountToken?: string,
        accountTokenHeader?: String
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            accountToken: accountToken
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "_apis/gallery/publisher/{publisherName}/extension/{extensionName}/{version}/assets/{*assetType}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                version: version,
                assetType: assetType
            },
            customHeaders: {
                "X-Market-AccountToken": accountTokenHeader,
            },
            queryParams: queryValues
        });
    }

    /**
     * @param publisherName - 
     * @param azurePublisherId - 
     */
    public async associateAzurePublisher(
        publisherName: string,
        azurePublisherId: string
        ): Promise<Gallery.AzurePublisher> {

        const queryValues: any = {
            azurePublisherId: azurePublisherId
        };

        return this.beginRequest<Gallery.AzurePublisher>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/azurepublisher",
            routeValues: {
                publisherName: publisherName
            },
            queryParams: queryValues
        });
    }

    /**
     * @param publisherName - 
     */
    public async queryAssociatedAzurePublisher(
        publisherName: string
        ): Promise<Gallery.AzurePublisher> {

        return this.beginRequest<Gallery.AzurePublisher>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/azurepublisher",
            routeValues: {
                publisherName: publisherName
            }
        });
    }

    /**
     * @param languages - 
     */
    public async getCategories(
        languages?: string
        ): Promise<string[]> {

        const queryValues: any = {
            languages: languages
        };

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/public/gallery/categories",
            queryParams: queryValues
        });
    }

    /**
     * @param categoryName - 
     * @param languages - 
     * @param product - 
     */
    public async getCategoryDetails(
        categoryName: string,
        languages?: string,
        product?: string
        ): Promise<Gallery.CategoriesResult> {

        const queryValues: any = {
            languages: languages,
            product: product
        };

        return this.beginRequest<Gallery.CategoriesResult>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/public/gallery/categories/{categoryName}",
            routeValues: {
                categoryName: categoryName
            },
            queryParams: queryValues
        });
    }

    /**
     * @param product - 
     * @param categoryId - 
     * @param lcid - 
     * @param source - 
     * @param productVersion - 
     * @param skus - 
     * @param subSkus - 
     * @param productArchitecture - 
     */
    public async getCategoryTree(
        product: string,
        categoryId: string,
        lcid?: number,
        source?: string,
        productVersion?: string,
        skus?: string,
        subSkus?: string,
        productArchitecture?: string
        ): Promise<Gallery.ProductCategory> {

        const queryValues: any = {
            lcid: lcid,
            source: source,
            productVersion: productVersion,
            skus: skus,
            subSkus: subSkus,
            productArchitecture: productArchitecture
        };

        return this.beginRequest<Gallery.ProductCategory>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/public/gallery/{product}/categories/{categoryId}",
            routeValues: {
                product: product,
                categoryId: categoryId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param product - 
     * @param lcid - 
     * @param source - 
     * @param productVersion - 
     * @param skus - 
     * @param subSkus - 
     */
    public async getRootCategories(
        product: string,
        lcid?: number,
        source?: string,
        productVersion?: string,
        skus?: string,
        subSkus?: string
        ): Promise<Gallery.ProductCategoriesResult> {

        const queryValues: any = {
            lcid: lcid,
            source: source,
            productVersion: productVersion,
            skus: skus,
            subSkus: subSkus
        };

        return this.beginRequest<Gallery.ProductCategoriesResult>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/public/gallery/{product}/categories/root",
            routeValues: {
                product: product
            },
            queryParams: queryValues
        });
    }

    /**
     * @param publisherName - 
     * @param extensionName - 
     * @param version - 
     */
    public async getCertificate(
        publisherName: string,
        extensionName: string,
        version?: string
        ): Promise<ArrayBuffer> {

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/certificates/{version}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                version: version
            }
        });
    }

    /**
     * @param publisherName - 
     * @param extensionName - 
     */
    public async getContentVerificationLog(
        publisherName: string,
        extensionName: string
        ): Promise<ArrayBuffer> {

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/contentverificationlog",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName
            }
        });
    }

    /**
     * @param customerSupportRequest - 
     */
    public async createSupportRequest(
        customerSupportRequest: Gallery.CustomerSupportRequest
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/public/support",
            body: customerSupportRequest
        });
    }

    /**
     * @param publisherName - 
     * @param extensionName - 
     */
    public async createDraftForEditExtension(
        publisherName: string,
        extensionName: string
        ): Promise<Gallery.ExtensionDraft> {

        return this.beginRequest<Gallery.ExtensionDraft>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/drafts/{draftId}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName
            }
        });
    }

    /**
     * @param draftPatch - 
     * @param publisherName - 
     * @param extensionName - 
     * @param draftId - 
     */
    public async performEditExtensionDraftOperation(
        draftPatch: Gallery.ExtensionDraftPatch,
        publisherName: string,
        extensionName: string,
        draftId: string
        ): Promise<Gallery.ExtensionDraft> {

        return this.beginRequest<Gallery.ExtensionDraft>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/drafts/{draftId}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                draftId: draftId
            },
            body: draftPatch
        });
    }

    /**
     * @param content - Content to upload
     * @param publisherName - 
     * @param extensionName - 
     * @param draftId - 
     * @param fileName - Header to pass the filename of the uploaded data
     */
    public async updatePayloadInDraftForEditExtension(
        content: any,
        publisherName: string,
        extensionName: string,
        draftId: string,
        fileName?: String
        ): Promise<Gallery.ExtensionDraft> {

        return this.beginRequest<Gallery.ExtensionDraft>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/drafts/{draftId}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                draftId: draftId
            },
            customHeaders: {
                "Content-Type": "application/octet-stream",
                "X-Market-UploadFileName": fileName,
            },
            body: content,
            isRawData: true
        });
    }

    /**
     * @param content - Content to upload
     * @param publisherName - 
     * @param extensionName - 
     * @param draftId - 
     * @param assetType - 
     */
    public async addAssetForEditExtensionDraft(
        content: string,
        publisherName: string,
        extensionName: string,
        draftId: string,
        assetType: string
        ): Promise<Gallery.ExtensionDraftAsset> {

        return this.beginRequest<Gallery.ExtensionDraftAsset>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/drafts/{draftId}/assets/{*assetType}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                draftId: draftId,
                assetType: assetType
            },
            customHeaders: {
                "Content-Type": "application/octet-stream",
            },
            body: content,
            isRawData: true
        });
    }

    /**
     * @param content - Content to upload
     * @param publisherName - 
     * @param product - Header to pass the product type of the payload file
     * @param fileName - Header to pass the filename of the uploaded data
     */
    public async createDraftForNewExtension(
        content: any,
        publisherName: string,
        product: String,
        fileName?: String
        ): Promise<Gallery.ExtensionDraft> {

        return this.beginRequest<Gallery.ExtensionDraft>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/drafts/{draftId}",
            routeValues: {
                publisherName: publisherName
            },
            customHeaders: {
                "Content-Type": "application/octet-stream",
                "X-Market-UploadFileProduct": product,
                "X-Market-UploadFileName": fileName,
            },
            body: content,
            isRawData: true
        });
    }

    /**
     * @param draftPatch - 
     * @param publisherName - 
     * @param draftId - 
     */
    public async performNewExtensionDraftOperation(
        draftPatch: Gallery.ExtensionDraftPatch,
        publisherName: string,
        draftId: string
        ): Promise<Gallery.ExtensionDraft> {

        return this.beginRequest<Gallery.ExtensionDraft>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/drafts/{draftId}",
            routeValues: {
                publisherName: publisherName,
                draftId: draftId
            },
            body: draftPatch
        });
    }

    /**
     * @param content - Content to upload
     * @param publisherName - 
     * @param draftId - 
     * @param fileName - Header to pass the filename of the uploaded data
     */
    public async updatePayloadInDraftForNewExtension(
        content: any,
        publisherName: string,
        draftId: string,
        fileName?: String
        ): Promise<Gallery.ExtensionDraft> {

        return this.beginRequest<Gallery.ExtensionDraft>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/drafts/{draftId}",
            routeValues: {
                publisherName: publisherName,
                draftId: draftId
            },
            customHeaders: {
                "Content-Type": "application/octet-stream",
                "X-Market-UploadFileName": fileName,
            },
            body: content,
            isRawData: true
        });
    }

    /**
     * @param content - Content to upload
     * @param publisherName - 
     * @param draftId - 
     * @param assetType - 
     */
    public async addAssetForNewExtensionDraft(
        content: string,
        publisherName: string,
        draftId: string,
        assetType: string
        ): Promise<Gallery.ExtensionDraftAsset> {

        return this.beginRequest<Gallery.ExtensionDraftAsset>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/drafts/{draftId}/assets/{*assetType}",
            routeValues: {
                publisherName: publisherName,
                draftId: draftId,
                assetType: assetType
            },
            customHeaders: {
                "Content-Type": "application/octet-stream",
            },
            body: content,
            isRawData: true
        });
    }

    /**
     * @param publisherName - 
     * @param draftId - 
     * @param assetType - 
     * @param extensionName - 
     */
    public async getAssetFromEditExtensionDraft(
        publisherName: string,
        draftId: string,
        assetType: string,
        extensionName: string
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            extensionName: extensionName
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/drafts/{draftId}/assets/{*assetType}",
            routeValues: {
                publisherName: publisherName,
                draftId: draftId,
                assetType: assetType
            },
            queryParams: queryValues
        });
    }

    /**
     * @param publisherName - 
     * @param draftId - 
     * @param assetType - 
     */
    public async getAssetFromNewExtensionDraft(
        publisherName: string,
        draftId: string,
        assetType: string
        ): Promise<ArrayBuffer> {

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/drafts/{draftId}/assets/{*assetType}",
            routeValues: {
                publisherName: publisherName,
                draftId: draftId,
                assetType: assetType
            }
        });
    }

    /**
     * Get install/uninstall events of an extension. If both count and afterDate parameters are specified, count takes precedence.
     * 
     * @param publisherName - Name of the publisher
     * @param extensionName - Name of the extension
     * @param count - Count of events to fetch, applies to each event type.
     * @param afterDate - Fetch events that occurred on or after this date
     * @param include - Filter options. Supported values: install, uninstall, review, acquisition, sales. Default is to fetch all types of events
     * @param includeProperty - Event properties to include. Currently only 'lastContactDetails' is supported for uninstall events
     */
    public async getExtensionEvents(
        publisherName: string,
        extensionName: string,
        count?: number,
        afterDate?: Date,
        include?: string,
        includeProperty?: string
        ): Promise<Gallery.ExtensionEvents> {

        const queryValues: any = {
            count: count,
            afterDate: afterDate,
            include: include,
            includeProperty: includeProperty
        };

        return this.beginRequest<Gallery.ExtensionEvents>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/events",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName
            },
            queryParams: queryValues
        });
    }

    /**
     * API endpoint to publish extension install/uninstall events. This is meant to be invoked by EMS only for sending us data related to install/uninstall of an extension.
     * 
     * @param extensionEvents - 
     */
    public async publishExtensionEvents(
        extensionEvents: Gallery.ExtensionEvents[]
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/gallery/events",
            body: extensionEvents
        });
    }

    /**
     * @param extensionQuery - 
     * @param accountToken - 
     * @param accountTokenHeader - Header to pass the account token
     */
    public async queryExtensions(
        extensionQuery: Gallery.ExtensionQuery,
        accountToken?: string,
        accountTokenHeader?: String
        ): Promise<Gallery.ExtensionQueryResult> {

        const queryValues: any = {
            accountToken: accountToken
        };

        return this.beginRequest<Gallery.ExtensionQueryResult>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/public/gallery/extensionquery",
            customHeaders: {
                "X-Market-AccountToken": accountTokenHeader,
            },
            queryParams: queryValues,
            body: extensionQuery
        });
    }

    /**
     * @param content - Content to upload
     * @param extensionType - 
     * @param reCaptchaToken - 
     */
    public async createExtension(
        content: any,
        extensionType?: string,
        reCaptchaToken?: string
        ): Promise<Gallery.PublishedExtension> {

        const queryValues: any = {
            extensionType: extensionType,
            reCaptchaToken: reCaptchaToken
        };

        return this.beginRequest<Gallery.PublishedExtension>({
            apiVersion: "7.1-preview.2",
            method: "POST",
            routeTemplate: "_apis/gallery/extensions/{extensionId}",
            customHeaders: {
                "Content-Type": "application/octet-stream",
            },
            queryParams: queryValues,
            body: content,
            isRawData: true
        });
    }

    /**
     * @param extensionId - 
     * @param version - 
     */
    public async deleteExtensionById(
        extensionId: string,
        version?: string
        ): Promise<void> {

        const queryValues: any = {
            version: version
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.2",
            method: "DELETE",
            routeTemplate: "_apis/gallery/extensions/{extensionId}",
            routeValues: {
                extensionId: extensionId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param extensionId - 
     * @param version - 
     * @param flags - 
     */
    public async getExtensionById(
        extensionId: string,
        version?: string,
        flags?: Gallery.ExtensionQueryFlags
        ): Promise<Gallery.PublishedExtension> {

        const queryValues: any = {
            version: version,
            flags: flags
        };

        return this.beginRequest<Gallery.PublishedExtension>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/gallery/extensions/{extensionId}",
            routeValues: {
                extensionId: extensionId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param extensionId - 
     * @param reCaptchaToken - 
     */
    public async updateExtensionById(
        extensionId: string,
        reCaptchaToken?: string
        ): Promise<Gallery.PublishedExtension> {

        const queryValues: any = {
            reCaptchaToken: reCaptchaToken
        };

        return this.beginRequest<Gallery.PublishedExtension>({
            apiVersion: "7.1-preview.2",
            method: "PUT",
            routeTemplate: "_apis/gallery/extensions/{extensionId}",
            routeValues: {
                extensionId: extensionId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param content - Content to upload
     * @param publisherName - 
     * @param extensionType - 
     * @param reCaptchaToken - 
     */
    public async createExtensionWithPublisher(
        content: any,
        publisherName: string,
        extensionType?: string,
        reCaptchaToken?: string
        ): Promise<Gallery.PublishedExtension> {

        const queryValues: any = {
            extensionType: extensionType,
            reCaptchaToken: reCaptchaToken
        };

        return this.beginRequest<Gallery.PublishedExtension>({
            apiVersion: "7.1-preview.2",
            method: "POST",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}",
            routeValues: {
                publisherName: publisherName
            },
            customHeaders: {
                "Content-Type": "application/octet-stream",
            },
            queryParams: queryValues,
            body: content,
            isRawData: true
        });
    }

    /**
     * @param publisherName - 
     * @param extensionName - 
     * @param version - 
     */
    public async deleteExtension(
        publisherName: string,
        extensionName: string,
        version?: string
        ): Promise<void> {

        const queryValues: any = {
            version: version
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.2",
            method: "DELETE",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName
            },
            queryParams: queryValues
        });
    }

    /**
     * @param publisherName - 
     * @param extensionName - 
     * @param version - 
     * @param flags - 
     * @param accountToken - 
     * @param accountTokenHeader - Header to pass the account token
     */
    public async getExtension(
        publisherName: string,
        extensionName: string,
        version?: string,
        flags?: Gallery.ExtensionQueryFlags,
        accountToken?: string,
        accountTokenHeader?: String
        ): Promise<Gallery.PublishedExtension> {

        const queryValues: any = {
            version: version,
            flags: flags,
            accountToken: accountToken
        };

        return this.beginRequest<Gallery.PublishedExtension>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName
            },
            customHeaders: {
                "X-Market-AccountToken": accountTokenHeader,
            },
            queryParams: queryValues
        });
    }

    /**
     * REST endpoint to update an extension.
     * 
     * @param content - Content to upload
     * @param publisherName - Name of the publisher
     * @param extensionName - Name of the extension
     * @param extensionType - 
     * @param reCaptchaToken - 
     * @param bypassScopeCheck - This parameter decides if the scope change check needs to be invoked or not
     */
    public async updateExtension(
        content: any,
        publisherName: string,
        extensionName: string,
        extensionType?: string,
        reCaptchaToken?: string,
        bypassScopeCheck?: boolean
        ): Promise<Gallery.PublishedExtension> {

        const queryValues: any = {
            extensionType: extensionType,
            reCaptchaToken: reCaptchaToken,
            bypassScopeCheck: bypassScopeCheck
        };

        return this.beginRequest<Gallery.PublishedExtension>({
            apiVersion: "7.1-preview.2",
            method: "PUT",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName
            },
            customHeaders: {
                "Content-Type": "application/octet-stream",
            },
            queryParams: queryValues,
            body: content,
            isRawData: true
        });
    }

    /**
     * @param publisherName - 
     * @param extensionName - 
     * @param flags - 
     */
    public async updateExtensionProperties(
        publisherName: string,
        extensionName: string,
        flags: Gallery.PublishedExtensionFlags
        ): Promise<Gallery.PublishedExtension> {

        const queryValues: any = {
            flags: flags
        };

        return this.beginRequest<Gallery.PublishedExtension>({
            apiVersion: "7.1-preview.2",
            method: "PATCH",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName
            },
            queryParams: queryValues
        });
    }

    /**
     * @param publisherName - 
     * @param extensionName - 
     * @param hostType - 
     * @param hostName - 
     */
    public async shareExtensionWithHost(
        publisherName: string,
        extensionName: string,
        hostType: string,
        hostName: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/gallery/publisher/{publisherName}/extension/{extensionName}/extensionshare/{hostType}/{hostName}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                hostType: hostType,
                hostName: hostName
            }
        });
    }

    /**
     * @param publisherName - 
     * @param extensionName - 
     * @param hostType - 
     * @param hostName - 
     */
    public async unshareExtensionWithHost(
        publisherName: string,
        extensionName: string,
        hostType: string,
        hostName: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/gallery/publisher/{publisherName}/extension/{extensionName}/extensionshare/{hostType}/{hostName}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                hostType: hostType,
                hostName: hostName
            }
        });
    }

    /**
     * @param azureRestApiRequestModel - 
     */
    public async extensionValidator(
        azureRestApiRequestModel: Gallery.AzureRestApiRequestModel
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/gallery/extensionValidator",
            body: azureRestApiRequestModel
        });
    }

    /**
     * Send Notification
     * 
     * @param notificationData - Denoting the data needed to send notification
     */
    public async sendNotifications(
        notificationData: Gallery.NotificationsData
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/gallery/notifications",
            body: notificationData
        });
    }

    /**
     * This endpoint gets hit when you download a VSTS extension from the Web UI
     * 
     * @param publisherName - 
     * @param extensionName - 
     * @param version - 
     * @param accountToken - 
     * @param acceptDefault - 
     * @param accountTokenHeader - Header to pass the account token
     */
    public async getPackage(
        publisherName: string,
        extensionName: string,
        version: string,
        accountToken?: string,
        acceptDefault?: boolean,
        accountTokenHeader?: String
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            accountToken: accountToken,
            acceptDefault: acceptDefault
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/{version}/package",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                version: version
            },
            customHeaders: {
                "X-Market-AccountToken": accountTokenHeader,
            },
            queryParams: queryValues
        });
    }

    /**
     * @param publisherName - 
     * @param extensionName - 
     * @param version - 
     * @param assetType - 
     * @param assetToken - 
     * @param accountToken - 
     * @param acceptDefault - 
     * @param accountTokenHeader - Header to pass the account token
     */
    public async getAssetWithToken(
        publisherName: string,
        extensionName: string,
        version: string,
        assetType: string,
        assetToken?: string,
        accountToken?: string,
        acceptDefault?: boolean,
        accountTokenHeader?: String
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            accountToken: accountToken,
            acceptDefault: acceptDefault
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "_apis/public/gallery/publisher/{publisherName}/extension/{extensionName}/{version}/privateasset/{assetToken}/{*assetType}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                version: version,
                assetType: assetType,
                assetToken: assetToken
            },
            customHeaders: {
                "X-Market-AccountToken": accountTokenHeader,
            },
            queryParams: queryValues
        });
    }

    /**
     * Delete publisher asset like logo
     * 
     * @param publisherName - Internal name of the publisher
     * @param assetType - Type of asset. Default value is 'logo'.
     */
    public async deletePublisherAsset(
        publisherName: string,
        assetType?: string
        ): Promise<void> {

        const queryValues: any = {
            assetType: assetType
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/publisherasset",
            routeValues: {
                publisherName: publisherName
            },
            queryParams: queryValues
        });
    }

    /**
     * Get publisher asset like logo as a stream
     * 
     * @param publisherName - Internal name of the publisher
     * @param assetType - Type of asset. Default value is 'logo'.
     */
    public async getPublisherAsset(
        publisherName: string,
        assetType?: string
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            assetType: assetType
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/publisherasset",
            routeValues: {
                publisherName: publisherName
            },
            queryParams: queryValues
        });
    }

    /**
     * Update publisher asset like logo. It accepts asset file as an octet stream and file name is passed in header values.
     * 
     * @param content - Content to upload
     * @param publisherName - Internal name of the publisher
     * @param assetType - Type of asset. Default value is 'logo'.
     * @param fileName - Header to pass the filename of the uploaded data
     */
    public async updatePublisherAsset(
        content: any,
        publisherName: string,
        assetType?: string,
        fileName?: String
        ): Promise<{ [key: string] : string; }> {

        const queryValues: any = {
            assetType: assetType
        };

        return this.beginRequest<{ [key: string] : string; }>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/publisherasset",
            routeValues: {
                publisherName: publisherName
            },
            customHeaders: {
                "Content-Type": "application/octet-stream",
                "X-Market-UploadFileName": fileName,
            },
            queryParams: queryValues,
            body: content,
            isRawData: true
        });
    }

    /**
     * @param publisherName - 
     */
    public async fetchDomainToken(
        publisherName: string
        ): Promise<string> {

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/verify/token",
            routeValues: {
                publisherName: publisherName
            }
        });
    }

    /**
     * @param publisherName - 
     */
    public async verifyDomainToken(
        publisherName: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/verify/token",
            routeValues: {
                publisherName: publisherName
            }
        });
    }

    /**
     * @param publisherQuery - 
     */
    public async queryPublishers(
        publisherQuery: Gallery.PublisherQuery
        ): Promise<Gallery.PublisherQueryResult> {

        return this.beginRequest<Gallery.PublisherQueryResult>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/public/gallery/publisherquery",
            body: publisherQuery
        });
    }

    /**
     * @param publisher - 
     */
    public async createPublisher(
        publisher: Gallery.Publisher
        ): Promise<Gallery.Publisher> {

        return this.beginRequest<Gallery.Publisher>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/gallery/publishers/{publisherName}",
            body: publisher
        });
    }

    /**
     * @param publisherName - 
     */
    public async deletePublisher(
        publisherName: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/gallery/publishers/{publisherName}",
            routeValues: {
                publisherName: publisherName
            }
        });
    }

    /**
     * @param publisherName - 
     * @param flags - 
     */
    public async getPublisher(
        publisherName: string,
        flags?: number
        ): Promise<Gallery.Publisher> {

        const queryValues: any = {
            flags: flags
        };

        return this.beginRequest<Gallery.Publisher>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/gallery/publishers/{publisherName}",
            routeValues: {
                publisherName: publisherName
            },
            queryParams: queryValues
        });
    }

    /**
     * @param publisher - 
     * @param publisherName - 
     */
    public async updatePublisher(
        publisher: Gallery.Publisher,
        publisherName: string
        ): Promise<Gallery.Publisher> {

        return this.beginRequest<Gallery.Publisher>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/gallery/publishers/{publisherName}",
            routeValues: {
                publisherName: publisherName
            },
            body: publisher
        });
    }

    /**
     * Endpoint to add/modify publisher membership. Currently Supports only addition/modification of 1 user at a time Works only for adding members of same tenant.
     * 
     * @param roleAssignments - List of user identifiers(email address) and role to be added. Currently only one entry is supported.
     * @param publisherName - The name/id of publisher to which users have to be added
     * @param limitToCallerIdentityDomain - Should cross tenant addtions be allowed or not.
     */
    public async updatePublisherMembers(
        roleAssignments: Gallery.PublisherUserRoleAssignmentRef[],
        publisherName: string,
        limitToCallerIdentityDomain?: boolean
        ): Promise<Gallery.PublisherRoleAssignment[]> {

        const queryValues: any = {
            limitToCallerIdentityDomain: limitToCallerIdentityDomain
        };

        return this.beginRequest<Gallery.PublisherRoleAssignment[]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/gallery/publishers/{publisherName}",
            routeValues: {
                publisherName: publisherName
            },
            queryParams: queryValues,
            body: roleAssignments
        });
    }

    /**
     * @param publisherName - 
     */
    public async getPublisherWithoutToken(
        publisherName: string
        ): Promise<Gallery.Publisher> {

        return this.beginRequest<Gallery.Publisher>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/public/gallery/publisherWithoutToken/{publisherName}",
            routeValues: {
                publisherName: publisherName
            }
        });
    }

    /**
     * Returns a list of questions with their responses associated with an extension.
     * 
     * @param publisherName - Name of the publisher who published the extension.
     * @param extensionName - Name of the extension.
     * @param count - Number of questions to retrieve (defaults to 10).
     * @param page - Page number from which set of questions are to be retrieved.
     * @param afterDate - If provided, results questions are returned which were posted after this date
     */
    public async getQuestions(
        publisherName: string,
        extensionName: string,
        count?: number,
        page?: number,
        afterDate?: Date
        ): Promise<Gallery.QuestionsResult> {

        const queryValues: any = {
            count: count,
            page: page,
            afterDate: afterDate
        };

        return this.beginRequest<Gallery.QuestionsResult>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/public/gallery/publishers/{publisherName}/extensions/{extensionName}/qna",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName
            },
            queryParams: queryValues
        });
    }

    /**
     * Flags a concern with an existing question for an extension.
     * 
     * @param concern - User reported concern with a question for the extension.
     * @param pubName - Name of the publisher who published the extension.
     * @param extName - Name of the extension.
     * @param questionId - Identifier of the question to be updated for the extension.
     */
    public async reportQuestion(
        concern: Gallery.Concern,
        pubName: string,
        extName: string,
        questionId: number
        ): Promise<Gallery.Concern> {

        return this.beginRequest<Gallery.Concern>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/gallery/publishers/{pubName}/extensions/{extName}/qna/{questionId}/concern",
            routeValues: {
                pubName: pubName,
                extName: extName,
                questionId: questionId
            },
            body: concern
        });
    }

    /**
     * Creates a new question for an extension.
     * 
     * @param question - Question to be created for the extension.
     * @param publisherName - Name of the publisher who published the extension.
     * @param extensionName - Name of the extension.
     */
    public async createQuestion(
        question: Gallery.Question,
        publisherName: string,
        extensionName: string
        ): Promise<Gallery.Question> {

        return this.beginRequest<Gallery.Question>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/qna/{questionId}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName
            },
            body: question
        });
    }

    /**
     * Deletes an existing question and all its associated responses for an extension. (soft delete)
     * 
     * @param publisherName - Name of the publisher who published the extension.
     * @param extensionName - Name of the extension.
     * @param questionId - Identifier of the question to be deleted for the extension.
     */
    public async deleteQuestion(
        publisherName: string,
        extensionName: string,
        questionId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/qna/{questionId}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                questionId: questionId
            }
        });
    }

    /**
     * Updates an existing question for an extension.
     * 
     * @param question - Updated question to be set for the extension.
     * @param publisherName - Name of the publisher who published the extension.
     * @param extensionName - Name of the extension.
     * @param questionId - Identifier of the question to be updated for the extension.
     */
    public async updateQuestion(
        question: Gallery.Question,
        publisherName: string,
        extensionName: string,
        questionId: number
        ): Promise<Gallery.Question> {

        return this.beginRequest<Gallery.Question>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/qna/{questionId}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                questionId: questionId
            },
            body: question
        });
    }

    /**
     * Creates a new response for a given question for an extension.
     * 
     * @param response - Response to be created for the extension.
     * @param publisherName - Name of the publisher who published the extension.
     * @param extensionName - Name of the extension.
     * @param questionId - Identifier of the question for which response is to be created for the extension.
     */
    public async createResponse(
        response: Gallery.Response,
        publisherName: string,
        extensionName: string,
        questionId: number
        ): Promise<Gallery.Response> {

        return this.beginRequest<Gallery.Response>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/qna/{questionId}/responses/{responseId}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                questionId: questionId
            },
            body: response
        });
    }

    /**
     * Deletes a response for an extension. (soft delete)
     * 
     * @param publisherName - Name of the publisher who published the extension.
     * @param extensionName - Name of the extension.
     * @param questionId - Identifies the question whose response is to be deleted.
     * @param responseId - Identifies the response to be deleted.
     */
    public async deleteResponse(
        publisherName: string,
        extensionName: string,
        questionId: number,
        responseId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/qna/{questionId}/responses/{responseId}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                questionId: questionId,
                responseId: responseId
            }
        });
    }

    /**
     * Updates an existing response for a given question for an extension.
     * 
     * @param response - Updated response to be set for the extension.
     * @param publisherName - Name of the publisher who published the extension.
     * @param extensionName - Name of the extension.
     * @param questionId - Identifier of the question for which response is to be updated for the extension.
     * @param responseId - Identifier of the response which has to be updated.
     */
    public async updateResponse(
        response: Gallery.Response,
        publisherName: string,
        extensionName: string,
        questionId: number,
        responseId: number
        ): Promise<Gallery.Response> {

        return this.beginRequest<Gallery.Response>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/qna/{questionId}/responses/{responseId}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                questionId: questionId,
                responseId: responseId
            },
            body: response
        });
    }

    /**
     * Returns extension reports
     * 
     * @param publisherName - Name of the publisher who published the extension
     * @param extensionName - Name of the extension
     * @param days - Last n days report. If afterDate and days are specified, days will take priority
     * @param count - Number of events to be returned
     * @param afterDate - Use if you want to fetch events newer than the specified date
     */
    public async getExtensionReports(
        publisherName: string,
        extensionName: string,
        days?: number,
        count?: number,
        afterDate?: Date
        ): Promise<any> {

        const queryValues: any = {
            days: days,
            count: count,
            afterDate: afterDate
        };

        return this.beginRequest<any>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/reports",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName
            },
            queryParams: queryValues
        });
    }

    /**
     * Returns a list of reviews associated with an extension
     * 
     * @param publisherName - Name of the publisher who published the extension
     * @param extensionName - Name of the extension
     * @param count - Number of reviews to retrieve (defaults to 5)
     * @param filterOptions - FilterOptions to filter out empty reviews etcetera, defaults to none
     * @param beforeDate - Use if you want to fetch reviews older than the specified date, defaults to null
     * @param afterDate - Use if you want to fetch reviews newer than the specified date, defaults to null
     */
    public async getReviews(
        publisherName: string,
        extensionName: string,
        count?: number,
        filterOptions?: Gallery.ReviewFilterOptions,
        beforeDate?: Date,
        afterDate?: Date
        ): Promise<Gallery.ReviewsResult> {

        const queryValues: any = {
            count: count,
            filterOptions: filterOptions,
            beforeDate: beforeDate,
            afterDate: afterDate
        };

        return this.beginRequest<Gallery.ReviewsResult>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/public/gallery/publishers/{publisherName}/extensions/{extensionName}/reviews",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName
            },
            queryParams: queryValues
        });
    }

    /**
     * Returns a summary of the reviews
     * 
     * @param pubName - Name of the publisher who published the extension
     * @param extName - Name of the extension
     * @param beforeDate - Use if you want to fetch summary of reviews older than the specified date, defaults to null
     * @param afterDate - Use if you want to fetch summary of reviews newer than the specified date, defaults to null
     */
    public async getReviewsSummary(
        pubName: string,
        extName: string,
        beforeDate?: Date,
        afterDate?: Date
        ): Promise<Gallery.ReviewSummary> {

        const queryValues: any = {
            beforeDate: beforeDate,
            afterDate: afterDate
        };

        return this.beginRequest<Gallery.ReviewSummary>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/public/gallery/publishers/{pubName}/extensions/{extName}/reviews/summary",
            routeValues: {
                pubName: pubName,
                extName: extName
            },
            queryParams: queryValues
        });
    }

    /**
     * Creates a new review for an extension
     * 
     * @param review - Review to be created for the extension
     * @param pubName - Name of the publisher who published the extension
     * @param extName - Name of the extension
     */
    public async createReview(
        review: Gallery.Review,
        pubName: string,
        extName: string
        ): Promise<Gallery.Review> {

        return this.beginRequest<Gallery.Review>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/gallery/publishers/{pubName}/extensions/{extName}/reviews/{reviewId}",
            routeValues: {
                pubName: pubName,
                extName: extName
            },
            body: review
        });
    }

    /**
     * Deletes a review
     * 
     * @param pubName - Name of the publisher who published the extension
     * @param extName - Name of the extension
     * @param reviewId - Id of the review which needs to be updated
     */
    public async deleteReview(
        pubName: string,
        extName: string,
        reviewId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/gallery/publishers/{pubName}/extensions/{extName}/reviews/{reviewId}",
            routeValues: {
                pubName: pubName,
                extName: extName,
                reviewId: reviewId
            }
        });
    }

    /**
     * Updates or Flags a review
     * 
     * @param reviewPatch - ReviewPatch object which contains the changes to be applied to the review
     * @param pubName - Name of the publisher who published the extension
     * @param extName - Name of the extension
     * @param reviewId - Id of the review which needs to be updated
     */
    public async updateReview(
        reviewPatch: Gallery.ReviewPatch,
        pubName: string,
        extName: string,
        reviewId: number
        ): Promise<Gallery.ReviewPatch> {

        return this.beginRequest<Gallery.ReviewPatch>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/gallery/publishers/{pubName}/extensions/{extName}/reviews/{reviewId}",
            routeValues: {
                pubName: pubName,
                extName: extName,
                reviewId: reviewId
            },
            body: reviewPatch
        });
    }

    /**
     * @param category - 
     */
    public async createCategory(
        category: Gallery.ExtensionCategory
        ): Promise<Gallery.ExtensionCategory> {

        return this.beginRequest<Gallery.ExtensionCategory>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/gallery/categories",
            body: category
        });
    }

    /**
     * Get all setting entries for the given user/all-users scope
     * 
     * @param userScope - User-Scope at which to get the value. Should be "me" for the current user or "host" for all users.
     * @param key - Optional key under which to filter all the entries
     */
    public async getGalleryUserSettings(
        userScope: string,
        key?: string
        ): Promise<{ [key: string] : any; }> {

        return this.beginRequest<{ [key: string] : any; }>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/gallery/settings/{userScope}/{*key}",
            routeValues: {
                userScope: userScope,
                key: key
            }
        });
    }

    /**
     * Set all setting entries for the given user/all-users scope
     * 
     * @param entries - A key-value pair of all settings that need to be set
     * @param userScope - User-Scope at which to get the value. Should be "me" for the current user or "host" for all users.
     */
    public async setGalleryUserSettings(
        entries: { [key: string] : any; },
        userScope: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/gallery/settings/{userScope}/{*key}",
            routeValues: {
                userScope: userScope
            },
            body: entries
        });
    }

    /**
     * @param keyType - 
     * @param expireCurrentSeconds - 
     */
    public async generateKey(
        keyType: string,
        expireCurrentSeconds?: number
        ): Promise<void> {

        const queryValues: any = {
            expireCurrentSeconds: expireCurrentSeconds
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/gallery/signingkey/{keyType}",
            routeValues: {
                keyType: keyType
            },
            queryParams: queryValues
        });
    }

    /**
     * @param keyType - 
     */
    public async getSigningKey(
        keyType: string
        ): Promise<string> {

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/gallery/signingkey/{keyType}",
            routeValues: {
                keyType: keyType
            }
        });
    }

    /**
     * @param extensionStatisticsUpdate - 
     * @param publisherName - 
     * @param extensionName - 
     */
    public async updateExtensionStatistics(
        extensionStatisticsUpdate: Gallery.ExtensionStatisticUpdate,
        publisherName: string,
        extensionName: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/gallery/publisher/{publisherName}/extension/{extensionName}/statistics",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName
            },
            body: extensionStatisticsUpdate
        });
    }

    /**
     * @param publisherName - 
     * @param extensionName - 
     * @param days - 
     * @param aggregate - 
     * @param afterDate - 
     */
    public async getExtensionDailyStats(
        publisherName: string,
        extensionName: string,
        days?: number,
        aggregate?: Gallery.ExtensionStatsAggregateType,
        afterDate?: Date
        ): Promise<Gallery.ExtensionDailyStats> {

        const queryValues: any = {
            days: days,
            aggregate: aggregate,
            afterDate: afterDate
        };

        return this.beginRequest<Gallery.ExtensionDailyStats>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/stats",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName
            },
            queryParams: queryValues
        });
    }

    /**
     * This route/location id only supports HTTP POST anonymously, so that the page view daily stat can be incremented from Marketplace client. Trying to call GET on this route should result in an exception. Without this explicit implementation, calling GET on this public route invokes the above GET implementation GetExtensionDailyStats.
     * 
     * @param publisherName - Name of the publisher
     * @param extensionName - Name of the extension
     * @param version - Version of the extension
     */
    public async getExtensionDailyStatsAnonymous(
        publisherName: string,
        extensionName: string,
        version: string
        ): Promise<Gallery.ExtensionDailyStats> {

        return this.beginRequest<Gallery.ExtensionDailyStats>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/public/gallery/publishers/{publisherName}/extensions/{extensionName}/{version}/stats",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                version: version
            }
        });
    }

    /**
     * Increments a daily statistic associated with the extension
     * 
     * @param publisherName - Name of the publisher
     * @param extensionName - Name of the extension
     * @param version - Version of the extension
     * @param statType - Type of stat to increment
     * @param targetPlatform - 
     */
    public async incrementExtensionDailyStat(
        publisherName: string,
        extensionName: string,
        version: string,
        statType: string,
        targetPlatform?: string
        ): Promise<void> {

        const queryValues: any = {
            statType: statType,
            targetPlatform: targetPlatform
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/public/gallery/publishers/{publisherName}/extensions/{extensionName}/{version}/stats",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                version: version
            },
            queryParams: queryValues
        });
    }

    /**
     * @param publisherName - 
     * @param extensionName - 
     * @param version - 
     * @param targetPlatform - 
     */
    public async getVerificationLog(
        publisherName: string,
        extensionName: string,
        version: string,
        targetPlatform?: string
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            targetPlatform: targetPlatform
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "_apis/gallery/publishers/{publisherName}/extensions/{extensionName}/{version}/verificationlog",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName,
                version: version
            },
            queryParams: queryValues
        });
    }

    /**
     * @param itemName - 
     * @param version - 
     * @param statType - 
     */
    public async updateVSCodeWebExtensionStatistics(
        itemName: string,
        version: string,
        statType: Gallery.VSCodeWebExtensionStatisicsType
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/public/gallery/itemName/{itemName}/version/{version}/statType/{statType}/vscodewebextension",
            routeValues: {
                itemName: itemName,
                version: version,
                statType: statType
            }
        });
    }

}
