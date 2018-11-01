/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import DistributedTaskCommon = require("../DistributedTaskCommon/DistributedTaskCommon");
import FormInput = require("../FormInput/FormInput");
import WebApi = require("../WebApi/WebApi");

export const enum AccessTokenRequestType {
    None = 0,
    Oauth = 1,
    Direct = 2
}

export interface AuthenticationSchemeReference {
    inputs: { [key: string] : string; };
    type: string;
}

/**
 * Represents the header of the REST request.
 */
export interface AuthorizationHeader {
    /**
     * Gets or sets the name of authorization header.
     */
    name: string;
    /**
     * Gets or sets the value of authorization header.
     */
    value: string;
}

export interface AzureKeyVaultPermission extends AzureResourcePermission {
    vault: string;
}

/**
 * Azure Management Group
 */
export interface AzureManagementGroup {
    /**
     * Display name of azure management group
     */
    displayName: string;
    /**
     * Id of azure management group
     */
    id: string;
    /**
     * Azure management group name
     */
    name: string;
    /**
     * Id of tenant from which azure management group belogs
     */
    tenantId: string;
}

/**
 * Azure management group query result
 */
export interface AzureManagementGroupQueryResult {
    /**
     * Error message in case of an exception
     */
    errorMessage: string;
    /**
     * List of azure management groups
     */
    value: AzureManagementGroup[];
}

export interface AzurePermission {
    provisioned: boolean;
    resourceProvider: string;
}

export interface AzureResourcePermission extends AzurePermission {
    resourceGroup: string;
}

export interface AzureRoleAssignmentPermission extends AzurePermission {
    roleAssignmentId: string;
}

export interface AzureSpnOperationStatus {
    state: string;
    statusMessage: string;
}

export interface AzureSubscription {
    displayName: string;
    subscriptionId: string;
    subscriptionTenantId: string;
    subscriptionTenantName: string;
}

export interface AzureSubscriptionQueryResult {
    errorMessage: string;
    value: AzureSubscription[];
}

export interface ClientCertificate {
    /**
     * Gets or sets the value of client certificate.
     */
    value: string;
}

export interface DataSource {
    authenticationScheme: AuthenticationSchemeReference;
    callbackContextTemplate: string;
    callbackRequiredTemplate: string;
    endpointUrl: string;
    headers: AuthorizationHeader[];
    initialContextTemplate: string;
    name: string;
    requestContent: string;
    requestVerb: string;
    resourceUrl: string;
    resultSelector: string;
}

export interface DataSourceBinding extends DistributedTaskCommon.DataSourceBindingBase {
}

/**
 * Represents details of the service endpoint data source.
 */
export interface DataSourceDetails {
    /**
     * Gets or sets the data source name.
     */
    dataSourceName: string;
    /**
     * Gets or sets the data source url.
     */
    dataSourceUrl: string;
    /**
     * Gets or sets the request headers.
     */
    headers: AuthorizationHeader[];
    /**
     * Gets or sets the initialization context used for the initial call to the data source
     */
    initialContextTemplate: string;
    /**
     * Gets the parameters of data source.
     */
    parameters: { [key: string] : string; };
    /**
     * Gets or sets the data source request content.
     */
    requestContent: string;
    /**
     * Gets or sets the data source request verb. Get/Post are the only implemented types
     */
    requestVerb: string;
    /**
     * Gets or sets the resource url of data source.
     */
    resourceUrl: string;
    /**
     * Gets or sets the result selector.
     */
    resultSelector: string;
}

export interface DependencyBinding {
    key: string;
    value: string;
}

export interface DependencyData {
    input: string;
    map: { key: string; value: { key: string; value: string }[] }[];
}

export interface DependsOn {
    input: string;
    map: DependencyBinding[];
}

/**
 * Represents the authorization used for service endpoint.
 */
export interface EndpointAuthorization {
    /**
     * Gets or sets the parameters for the selected authorization scheme.
     */
    parameters: { [key: string] : string; };
    /**
     * Gets or sets the scheme used for service endpoint authentication.
     */
    scheme: string;
}

/**
 * Represents url of the service endpoint.
 */
export interface EndpointUrl {
    /**
     * Gets or sets the dependency bindings.
     */
    dependsOn: DependsOn;
    /**
     * Gets or sets the display name of service endpoint url.
     */
    displayName: string;
    /**
     * Gets or sets the help text of service endpoint url.
     */
    helpText: string;
    /**
     * Gets or sets the visibility of service endpoint url.
     */
    isVisible: string;
    /**
     * Gets or sets the value of service endpoint url.
     */
    value: string;
}

