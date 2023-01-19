/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as FeatureManagement from "../FeatureManagement/FeatureManagement";

export class FeatureManagementRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    /**
     * Get a specific feature by its id
     * 
     * @param featureId - The contribution id of the feature
     */
    public async getFeature(
        featureId: string
        ): Promise<FeatureManagement.ContributedFeature> {

        return this.beginRequest<FeatureManagement.ContributedFeature>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/FeatureManagement/Features/{featureId}",
            routeValues: {
                featureId: featureId
            }
        });
    }

    /**
     * Get a list of all defined features
     * 
     * @param targetContributionId - Optional target contribution. If null/empty, return all features. If specified include the features that target the specified contribution.
     */
    public async getFeatures(
        targetContributionId?: string
        ): Promise<FeatureManagement.ContributedFeature[]> {

        const queryValues: any = {
            targetContributionId: targetContributionId
        };

        return this.beginRequest<FeatureManagement.ContributedFeature[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/FeatureManagement/Features/{featureId}",
            queryParams: queryValues
        });
    }

    /**
     * Get the state of the specified feature for the given user/all-users scope
     * 
     * @param featureId - Contribution id of the feature
     * @param userScope - User-Scope at which to get the value. Should be "me" for the current user or "host" for all users.
     */
    public async getFeatureState(
        featureId: string,
        userScope: string
        ): Promise<FeatureManagement.ContributedFeatureState> {

        return this.beginRequest<FeatureManagement.ContributedFeatureState>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/FeatureManagement/FeatureStates/{userScope}/{featureId}",
            routeValues: {
                featureId: featureId,
                userScope: userScope
            }
        });
    }

    /**
     * Set the state of a feature
     * 
     * @param feature - Posted feature state object. Should specify the effective value.
     * @param featureId - Contribution id of the feature
     * @param userScope - User-Scope at which to set the value. Should be "me" for the current user or "host" for all users.
     * @param reason - Reason for changing the state
     * @param reasonCode - Short reason code
     */
    public async setFeatureState(
        feature: FeatureManagement.ContributedFeatureState,
        featureId: string,
        userScope: string,
        reason?: string,
        reasonCode?: string
        ): Promise<FeatureManagement.ContributedFeatureState> {

        const queryValues: any = {
            reason: reason,
            reasonCode: reasonCode
        };

        return this.beginRequest<FeatureManagement.ContributedFeatureState>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/FeatureManagement/FeatureStates/{userScope}/{featureId}",
            routeValues: {
                featureId: featureId,
                userScope: userScope
            },
            queryParams: queryValues,
            body: feature
        });
    }

    /**
     * Get the state of the specified feature for the given named scope
     * 
     * @param featureId - Contribution id of the feature
     * @param userScope - User-Scope at which to get the value. Should be "me" for the current user or "host" for all users.
     * @param scopeName - Scope at which to get the feature setting for (e.g. "project" or "team")
     * @param scopeValue - Value of the scope (e.g. the project or team id)
     */
    public async getFeatureStateForScope(
        featureId: string,
        userScope: string,
        scopeName: string,
        scopeValue: string
        ): Promise<FeatureManagement.ContributedFeatureState> {

        return this.beginRequest<FeatureManagement.ContributedFeatureState>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/FeatureManagement/FeatureStates/{userScope}/{scopeName}/{scopeValue}/{featureId}",
            routeValues: {
                featureId: featureId,
                userScope: userScope,
                scopeName: scopeName,
                scopeValue: scopeValue
            }
        });
    }

    /**
     * Set the state of a feature at a specific scope
     * 
     * @param feature - Posted feature state object. Should specify the effective value.
     * @param featureId - Contribution id of the feature
     * @param userScope - User-Scope at which to set the value. Should be "me" for the current user or "host" for all users.
     * @param scopeName - Scope at which to get the feature setting for (e.g. "project" or "team")
     * @param scopeValue - Value of the scope (e.g. the project or team id)
     * @param reason - Reason for changing the state
     * @param reasonCode - Short reason code
     */
    public async setFeatureStateForScope(
        feature: FeatureManagement.ContributedFeatureState,
        featureId: string,
        userScope: string,
        scopeName: string,
        scopeValue: string,
        reason?: string,
        reasonCode?: string
        ): Promise<FeatureManagement.ContributedFeatureState> {

        const queryValues: any = {
            reason: reason,
            reasonCode: reasonCode
        };

        return this.beginRequest<FeatureManagement.ContributedFeatureState>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/FeatureManagement/FeatureStates/{userScope}/{scopeName}/{scopeValue}/{featureId}",
            routeValues: {
                featureId: featureId,
                userScope: userScope,
                scopeName: scopeName,
                scopeValue: scopeValue
            },
            queryParams: queryValues,
            body: feature
        });
    }

    /**
     * Get the effective state for a list of feature ids
     * 
     * @param query - Features to query along with current scope values
     */
    public async queryFeatureStates(
        query: FeatureManagement.ContributedFeatureStateQuery
        ): Promise<FeatureManagement.ContributedFeatureStateQuery> {

        return this.beginRequest<FeatureManagement.ContributedFeatureStateQuery>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/FeatureManagement/FeatureStatesQuery",
            body: query
        });
    }

    /**
     * Get the states of the specified features for the default scope
     * 
     * @param query - Query describing the features to query.
     * @param userScope - 
     */
    public async queryFeatureStatesForDefaultScope(
        query: FeatureManagement.ContributedFeatureStateQuery,
        userScope: string
        ): Promise<FeatureManagement.ContributedFeatureStateQuery> {

        return this.beginRequest<FeatureManagement.ContributedFeatureStateQuery>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/FeatureManagement/FeatureStatesQuery/{userScope}",
            routeValues: {
                userScope: userScope
            },
            body: query
        });
    }

    /**
     * Get the states of the specified features for the specific named scope
     * 
     * @param query - Query describing the features to query.
     * @param userScope - 
     * @param scopeName - 
     * @param scopeValue - 
     */
    public async queryFeatureStatesForNamedScope(
        query: FeatureManagement.ContributedFeatureStateQuery,
        userScope: string,
        scopeName: string,
        scopeValue: string
        ): Promise<FeatureManagement.ContributedFeatureStateQuery> {

        return this.beginRequest<FeatureManagement.ContributedFeatureStateQuery>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/FeatureManagement/FeatureStatesQuery/{userScope}/{scopeName}/{scopeValue}",
            routeValues: {
                userScope: userScope,
                scopeName: scopeName,
                scopeValue: scopeValue
            },
            body: query
        });
    }

}
