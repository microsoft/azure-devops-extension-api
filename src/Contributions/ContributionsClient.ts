/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as Contributions from "../Contributions/Contributions";

export class ContributionsRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "8477aec9-a4c7-4bd4-a456-ba4c53c989cb";

    /**
     * Query for contribution nodes and provider details according the parameters in the passed in query object.
     * 
     * @param query - 
     */
    public async queryContributionNodes(
        query: Contributions.ContributionNodeQuery
        ): Promise<Contributions.ContributionNodeQueryResult> {

        return this.beginRequest<Contributions.ContributionNodeQueryResult>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/Contribution/nodes/query",
            body: query
        });
    }

    /**
     * @param query - 
     * @param scopeName - 
     * @param scopeValue - 
     */
    public async queryDataProviders(
        query: Contributions.DataProviderQuery,
        scopeName?: string,
        scopeValue?: string
        ): Promise<Contributions.DataProviderResult> {

        return this.beginRequest<Contributions.DataProviderResult>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/Contribution/dataProviders/query/{scopeName}/{scopeValue}",
            routeValues: {
                scopeName: scopeName,
                scopeValue: scopeValue
            },
            body: query
        });
    }

    /**
     * @param contributionIds - 
     * @param includeDisabledApps - 
     * @param assetTypes - 
     */
    public async getInstalledExtensions(
        contributionIds?: string[],
        includeDisabledApps?: boolean,
        assetTypes?: string[]
        ): Promise<Contributions.InstalledExtension[]> {

        const queryValues: any = {
            contributionIds: contributionIds && contributionIds.join(";"),
            includeDisabledApps: includeDisabledApps,
            assetTypes: assetTypes && assetTypes.join(":")
        };

        return this.beginRequest<Contributions.InstalledExtension[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/Contribution/InstalledApps/{extensionId}",
            queryParams: queryValues
        });
    }

    /**
     * @param publisherName - 
     * @param extensionName - 
     * @param assetTypes - 
     */
    public async getInstalledExtensionByName(
        publisherName: string,
        extensionName: string,
        assetTypes?: string[]
        ): Promise<Contributions.InstalledExtension> {

        const queryValues: any = {
            assetTypes: assetTypes && assetTypes.join(":")
        };

        return this.beginRequest<Contributions.InstalledExtension>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/Contribution/InstalledApps/{publisherName}/{extensionName}",
            routeValues: {
                publisherName: publisherName,
                extensionName: extensionName
            },
            queryParams: queryValues
        });
    }

}
