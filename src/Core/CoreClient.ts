/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import { deserializeVssJsonObject } from "../Common/Util/Serialization";

import * as Core from "../Core/Core";
import * as Operations from "../Operations/Operations";
import * as WebApi from "../WebApi/WebApi";

export class CoreRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "79134c72-4a58-4b42-976c-04e7115f32bf";

    /**
     * Removes the avatar for the project.
     * 
     * @param projectId - The ID or name of the project.
     */
    public async removeProjectAvatar(
        projectId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/projects/{projectId}/avatar",
            routeValues: {
                projectId: projectId
            }
        });
    }

    /**
     * Sets the avatar for the project.
     * 
     * @param avatarBlob - The avatar blob data object to upload.
     * @param projectId - The ID or name of the project.
     */
    public async setProjectAvatar(
        avatarBlob: Core.ProjectAvatar,
        projectId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/projects/{projectId}/avatar",
            routeValues: {
                projectId: projectId
            },
            body: avatarBlob
        });
    }

    /**
     * @param connectedServiceCreationData - 
     * @param projectId - 
     */
    public async createConnectedService(
        connectedServiceCreationData: Core.WebApiConnectedServiceDetails,
        projectId: string
        ): Promise<Core.WebApiConnectedService> {

        return this.beginRequest<Core.WebApiConnectedService>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/projects/{projectId}/connectedServices/{name}",
            routeValues: {
                projectId: projectId
            },
            body: connectedServiceCreationData
        });
    }

    /**
     * @param projectId - 
     * @param name - 
     */
    public async getConnectedServiceDetails(
        projectId: string,
        name: string
        ): Promise<Core.WebApiConnectedServiceDetails> {

        return this.beginRequest<Core.WebApiConnectedServiceDetails>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/projects/{projectId}/connectedServices/{name}",
            routeValues: {
                projectId: projectId,
                name: name
            }
        });
    }

    /**
     * @param projectId - 
     * @param kind - 
     */
    public async getConnectedServices(
        projectId: string,
        kind?: Core.ConnectedServiceKind
        ): Promise<Core.WebApiConnectedService[]> {

        const queryValues: any = {
            kind: kind
        };

        return this.beginRequest<Core.WebApiConnectedService[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/projects/{projectId}/connectedServices/{name}",
            routeValues: {
                projectId: projectId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param mruData - 
     * @param mruName - 
     */
    public async createIdentityMru(
        mruData: Core.IdentityData,
        mruName: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/core/identityMru/{mruName}",
            routeValues: {
                mruName: mruName
            },
            body: mruData
        });
    }

    /**
     * @param mruData - 
     * @param mruName - 
     */
    public async deleteIdentityMru(
        mruData: Core.IdentityData,
        mruName: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/core/identityMru/{mruName}",
            routeValues: {
                mruName: mruName
            }
        });
    }

    /**
     * @param mruName - 
     */
    public async getIdentityMru(
        mruName: string
        ): Promise<WebApi.IdentityRef[]> {

        return this.beginRequest<WebApi.IdentityRef[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/core/identityMru/{mruName}",
            routeValues: {
                mruName: mruName
            }
        });
    }

    /**
     * @param mruData - 
     * @param mruName - 
     */
    public async updateIdentityMru(
        mruData: Core.IdentityData,
        mruName: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/core/identityMru/{mruName}",
            routeValues: {
                mruName: mruName
            },
            body: mruData
        });
    }

    /**
     * Get a list of members for a specific team.
     * 
     * @param projectId - The name or ID (GUID) of the team project the team belongs to.
     * @param teamId - The name or ID (GUID) of the team .
     * @param top - 
     * @param skip - 
     */
    public async getTeamMembersWithExtendedProperties(
        projectId: string,
        teamId: string,
        top?: number,
        skip?: number
        ): Promise<WebApi.TeamMember[]> {

        const queryValues: any = {
            '$top': top,
            '$skip': skip
        };

        return this.beginRequest<WebApi.TeamMember[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/projects/{projectId}/teams/{teamId}/members",
            routeValues: {
                projectId: projectId,
                teamId: teamId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a process by ID.
     * 
     * @param processId - ID for a process.
     */
    public async getProcessById(
        processId: string
        ): Promise<Core.Process> {

        return this.beginRequest<Core.Process>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/process/processes/{*processId}",
            routeValues: {
                processId: processId
            }
        });
    }

    /**
     * Get a list of processes.
     * 
     */
    public async getProcesses(
        ): Promise<Core.Process[]> {

        return this.beginRequest<Core.Process[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/process/processes/{*processId}"
        });
    }

    /**
     * Get project collection with the specified id or name.
     * 
     * @param collectionId - 
     */
    public async getProjectCollection(
        collectionId: string
        ): Promise<Core.TeamProjectCollection> {

        return this.beginRequest<Core.TeamProjectCollection>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/projectCollections/{collectionId}",
            routeValues: {
                collectionId: collectionId
            }
        });
    }

    /**
     * Get project collection references for this application.
     * 
     * @param top - 
     * @param skip - 
     */
    public async getProjectCollections(
        top?: number,
        skip?: number
        ): Promise<Core.TeamProjectCollectionReference[]> {

        const queryValues: any = {
            '$top': top,
            '$skip': skip
        };

        return this.beginRequest<Core.TeamProjectCollectionReference[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/projectCollections/{collectionId}",
            queryParams: queryValues
        });
    }

    /**
     * Gets the history of changes to the project.
     * 
     * @param minRevision - The minimum revision number to return in the history.
     */
    public async getProjectHistoryEntries(
        minRevision?: number
        ): Promise<Core.ProjectInfo[]> {

        const queryValues: any = {
            minRevision: minRevision
        };

        return this.beginRequest<Core.ProjectInfo[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/projectHistory",
            queryParams: queryValues
        });
    }

    /**
     * Get project with the specified id or name, optionally including capabilities.
     * 
     * @param projectId - 
     * @param includeCapabilities - Include capabilities (such as source control) in the team project result (default: false).
     * @param includeHistory - Search within renamed projects (that had such name in the past).
     */
    public async getProject(
        projectId: string,
        includeCapabilities?: boolean,
        includeHistory?: boolean
        ): Promise<Core.TeamProject> {

        const queryValues: any = {
            includeCapabilities: includeCapabilities,
            includeHistory: includeHistory
        };

        return this.beginRequest<Core.TeamProject>({
            apiVersion: "7.1-preview.4",
            routeTemplate: "_apis/projects/{*projectId}",
            routeValues: {
                projectId: projectId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get all projects in the organization that the authenticated user has access to.
     * 
     * @param stateFilter - Filter on team projects in a specific team project state (default: WellFormed).
     * @param top - 
     * @param skip - 
     * @param continuationToken - 
     * @param getDefaultTeamImageUrl - 
     */
    public async getProjects(
        stateFilter?: any,
        top?: number,
        skip?: number,
        continuationToken?: string,
        getDefaultTeamImageUrl?: boolean
        ): Promise<Core.TeamProjectReference[]> {

        const queryValues: any = {
            stateFilter: stateFilter,
            '$top': top,
            '$skip': skip,
            continuationToken: continuationToken,
            getDefaultTeamImageUrl: getDefaultTeamImageUrl
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.4",
            routeTemplate: "_apis/projects/{*projectId}",
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <Core.TeamProjectReference[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Queues a project to be created. Use the [GetOperation](../../operations/operations/get) to periodically check for create project status.
     * 
     * @param projectToCreate - The project to create.
     */
    public async queueCreateProject(
        projectToCreate: Core.TeamProject
        ): Promise<Operations.OperationReference> {

        return this.beginRequest<Operations.OperationReference>({
            apiVersion: "7.1-preview.4",
            method: "POST",
            routeTemplate: "_apis/projects/{*projectId}",
            body: projectToCreate
        });
    }

    /**
     * Queues a project to be deleted. Use the [GetOperation](../../operations/operations/get) to periodically check for delete project status.
     * 
     * @param projectId - The project id of the project to delete.
     */
    public async queueDeleteProject(
        projectId: string
        ): Promise<Operations.OperationReference> {

        return this.beginRequest<Operations.OperationReference>({
            apiVersion: "7.1-preview.4",
            method: "DELETE",
            routeTemplate: "_apis/projects/{*projectId}",
            routeValues: {
                projectId: projectId
            }
        });
    }

    /**
     * Update an existing project's name, abbreviation, description, or restore a project.
     * 
     * @param projectUpdate - The updates for the project. The state must be set to wellFormed to restore the project.
     * @param projectId - The project id of the project to update.
     */
    public async updateProject(
        projectUpdate: Core.TeamProject,
        projectId: string
        ): Promise<Operations.OperationReference> {

        return this.beginRequest<Operations.OperationReference>({
            apiVersion: "7.1-preview.4",
            method: "PATCH",
            routeTemplate: "_apis/projects/{*projectId}",
            routeValues: {
                projectId: projectId
            },
            body: projectUpdate
        });
    }

    /**
     * Get a collection of team project properties for multiple projects.
     * 
     * @param projectIds - A comma-delimited string of team project IDs
     * @param properties - 
     */
    public async getProjectsProperties(
        projectIds: string[],
        properties?: string[]
        ): Promise<Core.ProjectProperties[]> {

        const queryValues: any = {
            projectIds: projectIds && projectIds.join(","),
            properties: properties && properties.join(",")
        };

        return this.beginRequest<Core.ProjectProperties[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/projectsproperties",
            queryParams: queryValues
        });
    }

    /**
     * Get a collection of team project properties.
     * 
     * @param projectId - The team project ID.
     * @param keys - A comma-delimited string of team project property names. Wildcard characters ("?" and "*") are supported. If no key is specified, all properties will be returned.
     */
    public async getProjectProperties(
        projectId: string,
        keys?: string[]
        ): Promise<Core.ProjectProperty[]> {

        const queryValues: any = {
            keys: keys && keys.join(",")
        };

        return this.beginRequest<Core.ProjectProperty[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/projects/{projectId}/properties",
            routeValues: {
                projectId: projectId
            },
            queryParams: queryValues
        });
    }

    /**
     * Create, update, and delete team project properties.
     * 
     * @param projectId - The team project ID.
     * @param patchDocument - A JSON Patch document that represents an array of property operations. See RFC 6902 for more details on JSON Patch. The accepted operation verbs are Add and Remove, where Add is used for both creating and updating properties. The path consists of a forward slash and a property name.
     */
    public async setProjectProperties(
        projectId: string,
        patchDocument: WebApi.JsonPatchDocument
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/projects/{projectId}/properties",
            routeValues: {
                projectId: projectId
            },
            customHeaders: {
                "Content-Type": "application/json-patch+json",
            },
            body: patchDocument
        });
    }

    /**
     * @param proxy - 
     */
    public async createOrUpdateProxy(
        proxy: Core.Proxy
        ): Promise<Core.Proxy> {

        return this.beginRequest<Core.Proxy>({
            apiVersion: "7.1-preview.2",
            method: "PUT",
            routeTemplate: "_apis/proxies",
            body: proxy
        });
    }

    /**
     * @param proxyUrl - 
     * @param site - 
     */
    public async deleteProxy(
        proxyUrl: string,
        site?: string
        ): Promise<void> {

        const queryValues: any = {
            proxyUrl: proxyUrl,
            site: site
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.2",
            method: "DELETE",
            routeTemplate: "_apis/proxies",
            queryParams: queryValues
        });
    }

    /**
     * @param proxyUrl - 
     */
    public async getProxies(
        proxyUrl?: string
        ): Promise<Core.Proxy[]> {

        const queryValues: any = {
            proxyUrl: proxyUrl
        };

        return this.beginRequest<Core.Proxy[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/proxies",
            queryParams: queryValues
        });
    }

    /**
     * Get a list of all teams.
     * 
     * @param mine - If true, then return all teams requesting user is member. Otherwise return all teams user has read access.
     * @param top - Maximum number of teams to return.
     * @param skip - Number of teams to skip.
     * @param expandIdentity - A value indicating whether or not to expand Identity information in the result WebApiTeam object.
     */
    public async getAllTeams(
        mine?: boolean,
        top?: number,
        skip?: number,
        expandIdentity?: boolean
        ): Promise<Core.WebApiTeam[]> {

        const queryValues: any = {
            '$mine': mine,
            '$top': top,
            '$skip': skip,
            '$expandIdentity': expandIdentity
        };

        return this.beginRequest<Core.WebApiTeam[]>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "_apis/teams",
            queryParams: queryValues
        });
    }

    /**
     * Create a team in a team project.
     * 
     * @param team - The team data used to create the team.
     * @param projectId - The name or ID (GUID) of the team project in which to create the team.
     */
    public async createTeam(
        team: Core.WebApiTeam,
        projectId: string
        ): Promise<Core.WebApiTeam> {

        return this.beginRequest<Core.WebApiTeam>({
            apiVersion: "7.1-preview.3",
            method: "POST",
            routeTemplate: "_apis/projects/{projectId}/teams/{*teamId}",
            routeValues: {
                projectId: projectId
            },
            body: team
        });
    }

    /**
     * Delete a team.
     * 
     * @param projectId - The name or ID (GUID) of the team project containing the team to delete.
     * @param teamId - The name or ID of the team to delete.
     */
    public async deleteTeam(
        projectId: string,
        teamId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.3",
            method: "DELETE",
            routeTemplate: "_apis/projects/{projectId}/teams/{*teamId}",
            routeValues: {
                projectId: projectId,
                teamId: teamId
            }
        });
    }

    /**
     * Get a specific team.
     * 
     * @param projectId - The name or ID (GUID) of the team project containing the team.
     * @param teamId - The name or ID (GUID) of the team.
     * @param expandIdentity - A value indicating whether or not to expand Identity information in the result WebApiTeam object.
     */
    public async getTeam(
        projectId: string,
        teamId: string,
        expandIdentity?: boolean
        ): Promise<Core.WebApiTeam> {

        const queryValues: any = {
            '$expandIdentity': expandIdentity
        };

        return this.beginRequest<Core.WebApiTeam>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "_apis/projects/{projectId}/teams/{*teamId}",
            routeValues: {
                projectId: projectId,
                teamId: teamId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a list of teams.
     * 
     * @param projectId - 
     * @param mine - If true return all the teams requesting user is member, otherwise return all the teams user has read access.
     * @param top - Maximum number of teams to return.
     * @param skip - Number of teams to skip.
     * @param expandIdentity - A value indicating whether or not to expand Identity information in the result WebApiTeam object.
     */
    public async getTeams(
        projectId: string,
        mine?: boolean,
        top?: number,
        skip?: number,
        expandIdentity?: boolean
        ): Promise<Core.WebApiTeam[]> {

        const queryValues: any = {
            '$mine': mine,
            '$top': top,
            '$skip': skip,
            '$expandIdentity': expandIdentity
        };

        return this.beginRequest<Core.WebApiTeam[]>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "_apis/projects/{projectId}/teams/{*teamId}",
            routeValues: {
                projectId: projectId
            },
            queryParams: queryValues
        });
    }

    /**
     * Update a team's name and/or description.
     * 
     * @param teamData - 
     * @param projectId - The name or ID (GUID) of the team project containing the team to update.
     * @param teamId - The name of ID of the team to update.
     */
    public async updateTeam(
        teamData: Core.WebApiTeam,
        projectId: string,
        teamId: string
        ): Promise<Core.WebApiTeam> {

        return this.beginRequest<Core.WebApiTeam>({
            apiVersion: "7.1-preview.3",
            method: "PATCH",
            routeTemplate: "_apis/projects/{projectId}/teams/{*teamId}",
            routeValues: {
                projectId: projectId,
                teamId: teamId
            },
            body: teamData
        });
    }

}
