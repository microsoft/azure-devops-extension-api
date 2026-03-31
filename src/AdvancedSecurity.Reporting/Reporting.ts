/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import * as WebApi from "../WebApi/WebApi";

/**
 * Represents an advanced filter configuration for the Reporting dashboard.
 */
export interface AdvancedFilter extends AdvancedFilterCreate {
    /**
     * Link references to related REST resources.
     */
    _links: any;
    /**
     * The identity of the user who last changed the advanced filter.
     */
    changedBy: string;
    /**
     * The date and time when the advanced filter was last changed.
     */
    changedDate: Date;
    /**
     * The identity of the user who created the advanced filter.
     */
    createdBy: string;
    /**
     * The resolved identity of the user who created the advanced filter.
     */
    createdByIdentity: WebApi.IdentityRef;
    /**
     * The date and time when the advanced filter was created.
     */
    createdDate: Date;
    /**
     * Unique identifier for the advanced filter.
     */
    id: string;
    /**
     * Indicates whether the advanced filter has been soft-deleted.
     */
    isDeleted: boolean;
    /**
     * The URL of the advanced filter.
     */
    url: string;
}

/**
 * Represents the data required to create an advanced filter configuration for the Reporting dashboard. Also serves as the base class for AdvancedFilter.
 */
export interface AdvancedFilterCreate {
    /**
     * The filter criteria to be applied when this advanced filter is selected.
     */
    filterCriteria: CombinedAlertFilterCriteria;
    /**
     * User-provided name for the advanced filter.
     */
    name: string;
}

/**
 * Represents the data required to update an advanced filter configuration. Only the name can be updated.
 */
export interface AdvancedFilterUpdate {
    /**
     * The new name for the advanced filter.
     */
    name: string;
}

/**
 * Alert Summary by severity.
 */
export interface AlertSummaryBySeverity {
    /**
     * Total Critical severity alerts.
     */
    critical: number;
    /**
     * Total High severity alerts.
     */
    high: number;
    /**
     * Total low severity alerts.
     */
    low: number;
    /**
     * Total Medium severity alerts.
     */
    medium: number;
    /**
     * Total Note severity alerts.
     */
    note: number;
}

/**
 * Alert Summary by state.
 */
export interface AlertSummaryByState {
    /**
     * Total Dismissed state alerts.
     */
    dismissed: number;
    /**
     * Total Fixed state alerts.
     */
    fixed: number;
    /**
     * Total New state alerts.
     */
    new: number;
}

export enum AlertType {
    /**
     * The code has an unspecified vulnerability type
     */
    Unknown = 0,
    /**
     * The code uses a dependency with a known vulnerability.
     */
    Dependency = 1,
    /**
     * The code contains a secret that has now been compromised and must be revoked.
     */
    Secret = 2,
    /**
     * The code contains a weakness determined by static analysis.
     */
    Code = 3,
    /**
     * The code uses a dependency with potential license incompliance.
     */
    License = 4
}

export enum AlertValidityStatus {
    /**
     * When there are no validation fingerprints attached to the alert.
     */
    None = 0,
    /**
     * When the validations for validation fingerprints associated to the alert have not been conclusive.
     */
    Unknown = 1,
    /**
     * When at least one validation fingerprint associated to the alert is exploitable.
     */
    Active = 2,
    /**
     * When all validation fingerprints associated to the alert are not exploitable.
     */
    Inactive = 3
}

/**
 * Represents code scanning rule information for filtering purposes.
 */
export interface CodeScanningRuleInfo {
    /**
     * The human-readable name of the rule.
     */
    friendlyName: string;
    /**
     * The opaque identifier of the rule (e.g., SARIF rule ID).
     */
    opaqueId: string;
    /**
     * The name of the tool that defines this rule.
     */
    toolName: string;
}

