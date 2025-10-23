﻿/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as Management from "../Management/Management";

export class ManagementRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    /**
     * During multi-org billing computation in primary scale unit(EUS21), this API is used to create billing snapshot for a specific org. Primary scale unit will call this API for each org in different scsle units to create billing snapshot. Data will be stored in the org specific partition DB -\> billing snapshot table. This is needed as customers will fetch billing data from their org specific partition DB.
     * 
     * @param meterUsage - 
     * @param plan - 
     */
    public async createBillingSnapshot2(
        meterUsage: Management.MeterUsageForPlan,
        plan: Management.Plan
        ): Promise<void> {

        const queryValues: any = {
            plan: plan
        };

        return this.beginRequest<void>({
            apiVersion: "7.2-preview.3",
            method: "POST",
            routeTemplate: "_apis/Management/MeterUsage/{action}",
            routeValues: {
                action: "Default"
            },
            queryParams: queryValues,
            body: meterUsage
        });
    }

    /**
     * Get all billable committers details, including those not matched with a VSID.
     * 
     * @param plan - The plan to query. Plans supported: CodeSecurity and SecretProtection. This is a mandatory parameter.
     * @param billingDate - The date to query, or if not provided, today
     */
    public async getBillableCommitterDetails2(
        plan: Management.Plan,
        billingDate?: Date
        ): Promise<Management.BillableCommitterDetails[]> {

        const queryValues: any = {
            plan: plan,
            billingDate: billingDate
        };

        return this.beginRequest<Management.BillableCommitterDetails[]>({
            apiVersion: "7.2-preview.3",
            routeTemplate: "_apis/Management/MeterUsage/{action}",
            routeValues: {
                action: "Details"
            },
            queryParams: queryValues
        });
    }

    /**
     * @param plan - 
     */
    public async getLastMeterUsage2(
        plan: Management.Plan
        ): Promise<Management.MeterUsageForPlan> {

        const queryValues: any = {
            plan: plan
        };

        return this.beginRequest<Management.MeterUsageForPlan>({
            apiVersion: "7.2-preview.3",
            routeTemplate: "_apis/Management/MeterUsage/{action}",
            routeValues: {
                action: "Last"
            },
            queryParams: queryValues
        });
    }

    /**
     * Get commiters used when calculating billing information.
     * 
     * @param plan - The plan to query. Plans supported: CodeSecurity and SecretProtection. This is a mandatory parameter.
     * @param billingDate - The date to query, or if not provided, today
     */
    public async getMeterUsage2(
        plan: Management.Plan,
        billingDate?: Date
        ): Promise<Management.MeterUsageForPlan> {

        const queryValues: any = {
            plan: plan,
            billingDate: billingDate
        };

        return this.beginRequest<Management.MeterUsageForPlan>({
            apiVersion: "7.2-preview.3",
            routeTemplate: "_apis/Management/MeterUsage/{action}",
            routeValues: {
                action: "Default"
            },
            queryParams: queryValues
        });
    }

    /**
     * Get the current status of Advanced Security for the organization
     * 
     * @param includeAllProperties - When true, also determine if pushes are blocked if they contain secrets
     */
    public async getOrgEnablementStatus2(
        includeAllProperties?: boolean
        ): Promise<Management.OrgEnablementSettings> {

        const queryValues: any = {
            includeAllProperties: includeAllProperties
        };

        return this.beginRequest<Management.OrgEnablementSettings>({
            apiVersion: "7.2-preview.3",
            routeTemplate: "_apis/Management/enablement",
            queryParams: queryValues
        });
    }

    /**
     * Update the status of Advanced Security for the organization
     * 
     * @param orgEnablementSettings - The new status
     */
    public async updateOrgEnablementStatus2(
        orgEnablementSettings: Management.OrgEnablementSettings
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.2-preview.3",
            method: "PATCH",
            routeTemplate: "_apis/Management/enablement",
            body: orgEnablementSettings
        });
    }

    /**
     * Estimate the pushers that would be added to the customer's usage if Advanced Security was enabled for this organization.
     * 
     * @param plan - The plan to query.
     */
    public async getEstimatedBillablePushersDetailsForOrg2(
        plan?: Management.Plan
        ): Promise<Management.MeterUsageEstimate> {

        const queryValues: any = {
            plan: plan
        };

        return this.beginRequest<Management.MeterUsageEstimate>({
            apiVersion: "7.2-preview.3",
            routeTemplate: "_apis/Management/meterUsageEstimate/{action}",
            routeValues: {
                action: "Default"
            },
            queryParams: queryValues
        });
    }

    /**
     * Get the current status of Advanced Security for a project
     * 
     * @param project - Project ID or project name
     * @param includeAllProperties - When true, also determine if pushes are blocked if they contain secrets
     */
    public async getProjectEnablementStatus2(
        project: string,
        includeAllProperties?: boolean
        ): Promise<Management.ProjectEnablementSettings> {

        const queryValues: any = {
            includeAllProperties: includeAllProperties
        };

        return this.beginRequest<Management.ProjectEnablementSettings>({
            apiVersion: "7.2-preview.3",
            routeTemplate: "{project}/_apis/Management/enablement",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Update the status of Advanced Security for the project
     * 
     * @param projectEnablementSettings - The new status
     * @param project - Project ID or project name
     */
    public async updateProjectEnablementStatus2(
        projectEnablementSettings: Management.ProjectEnablementSettings,
        project: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.2-preview.3",
            method: "PATCH",
            routeTemplate: "{project}/_apis/Management/enablement",
            routeValues: {
                project: project
            },
            body: projectEnablementSettings
        });
    }

    /**
     * Estimate the pushers that would be added to the customer's usage if Advanced Security was enabled for this project.
     * 
     * @param project - Project ID or project name
     * @param plan - 
     */
    public async getEstimatedBillablePushersDetailsForProject2(
        project: string,
        plan?: Management.Plan
        ): Promise<Management.MeterUsageEstimate> {

        const queryValues: any = {
            plan: plan
        };

        return this.beginRequest<Management.MeterUsageEstimate>({
            apiVersion: "7.2-preview.3",
            routeTemplate: "{project}/_apis/Management/meterUsageEstimate/{action}",
            routeValues: {
                project: project,
                action: "Default"
            },
            queryParams: queryValues
        });
    }

    /**
     * Determines if Code Security, Secret Protection, and their features are enabled for the repository.
     * 
     * @param project - Project ID or project name
     * @param repository - The name or ID of the repository
     * @param includeAllProperties - When true, will also determine if pushes are blocked when secrets are detected
     */
    public async getRepoEnablementStatus2(
        project: string,
        repository: string,
        includeAllProperties?: boolean
        ): Promise<Management.RepoEnablementSettings> {

        const queryValues: any = {
            includeAllProperties: includeAllProperties
        };

        return this.beginRequest<Management.RepoEnablementSettings>({
            apiVersion: "7.2-preview.3",
            routeTemplate: "{project}/_apis/Management/repositories/{repository}/enablement",
            routeValues: {
                project: project,
                repository: repository
            },
            queryParams: queryValues
        });
    }

    /**
     * Update the enablement status of Code Security and Secret Protection, along with their respective features, for a given repository.
     * 
     * @param savedAdvSecEnablementStatus - new status
     * @param project - Project ID or project name
     * @param repository - Name or ID of the repository
     */
    public async updateRepoAdvSecEnablementStatus2(
        savedAdvSecEnablementStatus: Management.RepoEnablementSettings,
        project: string,
        repository: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.2-preview.3",
            method: "PATCH",
            routeTemplate: "{project}/_apis/Management/repositories/{repository}/enablement",
            routeValues: {
                project: project,
                repository: repository
            },
            body: savedAdvSecEnablementStatus
        });
    }

    /**
     * Estimate the pushers that would be added to the customer's usage if Advanced Security was enabled for this repository.
     * 
     * @param project - Project ID or project name
     * @param repository - The name or ID of the repository
     * @param plan - The plan to query.
     */
    public async getEstimatedBillableCommittersDetailsForRepo2(
        project: string,
        repository: string,
        plan?: Management.Plan
        ): Promise<Management.MeterUsageEstimate> {

        const queryValues: any = {
            plan: plan
        };

        return this.beginRequest<Management.MeterUsageEstimate>({
            apiVersion: "7.2-preview.3",
            routeTemplate: "{project}/_apis/Management/repositories/{repository}/meterUsageEstimate/{action}",
            routeValues: {
                project: project,
                repository: repository,
                action: "Default"
            },
            queryParams: queryValues
        });
    }

}
