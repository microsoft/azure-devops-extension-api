/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import { deserializeVssJsonObject } from "../Common/Util/Serialization";

import * as TaskAgent from "../TaskAgent/TaskAgent";

export class TaskAgentRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "a85b8835-c1a1-4aac-ae97-1c3d0ba72dbd";

    /**
     * @param agentCloud - 
     */
    public async addAgentCloud(
        agentCloud: TaskAgent.TaskAgentCloud
        ): Promise<TaskAgent.TaskAgentCloud> {

        return this.beginRequest<TaskAgent.TaskAgentCloud>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/distributedtask/agentclouds/{agentCloudId}",
            body: agentCloud
        });
    }

    /**
     * @param agentCloudId - 
     */
    public async deleteAgentCloud(
        agentCloudId: number
        ): Promise<TaskAgent.TaskAgentCloud> {

        return this.beginRequest<TaskAgent.TaskAgentCloud>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/distributedtask/agentclouds/{agentCloudId}",
            routeValues: {
                agentCloudId: agentCloudId
            }
        });
    }

    /**
     * @param agentCloudId - 
     */
    public async getAgentCloud(
        agentCloudId: number
        ): Promise<TaskAgent.TaskAgentCloud> {

        return this.beginRequest<TaskAgent.TaskAgentCloud>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/agentclouds/{agentCloudId}",
            routeValues: {
                agentCloudId: agentCloudId
            }
        });
    }

    /**
     */
    public async getAgentClouds(
        ): Promise<TaskAgent.TaskAgentCloud[]> {

        return this.beginRequest<TaskAgent.TaskAgentCloud[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/agentclouds/{agentCloudId}"
        });
    }

    /**
     * @param updatedCloud - 
     * @param agentCloudId - 
     */
    public async updateAgentCloud(
        updatedCloud: TaskAgent.TaskAgentCloud,
        agentCloudId: number
        ): Promise<TaskAgent.TaskAgentCloud> {

        return this.beginRequest<TaskAgent.TaskAgentCloud>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/distributedtask/agentclouds/{agentCloudId}",
            routeValues: {
                agentCloudId: agentCloudId
            },
            body: updatedCloud
        });
    }

    /**
     * Get agent cloud types.
     * 
     */
    public async getAgentCloudTypes(
        ): Promise<TaskAgent.TaskAgentCloudType[]> {

        return this.beginRequest<TaskAgent.TaskAgentCloudType[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/agentcloudtypes"
        });
    }

    /**
     * @param project - Project ID or project name
     * @param queueId - 
     * @param top - 
     * @param continuationToken - 
     */
    public async getAgentRequestsForQueue(
        project: string,
        queueId: number,
        top: number,
        continuationToken?: string
        ): Promise<TaskAgent.TaskAgentJobRequest[]> {

        const queryValues: any = {
            '$top': top,
            continuationToken: continuationToken
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/queues/{queueId}/agentrequests/{requestId}",
            routeValues: {
                project: project,
                queueId: queueId
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <TaskAgent.TaskAgentJobRequest[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * @param request - 
     * @param project - Project ID or project name
     * @param queueId - 
     */
    public async queueAgentRequest(
        request: TaskAgent.TaskAgentJobRequest,
        project: string,
        queueId: number
        ): Promise<TaskAgent.TaskAgentJobRequest> {

        return this.beginRequest<TaskAgent.TaskAgentJobRequest>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/distributedtask/queues/{queueId}/agentrequests/{requestId}",
            routeValues: {
                project: project,
                queueId: queueId
            },
            body: request
        });
    }

    /**
     * Adds an agent to a pool.  You probably don't want to call this endpoint directly. Instead, [configure an agent](https://docs.microsoft.com/azure/devops/pipelines/agents/agents) using the agent download package.
     * 
     * @param agent - Details about the agent being added
     * @param poolId - The agent pool in which to add the agent
     */
    public async addAgent(
        agent: TaskAgent.TaskAgent,
        poolId: number
        ): Promise<TaskAgent.TaskAgent> {

        return this.beginRequest<TaskAgent.TaskAgent>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/agents/{agentId}",
            routeValues: {
                poolId: poolId
            },
            body: agent
        });
    }

    /**
     * Delete an agent.  You probably don't want to call this endpoint directly. Instead, [use the agent configuration script](https://docs.microsoft.com/azure/devops/pipelines/agents/agents) to remove an agent from your organization.
     * 
     * @param poolId - The pool ID to remove the agent from
     * @param agentId - The agent ID to remove
     */
    public async deleteAgent(
        poolId: number,
        agentId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/agents/{agentId}",
            routeValues: {
                poolId: poolId,
                agentId: agentId
            }
        });
    }

    /**
     * Get information about an agent.
     * 
     * @param poolId - The agent pool containing the agent
     * @param agentId - The agent ID to get information about
     * @param includeCapabilities - Whether to include the agent's capabilities in the response
     * @param includeAssignedRequest - Whether to include details about the agent's current work
     * @param includeLastCompletedRequest - Whether to include details about the agents' most recent completed work
     * @param propertyFilters - Filter which custom properties will be returned
     */
    public async getAgent(
        poolId: number,
        agentId: number,
        includeCapabilities?: boolean,
        includeAssignedRequest?: boolean,
        includeLastCompletedRequest?: boolean,
        propertyFilters?: string[]
        ): Promise<TaskAgent.TaskAgent> {

        const queryValues: any = {
            includeCapabilities: includeCapabilities,
            includeAssignedRequest: includeAssignedRequest,
            includeLastCompletedRequest: includeLastCompletedRequest,
            propertyFilters: propertyFilters && propertyFilters.join(",")
        };

        return this.beginRequest<TaskAgent.TaskAgent>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/agents/{agentId}",
            routeValues: {
                poolId: poolId,
                agentId: agentId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a list of agents.
     * 
     * @param poolId - The agent pool containing the agents
     * @param agentName - Filter on agent name
     * @param includeCapabilities - Whether to include the agents' capabilities in the response
     * @param includeAssignedRequest - Whether to include details about the agents' current work
     * @param includeLastCompletedRequest - Whether to include details about the agents' most recent completed work
     * @param propertyFilters - Filter which custom properties will be returned
     * @param demands - Filter by demands the agents can satisfy
     */
    public async getAgents(
        poolId: number,
        agentName?: string,
        includeCapabilities?: boolean,
        includeAssignedRequest?: boolean,
        includeLastCompletedRequest?: boolean,
        propertyFilters?: string[],
        demands?: string[]
        ): Promise<TaskAgent.TaskAgent[]> {

        const queryValues: any = {
            agentName: agentName,
            includeCapabilities: includeCapabilities,
            includeAssignedRequest: includeAssignedRequest,
            includeLastCompletedRequest: includeLastCompletedRequest,
            propertyFilters: propertyFilters && propertyFilters.join(","),
            demands: demands && demands.join(",")
        };

        return this.beginRequest<TaskAgent.TaskAgent[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/agents/{agentId}",
            routeValues: {
                poolId: poolId
            },
            queryParams: queryValues
        });
    }

    /**
     * Replace an agent.  You probably don't want to call this endpoint directly. Instead, [use the agent configuration script](https://docs.microsoft.com/azure/devops/pipelines/agents/agents) to remove and reconfigure an agent from your organization.
     * 
     * @param agent - Updated details about the replacing agent
     * @param poolId - The agent pool to use
     * @param agentId - The agent to replace
     */
    public async replaceAgent(
        agent: TaskAgent.TaskAgent,
        poolId: number,
        agentId: number
        ): Promise<TaskAgent.TaskAgent> {

        return this.beginRequest<TaskAgent.TaskAgent>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/agents/{agentId}",
            routeValues: {
                poolId: poolId,
                agentId: agentId
            },
            body: agent
        });
    }

    /**
     * Update agent details.
     * 
     * @param agent - Updated details about the agent
     * @param poolId - The agent pool to use
     * @param agentId - The agent to update
     */
    public async updateAgent(
        agent: TaskAgent.TaskAgent,
        poolId: number,
        agentId: number
        ): Promise<TaskAgent.TaskAgent> {

        return this.beginRequest<TaskAgent.TaskAgent>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/agents/{agentId}",
            routeValues: {
                poolId: poolId,
                agentId: agentId
            },
            body: agent
        });
    }

    /**
     * Returns list of azure subscriptions
     * 
     */
    public async getAzureManagementGroups(
        ): Promise<TaskAgent.AzureManagementGroupQueryResult> {

        return this.beginRequest<TaskAgent.AzureManagementGroupQueryResult>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/serviceendpointproxy/azurermmanagementgroups"
        });
    }

    /**
     * Returns list of azure subscriptions
     * 
     */
    public async getAzureSubscriptions(
        ): Promise<TaskAgent.AzureSubscriptionQueryResult> {

        return this.beginRequest<TaskAgent.AzureSubscriptionQueryResult>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/serviceendpointproxy/azurermsubscriptions"
        });
    }

    /**
     * GET a PAT token for managing (configuring, removing, tagging) deployment targets in a deployment group.
     * 
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group in which deployment targets are managed.
     */
    public async generateDeploymentGroupAccessToken(
        project: string,
        deploymentGroupId: number
        ): Promise<string> {

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroupaccesstoken/{deploymentGroupId}",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId
            }
        });
    }

    /**
     * Create a deployment group.
     * 
     * @param deploymentGroup - Deployment group to create.
     * @param project - Project ID or project name
     */
    public async addDeploymentGroup(
        deploymentGroup: TaskAgent.DeploymentGroupCreateParameter,
        project: string
        ): Promise<TaskAgent.DeploymentGroup> {

        return this.beginRequest<TaskAgent.DeploymentGroup>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}",
            routeValues: {
                project: project
            },
            body: deploymentGroup
        });
    }

    /**
     * Delete a deployment group.
     * 
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group to be deleted.
     */
    public async deleteDeploymentGroup(
        project: string,
        deploymentGroupId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId
            }
        });
    }

    /**
     * Get a deployment group by its ID.
     * 
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group.
     * @param actionFilter - Get the deployment group only if this action can be performed on it.
     * @param expand - Include these additional details in the returned object.
     */
    public async getDeploymentGroup(
        project: string,
        deploymentGroupId: number,
        actionFilter?: TaskAgent.DeploymentGroupActionFilter,
        expand?: TaskAgent.DeploymentGroupExpands
        ): Promise<TaskAgent.DeploymentGroup> {

        const queryValues: any = {
            actionFilter: actionFilter,
            '$expand': expand
        };

        return this.beginRequest<TaskAgent.DeploymentGroup>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a list of deployment groups by name or IDs.
     * 
     * @param project - Project ID or project name
     * @param name - Name of the deployment group.
     * @param actionFilter - Get only deployment groups on which this action can be performed.
     * @param expand - Include these additional details in the returned objects.
     * @param continuationToken - Get deployment groups with names greater than this continuationToken lexicographically.
     * @param top - Maximum number of deployment groups to return. Default is **1000**.
     * @param ids - Comma separated list of IDs of the deployment groups.
     */
    public async getDeploymentGroups(
        project: string,
        name?: string,
        actionFilter?: TaskAgent.DeploymentGroupActionFilter,
        expand?: TaskAgent.DeploymentGroupExpands,
        continuationToken?: string,
        top?: number,
        ids?: number[]
        ): Promise<TaskAgent.DeploymentGroup[]> {

        const queryValues: any = {
            name: name,
            actionFilter: actionFilter,
            '$expand': expand,
            continuationToken: continuationToken,
            '$top': top,
            ids: ids && ids.join(",")
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <TaskAgent.DeploymentGroup[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Update a deployment group.
     * 
     * @param deploymentGroup - Deployment group to update.
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group.
     */
    public async updateDeploymentGroup(
        deploymentGroup: TaskAgent.DeploymentGroupUpdateParameter,
        project: string,
        deploymentGroupId: number
        ): Promise<TaskAgent.DeploymentGroup> {

        return this.beginRequest<TaskAgent.DeploymentGroup>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId
            },
            body: deploymentGroup
        });
    }

    /**
     * Get a list of deployment group metrics.
     * 
     * @param project - Project ID or project name
     * @param deploymentGroupName - Name of the deployment group.
     * @param continuationToken - Get metrics for deployment groups with names greater than this continuationToken lexicographically.
     * @param top - Maximum number of deployment group metrics to return. Default is **50**.
     */
    public async getDeploymentGroupsMetrics(
        project: string,
        deploymentGroupName?: string,
        continuationToken?: string,
        top?: number
        ): Promise<TaskAgent.DeploymentGroupMetrics[]> {

        const queryValues: any = {
            deploymentGroupName: deploymentGroupName,
            continuationToken: continuationToken,
            '$top': top
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/deploymentgroupsmetrics",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <TaskAgent.DeploymentGroupMetrics[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * @param project - Project ID or project name
     * @param deploymentGroupId - 
     * @param machineId - 
     * @param completedRequestCount - 
     */
    public async getAgentRequestsForDeploymentMachine(
        project: string,
        deploymentGroupId: number,
        machineId: number,
        completedRequestCount?: number
        ): Promise<TaskAgent.TaskAgentJobRequest[]> {

        const queryValues: any = {
            machineId: machineId,
            completedRequestCount: completedRequestCount
        };

        return this.beginRequest<TaskAgent.TaskAgentJobRequest[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}/deploymentmachinejobrequests/{requestId}",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     * @param deploymentGroupId - 
     * @param machineIds - 
     * @param completedRequestCount - 
     */
    public async getAgentRequestsForDeploymentMachines(
        project: string,
        deploymentGroupId: number,
        machineIds?: number[],
        completedRequestCount?: number
        ): Promise<TaskAgent.TaskAgentJobRequest[]> {

        const queryValues: any = {
            machineIds: machineIds && machineIds.join(","),
            completedRequestCount: completedRequestCount
        };

        return this.beginRequest<TaskAgent.TaskAgentJobRequest[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}/deploymentmachinejobrequests/{requestId}",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     * @param deploymentGroupId - 
     */
    public async refreshDeploymentMachines(
        project: string,
        deploymentGroupId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}/deploymentmachinemessages",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId
            }
        });
    }

    /**
     * GET a PAT token for managing (configuring, removing, tagging) deployment agents in a deployment pool.
     * 
     * @param poolId - ID of the deployment pool in which deployment agents are managed.
     */
    public async generateDeploymentPoolAccessToken(
        poolId: number
        ): Promise<string> {

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/distributedtask/deploymentpoolaccesstoken/{poolId}",
            routeValues: {
                poolId: poolId
            }
        });
    }

    /**
     * Get a list of deployment pool summaries.
     * 
     * @param poolName - Name of the deployment pool.
     * @param expands - Include these additional details in the returned objects.
     * @param poolIds - List of deployment pool ids.
     */
    public async getDeploymentPoolsSummary(
        poolName?: string,
        expands?: TaskAgent.DeploymentPoolSummaryExpands,
        poolIds?: number[]
        ): Promise<TaskAgent.DeploymentPoolSummary[]> {

        const queryValues: any = {
            poolName: poolName,
            expands: expands,
            poolIds: poolIds && poolIds.join(",")
        };

        return this.beginRequest<TaskAgent.DeploymentPoolSummary[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/deploymentPools/deploymentPoolsSummary",
            queryParams: queryValues
        });
    }

    /**
     * Get agent requests for a deployment target.
     * 
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group to which the target belongs.
     * @param targetId - ID of the deployment target.
     * @param completedRequestCount - Maximum number of completed requests to return. Default is **50**
     */
    public async getAgentRequestsForDeploymentTarget(
        project: string,
        deploymentGroupId: number,
        targetId: number,
        completedRequestCount?: number
        ): Promise<TaskAgent.TaskAgentJobRequest[]> {

        const queryValues: any = {
            targetId: targetId,
            completedRequestCount: completedRequestCount
        };

        return this.beginRequest<TaskAgent.TaskAgentJobRequest[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}/deploymentTargetJobRequests",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get agent requests for a list deployment targets.
     * 
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group to which the targets belong.
     * @param targetIds - Comma separated list of IDs of the deployment targets.
     * @param ownerId - Id of owner of agent job request.
     * @param completedOn - Datetime to return request after this time.
     * @param completedRequestCount - Maximum number of completed requests to return for each target. Default is **50**
     */
    public async getAgentRequestsForDeploymentTargets(
        project: string,
        deploymentGroupId: number,
        targetIds?: number[],
        ownerId?: number,
        completedOn?: Date,
        completedRequestCount?: number
        ): Promise<TaskAgent.TaskAgentJobRequest[]> {

        const queryValues: any = {
            targetIds: targetIds && targetIds.join(","),
            ownerId: ownerId,
            completedOn: completedOn,
            completedRequestCount: completedRequestCount
        };

        return this.beginRequest<TaskAgent.TaskAgentJobRequest[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}/deploymentTargetJobRequests",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId
            },
            queryParams: queryValues
        });
    }

    /**
     * Upgrade the deployment targets in a deployment group.
     * 
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group.
     */
    public async refreshDeploymentTargets(
        project: string,
        deploymentGroupId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}/deploymentTargetMessages",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId
            }
        });
    }

    /**
     * Proxy for a GET request defined by an 'endpoint'. The request is authorized using a service connection. The response is filtered using an XPath/Json based selector.
     * 
     * @param endpoint - Describes the URL to fetch.
     */
    public async queryEndpoint(
        endpoint: TaskAgent.TaskDefinitionEndpoint
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/distributedtask/endpoint",
            body: endpoint
        });
    }

    /**
     * Get environment deployment execution history
     * 
     * @param project - Project ID or project name
     * @param environmentId - 
     * @param continuationToken - 
     * @param top - 
     */
    public async getEnvironmentDeploymentExecutionRecords(
        project: string,
        environmentId: number,
        continuationToken?: string,
        top?: number
        ): Promise<TaskAgent.EnvironmentDeploymentExecutionRecord[]> {

        const queryValues: any = {
            continuationToken: continuationToken,
            top: top
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/environments/{environmentId}/environmentdeploymentRecords",
            routeValues: {
                project: project,
                environmentId: environmentId
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <TaskAgent.EnvironmentDeploymentExecutionRecord[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Create an environment.
     * 
     * @param environmentCreateParameter - Environment to create.
     * @param project - Project ID or project name
     */
    public async addEnvironment(
        environmentCreateParameter: TaskAgent.EnvironmentCreateParameter,
        project: string
        ): Promise<TaskAgent.EnvironmentInstance> {

        return this.beginRequest<TaskAgent.EnvironmentInstance>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/distributedtask/environments/{environmentId}",
            routeValues: {
                project: project
            },
            body: environmentCreateParameter
        });
    }

    /**
     * Delete the specified environment.
     * 
     * @param project - Project ID or project name
     * @param environmentId - ID of the environment.
     */
    public async deleteEnvironment(
        project: string,
        environmentId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/distributedtask/environments/{environmentId}",
            routeValues: {
                project: project,
                environmentId: environmentId
            }
        });
    }

    /**
     * Get an environment by its ID.
     * 
     * @param project - Project ID or project name
     * @param environmentId - ID of the environment.
     * @param expands - Include these additional details in the returned objects.
     */
    public async getEnvironmentById(
        project: string,
        environmentId: number,
        expands?: TaskAgent.EnvironmentExpands
        ): Promise<TaskAgent.EnvironmentInstance> {

        const queryValues: any = {
            expands: expands
        };

        return this.beginRequest<TaskAgent.EnvironmentInstance>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/environments/{environmentId}",
            routeValues: {
                project: project,
                environmentId: environmentId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get all environments.
     * 
     * @param project - Project ID or project name
     * @param name - 
     * @param continuationToken - 
     * @param top - 
     */
    public async getEnvironments(
        project: string,
        name?: string,
        continuationToken?: string,
        top?: number
        ): Promise<TaskAgent.EnvironmentInstance[]> {

        const queryValues: any = {
            name: name,
            continuationToken: continuationToken,
            '$top': top
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/environments/{environmentId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <TaskAgent.EnvironmentInstance[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Update the specified environment.
     * 
     * @param environmentUpdateParameter - Environment data to update.
     * @param project - Project ID or project name
     * @param environmentId - ID of the environment.
     */
    public async updateEnvironment(
        environmentUpdateParameter: TaskAgent.EnvironmentUpdateParameter,
        project: string,
        environmentId: number
        ): Promise<TaskAgent.EnvironmentInstance> {

        return this.beginRequest<TaskAgent.EnvironmentInstance>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/distributedtask/environments/{environmentId}",
            routeValues: {
                project: project,
                environmentId: environmentId
            },
            body: environmentUpdateParameter
        });
    }

    /**
     * @param hubName - 
     * @param includeEnterpriseUsersCount - 
     * @param includeHostedAgentMinutesCount - 
     */
    public async getTaskHubLicenseDetails(
        hubName: string,
        includeEnterpriseUsersCount?: boolean,
        includeHostedAgentMinutesCount?: boolean
        ): Promise<TaskAgent.TaskHubLicenseDetails> {

        const queryValues: any = {
            includeEnterpriseUsersCount: includeEnterpriseUsersCount,
            includeHostedAgentMinutesCount: includeHostedAgentMinutesCount
        };

        return this.beginRequest<TaskAgent.TaskHubLicenseDetails>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "_apis/distributedtask/hublicense/{hubName}",
            routeValues: {
                hubName: hubName
            },
            queryParams: queryValues
        });
    }

    /**
     * @param taskHubLicenseDetails - 
     * @param hubName - 
     */
    public async updateTaskHubLicenseDetails(
        taskHubLicenseDetails: TaskAgent.TaskHubLicenseDetails,
        hubName: string
        ): Promise<TaskAgent.TaskHubLicenseDetails> {

        return this.beginRequest<TaskAgent.TaskHubLicenseDetails>({
            apiVersion: "7.1-preview.3",
            method: "PUT",
            routeTemplate: "_apis/distributedtask/hublicense/{hubName}",
            routeValues: {
                hubName: hubName
            },
            body: taskHubLicenseDetails
        });
    }

    /**
     * @param inputValidationRequest - 
     */
    public async validateInputs(
        inputValidationRequest: TaskAgent.InputValidationRequest
        ): Promise<TaskAgent.InputValidationRequest> {

        return this.beginRequest<TaskAgent.InputValidationRequest>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/distributedtask/inputvalidation",
            body: inputValidationRequest
        });
    }

    /**
     * @param poolId - 
     * @param requestId - 
     * @param lockToken - 
     * @param result - 
     * @param agentShuttingDown - 
     */
    public async deleteAgentRequest(
        poolId: number,
        requestId: number,
        lockToken: string,
        result?: TaskAgent.TaskResult,
        agentShuttingDown?: boolean
        ): Promise<void> {

        const queryValues: any = {
            lockToken: lockToken,
            result: result,
            agentShuttingDown: agentShuttingDown
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/jobrequests/{requestId}",
            routeValues: {
                poolId: poolId,
                requestId: requestId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param poolId - 
     * @param requestId - 
     * @param includeStatus - 
     */
    public async getAgentRequest(
        poolId: number,
        requestId: number,
        includeStatus?: boolean
        ): Promise<TaskAgent.TaskAgentJobRequest> {

        const queryValues: any = {
            includeStatus: includeStatus
        };

        return this.beginRequest<TaskAgent.TaskAgentJobRequest>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/jobrequests/{requestId}",
            routeValues: {
                poolId: poolId,
                requestId: requestId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param poolId - 
     * @param top - 
     * @param continuationToken - 
     */
    public async getAgentRequests(
        poolId: number,
        top: number,
        continuationToken?: string
        ): Promise<TaskAgent.TaskAgentJobRequest[]> {

        const queryValues: any = {
            '$top': top,
            continuationToken: continuationToken
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/jobrequests/{requestId}",
            routeValues: {
                poolId: poolId
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <TaskAgent.TaskAgentJobRequest[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * @param poolId - 
     * @param agentId - 
     * @param completedRequestCount - 
     */
    public async getAgentRequestsForAgent(
        poolId: number,
        agentId: number,
        completedRequestCount?: number
        ): Promise<TaskAgent.TaskAgentJobRequest[]> {

        const queryValues: any = {
            agentId: agentId,
            completedRequestCount: completedRequestCount
        };

        return this.beginRequest<TaskAgent.TaskAgentJobRequest[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/jobrequests/{requestId}",
            routeValues: {
                poolId: poolId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param poolId - 
     * @param agentIds - 
     * @param completedRequestCount - 
     */
    public async getAgentRequestsForAgents(
        poolId: number,
        agentIds?: number[],
        completedRequestCount?: number
        ): Promise<TaskAgent.TaskAgentJobRequest[]> {

        const queryValues: any = {
            agentIds: agentIds && agentIds.join(","),
            completedRequestCount: completedRequestCount
        };

        return this.beginRequest<TaskAgent.TaskAgentJobRequest[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/jobrequests/{requestId}",
            routeValues: {
                poolId: poolId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param poolId - 
     * @param planId - 
     * @param jobId - 
     */
    public async getAgentRequestsForPlan(
        poolId: number,
        planId: string,
        jobId?: string
        ): Promise<TaskAgent.TaskAgentJobRequest[]> {

        const queryValues: any = {
            planId: planId,
            jobId: jobId
        };

        return this.beginRequest<TaskAgent.TaskAgentJobRequest[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/jobrequests/{requestId}",
            routeValues: {
                poolId: poolId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param request - 
     * @param poolId - 
     */
    public async queueAgentRequestByPool(
        request: TaskAgent.TaskAgentJobRequest,
        poolId: number
        ): Promise<TaskAgent.TaskAgentJobRequest> {

        return this.beginRequest<TaskAgent.TaskAgentJobRequest>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/jobrequests/{requestId}",
            routeValues: {
                poolId: poolId
            },
            body: request
        });
    }

    /**
     * @param request - 
     * @param poolId - 
     * @param requestId - 
     * @param lockToken - 
     * @param updateOptions - 
     */
    public async updateAgentRequest(
        request: TaskAgent.TaskAgentJobRequest,
        poolId: number,
        requestId: number,
        lockToken: string,
        updateOptions?: TaskAgent.TaskAgentRequestUpdateOptions
        ): Promise<TaskAgent.TaskAgentJobRequest> {

        const queryValues: any = {
            lockToken: lockToken,
            updateOptions: updateOptions
        };

        return this.beginRequest<TaskAgent.TaskAgentJobRequest>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/jobrequests/{requestId}",
            routeValues: {
                poolId: poolId,
                requestId: requestId
            },
            queryParams: queryValues,
            body: request
        });
    }

    /**
     * @param createParameters - 
     * @param project - Project ID or project name
     * @param environmentId - 
     */
    public async addKubernetesResource(
        createParameters: TaskAgent.KubernetesResourceCreateParameters,
        project: string,
        environmentId: number
        ): Promise<TaskAgent.KubernetesResource> {

        return this.beginRequest<TaskAgent.KubernetesResource>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/distributedtask/environments/{environmentId}/providers/kubernetes/{resourceId}",
            routeValues: {
                project: project,
                environmentId: environmentId
            },
            body: createParameters
        });
    }

    /**
     * @param project - Project ID or project name
     * @param environmentId - 
     * @param resourceId - 
     */
    public async deleteKubernetesResource(
        project: string,
        environmentId: number,
        resourceId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/distributedtask/environments/{environmentId}/providers/kubernetes/{resourceId}",
            routeValues: {
                project: project,
                environmentId: environmentId,
                resourceId: resourceId
            }
        });
    }

    /**
     * @param project - Project ID or project name
     * @param environmentId - 
     * @param resourceId - 
     */
    public async getKubernetesResource(
        project: string,
        environmentId: number,
        resourceId: number
        ): Promise<TaskAgent.KubernetesResource> {

        return this.beginRequest<TaskAgent.KubernetesResource>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/environments/{environmentId}/providers/kubernetes/{resourceId}",
            routeValues: {
                project: project,
                environmentId: environmentId,
                resourceId: resourceId
            }
        });
    }

    /**
     * @param project - Project ID or project name
     * @param machineGroupId - 
     */
    public async generateDeploymentMachineGroupAccessToken(
        project: string,
        machineGroupId: number
        ): Promise<string> {

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/distributedtask/machinegroupaccesstoken/{machineGroupId}",
            routeValues: {
                project: project,
                machineGroupId: machineGroupId
            }
        });
    }

    /**
     * @param machineGroup - 
     * @param project - Project ID or project name
     */
    public async addDeploymentMachineGroup(
        machineGroup: TaskAgent.DeploymentMachineGroup,
        project: string
        ): Promise<TaskAgent.DeploymentMachineGroup> {

        return this.beginRequest<TaskAgent.DeploymentMachineGroup>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/distributedtask/machinegroups/{machineGroupId}",
            routeValues: {
                project: project
            },
            body: machineGroup
        });
    }

    /**
     * @param project - Project ID or project name
     * @param machineGroupId - 
     */
    public async deleteDeploymentMachineGroup(
        project: string,
        machineGroupId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/distributedtask/machinegroups/{machineGroupId}",
            routeValues: {
                project: project,
                machineGroupId: machineGroupId
            }
        });
    }

    /**
     * @param project - Project ID or project name
     * @param machineGroupId - 
     * @param actionFilter - 
     */
    public async getDeploymentMachineGroup(
        project: string,
        machineGroupId: number,
        actionFilter?: TaskAgent.MachineGroupActionFilter
        ): Promise<TaskAgent.DeploymentMachineGroup> {

        const queryValues: any = {
            actionFilter: actionFilter
        };

        return this.beginRequest<TaskAgent.DeploymentMachineGroup>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/machinegroups/{machineGroupId}",
            routeValues: {
                project: project,
                machineGroupId: machineGroupId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     * @param machineGroupName - 
     * @param actionFilter - 
     */
    public async getDeploymentMachineGroups(
        project: string,
        machineGroupName?: string,
        actionFilter?: TaskAgent.MachineGroupActionFilter
        ): Promise<TaskAgent.DeploymentMachineGroup[]> {

        const queryValues: any = {
            machineGroupName: machineGroupName,
            actionFilter: actionFilter
        };

        return this.beginRequest<TaskAgent.DeploymentMachineGroup[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/machinegroups/{machineGroupId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * @param machineGroup - 
     * @param project - Project ID or project name
     * @param machineGroupId - 
     */
    public async updateDeploymentMachineGroup(
        machineGroup: TaskAgent.DeploymentMachineGroup,
        project: string,
        machineGroupId: number
        ): Promise<TaskAgent.DeploymentMachineGroup> {

        return this.beginRequest<TaskAgent.DeploymentMachineGroup>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/distributedtask/machinegroups/{machineGroupId}",
            routeValues: {
                project: project,
                machineGroupId: machineGroupId
            },
            body: machineGroup
        });
    }

    /**
     * @param project - Project ID or project name
     * @param machineGroupId - 
     * @param tagFilters - 
     */
    public async getDeploymentMachineGroupMachines(
        project: string,
        machineGroupId: number,
        tagFilters?: string[]
        ): Promise<TaskAgent.DeploymentMachine[]> {

        const queryValues: any = {
            tagFilters: tagFilters && tagFilters.join(",")
        };

        return this.beginRequest<TaskAgent.DeploymentMachine[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/machinegroups/{machineGroupId}/machines",
            routeValues: {
                project: project,
                machineGroupId: machineGroupId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param deploymentMachines - 
     * @param project - Project ID or project name
     * @param machineGroupId - 
     */
    public async updateDeploymentMachineGroupMachines(
        deploymentMachines: TaskAgent.DeploymentMachine[],
        project: string,
        machineGroupId: number
        ): Promise<TaskAgent.DeploymentMachine[]> {

        return this.beginRequest<TaskAgent.DeploymentMachine[]>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/distributedtask/machinegroups/{machineGroupId}/machines",
            routeValues: {
                project: project,
                machineGroupId: machineGroupId
            },
            body: deploymentMachines
        });
    }

    /**
     * @param machine - 
     * @param project - Project ID or project name
     * @param deploymentGroupId - 
     */
    public async addDeploymentMachine(
        machine: TaskAgent.DeploymentMachine,
        project: string,
        deploymentGroupId: number
        ): Promise<TaskAgent.DeploymentMachine> {

        return this.beginRequest<TaskAgent.DeploymentMachine>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}/machines/{machineId}",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId
            },
            body: machine
        });
    }

    /**
     * @param project - Project ID or project name
     * @param deploymentGroupId - 
     * @param machineId - 
     */
    public async deleteDeploymentMachine(
        project: string,
        deploymentGroupId: number,
        machineId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}/machines/{machineId}",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId,
                machineId: machineId
            }
        });
    }

    /**
     * @param project - Project ID or project name
     * @param deploymentGroupId - 
     * @param machineId - 
     * @param expand - 
     */
    public async getDeploymentMachine(
        project: string,
        deploymentGroupId: number,
        machineId: number,
        expand?: TaskAgent.DeploymentMachineExpands
        ): Promise<TaskAgent.DeploymentMachine> {

        const queryValues: any = {
            '$expand': expand
        };

        return this.beginRequest<TaskAgent.DeploymentMachine>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}/machines/{machineId}",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId,
                machineId: machineId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     * @param deploymentGroupId - 
     * @param tags - 
     * @param name - 
     * @param expand - 
     */
    public async getDeploymentMachines(
        project: string,
        deploymentGroupId: number,
        tags?: string[],
        name?: string,
        expand?: TaskAgent.DeploymentMachineExpands
        ): Promise<TaskAgent.DeploymentMachine[]> {

        const queryValues: any = {
            tags: tags && tags.join(","),
            name: name,
            '$expand': expand
        };

        return this.beginRequest<TaskAgent.DeploymentMachine[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}/machines/{machineId}",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param machine - 
     * @param project - Project ID or project name
     * @param deploymentGroupId - 
     * @param machineId - 
     */
    public async replaceDeploymentMachine(
        machine: TaskAgent.DeploymentMachine,
        project: string,
        deploymentGroupId: number,
        machineId: number
        ): Promise<TaskAgent.DeploymentMachine> {

        return this.beginRequest<TaskAgent.DeploymentMachine>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}/machines/{machineId}",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId,
                machineId: machineId
            },
            body: machine
        });
    }

    /**
     * @param machine - 
     * @param project - Project ID or project name
     * @param deploymentGroupId - 
     * @param machineId - 
     */
    public async updateDeploymentMachine(
        machine: TaskAgent.DeploymentMachine,
        project: string,
        deploymentGroupId: number,
        machineId: number
        ): Promise<TaskAgent.DeploymentMachine> {

        return this.beginRequest<TaskAgent.DeploymentMachine>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}/machines/{machineId}",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId,
                machineId: machineId
            },
            body: machine
        });
    }

    /**
     * @param machines - 
     * @param project - Project ID or project name
     * @param deploymentGroupId - 
     */
    public async updateDeploymentMachines(
        machines: TaskAgent.DeploymentMachine[],
        project: string,
        deploymentGroupId: number
        ): Promise<TaskAgent.DeploymentMachine[]> {

        return this.beginRequest<TaskAgent.DeploymentMachine[]>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}/machines/{machineId}",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId
            },
            body: machines
        });
    }

    /**
     * @param definition - 
     * @param poolId - 
     */
    public async createAgentPoolMaintenanceDefinition(
        definition: TaskAgent.TaskAgentPoolMaintenanceDefinition,
        poolId: number
        ): Promise<TaskAgent.TaskAgentPoolMaintenanceDefinition> {

        return this.beginRequest<TaskAgent.TaskAgentPoolMaintenanceDefinition>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/maintenancedefinitions/{definitionId}",
            routeValues: {
                poolId: poolId
            },
            body: definition
        });
    }

    /**
     * @param poolId - 
     * @param definitionId - 
     */
    public async deleteAgentPoolMaintenanceDefinition(
        poolId: number,
        definitionId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/maintenancedefinitions/{definitionId}",
            routeValues: {
                poolId: poolId,
                definitionId: definitionId
            }
        });
    }

    /**
     * @param poolId - 
     * @param definitionId - 
     */
    public async getAgentPoolMaintenanceDefinition(
        poolId: number,
        definitionId: number
        ): Promise<TaskAgent.TaskAgentPoolMaintenanceDefinition> {

        return this.beginRequest<TaskAgent.TaskAgentPoolMaintenanceDefinition>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/maintenancedefinitions/{definitionId}",
            routeValues: {
                poolId: poolId,
                definitionId: definitionId
            }
        });
    }

    /**
     * @param poolId - 
     */
    public async getAgentPoolMaintenanceDefinitions(
        poolId: number
        ): Promise<TaskAgent.TaskAgentPoolMaintenanceDefinition[]> {

        return this.beginRequest<TaskAgent.TaskAgentPoolMaintenanceDefinition[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/maintenancedefinitions/{definitionId}",
            routeValues: {
                poolId: poolId
            }
        });
    }

    /**
     * @param definition - 
     * @param poolId - 
     * @param definitionId - 
     */
    public async updateAgentPoolMaintenanceDefinition(
        definition: TaskAgent.TaskAgentPoolMaintenanceDefinition,
        poolId: number,
        definitionId: number
        ): Promise<TaskAgent.TaskAgentPoolMaintenanceDefinition> {

        return this.beginRequest<TaskAgent.TaskAgentPoolMaintenanceDefinition>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/maintenancedefinitions/{definitionId}",
            routeValues: {
                poolId: poolId,
                definitionId: definitionId
            },
            body: definition
        });
    }

    /**
     * @param poolId - 
     * @param jobId - 
     */
    public async deleteAgentPoolMaintenanceJob(
        poolId: number,
        jobId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/maintenancejobs/{jobId}",
            routeValues: {
                poolId: poolId,
                jobId: jobId
            }
        });
    }

    /**
     * @param poolId - 
     * @param jobId - 
     */
    public async getAgentPoolMaintenanceJob(
        poolId: number,
        jobId: number
        ): Promise<TaskAgent.TaskAgentPoolMaintenanceJob> {

        return this.beginRequest<TaskAgent.TaskAgentPoolMaintenanceJob>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/maintenancejobs/{jobId}",
            routeValues: {
                poolId: poolId,
                jobId: jobId
            }
        });
    }

    /**
     * @param poolId - 
     * @param jobId - 
     */
    public async getAgentPoolMaintenanceJobLogs(
        poolId: number,
        jobId: number
        ): Promise<ArrayBuffer> {

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/zip",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/maintenancejobs/{jobId}",
            routeValues: {
                poolId: poolId,
                jobId: jobId
            }
        });
    }

    /**
     * @param poolId - 
     * @param definitionId - 
     */
    public async getAgentPoolMaintenanceJobs(
        poolId: number,
        definitionId?: number
        ): Promise<TaskAgent.TaskAgentPoolMaintenanceJob[]> {

        const queryValues: any = {
            definitionId: definitionId
        };

        return this.beginRequest<TaskAgent.TaskAgentPoolMaintenanceJob[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/maintenancejobs/{jobId}",
            routeValues: {
                poolId: poolId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param job - 
     * @param poolId - 
     */
    public async queueAgentPoolMaintenanceJob(
        job: TaskAgent.TaskAgentPoolMaintenanceJob,
        poolId: number
        ): Promise<TaskAgent.TaskAgentPoolMaintenanceJob> {

        return this.beginRequest<TaskAgent.TaskAgentPoolMaintenanceJob>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/maintenancejobs/{jobId}",
            routeValues: {
                poolId: poolId
            },
            body: job
        });
    }

    /**
     * @param job - 
     * @param poolId - 
     * @param jobId - 
     */
    public async updateAgentPoolMaintenanceJob(
        job: TaskAgent.TaskAgentPoolMaintenanceJob,
        poolId: number,
        jobId: number
        ): Promise<TaskAgent.TaskAgentPoolMaintenanceJob> {

        return this.beginRequest<TaskAgent.TaskAgentPoolMaintenanceJob>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/maintenancejobs/{jobId}",
            routeValues: {
                poolId: poolId,
                jobId: jobId
            },
            body: job
        });
    }

    /**
     * @param poolId - 
     * @param messageId - 
     * @param sessionId - 
     */
    public async deleteMessage(
        poolId: number,
        messageId: number,
        sessionId: string
        ): Promise<void> {

        const queryValues: any = {
            sessionId: sessionId
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/messages/{messageId}",
            routeValues: {
                poolId: poolId,
                messageId: messageId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param poolId - 
     * @param sessionId - 
     * @param lastMessageId - 
     */
    public async getMessage(
        poolId: number,
        sessionId: string,
        lastMessageId?: number
        ): Promise<TaskAgent.TaskAgentMessage> {

        const queryValues: any = {
            sessionId: sessionId,
            lastMessageId: lastMessageId
        };

        return this.beginRequest<TaskAgent.TaskAgentMessage>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/messages/{messageId}",
            routeValues: {
                poolId: poolId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param poolId - 
     * @param agentId - 
     */
    public async refreshAgent(
        poolId: number,
        agentId: number
        ): Promise<void> {

        const queryValues: any = {
            agentId: agentId
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/messages/{messageId}",
            routeValues: {
                poolId: poolId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param poolId - 
     */
    public async refreshAgents(
        poolId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/messages/{messageId}",
            routeValues: {
                poolId: poolId
            }
        });
    }

    /**
     * @param message - 
     * @param poolId - 
     * @param requestId - 
     */
    public async sendMessage(
        message: TaskAgent.TaskAgentMessage,
        poolId: number,
        requestId: number
        ): Promise<void> {

        const queryValues: any = {
            requestId: requestId
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/messages/{messageId}",
            routeValues: {
                poolId: poolId
            },
            queryParams: queryValues,
            body: message
        });
    }

    /**
     * @param packageType - 
     * @param platform - 
     * @param version - 
     */
    public async getPackage(
        packageType: string,
        platform: string,
        version: string
        ): Promise<TaskAgent.PackageMetadata> {

        return this.beginRequest<TaskAgent.PackageMetadata>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/distributedtask/packages/{packageType}/{platform}/{version}",
            routeValues: {
                packageType: packageType,
                platform: platform,
                version: version
            }
        });
    }

    /**
     * @param packageType - 
     * @param platform - 
     * @param top - 
     */
    public async getPackages(
        packageType: string,
        platform?: string,
        top?: number
        ): Promise<TaskAgent.PackageMetadata[]> {

        const queryValues: any = {
            '$top': top
        };

        return this.beginRequest<TaskAgent.PackageMetadata[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/distributedtask/packages/{packageType}/{platform}/{version}",
            routeValues: {
                packageType: packageType,
                platform: platform
            },
            queryParams: queryValues
        });
    }

    /**
     * @param poolId - 
     */
    public async getAgentPoolMetadata(
        poolId: number
        ): Promise<string> {

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "text/plain",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/poolmetadata",
            routeValues: {
                poolId: poolId
            }
        });
    }

    /**
     * @param agentPoolMetadata - 
     * @param poolId - 
     */
    public async setAgentPoolMetadata(
        agentPoolMetadata: any,
        poolId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/poolmetadata",
            routeValues: {
                poolId: poolId
            },
            customHeaders: {
                "Content-Type": "application/octet-stream",
            },
            body: agentPoolMetadata,
            isRawData: true
        });
    }

    /**
     * Create an agent pool.
     * 
     * @param pool - Details about the new agent pool
     */
    public async addAgentPool(
        pool: TaskAgent.TaskAgentPool
        ): Promise<TaskAgent.TaskAgentPool> {

        return this.beginRequest<TaskAgent.TaskAgentPool>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/distributedtask/pools/{poolId}",
            body: pool
        });
    }

    /**
     * Delete an agent pool.
     * 
     * @param poolId - ID of the agent pool to delete
     */
    public async deleteAgentPool(
        poolId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/distributedtask/pools/{poolId}",
            routeValues: {
                poolId: poolId
            }
        });
    }

    /**
     * Get information about an agent pool.
     * 
     * @param poolId - An agent pool ID
     * @param properties - Agent pool properties (comma-separated)
     * @param actionFilter - Filter by whether the calling user has use or manage permissions
     */
    public async getAgentPool(
        poolId: number,
        properties?: string[],
        actionFilter?: TaskAgent.TaskAgentPoolActionFilter
        ): Promise<TaskAgent.TaskAgentPool> {

        const queryValues: any = {
            properties: properties && properties.join(","),
            actionFilter: actionFilter
        };

        return this.beginRequest<TaskAgent.TaskAgentPool>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/pools/{poolId}",
            routeValues: {
                poolId: poolId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a list of agent pools.
     * 
     * @param poolName - Filter by name
     * @param properties - Filter by agent pool properties (comma-separated)
     * @param poolType - Filter by pool type
     * @param actionFilter - Filter by whether the calling user has use or manage permissions
     */
    public async getAgentPools(
        poolName?: string,
        properties?: string[],
        poolType?: TaskAgent.TaskAgentPoolType,
        actionFilter?: TaskAgent.TaskAgentPoolActionFilter
        ): Promise<TaskAgent.TaskAgentPool[]> {

        const queryValues: any = {
            poolName: poolName,
            properties: properties && properties.join(","),
            poolType: poolType,
            actionFilter: actionFilter
        };

        return this.beginRequest<TaskAgent.TaskAgentPool[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/pools/{poolId}",
            queryParams: queryValues
        });
    }

    /**
     * Get a list of agent pools.
     * 
     * @param poolIds - pool Ids to fetch
     * @param actionFilter - Filter by whether the calling user has use or manage permissions
     */
    public async getAgentPoolsByIds(
        poolIds: number[],
        actionFilter?: TaskAgent.TaskAgentPoolActionFilter
        ): Promise<TaskAgent.TaskAgentPool[]> {

        const queryValues: any = {
            poolIds: poolIds && poolIds.join(","),
            actionFilter: actionFilter
        };

        return this.beginRequest<TaskAgent.TaskAgentPool[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/pools/{poolId}",
            queryParams: queryValues
        });
    }

    /**
     * Update properties on an agent pool
     * 
     * @param pool - Updated agent pool details
     * @param poolId - The agent pool to update
     */
    public async updateAgentPool(
        pool: TaskAgent.TaskAgentPool,
        poolId: number
        ): Promise<TaskAgent.TaskAgentPool> {

        return this.beginRequest<TaskAgent.TaskAgentPool>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/distributedtask/pools/{poolId}",
            routeValues: {
                poolId: poolId
            },
            body: pool
        });
    }

    /**
     * Create a new agent queue to connect a project to an agent pool.
     * 
     * @param queue - Details about the queue to create
     * @param project - Project ID or project name
     * @param authorizePipelines - Automatically authorize this queue when using YAML
     */
    public async addAgentQueue(
        queue: TaskAgent.TaskAgentQueue,
        project?: string,
        authorizePipelines?: boolean
        ): Promise<TaskAgent.TaskAgentQueue> {

        const queryValues: any = {
            authorizePipelines: authorizePipelines
        };

        return this.beginRequest<TaskAgent.TaskAgentQueue>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/distributedtask/queues/{queueId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            body: queue
        });
    }

    /**
     * Create a new team project.
     * 
     * @param project - Project ID or project name
     */
    public async createTeamProject(
        project?: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "{project}/_apis/distributedtask/queues/{queueId}",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * Removes an agent queue from a project.
     * 
     * @param queueId - The agent queue to remove
     * @param project - Project ID or project name
     */
    public async deleteAgentQueue(
        queueId: number,
        project?: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/distributedtask/queues/{queueId}",
            routeValues: {
                project: project,
                queueId: queueId
            }
        });
    }

    /**
     * Get information about an agent queue.
     * 
     * @param queueId - The agent queue to get information about
     * @param project - Project ID or project name
     * @param actionFilter - Filter by whether the calling user has use or manage permissions
     */
    public async getAgentQueue(
        queueId: number,
        project?: string,
        actionFilter?: TaskAgent.TaskAgentQueueActionFilter
        ): Promise<TaskAgent.TaskAgentQueue> {

        const queryValues: any = {
            actionFilter: actionFilter
        };

        return this.beginRequest<TaskAgent.TaskAgentQueue>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/queues/{queueId}",
            routeValues: {
                project: project,
                queueId: queueId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a list of agent queues.
     * 
     * @param project - Project ID or project name
     * @param queueName - Filter on the agent queue name
     * @param actionFilter - Filter by whether the calling user has use or manage permissions
     */
    public async getAgentQueues(
        project?: string,
        queueName?: string,
        actionFilter?: TaskAgent.TaskAgentQueueActionFilter
        ): Promise<TaskAgent.TaskAgentQueue[]> {

        const queryValues: any = {
            queueName: queueName,
            actionFilter: actionFilter
        };

        return this.beginRequest<TaskAgent.TaskAgentQueue[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/queues/{queueId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a list of agent queues by their IDs
     * 
     * @param queueIds - A comma-separated list of agent queue IDs to retrieve
     * @param project - Project ID or project name
     * @param actionFilter - Filter by whether the calling user has use or manage permissions
     */
    public async getAgentQueuesByIds(
        queueIds: number[],
        project?: string,
        actionFilter?: TaskAgent.TaskAgentQueueActionFilter
        ): Promise<TaskAgent.TaskAgentQueue[]> {

        const queryValues: any = {
            queueIds: queueIds && queueIds.join(","),
            actionFilter: actionFilter
        };

        return this.beginRequest<TaskAgent.TaskAgentQueue[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/queues/{queueId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a list of agent queues by their names
     * 
     * @param queueNames - A comma-separated list of agent names to retrieve
     * @param project - Project ID or project name
     * @param actionFilter - Filter by whether the calling user has use or manage permissions
     */
    public async getAgentQueuesByNames(
        queueNames: string[],
        project?: string,
        actionFilter?: TaskAgent.TaskAgentQueueActionFilter
        ): Promise<TaskAgent.TaskAgentQueue[]> {

        const queryValues: any = {
            queueNames: queueNames && queueNames.join(","),
            actionFilter: actionFilter
        };

        return this.beginRequest<TaskAgent.TaskAgentQueue[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/queues/{queueId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a list of agent queues by pool ids
     * 
     * @param poolIds - A comma-separated list of pool ids to get the corresponding queues for
     * @param project - Project ID or project name
     * @param actionFilter - Filter by whether the calling user has use or manage permissions
     */
    public async getAgentQueuesForPools(
        poolIds: number[],
        project?: string,
        actionFilter?: TaskAgent.TaskAgentQueueActionFilter
        ): Promise<TaskAgent.TaskAgentQueue[]> {

        const queryValues: any = {
            poolIds: poolIds && poolIds.join(","),
            actionFilter: actionFilter
        };

        return this.beginRequest<TaskAgent.TaskAgentQueue[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/queues/{queueId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * @param agentCloudId - 
     */
    public async getAgentCloudRequests(
        agentCloudId: number
        ): Promise<TaskAgent.TaskAgentCloudRequest[]> {

        return this.beginRequest<TaskAgent.TaskAgentCloudRequest[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/agentclouds/{agentCloudId}/requests/{agentCloudRequestId}",
            routeValues: {
                agentCloudId: agentCloudId
            }
        });
    }

    /**
     */
    public async getResourceLimits(
        ): Promise<TaskAgent.ResourceLimit[]> {

        return this.beginRequest<TaskAgent.ResourceLimit[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/resourcelimits"
        });
    }

    /**
     * @param parallelismTag - 
     * @param poolIsHosted - 
     * @param includeRunningRequests - 
     */
    public async getResourceUsage(
        parallelismTag?: string,
        poolIsHosted?: boolean,
        includeRunningRequests?: boolean
        ): Promise<TaskAgent.ResourceUsage> {

        const queryValues: any = {
            parallelismTag: parallelismTag,
            poolIsHosted: poolIsHosted,
            includeRunningRequests: includeRunningRequests
        };

        return this.beginRequest<TaskAgent.ResourceUsage>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/distributedtask/resourceusage",
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     * @param taskGroupId - 
     */
    public async getTaskGroupHistory(
        project: string,
        taskGroupId: string
        ): Promise<TaskAgent.TaskGroupRevision[]> {

        return this.beginRequest<TaskAgent.TaskGroupRevision[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/taskgroups/{taskGroupId}/revisions",
            routeValues: {
                project: project,
                taskGroupId: taskGroupId
            }
        });
    }

    /**
     * Delete a secure file
     * 
     * @param project - Project ID or project name
     * @param secureFileId - The unique secure file Id
     */
    public async deleteSecureFile(
        project: string,
        secureFileId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/distributedtask/securefiles/{secureFileId}",
            routeValues: {
                project: project,
                secureFileId: secureFileId
            }
        });
    }

    /**
     * Download a secure file by Id
     * 
     * @param project - Project ID or project name
     * @param secureFileId - The unique secure file Id
     * @param ticket - A valid download ticket
     * @param download - If download is true, the file is sent as attachement in the response body. If download is false, the response body contains the file stream.
     */
    public async downloadSecureFile(
        project: string,
        secureFileId: string,
        ticket: string,
        download?: boolean
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            ticket: ticket,
            download: download
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "{project}/_apis/distributedtask/securefiles/{secureFileId}",
            routeValues: {
                project: project,
                secureFileId: secureFileId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a secure file
     * 
     * @param project - Project ID or project name
     * @param secureFileId - The unique secure file Id
     * @param includeDownloadTicket - If includeDownloadTicket is true and the caller has permissions, a download ticket is included in the response.
     * @param actionFilter - 
     */
    public async getSecureFile(
        project: string,
        secureFileId: string,
        includeDownloadTicket?: boolean,
        actionFilter?: TaskAgent.SecureFileActionFilter
        ): Promise<TaskAgent.SecureFile> {

        const queryValues: any = {
            includeDownloadTicket: includeDownloadTicket,
            actionFilter: actionFilter
        };

        return this.beginRequest<TaskAgent.SecureFile>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/securefiles/{secureFileId}",
            routeValues: {
                project: project,
                secureFileId: secureFileId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get secure files
     * 
     * @param project - Project ID or project name
     * @param namePattern - Name of the secure file to match. Can include wildcards to match multiple files.
     * @param includeDownloadTickets - If includeDownloadTickets is true and the caller has permissions, a download ticket for each secure file is included in the response.
     * @param actionFilter - Filter by secure file permissions for View, Manage or Use action. Defaults to View.
     */
    public async getSecureFiles(
        project: string,
        namePattern?: string,
        includeDownloadTickets?: boolean,
        actionFilter?: TaskAgent.SecureFileActionFilter
        ): Promise<TaskAgent.SecureFile[]> {

        const queryValues: any = {
            namePattern: namePattern,
            includeDownloadTickets: includeDownloadTickets,
            actionFilter: actionFilter
        };

        return this.beginRequest<TaskAgent.SecureFile[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/securefiles/{secureFileId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Get secure files
     * 
     * @param project - Project ID or project name
     * @param secureFileIds - A list of secure file Ids
     * @param includeDownloadTickets - If includeDownloadTickets is true and the caller has permissions, a download ticket for each secure file is included in the response.
     * @param actionFilter - 
     */
    public async getSecureFilesByIds(
        project: string,
        secureFileIds: string[],
        includeDownloadTickets?: boolean,
        actionFilter?: TaskAgent.SecureFileActionFilter
        ): Promise<TaskAgent.SecureFile[]> {

        const queryValues: any = {
            secureFileIds: secureFileIds && secureFileIds.join(","),
            includeDownloadTickets: includeDownloadTickets,
            actionFilter: actionFilter
        };

        return this.beginRequest<TaskAgent.SecureFile[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/securefiles/{secureFileId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Get secure files
     * 
     * @param project - Project ID or project name
     * @param secureFileNames - A list of secure file Ids
     * @param includeDownloadTickets - If includeDownloadTickets is true and the caller has permissions, a download ticket for each secure file is included in the response.
     * @param actionFilter - 
     */
    public async getSecureFilesByNames(
        project: string,
        secureFileNames: string[],
        includeDownloadTickets?: boolean,
        actionFilter?: TaskAgent.SecureFileActionFilter
        ): Promise<TaskAgent.SecureFile[]> {

        const queryValues: any = {
            secureFileNames: secureFileNames && secureFileNames.join(","),
            includeDownloadTickets: includeDownloadTickets,
            actionFilter: actionFilter
        };

        return this.beginRequest<TaskAgent.SecureFile[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/securefiles/{secureFileId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Query secure files using a name pattern and a condition on file properties.
     * 
     * @param condition - The main condition syntax is described [here](https://go.microsoft.com/fwlink/?linkid=842996). Use the *property('property-name')* function to access the value of the specified property of a secure file. It returns null if the property is not set. E.g. \`\`\` and( eq( property('devices'), '2' ), in( property('provisioning profile type'), 'ad hoc', 'development' ) ) \`\`\`
     * @param project - Project ID or project name
     * @param namePattern - Name of the secure file to match. Can include wildcards to match multiple files.
     */
    public async querySecureFilesByProperties(
        condition: string,
        project: string,
        namePattern?: string
        ): Promise<TaskAgent.SecureFile[]> {

        const queryValues: any = {
            namePattern: namePattern
        };

        return this.beginRequest<TaskAgent.SecureFile[]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/distributedtask/securefiles/{secureFileId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            body: condition
        });
    }

    /**
     * Update the name or properties of an existing secure file
     * 
     * @param secureFile - The secure file with updated name and/or properties
     * @param project - Project ID or project name
     * @param secureFileId - The unique secure file Id
     */
    public async updateSecureFile(
        secureFile: TaskAgent.SecureFile,
        project: string,
        secureFileId: string
        ): Promise<TaskAgent.SecureFile> {

        return this.beginRequest<TaskAgent.SecureFile>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/distributedtask/securefiles/{secureFileId}",
            routeValues: {
                project: project,
                secureFileId: secureFileId
            },
            body: secureFile
        });
    }

    /**
     * Update properties and/or names of a set of secure files. Files are identified by their IDs. Properties provided override the existing one entirely, i.e. do not merge.
     * 
     * @param secureFiles - A list of secure file objects. Only three field must be populated Id, Name, and Properties. The rest of fields in the object are ignored.
     * @param project - Project ID or project name
     */
    public async updateSecureFiles(
        secureFiles: TaskAgent.SecureFile[],
        project: string
        ): Promise<TaskAgent.SecureFile[]> {

        return this.beginRequest<TaskAgent.SecureFile[]>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/distributedtask/securefiles/{secureFileId}",
            routeValues: {
                project: project
            },
            body: secureFiles
        });
    }

    /**
     * Upload a secure file, include the file stream in the request body
     * 
     * @param content - Content to upload
     * @param project - Project ID or project name
     * @param name - Name of the file to upload
     * @param authorizePipelines - If authorizePipelines is true, then the secure file is authorized for use by all pipelines in the project.
     */
    public async uploadSecureFile(
        content: any,
        project: string,
        name: string,
        authorizePipelines?: boolean
        ): Promise<TaskAgent.SecureFile> {

        const queryValues: any = {
            name: name,
            authorizePipelines: authorizePipelines
        };

        return this.beginRequest<TaskAgent.SecureFile>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/distributedtask/securefiles/{secureFileId}",
            routeValues: {
                project: project
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
     * @param session - 
     * @param poolId - 
     */
    public async createAgentSession(
        session: TaskAgent.TaskAgentSession,
        poolId: number
        ): Promise<TaskAgent.TaskAgentSession> {

        return this.beginRequest<TaskAgent.TaskAgentSession>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/sessions/{sessionId}",
            routeValues: {
                poolId: poolId
            },
            body: session
        });
    }

    /**
     * @param poolId - 
     * @param sessionId - 
     */
    public async deleteAgentSession(
        poolId: number,
        sessionId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/sessions/{sessionId}",
            routeValues: {
                poolId: poolId,
                sessionId: sessionId
            }
        });
    }

    /**
     * Register a deployment target to a deployment group. Generally this is called by agent configuration tool.
     * 
     * @param machine - Deployment target to register.
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group to which the deployment target is registered.
     */
    public async addDeploymentTarget(
        machine: TaskAgent.DeploymentMachine,
        project: string,
        deploymentGroupId: number
        ): Promise<TaskAgent.DeploymentMachine> {

        return this.beginRequest<TaskAgent.DeploymentMachine>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}/targets/{targetId}",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId
            },
            body: machine
        });
    }

    /**
     * Delete a deployment target in a deployment group. This deletes the agent from associated deployment pool too.
     * 
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group in which deployment target is deleted.
     * @param targetId - ID of the deployment target to delete.
     */
    public async deleteDeploymentTarget(
        project: string,
        deploymentGroupId: number,
        targetId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}/targets/{targetId}",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId,
                targetId: targetId
            }
        });
    }

    /**
     * Get a deployment target by its ID in a deployment group
     * 
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group to which deployment target belongs.
     * @param targetId - ID of the deployment target to return.
     * @param expand - Include these additional details in the returned objects.
     */
    public async getDeploymentTarget(
        project: string,
        deploymentGroupId: number,
        targetId: number,
        expand?: TaskAgent.DeploymentTargetExpands
        ): Promise<TaskAgent.DeploymentMachine> {

        const queryValues: any = {
            '$expand': expand
        };

        return this.beginRequest<TaskAgent.DeploymentMachine>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}/targets/{targetId}",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId,
                targetId: targetId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a list of deployment targets in a deployment group.
     * 
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group.
     * @param tags - Get only the deployment targets that contain all these comma separted list of tags.
     * @param name - Name pattern of the deployment targets to return.
     * @param partialNameMatch - When set to true, treats **name** as pattern. Else treats it as absolute match. Default is **false**.
     * @param expand - Include these additional details in the returned objects.
     * @param agentStatus - Get only deployment targets that have this status.
     * @param agentJobResult - Get only deployment targets that have this last job result.
     * @param continuationToken - Get deployment targets with names greater than this continuationToken lexicographically.
     * @param top - Maximum number of deployment targets to return. Default is **1000**.
     * @param enabled - Get only deployment targets that are enabled or disabled. Default is 'null' which returns all the targets.
     * @param propertyFilters - 
     */
    public async getDeploymentTargets(
        project: string,
        deploymentGroupId: number,
        tags?: string[],
        name?: string,
        partialNameMatch?: boolean,
        expand?: TaskAgent.DeploymentTargetExpands,
        agentStatus?: TaskAgent.TaskAgentStatusFilter,
        agentJobResult?: TaskAgent.TaskAgentJobResultFilter,
        continuationToken?: string,
        top?: number,
        enabled?: boolean,
        propertyFilters?: string[]
        ): Promise<TaskAgent.DeploymentMachine[]> {

        const queryValues: any = {
            tags: tags && tags.join(","),
            name: name,
            partialNameMatch: partialNameMatch,
            '$expand': expand,
            agentStatus: agentStatus,
            agentJobResult: agentJobResult,
            continuationToken: continuationToken,
            '$top': top,
            enabled: enabled,
            propertyFilters: propertyFilters && propertyFilters.join(",")
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}/targets/{targetId}",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <TaskAgent.DeploymentMachine[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Replace a deployment target in a deployment group. Generally this is called by agent configuration tool.
     * 
     * @param machine - New deployment target.
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group in which deployment target is replaced.
     * @param targetId - ID of the deployment target to replace.
     */
    public async replaceDeploymentTarget(
        machine: TaskAgent.DeploymentMachine,
        project: string,
        deploymentGroupId: number,
        targetId: number
        ): Promise<TaskAgent.DeploymentMachine> {

        return this.beginRequest<TaskAgent.DeploymentMachine>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}/targets/{targetId}",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId,
                targetId: targetId
            },
            body: machine
        });
    }

    /**
     * Update a deployment target and its agent properties in a deployment group. Generally this is called by agent configuration tool.
     * 
     * @param machine - Deployment target to update.
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group in which deployment target is updated.
     * @param targetId - ID of the deployment target to update.
     */
    public async updateDeploymentTarget(
        machine: TaskAgent.DeploymentMachine,
        project: string,
        deploymentGroupId: number,
        targetId: number
        ): Promise<TaskAgent.DeploymentMachine> {

        return this.beginRequest<TaskAgent.DeploymentMachine>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}/targets/{targetId}",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId,
                targetId: targetId
            },
            body: machine
        });
    }

    /**
     * Update tags of a list of deployment targets in a deployment group.
     * 
     * @param machines - Deployment targets with tags to udpdate.
     * @param project - Project ID or project name
     * @param deploymentGroupId - ID of the deployment group in which deployment targets are updated.
     */
    public async updateDeploymentTargets(
        machines: TaskAgent.DeploymentTargetUpdateParameter[],
        project: string,
        deploymentGroupId: number
        ): Promise<TaskAgent.DeploymentMachine[]> {

        return this.beginRequest<TaskAgent.DeploymentMachine[]>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/distributedtask/deploymentgroups/{deploymentGroupId}/targets/{targetId}",
            routeValues: {
                project: project,
                deploymentGroupId: deploymentGroupId
            },
            body: machines
        });
    }

    /**
     * Create a task group.
     * 
     * @param taskGroup - Task group object to create.
     * @param project - Project ID or project name
     */
    public async addTaskGroup(
        taskGroup: TaskAgent.TaskGroupCreateParameter,
        project: string
        ): Promise<TaskAgent.TaskGroup> {

        return this.beginRequest<TaskAgent.TaskGroup>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/distributedtask/taskgroups/{taskGroupId}",
            routeValues: {
                project: project
            },
            body: taskGroup
        });
    }

    /**
     * Delete a task group.
     * 
     * @param project - Project ID or project name
     * @param taskGroupId - Id of the task group to be deleted.
     * @param comment - Comments to delete.
     */
    public async deleteTaskGroup(
        project: string,
        taskGroupId: string,
        comment?: string
        ): Promise<void> {

        const queryValues: any = {
            comment: comment
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/distributedtask/taskgroups/{taskGroupId}",
            routeValues: {
                project: project,
                taskGroupId: taskGroupId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get task group.
     * 
     * @param project - Project ID or project name
     * @param taskGroupId - Id of the task group.
     * @param versionSpec - version specification of the task group. examples: 1, 1.0.
     * @param expand - The properties that should be expanded. example $expand=Tasks will expand nested task groups.
     */
    public async getTaskGroup(
        project: string,
        taskGroupId: string,
        versionSpec: string,
        expand?: TaskAgent.TaskGroupExpands
        ): Promise<TaskAgent.TaskGroup> {

        const queryValues: any = {
            versionSpec: versionSpec,
            '$expand': expand
        };

        return this.beginRequest<TaskAgent.TaskGroup>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/taskgroups/{taskGroupId}",
            routeValues: {
                project: project,
                taskGroupId: taskGroupId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     * @param taskGroupId - 
     * @param revision - 
     */
    public async getTaskGroupRevision(
        project: string,
        taskGroupId: string,
        revision: number
        ): Promise<string> {

        const queryValues: any = {
            revision: revision
        };

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "text/plain",
            routeTemplate: "{project}/_apis/distributedtask/taskgroups/{taskGroupId}",
            routeValues: {
                project: project,
                taskGroupId: taskGroupId
            },
            queryParams: queryValues
        });
    }

    /**
     * List task groups.
     * 
     * @param project - Project ID or project name
     * @param taskGroupId - Id of the task group.
     * @param expanded - 'true' to recursively expand task groups. Default is 'false'.
     * @param taskIdFilter - Guid of the taskId to filter.
     * @param deleted - 'true'to include deleted task groups. Default is 'false'.
     * @param top - Number of task groups to get.
     * @param continuationToken - Gets the task groups after the continuation token provided.
     * @param queryOrder - Gets the results in the defined order. Default is 'CreatedOnDescending'.
     */
    public async getTaskGroups(
        project: string,
        taskGroupId?: string,
        expanded?: boolean,
        taskIdFilter?: string,
        deleted?: boolean,
        top?: number,
        continuationToken?: Date,
        queryOrder?: TaskAgent.TaskGroupQueryOrder
        ): Promise<TaskAgent.TaskGroup[]> {

        const queryValues: any = {
            expanded: expanded,
            taskIdFilter: taskIdFilter,
            deleted: deleted,
            '$top': top,
            continuationToken: continuationToken,
            queryOrder: queryOrder
        };

        return this.beginRequest<TaskAgent.TaskGroup[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/taskgroups/{taskGroupId}",
            routeValues: {
                project: project,
                taskGroupId: taskGroupId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param taskGroupMetadata - 
     * @param project - Project ID or project name
     * @param parentTaskGroupId - 
     */
    public async publishTaskGroup(
        taskGroupMetadata: TaskAgent.PublishTaskGroupMetadata,
        project: string,
        parentTaskGroupId: string
        ): Promise<TaskAgent.TaskGroup[]> {

        const queryValues: any = {
            parentTaskGroupId: parentTaskGroupId
        };

        return this.beginRequest<TaskAgent.TaskGroup[]>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "{project}/_apis/distributedtask/taskgroups/{taskGroupId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            body: taskGroupMetadata
        });
    }

    /**
     * @param taskGroup - 
     * @param project - Project ID or project name
     */
    public async undeleteTaskGroup(
        taskGroup: TaskAgent.TaskGroup,
        project: string
        ): Promise<TaskAgent.TaskGroup[]> {

        return this.beginRequest<TaskAgent.TaskGroup[]>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/distributedtask/taskgroups/{taskGroupId}",
            routeValues: {
                project: project
            },
            body: taskGroup
        });
    }

    /**
     * Update a task group.
     * 
     * @param taskGroup - Task group to update.
     * @param project - Project ID or project name
     * @param taskGroupId - Id of the task group to update.
     */
    public async updateTaskGroup(
        taskGroup: TaskAgent.TaskGroupUpdateParameter,
        project: string,
        taskGroupId?: string
        ): Promise<TaskAgent.TaskGroup> {

        return this.beginRequest<TaskAgent.TaskGroup>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "{project}/_apis/distributedtask/taskgroups/{taskGroupId}",
            routeValues: {
                project: project,
                taskGroupId: taskGroupId
            },
            body: taskGroup
        });
    }

    /**
     * @param taskGroupUpdateProperties - 
     * @param project - Project ID or project name
     * @param taskGroupId - 
     * @param disablePriorVersions - 
     */
    public async updateTaskGroupProperties(
        taskGroupUpdateProperties: TaskAgent.TaskGroupUpdatePropertiesBase,
        project: string,
        taskGroupId: string,
        disablePriorVersions?: boolean
        ): Promise<TaskAgent.TaskGroup[]> {

        const queryValues: any = {
            disablePriorVersions: disablePriorVersions
        };

        return this.beginRequest<TaskAgent.TaskGroup[]>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/distributedtask/taskgroups/{taskGroupId}",
            routeValues: {
                project: project,
                taskGroupId: taskGroupId
            },
            queryParams: queryValues,
            body: taskGroupUpdateProperties
        });
    }

    /**
     * @param taskId - 
     */
    public async deleteTaskDefinition(
        taskId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/distributedtask/tasks/{taskId}/{versionString}",
            routeValues: {
                taskId: taskId
            }
        });
    }

    /**
     * @param taskId - 
     * @param versionString - 
     * @param visibility - 
     * @param scopeLocal - 
     */
    public async getTaskContentZip(
        taskId: string,
        versionString: string,
        visibility?: string[],
        scopeLocal?: boolean
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            visibility: visibility,
            scopeLocal: scopeLocal
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/zip",
            routeTemplate: "_apis/distributedtask/tasks/{taskId}/{versionString}",
            routeValues: {
                taskId: taskId,
                versionString: versionString
            },
            queryParams: queryValues
        });
    }

    /**
     * @param taskId - 
     * @param versionString - 
     * @param visibility - 
     * @param scopeLocal - 
     */
    public async getTaskDefinition(
        taskId: string,
        versionString: string,
        visibility?: string[],
        scopeLocal?: boolean
        ): Promise<TaskAgent.TaskDefinition> {

        const queryValues: any = {
            visibility: visibility,
            scopeLocal: scopeLocal
        };

        return this.beginRequest<TaskAgent.TaskDefinition>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/tasks/{taskId}/{versionString}",
            routeValues: {
                taskId: taskId,
                versionString: versionString
            },
            queryParams: queryValues
        });
    }

    /**
     * @param taskId - 
     * @param visibility - 
     * @param scopeLocal - 
     * @param allVersions - 
     */
    public async getTaskDefinitions(
        taskId?: string,
        visibility?: string[],
        scopeLocal?: boolean,
        allVersions?: boolean
        ): Promise<TaskAgent.TaskDefinition[]> {

        const queryValues: any = {
            visibility: visibility,
            scopeLocal: scopeLocal,
            allVersions: allVersions
        };

        return this.beginRequest<TaskAgent.TaskDefinition[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/tasks/{taskId}/{versionString}",
            routeValues: {
                taskId: taskId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param poolId - 
     * @param agentId - 
     * @param currentState - 
     */
    public async updateAgentUpdateState(
        poolId: number,
        agentId: number,
        currentState: string
        ): Promise<TaskAgent.TaskAgent> {

        const queryValues: any = {
            currentState: currentState
        };

        return this.beginRequest<TaskAgent.TaskAgent>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/agents/{agentId}/updates",
            routeValues: {
                poolId: poolId,
                agentId: agentId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param userCapabilities - 
     * @param poolId - 
     * @param agentId - 
     */
    public async updateAgentUserCapabilities(
        userCapabilities: { [key: string] : string; },
        poolId: number,
        agentId: number
        ): Promise<TaskAgent.TaskAgent> {

        return this.beginRequest<TaskAgent.TaskAgent>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/distributedtask/pools/{poolId}/agents/{agentId}/usercapabilities",
            routeValues: {
                poolId: poolId,
                agentId: agentId
            },
            body: userCapabilities
        });
    }

    /**
     * Add a variable group.
     * 
     * @param variableGroupParameters - 
     */
    public async addVariableGroup(
        variableGroupParameters: TaskAgent.VariableGroupParameters
        ): Promise<TaskAgent.VariableGroup> {

        return this.beginRequest<TaskAgent.VariableGroup>({
            apiVersion: "7.1-preview.2",
            method: "POST",
            routeTemplate: "_apis/distributedtask/variablegroups/{groupId}",
            body: variableGroupParameters
        });
    }

    /**
     * Delete a variable group
     * 
     * @param groupId - Id of the variable group.
     * @param projectIds - 
     */
    public async deleteVariableGroup(
        groupId: number,
        projectIds: string[]
        ): Promise<void> {

        const queryValues: any = {
            projectIds: projectIds && projectIds.join(",")
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.2",
            method: "DELETE",
            routeTemplate: "_apis/distributedtask/variablegroups/{groupId}",
            routeValues: {
                groupId: groupId
            },
            queryParams: queryValues
        });
    }

    /**
     * Add a variable group.
     * 
     * @param variableGroupProjectReferences - 
     * @param variableGroupId - 
     */
    public async shareVariableGroup(
        variableGroupProjectReferences: TaskAgent.VariableGroupProjectReference[],
        variableGroupId: number
        ): Promise<void> {

        const queryValues: any = {
            variableGroupId: variableGroupId
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.2",
            method: "PATCH",
            routeTemplate: "_apis/distributedtask/variablegroups/{groupId}",
            queryParams: queryValues,
            body: variableGroupProjectReferences
        });
    }

    /**
     * Update a variable group.
     * 
     * @param variableGroupParameters - 
     * @param groupId - Id of the variable group to update.
     */
    public async updateVariableGroup(
        variableGroupParameters: TaskAgent.VariableGroupParameters,
        groupId: number
        ): Promise<TaskAgent.VariableGroup> {

        return this.beginRequest<TaskAgent.VariableGroup>({
            apiVersion: "7.1-preview.2",
            method: "PUT",
            routeTemplate: "_apis/distributedtask/variablegroups/{groupId}",
            routeValues: {
                groupId: groupId
            },
            body: variableGroupParameters
        });
    }

    /**
     * Get a variable group.
     * 
     * @param project - Project ID or project name
     * @param groupId - Id of the variable group.
     */
    public async getVariableGroup(
        project: string,
        groupId: number
        ): Promise<TaskAgent.VariableGroup> {

        return this.beginRequest<TaskAgent.VariableGroup>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/distributedtask/variablegroups/{groupId}",
            routeValues: {
                project: project,
                groupId: groupId
            }
        });
    }

    /**
     * Get variable groups.
     * 
     * @param project - Project ID or project name
     * @param groupName - Name of variable group.
     * @param actionFilter - Action filter for the variable group. It specifies the action which can be performed on the variable groups.
     * @param top - Number of variable groups to get.
     * @param continuationToken - Gets the variable groups after the continuation token provided.
     * @param queryOrder - Gets the results in the defined order. Default is 'IdDescending'.
     */
    public async getVariableGroups(
        project: string,
        groupName?: string,
        actionFilter?: TaskAgent.VariableGroupActionFilter,
        top?: number,
        continuationToken?: number,
        queryOrder?: TaskAgent.VariableGroupQueryOrder
        ): Promise<TaskAgent.VariableGroup[]> {

        const queryValues: any = {
            groupName: groupName,
            actionFilter: actionFilter,
            '$top': top,
            continuationToken: continuationToken,
            queryOrder: queryOrder
        };

        return this.beginRequest<TaskAgent.VariableGroup[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/distributedtask/variablegroups/{groupId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Get variable groups by ids.
     * 
     * @param project - Project ID or project name
     * @param groupIds - Comma separated list of Ids of variable groups.
     */
    public async getVariableGroupsById(
        project: string,
        groupIds: number[]
        ): Promise<TaskAgent.VariableGroup[]> {

        const queryValues: any = {
            groupIds: groupIds && groupIds.join(",")
        };

        return this.beginRequest<TaskAgent.VariableGroup[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/distributedtask/variablegroups/{groupId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * @param createParameters - 
     * @param project - Project ID or project name
     * @param environmentId - 
     */
    public async addVirtualMachineGroup(
        createParameters: TaskAgent.VirtualMachineGroupCreateParameters,
        project: string,
        environmentId: number
        ): Promise<TaskAgent.VirtualMachineGroup> {

        return this.beginRequest<TaskAgent.VirtualMachineGroup>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/distributedtask/environments/{environmentId}/providers/virtualmachinegroups/{resourceId}",
            routeValues: {
                project: project,
                environmentId: environmentId
            },
            body: createParameters
        });
    }

    /**
     * @param project - Project ID or project name
     * @param environmentId - 
     * @param resourceId - 
     */
    public async deleteVirtualMachineGroup(
        project: string,
        environmentId: number,
        resourceId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/distributedtask/environments/{environmentId}/providers/virtualmachinegroups/{resourceId}",
            routeValues: {
                project: project,
                environmentId: environmentId,
                resourceId: resourceId
            }
        });
    }

    /**
     * @param project - Project ID or project name
     * @param environmentId - 
     * @param resourceId - 
     */
    public async getVirtualMachineGroup(
        project: string,
        environmentId: number,
        resourceId: number
        ): Promise<TaskAgent.VirtualMachineGroup> {

        return this.beginRequest<TaskAgent.VirtualMachineGroup>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/environments/{environmentId}/providers/virtualmachinegroups/{resourceId}",
            routeValues: {
                project: project,
                environmentId: environmentId,
                resourceId: resourceId
            }
        });
    }

    /**
     * @param resource - 
     * @param project - Project ID or project name
     * @param environmentId - 
     */
    public async updateVirtualMachineGroup(
        resource: TaskAgent.VirtualMachineGroup,
        project: string,
        environmentId: number
        ): Promise<TaskAgent.VirtualMachineGroup> {

        return this.beginRequest<TaskAgent.VirtualMachineGroup>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/distributedtask/environments/{environmentId}/providers/virtualmachinegroups/{resourceId}",
            routeValues: {
                project: project,
                environmentId: environmentId
            },
            body: resource
        });
    }

    /**
     * @param project - Project ID or project name
     * @param environmentId - 
     * @param resourceId - 
     * @param continuationToken - 
     * @param name - 
     * @param partialNameMatch - 
     * @param tags - 
     * @param top - 
     */
    public async getVirtualMachines(
        project: string,
        environmentId: number,
        resourceId: number,
        continuationToken?: string,
        name?: string,
        partialNameMatch?: boolean,
        tags?: string[],
        top?: number
        ): Promise<TaskAgent.VirtualMachine[]> {

        const queryValues: any = {
            continuationToken: continuationToken,
            name: name,
            partialNameMatch: partialNameMatch,
            tags: tags && tags.join(","),
            '$top': top
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/distributedtask/environments/{environmentId}/providers/virtualmachinegroups/{resourceId}/virtualmachines",
            routeValues: {
                project: project,
                environmentId: environmentId,
                resourceId: resourceId
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <TaskAgent.VirtualMachine[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * @param machines - 
     * @param project - Project ID or project name
     * @param environmentId - 
     * @param resourceId - 
     */
    public async updateVirtualMachines(
        machines: TaskAgent.VirtualMachine[],
        project: string,
        environmentId: number,
        resourceId: number
        ): Promise<TaskAgent.VirtualMachine[]> {

        return this.beginRequest<TaskAgent.VirtualMachine[]>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/distributedtask/environments/{environmentId}/providers/virtualmachinegroups/{resourceId}/virtualmachines",
            routeValues: {
                project: project,
                environmentId: environmentId,
                resourceId: resourceId
            },
            body: machines
        });
    }

    /**
     * @param tenantId - 
     * @param redirectUri - 
     * @param promptOption - 
     * @param completeCallbackPayload - 
     * @param completeCallbackByAuthCode - 
     */
    public async createAadOAuthRequest(
        tenantId: string,
        redirectUri: string,
        promptOption?: TaskAgent.AadLoginPromptOption,
        completeCallbackPayload?: string,
        completeCallbackByAuthCode?: boolean
        ): Promise<string> {

        const queryValues: any = {
            tenantId: tenantId,
            redirectUri: redirectUri,
            promptOption: promptOption,
            completeCallbackPayload: completeCallbackPayload,
            completeCallbackByAuthCode: completeCallbackByAuthCode
        };

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/distributedtask/serviceendpointproxy/vstsaadoauth",
            queryParams: queryValues
        });
    }

    /**
     */
    public async getVstsAadTenantId(
        ): Promise<string> {

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/serviceendpointproxy/vstsaadoauth"
        });
    }

    /**
     * GET the Yaml schema used for Yaml file validation.
     * 
     * @param validateTaskNames - Whether the schema should validate that tasks are actually installed (useful for offline tools where you don't want validation).
     */
    public async getYamlSchema(
        validateTaskNames?: boolean
        ): Promise<any> {

        const queryValues: any = {
            validateTaskNames: validateTaskNames
        };

        return this.beginRequest<any>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/distributedtask/yamlschema",
            queryParams: queryValues
        });
    }

}
