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

export interface EnablementFilterCriteria {
    /**
     * If provided, only return repos whose titles match this pattern.
     */
    keywords: string;
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
     * Repo enablement summary for different scan types.
     */
    scanTypeSummary: { [key: number] : ScanTypeSummaryProperties; };
    /**
     * Secret Protection plan is enabled for the repo. Only present for Azure Dev Ops orgs who had enabled Advanced security after billing sku split has went live.
     */
    secretProtectionEnabled: boolean;
}

export interface RiskUXComputedFilters {
    /**
     * Display alerts for specified projects. Show alerts for all projects if none are specified.
     */
    projects: Project[];
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

export enum TimePeriod {
    Undefined = 0,
    Last24Hours = 5,
    Last7Days = 6,
    Last14Days = 7,
    Last30Days = 8,
    Last90Days = 9
}
