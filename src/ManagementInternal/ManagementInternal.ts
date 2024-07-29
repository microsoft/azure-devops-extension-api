/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

/**
 * BillingInfo contains an organization, its enablement status and the Azure Subscription for it.
 */
export interface BillingInfo {
    advSecEnabled: boolean;
    /**
     * The most recent time the enablement state was modified.
     */
    advSecEnabledChangedOnDate: Date;
    /**
     * The first time the enablement state was modified.
     */
    advSecEnabledFirstChangedOnDate: Date;
    azureSubscriptionId: string;
    billingMode: BillingMode;
    organizationId: string;
    tenantId: string;
}

export enum BillingMode {
    /**
     * None implies the organization is not billable because no Azure Subscription has been set.
     */
    None = 0,
    /**
     * When an organization is the only organization mapped to an Azure Subscription.
     */
    SingleOrg = 1,
    /**
     * When an organization is mapped to an Azure Subscription to which at least one other org is mapped.
     */
    MultiOrg = 2
}
