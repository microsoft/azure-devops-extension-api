/*
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
     * @param organizationId - 
     */
    public async deleteBillingInfo(
        organizationId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.2-preview.1",
            method: "DELETE",
            routeTemplate: "{organizationId}/_apis/Management/Billing/{action}",
            routeValues: {
                organizationId: organizationId,
                action: "Default"
            }
        });
    }

    /**
     * @param organizationId - 
     */
    public async deleteMeterUsageHistory(
        organizationId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.2-preview.1",
            method: "DELETE",
            routeTemplate: "{organizationId}/_apis/Management/Billing/{action}",
            routeValues: {
                organizationId: organizationId,
                action: "MeterUsageHistory"
            }
        });
    }

    /**
     * Get the billing info for an organization.
     * 
     * @param organizationId - Organization ID to get billing info for.
     */
    public async getBillingInfo(
        organizationId: string
        ): Promise<Management.BillingInfo> {

        return this.beginRequest<Management.BillingInfo>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{organizationId}/_apis/Management/Billing/{action}",
            routeValues: {
                organizationId: organizationId,
                action: "Default"
            }
        });
    }

    /**
     * @param billingInfo - 
     * @param organizationId - 
     */
    public async saveBillingInfo(
        billingInfo: Management.BillingInfo,
        organizationId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.2-preview.1",
            method: "POST",
            routeTemplate: "{organizationId}/_apis/Management/Billing/{action}",
            routeValues: {
                organizationId: organizationId,
                action: "Default"
            },
            body: billingInfo
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
     * @param meterUsage - 
     */
    public async setBillingSnapshot(
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
     * Estimate the committers that would be added to the customer's usage if Advanced Security was enabled for this organization.
     * 
     */
    public async getEstimatedOrgBillablePushers(
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Management/meterUsageEstimate"
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
     * Estimate the number of committers that would be added to the customer's usage if Advanced Security was enabled for this project.
     * 
     * @param project - Project ID or project name
     */
    public async getEstimatedProjectBillablePushers(
        project: string
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/Management/meterUsageEstimate",
            routeValues: {
                project: project
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
            routeTemplate: "{project}/_apis/Management/repositories/{repository}/meterUsageEstimate",
            routeValues: {
                project: project,
                repository: repository
            }
        });
    }

}
