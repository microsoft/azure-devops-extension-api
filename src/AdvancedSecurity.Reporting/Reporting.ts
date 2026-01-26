/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

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

export interface CombinedAlertFilterCriteria {
    /**
     * If provided, only return alerts whose titles match this pattern.
     */
    keywords: string;
    /**
     * If provided, return alerts that are active or inactive based on this value. \<br /\>Otherwise, return alerts in any state.
     */
    state: DashboardAlertState;
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
