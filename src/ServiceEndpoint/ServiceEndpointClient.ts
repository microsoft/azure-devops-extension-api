/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import ServiceEndpoint = require("../ServiceEndpoint/ServiceEndpoint");

export class ServiceEndpointRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "1814ab31-2f4f-4a9f-8761-f4d77dc5a5d7";

    /**
     * Returns list of azure subscriptions
     * 
     */
    public async getAzureManagementGroups(
        ): Promise<ServiceEndpoint.AzureManagementGroupQueryResult> {

        return this.beginRequest<ServiceEndpoint.AzureManagementGroupQueryResult>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "_apis/serviceendpoint/endpointproxy/azurermmanagementgroups"
        });
    }

    /**
     * Returns list of azure subscriptions
     * 
     */
    public async getAzureSubscriptions(
        ): Promise<ServiceEndpoint.AzureSubscriptionQueryResult> {

        return this.beginRequest<ServiceEndpoint.AzureSubscriptionQueryResult>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "_apis/serviceendpoint/endpointproxy/azurermsubscriptions"
        });
    }

    /**
     * Proxy for a GET request defined by a service endpoint.
     * 
     * @param serviceEndpointRequest - Service endpoint request.
     * @param project - Project ID or project name
     * @param endpointId - Id of the service endpoint.
     */
    public async executeServiceEndpointRequest(
        serviceEndpointRequest: ServiceEndpoint.ServiceEndpointRequest,
        project: string,
        endpointId: string
        ): Promise<ServiceEndpoint.ServiceEndpointRequestResult> {

        const queryValues: any = {
            endpointId: endpointId
        };

        return this.beginRequest<ServiceEndpoint.ServiceEndpointRequestResult>({
            apiVersion: "5.0-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/serviceendpoint/endpointproxy",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            body: serviceEndpointRequest
        });
    }

    /**
     * Proxy for a GET request defined by a service endpoint. The request is authorized using a data source in service endpoint. The response is filtered using an XPath/Json based selector.
     * 
     * @param binding - Describes the data source to fetch.
     * @param project - Project ID or project name
     */
    public async queryServiceEndpoint(
        binding: ServiceEndpoint.DataSourceBinding,
        project: string
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "5.0-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/serviceendpoint/endpointproxy",
            routeValues: {
                project: project
            },
            body: binding
        });
    }

    /**
     * Create a service endpoint.
     * 
     * @param endpoint - Service endpoint to create.
     * @param project - Project ID or project name
     */
    public async createServiceEndpoint(
        endpoint: ServiceEndpoint.ServiceEndpoint,
        project: string
        ): Promise<ServiceEndpoint.ServiceEndpoint> {

        return this.beginRequest<ServiceEndpoint.ServiceEndpoint>({
            apiVersion: "5.0-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/serviceendpoint/endpoints/{endpointId}",
            routeValues: {
                project: project
            },
            body: endpoint
        });
    }

    /**
     * Delete a service endpoint.
     * 
     * @param project - Project ID or project name
     * @param endpointId - Id of the service endpoint to delete.
     * @param deep - Specific to AzureRM endpoint created in Automatic flow. When set to true, this will also delete corresponding AAD application in Azure. Default value is true.
     */
    public async deleteServiceEndpoint(
        project: string,
        endpointId: string,
        deep?: boolean
        ): Promise<void> {

        const queryValues: any = {
            deep: deep
        };

        return this.beginRequest<void>({
            apiVersion: "5.0-preview.2",
            method: "DELETE",
            routeTemplate: "{project}/_apis/serviceendpoint/endpoints/{endpointId}",
            routeValues: {
                project: project,
                endpointId: endpointId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get the service endpoint details.
     * 
     * @param project - Project ID or project name
     * @param endpointId - Id of the service endpoint.
     */
    public async getServiceEndpointDetails(
        project: string,
        endpointId: string
        ): Promise<ServiceEndpoint.ServiceEndpoint> {

        return this.beginRequest<ServiceEndpoint.ServiceEndpoint>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "{project}/_apis/serviceendpoint/endpoints/{endpointId}",
            routeValues: {
                project: project,
                endpointId: endpointId
            }
        });
    }

    /**
     * Get the service endpoints.
     * 
     * @param project - Project ID or project name
     * @param type - Type of the service endpoints.
     * @param authSchemes - Authorization schemes used for service endpoints.
     * @param endpointIds - Ids of the service endpoints.
     * @param includeFailed - Failed flag for service endpoints.
     * @param includeDetails - Flag to include more details for service endpoints. This is for internal use only and the flag will be treated as false for all other requests
     */
    public async getServiceEndpoints(
        project: string,
        type?: string,
        authSchemes?: string[],
        endpointIds?: string[],
        includeFailed?: boolean,
        includeDetails?: boolean
        ): Promise<ServiceEndpoint.ServiceEndpoint[]> {

        const queryValues: any = {
            type: type,
            authSchemes: authSchemes && authSchemes.join(","),
            endpointIds: endpointIds && endpointIds.join(","),
            includeFailed: includeFailed,
            includeDetails: includeDetails
        };

        return this.beginRequest<ServiceEndpoint.ServiceEndpoint[]>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "{project}/_apis/serviceendpoint/endpoints/{endpointId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Get the service endpoints by name.
     * 
     * @param project - Project ID or project name
     * @param endpointNames - Names of the service endpoints.
     * @param type - Type of the service endpoints.
     * @param authSchemes - Authorization schemes used for service endpoints.
     * @param includeFailed - Failed flag for service endpoints.
     * @param includeDetails - Flag to include more details for service endpoints. This is for internal use only and the flag will be treated as false for all other requests
     */
    public async getServiceEndpointsByNames(
        project: string,
        endpointNames: string[],
        type?: string,
        authSchemes?: string[],
        includeFailed?: boolean,
        includeDetails?: boolean
        ): Promise<ServiceEndpoint.ServiceEndpoint[]> {

        const queryValues: any = {
            endpointNames: endpointNames && endpointNames.join(","),
            type: type,
            authSchemes: authSchemes && authSchemes.join(","),
            includeFailed: includeFailed,
            includeDetails: includeDetails
        };

        return this.beginRequest<ServiceEndpoint.ServiceEndpoint[]>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "{project}/_apis/serviceendpoint/endpoints/{endpointId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Update a service endpoint.
     * 
     * @param endpoint - Service endpoint to update.
     * @param project - Project ID or project name
     * @param endpointId - Id of the service endpoint to update.
     * @param operation - Operation for the service endpoint.
     */
    public async updateServiceEndpoint(
        endpoint: ServiceEndpoint.ServiceEndpoint,
        project: string,
        endpointId: string,
        operation?: string
        ): Promise<ServiceEndpoint.ServiceEndpoint> {

        const queryValues: any = {
            operation: operation
        };

        return this.beginRequest<ServiceEndpoint.ServiceEndpoint>({
            apiVersion: "5.0-preview.2",
            method: "PUT",
            routeTemplate: "{project}/_apis/serviceendpoint/endpoints/{endpointId}",
            routeValues: {
                project: project,
                endpointId: endpointId
            },
            queryParams: queryValues,
            body: endpoint
        });
    }

    /**
     * Update the service endpoints.
     * 
     * @param endpoints - Names of the service endpoints to update.
     * @param project - Project ID or project name
     */
    public async updateServiceEndpoints(
        endpoints: ServiceEndpoint.ServiceEndpoint[],
        project: string
        ): Promise<ServiceEndpoint.ServiceEndpoint[]> {

        return this.beginRequest<ServiceEndpoint.ServiceEndpoint[]>({
            apiVersion: "5.0-preview.2",
            method: "PUT",
            routeTemplate: "{project}/_apis/serviceendpoint/endpoints/{endpointId}",
            routeValues: {
                project: project
            },
            body: endpoints
        });
    }

    /**
     * Get service endpoint execution records.
     * 
     * @param project - Project ID or project name
     * @param endpointId - Id of the service endpoint.
     * @param top - Number of service endpoint execution records to get.
     */
    public async getServiceEndpointExecutionRecords(
        project: string,
        endpointId: string,
        top?: number
        ): Promise<ServiceEndpoint.ServiceEndpointExecutionRecord[]> {

        const queryValues: any = {
            top: top
        };

        return this.beginRequest<ServiceEndpoint.ServiceEndpointExecutionRecord[]>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/_apis/serviceendpoint/{endpointId}/executionhistory",
            routeValues: {
                project: project,
                endpointId: endpointId
            },
            queryParams: queryValues
        });
    }

    /**
     * Add service endpoint execution records.
     * 
     * @param input - Service endpoint execution records to add.
     * @param project - Project ID or project name
     */
    public async addServiceEndpointExecutionRecords(
        input: ServiceEndpoint.ServiceEndpointExecutionRecordsInput,
        project: string
        ): Promise<ServiceEndpoint.ServiceEndpointExecutionRecord[]> {

        return this.beginRequest<ServiceEndpoint.ServiceEndpointExecutionRecord[]>({
            apiVersion: "5.0-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/serviceendpoint/executionhistory",
            routeValues: {
                project: project
            },
            body: input
        });
    }

    /**
     * @param configurationParams - 
     */
    public async createOAuthConfiguration(
        configurationParams: ServiceEndpoint.OAuthConfigurationParams
        ): Promise<ServiceEndpoint.OAuthConfiguration> {

        return this.beginRequest<ServiceEndpoint.OAuthConfiguration>({
            apiVersion: "5.0-preview.1",
            method: "POST",
            routeTemplate: "_apis/serviceendpoint/oauthconfiguration/{configurationId}",
            body: configurationParams
        });
    }

    /**
     * @param configurationId - 
     */
    public async deleteOAuthConfiguration(
        configurationId: string
        ): Promise<ServiceEndpoint.OAuthConfiguration> {

        return this.beginRequest<ServiceEndpoint.OAuthConfiguration>({
            apiVersion: "5.0-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/serviceendpoint/oauthconfiguration/{configurationId}",
            routeValues: {
                configurationId: configurationId
            }
        });
    }

    /**
     * @param configurationId - 
     */
    public async getOAuthConfiguration(
        configurationId: string
        ): Promise<ServiceEndpoint.OAuthConfiguration> {

        return this.beginRequest<ServiceEndpoint.OAuthConfiguration>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "_apis/serviceendpoint/oauthconfiguration/{configurationId}",
            routeValues: {
                configurationId: configurationId
            }
        });
    }

    /**
     * @param endpointType - 
     * @param actionFilter - 
     */
    public async getOAuthConfigurations(
        endpointType?: string,
        actionFilter?: ServiceEndpoint.OAuthConfigurationActionFilter
        ): Promise<ServiceEndpoint.OAuthConfiguration[]> {

        const queryValues: any = {
            endpointType: endpointType,
            actionFilter: actionFilter
        };

        return this.beginRequest<ServiceEndpoint.OAuthConfiguration[]>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "_apis/serviceendpoint/oauthconfiguration/{configurationId}",
            queryParams: queryValues
        });
    }

    /**
     * @param configurationParams - 
     * @param configurationId - 
     */
    public async updateOAuthConfiguration(
        configurationParams: ServiceEndpoint.OAuthConfigurationParams,
        configurationId: string
        ): Promise<ServiceEndpoint.OAuthConfiguration> {

        return this.beginRequest<ServiceEndpoint.OAuthConfiguration>({
            apiVersion: "5.0-preview.1",
            method: "PUT",
            routeTemplate: "_apis/serviceendpoint/oauthconfiguration/{configurationId}",
            routeValues: {
                configurationId: configurationId
            },
            body: configurationParams
        });
    }

    /**
     * @param endpointId - 
     * @param project - 
     */
    public async querySharedProjects(
        endpointId: string,
        project: string
        ): Promise<ServiceEndpoint.ProjectReference[]> {

        const queryValues: any = {
            project: project
        };

        return this.beginRequest<ServiceEndpoint.ProjectReference[]>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "_apis/serviceendpoint/share/{endpointId}",
            routeValues: {
                endpointId: endpointId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param endpointId - 
     * @param fromProject - 
     * @param withProject - 
     */
    public async shareEndpointWithProject(
        endpointId: string,
        fromProject: string,
        withProject: string
        ): Promise<void> {

        const queryValues: any = {
            fromProject: fromProject,
            withProject: withProject
        };

        return this.beginRequest<void>({
            apiVersion: "5.0-preview.1",
            method: "POST",
            routeTemplate: "_apis/serviceendpoint/share/{endpointId}",
            routeValues: {
                endpointId: endpointId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get service endpoint types.
     * 
     * @param type - Type of service endpoint.
     * @param scheme - Scheme of service endpoint.
     */
    public async getServiceEndpointTypes(
        type?: string,
        scheme?: string
        ): Promise<ServiceEndpoint.ServiceEndpointType[]> {

        const queryValues: any = {
            type: type,
            scheme: scheme
        };

        return this.beginRequest<ServiceEndpoint.ServiceEndpointType[]>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "_apis/serviceendpoint/types",
            queryParams: queryValues
        });
    }

}
