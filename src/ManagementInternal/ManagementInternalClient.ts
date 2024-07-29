/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as ManagementInternal from "../ManagementInternal/ManagementInternal";

export class ManagementInternalRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    /**
     * Delete the billing info for an organization.
     * 
     * @param organizationId - 
     */
    public async deleteBillingInfo(
        organizationId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.2-preview.1",
            method: "DELETE",
            routeTemplate: "{organizationId}/_apis/ManagementInternal/Billing/{action}",
            routeValues: {
                organizationId: organizationId,
                action: "Default"
            }
        });
    }

    /**
     * Delete the meter usage history from Primary SU for an organization.
     * 
     * @param organizationId - 
     */
    public async deleteMeterUsageHistory(
        organizationId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.2-preview.1",
            method: "DELETE",
            routeTemplate: "{organizationId}/_apis/ManagementInternal/Billing/{action}",
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
        ): Promise<ManagementInternal.BillingInfo> {

        return this.beginRequest<ManagementInternal.BillingInfo>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{organizationId}/_apis/ManagementInternal/Billing/{action}",
            routeValues: {
                organizationId: organizationId,
                action: "Default"
            }
        });
    }

    /**
     * Save the billing info for an organization.
     * 
     * @param billingInfo - 
     * @param organizationId - 
     */
    public async saveBillingInfo(
        billingInfo: ManagementInternal.BillingInfo,
        organizationId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.2-preview.1",
            method: "POST",
            routeTemplate: "{organizationId}/_apis/ManagementInternal/Billing/{action}",
            routeValues: {
                organizationId: organizationId,
                action: "Default"
            },
            body: billingInfo
        });
    }

}
