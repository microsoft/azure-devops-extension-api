/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as Reporting from "../AdvancedSecurity.Reporting/Reporting";

export class ReportingRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    /**
     * Get Alert summary by severity for the org
     * 
     * @param criteria - 
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
     */
    public async getEnablementSummaryForOrg(
        ): Promise<Reporting.OrgEnablementSummary> {

        return this.beginRequest<Reporting.OrgEnablementSummary>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Reporting/summary/{action}",
            routeValues: {
                action: "Enablement"
            }
        });
    }

}
