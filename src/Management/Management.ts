/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import * as WebApi from "../WebApi/WebApi";

export interface AdvSecEnablementFeatures {
    /**
     * Auto enablement of AdvSec for new projects or repos will be enabled when set to true and will be unchanged when set to false.
     */
    autoEnableNewProjectOrRepos: boolean;
    /**
     * CodeQL enablement status set to False when disabled and True when enabled; Null is never explicitly set.
     */
    codeQLEnabled: boolean;
    /**
     * Dependabot enablement status set to False when disabled and True when enabled; Null is never explicitly set. \<br /\>When true, Dependabot will open PRs to support security updates for outdated dependencies. \<br /\>Setting Dependabot enablement state is only supported for repo enablement and not org or project enablement at this time.
     */
    dependabotEnabled: boolean;
    /**
     * Dependency Scanning Injection enablement status set to False when disabled and True when enabled; Null is never explicitly set. \<br /\> If Advanced Security is NOT already enabled, behavior will depend on if Advanced Security is to be enabled/disabled. DependencyScanningInjectionEnabled will not affect anything in this scenario. \<br /\> If Advanced Security is to be disabled, the value of DependencyScanningInjectionEnabled will have no effect. \<br /\> Setting Dependency Scanning enablement state is only supported for repo enablement and not org or project enablement at this time.
     */
    dependencyScanningInjectionEnabled: boolean;
    /**
     * ForceRepoSecretScanning will be set to true when Enabled, false when Disabled, and null when not set. \<br /\> If GHAzDO is NOT already enabled, behavior will depend on if GHAzDO is to be enabled/disabled. ForceRepoSecretScanning will not affect anything in this scenario. \<br /\> If GHAzDO is to be disabled, the value of ForceRepoSecretScan will have no effect. \<br /\> If GHAzDO is to be enabled for the first time on a repo, then ForceRepoSecretScanning will have no effect. \<br /\> If GHAzDO is to be enabled and the repo is already enabled, then ForceRepoSecretScanning will force the secret scanning job to be run if it is set to true. \<br /\> In all cases where ForceRepoSecretScanning is not expected to affect behavior, it will be set to false before being sent to Tfs.
     */
    forceRepoSecretScanning: boolean;
}

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
     * Advanced Security enablement status set to False when disabled and True when enabled; Null is never explicitly set.
     */
    advSecEnabled: boolean;
    /**
     * Includes additional features that can be enabled alongside Advanced Security.
     */
    advSecEnablementFeatures: AdvSecEnablementFeatures;
    /**
     * When true, pushes containing secrets will be blocked. \<br /\>When false, pushes are scanned for secrets and are not blocked. \<br /\>If includeAllProperties in the request is false, this value will be null.
     */
    blockPushes: boolean;
}

/**
 * Billable Committers Details for Advanced Security Services
 */
export interface BillableCommitterDetails {
    /**
     * ID (SHA-1) of the commit.
     */
    commitId: string;
    /**
     * Committer email address after parsing.
     */
    committerEmail: string;
    /**
     * Time reported by the commit.
     */
    commitTime: Date;
    /**
     * DisplayName of the Pusher.
     */
    displayName: string;
    /**
     * MailNickName of the Pusher.
     */
    mailNickName: string;
    /**
     * Project Id commit was pushed to.
     */
    projectId: string;
    /**
     * Project name commit was pushed to.
     */
    projectName: string;
    /**
     * Time of the push that contained the commit.
     */
    pushedTime: Date;
    /**
     * Pusher Id for the push.
     */
    pusherId: string;
    /**
     * Push Id that contained the commit.
     */
    pushId: number;
    /**
     * RepositoryId commit was pushed to.
     */
    repoId: string;
    /**
     * Repository name commit was pushed to.
     */
    repoName: string;
    /**
     * SamAccountName of the Pusher.
     */
    samAccountName: string;
    /**
     * Visual Studio ID /Team Foundation ID
     */
    vsid: string;
}

/**
 * Information related to billed committers using Advanced Security services
 */
export interface BilledCommitter {
    /**
     * Cuid of the billed committer. CUID is unique across an Azure Subscription.
     */
    cuid: string;
    /**
     * Identity Reference object of the billed committer
     */
    userIdentity: WebApi.IdentityRef;
}

/**
 * A list of billed committers
 */
export interface BilledCommittersList {
    /**
     * A list of BilledCommitter objects that contain the identityRef of committers.
     */
    billedUsers: BilledCommitter[];
    /**
     * Count of billed committers in BilledUsers
     */
    uniqueCommitterCount: number;
}

export interface CodeScanningFeatures {
    /**
     * CodeQL enablement status set to False when disabled and True when enabled; Null is never explicitly set.
     */
    codeQLEnabled: boolean;
    /**
     * Dependabot enablement status set to False when disabled and True when enabled; Null is never explicitly set. \<br /\>When true, Dependabot will open PRs to support security updates for outdated dependencies. \<br /\>Setting Dependabot enablement state is only supported for repo enablement and not org or project enablement at this time.
     */
    dependabotEnabled: boolean;
    /**
     * Dependency Scanning Injection enablement status set to False when disabled and True when enabled; Null is never explicitly set. \<br /\> If Advanced Security is NOT already enabled, behavior will depend on if Advanced Security is to be enabled/disabled. DependencyScanningInjectionEnabled will not affect anything in this scenario. \<br /\> If Advanced Security is to be disabled, the value of DependencyScanningInjectionEnabled will have no effect. \<br /\> Setting Dependency Scanning enablement state is only supported for repo enablement and not org or project enablement at this time.
     */
    dependencyScanningInjectionEnabled: boolean;
}

