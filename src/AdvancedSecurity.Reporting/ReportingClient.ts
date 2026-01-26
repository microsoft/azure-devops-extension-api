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