export interface CombinedAlertFilterCriteria {
    /**
     * If provided, only return alerts of the specified alert type.
     */
    alertType: AlertType;
    /**
     * If provided, only return alerts with the specified validity status.
     */
    alertValidityStatus: AlertValidityStatus;
    /**
     * If provided, only return dependency alerts for the specified package names.
     */
    componentNames: string[];
    /**
     * If provided, only return dependency alerts for the specified ecosystems (e.g., NuGet, Npm, Maven).
     */
    componentTypes: ComponentType[];
    /**
     * If provided, only return alerts with one of the specified dismissal types (closure reasons). Applicable only when filtering for closed/dismissed alerts.
     */
    dismissalTypes: DismissalType[];
    /**
     * If provided, only return alerts fixed on or before this date.
     */
    fixedDateEnd: Date;
    /**
     * If provided, only return alerts fixed on or after this date.
     */
    fixedDateStart: Date;
    /**
     * If provided, only return alerts introduced on or before this date.
     */
    introducedDateEnd: Date;
    /**
     * If provided, only return alerts introduced on or after this date.
     */
    introducedDateStart: Date;
    /**
     * If provided, only return alerts whose titles match this pattern.
     */
    keywords: string;
    /**
     * If provided, only return alerts for projects whose names are in this list.
     */
    projects: string[];
    /**
     * If provided, only return alerts for repositories whose names are in this list.
     */
    repositories: string[];
    /**
     * If provided, only return alerts for repositories whose IDs (GitRepositoryId) are in this list.
     */
    repositoryIds: string[];
    /**
     * If provided, only return code scanning alerts or secret alerts matching the specified rule names.
     */
    ruleNames: string[];
    /**
     * If provided, only return secret alerts matching the specified secret types (rule friendly name or opaque ID).
     */
    secretTypes: string[];
    /**
     * If provided, only return alerts with the specified severities. Otherwise, return alerts at any severity.
     */
    severities: Severity[];
    /**
     * If provided, return alerts that are active or inactive based on this value. \<br /\>Otherwise, return alerts in any state.
     */
    state: DashboardAlertState;
    /**
     * If provided, only return code scanning alerts detected by the specified tools.
     */
    toolNames: string[];
}

/**
 * This enum defines the dependency components.
 */
export enum ComponentType {
    Unknown = 0,
    NuGet = 1,
    /**
     * Indicates the component is an Npm package.
     */
    Npm = 2,
    /**
     * Indicates the component is a Maven artifact.
     */
    Maven = 3,
    /**
     * Indicates the component is a Git repository.
     */
    Git = 4,
    /**
     * Indicates the component is not any of the supported component types by Governance.
     */
    Other = 5,
    /**
     * Indicates the component is a Ruby gem.
     */
    RubyGems = 6,
    /**
     * Indicates the component is a Cargo package.
     */
    Cargo = 7,
    /**
     * Indicates the component is a Pip package.
     */
    Pip = 8,
    /**
     * Indicates the component is a loose file. Not a package as understood by different package managers.
     */
    File = 9,
    /**
     * Indicates the component is a Go package.
     */
    Go = 10,
    /**
     * Indicates the component is a Docker Image
     */
    DockerImage = 11,
    /**
     * Indicates the component is a CocoaPods pod.
     */
    Pod = 12,
    /**
     * Indicates the component is found in a linux environment. A package understood by linux based package managers like apt and rpm.
     */
    Linux = 13,
    /**
     * Indicates the component is a Conda package.
     */
    Conda = 14,
    /**
     * Indicates the component is a Docker Reference.
     */
    DockerReference = 15,
    /**
     * Indicates the component is a Vcpkg Package.
     */
    Vcpkg = 16
}

/**
 * An alert entity used in the dashboard for combined alerts.
 */
export interface DashboardAlert {
    /**
     * Identifier for the alert. It is unique within Azure DevOps organization.
     */
    alertId: number;
    /**
     * Type of the alert. E.g. secret, code, etc.
     */
    alertType: AlertType;
    /**
     * This value is computed and returned by the service. This value represents the first time the vulnerability was introduced.
     */
    introducedDate: Date;
    /**
     * This value is computed and returned by the service. It is a value based on the results from all analysis configurations. An example of a physical location is a file location.
     */
    locations: DashboardAlertPhysicalLocation[];
    /**
     * Name of the project where the alert was detected.
     */
    projectName: string;
    /**
     * Name of the repository where the alert was detected.
     */
    repositoryName: string;
    /**
     * Severity of the alert.
     */
    severity: Severity;
    /**
     * This value is computed and returned by the service. It is a value based on the results from all analysis configurations.
     */
    state: State;
    /**
     * Title will only be rendered as text and does not support markdown formatting. There is a maximum character limit of 256.
     */
    title: string;
    /**
     * A truncated/obfuscated version of the secret pertaining to the alert (if applicable).
     */
    truncatedSecret: string;
    /**
     * Validity status of an alert. Currently, this is only applicable to secret alerts. In case of secret alerts, the validity status is computed by looking at the liveness results for validation fingerprints associated to an alert.
     */
    validityStatus: AlertValidityStatus;
}