export interface HelpLink {
    text: string;
    url: string;
}

export interface OAuthConfiguration {
    /**
     * Gets or sets the ClientId
     */
    clientId: string;
    /**
     * Gets or sets the ClientSecret
     */
    clientSecret: string;
    /**
     * Gets or sets the identity who created the config.
     */
    createdBy: WebApi.IdentityRef;
    /**
     * Gets or sets the time when config was created.
     */
    createdOn: Date;
    /**
     * Gets or sets the type of the endpoint.
     */
    endpointType: string;
    /**
     * Gets or sets the unique identifier of this field
     */
    id: string;
    /**
     * Gets or sets the identity who modified the config.
     */
    modifiedBy: WebApi.IdentityRef;
    /**
     * Gets or sets the time when variable group was modified
     */
    modifiedOn: Date;
    /**
     * Gets or sets the name
     */
    name: string;
    /**
     * Gets or sets the Url
     */
    url: string;
}

export const enum OAuthConfigurationActionFilter {
    None = 0,
    Manage = 2,
    Use = 16
}

export interface OAuthConfigurationParams {
    /**
     * Gets or sets the ClientId
     */
    clientId: string;
    /**
     * Gets or sets the ClientSecret
     */
    clientSecret: string;
    /**
     * Gets or sets the type of the endpoint.
     */
    endpointType: string;
    /**
     * Gets or sets the name
     */
    name: string;
    /**
     * Gets or sets the Url
     */
    url: string;
}

export interface OAuthEndpointStatus {
    state: string;
    statusMessage: string;
}

export interface ProjectReference {
    id: string;
    name: string;
}

/**
 * Represents template to tranform the result data.
 */
export interface ResultTransformationDetails {
    /**
     * Gets or sets the template for callback parameters
     */
    callbackContextTemplate: string;
    /**
     * Gets or sets the template to decide whether to callback or not
     */
    callbackRequiredTemplate: string;
    /**
     * Gets or sets the template for result transformation.
     */
    resultTemplate: string;
}

/**
 * Represents an endpoint which may be used by an orchestration job.
 */
export interface ServiceEndpoint {
    /**
     * Gets or sets the identity reference for the administrators group of the service endpoint.
     */
    administratorsGroup: WebApi.IdentityRef;
    /**
     * Gets or sets the authorization data for talking to the endpoint.
     */
    authorization: EndpointAuthorization;
    /**
     * Gets or sets the identity reference for the user who created the Service endpoint.
     */
    createdBy: WebApi.IdentityRef;
    data: { [key: string] : string; };
    /**
     * Gets or sets the description of endpoint.
     */
    description: string;
    groupScopeId: string;
    /**
     * Gets or sets the identifier of this endpoint.
     */
    id: string;
    /**
     * EndPoint state indictor
     */
    isReady: boolean;
    /**
     * Indicates whether service endpoint is shared with other projects or not.
     */
    isShared: boolean;
    /**
     * Gets or sets the friendly name of the endpoint.
     */
    name: string;
    /**
     * Error message during creation/deletion of endpoint
     */
    operationStatus: any;
    /**
     * Owner of the endpoint Supported values are "library", "agentcloud"
     */
    owner: string;
    /**
     * Gets or sets the identity reference for the readers group of the service endpoint.
     */
    readersGroup: WebApi.IdentityRef;
    /**
     * Gets or sets the type of the endpoint.
     */
    type: string;
    /**
     * Gets or sets the url of the endpoint.
     */
    url: string;
}

export interface ServiceEndpointAuthenticationScheme {
    /**
     * Gets or sets the authorization headers of service endpoint authentication scheme.
     */
    authorizationHeaders: AuthorizationHeader[];
    /**
     * Gets or sets the Authorization url required to authenticate using OAuth2
     */
    authorizationUrl: string;
    /**
     * Gets or sets the certificates of service endpoint authentication scheme.
     */
    clientCertificates: ClientCertificate[];
    dataSourceBindings: DataSourceBinding[];
    /**
     * Gets or sets the display name for the service endpoint authentication scheme.
     */
    displayName: string;
    /**
     * Gets or sets the input descriptors for the service endpoint authentication scheme.
     */
    inputDescriptors: FormInput.InputDescriptor[];
    /**
     * Gets or sets the scheme for service endpoint authentication.
     */
    scheme: string;
}

/**
 * Represents details of the service endpoint.
 */
