/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import { deserializeVssJsonObject } from "../Common/Util/Serialization";

import * as Policy from "../Policy/Policy";

export class PolicyRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "fb13a388-40dd-4a04-b530-013a739c72ef";

    /**
     * Create a policy configuration of a given policy type.
     * 
     * @param configuration - The policy configuration to create.
     * @param project - Project ID or project name
     */
    public async createPolicyConfiguration(
        configuration: Policy.PolicyConfiguration,
        project: string
        ): Promise<Policy.PolicyConfiguration> {

        return this.beginRequest<Policy.PolicyConfiguration>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/policy/Configurations/{configurationId}",
            routeValues: {
                project: project
            },
            body: configuration
        });
    }

    /**
     * Delete a policy configuration by its ID.
     * 
     * @param project - Project ID or project name
     * @param configurationId - ID of the policy configuration to delete.
     */
    public async deletePolicyConfiguration(
        project: string,
        configurationId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/policy/Configurations/{configurationId}",
            routeValues: {
                project: project,
                configurationId: configurationId
            }
        });
    }

    /**
     * Get a policy configuration by its ID.
     * 
     * @param project - Project ID or project name
     * @param configurationId - ID of the policy configuration
     */
    public async getPolicyConfiguration(
        project: string,
        configurationId: number
        ): Promise<Policy.PolicyConfiguration> {

        return this.beginRequest<Policy.PolicyConfiguration>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/policy/Configurations/{configurationId}",
            routeValues: {
                project: project,
                configurationId: configurationId
            }
        });
    }

    /**
     * Get a list of policy configurations in a project.
     * 
     * @param project - Project ID or project name
     * @param scope - [Provided for legacy reasons] The scope on which a subset of policies is defined.
     * @param policyType - Filter returned policies to only this type
     */
    public async getPolicyConfigurations(
        project: string,
        scope?: string,
        policyType?: string
        ): Promise<Policy.PolicyConfiguration[]> {

        const queryValues: any = {
            scope: scope,
            policyType: policyType
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/policy/Configurations/{configurationId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <Policy.PolicyConfiguration[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Update a policy configuration by its ID.
     * 
     * @param configuration - The policy configuration to update.
     * @param project - Project ID or project name
     * @param configurationId - ID of the existing policy configuration to be updated.
     */
    public async updatePolicyConfiguration(
        configuration: Policy.PolicyConfiguration,
        project: string,
        configurationId: number
        ): Promise<Policy.PolicyConfiguration> {

        return this.beginRequest<Policy.PolicyConfiguration>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "{project}/_apis/policy/Configurations/{configurationId}",
            routeValues: {
                project: project,
                configurationId: configurationId
            },
            body: configuration
        });
    }

    /**
     * Gets the present evaluation state of a policy.
     * 
     * @param project - Project ID or project name
     * @param evaluationId - ID of the policy evaluation to be retrieved.
     */
    public async getPolicyEvaluation(
        project: string,
        evaluationId: string
        ): Promise<Policy.PolicyEvaluationRecord> {

        return this.beginRequest<Policy.PolicyEvaluationRecord>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/policy/Evaluations/{evaluationId}",
            routeValues: {
                project: project,
                evaluationId: evaluationId
            }
        });
    }

    /**
     * Requeue the policy evaluation.
     * 
     * @param project - Project ID or project name
     * @param evaluationId - ID of the policy evaluation to be retrieved.
     */
    public async requeuePolicyEvaluation(
        project: string,
        evaluationId: string
        ): Promise<Policy.PolicyEvaluationRecord> {

        return this.beginRequest<Policy.PolicyEvaluationRecord>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/policy/Evaluations/{evaluationId}",
            routeValues: {
                project: project,
                evaluationId: evaluationId
            }
        });
    }

    /**
     * Retrieves a list of all the policy evaluation statuses for a specific pull request.
     * 
     * @param project - Project ID or project name
     * @param artifactId - A string which uniquely identifies the target of a policy evaluation.
     * @param includeNotApplicable - Some policies might determine that they do not apply to a specific pull request. Setting this parameter to true will return evaluation records even for policies which don't apply to this pull request.
     * @param top - The number of policy evaluation records to retrieve.
     * @param skip - The number of policy evaluation records to ignore. For example, to retrieve results 101-150, set top to 50 and skip to 100.
     */
    public async getPolicyEvaluations(
        project: string,
        artifactId: string,
        includeNotApplicable?: boolean,
        top?: number,
        skip?: number
        ): Promise<Policy.PolicyEvaluationRecord[]> {

        const queryValues: any = {
            artifactId: artifactId,
            includeNotApplicable: includeNotApplicable,
            '$top': top,
            '$skip': skip
        };

        return this.beginRequest<Policy.PolicyEvaluationRecord[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/policy/Evaluations",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Retrieve a specific revision of a given policy by ID.
     * 
     * @param project - Project ID or project name
     * @param configurationId - The policy configuration ID.
     * @param revisionId - The revision ID.
     */
    public async getPolicyConfigurationRevision(
        project: string,
        configurationId: number,
        revisionId: number
        ): Promise<Policy.PolicyConfiguration> {

        return this.beginRequest<Policy.PolicyConfiguration>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/policy/configurations/{configurationId}/Revisions/{revisionId}",
            routeValues: {
                project: project,
                configurationId: configurationId,
                revisionId: revisionId
            }
        });
    }

    /**
     * Retrieve all revisions for a given policy.
     * 
     * @param project - Project ID or project name
     * @param configurationId - The policy configuration ID.
     * @param top - The number of revisions to retrieve.
     * @param skip - The number of revisions to ignore. For example, to retrieve results 101-150, set top to 50 and skip to 100.
     */
    public async getPolicyConfigurationRevisions(
        project: string,
        configurationId: number,
        top?: number,
        skip?: number
        ): Promise<Policy.PolicyConfiguration[]> {

        const queryValues: any = {
            '$top': top,
            '$skip': skip
        };

        return this.beginRequest<Policy.PolicyConfiguration[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/policy/configurations/{configurationId}/Revisions/{revisionId}",
            routeValues: {
                project: project,
                configurationId: configurationId
            },
            queryParams: queryValues
        });
    }

    /**
     * Retrieve a specific policy type by ID.
     * 
     * @param project - Project ID or project name
     * @param typeId - The policy ID.
     */
    public async getPolicyType(
        project: string,
        typeId: string
        ): Promise<Policy.PolicyType> {

        return this.beginRequest<Policy.PolicyType>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/policy/Types/{typeId}",
            routeValues: {
                project: project,
                typeId: typeId
            }
        });
    }

    /**
     * Retrieve all available policy types.
     * 
     * @param project - Project ID or project name
     */
    public async getPolicyTypes(
        project: string
        ): Promise<Policy.PolicyType[]> {

        return this.beginRequest<Policy.PolicyType[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/policy/Types/{typeId}",
            routeValues: {
                project: project
            }
        });
    }

}
