/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

export interface AdvSecEnablementSettings {
    /**
     * Automatically enable Advanced Security on newly created repositories.
     */
    enableOnCreate: boolean;
    reposEnablementStatus: AdvSecEnablementStatus[];
}

export interface AdvSecEnablementSettingsUpdate extends AdvSecEnablementStatusUpdate {
    /**
     * Automatically enable Advanced Security on newly created repositories.
     */
    enableOnCreate: boolean;
}

export interface AdvSecEnablementStatus extends AdvSecEnablementStatusUpdate {
    /**
     * The last time the status of Advanced Security for this repository was updated
     */
    advSecEnablementLastChangedDate: Date;
    projectId: string;
    repositoryId: string;
}

export interface AdvSecEnablementStatusUpdate {
    /**
     * Enabled status False disabled, True enabled, Null never explicitly set.
     */
    advSecEnabled: boolean;
    /**
     * When true, pushes containing secrets will be blocked. \<br /\>When false, pushes are scanned for secrets and are not blocked. \<br /\>If includeAllProperties in the request if false, this value will be null.
     */
    blockPushes: boolean;
}

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

/**
 * Information related to billing for Advanced Security services
 */
export interface MeterUsage {
    /**
     * The Azure DevOps account
     */
    accountId: string;
    azureSubscriptionId: string;
    /**
     * A list of identifiers for the commiters to the repositories that have Advanced Security features enabled
     */
    billedCommitters: string[];
    /**
     * The date this billing information pertains to
     */
    billingDate: Date;
    /**
     * True when a bill is generated for Advanced Security feature usage in this organziation
     */
    isAdvSecBillable: boolean;
    /**
     * True when Advanced Security features are enabled in this organization
     */
    isAdvSecEnabled: boolean;
    /**
     * The Azure subscription
     */
    tenantId: string;
    /**
     * The number of commiters to repositories that have Advanced Security features enabled
     */
    uniqueCommitterCount: number;
}
