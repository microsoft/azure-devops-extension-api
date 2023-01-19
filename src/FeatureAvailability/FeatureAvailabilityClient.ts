/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as FeatureAvailability from "../FeatureAvailability/FeatureAvailability";

export class FeatureAvailabilityRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    /**
     * Retrieve a listing of all feature flags and their current states for a user
     * 
     * @param userEmail - The email of the user to check
     */
    public async getAllFeatureFlags(
        userEmail?: string
        ): Promise<FeatureAvailability.FeatureFlag[]> {

        const queryValues: any = {
            userEmail: userEmail
        };

        return this.beginRequest<FeatureAvailability.FeatureFlag[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/FeatureFlags/{name}",
            queryParams: queryValues
        });
    }

    /**
     * Retrieve information on a single feature flag and its current states
     * 
     * @param name - The name of the feature to retrieve
     * @param checkFeatureExists - Check if feature exists
     */
    public async getFeatureFlagByName(
        name: string,
        checkFeatureExists?: boolean
        ): Promise<FeatureAvailability.FeatureFlag> {

        const queryValues: any = {
            checkFeatureExists: checkFeatureExists
        };

        return this.beginRequest<FeatureAvailability.FeatureFlag>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/FeatureFlags/{name}",
            routeValues: {
                name: name
            },
            queryParams: queryValues
        });
    }

    /**
     * Retrieve information on a single feature flag and its current states for a user
     * 
     * @param name - The name of the feature to retrieve
     * @param userEmail - The email of the user to check
     * @param checkFeatureExists - Check if feature exists
     */
    public async getFeatureFlagByNameAndUserEmail(
        name: string,
        userEmail: string,
        checkFeatureExists?: boolean
        ): Promise<FeatureAvailability.FeatureFlag> {

        const queryValues: any = {
            userEmail: userEmail,
            checkFeatureExists: checkFeatureExists
        };

        return this.beginRequest<FeatureAvailability.FeatureFlag>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/FeatureFlags/{name}",
            routeValues: {
                name: name
            },
            queryParams: queryValues
        });
    }

    /**
     * Retrieve information on a single feature flag and its current states for a user
     * 
     * @param name - The name of the feature to retrieve
     * @param userId - The id of the user to check
     * @param checkFeatureExists - Check if feature exists
     */
    public async getFeatureFlagByNameAndUserId(
        name: string,
        userId: string,
        checkFeatureExists?: boolean
        ): Promise<FeatureAvailability.FeatureFlag> {

        const queryValues: any = {
            userId: userId,
            checkFeatureExists: checkFeatureExists
        };

        return this.beginRequest<FeatureAvailability.FeatureFlag>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/FeatureFlags/{name}",
            routeValues: {
                name: name
            },
            queryParams: queryValues
        });
    }

    /**
     * Change the state of an individual feature flag for a name
     * 
     * @param state - State that should be set
     * @param name - The name of the feature to change
     * @param userEmail - 
     * @param checkFeatureExists - Checks if the feature exists before setting the state
     * @param setAtApplicationLevelAlso - 
     */
    public async updateFeatureFlag(
        state: FeatureAvailability.FeatureFlagPatch,
        name: string,
        userEmail?: string,
        checkFeatureExists?: boolean,
        setAtApplicationLevelAlso?: boolean
        ): Promise<FeatureAvailability.FeatureFlag> {

        const queryValues: any = {
            userEmail: userEmail,
            checkFeatureExists: checkFeatureExists,
            setAtApplicationLevelAlso: setAtApplicationLevelAlso
        };

        return this.beginRequest<FeatureAvailability.FeatureFlag>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/FeatureFlags/{name}",
            routeValues: {
                name: name
            },
            queryParams: queryValues,
            body: state
        });
    }

}
