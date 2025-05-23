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
     * Determine if Advanced Security is enabled for a repository
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
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/Management/repositories/{repository}/enablement2",
            routeValues: {
                project: project,
                repository: repository
            },
            queryParams: queryValues
        });
    }

    /**
     * Update the enablement of Advanced Security for a repository
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
            apiVersion: "7.2-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/Management/repositories/{repository}/enablement2",
            routeValues: {
                project: project,
                repository: repository
            },
            body: savedAdvSecEnablementStatus
        });
    }

    /**
     * During multi-org billing computation in primary scale unit(EUS21), this API is used to create billing snapshot for a specific org. Primary scale unit will call this API for each org in different scsle units to create billing snapshot. Data will be stored in the org specific partition DB -\> billing snapshot table. This is needed as customers will fetch billing data from their org specific partition DB.
     * 
     * @param meterUsage - 
     */
    public async createBillingSnapshot(
        meterUsage: Management.MeterUsage
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.2-preview.1",
            method: "POST",
            routeTemplate: "_apis/Management/MeterUsage/{action}",
            routeValues: {
                action: "Default"
            },
            body: meterUsage
        });
    }

    /**
     * Get all billable committers details, including those not matched with a VSID.
     * 
     * @param billingDate - The date to query, or if not provided, today
     */
    public async getBillableCommitterDetails(
        billingDate?: Date
        ): Promise<Management.BillableCommitterDetails[]> {

        const queryValues: any = {
            billingDate: billingDate
        };

        return this.beginRequest<Management.BillableCommitterDetails[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Management/MeterUsage/{action}",
            routeValues: {
                action: "Details"
            },
            queryParams: queryValues
        });
    }

    /**
     */
    public async getLastMeterUsage(
        ): Promise<Management.MeterUsage> {

        return this.beginRequest<Management.MeterUsage>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Management/MeterUsage/{action}",
            routeValues: {
                action: "Last"
            }
        });
    }

    /**
     * Get commiters used when calculating billing information.
     * 
     * @param billingDate - The date to query, or if not provided, today
     */
    public async getMeterUsage(
        billingDate?: Date
        ): Promise<Management.MeterUsage> {

        const queryValues: any = {
            billingDate: billingDate
        };

        return this.beginRequest<Management.MeterUsage>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Management/MeterUsage/{action}",
            routeValues: {
                action: "Default"
            },
            queryParams: queryValues
        });
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
            apiVersion: "7.2-preview.1",
            method: "POST",
            routeTemplate: "_apis/Management/MeterUsage2/{action}",
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
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Management/MeterUsage2/{action}",
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
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Management/MeterUsage2/{action}",
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
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Management/MeterUsage2/{action}",
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
    public async getOrgEnablementStatus(
        includeAllProperties?: boolean
        ): Promise<Management.AdvSecEnablementSettings> {

        const queryValues: any = {
            includeAllProperties: includeAllProperties
        };

        return this.beginRequest<Management.AdvSecEnablementSettings>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Management/enablement",
            queryParams: queryValues
        });
    }

    /**
     * Update the status of Advanced Security for the organization
     * 
     * @param savedAdvSecEnablementStatus - The new status
     */
    public async updateOrgEnablementStatus(
        savedAdvSecEnablementStatus: Management.AdvSecEnablementSettingsUpdate
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.2-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/Management/enablement",
            body: savedAdvSecEnablementStatus
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
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Management/enablement2",
            queryParams: queryValues
        });
    }

    /**
     * Update the status of Advanced Security for the organization
     * 
     * @param savedAdvSecEnablementStatus - The new status
     */
    public async updateOrgEnablementStatus2(
        savedAdvSecEnablementStatus: Management.OrgEnablementSettings
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.2-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/Management/enablement2",
            body: savedAdvSecEnablementStatus
        });
    }

    /**
     * Estimate the pushers that would be added to the customer's usage if Advanced Security was enabled for this organization.
     * 
     */
    public async getEstimatedBillablePushersDetailsForOrg(
        ): Promise<Management.BilledCommitter[]> {

        return this.beginRequest<Management.BilledCommitter[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Management/meterUsageEstimate/{action}",
            routeValues: {
                action: "Details"
            }
        });
    }

    /**
     * Estimate the committers that would be added to the customer's usage if Advanced Security was enabled for this organization.
     * 
     */
    public async getEstimatedOrgBillablePushers(
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Management/meterUsageEstimate/{action}",
            routeValues: {
                action: "Default"
            }
        });
    }

    /**
     * Estimate the pushers that would be added to the customer's usage if Advanced Security was enabled for this organization.
     * 
     */
    public async getEstimatedBillablePushersDetailsForOrg2(
        ): Promise<Management.MeterUsageEstimate> {

        return this.beginRequest<Management.MeterUsageEstimate>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Management/meterUsageEstimate2/{action}",
            routeValues: {
                action: "Details"
            }
        });
    }

    /**
     * Estimate the committers that would be added to the customer's usage if Advanced Security was enabled for this organization.
     * 
     */
    public async getEstimatedOrgBillablePushers2(
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Management/meterUsageEstimate2/{action}",
            routeValues: {
                action: "Default"
            }
        });
    }

    /**
     * Get the current status of Advanced Security for a project
     * 
     * @param project - Project ID or project name
     * @param includeAllProperties - When true, also determine if pushes are blocked if they contain secrets
     */
    public async getProjectEnablementStatus(
        project: string,
        includeAllProperties?: boolean
        ): Promise<Management.AdvSecEnablementSettings> {

        const queryValues: any = {
            includeAllProperties: includeAllProperties
        };

        return this.beginRequest<Management.AdvSecEnablementSettings>({
            apiVersion: "7.2-preview.1",
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
     * @param savedAdvSecEnablementStatus - The new status
     * @param project - Project ID or project name
     */
    public async updateProjectEnablementStatus(
        savedAdvSecEnablementStatus: Management.AdvSecEnablementSettingsUpdate,
        project: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.2-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/Management/enablement",
            routeValues: {
                project: project
            },
            body: savedAdvSecEnablementStatus
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
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/Management/enablement2",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Update the status of Advanced Security for the project
     * 
     * @param savedAdvSecEnablementStatus - The new status
     * @param project - Project ID or project name
     */
    public async updateProjectEnablementStatus2(
        savedAdvSecEnablementStatus: Management.ProjectEnablementSettings,
        project: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.2-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/Management/enablement2",
            routeValues: {
                project: project
            },
            body: savedAdvSecEnablementStatus
        });
    }

    /**
     * Estimate the pushers that would be added to the customer's usage if Advanced Security was enabled for this project.
     * 
     * @param project - Project ID or project name
     */
    public async getEstimatedBillablePushersDetailsForProject(
        project: string
        ): Promise<Management.BilledCommitter[]> {

        return this.beginRequest<Management.BilledCommitter[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/Management/meterUsageEstimate/{action}",
            routeValues: {
                project: project,
                action: "Details"
            }
        });
    }

    /**
     * Estimate the number of committers that would be added to the customer's usage if Advanced Security was enabled for this project.
     * 
     * @param project - Project ID or project name
     */
    public async getEstimatedProjectBillablePushers(
        project: string
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/Management/meterUsageEstimate/{action}",
            routeValues: {
                project: project,
                action: "Default"
            }
        });
    }

    /**
     * Estimate the pushers that would be added to the customer's usage if Advanced Security was enabled for this project.
     * 
     * @param project - Project ID or project name
     */
    public async getEstimatedBillablePushersDetailsForProject2(
        project: string
        ): Promise<Management.MeterUsageEstimate> {

        return this.beginRequest<Management.MeterUsageEstimate>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/Management/meterUsageEstimate2/{action}",
            routeValues: {
                project: project,
                action: "Details"
            }
        });
    }

    /**
     * Estimate the number of committers that would be added to the customer's usage if Advanced Security was enabled for this project.
     * 
     * @param project - Project ID or project name
     */
    public async getEstimatedProjectBillablePushers2(
        project: string
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/Management/meterUsageEstimate2/{action}",
            routeValues: {
                project: project,
                action: "Default"
            }
        });
    }

    /**
     * Determine if Advanced Security is enabled for a repository
     * 
     * @param project - Project ID or project name
     * @param repository - The name or ID of the repository
     * @param includeAllProperties - When true, will also determine if pushes are blocked when secrets are detected
     */
    public async getRepoEnablementStatus(
        project: string,
        repository: string,
        includeAllProperties?: boolean
        ): Promise<Management.AdvSecEnablementStatus> {

        const queryValues: any = {
            includeAllProperties: includeAllProperties
        };

        return this.beginRequest<Management.AdvSecEnablementStatus>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/Management/repositories/{repository}/enablement",
            routeValues: {
                project: project,
                repository: repository
            },
            queryParams: queryValues
        });
    }

    /**
     * Update the enablement of Advanced Security for a repository
     * 
     * @param savedAdvSecEnablementStatus - new status
     * @param project - Project ID or project name
     * @param repository - Name or ID of the repository
     */
    public async updateRepoAdvSecEnablementStatus(
        savedAdvSecEnablementStatus: Management.AdvSecEnablementStatusUpdate,
        project: string,
        repository: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.2-preview.1",
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
     * Estimate the committers that would be added to the customer's usage if Advanced Security was enabled for this repository.
     * 
     * @param project - Project ID or project name
     * @param repository - The name or ID of the repository
     */
    public async getEstimatedRepoBillableCommitters(
        project: string,
        repository: string
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/Management/repositories/{repository}/meterUsageEstimate/{action}",
            routeValues: {
                project: project,
                repository: repository,
                action: "Default"
            }
        });
    }

    /**
     * Estimate the pushers that would be added to the customer's usage if Advanced Security was enabled for this repository.
     * 
     * @param project - Project ID or project name
     * @param repository - 
     */
    public async getEstimatedRepoBillablePushersDetails(
        project: string,
        repository: string
        ): Promise<Management.BilledCommitter[]> {

        return this.beginRequest<Management.BilledCommitter[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/Management/repositories/{repository}/meterUsageEstimate/{action}",
            routeValues: {
                project: project,
                repository: repository,
                action: "Details"
            }
        });
    }

    /**
     * Estimate the committers that would be added to the customer's usage if Advanced Security was enabled for this repository.
     * 
     * @param project - Project ID or project name
     * @param repository - The name or ID of the repository
     */
    public async getEstimatedRepoBillableCommitters2(
        project: string,
        repository: string
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/Management/repositories/{repository}/meterUsageEstimate2/{action}",
            routeValues: {
                project: project,
                repository: repository,
                action: "Default"
            }
        });
    }

    /**
     * Estimate the pushers that would be added to the customer's usage if Advanced Security was enabled for this repository.
     * 
     * @param project - Project ID or project name
     * @param repository - 
     */
    public async getEstimatedRepoBillableCommittersDetails2(
        project: string,
        repository: string
        ): Promise<Management.MeterUsageEstimate> {

        return this.beginRequest<Management.MeterUsageEstimate>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/Management/repositories/{repository}/meterUsageEstimate2/{action}",
            routeValues: {
                project: project,
                repository: repository,
                action: "Details"
            }
        });
    }

}
