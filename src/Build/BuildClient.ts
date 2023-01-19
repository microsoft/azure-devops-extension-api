/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import { deserializeVssJsonObject } from "../Common/Util/Serialization";

import * as Build from "../Build/Build";
import * as WebApi from "../WebApi/WebApi";

export class BuildRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "965220d5-5bb9-42cf-8d67-9b146df2a5a4";

    /**
     * Associates an artifact with a build.
     * 
     * @param artifact - The artifact.
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     */
    public async createArtifact(
        artifact: Build.BuildArtifact,
        project: string,
        buildId: number
        ): Promise<Build.BuildArtifact> {

        return this.beginRequest<Build.BuildArtifact>({
            apiVersion: "7.1-preview.5",
            method: "POST",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/artifacts/{artifactName}",
            routeValues: {
                project: project,
                buildId: buildId
            },
            body: artifact
        });
    }

    /**
     * Gets a specific artifact for a build.
     * 
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param artifactName - The name of the artifact.
     */
    public async getArtifact(
        project: string,
        buildId: number,
        artifactName: string
        ): Promise<Build.BuildArtifact> {

        const queryValues: any = {
            artifactName: artifactName
        };

        return this.beginRequest<Build.BuildArtifact>({
            apiVersion: "7.1-preview.5",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/artifacts/{artifactName}",
            routeValues: {
                project: project,
                buildId: buildId
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets a specific artifact for a build.
     * 
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param artifactName - The name of the artifact.
     */
    public async getArtifactContentZip(
        project: string,
        buildId: number,
        artifactName: string
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            artifactName: artifactName
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.5",
            httpResponseType: "application/zip",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/artifacts/{artifactName}",
            routeValues: {
                project: project,
                buildId: buildId
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets all artifacts for a build.
     * 
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     */
    public async getArtifacts(
        project: string,
        buildId: number
        ): Promise<Build.BuildArtifact[]> {

        return this.beginRequest<Build.BuildArtifact[]>({
            apiVersion: "7.1-preview.5",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/artifacts/{artifactName}",
            routeValues: {
                project: project,
                buildId: buildId
            }
        });
    }

    /**
     * Gets a file from the build.
     * 
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param artifactName - The name of the artifact.
     * @param fileId - The primary key for the file.
     * @param fileName - The name that the file will be set to.
     */
    public async getFile(
        project: string,
        buildId: number,
        artifactName: string,
        fileId: string,
        fileName: string
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            artifactName: artifactName,
            fileId: fileId,
            fileName: fileName
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.5",
            httpResponseType: "application/octet-stream",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/artifacts/{artifactName}",
            routeValues: {
                project: project,
                buildId: buildId
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets the list of attachments of a specific type that are associated with a build.
     * 
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param type - The type of attachment.
     */
    public async getAttachments(
        project: string,
        buildId: number,
        type: string
        ): Promise<Build.Attachment[]> {

        return this.beginRequest<Build.Attachment[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/attachments/{type}",
            routeValues: {
                project: project,
                buildId: buildId,
                type: type
            }
        });
    }

    /**
     * Gets a specific attachment.
     * 
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param timelineId - The ID of the timeline.
     * @param recordId - The ID of the timeline record.
     * @param type - The type of the attachment.
     * @param name - The name of the attachment.
     */
    public async getAttachment(
        project: string,
        buildId: number,
        timelineId: string,
        recordId: string,
        type: string,
        name: string
        ): Promise<ArrayBuffer> {

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.2",
            httpResponseType: "application/octet-stream",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/{timelineId}/{recordId}/attachments/{type}/{name}",
            routeValues: {
                project: project,
                buildId: buildId,
                timelineId: timelineId,
                recordId: recordId,
                type: type,
                name: name
            }
        });
    }

    /**
     * @param resources - 
     * @param project - Project ID or project name
     */
    public async authorizeProjectResources(
        resources: Build.DefinitionResourceReference[],
        project: string
        ): Promise<Build.DefinitionResourceReference[]> {

        return this.beginRequest<Build.DefinitionResourceReference[]>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/build/authorizedresources",
            routeValues: {
                project: project
            },
            body: resources
        });
    }

    /**
     * @param project - Project ID or project name
     * @param type - 
     * @param id - 
     */
    public async getProjectResources(
        project: string,
        type?: string,
        id?: string
        ): Promise<Build.DefinitionResourceReference[]> {

        const queryValues: any = {
            type: type,
            id: id
        };

        return this.beginRequest<Build.DefinitionResourceReference[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/build/authorizedresources",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets a badge that indicates the status of the most recent build for a definition. Note that this API is deprecated. Prefer StatusBadgeController.GetStatusBadge.
     * 
     * @param project - The project ID or name.
     * @param definitionId - The ID of the definition.
     * @param branchName - The name of the branch.
     */
    public async getBadge(
        project: string,
        definitionId: number,
        branchName?: string
        ): Promise<string> {

        const queryValues: any = {
            branchName: branchName
        };

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/public/build/definitions/{project}/{definitionId}/badge",
            routeValues: {
                project: project,
                definitionId: definitionId
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets a list of branches for the given source code repository.
     * 
     * @param project - Project ID or project name
     * @param providerName - The name of the source provider.
     * @param serviceEndpointId - If specified, the ID of the service endpoint to query. Can only be omitted for providers that do not use service endpoints, e.g. TFVC or TFGit.
     * @param repository - The vendor-specific identifier or the name of the repository to get branches. Can only be omitted for providers that do not support multiple repositories.
     * @param branchName - If supplied, the name of the branch to check for specifically.
     */
    public async listBranches(
        project: string,
        providerName: string,
        serviceEndpointId?: string,
        repository?: string,
        branchName?: string
        ): Promise<string[]> {

        const queryValues: any = {
            serviceEndpointId: serviceEndpointId,
            repository: repository,
            branchName: branchName
        };

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/sourceProviders/{providerName}/branches",
            routeValues: {
                project: project,
                providerName: providerName
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets a badge that indicates the status of the most recent build for the specified branch.
     * 
     * @param project - Project ID or project name
     * @param repoType - The repository type.
     * @param repoId - The repository ID.
     * @param branchName - The branch name.
     */
    public async getBuildBadge(
        project: string,
        repoType: string,
        repoId?: string,
        branchName?: string
        ): Promise<Build.BuildBadge> {

        const queryValues: any = {
            repoId: repoId,
            branchName: branchName
        };

        return this.beginRequest<Build.BuildBadge>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/build/repos/{repoType}/badge",
            routeValues: {
                project: project,
                repoType: repoType
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets a badge that indicates the status of the most recent build for the specified branch.
     * 
     * @param project - Project ID or project name
     * @param repoType - The repository type.
     * @param repoId - The repository ID.
     * @param branchName - The branch name.
     */
    public async getBuildBadgeData(
        project: string,
        repoType: string,
        repoId?: string,
        branchName?: string
        ): Promise<string> {

        const queryValues: any = {
            repoId: repoId,
            branchName: branchName
        };

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/build/repos/{repoType}/badge",
            routeValues: {
                project: project,
                repoType: repoType
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets all retention leases that apply to a specific build.
     * 
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     */
    public async getRetentionLeasesForBuild(
        project: string,
        buildId: number
        ): Promise<Build.RetentionLease[]> {

        return this.beginRequest<Build.RetentionLease[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/leases",
            routeValues: {
                project: project,
                buildId: buildId
            }
        });
    }

    /**
     * Deletes a build.
     * 
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     */
    public async deleteBuild(
        project: string,
        buildId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.7",
            method: "DELETE",
            routeTemplate: "{project}/_apis/build/builds/{buildId}",
            routeValues: {
                project: project,
                buildId: buildId
            }
        });
    }

    /**
     * Gets a build
     * 
     * @param project - Project ID or project name
     * @param buildId - 
     * @param propertyFilters - 
     */
    public async getBuild(
        project: string,
        buildId: number,
        propertyFilters?: string
        ): Promise<Build.Build> {

        const queryValues: any = {
            propertyFilters: propertyFilters
        };

        return this.beginRequest<Build.Build>({
            apiVersion: "7.1-preview.7",
            routeTemplate: "{project}/_apis/build/builds/{buildId}",
            routeValues: {
                project: project,
                buildId: buildId
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets a list of builds.
     * 
     * @param project - Project ID or project name
     * @param definitions - A comma-delimited list of definition IDs. If specified, filters to builds for these definitions.
     * @param queues - A comma-delimited list of queue IDs. If specified, filters to builds that ran against these queues.
     * @param buildNumber - If specified, filters to builds that match this build number. Append * to do a prefix search.
     * @param minTime - If specified, filters to builds that finished/started/queued after this date based on the queryOrder specified.
     * @param maxTime - If specified, filters to builds that finished/started/queued before this date based on the queryOrder specified.
     * @param requestedFor - If specified, filters to builds requested for the specified user.
     * @param reasonFilter - If specified, filters to builds that match this reason.
     * @param statusFilter - If specified, filters to builds that match this status.
     * @param resultFilter - If specified, filters to builds that match this result.
     * @param tagFilters - A comma-delimited list of tags. If specified, filters to builds that have the specified tags.
     * @param properties - A comma-delimited list of properties to retrieve.
     * @param top - The maximum number of builds to return.
     * @param continuationToken - A continuation token, returned by a previous call to this method, that can be used to return the next set of builds.
     * @param maxBuildsPerDefinition - The maximum number of builds to return per definition.
     * @param deletedFilter - Indicates whether to exclude, include, or only return deleted builds.
     * @param queryOrder - The order in which builds should be returned.
     * @param branchName - If specified, filters to builds that built branches that built this branch.
     * @param buildIds - A comma-delimited list that specifies the IDs of builds to retrieve.
     * @param repositoryId - If specified, filters to builds that built from this repository.
     * @param repositoryType - If specified, filters to builds that built from repositories of this type.
     */
    public async getBuilds(
        project: string,
        definitions?: number[],
        queues?: number[],
        buildNumber?: string,
        minTime?: Date,
        maxTime?: Date,
        requestedFor?: string,
        reasonFilter?: Build.BuildReason,
        statusFilter?: Build.BuildStatus,
        resultFilter?: Build.BuildResult,
        tagFilters?: string[],
        properties?: string[],
        top?: number,
        continuationToken?: string,
        maxBuildsPerDefinition?: number,
        deletedFilter?: Build.QueryDeletedOption,
        queryOrder?: Build.BuildQueryOrder,
        branchName?: string,
        buildIds?: number[],
        repositoryId?: string,
        repositoryType?: string
        ): Promise<Build.Build[]> {

        const queryValues: any = {
            definitions: definitions && definitions.join(","),
            queues: queues && queues.join(","),
            buildNumber: buildNumber,
            minTime: minTime,
            maxTime: maxTime,
            requestedFor: requestedFor,
            reasonFilter: reasonFilter,
            statusFilter: statusFilter,
            resultFilter: resultFilter,
            tagFilters: tagFilters && tagFilters.join(","),
            properties: properties && properties.join(","),
            '$top': top,
            continuationToken: continuationToken,
            maxBuildsPerDefinition: maxBuildsPerDefinition,
            deletedFilter: deletedFilter,
            queryOrder: queryOrder,
            branchName: branchName,
            buildIds: buildIds && buildIds.join(","),
            repositoryId: repositoryId,
            repositoryType: repositoryType
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.7",
            routeTemplate: "{project}/_apis/build/builds/{buildId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <Build.Build[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Queues a build
     * 
     * @param build - 
     * @param project - Project ID or project name
     * @param ignoreWarnings - 
     * @param checkInTicket - 
     * @param sourceBuildId - 
     * @param definitionId - Optional definition id to queue a build without a body. Ignored if there's a valid body
     */
    public async queueBuild(
        build: Build.Build,
        project: string,
        ignoreWarnings?: boolean,
        checkInTicket?: string,
        sourceBuildId?: number,
        definitionId?: number
        ): Promise<Build.Build> {

        const queryValues: any = {
            ignoreWarnings: ignoreWarnings,
            checkInTicket: checkInTicket,
            sourceBuildId: sourceBuildId,
            definitionId: definitionId
        };

        return this.beginRequest<Build.Build>({
            apiVersion: "7.1-preview.7",
            method: "POST",
            routeTemplate: "{project}/_apis/build/builds/{buildId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            body: build
        });
    }

    /**
     * Updates a build.
     * 
     * @param build - The build.
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param retry - 
     */
    public async updateBuild(
        build: Build.Build,
        project: string,
        buildId: number,
        retry?: boolean
        ): Promise<Build.Build> {

        const queryValues: any = {
            retry: retry
        };

        return this.beginRequest<Build.Build>({
            apiVersion: "7.1-preview.7",
            method: "PATCH",
            routeTemplate: "{project}/_apis/build/builds/{buildId}",
            routeValues: {
                project: project,
                buildId: buildId
            },
            queryParams: queryValues,
            body: build
        });
    }

    /**
     * Updates multiple builds.
     * 
     * @param builds - The builds to update.
     * @param project - Project ID or project name
     */
    public async updateBuilds(
        builds: Build.Build[],
        project: string
        ): Promise<Build.Build[]> {

        return this.beginRequest<Build.Build[]>({
            apiVersion: "7.1-preview.7",
            method: "PATCH",
            routeTemplate: "{project}/_apis/build/builds/{buildId}",
            routeValues: {
                project: project
            },
            body: builds
        });
    }

    /**
     * Gets the changes associated with a build
     * 
     * @param project - Project ID or project name
     * @param buildId - 
     * @param continuationToken - 
     * @param top - The maximum number of changes to return
     * @param includeSourceChange - 
     */
    public async getBuildChanges(
        project: string,
        buildId: number,
        continuationToken?: string,
        top?: number,
        includeSourceChange?: boolean
        ): Promise<Build.Change[]> {

        const queryValues: any = {
            continuationToken: continuationToken,
            '$top': top,
            includeSourceChange: includeSourceChange
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/changes",
            routeValues: {
                project: project,
                buildId: buildId
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <Build.Change[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Gets the changes made to the repository between two given builds.
     * 
     * @param project - Project ID or project name
     * @param fromBuildId - The ID of the first build.
     * @param toBuildId - The ID of the last build.
     * @param top - The maximum number of changes to return.
     */
    public async getChangesBetweenBuilds(
        project: string,
        fromBuildId?: number,
        toBuildId?: number,
        top?: number
        ): Promise<Build.Change[]> {

        const queryValues: any = {
            fromBuildId: fromBuildId,
            toBuildId: toBuildId,
            '$top': top
        };

        return this.beginRequest<Build.Change[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/build/changes",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets a controller
     * 
     * @param controllerId - 
     */
    public async getBuildController(
        controllerId: number
        ): Promise<Build.BuildController> {

        return this.beginRequest<Build.BuildController>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/build/Controllers/{controllerId}",
            routeValues: {
                controllerId: controllerId
            }
        });
    }

    /**
     * Gets controller, optionally filtered by name
     * 
     * @param name - 
     */
    public async getBuildControllers(
        name?: string
        ): Promise<Build.BuildController[]> {

        const queryValues: any = {
            name: name
        };

        return this.beginRequest<Build.BuildController[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/build/Controllers/{controllerId}",
            queryParams: queryValues
        });
    }

    /**
     * Creates a new definition.
     * 
     * @param definition - The definition.
     * @param project - Project ID or project name
     * @param definitionToCloneId - 
     * @param definitionToCloneRevision - 
     */
    public async createDefinition(
        definition: Build.BuildDefinition,
        project: string,
        definitionToCloneId?: number,
        definitionToCloneRevision?: number
        ): Promise<Build.BuildDefinition> {

        const queryValues: any = {
            definitionToCloneId: definitionToCloneId,
            definitionToCloneRevision: definitionToCloneRevision
        };

        return this.beginRequest<Build.BuildDefinition>({
            apiVersion: "7.1-preview.7",
            method: "POST",
            routeTemplate: "{project}/_apis/build/definitions/{definitionId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            body: definition
        });
    }

    /**
     * Deletes a definition and all associated builds.
     * 
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     */
    public async deleteDefinition(
        project: string,
        definitionId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.7",
            method: "DELETE",
            routeTemplate: "{project}/_apis/build/definitions/{definitionId}",
            routeValues: {
                project: project,
                definitionId: definitionId
            }
        });
    }

    /**
     * Gets a definition, optionally at a specific revision.
     * 
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     * @param revision - The revision number to retrieve. If this is not specified, the latest version will be returned.
     * @param minMetricsTime - If specified, indicates the date from which metrics should be included.
     * @param propertyFilters - A comma-delimited list of properties to include in the results.
     * @param includeLatestBuilds - 
     */
    public async getDefinition(
        project: string,
        definitionId: number,
        revision?: number,
        minMetricsTime?: Date,
        propertyFilters?: string[],
        includeLatestBuilds?: boolean
        ): Promise<Build.BuildDefinition> {

        const queryValues: any = {
            revision: revision,
            minMetricsTime: minMetricsTime,
            propertyFilters: propertyFilters && propertyFilters.join(","),
            includeLatestBuilds: includeLatestBuilds
        };

        return this.beginRequest<Build.BuildDefinition>({
            apiVersion: "7.1-preview.7",
            routeTemplate: "{project}/_apis/build/definitions/{definitionId}",
            routeValues: {
                project: project,
                definitionId: definitionId
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets a list of definitions.
     * 
     * @param project - Project ID or project name
     * @param name - If specified, filters to definitions whose names match this pattern.
     * @param repositoryId - A repository ID. If specified, filters to definitions that use this repository.
     * @param repositoryType - If specified, filters to definitions that have a repository of this type.
     * @param queryOrder - Indicates the order in which definitions should be returned.
     * @param top - The maximum number of definitions to return.
     * @param continuationToken - A continuation token, returned by a previous call to this method, that can be used to return the next set of definitions.
     * @param minMetricsTime - If specified, indicates the date from which metrics should be included.
     * @param definitionIds - A comma-delimited list that specifies the IDs of definitions to retrieve.
     * @param path - If specified, filters to definitions under this folder.
     * @param builtAfter - If specified, filters to definitions that have builds after this date.
     * @param notBuiltAfter - If specified, filters to definitions that do not have builds after this date.
     * @param includeAllProperties - Indicates whether the full definitions should be returned. By default, shallow representations of the definitions are returned.
     * @param includeLatestBuilds - Indicates whether to return the latest and latest completed builds for this definition.
     * @param taskIdFilter - If specified, filters to definitions that use the specified task.
     * @param processType - If specified, filters to definitions with the given process type.
     * @param yamlFilename - If specified, filters to YAML definitions that match the given filename. To use this filter includeAllProperties should be set to true
     */
    public async getDefinitions(
        project: string,
        name?: string,
        repositoryId?: string,
        repositoryType?: string,
        queryOrder?: Build.DefinitionQueryOrder,
        top?: number,
        continuationToken?: string,
        minMetricsTime?: Date,
        definitionIds?: number[],
        path?: string,
        builtAfter?: Date,
        notBuiltAfter?: Date,
        includeAllProperties?: boolean,
        includeLatestBuilds?: boolean,
        taskIdFilter?: string,
        processType?: number,
        yamlFilename?: string
        ): Promise<Build.BuildDefinitionReference[]> {

        const queryValues: any = {
            name: name,
            repositoryId: repositoryId,
            repositoryType: repositoryType,
            queryOrder: queryOrder,
            '$top': top,
            continuationToken: continuationToken,
            minMetricsTime: minMetricsTime,
            definitionIds: definitionIds && definitionIds.join(","),
            path: path,
            builtAfter: builtAfter,
            notBuiltAfter: notBuiltAfter,
            includeAllProperties: includeAllProperties,
            includeLatestBuilds: includeLatestBuilds,
            taskIdFilter: taskIdFilter,
            processType: processType,
            yamlFilename: yamlFilename
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.7",
            routeTemplate: "{project}/_apis/build/definitions/{definitionId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <Build.BuildDefinitionReference[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Restores a deleted definition
     * 
     * @param project - Project ID or project name
     * @param definitionId - The identifier of the definition to restore.
     * @param deleted - When false, restores a deleted definition.
     */
    public async restoreDefinition(
        project: string,
        definitionId: number,
        deleted: boolean
        ): Promise<Build.BuildDefinition> {

        const queryValues: any = {
            deleted: deleted
        };

        return this.beginRequest<Build.BuildDefinition>({
            apiVersion: "7.1-preview.7",
            method: "PATCH",
            routeTemplate: "{project}/_apis/build/definitions/{definitionId}",
            routeValues: {
                project: project,
                definitionId: definitionId
            },
            queryParams: queryValues
        });
    }

    /**
     * Updates an existing build definition.  In order for this operation to succeed, the value of the "Revision" property of the request body must match the existing build definition's. It is recommended that you obtain the existing build definition by using GET, modify the build definition as necessary, and then submit the modified definition with PUT.
     * 
     * @param definition - The new version of the definition. Its "Revision" property must match the existing definition for the update to be accepted.
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     * @param secretsSourceDefinitionId - 
     * @param secretsSourceDefinitionRevision - 
     */
    public async updateDefinition(
        definition: Build.BuildDefinition,
        project: string,
        definitionId: number,
        secretsSourceDefinitionId?: number,
        secretsSourceDefinitionRevision?: number
        ): Promise<Build.BuildDefinition> {

        const queryValues: any = {
            secretsSourceDefinitionId: secretsSourceDefinitionId,
            secretsSourceDefinitionRevision: secretsSourceDefinitionRevision
        };

        return this.beginRequest<Build.BuildDefinition>({
            apiVersion: "7.1-preview.7",
            method: "PUT",
            routeTemplate: "{project}/_apis/build/definitions/{definitionId}",
            routeValues: {
                project: project,
                definitionId: definitionId
            },
            queryParams: queryValues,
            body: definition
        });
    }

    /**
     * Gets the contents of a file in the given source code repository.
     * 
     * @param project - Project ID or project name
     * @param providerName - The name of the source provider.
     * @param serviceEndpointId - If specified, the ID of the service endpoint to query. Can only be omitted for providers that do not use service endpoints, e.g. TFVC or TFGit.
     * @param repository - If specified, the vendor-specific identifier or the name of the repository to get branches. Can only be omitted for providers that do not support multiple repositories.
     * @param commitOrBranch - The identifier of the commit or branch from which a file's contents are retrieved.
     * @param path - The path to the file to retrieve, relative to the root of the repository.
     */
    public async getFileContents(
        project: string,
        providerName: string,
        serviceEndpointId?: string,
        repository?: string,
        commitOrBranch?: string,
        path?: string
        ): Promise<string> {

        const queryValues: any = {
            serviceEndpointId: serviceEndpointId,
            repository: repository,
            commitOrBranch: commitOrBranch,
            path: path
        };

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "text/plain",
            routeTemplate: "{project}/_apis/sourceProviders/{providerName}/fileContents",
            routeValues: {
                project: project,
                providerName: providerName
            },
            queryParams: queryValues
        });
    }

    /**
     * Creates a new folder.
     * 
     * @param folder - The folder.
     * @param project - Project ID or project name
     * @param path - The full path of the folder.
     */
    public async createFolder(
        folder: Build.Folder,
        project: string,
        path: string
        ): Promise<Build.Folder> {

        const queryValues: any = {
            path: path
        };

        return this.beginRequest<Build.Folder>({
            apiVersion: "7.1-preview.2",
            method: "PUT",
            routeTemplate: "{project}/_apis/build/folders/{*path}",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            body: folder
        });
    }

    /**
     * Deletes a definition folder. Definitions and their corresponding builds will also be deleted.
     * 
     * @param project - Project ID or project name
     * @param path - The full path to the folder.
     */
    public async deleteFolder(
        project: string,
        path: string
        ): Promise<void> {

        const queryValues: any = {
            path: path
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.2",
            method: "DELETE",
            routeTemplate: "{project}/_apis/build/folders/{*path}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets a list of build definition folders.
     * 
     * @param project - Project ID or project name
     * @param path - The path to start with.
     * @param queryOrder - The order in which folders should be returned.
     */
    public async getFolders(
        project: string,
        path?: string,
        queryOrder?: Build.FolderQueryOrder
        ): Promise<Build.Folder[]> {

        const queryValues: any = {
            queryOrder: queryOrder
        };

        return this.beginRequest<Build.Folder[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/build/folders/{*path}",
            routeValues: {
                project: project,
                path: path
            },
            queryParams: queryValues
        });
    }

    /**
     * Updates an existing folder at given  existing path
     * 
     * @param folder - The new version of the folder.
     * @param project - Project ID or project name
     * @param path - The full path to the folder.
     */
    public async updateFolder(
        folder: Build.Folder,
        project: string,
        path: string
        ): Promise<Build.Folder> {

        const queryValues: any = {
            path: path
        };

        return this.beginRequest<Build.Folder>({
            apiVersion: "7.1-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/build/folders/{*path}",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            body: folder
        });
    }

    /**
     * Gets pipeline general settings.
     * 
     * @param project - Project ID or project name
     */
    public async getBuildGeneralSettings(
        project: string
        ): Promise<Build.PipelineGeneralSettings> {

        return this.beginRequest<Build.PipelineGeneralSettings>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/build/generalSettings",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * Updates pipeline general settings.
     * 
     * @param newSettings - 
     * @param project - Project ID or project name
     */
    public async updateBuildGeneralSettings(
        newSettings: Build.PipelineGeneralSettings,
        project: string
        ): Promise<Build.PipelineGeneralSettings> {

        return this.beginRequest<Build.PipelineGeneralSettings>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/build/generalSettings",
            routeValues: {
                project: project
            },
            body: newSettings
        });
    }

    /**
     * Returns the retention history for the project collection. This includes pipelines that have custom retention rules that may prevent the retention job from cleaning them up, runs per pipeline with retention type, files associated with pipelines owned by the collection with retention type, and the number of files per pipeline.
     * 
     * @param daysToLookback - 
     */
    public async getRetentionHistory(
        daysToLookback?: number
        ): Promise<Build.BuildRetentionHistory> {

        const queryValues: any = {
            daysToLookback: daysToLookback
        };

        return this.beginRequest<Build.BuildRetentionHistory>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/build/retention/history",
            queryParams: queryValues
        });
    }

    /**
     * Gets the latest build for a definition, optionally scoped to a specific branch.
     * 
     * @param project - Project ID or project name
     * @param definition - definition name with optional leading folder path, or the definition id
     * @param branchName - optional parameter that indicates the specific branch to use. If not specified, the default branch is used.
     */
    public async getLatestBuild(
        project: string,
        definition: string,
        branchName?: string
        ): Promise<Build.Build> {

        const queryValues: any = {
            branchName: branchName
        };

        return this.beginRequest<Build.Build>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/build/latest/{*definition}",
            routeValues: {
                project: project,
                definition: definition
            },
            queryParams: queryValues
        });
    }

    /**
     * Adds new leases for pipeline runs.
     * 
     * @param newLeases - 
     * @param project - Project ID or project name
     */
    public async addRetentionLeases(
        newLeases: Build.NewRetentionLease[],
        project: string
        ): Promise<Build.RetentionLease[]> {

        return this.beginRequest<Build.RetentionLease[]>({
            apiVersion: "7.1-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/build/retention/leases/{*leaseId}",
            routeValues: {
                project: project
            },
            body: newLeases
        });
    }

    /**
     * Removes specific retention leases.
     * 
     * @param project - Project ID or project name
     * @param ids - 
     */
    public async deleteRetentionLeasesById(
        project: string,
        ids: number[]
        ): Promise<void> {

        const queryValues: any = {
            ids: ids && ids.join(",")
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.2",
            method: "DELETE",
            routeTemplate: "{project}/_apis/build/retention/leases/{*leaseId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Returns the details of the retention lease given a lease id.
     * 
     * @param project - Project ID or project name
     * @param leaseId - 
     */
    public async getRetentionLease(
        project: string,
        leaseId: number
        ): Promise<Build.RetentionLease> {

        return this.beginRequest<Build.RetentionLease>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/build/retention/leases/{*leaseId}",
            routeValues: {
                project: project,
                leaseId: leaseId
            }
        });
    }

    /**
     * Returns any leases matching the specified MinimalRetentionLeases
     * 
     * @param project - Project ID or project name
     * @param leasesToFetch - List of JSON-serialized MinimalRetentionLeases separated by '|'
     */
    public async getRetentionLeasesByMinimalRetentionLeases(
        project: string,
        leasesToFetch: Build.MinimalRetentionLease[]
        ): Promise<Build.RetentionLease[]> {

        const queryValues: any = {
            leasesToFetch: leasesToFetch && leasesToFetch.join("|")
        };

        return this.beginRequest<Build.RetentionLease[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/build/retention/leases/{*leaseId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Returns any leases owned by the specified entity, optionally scoped to a single pipeline definition and run.
     * 
     * @param project - Project ID or project name
     * @param ownerId - 
     * @param definitionId - An optional parameter to limit the search to a specific pipeline definition.
     * @param runId - An optional parameter to limit the search to a single pipeline run. Requires definitionId.
     */
    public async getRetentionLeasesByOwnerId(
        project: string,
        ownerId?: string,
        definitionId?: number,
        runId?: number
        ): Promise<Build.RetentionLease[]> {

        const queryValues: any = {
            ownerId: ownerId,
            definitionId: definitionId,
            runId: runId
        };

        return this.beginRequest<Build.RetentionLease[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/build/retention/leases/{*leaseId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Returns any leases owned by the specified user, optionally scoped to a single pipeline definition and run.
     * 
     * @param project - Project ID or project name
     * @param userOwnerId - The user id to search for.
     * @param definitionId - An optional parameter to limit the search to a specific pipeline definition.
     * @param runId - An optional parameter to limit the search to a single pipeline run. Requires definitionId.
     */
    public async getRetentionLeasesByUserId(
        project: string,
        userOwnerId: string,
        definitionId?: number,
        runId?: number
        ): Promise<Build.RetentionLease[]> {

        const queryValues: any = {
            userOwnerId: userOwnerId,
            definitionId: definitionId,
            runId: runId
        };

        return this.beginRequest<Build.RetentionLease[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/build/retention/leases/{*leaseId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Updates the duration or pipeline protection status of a retention lease.
     * 
     * @param leaseUpdate - The new data for the retention lease.
     * @param project - Project ID or project name
     * @param leaseId - The ID of the lease to update.
     */
    public async updateRetentionLease(
        leaseUpdate: Build.RetentionLeaseUpdate,
        project: string,
        leaseId: number
        ): Promise<Build.RetentionLease> {

        return this.beginRequest<Build.RetentionLease>({
            apiVersion: "7.1-preview.2",
            method: "PATCH",
            routeTemplate: "{project}/_apis/build/retention/leases/{*leaseId}",
            routeValues: {
                project: project,
                leaseId: leaseId
            },
            body: leaseUpdate
        });
    }

    /**
     * Gets an individual log file for a build.
     * 
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param logId - The ID of the log file.
     * @param startLine - The start line.
     * @param endLine - The end line.
     */
    public async getBuildLog(
        project: string,
        buildId: number,
        logId: number,
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
            routeTemplate: "{project}/_apis/build/builds/{buildId}/logs/{logId}",
            routeValues: {
                project: project,
                buildId: buildId,
                logId: logId
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets an individual log file for a build.
     * 
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param logId - The ID of the log file.
     * @param startLine - The start line.
     * @param endLine - The end line.
     */
    public async getBuildLogLines(
        project: string,
        buildId: number,
        logId: number,
        startLine?: number,
        endLine?: number
        ): Promise<string[]> {

        const queryValues: any = {
            startLine: startLine,
            endLine: endLine
        };

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/logs/{logId}",
            routeValues: {
                project: project,
                buildId: buildId,
                logId: logId
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets the logs for a build.
     * 
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     */
    public async getBuildLogs(
        project: string,
        buildId: number
        ): Promise<Build.BuildLog[]> {

        return this.beginRequest<Build.BuildLog[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/logs/{logId}",
            routeValues: {
                project: project,
                buildId: buildId
            }
        });
    }

    /**
     * Gets the logs for a build.
     * 
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     */
    public async getBuildLogsZip(
        project: string,
        buildId: number
        ): Promise<ArrayBuffer> {

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.2",
            httpResponseType: "application/zip",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/logs/{logId}",
            routeValues: {
                project: project,
                buildId: buildId
            }
        });
    }

    /**
     * Gets an individual log file for a build.
     * 
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param logId - The ID of the log file.
     * @param startLine - The start line.
     * @param endLine - The end line.
     */
    public async getBuildLogZip(
        project: string,
        buildId: number,
        logId: number,
        startLine?: number,
        endLine?: number
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            startLine: startLine,
            endLine: endLine
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.2",
            httpResponseType: "application/zip",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/logs/{logId}",
            routeValues: {
                project: project,
                buildId: buildId,
                logId: logId
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets build metrics for a project.
     * 
     * @param project - Project ID or project name
     * @param metricAggregationType - The aggregation type to use (hourly, daily).
     * @param minMetricsTime - The date from which to calculate metrics.
     */
    public async getProjectMetrics(
        project: string,
        metricAggregationType?: string,
        minMetricsTime?: Date
        ): Promise<Build.BuildMetric[]> {

        const queryValues: any = {
            minMetricsTime: minMetricsTime
        };

        return this.beginRequest<Build.BuildMetric[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/build/Metrics/{metricAggregationType}",
            routeValues: {
                project: project,
                metricAggregationType: metricAggregationType
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets build metrics for a definition.
     * 
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     * @param minMetricsTime - The date from which to calculate metrics.
     */
    public async getDefinitionMetrics(
        project: string,
        definitionId: number,
        minMetricsTime?: Date
        ): Promise<Build.BuildMetric[]> {

        const queryValues: any = {
            minMetricsTime: minMetricsTime
        };

        return this.beginRequest<Build.BuildMetric[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/build/definitions/{definitionId}/Metrics",
            routeValues: {
                project: project,
                definitionId: definitionId
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets all build definition options supported by the system.
     * 
     * @param project - Project ID or project name
     */
    public async getBuildOptionDefinitions(
        project?: string
        ): Promise<Build.BuildOptionDefinition[]> {

        return this.beginRequest<Build.BuildOptionDefinition[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/build/options",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * Gets the contents of a directory in the given source code repository.
     * 
     * @param project - Project ID or project name
     * @param providerName - The name of the source provider.
     * @param serviceEndpointId - If specified, the ID of the service endpoint to query. Can only be omitted for providers that do not use service endpoints, e.g. TFVC or TFGit.
     * @param repository - If specified, the vendor-specific identifier or the name of the repository to get branches. Can only be omitted for providers that do not support multiple repositories.
     * @param commitOrBranch - The identifier of the commit or branch from which a file's contents are retrieved.
     * @param path - The path contents to list, relative to the root of the repository.
     */
    public async getPathContents(
        project: string,
        providerName: string,
        serviceEndpointId?: string,
        repository?: string,
        commitOrBranch?: string,
        path?: string
        ): Promise<Build.SourceRepositoryItem[]> {

        const queryValues: any = {
            serviceEndpointId: serviceEndpointId,
            repository: repository,
            commitOrBranch: commitOrBranch,
            path: path
        };

        return this.beginRequest<Build.SourceRepositoryItem[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/sourceProviders/{providerName}/pathContents",
            routeValues: {
                project: project,
                providerName: providerName
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets properties for a build.
     * 
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param filter - A comma-delimited list of properties. If specified, filters to these specific properties.
     */
    public async getBuildProperties(
        project: string,
        buildId: number,
        filter?: string[]
        ): Promise<any> {

        const queryValues: any = {
            filter: filter && filter.join(",")
        };

        return this.beginRequest<any>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/properties",
            routeValues: {
                project: project,
                buildId: buildId
            },
            queryParams: queryValues
        });
    }

    /**
     * Updates properties for a build.
     * 
     * @param document - A json-patch document describing the properties to update.
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     */
    public async updateBuildProperties(
        document: WebApi.JsonPatchDocument,
        project: string,
        buildId: number
        ): Promise<any> {

        return this.beginRequest<any>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/properties",
            routeValues: {
                project: project,
                buildId: buildId
            },
            customHeaders: {
                "Content-Type": "application/json-patch+json",
            },
            body: document
        });
    }

    /**
     * Gets properties for a definition.
     * 
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     * @param filter - A comma-delimited list of properties. If specified, filters to these specific properties.
     */
    public async getDefinitionProperties(
        project: string,
        definitionId: number,
        filter?: string[]
        ): Promise<any> {

        const queryValues: any = {
            filter: filter && filter.join(",")
        };

        return this.beginRequest<any>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/build/definitions/{definitionId}/properties",
            routeValues: {
                project: project,
                definitionId: definitionId
            },
            queryParams: queryValues
        });
    }

    /**
     * Updates properties for a definition.
     * 
     * @param document - A json-patch document describing the properties to update.
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     */
    public async updateDefinitionProperties(
        document: WebApi.JsonPatchDocument,
        project: string,
        definitionId: number
        ): Promise<any> {

        return this.beginRequest<any>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/build/definitions/{definitionId}/properties",
            routeValues: {
                project: project,
                definitionId: definitionId
            },
            customHeaders: {
                "Content-Type": "application/json-patch+json",
            },
            body: document
        });
    }

    /**
     * Gets a pull request object from source provider.
     * 
     * @param project - Project ID or project name
     * @param providerName - The name of the source provider.
     * @param pullRequestId - Vendor-specific id of the pull request.
     * @param repositoryId - Vendor-specific identifier or the name of the repository that contains the pull request.
     * @param serviceEndpointId - If specified, the ID of the service endpoint to query. Can only be omitted for providers that do not use service endpoints, e.g. TFVC or TFGit.
     */
    public async getPullRequest(
        project: string,
        providerName: string,
        pullRequestId: string,
        repositoryId?: string,
        serviceEndpointId?: string
        ): Promise<Build.PullRequest> {

        const queryValues: any = {
            repositoryId: repositoryId,
            serviceEndpointId: serviceEndpointId
        };

        return this.beginRequest<Build.PullRequest>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/sourceProviders/{providerName}/pullRequests/{pullRequestId}",
            routeValues: {
                project: project,
                providerName: providerName,
                pullRequestId: pullRequestId
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets a build report.
     * 
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param type - 
     */
    public async getBuildReport(
        project: string,
        buildId: number,
        type?: string
        ): Promise<Build.BuildReportMetadata> {

        const queryValues: any = {
            type: type
        };

        return this.beginRequest<Build.BuildReportMetadata>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/report",
            routeValues: {
                project: project,
                buildId: buildId
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets a build report.
     * 
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param type - 
     */
    public async getBuildReportHtmlContent(
        project: string,
        buildId: number,
        type?: string
        ): Promise<any> {

        const queryValues: any = {
            type: type
        };

        return this.beginRequest<any>({
            apiVersion: "7.1-preview.2",
            httpResponseType: "text/html",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/report",
            routeValues: {
                project: project,
                buildId: buildId
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets a list of source code repositories.
     * 
     * @param project - Project ID or project name
     * @param providerName - The name of the source provider.
     * @param serviceEndpointId - If specified, the ID of the service endpoint to query. Can only be omitted for providers that do not use service endpoints, e.g. TFVC or TFGit.
     * @param repository - If specified, the vendor-specific identifier or the name of a single repository to get.
     * @param resultSet - 'top' for the repositories most relevant for the endpoint. If not set, all repositories are returned. Ignored if 'repository' is set.
     * @param pageResults - If set to true, this will limit the set of results and will return a continuation token to continue the query.
     * @param continuationToken - When paging results, this is a continuation token, returned by a previous call to this method, that can be used to return the next set of repositories.
     */
    public async listRepositories(
        project: string,
        providerName: string,
        serviceEndpointId?: string,
        repository?: string,
        resultSet?: Build.ResultSet,
        pageResults?: boolean,
        continuationToken?: string
        ): Promise<Build.SourceRepositories> {

        const queryValues: any = {
            serviceEndpointId: serviceEndpointId,
            repository: repository,
            resultSet: resultSet,
            pageResults: pageResults,
            continuationToken: continuationToken
        };

        return this.beginRequest<Build.SourceRepositories>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/sourceProviders/{providerName}/repositories",
            routeValues: {
                project: project,
                providerName: providerName
            },
            queryParams: queryValues
        });
    }

    /**
     * @param resources - 
     * @param project - Project ID or project name
     * @param definitionId - 
     */
    public async authorizeDefinitionResources(
        resources: Build.DefinitionResourceReference[],
        project: string,
        definitionId: number
        ): Promise<Build.DefinitionResourceReference[]> {

        return this.beginRequest<Build.DefinitionResourceReference[]>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/build/definitions/{definitionId}/resources",
            routeValues: {
                project: project,
                definitionId: definitionId
            },
            body: resources
        });
    }

    /**
     * @param project - Project ID or project name
     * @param definitionId - 
     */
    public async getDefinitionResources(
        project: string,
        definitionId: number
        ): Promise<Build.DefinitionResourceReference[]> {

        return this.beginRequest<Build.DefinitionResourceReference[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/build/definitions/{definitionId}/resources",
            routeValues: {
                project: project,
                definitionId: definitionId
            }
        });
    }

    /**
     * Gets information about build resources in the system.
     * 
     */
    public async getResourceUsage(
        ): Promise<Build.BuildResourceUsage> {

        return this.beginRequest<Build.BuildResourceUsage>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/build/ResourceUsage"
        });
    }

    /**
     * Gets the project's retention settings.
     * 
     * @param project - Project ID or project name
     */
    public async getRetentionSettings(
        project: string
        ): Promise<Build.ProjectRetentionSetting> {

        return this.beginRequest<Build.ProjectRetentionSetting>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/build/retention",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * Updates the project's retention settings.
     * 
     * @param updateModel - 
     * @param project - Project ID or project name
     */
    public async updateRetentionSettings(
        updateModel: Build.UpdateProjectRetentionSettingModel,
        project: string
        ): Promise<Build.ProjectRetentionSetting> {

        return this.beginRequest<Build.ProjectRetentionSetting>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/build/retention",
            routeValues: {
                project: project
            },
            body: updateModel
        });
    }

    /**
     * Gets all revisions of a definition.
     * 
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     */
    public async getDefinitionRevisions(
        project: string,
        definitionId: number
        ): Promise<Build.BuildDefinitionRevision[]> {

        return this.beginRequest<Build.BuildDefinitionRevision[]>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/_apis/build/definitions/{definitionId}/revisions",
            routeValues: {
                project: project,
                definitionId: definitionId
            }
        });
    }

    /**
     * Gets the build settings.
     * 
     * @param project - Project ID or project name
     */
    public async getBuildSettings(
        project?: string
        ): Promise<Build.BuildSettings> {

        return this.beginRequest<Build.BuildSettings>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/build/settings",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * Updates the build settings.
     * 
     * @param settings - The new settings.
     * @param project - Project ID or project name
     */
    public async updateBuildSettings(
        settings: Build.BuildSettings,
        project?: string
        ): Promise<Build.BuildSettings> {

        return this.beginRequest<Build.BuildSettings>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/build/settings",
            routeValues: {
                project: project
            },
            body: settings
        });
    }

    /**
     * Get a list of source providers and their capabilities.
     * 
     * @param project - Project ID or project name
     */
    public async listSourceProviders(
        project: string
        ): Promise<Build.SourceProviderAttributes[]> {

        return this.beginRequest<Build.SourceProviderAttributes[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/sourceProviders",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * Update a build stage
     * 
     * @param updateParameters - 
     * @param buildId - 
     * @param stageRefName - 
     * @param project - Project ID or project name
     */
    public async updateStage(
        updateParameters: Build.UpdateStageParameters,
        buildId: number,
        stageRefName: string,
        project?: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/stages/{stageRefName}",
            routeValues: {
                project: project,
                buildId: buildId,
                stageRefName: stageRefName
            },
            body: updateParameters
        });
    }

    /**
     * \<p\>Gets the build status for a definition, optionally scoped to a specific branch, stage, job, and configuration.\</p\> \<p\>If there are more than one, then it is required to pass in a stageName value when specifying a jobName, and the same rule then applies for both if passing a configuration parameter.\</p\>
     * 
     * @param project - Project ID or project name
     * @param definition - Either the definition name with optional leading folder path, or the definition id.
     * @param branchName - Only consider the most recent build for this branch. If not specified, the default branch is used.
     * @param stageName - Use this stage within the pipeline to render the status.
     * @param jobName - Use this job within a stage of the pipeline to render the status.
     * @param configuration - Use this job configuration to render the status
     * @param label - Replaces the default text on the left side of the badge.
     */
    public async getStatusBadge(
        project: string,
        definition: string,
        branchName?: string,
        stageName?: string,
        jobName?: string,
        configuration?: string,
        label?: string
        ): Promise<string> {

        const queryValues: any = {
            branchName: branchName,
            stageName: stageName,
            jobName: jobName,
            configuration: configuration,
            label: label
        };

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/build/status/{*definition}",
            routeValues: {
                project: project,
                definition: definition
            },
            queryParams: queryValues
        });
    }

    /**
     * Adds a tag to a build.
     * 
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param tag - The tag to add.
     */
    public async addBuildTag(
        project: string,
        buildId: number,
        tag: string
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.3",
            method: "PUT",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/tags/{*tag}",
            routeValues: {
                project: project,
                buildId: buildId,
                tag: tag
            }
        });
    }

    /**
     * Adds tags to a build.
     * 
     * @param tags - The tags to add. Request body is composed directly from listed tags.
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     */
    public async addBuildTags(
        tags: string[],
        project: string,
        buildId: number
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.3",
            method: "POST",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/tags/{*tag}",
            routeValues: {
                project: project,
                buildId: buildId
            },
            body: tags
        });
    }

    /**
     * Removes a tag from a build. NOTE: This API will not work for tags with special characters. To remove tags with special characters, use the PATCH method instead (in 6.0+)
     * 
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param tag - The tag to remove.
     */
    public async deleteBuildTag(
        project: string,
        buildId: number,
        tag: string
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.3",
            method: "DELETE",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/tags/{*tag}",
            routeValues: {
                project: project,
                buildId: buildId,
                tag: tag
            }
        });
    }

    /**
     * Gets the tags for a build.
     * 
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     */
    public async getBuildTags(
        project: string,
        buildId: number
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/tags/{*tag}",
            routeValues: {
                project: project,
                buildId: buildId
            }
        });
    }

    /**
     * Adds/Removes tags from a build.
     * 
     * @param updateParameters - The tags to add/remove.
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     */
    public async updateBuildTags(
        updateParameters: Build.UpdateTagParameters,
        project: string,
        buildId: number
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.3",
            method: "PATCH",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/tags/{*tag}",
            routeValues: {
                project: project,
                buildId: buildId
            },
            body: updateParameters
        });
    }

    /**
     * Adds a tag to a definition
     * 
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     * @param tag - The tag to add.
     */
    public async addDefinitionTag(
        project: string,
        definitionId: number,
        tag: string
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.3",
            method: "PUT",
            routeTemplate: "{project}/_apis/build/definitions/{DefinitionId}/tags/{*tag}",
            routeValues: {
                project: project,
                definitionId: definitionId,
                tag: tag
            }
        });
    }

    /**
     * Adds multiple tags to a definition.
     * 
     * @param tags - The tags to add.
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     */
    public async addDefinitionTags(
        tags: string[],
        project: string,
        definitionId: number
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.3",
            method: "POST",
            routeTemplate: "{project}/_apis/build/definitions/{DefinitionId}/tags/{*tag}",
            routeValues: {
                project: project,
                definitionId: definitionId
            },
            body: tags
        });
    }

    /**
     * Removes a tag from a definition. NOTE: This API will not work for tags with special characters. To remove tags with special characters, use the PATCH method instead (in 6.0+)
     * 
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     * @param tag - The tag to remove.
     */
    public async deleteDefinitionTag(
        project: string,
        definitionId: number,
        tag: string
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.3",
            method: "DELETE",
            routeTemplate: "{project}/_apis/build/definitions/{DefinitionId}/tags/{*tag}",
            routeValues: {
                project: project,
                definitionId: definitionId,
                tag: tag
            }
        });
    }

    /**
     * Gets the tags for a definition.
     * 
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     * @param revision - The definition revision number. If not specified, uses the latest revision of the definition.
     */
    public async getDefinitionTags(
        project: string,
        definitionId: number,
        revision?: number
        ): Promise<string[]> {

        const queryValues: any = {
            revision: revision
        };

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/_apis/build/definitions/{DefinitionId}/tags/{*tag}",
            routeValues: {
                project: project,
                definitionId: definitionId
            },
            queryParams: queryValues
        });
    }

    /**
     * Adds/Removes tags from a definition.
     * 
     * @param updateParameters - The tags to add/remove.
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     */
    public async updateDefinitionTags(
        updateParameters: Build.UpdateTagParameters,
        project: string,
        definitionId: number
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.3",
            method: "PATCH",
            routeTemplate: "{project}/_apis/build/definitions/{DefinitionId}/tags/{*tag}",
            routeValues: {
                project: project,
                definitionId: definitionId
            },
            body: updateParameters
        });
    }

    /**
     * Removes a tag from builds, definitions, and from the tag store
     * 
     * @param project - Project ID or project name
     * @param tag - The tag to remove.
     */
    public async deleteTag(
        project: string,
        tag: string
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.3",
            method: "DELETE",
            routeTemplate: "{project}/_apis/build/tags/{*tag}",
            routeValues: {
                project: project,
                tag: tag
            }
        });
    }

    /**
     * Gets a list of all build tags in the project.
     * 
     * @param project - Project ID or project name
     */
    public async getTags(
        project: string
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/_apis/build/tags/{*tag}",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * Deletes a build definition template.
     * 
     * @param project - Project ID or project name
     * @param templateId - The ID of the template.
     */
    public async deleteTemplate(
        project: string,
        templateId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.3",
            method: "DELETE",
            routeTemplate: "{project}/_apis/build/definitions/templates/{templateId}",
            routeValues: {
                project: project,
                templateId: templateId
            }
        });
    }

    /**
     * Gets a specific build definition template.
     * 
     * @param project - Project ID or project name
     * @param templateId - The ID of the requested template.
     */
    public async getTemplate(
        project: string,
        templateId: string
        ): Promise<Build.BuildDefinitionTemplate> {

        return this.beginRequest<Build.BuildDefinitionTemplate>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/_apis/build/definitions/templates/{templateId}",
            routeValues: {
                project: project,
                templateId: templateId
            }
        });
    }

    /**
     * Gets all definition templates.
     * 
     * @param project - Project ID or project name
     */
    public async getTemplates(
        project: string
        ): Promise<Build.BuildDefinitionTemplate[]> {

        return this.beginRequest<Build.BuildDefinitionTemplate[]>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/_apis/build/definitions/templates/{templateId}",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * Updates an existing build definition template.
     * 
     * @param template - The new version of the template.
     * @param project - Project ID or project name
     * @param templateId - The ID of the template.
     */
    public async saveTemplate(
        template: Build.BuildDefinitionTemplate,
        project: string,
        templateId: string
        ): Promise<Build.BuildDefinitionTemplate> {

        return this.beginRequest<Build.BuildDefinitionTemplate>({
            apiVersion: "7.1-preview.3",
            method: "PUT",
            routeTemplate: "{project}/_apis/build/definitions/templates/{templateId}",
            routeValues: {
                project: project,
                templateId: templateId
            },
            body: template
        });
    }

    /**
     * Gets details for a build
     * 
     * @param project - Project ID or project name
     * @param buildId - 
     * @param timelineId - 
     * @param changeId - 
     * @param planId - 
     */
    public async getBuildTimeline(
        project: string,
        buildId: number,
        timelineId?: string,
        changeId?: number,
        planId?: string
        ): Promise<Build.Timeline> {

        const queryValues: any = {
            changeId: changeId,
            planId: planId
        };

        return this.beginRequest<Build.Timeline>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/Timeline/{timelineId}",
            routeValues: {
                project: project,
                buildId: buildId,
                timelineId: timelineId
            },
            queryParams: queryValues
        });
    }

    /**
     * Recreates the webhooks for the specified triggers in the given source code repository.
     * 
     * @param triggerTypes - The types of triggers to restore webhooks for.
     * @param project - Project ID or project name
     * @param providerName - The name of the source provider.
     * @param serviceEndpointId - If specified, the ID of the service endpoint to query. Can only be omitted for providers that do not use service endpoints, e.g. TFVC or TFGit.
     * @param repository - If specified, the vendor-specific identifier or the name of the repository to get webhooks. Can only be omitted for providers that do not support multiple repositories.
     */
    public async restoreWebhooks(
        triggerTypes: Build.DefinitionTriggerType[],
        project: string,
        providerName: string,
        serviceEndpointId?: string,
        repository?: string
        ): Promise<void> {

        const queryValues: any = {
            serviceEndpointId: serviceEndpointId,
            repository: repository
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/sourceProviders/{providerName}/webhooks",
            routeValues: {
                project: project,
                providerName: providerName
            },
            queryParams: queryValues,
            body: triggerTypes
        });
    }

    /**
     * Gets a list of webhooks installed in the given source code repository.
     * 
     * @param project - Project ID or project name
     * @param providerName - The name of the source provider.
     * @param serviceEndpointId - If specified, the ID of the service endpoint to query. Can only be omitted for providers that do not use service endpoints, e.g. TFVC or TFGit.
     * @param repository - If specified, the vendor-specific identifier or the name of the repository to get webhooks. Can only be omitted for providers that do not support multiple repositories.
     */
    public async listWebhooks(
        project: string,
        providerName: string,
        serviceEndpointId?: string,
        repository?: string
        ): Promise<Build.RepositoryWebhook[]> {

        const queryValues: any = {
            serviceEndpointId: serviceEndpointId,
            repository: repository
        };

        return this.beginRequest<Build.RepositoryWebhook[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/sourceProviders/{providerName}/webhooks",
            routeValues: {
                project: project,
                providerName: providerName
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets the work items associated with a build. Only work items in the same project are returned.
     * 
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param top - The maximum number of work items to return.
     */
    public async getBuildWorkItemsRefs(
        project: string,
        buildId: number,
        top?: number
        ): Promise<WebApi.ResourceRef[]> {

        const queryValues: any = {
            '$top': top
        };

        return this.beginRequest<WebApi.ResourceRef[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/workitems",
            routeValues: {
                project: project,
                buildId: buildId
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets the work items associated with a build, filtered to specific commits.
     * 
     * @param commitIds - A comma-delimited list of commit IDs.
     * @param project - Project ID or project name
     * @param buildId - The ID of the build.
     * @param top - The maximum number of work items to return, or the number of commits to consider if no commit IDs are specified.
     */
    public async getBuildWorkItemsRefsFromCommits(
        commitIds: string[],
        project: string,
        buildId: number,
        top?: number
        ): Promise<WebApi.ResourceRef[]> {

        const queryValues: any = {
            '$top': top
        };

        return this.beginRequest<WebApi.ResourceRef[]>({
            apiVersion: "7.1-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/build/builds/{buildId}/workitems",
            routeValues: {
                project: project,
                buildId: buildId
            },
            queryParams: queryValues,
            body: commitIds
        });
    }

    /**
     * Gets all the work items between two builds.
     * 
     * @param project - Project ID or project name
     * @param fromBuildId - The ID of the first build.
     * @param toBuildId - The ID of the last build.
     * @param top - The maximum number of work items to return.
     */
    public async getWorkItemsBetweenBuilds(
        project: string,
        fromBuildId: number,
        toBuildId: number,
        top?: number
        ): Promise<WebApi.ResourceRef[]> {

        const queryValues: any = {
            fromBuildId: fromBuildId,
            toBuildId: toBuildId,
            '$top': top
        };

        return this.beginRequest<WebApi.ResourceRef[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/build/workitems",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Converts a definition to YAML, optionally at a specific revision.
     * 
     * @param project - Project ID or project name
     * @param definitionId - The ID of the definition.
     * @param revision - The revision number to retrieve. If this is not specified, the latest version will be returned.
     * @param minMetricsTime - If specified, indicates the date from which metrics should be included.
     * @param propertyFilters - A comma-delimited list of properties to include in the results.
     * @param includeLatestBuilds - 
     */
    public async getDefinitionYaml(
        project: string,
        definitionId: number,
        revision?: number,
        minMetricsTime?: Date,
        propertyFilters?: string[],
        includeLatestBuilds?: boolean
        ): Promise<Build.YamlBuild> {

        const queryValues: any = {
            revision: revision,
            minMetricsTime: minMetricsTime,
            propertyFilters: propertyFilters && propertyFilters.join(","),
            includeLatestBuilds: includeLatestBuilds
        };

        return this.beginRequest<Build.YamlBuild>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/build/definitions/{definitionId}/yaml",
            routeValues: {
                project: project,
                definitionId: definitionId
            },
            queryParams: queryValues
        });
    }

}
