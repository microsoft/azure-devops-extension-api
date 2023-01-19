/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import { deserializeVssJsonObject } from "../Common/Util/Serialization";

import * as FormInput from "../FormInput/FormInput";
import * as Release from "../Release/Release";

export class ReleaseRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "efc2f575-36ef-48e9-b672-0c6fb4a48ac5";

    /**
     * Returns the artifact details that automation agent requires
     * 
     * @param project - Project ID or project name
     * @param releaseId - 
     */
    public async getAgentArtifactDefinitions(
        project: string,
        releaseId: number
        ): Promise<Release.AgentArtifactDefinition[]> {

        return this.beginRequest<Release.AgentArtifactDefinition[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/agentartifacts",
            routeValues: {
                project: project,
                releaseId: releaseId
            }
        });
    }

    /**
     * Get a list of approvals
     * 
     * @param project - Project ID or project name
     * @param assignedToFilter - Approvals assigned to this user.
     * @param statusFilter - Approvals with this status. Default is 'pending'.
     * @param releaseIdsFilter - Approvals for release id(s) mentioned in the filter. Multiple releases can be mentioned by separating them with ',' e.g. releaseIdsFilter=1,2,3,4.
     * @param typeFilter - Approval with this type.
     * @param top - Number of approvals to get. Default is 50.
     * @param continuationToken - Gets the approvals after the continuation token provided.
     * @param queryOrder - Gets the results in the defined order of created approvals. Default is 'descending'.
     * @param includeMyGroupApprovals - 'true' to include my group approvals. Default is 'false'.
     */
    public async getApprovals(
        project: string,
        assignedToFilter?: string,
        statusFilter?: Release.ApprovalStatus,
        releaseIdsFilter?: number[],
        typeFilter?: Release.ApprovalType,
        top?: number,
        continuationToken?: number,
        queryOrder?: Release.ReleaseQueryOrder,
        includeMyGroupApprovals?: boolean
        ): Promise<Release.ReleaseApproval[]> {

        const queryValues: any = {
            assignedToFilter: assignedToFilter,
            statusFilter: statusFilter,
            releaseIdsFilter: releaseIdsFilter && releaseIdsFilter.join(","),
            typeFilter: typeFilter,
            top: top,
            continuationToken: continuationToken,
            queryOrder: queryOrder,
            includeMyGroupApprovals: includeMyGroupApprovals
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/_apis/Release/approvals",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <Release.ReleaseApproval[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Get approval history.
     * 
     * @param project - Project ID or project name
     * @param approvalStepId - Id of the approval.
     */
    public async getApprovalHistory(
        project: string,
        approvalStepId: number
        ): Promise<Release.ReleaseApproval> {

        return this.beginRequest<Release.ReleaseApproval>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/_apis/Release/approvals/{approvalStepId}/history",
            routeValues: {
                project: project,
                approvalStepId: approvalStepId
            }
        });
    }

    /**
     * Get an approval.
     * 
     * @param project - Project ID or project name
     * @param approvalId - Id of the approval.
     * @param includeHistory - 'true' to include history of the approval. Default is 'false'.
     */
    public async getApproval(
        project: string,
        approvalId: number,
        includeHistory?: boolean
        ): Promise<Release.ReleaseApproval> {

        const queryValues: any = {
            includeHistory: includeHistory
        };

        return this.beginRequest<Release.ReleaseApproval>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/_apis/Release/approvals/{approvalId}",
            routeValues: {
                project: project,
                approvalId: approvalId
            },
            queryParams: queryValues
        });
    }

    /**
     * Update status of an approval
     * 
     * @param approval - ReleaseApproval object having status, approver and comments.
     * @param project - Project ID or project name
     * @param approvalId - Id of the approval.
     */
    public async updateReleaseApproval(
        approval: Release.ReleaseApproval,
        project: string,
        approvalId: number
        ): Promise<Release.ReleaseApproval> {

        return this.beginRequest<Release.ReleaseApproval>({
            apiVersion: "7.1-preview.3",
            method: "PATCH",
            routeTemplate: "{project}/_apis/Release/approvals/{approvalId}",
            routeValues: {
                project: project,
                approvalId: approvalId
            },
            body: approval
        });
    }

    /**
     * @param approvals - 
     * @param project - Project ID or project name
     */
    public async updateReleaseApprovals(
        approvals: Release.ReleaseApproval[],
        project: string
        ): Promise<Release.ReleaseApproval[]> {

        return this.beginRequest<Release.ReleaseApproval[]>({
            apiVersion: "7.1-preview.3",
            method: "PATCH",
            routeTemplate: "{project}/_apis/Release/approvals",
            routeValues: {
                project: project
            },
            body: approvals
        });
    }

    /**
     * Get a task attachment.
     * 
     * @param project - Project ID or project name
     * @param releaseId - Id of the release.
     * @param environmentId - Id of the release environment.
     * @param attemptId - Attempt number of deployment.
     * @param timelineId - Timeline Id of the task.
     * @param recordId - Record Id of attachment.
     * @param type - Type of the attachment.
     * @param name - Name of the attachment.
     */
    public async getTaskAttachmentContent(
        project: string,
        releaseId: number,
        environmentId: number,
        attemptId: number,
        timelineId: string,
        recordId: string,
        type: string,
        name: string
        ): Promise<ArrayBuffer> {

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/environments/{environmentId}/attempts/{attemptId}/timelines/{timelineId}/records/{recordId}/attachments/{type}/{name}",
            routeValues: {
                project: project,
                releaseId: releaseId,
                environmentId: environmentId,
                attemptId: attemptId,
                timelineId: timelineId,
                recordId: recordId,
                type: type,
                name: name
            }
        });
    }

    /**
     * Get a release task attachment.
     * 
     * @param project - Project ID or project name
     * @param releaseId - Id of the release.
     * @param environmentId - Id of the release environment.
     * @param attemptId - Attempt number of deployment.
     * @param planId - Plan Id of the deploy phase.
     * @param timelineId - Timeline Id of the task.
     * @param recordId - Record Id of attachment.
     * @param type - Type of the attachment.
     * @param name - Name of the attachment.
     */
    public async getReleaseTaskAttachmentContent(
        project: string,
        releaseId: number,
        environmentId: number,
        attemptId: number,
        planId: string,
        timelineId: string,
        recordId: string,
        type: string,
        name: string
        ): Promise<ArrayBuffer> {

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/environments/{environmentId}/attempts/{attemptId}/plan/{planId}/timelines/{timelineId}/records/{recordId}/attachments/{type}/{name}",
            routeValues: {
                project: project,
                releaseId: releaseId,
                environmentId: environmentId,
                attemptId: attemptId,
                planId: planId,
                timelineId: timelineId,
                recordId: recordId,
                type: type,
                name: name
            }
        });
    }

    /**
     * Get the task attachments.
     * 
     * @param project - Project ID or project name
     * @param releaseId - Id of the release.
     * @param environmentId - Id of the release environment.
     * @param attemptId - Attempt number of deployment.
     * @param timelineId - Timeline Id of the task.
     * @param type - Type of the attachment.
     */
    public async getTaskAttachments(
        project: string,
        releaseId: number,
        environmentId: number,
        attemptId: number,
        timelineId: string,
        type: string
        ): Promise<Release.ReleaseTaskAttachment[]> {

        return this.beginRequest<Release.ReleaseTaskAttachment[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/environments/{environmentId}/attempts/{attemptId}/timelines/{timelineId}/attachments/{type}",
            routeValues: {
                project: project,
                releaseId: releaseId,
                environmentId: environmentId,
                attemptId: attemptId,
                timelineId: timelineId,
                type: type
            }
        });
    }

    /**
     * Get the release task attachments.
     * 
     * @param project - Project ID or project name
     * @param releaseId - Id of the release.
     * @param environmentId - Id of the release environment.
     * @param attemptId - Attempt number of deployment.
     * @param planId - Plan Id of the deploy phase.
     * @param type - Type of the attachment.
     */
    public async getReleaseTaskAttachments(
        project: string,
        releaseId: number,
        environmentId: number,
        attemptId: number,
        planId: string,
        type: string
        ): Promise<Release.ReleaseTaskAttachment[]> {

        return this.beginRequest<Release.ReleaseTaskAttachment[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/environments/{environmentId}/attempts/{attemptId}/plan/{planId}/attachments/{type}",
            routeValues: {
                project: project,
                releaseId: releaseId,
                environmentId: environmentId,
                attemptId: attemptId,
                planId: planId,
                type: type
            }
        });
    }

    /**
     * @param artifactType - 
     * @param sourceId - 
     * @param artifactVersionId - 
     * @param project - Project ID or project name
     */
    public async getAutoTriggerIssues(
        artifactType: string,
        sourceId: string,
        artifactVersionId: string,
        project?: string
        ): Promise<Release.AutoTriggerIssue[]> {

        const queryValues: any = {
            artifactType: artifactType,
            sourceId: sourceId,
            artifactVersionId: artifactVersionId
        };

        return this.beginRequest<Release.AutoTriggerIssue[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Release/autotriggerissues",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets a badge that indicates the status of the most recent deployment for an environment.
     * 
     * @param projectId - The ID of the Project.
     * @param releaseDefinitionId - The ID of the Release Definition.
     * @param environmentId - The ID of the Environment.
     * @param branchName - The name of the branch.
     */
    public async getDeploymentBadge(
        projectId: string,
        releaseDefinitionId: number,
        environmentId: number,
        branchName?: string
        ): Promise<string> {

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/public/Release/badge/{projectId}/{releaseDefinitionId}/{environmentId}/{branchName}",
            routeValues: {
                projectId: projectId,
                releaseDefinitionId: releaseDefinitionId,
                environmentId: environmentId,
                branchName: branchName
            }
        });
    }

    /**
     * @param project - Project ID or project name
     * @param releaseId - 
     * @param baseReleaseId - 
     * @param top - 
     * @param artifactAlias - 
     */
    public async getReleaseChanges(
        project: string,
        releaseId: number,
        baseReleaseId?: number,
        top?: number,
        artifactAlias?: string
        ): Promise<Release.Change[]> {

        const queryValues: any = {
            baseReleaseId: baseReleaseId,
            '$top': top,
            artifactAlias: artifactAlias
        };

        return this.beginRequest<Release.Change[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/changes",
            routeValues: {
                project: project,
                releaseId: releaseId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     * @param taskGroupId - 
     * @param propertyFilters - 
     */
    public async getDefinitionEnvironments(
        project: string,
        taskGroupId?: string,
        propertyFilters?: string[]
        ): Promise<Release.DefinitionEnvironmentReference[]> {

        const queryValues: any = {
            taskGroupId: taskGroupId,
            propertyFilters: propertyFilters && propertyFilters.join(",")
        };

        return this.beginRequest<Release.DefinitionEnvironmentReference[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Release/definitionEnvironments",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Create a release definition
     * 
     * @param releaseDefinition - release definition object to create.
     * @param project - Project ID or project name
     */
    public async createReleaseDefinition(
        releaseDefinition: Release.ReleaseDefinition,
        project: string
        ): Promise<Release.ReleaseDefinition> {

        return this.beginRequest<Release.ReleaseDefinition>({
            apiVersion: "7.1-preview.4",
            method: "POST",
            routeTemplate: "{project}/_apis/Release/definitions/{definitionId}",
            routeValues: {
                project: project
            },
            body: releaseDefinition
        });
    }

    /**
     * Delete a release definition.
     * 
     * @param project - Project ID or project name
     * @param definitionId - Id of the release definition.
     * @param comment - Comment for deleting a release definition.
     * @param forceDelete - 'true' to automatically cancel any in-progress release deployments and proceed with release definition deletion . Default is 'false'.
     */
    public async deleteReleaseDefinition(
        project: string,
        definitionId: number,
        comment?: string,
        forceDelete?: boolean
        ): Promise<void> {

        const queryValues: any = {
            comment: comment,
            forceDelete: forceDelete
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.4",
            method: "DELETE",
            routeTemplate: "{project}/_apis/Release/definitions/{definitionId}",
            routeValues: {
                project: project,
                definitionId: definitionId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a release definition.
     * 
     * @param project - Project ID or project name
     * @param definitionId - Id of the release definition.
     * @param propertyFilters - A comma-delimited list of extended properties to be retrieved. If set, the returned Release Definition will contain values for the specified property Ids (if they exist). If not set, properties will not be included.
     */
    public async getReleaseDefinition(
        project: string,
        definitionId: number,
        propertyFilters?: string[]
        ): Promise<Release.ReleaseDefinition> {

        const queryValues: any = {
            propertyFilters: propertyFilters && propertyFilters.join(",")
        };

        return this.beginRequest<Release.ReleaseDefinition>({
            apiVersion: "7.1-preview.4",
            routeTemplate: "{project}/_apis/Release/definitions/{definitionId}",
            routeValues: {
                project: project,
                definitionId: definitionId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get release definition of a given revision.
     * 
     * @param project - Project ID or project name
     * @param definitionId - Id of the release definition.
     * @param revision - Revision number of the release definition.
     */
    public async getReleaseDefinitionRevision(
        project: string,
        definitionId: number,
        revision: number
        ): Promise<string> {

        const queryValues: any = {
            revision: revision
        };

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.4",
            httpResponseType: "text/plain",
            routeTemplate: "{project}/_apis/Release/definitions/{definitionId}",
            routeValues: {
                project: project,
                definitionId: definitionId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a list of release definitions.
     * 
     * @param project - Project ID or project name
     * @param searchText - Get release definitions with names containing searchText.
     * @param expand - The properties that should be expanded in the list of Release definitions.
     * @param artifactType - Release definitions with given artifactType will be returned. Values can be Build, Jenkins, GitHub, Nuget, Team Build (external), ExternalTFSBuild, Git, TFVC, ExternalTfsXamlBuild.
     * @param artifactSourceId - Release definitions with given artifactSourceId will be returned. e.g. For build it would be \{projectGuid\}:\{BuildDefinitionId\}, for Jenkins it would be \{JenkinsConnectionId\}:\{JenkinsDefinitionId\}, for TfsOnPrem it would be \{TfsOnPremConnectionId\}:\{ProjectName\}:\{TfsOnPremDefinitionId\}. For third-party artifacts e.g. TeamCity, BitBucket you may refer 'uniqueSourceIdentifier' inside vss-extension.json at https://github.com/Microsoft/vsts-rm-extensions/blob/master/Extensions.
     * @param top - Number of release definitions to get.
     * @param continuationToken - Gets the release definitions after the continuation token provided.
     * @param queryOrder - Gets the results in the defined order. Default is 'IdAscending'.
     * @param path - Gets the release definitions under the specified path.
     * @param isExactNameMatch - 'true'to gets the release definitions with exact match as specified in searchText. Default is 'false'.
     * @param tagFilter - A comma-delimited list of tags. Only release definitions with these tags will be returned.
     * @param propertyFilters - A comma-delimited list of extended properties to be retrieved. If set, the returned Release Definitions will contain values for the specified property Ids (if they exist). If not set, properties will not be included. Note that this will not filter out any Release Definition from results irrespective of whether it has property set or not.
     * @param definitionIdFilter - A comma-delimited list of release definitions to retrieve.
     * @param isDeleted - 'true' to get release definitions that has been deleted. Default is 'false'
     * @param searchTextContainsFolderName - 'true' to get the release definitions under the folder with name as specified in searchText. Default is 'false'.
     */
    public async getReleaseDefinitions(
        project: string,
        searchText?: string,
        expand?: Release.ReleaseDefinitionExpands,
        artifactType?: string,
        artifactSourceId?: string,
        top?: number,
        continuationToken?: string,
        queryOrder?: Release.ReleaseDefinitionQueryOrder,
        path?: string,
        isExactNameMatch?: boolean,
        tagFilter?: string[],
        propertyFilters?: string[],
        definitionIdFilter?: string[],
        isDeleted?: boolean,
        searchTextContainsFolderName?: boolean
        ): Promise<Release.ReleaseDefinition[]> {

        const queryValues: any = {
            searchText: searchText,
            '$expand': expand,
            artifactType: artifactType,
            artifactSourceId: artifactSourceId,
            '$top': top,
            continuationToken: continuationToken,
            queryOrder: queryOrder,
            path: path,
            isExactNameMatch: isExactNameMatch,
            tagFilter: tagFilter && tagFilter.join(","),
            propertyFilters: propertyFilters && propertyFilters.join(","),
            definitionIdFilter: definitionIdFilter && definitionIdFilter.join(","),
            isDeleted: isDeleted,
            searchTextContainsFolderName: searchTextContainsFolderName
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.4",
            routeTemplate: "{project}/_apis/Release/definitions/{definitionId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <Release.ReleaseDefinition[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Undelete a release definition.
     * 
     * @param releaseDefinitionUndeleteParameter - Object for undelete release definition.
     * @param project - Project ID or project name
     * @param definitionId - Id of the release definition to be undeleted
     */
    public async undeleteReleaseDefinition(
        releaseDefinitionUndeleteParameter: Release.ReleaseDefinitionUndeleteParameter,
        project: string,
        definitionId: number
        ): Promise<Release.ReleaseDefinition> {

        return this.beginRequest<Release.ReleaseDefinition>({
            apiVersion: "7.1-preview.4",
            method: "PATCH",
            routeTemplate: "{project}/_apis/Release/definitions/{definitionId}",
            routeValues: {
                project: project,
                definitionId: definitionId
            },
            body: releaseDefinitionUndeleteParameter
        });
    }

    /**
     * Update a release definition.
     * 
     * @param releaseDefinition - Release definition object to update.
     * @param project - Project ID or project name
     */
    public async updateReleaseDefinition(
        releaseDefinition: Release.ReleaseDefinition,
        project: string
        ): Promise<Release.ReleaseDefinition> {

        return this.beginRequest<Release.ReleaseDefinition>({
            apiVersion: "7.1-preview.4",
            method: "PUT",
            routeTemplate: "{project}/_apis/Release/definitions/{definitionId}",
            routeValues: {
                project: project
            },
            body: releaseDefinition
        });
    }

    /**
     * @param project - Project ID or project name
     * @param definitionId - 
     * @param definitionEnvironmentId - 
     * @param createdBy - 
     * @param minModifiedTime - 
     * @param maxModifiedTime - 
     * @param deploymentStatus - 
     * @param operationStatus - 
     * @param latestAttemptsOnly - 
     * @param queryOrder - 
     * @param top - 
     * @param continuationToken - 
     * @param createdFor - 
     * @param minStartedTime - 
     * @param maxStartedTime - 
     * @param sourceBranch - 
     */
    public async getDeployments(
        project: string,
        definitionId?: number,
        definitionEnvironmentId?: number,
        createdBy?: string,
        minModifiedTime?: Date,
        maxModifiedTime?: Date,
        deploymentStatus?: Release.DeploymentStatus,
        operationStatus?: Release.DeploymentOperationStatus,
        latestAttemptsOnly?: boolean,
        queryOrder?: Release.ReleaseQueryOrder,
        top?: number,
        continuationToken?: number,
        createdFor?: string,
        minStartedTime?: Date,
        maxStartedTime?: Date,
        sourceBranch?: string
        ): Promise<Release.Deployment[]> {

        const queryValues: any = {
            definitionId: definitionId,
            definitionEnvironmentId: definitionEnvironmentId,
            createdBy: createdBy,
            minModifiedTime: minModifiedTime,
            maxModifiedTime: maxModifiedTime,
            deploymentStatus: deploymentStatus,
            operationStatus: operationStatus,
            latestAttemptsOnly: latestAttemptsOnly,
            queryOrder: queryOrder,
            '$top': top,
            continuationToken: continuationToken,
            createdFor: createdFor,
            minStartedTime: minStartedTime,
            maxStartedTime: maxStartedTime,
            sourceBranch: sourceBranch
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/Release/deployments",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <Release.Deployment[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * @param queryParameters - 
     * @param project - Project ID or project name
     */
    public async getDeploymentsForMultipleEnvironments(
        queryParameters: Release.DeploymentQueryParameters,
        project: string
        ): Promise<Release.Deployment[]> {

        return this.beginRequest<Release.Deployment[]>({
            apiVersion: "7.1-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/Release/deployments",
            routeValues: {
                project: project
            },
            body: queryParameters
        });
    }

    /**
     * Get a release environment.
     * 
     * @param project - Project ID or project name
     * @param releaseId - Id of the release.
     * @param environmentId - Id of the release environment.
     * @param expand - A property that should be expanded in the environment.
     */
    public async getReleaseEnvironment(
        project: string,
        releaseId: number,
        environmentId: number,
        expand?: Release.ReleaseEnvironmentExpands
        ): Promise<Release.ReleaseEnvironment> {

        const queryValues: any = {
            '$expand': expand
        };

        return this.beginRequest<Release.ReleaseEnvironment>({
            apiVersion: "7.1-preview.7",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/environments/{environmentId}",
            routeValues: {
                project: project,
                releaseId: releaseId,
                environmentId: environmentId
            },
            queryParams: queryValues
        });
    }

    /**
     * Update the status of a release environment
     * 
     * @param environmentUpdateData - Environment update meta data.
     * @param project - Project ID or project name
     * @param releaseId - Id of the release.
     * @param environmentId - Id of release environment.
     */
    public async updateReleaseEnvironment(
        environmentUpdateData: Release.ReleaseEnvironmentUpdateMetadata,
        project: string,
        releaseId: number,
        environmentId: number
        ): Promise<Release.ReleaseEnvironment> {

        return this.beginRequest<Release.ReleaseEnvironment>({
            apiVersion: "7.1-preview.7",
            method: "PATCH",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/environments/{environmentId}",
            routeValues: {
                project: project,
                releaseId: releaseId,
                environmentId: environmentId
            },
            body: environmentUpdateData
        });
    }

    /**
     * Creates a definition environment template
     * 
     * @param template - Definition environment template to create
     * @param project - Project ID or project name
     */
    public async createDefinitionEnvironmentTemplate(
        template: Release.ReleaseDefinitionEnvironmentTemplate,
        project: string
        ): Promise<Release.ReleaseDefinitionEnvironmentTemplate> {

        return this.beginRequest<Release.ReleaseDefinitionEnvironmentTemplate>({
            apiVersion: "7.1-preview.4",
            method: "POST",
            routeTemplate: "{project}/_apis/Release/definitions/environmenttemplates",
            routeValues: {
                project: project
            },
            body: template
        });
    }

    /**
     * Delete a definition environment template
     * 
     * @param project - Project ID or project name
     * @param templateId - Id of the definition environment template
     */
    public async deleteDefinitionEnvironmentTemplate(
        project: string,
        templateId: string
        ): Promise<void> {

        const queryValues: any = {
            templateId: templateId
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.4",
            method: "DELETE",
            routeTemplate: "{project}/_apis/Release/definitions/environmenttemplates",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets a definition environment template
     * 
     * @param project - Project ID or project name
     * @param templateId - Id of the definition environment template
     */
    public async getDefinitionEnvironmentTemplate(
        project: string,
        templateId: string
        ): Promise<Release.ReleaseDefinitionEnvironmentTemplate> {

        const queryValues: any = {
            templateId: templateId
        };

        return this.beginRequest<Release.ReleaseDefinitionEnvironmentTemplate>({
            apiVersion: "7.1-preview.4",
            routeTemplate: "{project}/_apis/Release/definitions/environmenttemplates",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets a list of definition environment templates
     * 
     * @param project - Project ID or project name
     * @param isDeleted - 'true' to get definition environment templates that have been deleted. Default is 'false'
     */
    public async listDefinitionEnvironmentTemplates(
        project: string,
        isDeleted?: boolean
        ): Promise<Release.ReleaseDefinitionEnvironmentTemplate[]> {

        const queryValues: any = {
            isDeleted: isDeleted
        };

        return this.beginRequest<Release.ReleaseDefinitionEnvironmentTemplate[]>({
            apiVersion: "7.1-preview.4",
            routeTemplate: "{project}/_apis/Release/definitions/environmenttemplates",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Undelete a release definition environment template.
     * 
     * @param project - Project ID or project name
     * @param templateId - Id of the definition environment template to be undeleted
     */
    public async undeleteReleaseDefinitionEnvironmentTemplate(
        project: string,
        templateId: string
        ): Promise<Release.ReleaseDefinitionEnvironmentTemplate> {

        const queryValues: any = {
            templateId: templateId
        };

        return this.beginRequest<Release.ReleaseDefinitionEnvironmentTemplate>({
            apiVersion: "7.1-preview.4",
            method: "PATCH",
            routeTemplate: "{project}/_apis/Release/definitions/environmenttemplates",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * @param favoriteItems - 
     * @param project - Project ID or project name
     * @param scope - 
     * @param identityId - 
     */
    public async createFavorites(
        favoriteItems: Release.FavoriteItem[],
        project: string,
        scope: string,
        identityId?: string
        ): Promise<Release.FavoriteItem[]> {

        const queryValues: any = {
            identityId: identityId
        };

        return this.beginRequest<Release.FavoriteItem[]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/Release/favorites/{scope}",
            routeValues: {
                project: project,
                scope: scope
            },
            queryParams: queryValues,
            body: favoriteItems
        });
    }

    /**
     * @param project - Project ID or project name
     * @param scope - 
     * @param identityId - 
     * @param favoriteItemIds - 
     */
    public async deleteFavorites(
        project: string,
        scope: string,
        identityId?: string,
        favoriteItemIds?: string
        ): Promise<void> {

        const queryValues: any = {
            identityId: identityId,
            favoriteItemIds: favoriteItemIds
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/Release/favorites/{scope}",
            routeValues: {
                project: project,
                scope: scope
            },
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     * @param scope - 
     * @param identityId - 
     */
    public async getFavorites(
        project: string,
        scope: string,
        identityId?: string
        ): Promise<Release.FavoriteItem[]> {

        const queryValues: any = {
            identityId: identityId
        };

        return this.beginRequest<Release.FavoriteItem[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Release/favorites/{scope}",
            routeValues: {
                project: project,
                scope: scope
            },
            queryParams: queryValues
        });
    }

    /**
     * @param flightName - 
     */
    public async getFlightAssignments(
        flightName?: string
        ): Promise<string[]> {

        const queryValues: any = {
            flightName: flightName
        };

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/Release/flightAssignments",
            queryParams: queryValues
        });
    }

    /**
     * Creates a new folder.
     * 
     * @param folder - folder.
     * @param project - Project ID or project name
     * @param path - Path of the folder.
     */
    public async createFolder(
        folder: Release.Folder,
        project: string,
        path?: string
        ): Promise<Release.Folder> {

        return this.beginRequest<Release.Folder>({
            apiVersion: "7.1-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/Release/folders/{*path}",
            routeValues: {
                project: project,
                path: path
            },
            body: folder
        });
    }

    /**
     * Deletes a definition folder for given folder name and path and all it's existing definitions.
     * 
     * @param project - Project ID or project name
     * @param path - Path of the folder to delete.
     */
    public async deleteFolder(
        project: string,
        path: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.2",
            method: "DELETE",
            routeTemplate: "{project}/_apis/Release/folders/{*path}",
            routeValues: {
                project: project,
                path: path
            }
        });
    }

    /**
     * Gets folders.
     * 
     * @param project - Project ID or project name
     * @param path - Path of the folder.
     * @param queryOrder - Gets the results in the defined order. Default is 'None'.
     */
    public async getFolders(
        project: string,
        path?: string,
        queryOrder?: Release.FolderPathQueryOrder
        ): Promise<Release.Folder[]> {

        const queryValues: any = {
            queryOrder: queryOrder
        };

        return this.beginRequest<Release.Folder[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/Release/folders/{*path}",
            routeValues: {
                project: project,
                path: path
            },
            queryParams: queryValues
        });
    }

    /**
     * Updates an existing folder at given existing path.
     * 
     * @param folder - folder.
     * @param project - Project ID or project name
     * @param path - Path of the folder to update.
     */
    public async updateFolder(
        folder: Release.Folder,
        project: string,
        path: string
        ): Promise<Release.Folder> {

        return this.beginRequest<Release.Folder>({
            apiVersion: "7.1-preview.2",
            method: "PATCH",
            routeTemplate: "{project}/_apis/Release/folders/{*path}",
            routeValues: {
                project: project,
                path: path
            },
            body: folder
        });
    }

    /**
     * Updates the gate for a deployment.
     * 
     * @param gateUpdateMetadata - Metadata to patch the Release Gates.
     * @param project - Project ID or project name
     * @param gateStepId - Gate step Id.
     */
    public async updateGates(
        gateUpdateMetadata: Release.GateUpdateMetadata,
        project: string,
        gateStepId: number
        ): Promise<Release.ReleaseGates> {

        return this.beginRequest<Release.ReleaseGates>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/Release/gates/{gateStepId}",
            routeValues: {
                project: project,
                gateStepId: gateStepId
            },
            body: gateUpdateMetadata
        });
    }

    /**
     * @param project - Project ID or project name
     * @param releaseId - 
     */
    public async getReleaseHistory(
        project: string,
        releaseId: number
        ): Promise<Release.ReleaseRevision[]> {

        return this.beginRequest<Release.ReleaseRevision[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/history",
            routeValues: {
                project: project,
                releaseId: releaseId
            }
        });
    }

    /**
     * @param query - 
     * @param project - Project ID or project name
     */
    public async getInputValues(
        query: FormInput.InputValuesQuery,
        project: string
        ): Promise<FormInput.InputValuesQuery> {

        return this.beginRequest<FormInput.InputValuesQuery>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/Release/artifacts/inputvaluesquery",
            routeValues: {
                project: project
            },
            body: query
        });
    }

    /**
     * @param project - Project ID or project name
     * @param buildId - 
     * @param sourceId - 
     */
    public async getIssues(
        project: string,
        buildId: number,
        sourceId?: string
        ): Promise<Release.AutoTriggerIssue[]> {

        const queryValues: any = {
            sourceId: sourceId
        };

        return this.beginRequest<Release.AutoTriggerIssue[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Release/issues/{buildId}",
            routeValues: {
                project: project,
                buildId: buildId
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets gate logs
     * 
     * @param project - Project ID or project name
     * @param releaseId - Id of the release.
     * @param environmentId - Id of release environment.
     * @param gateId - Id of the gate.
     * @param taskId - ReleaseTask Id for the log.
     */
    public async getGateLog(
        project: string,
        releaseId: number,
        environmentId: number,
        gateId: number,
        taskId: number
        ): Promise<string> {

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.2",
            httpResponseType: "text/plain",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/environments/{environmentId}/gates/{gateId}/tasks/{taskId}/logs",
            routeValues: {
                project: project,
                releaseId: releaseId,
                environmentId: environmentId,
                gateId: gateId,
                taskId: taskId
            }
        });
    }

    /**
     * Get logs for a release Id.
     * 
     * @param project - Project ID or project name
     * @param releaseId - Id of the release.
     */
    public async getLogs(
        project: string,
        releaseId: number
        ): Promise<ArrayBuffer> {

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.2",
            httpResponseType: "application/zip",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/logs",
            routeValues: {
                project: project,
                releaseId: releaseId
            }
        });
    }

    /**
     * Gets logs
     * 
     * @param project - Project ID or project name
     * @param releaseId - Id of the release.
     * @param environmentId - Id of release environment.
     * @param taskId - ReleaseTask Id for the log.
     * @param attemptId - Id of the attempt.
     */
    public async getLog(
        project: string,
        releaseId: number,
        environmentId: number,
        taskId: number,
        attemptId?: number
        ): Promise<string> {

        const queryValues: any = {
            attemptId: attemptId
        };

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.2",
            httpResponseType: "text/plain",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/environments/{environmentId}/tasks/{taskId}/logs",
            routeValues: {
                project: project,
                releaseId: releaseId,
                environmentId: environmentId,
                taskId: taskId
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets the task log of a release as a plain text file.
     * 
     * @param project - Project ID or project name
     * @param releaseId - Id of the release.
     * @param environmentId - Id of release environment.
     * @param attemptId - 
     * @param timelineId - 
     * @param taskId - ReleaseTask Id for the log.
     * @param startLine - Starting line number for logs
     * @param endLine - Ending line number for logs
     */
    public async getTaskLog2(
        project: string,
        releaseId: number,
        environmentId: number,
        attemptId: number,
        timelineId: string,
        taskId: number,
        startLine?: number,
        endLine?: number
        ): Promise<string> {

        const queryValues: any = {
            startLine: startLine,
            endLine: endLine
        };

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.2",
            httpResponseType: "text/plain",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/environments/{environmentId}/attempts/{attemptId}/timelines/{timelineId}/tasks/{taskId}/logs",
            routeValues: {
                project: project,
                releaseId: releaseId,
                environmentId: environmentId,
                attemptId: attemptId,
                timelineId: timelineId,
                taskId: taskId
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets the task log of a release as a plain text file.
     * 
     * @param project - Project ID or project name
     * @param releaseId - Id of the release.
     * @param environmentId - Id of release environment.
     * @param releaseDeployPhaseId - Release deploy phase Id.
     * @param taskId - ReleaseTask Id for the log.
     * @param startLine - Starting line number for logs
     * @param endLine - Ending line number for logs
     */
    public async getTaskLog(
        project: string,
        releaseId: number,
        environmentId: number,
        releaseDeployPhaseId: number,
        taskId: number,
        startLine?: number,
        endLine?: number
        ): Promise<string> {

        const queryValues: any = {
            startLine: startLine,
            endLine: endLine
        };

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.2",
            httpResponseType: "text/plain",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/environments/{environmentId}/deployPhases/{releaseDeployPhaseId}/tasks/{taskId}/logs",
            routeValues: {
                project: project,
                releaseId: releaseId,
                environmentId: environmentId,
                releaseDeployPhaseId: releaseDeployPhaseId,
                taskId: taskId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get manual intervention for a given release and manual intervention id.
     * 
     * @param project - Project ID or project name
     * @param releaseId - Id of the release.
     * @param manualInterventionId - Id of the manual intervention.
     */
    public async getManualIntervention(
        project: string,
        releaseId: number,
        manualInterventionId: number
        ): Promise<Release.ManualIntervention> {

        return this.beginRequest<Release.ManualIntervention>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/manualInterventions/{manualInterventionId}",
            routeValues: {
                project: project,
                releaseId: releaseId,
                manualInterventionId: manualInterventionId
            }
        });
    }

    /**
     * List all manual interventions for a given release.
     * 
     * @param project - Project ID or project name
     * @param releaseId - Id of the release.
     */
    public async getManualInterventions(
        project: string,
        releaseId: number
        ): Promise<Release.ManualIntervention[]> {

        return this.beginRequest<Release.ManualIntervention[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/manualInterventions/{manualInterventionId}",
            routeValues: {
                project: project,
                releaseId: releaseId
            }
        });
    }

    /**
     * Update manual intervention.
     * 
     * @param manualInterventionUpdateMetadata - Meta data to update manual intervention.
     * @param project - Project ID or project name
     * @param releaseId - Id of the release.
     * @param manualInterventionId - Id of the manual intervention.
     */
    public async updateManualIntervention(
        manualInterventionUpdateMetadata: Release.ManualInterventionUpdateMetadata,
        project: string,
        releaseId: number,
        manualInterventionId: number
        ): Promise<Release.ManualIntervention> {

        return this.beginRequest<Release.ManualIntervention>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/manualInterventions/{manualInterventionId}",
            routeValues: {
                project: project,
                releaseId: releaseId,
                manualInterventionId: manualInterventionId
            },
            body: manualInterventionUpdateMetadata
        });
    }

    /**
     * @param project - Project ID or project name
     * @param minMetricsTime - 
     */
    public async getMetrics(
        project: string,
        minMetricsTime?: Date
        ): Promise<Release.Metric[]> {

        const queryValues: any = {
            minMetricsTime: minMetricsTime
        };

        return this.beginRequest<Release.Metric[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Release/metrics",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets Org pipeline release settings
     * 
     */
    public async getOrgPipelineReleaseSettings(
        ): Promise<Release.OrgPipelineReleaseSettings> {

        return this.beginRequest<Release.OrgPipelineReleaseSettings>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/Release/orgPipelineReleaseSettings"
        });
    }

    /**
     * Updates Org pipeline release settings
     * 
     * @param newSettings - 
     */
    public async updateOrgPipelineReleaseSettings(
        newSettings: Release.OrgPipelineReleaseSettingsUpdateParameters
        ): Promise<Release.OrgPipelineReleaseSettings> {

        return this.beginRequest<Release.OrgPipelineReleaseSettings>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/Release/orgPipelineReleaseSettings",
            body: newSettings
        });
    }

    /**
     * Gets pipeline release settings
     * 
     * @param project - Project ID or project name
     */
    public async getPipelineReleaseSettings(
        project: string
        ): Promise<Release.ProjectPipelineReleaseSettings> {

        return this.beginRequest<Release.ProjectPipelineReleaseSettings>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Release/pipelineReleaseSettings",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * Updates pipeline release settings
     * 
     * @param newSettings - 
     * @param project - Project ID or project name
     */
    public async updatePipelineReleaseSettings(
        newSettings: Release.ProjectPipelineReleaseSettingsUpdateParameters,
        project: string
        ): Promise<Release.ProjectPipelineReleaseSettings> {

        return this.beginRequest<Release.ProjectPipelineReleaseSettings>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/Release/pipelineReleaseSettings",
            routeValues: {
                project: project
            },
            body: newSettings
        });
    }

    /**
     * @param artifactType - 
     * @param artifactSourceId - 
     */
    public async getReleaseProjects(
        artifactType: string,
        artifactSourceId: string
        ): Promise<Release.ProjectReference[]> {

        const queryValues: any = {
            artifactType: artifactType,
            artifactSourceId: artifactSourceId
        };

        return this.beginRequest<Release.ProjectReference[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/Release/projects",
            queryParams: queryValues
        });
    }

    /**
     * Get a list of releases
     * 
     * @param project - Project ID or project name
     * @param definitionId - Releases from this release definition Id.
     * @param definitionEnvironmentId - 
     * @param searchText - Releases with names containing searchText.
     * @param createdBy - Releases created by this user.
     * @param statusFilter - Releases that have this status.
     * @param environmentStatusFilter - 
     * @param minCreatedTime - Releases that were created after this time.
     * @param maxCreatedTime - Releases that were created before this time.
     * @param queryOrder - Gets the results in the defined order of created date for releases. Default is descending.
     * @param top - Number of releases to get. Default is 50.
     * @param continuationToken - Gets the releases after the continuation token provided.
     * @param expand - The property that should be expanded in the list of releases.
     * @param artifactTypeId - Releases with given artifactTypeId will be returned. Values can be Build, Jenkins, GitHub, Nuget, Team Build (external), ExternalTFSBuild, Git, TFVC, ExternalTfsXamlBuild.
     * @param sourceId - Unique identifier of the artifact used. e.g. For build it would be \{projectGuid\}:\{BuildDefinitionId\}, for Jenkins it would be \{JenkinsConnectionId\}:\{JenkinsDefinitionId\}, for TfsOnPrem it would be \{TfsOnPremConnectionId\}:\{ProjectName\}:\{TfsOnPremDefinitionId\}. For third-party artifacts e.g. TeamCity, BitBucket you may refer 'uniqueSourceIdentifier' inside vss-extension.json https://github.com/Microsoft/vsts-rm-extensions/blob/master/Extensions.
     * @param artifactVersionId - Releases with given artifactVersionId will be returned. E.g. in case of Build artifactType, it is buildId.
     * @param sourceBranchFilter - Releases with given sourceBranchFilter will be returned.
     * @param isDeleted - Gets the soft deleted releases, if true.
     * @param tagFilter - A comma-delimited list of tags. Only releases with these tags will be returned.
     * @param propertyFilters - A comma-delimited list of extended properties to be retrieved. If set, the returned Releases will contain values for the specified property Ids (if they exist). If not set, properties will not be included. Note that this will not filter out any Release from results irrespective of whether it has property set or not.
     * @param releaseIdFilter - A comma-delimited list of releases Ids. Only releases with these Ids will be returned.
     * @param path - Releases under this folder path will be returned
     */
    public async getReleases(
        project?: string,
        definitionId?: number,
        definitionEnvironmentId?: number,
        searchText?: string,
        createdBy?: string,
        statusFilter?: Release.ReleaseStatus,
        environmentStatusFilter?: number,
        minCreatedTime?: Date,
        maxCreatedTime?: Date,
        queryOrder?: Release.ReleaseQueryOrder,
        top?: number,
        continuationToken?: number,
        expand?: Release.ReleaseExpands,
        artifactTypeId?: string,
        sourceId?: string,
        artifactVersionId?: string,
        sourceBranchFilter?: string,
        isDeleted?: boolean,
        tagFilter?: string[],
        propertyFilters?: string[],
        releaseIdFilter?: number[],
        path?: string
        ): Promise<Release.Release[]> {

        const queryValues: any = {
            definitionId: definitionId,
            definitionEnvironmentId: definitionEnvironmentId,
            searchText: searchText,
            createdBy: createdBy,
            statusFilter: statusFilter,
            environmentStatusFilter: environmentStatusFilter,
            minCreatedTime: minCreatedTime,
            maxCreatedTime: maxCreatedTime,
            queryOrder: queryOrder,
            '$top': top,
            continuationToken: continuationToken,
            '$expand': expand,
            artifactTypeId: artifactTypeId,
            sourceId: sourceId,
            artifactVersionId: artifactVersionId,
            sourceBranchFilter: sourceBranchFilter,
            isDeleted: isDeleted,
            tagFilter: tagFilter && tagFilter.join(","),
            propertyFilters: propertyFilters && propertyFilters.join(","),
            releaseIdFilter: releaseIdFilter && releaseIdFilter.join(","),
            path: path
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.8",
            routeTemplate: "{project}/_apis/Release/releases",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <Release.Release[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Create a release.
     * 
     * @param releaseStartMetadata - Metadata to create a release.
     * @param project - Project ID or project name
     */
    public async createRelease(
        releaseStartMetadata: Release.ReleaseStartMetadata,
        project: string
        ): Promise<Release.Release> {

        return this.beginRequest<Release.Release>({
            apiVersion: "7.1-preview.8",
            method: "POST",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}",
            routeValues: {
                project: project
            },
            body: releaseStartMetadata
        });
    }

    /**
     * Soft delete a release
     * 
     * @param project - Project ID or project name
     * @param releaseId - Id of the release.
     * @param comment - Comment for deleting a release.
     */
    public async deleteRelease(
        project: string,
        releaseId: number,
        comment?: string
        ): Promise<void> {

        const queryValues: any = {
            comment: comment
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.8",
            method: "DELETE",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}",
            routeValues: {
                project: project,
                releaseId: releaseId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a Release
     * 
     * @param project - Project ID or project name
     * @param releaseId - Id of the release.
     * @param approvalFilters - A filter which would allow fetching approval steps selectively based on whether it is automated, or manual. This would also decide whether we should fetch pre and post approval snapshots. Assumes All by default
     * @param propertyFilters - A comma-delimited list of extended properties to be retrieved. If set, the returned Release will contain values for the specified property Ids (if they exist). If not set, properties will not be included.
     * @param expand - A property that should be expanded in the release.
     * @param topGateRecords - Number of release gate records to get. Default is 5.
     */
    public async getRelease(
        project: string,
        releaseId: number,
        approvalFilters?: Release.ApprovalFilters,
        propertyFilters?: string[],
        expand?: Release.SingleReleaseExpands,
        topGateRecords?: number
        ): Promise<Release.Release> {

        const queryValues: any = {
            approvalFilters: approvalFilters,
            propertyFilters: propertyFilters && propertyFilters.join(","),
            '$expand': expand,
            '$topGateRecords': topGateRecords
        };

        return this.beginRequest<Release.Release>({
            apiVersion: "7.1-preview.8",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}",
            routeValues: {
                project: project,
                releaseId: releaseId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get release summary of a given definition Id.
     * 
     * @param project - Project ID or project name
     * @param definitionId - Id of the definition to get release summary.
     * @param releaseCount - Count of releases to be included in summary.
     * @param includeArtifact - Include artifact details.Default is 'false'.
     * @param definitionEnvironmentIdsFilter - 
     */
    public async getReleaseDefinitionSummary(
        project: string,
        definitionId: number,
        releaseCount: number,
        includeArtifact?: boolean,
        definitionEnvironmentIdsFilter?: number[]
        ): Promise<Release.ReleaseDefinitionSummary> {

        const queryValues: any = {
            definitionId: definitionId,
            releaseCount: releaseCount,
            includeArtifact: includeArtifact,
            definitionEnvironmentIdsFilter: definitionEnvironmentIdsFilter && definitionEnvironmentIdsFilter.join(",")
        };

        return this.beginRequest<Release.ReleaseDefinitionSummary>({
            apiVersion: "7.1-preview.8",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Get release for a given revision number.
     * 
     * @param project - Project ID or project name
     * @param releaseId - Id of the release.
     * @param definitionSnapshotRevision - Definition snapshot revision number.
     */
    public async getReleaseRevision(
        project: string,
        releaseId: number,
        definitionSnapshotRevision: number
        ): Promise<string> {

        const queryValues: any = {
            definitionSnapshotRevision: definitionSnapshotRevision
        };

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.8",
            httpResponseType: "text/plain",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}",
            routeValues: {
                project: project,
                releaseId: releaseId
            },
            queryParams: queryValues
        });
    }

    /**
     * Undelete a soft deleted release.
     * 
     * @param project - Project ID or project name
     * @param releaseId - Id of release to be undeleted.
     * @param comment - Any comment for undeleting.
     */
    public async undeleteRelease(
        project: string,
        releaseId: number,
        comment: string
        ): Promise<void> {

        const queryValues: any = {
            comment: comment
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.8",
            method: "PUT",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}",
            routeValues: {
                project: project,
                releaseId: releaseId
            },
            queryParams: queryValues
        });
    }

    /**
     * Update a complete release object.
     * 
     * @param release - Release object for update.
     * @param project - Project ID or project name
     * @param releaseId - Id of the release to update.
     */
    public async updateRelease(
        release: Release.Release,
        project: string,
        releaseId: number
        ): Promise<Release.Release> {

        return this.beginRequest<Release.Release>({
            apiVersion: "7.1-preview.8",
            method: "PUT",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}",
            routeValues: {
                project: project,
                releaseId: releaseId
            },
            body: release
        });
    }

    /**
     * Update few properties of a release.
     * 
     * @param releaseUpdateMetadata - Properties of release to update.
     * @param project - Project ID or project name
     * @param releaseId - Id of the release to update.
     */
    public async updateReleaseResource(
        releaseUpdateMetadata: Release.ReleaseUpdateMetadata,
        project: string,
        releaseId: number
        ): Promise<Release.Release> {

        return this.beginRequest<Release.Release>({
            apiVersion: "7.1-preview.8",
            method: "PATCH",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}",
            routeValues: {
                project: project,
                releaseId: releaseId
            },
            body: releaseUpdateMetadata
        });
    }

    /**
     * Gets the release settings
     * 
     * @param project - Project ID or project name
     */
    public async getReleaseSettings(
        project: string
        ): Promise<Release.ReleaseSettings> {

        return this.beginRequest<Release.ReleaseSettings>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Release/releasesettings",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * Updates the release settings
     * 
     * @param releaseSettings - 
     * @param project - Project ID or project name
     */
    public async updateReleaseSettings(
        releaseSettings: Release.ReleaseSettings,
        project: string
        ): Promise<Release.ReleaseSettings> {

        return this.beginRequest<Release.ReleaseSettings>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "{project}/_apis/Release/releasesettings",
            routeValues: {
                project: project
            },
            body: releaseSettings
        });
    }

    /**
     * Get release definition for a given definitionId and revision
     * 
     * @param project - Project ID or project name
     * @param definitionId - Id of the definition.
     * @param revision - Id of the revision.
     */
    public async getDefinitionRevision(
        project: string,
        definitionId: number,
        revision: number
        ): Promise<string> {

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "text/plain",
            routeTemplate: "{project}/_apis/Release/definitions/{definitionId}/revisions/{revision}",
            routeValues: {
                project: project,
                definitionId: definitionId,
                revision: revision
            }
        });
    }

    /**
     * Get revision history for a release definition
     * 
     * @param project - Project ID or project name
     * @param definitionId - Id of the definition.
     */
    public async getReleaseDefinitionHistory(
        project: string,
        definitionId: number
        ): Promise<Release.ReleaseDefinitionRevision[]> {

        return this.beginRequest<Release.ReleaseDefinitionRevision[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Release/definitions/{definitionId}/revisions/{revision}",
            routeValues: {
                project: project,
                definitionId: definitionId
            }
        });
    }

    /**
     * @param project - Project ID or project name
     * @param releaseId - 
     */
    public async getSummaryMailSections(
        project: string,
        releaseId: number
        ): Promise<Release.SummaryMailSection[]> {

        return this.beginRequest<Release.SummaryMailSection[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Release/sendmail/{releaseId}",
            routeValues: {
                project: project,
                releaseId: releaseId
            }
        });
    }

    /**
     * @param mailMessage - 
     * @param project - Project ID or project name
     * @param releaseId - 
     */
    public async sendSummaryMail(
        mailMessage: Release.MailMessage,
        project: string,
        releaseId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/Release/sendmail/{releaseId}",
            routeValues: {
                project: project,
                releaseId: releaseId
            },
            body: mailMessage
        });
    }

    /**
     * @param project - Project ID or project name
     * @param definitionId - 
     */
    public async getSourceBranches(
        project: string,
        definitionId: number
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Release/definitions/{definitionId}/sourcebranches",
            routeValues: {
                project: project,
                definitionId: definitionId
            }
        });
    }

    /**
     * Adds a tag to a definition
     * 
     * @param project - Project ID or project name
     * @param releaseDefinitionId - 
     * @param tag - 
     */
    public async addDefinitionTag(
        project: string,
        releaseDefinitionId: number,
        tag: string
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/Release/definitions/{releaseDefinitionId}/tags/{*tag}",
            routeValues: {
                project: project,
                releaseDefinitionId: releaseDefinitionId,
                tag: tag
            }
        });
    }

    /**
     * Adds multiple tags to a definition
     * 
     * @param tags - 
     * @param project - Project ID or project name
     * @param releaseDefinitionId - 
     */
    public async addDefinitionTags(
        tags: string[],
        project: string,
        releaseDefinitionId: number
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/Release/definitions/{releaseDefinitionId}/tags/{*tag}",
            routeValues: {
                project: project,
                releaseDefinitionId: releaseDefinitionId
            },
            body: tags
        });
    }

    /**
     * Deletes a tag from a definition
     * 
     * @param project - Project ID or project name
     * @param releaseDefinitionId - 
     * @param tag - 
     */
    public async deleteDefinitionTag(
        project: string,
        releaseDefinitionId: number,
        tag: string
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/Release/definitions/{releaseDefinitionId}/tags/{*tag}",
            routeValues: {
                project: project,
                releaseDefinitionId: releaseDefinitionId,
                tag: tag
            }
        });
    }

    /**
     * Gets the tags for a definition
     * 
     * @param project - Project ID or project name
     * @param releaseDefinitionId - 
     */
    public async getDefinitionTags(
        project: string,
        releaseDefinitionId: number
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Release/definitions/{releaseDefinitionId}/tags/{*tag}",
            routeValues: {
                project: project,
                releaseDefinitionId: releaseDefinitionId
            }
        });
    }

    /**
     * Adds a tag to a releaseId
     * 
     * @param project - Project ID or project name
     * @param releaseId - 
     * @param tag - 
     */
    public async addReleaseTag(
        project: string,
        releaseId: number,
        tag: string
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/tags/{*tag}",
            routeValues: {
                project: project,
                releaseId: releaseId,
                tag: tag
            }
        });
    }

    /**
     * Adds tag to a release
     * 
     * @param tags - 
     * @param project - Project ID or project name
     * @param releaseId - 
     */
    public async addReleaseTags(
        tags: string[],
        project: string,
        releaseId: number
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/tags/{*tag}",
            routeValues: {
                project: project,
                releaseId: releaseId
            },
            body: tags
        });
    }

    /**
     * Deletes a tag from a release
     * 
     * @param project - Project ID or project name
     * @param releaseId - 
     * @param tag - 
     */
    public async deleteReleaseTag(
        project: string,
        releaseId: number,
        tag: string
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/tags/{*tag}",
            routeValues: {
                project: project,
                releaseId: releaseId,
                tag: tag
            }
        });
    }

    /**
     * Gets the tags for a release
     * 
     * @param project - Project ID or project name
     * @param releaseId - 
     */
    public async getReleaseTags(
        project: string,
        releaseId: number
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/tags/{*tag}",
            routeValues: {
                project: project,
                releaseId: releaseId
            }
        });
    }

    /**
     * @param project - Project ID or project name
     */
    public async getTags(
        project: string
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Release/tags",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * @param project - Project ID or project name
     * @param releaseId - 
     * @param environmentId - 
     * @param releaseDeployPhaseId - 
     */
    public async getTasksForTaskGroup(
        project: string,
        releaseId: number,
        environmentId: number,
        releaseDeployPhaseId: number
        ): Promise<Release.ReleaseTask[]> {

        return this.beginRequest<Release.ReleaseTask[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/environments/{environmentId}/deployPhases/{releaseDeployPhaseId}/tasks",
            routeValues: {
                project: project,
                releaseId: releaseId,
                environmentId: environmentId,
                releaseDeployPhaseId: releaseDeployPhaseId
            }
        });
    }

    /**
     * @param project - Project ID or project name
     * @param releaseId - 
     * @param environmentId - 
     * @param attemptId - 
     * @param timelineId - 
     */
    public async getTasks2(
        project: string,
        releaseId: number,
        environmentId: number,
        attemptId: number,
        timelineId: string
        ): Promise<Release.ReleaseTask[]> {

        return this.beginRequest<Release.ReleaseTask[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/environments/{environmentId}/attempts/{attemptId}/timelines/{timelineId}/tasks",
            routeValues: {
                project: project,
                releaseId: releaseId,
                environmentId: environmentId,
                attemptId: attemptId,
                timelineId: timelineId
            }
        });
    }

    /**
     * @param project - Project ID or project name
     * @param releaseId - 
     * @param environmentId - 
     * @param attemptId - 
     */
    public async getTasks(
        project: string,
        releaseId: number,
        environmentId: number,
        attemptId?: number
        ): Promise<Release.ReleaseTask[]> {

        const queryValues: any = {
            attemptId: attemptId
        };

        return this.beginRequest<Release.ReleaseTask[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/environments/{environmentId}/tasks",
            routeValues: {
                project: project,
                releaseId: releaseId,
                environmentId: environmentId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     */
    public async getArtifactTypeDefinitions(
        project: string
        ): Promise<Release.ArtifactTypeDefinition[]> {

        return this.beginRequest<Release.ArtifactTypeDefinition[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Release/artifacts/types",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * @param project - Project ID or project name
     * @param releaseDefinitionId - 
     */
    public async getArtifactVersions(
        project: string,
        releaseDefinitionId: number
        ): Promise<Release.ArtifactVersionQueryResult> {

        const queryValues: any = {
            releaseDefinitionId: releaseDefinitionId
        };

        return this.beginRequest<Release.ArtifactVersionQueryResult>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Release/artifacts/versions",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * @param artifacts - 
     * @param project - Project ID or project name
     */
    public async getArtifactVersionsForSources(
        artifacts: Release.Artifact[],
        project: string
        ): Promise<Release.ArtifactVersionQueryResult> {

        return this.beginRequest<Release.ArtifactVersionQueryResult>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/Release/artifacts/versions",
            routeValues: {
                project: project
            },
            body: artifacts
        });
    }

    /**
     * @param project - Project ID or project name
     * @param releaseId - 
     * @param baseReleaseId - 
     * @param top - 
     * @param artifactAlias - 
     */
    public async getReleaseWorkItemsRefs(
        project: string,
        releaseId: number,
        baseReleaseId?: number,
        top?: number,
        artifactAlias?: string
        ): Promise<Release.ReleaseWorkItemRef[]> {

        const queryValues: any = {
            baseReleaseId: baseReleaseId,
            '$top': top,
            artifactAlias: artifactAlias
        };

        return this.beginRequest<Release.ReleaseWorkItemRef[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Release/releases/{releaseId}/workitems",
            routeValues: {
                project: project,
                releaseId: releaseId
            },
            queryParams: queryValues
        });
    }

}