/**
 * Location in the source control system where the issue was found
 */
export interface DashboardAlertPhysicalLocation {
    alertId: number;
    /**
     * Path of the file where the issue was found
     */
    filePath: string;
    /**
     * Details about the location where the issue was found including a snippet
     */
    region: Region;
}

export enum DashboardAlertState {
    /**
     * Alert has been detected in the code and corresponds to 'Active' state.
     */
    Open = 0,
    /**
     * Alert corresponds to 'Unknown', 'Dismissed', 'Fixed' or 'AutoDismissed' states.
     */
    Closed = 1
}

export enum DismissalType {
    /**
     * Dismissal type unknown
     */
    Unknown = 0,
    /**
     * Dismissal indicating alert has been fixed
     */
    Fixed = 1,
    /**
     * Dismissal indicating user is accepting a risk for the alert
     */
    AcceptedRisk = 2,
    /**
     * Dismissal indicating alert is a false positive and will likely not be fixed.
     */
    FalsePositive = 3,
    /**
     * Dismissal indicating user is agreeing to follow license guidance.
     */
    AgreedToGuidance = 4,
    /**
     * Dismissal indicating backend detection tool was upgraded and the alert is not detected by the new version of tool.
     */
    ToolUpgrade = 5,
    /**
     * Dismissal indicating the affected dependencency is not distributed to end users.
     */
    NotDistributed = 6
}

export interface EnablementFilterCriteria {
    /**
     * If provided, only return repos whose titles match this pattern.
     */
    keywords: string;
    /**
     * If provided, only return summary data for these projects. Otherwise, return summary data for all projects.
     */
    projects: string[];
    /**
     * If provided, only return summary data for these enablement states. Otherwise, return summary data at any state.
     */
    states: EnablementStateTypes;
}

export interface EnablementStateTypes {
    /**
     * True if any tool is enabled for the repository, false if any tool is disabled.
     */
    anyTool: boolean;
    /**
     * True if code scanning alerts are enabled for the repository, false if disabled.
     */
    codeAlerts: boolean;
    /**
     * True if code scanning pull request alerts are enabled for the repository, false if disabled.
     */
    codePRAlerts: boolean;
    /**
     * True if dependency alerts are enabled for the repository, false if disabled.
     */
    dependencyAlerts: boolean;
    /**
     * True if dependency pull request alerts are enabled for the repository, false if disabled.
     */
    dependencyPRAlerts: boolean;
    /**
     * True if pushes containing secrets will be blocked, false if they will not.
     */
    pushProtection: boolean;
    /**
     * True if secret scanning is enabled for the repository, false if disabled.
     */
    secretAlerts: boolean;
}

export interface FilterCriteria {
    /**
     * If provided, only return summary data for alerts of this type. Otherwise, return summary data for alerts of all types.
     */
    alertTypes: AlertType[];
    /**
     * If provided, only return repos whose titles match this pattern.
     */
    keywords: string;
    /**
     * If provided, summary data will be scoped to this time period.
     */
    period: TimePeriod;
    /**
     * If provided, only return summary data for these projects Otherwise, return summary data for all projects.
     */
    projects: string[];
    /**
     * If provided, only return summary data for alerts at these severities. \<br /\>Otherwise, return summary data for alerts at any severity.
     */
    severities: Severity[];
}

/**
 * Org Alert Summary.
 */
export interface OrgAlertSummary {
    /**
     * Org Id.
     */
    orgId: string;
    /**
     * A list of Project summary data.
     */
    projects: ProjectAlertSummary[];
}

/**
 * Org Enablement Summary.
 */
export interface OrgEnablementSummary {
    /**
     * Org Id.
     */
    orgId: string;
    /**
     * A list of Project Enablement data.
     */
    projects: ProjectEnablementSummary[];
}

export interface Project {
    id: string;
    name: string;
}

/**
 * Project Alert Summary.
 */
export interface ProjectAlertSummary {
    /**
     * Project Id.
     */
    projectId: string;
    /**
     * Project Name.
     */
    projectName: string;
    /**
     * A list of RepoAlertSummary data.
     */
    repos: RepoAlertSummary[];
}

/**
 * Represents project and repository information for filtering purposes.
 */