export interface EnablementOnCreateSettings {
    /**
     * Automatically enable Code Scanning on newly created repositories.
     */
    enableCodeScanningOnCreate: boolean;
    /**
     * Automatically enable Secret Scanning on newly created repositories.
     */
    enableSecretScanningOnCreate: boolean;
}

export interface EnablementSettings {
    /**
     * Code Scan enablement status set to False when disabled and True when enabled; Null is never explicitly set.
     */
    codeScanningEnabled: boolean;
    /**
     * Includes code scanning features that can be enabled.
     */
    codeScanningFeatures: CodeScanningFeatures;
    /**
     * Auto enablement setting for newly created repositories.
     */
    enablementOnCreateSettings: EnablementOnCreateSettings;
    /**
     * A list of enablement statuses for repositories within the specified organization or project.
     */
    reposEnablementStatus: RepoEnablementSettings[];
    /**
     * Secret Scan enablement status set to False when disabled and True when enabled; Null is never explicitly set.
     */
    secretScanningEnabled: boolean;
    /**
     * Includes secret scanning features that can be enabled.
     */
    secretScanningFeatures: SecretScanningFeatures;
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
     * Deprecated - use BilledCommittersIdentities instead A list of Cuids for the commiters to the repositories that have Advanced Security features enabled
     */
    billedCommitters: string[];
    /**
     * A list of BilledCommitter objects that contain the identityRef of committers that have AdvSec enabled
     */
    billedUsers: BilledCommitter[];
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

/**
 * Information related to meter usage estimate for Code Scanning and Secret Scanning
 */
export interface MeterUsageEstimate {
    /**
     * Meter usage estimate when enabling Code Scanning
     */
    codeScanningMeterUsageEstimate: BilledCommittersList;
    /**
     * Meter usage estimate when enabling Secret Scanning
     */
    secretScanningMeterUsageEstimate: BilledCommittersList;
}

/**
 * Information related to meter usage for a Scanning plan
 */
export interface MeterUsageForPlan {
    /**
     * The Azure DevOps account
     */
    accountId: string;
    azureSubscriptionId: string;
    /**
     * The identityRef of committers that contributed to repositories with Scanning plan enabled
     */
    billedUsers: BilledCommittersList;
    /**
     * The date this billing information pertains to
     */
    billingDate: Date;
    /**
     * True when the Scanning plan is enabled in this organization
     */
    isPlanEnabled: boolean;
    /**
     * The Azure subscription
     */
    tenantId: string;
}

export interface OrgEnablementSettings extends EnablementSettings {
}

export enum Plan {
    /**
     * The Code Security plan
     */
    CodeSecurity = 0,
    /**
     * The Secret Protection plan
     */
    SecretProtection = 1
}

export interface ProjectEnablementSettings extends EnablementSettings {
}

export interface RepoEnablementSettings {
    /**
     * Code Scan enablement status set to False when disabled and True when enabled; Null is never explicitly set.
     */
    codeScanningEnabled: boolean;
    /**
     * The last time the status of Code Scanning for this repository was updated
     */
    codeScanningEnablementLastChangedDate: Date;
    /**
     * Includes code scanning features that can be enabled.
     */
    codeScanningFeatures: CodeScanningFeatures;
    /**
     * Indicates whether the repository is part of the bundled SKU (old billing plan) or unbundled SKUs (new billing plan).
     */
    isBundledSKU: boolean;
    /**
     * The project Id
     */
    projectId: string;
    /**
     * The repository Id
     */
    repositoryId: string;
    /**
     * Secret Scan enablement status set to False when disabled and True when enabled; Null is never explicitly set.
     */
    secretScanningEnabled: boolean;
    /**
     * The last time the status of Secret Scanning for this repository was updated
     */
    secretScanningEnablementLastChangedDate: Date;
    /**
     * Includes secret scanning features that can be enabled.
     */
    secretScanningFeatures: SecretScanningFeatures;
}

export interface SecretScanningFeatures {
    /**
     * When true, pushes containing secrets will be blocked. \<br /\>When false, pushes are scanned for secrets and are not blocked. \<br /\>If includeAllProperties in the request is false, this value will be null.
     */
    blockPushes: boolean;
    /**
     * ForceRepoSecretScanning will be set to true when Enabled, false when Disabled, and null when not set. \<br /\> If GHAzDO is NOT already enabled, behavior will depend on if GHAzDO is to be enabled/disabled. ForceRepoSecretScanning will not affect anything in this scenario. \<br /\> If GHAzDO is to be disabled, the value of ForceRepoSecretScan will have no effect. \<br /\> If GHAzDO is to be enabled for the first time on a repo, then ForceRepoSecretScanning will have no effect. \<br /\> If GHAzDO is to be enabled and the repo is already enabled, then ForceRepoSecretScanning will force the secret scanning job to be run if it is set to true. \<br /\> In all cases where ForceRepoSecretScanning is not expected to affect behavior, it will be set to false before being sent to Tfs.
     */
    forceRepoSecretScanning: boolean;
}
