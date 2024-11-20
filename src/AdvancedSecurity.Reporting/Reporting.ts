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
