/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import { deserializeVssJsonObject } from "../Common/Util/Serialization";

import * as Reporting from "../AdvancedSecurity.Reporting/Reporting";
import * as WebApi from "../WebApi/WebApi";

export class ReportingRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    /**
     * Creates a new advanced filter for the organization.
     * 
     * @param filter - The advanced filter to create.
     */
    public async createAdvancedFilter(
        filter: Reporting.AdvancedFilterCreate
        ): Promise<Reporting.AdvancedFilter> {

        return this.beginRequest<Reporting.AdvancedFilter>({
            apiVersion: "7.2-preview.1",
            method: "POST",
            routeTemplate: "_apis/Reporting/filtersSettings/{action}/{filterId}",
            routeValues: {
                action: "AlertsBatch"
            },
            body: filter
        });
    }

    /**
     * Deletes an advanced filter.
     * 
     * @param filterId - The ID of the advanced filter to delete.
     */
    public async deleteAdvancedFilter(
        filterId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.2-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/Reporting/filtersSettings/{action}/{filterId}",
            routeValues: {
                filterId: filterId,
                action: "AlertsBatch"
            }
        });
    }

    /**
     * Gets a specific advanced filter by its ID.
     * 
     * @param filterId - The ID of the advanced filter to retrieve.
     */
    public async getAdvancedFilter(
        filterId: string
        ): Promise<Reporting.AdvancedFilter> {

        return this.beginRequest<Reporting.AdvancedFilter>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Reporting/filtersSettings/{action}/{filterId}",
            routeValues: {
                filterId: filterId,
                action: "AlertsBatch"
            }
        });
    }

    /**
     * Gets all advanced filters for the organization.
     * 
     * @param includeDeleted - Whether to include soft-deleted filters.
     * @param keywords - Optional filter to search filters by name (case-insensitive, partial match).
     */
    public async listAdvancedFilters(
        includeDeleted?: boolean,
        keywords?: string
        ): Promise<Reporting.AdvancedFilter[]> {

        const queryValues: any = {
            includeDeleted: includeDeleted,
            keywords: keywords
        };

        return this.beginRequest<Reporting.AdvancedFilter[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Reporting/filtersSettings/{action}/{filterId}",
            routeValues: {
                action: "AlertsBatch"
            },
            queryParams: queryValues
        });
    }

    /**
     * Updates an advanced filter. Only the name can be updated.
     * 
     * @param filter - The update data containing the new name.
     * @param filterId - The ID of the advanced filter to update.
     */
    public async updateAdvancedFilter(
        filter: Reporting.AdvancedFilterUpdate,
        filterId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.2-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/Reporting/filtersSettings/{action}/{filterId}",
            routeValues: {
                filterId: filterId,
                action: "AlertsBatch"
            },
            body: filter
        });
    }

    /**
     * Get all distinct dependency component names for the org (used for UX filtering)
     * 
     */
    public async getDependencyComponentNamesForOrg(
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Reporting/filters/{action}",
            routeValues: {
                action: "ComponentNames"
            }
        });
    }

    /**
     * Get all projects and repositories for the org (used for UX filtering)
     * 
     */
    public async getProjectsAndReposForOrg(
        ): Promise<Reporting.ProjectAndRepoInfo[]> {

        return this.beginRequest<Reporting.ProjectAndRepoInfo[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Reporting/filters/{action}",
            routeValues: {
                action: "ProjectsAndRepos"
            }
        });
    }

    /**
     * Get all distinct code scanning rule names for the org (used for UX filtering)
     * 
     * @param toolName - Optional tool name to filter rules by
     */
    public async getRuleNamesForOrg(
        toolName?: string
        ): Promise<Reporting.CodeScanningRuleInfo[]> {

        const queryValues: any = {
            toolName: toolName
        };

        return this.beginRequest<Reporting.CodeScanningRuleInfo[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Reporting/filters/{action}",
            routeValues: {
                action: "RuleNames"
            },
            queryParams: queryValues
        });
    }

    /**
     * Get all distinct secret types for the org (used for UX filtering)
     * 
     */
    public async getSecretTypesForOrg(
        ): Promise<string[]> {

        return this.beginRequest<string[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Reporting/filters/{action}",
            routeValues: {
                action: "SecretTypes"
            }
        });
    }

    /**
     */
    public async getUXComputedFilters(
        ): Promise<Reporting.ReportingUXComputedFilters> {

        return this.beginRequest<Reporting.ReportingUXComputedFilters>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Reporting/filters/{action}",
            routeValues: {
                action: "Default"
            }
        });
    }

    /**
     * Get Alert summary by severity for the org
     * 
     * @param criteria - Options to limit the summaries returned
     */
    public async getAlertSummaryForOrg(
        criteria?: Reporting.FilterCriteria
        ): Promise<Reporting.OrgAlertSummary> {

        const queryValues: any = {
            criteria: criteria
        };

        return this.beginRequest<Reporting.OrgAlertSummary>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Reporting/summary/{action}",
            routeValues: {
                action: "Alerts"
            },
            queryParams: queryValues
        });
    }

    /**
     * Get Combined Alerts for the org
     * 
     * @param criteria - Options to filter the combined alerts returned
     * @param top - The maximum number of alerts to return
     * @param continuationToken - If there are more alerts than can be returned, a continuation token is placed in the "x-ms-continuationtoken" header.  Use that token here to get the next page of alerts
     */
    public async getCombinedAlertsForOrg(
        criteria?: Reporting.CombinedAlertFilterCriteria,
        top?: number,
        continuationToken?: string
        ): Promise<WebApi.PagedList<Reporting.DashboardAlert>> {

        const queryValues: any = {
            criteria: criteria,
            top: top,
            continuationToken: continuationToken
        };

        return this.beginRequest<Response>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Reporting/summary/{action}",
            routeValues: {
                action: "AlertsBatch"
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <WebApi.PagedList<Reporting.DashboardAlert>>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Get Enablement summary for the org
     * 
     * @param criteria - Options to limit the summaries returned
     */
    public async getEnablementSummaryForOrg(
        criteria?: Reporting.EnablementFilterCriteria
        ): Promise<Reporting.OrgEnablementSummary> {

        const queryValues: any = {
            criteria: criteria
        };

        return this.beginRequest<Reporting.OrgEnablementSummary>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Reporting/summary/{action}",
            routeValues: {
                action: "Enablement"
            },
            queryParams: queryValues
        });
    }

}