export interface ProjectAndRepoInfo {
    /**
     * The unique identifier of the project.
     */
    projectId: string;
    /**
     * The name of the project.
     */
    projectName: string;
    /**
     * The unique identifier of the repository.
     */
    repositoryId: string;
    /**
     * The name of the repository.
     */
    repositoryName: string;
}

/**
 * Project Enablement Summary.
 */
export interface ProjectEnablementSummary {
    /**
     * Project Id.
     */
    projectId: string;
    /**
     * Project Name.
     */
    projectName: string;
    /**
     * A list of RepoEnablementSummary data.
     */
    repos: RepoEnablementSummary[];
}

export interface Region {
    /**
     * The column where the code snippet ends
     */
    columnEnd: number;
    /**
     * The column where the code snippet starts
     */
    columnStart: number;
    /**
     * The line number where the code snippet ends
     */
    lineEnd: number;
    /**
     * The line number where the code snippet starts
     */
    lineStart: number;
}

/**
 * Repo Alert Summary.
 */
export interface RepoAlertSummary {
    /**
     * Total alerts by severity.
     */
    alertsBySeverity: AlertSummaryBySeverity;
    /**
     * Total alerts by state.
     */
    alertsByState: AlertSummaryByState;
    /**
     * Total active alerts in the repo.
     */
    openAlerts: number;
    /**
     * RepoId.
     */
    repoId: string;
    /**
     * Repo Name.
     */
    repoName: string;
    /**
     * Total active alerts in the repo.
     */
    totalAlerts: number;
}

/**
 * Repo Enablement Summary.
 */
export interface RepoEnablementSummary {
    /**
     * AdvSec is enabled for the repo.
     */
    advSecIsEnabled: boolean;
    /**
     * Code Security plan is enabled for the repo. Only present for Azure Dev Ops orgs who had enabled Advanced security after billing sku split has went live.
     */
    codeSecurityEnabled: boolean;
    /**
     * RepoId.
     */
    repoId: string;
    /**
     * Repo Name.
     */
    repoName: string;
    /**
     * Repo scan type metadata for different scan types.
     */
    scanTypeMetadata: { [key: number] : ScanTypeSummaryMetadata; };
    /**
     * Repo enablement summary for different scan types.
     */
    scanTypeSummary: { [key: number] : ScanTypeSummaryProperties; };
    /**
     * Secret Protection plan is enabled for the repo. Only present for Azure Dev Ops orgs who had enabled Advanced security after billing sku split has went live.
     */
    secretProtectionEnabled: boolean;
}

export interface ReportingUXComputedFilters {
    /**
     * Display reporting for specified projects. Show reporting for all projects if none are specified.
     */
    projects: Project[];
}

/**
 * Metadata for a scan type.
 */
export interface ScanTypeSummaryMetadata {
    /**
     * The date and time of the last scan for the associated alert type/repo combination. Null if no scan has been performed.
     */
    lastScanDate: Date;
}

export interface ScanTypeSummaryProperties {
    /**
     * True if alerts are enabled for the associated alert type/repo combination, false if disabled.
     */
    alerts: ScanTypeSummaryPropertiesData;
    /**
     * True if pull request alerts are enabled for the associated alert type/repo combination, false if disabled.
     */
    prAlerts: ScanTypeSummaryPropertiesData;
    /**
     * True if push protection is enabled for the associated alert type/repo combination, false if disabled.
     */
    pushProtection: ScanTypeSummaryPropertiesData;
}

export interface ScanTypeSummaryPropertiesData {
    /**
     * Represents the state of the scan type summary property.
     */
    enabled: boolean;
}

export enum Severity {
    Low = 0,
    Medium = 1,
    High = 2,
    Critical = 3,
    Note = 4,
    Warning = 5,
    Error = 6,
    Undefined = 7
}

export enum State {
    /**
     * Alert is in an indeterminate state
     */
    Unknown = 0,
    /**
     * Alert has been detected in the code
     */
    Active = 1,
    /**
     * Alert was dismissed by a user
     */
    Dismissed = 2,
    /**
     * The issue is no longer detected in the code
     */
    Fixed = 4,
    /**
     * The tool has determined that the issue is no longer a risk
     */
    AutoDismissed = 8
}

export enum TimePeriod {
    Undefined = 0,
    Last24Hours = 5,
    Last7Days = 6,
    Last14Days = 7,
    Last30Days = 8,
    Last90Days = 9
}