export interface ServiceEndpointDetails {
    /**
     * Gets or sets the authorization of service endpoint.
     */
    authorization: EndpointAuthorization;
    /**
     * Gets or sets the data of service endpoint.
     */
    data: { [key: string] : string; };
    /**
     * Gets or sets the type of service endpoint.
     */
    type: string;
    /**
     * Gets or sets the connection url of service endpoint.
     */
    url: string;
}

/**
 * Represents service endpoint execution data.
 */
export interface ServiceEndpointExecutionData {
    /**
     * Gets the definition of service endpoint execution owner.
     */
    definition: ServiceEndpointExecutionOwner;
    /**
     * Gets the finish time of service endpoint execution.
     */
    finishTime: Date;
    /**
     * Gets the Id of service endpoint execution data.
     */
    id: number;
    /**
     * Gets the owner of service endpoint execution data.
     */
    owner: ServiceEndpointExecutionOwner;
    /**
     * Gets the plan type of service endpoint execution data.
     */
    planType: string;
    /**
     * Gets the result of service endpoint execution.
     */
    result: ServiceEndpointExecutionResult;
    /**
     * Gets the start time of service endpoint execution.
     */
    startTime: Date;
}

/**
 * Represents execution owner of the service endpoint.
 */
export interface ServiceEndpointExecutionOwner {
    _links: any;
    /**
     * Gets or sets the Id of service endpoint execution owner.
     */
    id: number;
    /**
     * Gets or sets the name of service endpoint execution owner.
     */
    name: string;
}

export interface ServiceEndpointExecutionRecord {
    /**
     * Gets the execution data of service endpoint execution.
     */
    data: ServiceEndpointExecutionData;
    /**
     * Gets the Id of service endpoint.
     */
    endpointId: string;
}

export interface ServiceEndpointExecutionRecordsInput {
    data: ServiceEndpointExecutionData;
    endpointIds: string[];
}

export const enum ServiceEndpointExecutionResult {
    Succeeded = 0,
    SucceededWithIssues = 1,
    Failed = 2,
    Canceled = 3,
    Skipped = 4,
    Abandoned = 5
}

export interface ServiceEndpointOAuthConfigurationReference {
    configurationId: string;
    serviceEndpointId: string;
    serviceEndpointProjectId: string;
}

export interface ServiceEndpointRequest {
    /**
     * Gets or sets the data source details for the service endpoint request.
     */
    dataSourceDetails: DataSourceDetails;
    /**
     * Gets or sets the result transformation details for the service endpoint request.
     */
    resultTransformationDetails: ResultTransformationDetails;
    /**
     * Gets or sets the service endpoint details for the service endpoint request.
     */
    serviceEndpointDetails: ServiceEndpointDetails;
}

/**
 * Represents result of the service endpoint request.
 */
export interface ServiceEndpointRequestResult {
    /**
     * Gets or sets the parameters used to make subsequent calls to the data source
     */
    callbackContextParameters: { [key: string] : string; };
    /**
     * Gets or sets the flat that decides if another call to the data source is to be made
     */
    callbackRequired: boolean;
    /**
     * Gets or sets the error message of the service endpoint request result.
     */
    errorMessage: string;
    /**
     * Gets or sets the result of service endpoint request.
     */
    result: any;
    /**
     * Gets or sets the status code of the service endpoint request result.
     */
    statusCode: string;
}

/**
 * Represents type of the service endpoint.
 */
export interface ServiceEndpointType {
    /**
     * Authentication scheme of service endpoint type.
     */
    authenticationSchemes: ServiceEndpointAuthenticationScheme[];
    /**
     * Data sources of service endpoint type.
     */
    dataSources: DataSource[];
    /**
     * Dependency data of service endpoint type.
     */
    dependencyData: DependencyData[];
    /**
     * Gets or sets the description of service endpoint type.
     */
    description: string;
    /**
     * Gets or sets the display name of service endpoint type.
     */
    displayName: string;
    /**
     * Gets or sets the endpoint url of service endpoint type.
     */
    endpointUrl: EndpointUrl;
    /**
     * Gets or sets the help link of service endpoint type.
     */
    helpLink: HelpLink;
    helpMarkDown: string;
    /**
     * Gets or sets the icon url of service endpoint type.
     */
    iconUrl: string;
    /**
     * Input descriptor of service endpoint type.
     */
    inputDescriptors: FormInput.InputDescriptor[];
    /**
     * Gets or sets the name of service endpoint type.
     */
    name: string;
    /**
     * Trusted hosts of a service endpoint type.
     */
    trustedHosts: string[];
    /**
     * Gets or sets the ui contribution id of service endpoint type.
     */
    uiContributionId: string;
}
