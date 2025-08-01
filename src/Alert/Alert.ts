﻿/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import * as WebApi from "../WebApi/WebApi";

export interface Alert {
    /**
     * Additional properties of this alert.
     */
    additionalProperties: { [key: string] : any; };
    /**
     * Identifier for the alert. It is unique within Azure DevOps organization.
     */
    alertId: number;
    /**
     * Type of the alert. E.g. secret, code, etc.
     */
    alertType: AlertType;
    /**
     * Confidence level of the alert.
     */
    confidence: Confidence;
    /**
     * Contains information for the dismissal of the alert if the alert has been dismissed.
     */
    dismissal: Dismissal;
    /**
     * This value is computed and returned by the service. This value represents the first time the service has seen this issue reported in an analysis instance.
     */
    firstSeenDate: Date;
    /**
     * This value is computed and returned by the service. If the issue is fixed, this value represents the time the service has seen this issue fixed in an analysis instance.
     */
    fixedDate: Date;
    /**
     * Reference to a git object, e.g. branch ref.
     */
    gitRef: string;
    /**
     * This value is computed and returned by the service. This value represents the first time the vulnerability was introduced.
     */
    introducedDate: Date;
    /**
     * This value is computed and returned by the service. This value represents the last time the service has seen this issue reported in an analysis instance.
     */
    lastSeenDate: Date;
    /**
     * Logical locations for the alert. This value is computed and returned by the service. It is a value based on the results from all analysis configurations. An example of a logical location is a component.
     */
    logicalLocations: LogicalLocation[];
    /**
     * This value is computed and returned by the service. It is a value based on the results from all analysis configurations. An example of a physical location is a file location.
     */
    physicalLocations: PhysicalLocation[];
    /**
     * Relations between alerts and other artifacts.
     */
    relations: RelationMetadata[];
    /**
     * Repository URL where the alert was detected.
     */
    repositoryUrl: string;
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
     * Tools that have detected this issue.
     */
    tools: Tool[];
    /**
     * A truncated/obfuscated version of the secret pertaining to the alert (if applicable).
     */
    truncatedSecret: string;
    /**
     * ValidationFingerprints for the secret liveness check. Only returned on demand in Get API with Expand parameter set to be ValidationFingerprint (not returned in List API)
     */
    validationFingerprints: ValidationFingerprint[];
    /**
     * Validity details of an alert. Currently, this is only applicable to secret alerts. In case of secret alerts, the validity status and time is computed by looking at the liveness results for validation fingerprints associated to an alert.
     */
    validityDetails: AlertValidityInfo;
}

/**
 * Summary of the state of the alert for a given analysis configuration.
 */
export interface AlertAnalysisInstance {
    /**
     * Analysis configuration.
     */
    analysisConfiguration: AnalysisConfiguration;
    /**
     * Analysis instance where the issue was first detected for a given analysis configuration.
     */
    firstSeen: AnalysisInstance;
    /**
     * Analysis instance where the issue was fixed for a given analysis configuration.
     */
    fixedIn: AnalysisInstance;
    /**
     * Analysis instance where the issue was last detected for a given analysis configuration.
     */
    lastSeen: AnalysisInstance;
    /**
     * The most recent instatnce of the analysis.
     */
    recentAnalysisInstance: AnalysisInstance;
    /**
     * Result state for a given analysis configuration.
     */
    state: State;
}

export enum AlertListExpandOption {
    /**
     * No Expands.
     */
    None = 0,
    /**
     * Return a minimal representation of an alert.
     */
    Minimal = 1
}

/**
 * Alert metadata.
 */
export interface AlertMetadata {
    /**
     * The ID of the alert.
     */
    alertId: number;
    /**
     * A list of metadata to be associated with the alert.
     */
    metadata: Metadata[];
}

/**
 * Used to represent an update in a relationship between an alert and an artifact.
 */
export interface AlertMetadataChange {
    /**
     * The ID of the alert.
     */
    alertId: number;
    /**
     * The change that occurred to the metadata.
     */
    metadataChange: MetadataChange;
}

export interface AlertStateUpdate {
    dismissedComment: string;
    dismissedReason: DismissalType;
    state: State;
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

export enum AlertValidationRequestStatus {
    /**
     * Default, when the request status is not set/applicable.
     */
    None = 0,
    /**
     * First validation request for the alert's validation fingerprints, created when the sarif is submitted for processing.
     */
    Created = 1,
    /**
     * The secret validation jobs for the alert's validation fingerprints have been manually queued and at least one is still in progress.
     */
    InProgress = 2,
    /**
     * All the secret validation jobs for the alert's validation fingerprints have returned Completed or Failed.
     */
    Completed = 3,
    /**
     * This status is set only when there is an exception in the ValidationService.
     */
    Failed = 4
}

/**
 * Validity data for an alert that will be part of Alerts APIs and UI.
 */
export interface AlertValidityInfo {
    isDynamicAnalysisSupported: boolean;
    validityLastCheckedDate: Date;
    validityStatus: AlertValidityStatus;
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
     * When atleast one validation fingerprint associated to the alert is exploitable.
     */
    Active = 2,
    /**
     * When all validation fingerprints associated to the alert are not exploitable.
     */
    Inactive = 3
}

/**
 * AnalysisConfiguration class models a build definition.
 */
export interface AnalysisConfiguration {
    /**
     * The type of alert this configuration is setup to detect.
     */
    alertType: AlertType;
    /**
     * Details for the configuration. Populated values depend on the type of configuration.
     */
    analysisConfigurationDetails: AnalysisConfigurationDetails;
    /**
     * Identifier for the analysis configuration.
     */
    analysisConfigurationId: number;
    /**
     * Type of the configuration.
     */
    analysisConfigurationType: AnalysisConfigurationType;
    /**
     * Name of the tool that ran on this configuration.
     */
    toolName: string;
    /**
     * The latest version of the tool that ran on this configuration.
     */
    toolVersion: string;
}

export interface AnalysisConfigurationDetails {
    /**
     * Properties of the pipeline.
     */
    additionalProperties: { [key: string] : any; };
    /**
     * Reference to a git object, e.g. branch ref.
     */
    gitRef: string;
    /**
     * Is this the default branch?
     */
    isDefaultBranch: boolean;
    /**
     * Phase ID of the pipeline.
     */
    phaseId: string;
    /**
     * Phase name.
     */
    phaseName: string;
    /**
     * AzureDevOps pipeline id.
     */
    pipelineId: number;
    /**
     * Name of the pipeline.
     */
    pipelineName: string;
}

export enum AnalysisConfigurationType {
    /**
     * Default analysis configuration that is not attached to any other configuration data
     */
    Default = 0,
    /**
     * Ado Pipeline, contains branch, pipeline, phase, and ADOPipelineId
     */
    AdoPipeline = 1
}

/**
 * AnalysisInstance class models a build.
 */
export interface AnalysisInstance {
    /**
     * CommitId is a commit id for that instance
     */
    commitId: string;
    /**
     * Analysis configuration.
     */
    configuration: AnalysisConfiguration;
    /**
     * Date when the analysis was created.
     */
    createdDate: Date;
    /**
     * InstanceIdentifier is a key that uniquely establishes this instance
     */
    instanceIdentifier: string;
    /**
     * Results that were reported by the analysis.
     */
    results: AnalysisResult[];
    /**
     * Url is the permalink to the build.
     */
    url: string;
}

export interface AnalysisResult {
    analysisResultId: number;
    firstIntroducedInstanceId: number;
    fixedInstanceId: number;
    introducedInstanceId: number;
    lastSeenInstanceId: number;
    result: Result;
    state: State;
}

export interface Branch {
    branchId: number;
    deletedDate: Date;
    name: string;
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

export enum Confidence {
    /**
     * High confidence level for alert
     */
    High = 0,
    /**
     * Other confidence level for alert
     */
    Other = 1
}

/**
 * Information about a vulnerable dependency
 */
export interface Dependency {
    /**
     * Dependency name
     */
    componentName: string;
    /**
     * Source of the dependency
     */
    componentType: ComponentType;
    /**
     * Version information
     */
    componentVersion: string;
    /**
     * Unique ID for the dependency
     */
    dependencyId: number;
    /**
     * License information of the Component
     */
    license: License;
}

export enum DependencyKind {
    Unknown = 0,
    /**
     * The root dependency introduced the component being alerted.
     */
    RootDependency = 1,
    /**
     * The component being alerted.
     */
    Component = 2,
    /**
     * Vulnerable Dependency. Deprecating this value. Use Component instead.
     */
    VulnerableDependency = 3
}

/**
 * An instance of a vulnerable dependency that was detected
 */
export interface DependencyResult {
    /**
     * Information about the vulnerable dependency that was found
     */
    dependency: Dependency;
    /**
     * Unique ID for this dependency
     */
    dependencyResultId: number;
    /**
     * ID for the Result that this instance belongs to
     */
    resultId: number;
    /**
     * Heirarchal information when multiple instances are found
     */
    rootDependencyId: number;
    /**
     * Information about where the dependency was found
     */
    versionControlFilePath: VersionControlFilePath;
}

/**
 * Information about an alert dismissal
 */
export interface Dismissal {
    /**
     * Unique ID for this dismissal
     */
    dismissalId: number;
    /**
     * Reason for the dismissal
     */
    dismissalType: DismissalType;
    /**
     * Informational message attached to the dismissal
     */
    message: string;
    requestedOn: Date;
    /**
     * Identity that dismissed the alert
     */
    stateChangedBy: string;
    /**
     * Identity that dismissed the alert
     */
    stateChangedByIdentity: WebApi.IdentityRef;
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

export enum ExpandOption {
    /**
     * No Expands.
     */
    None = 0,
    /**
     * Return validationFingerprints in Alert.
     */
    ValidationFingerprint = 1
}

/**
 * Details for a legal review for a given component
 */
export interface LegalReview {
    /**
     * The review id. This indicates the associated work item id for dev it's witness-dev and for prod it's ossmsft.
     */
    id: number;
    /**
     * The review state.
     */
    state: string;
    /**
     * The review web url.
     */
    webUrl: string;
}

/**
 * License information for dependencies
 */
export interface License {
    /**
     * License name
     */
    name: string;
    /**
     * License state
     */
    state: LicenseState;
    /**
     * License type
     */
    type: LicenseType;
    /**
     * Url for license information
     */
    url: string;
}

export enum LicenseState {
    /**
     * Information of the license has not been harvested by ClearlyDefined
     */
    Unknown = 0,
    /**
     * Information of the license has not been harvested by ClearlyDefined
     */
    NotHarvested = 1,
    /**
     * Information of the license has been harvested by ClearlyDefined
     */
    Harvested = 2
}

/**
 * Enumerates types of licenses.
 */
export enum LicenseType {
    /**
     * The license type is unknown or not specified.
     */
    Unknown = 0,
    /**
     * A permissive license allows software to be freely used, modified, and distributed with minimal restrictions. Examples: MIT, Apache 2.0.
     */
    Permissive = 1,
    /**
     * A weak copyleft license requires modifications to the software to be shared under the same license, but does not impose restrictions on larger works that include the software. Examples: LGPL.
     */
    WeakCopyleft = 2,
    /**
     * A strong copyleft license requires that any derivative works or larger works that include the software must also be distributed under the same license. Examples: GPL.
     */
    StrongCopyleft = 3,
    /**
     * A network copyleft license extends the copyleft requirement to software that is accessed over a network, requiring the source code to be made available. Examples: AGPL.
     */
    NetworkCopyleft = 4,
    /**
     * A license that does not fit into the standard categories or is custom-defined. In CG, it indicates a commercial license.
     */
    Other = 5,
    /**
     * No assertion is made about the license type, leaving it unspecified.
     */
    NoAssertion = 6
}

export interface LogicalLocation {
    fullyQualifiedName: string;
    /**
     * Dependency kind of this logical location.
     */
    kind: DependencyKind;
    /**
     * License information for Dependency Only applicable when Kind is "Component" and the alertType of the alert with this location is License
     */
    license: License;
}

/**
 * The metadata operation to be performed on the alert.
 */
export interface Metadata {
    /**
     * The type of operation to be performed.
     */
    op: MetadataOperation;
    /**
     * The metadata value
     */
    value: RelationMetadata;
}

/**
 * The change that has been made to the metadata.
 */
export interface MetadataChange {
    /**
     * The type of change on the metadata.
     */
    changeType: MetadataChangeType;
    /**
     * Represents a metadata association to an alert.
     */
    value: RelationMetadata;
}

/**
 * The type of change that occurred to the metadata.
 */
export enum MetadataChangeType {
    None = 0,
    Created = 1,
    Updated = 2,
    Deleted = 3
}

/**
 * The operation to be performed on the metadata.
 */
export enum MetadataOperation {
    /**
     * Represents the defualt value if the operation is not specified or not supported.
     */
    None = 0,
    /**
     * Represents the addition of the metadata.
     */
    Add = 1,
    /**
     * Represents the removal of the metadata.
     */
    Remove = 2
}

/**
 * Location in the source control system where the issue was found
 */
export interface PhysicalLocation {
    /**
     * Path of the file where the issue was found
     */
    filePath: string;
    /**
     * Details about the location where the issue was found including a snippet
     */
    region: Region;
    /**
     * Source control system-specific information about the location
     */
    versionControl: VersionControlDetails;
}

export interface Pipeline {
    adoPipelineId: number;
    name: string;
    phase: string;
    phaseId: string;
    properties: { [key: string] : any; };
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
 * The metadata to be associated with the alert.
 */
export interface RelationMetadata {
    /**
     * Any additional attributes of the metadata.
     */
    attributes: { [key: string] : any; };
    /**
     * The type of the metadata.
     */
    rel: string;
    /**
     * The URL of the metadata.
     */
    url: string;
}

export interface Result {
    /**
     * Additional information about the alert.  Valid when ResultType is Dependency
     */
    dependencyResult: DependencyResult;
    /**
     * Full fingerprint of the Result.  This is used to detect duplicate instances of the same alert
     */
    fingerprint: string;
    /**
     * Unique ID of the fingerprint of the Result
     */
    fingerprintId: number;
    /**
     * Unique ID of the Result
     */
    resultId: number;
    /**
     * This is the index into the SARIF Results array. If we have to do any tool specific insertions, we'll use this key to index back into the SARIF Results array.
     */
    resultIndex: number;
    /**
     * Detailed description of the rule that triggered the alert
     */
    resultMessage: string;
    /**
     * The type of rule that triggered the alert
     */
    resultType: ResultType;
    /**
     * ID of the rule that the triggered the alert
     */
    ruleId: number;
    /**
     * Short description of the rule that triggered the alert
     */
    ruleShortDescription: string;
    /**
     * The severity of the alert
     */
    severity: Severity;
    /**
     * Additional information about the alert.  Valid when ResultType is VersionControl
     */
    versionControlResult: VersionControlResult;
}

/**
 * This enum defines the different result types.
 */
export enum ResultType {
    /**
     * The result was found from an unspecified analysis type
     */
    Unknown = 0,
    /**
     * The result was found from dependency analysis
     */
    Dependency = 1,
    /**
     * The result was found from static code analysis
     */
    VersionControl = 2
}

/**
 * The analysis rule that caused the alert.
 */
export interface Rule {
    /**
     * Additional properties of this rule dependent on the rule type.  For example, dependency rules may include the CVE ID if it is available.
     */
    additionalProperties: { [key: string] : any; };
    /**
     * Description of what this rule detects
     */
    description: string;
    /**
     * Plain-text rule identifier
     */
    friendlyName: string;
    /**
     * Additional information about this rule
     */
    helpMessage: string;
    /**
     * Tool-specific rule identifier
     */
    opaqueId: string;
    /**
     * Markdown-formatted list of resources to learn more about the Rule. In some cases, RuleInfo.AdditionalProperties.advisoryUrls is used instead.
     */
    resources: string;
    /**
     * Classification tags for this rule
     */
    tags: string[];
}

export enum SarifJobStatus {
    /**
     * The job type when it is new
     */
    New = 0,
    /**
     * The job type when it is queued
     */
    Queued = 1,
    /**
     * The job type when it is completed
     */
    Completed = 2,
    /**
     * The job type when it fails
     */
    Failed = 3,
    /**
     * The job type when it is queued on exception
     */
    Requeued = 4
}

export interface SarifUploadStatus {
    errors: SarifValidationError[];
    processingStatus: SarifJobStatus;
}

export interface SarifValidationError {
    nodePointer: string;
    ruleId: string;
    validationError: string;
}

export interface SearchCriteria {
    /**
     * If provided, only return alerts with the ids specified. \<br /\>Otherwise, return any alert.
     */
    alertIds: number[];
    /**
     * If provided, only return alerts of this type. Otherwise, return alerts of all types.
     */
    alertType: AlertType;
    /**
     * If provided, only return alerts at these confidence levels. \<br /\>Both High and Other need to be specified to fetch alerts of all confidence levels. \<br /\>Otherwise, return alerts with high confidence level. \<br /\>Only applicable for secret alerts.
     */
    confidenceLevels: Confidence[];
    /**
     * If provided, only alerts for this dependency are returned. \<br /\>Otherwise, return alerts for all dependencies. \<br /\>In a sarif submission, a dependency (or a component) is specified in result.RelatedLocations[].logicalLocation. \<br /\>Not applicable for secret alerts.
     */
    dependencyName: string;
    /**
     * If provided, only return alerts last seen after this date. \<br /\>Otherwise return all alerts.
     */
    fromDate: Date;
    /**
     * If provided, only return alerts whose titles match this pattern.
     */
    keywords: string;
    /**
     * If provided, only alerts created for dependency with this license are returned. \<br /\>Otherwise, return alerts for all licenses. \<br /\>In a sarif submission, license for a dependency (or a component) is specified in result.RelatedLocations[].logicalLocation.properties.license. \<br /\>Not applicable for secret alerts.
     */
    licenseName: string;
    /**
     * If provided, only return alerts that were modified since this date. \<br /\>Otherwise return all alerts.
     */
    modifiedSince: Date;
    /**
     * If true or not set, only return alerts found on the default branch of the repository. \<br /\>If there have been no runs completed on the default branch, the last run is used instead regardless of the branch used for that run. If false, return alerts from all branches. \<br /\>This option is ignored if ref is provided. \<br /\>Not applicable for secret alerts.
     */
    onlyDefaultBranch: boolean;
    /**
     * If provided with pipelineName, only return alerts detected in this pipeline phase \<br /\>Otherwise, return alerts detected in all phases. \<br /\>Not applicable for secret alerts.
     */
    phaseId: string;
    /**
     * If provided with pipelineName, only return alerts detected in this pipeline phase \<br /\>Otherwise, return alerts detected in all phases. \<br /\>Not applicable for secret alerts.
     */
    phaseName: string;
    /**
     * If provided, only return alerts detected in this pipeline. \<br /\>Otherwise, return alerts detected in all pipelines. \<br /\>Not applicable for secret alerts.
     */
    pipelineName: string;
    /**
     * If provided, only include alerts for this ref. \<br /\>If not provided and OnlyDefaultBranch is true, only include alerts found on the default branch or last run branch if there is no analysis configuration for the default branch. \<br /\>Otherwise, include alerts from all branches. \<br /\>Not applicable for secret alerts.
     */
    ref: string;
    /**
     * If provided, only return alerts for this rule. \<br /\>Otherwise, return alerts of all rules.
     */
    ruleId: string;
    /**
     * If provided, only return alerts for this rule. \<br /\>Otherwise, return alerts for all rules.
     */
    ruleName: string;
    /**
     * If provided, only return alerts at these severities. \<br /\>Otherwise, return alerts at any severity.
     */
    severities: Severity[];
    /**
     * If provided, only return alerts in these states. \<br /\>Otherwise, return alerts in any state.
     */
    states: State[];
    /**
     * If provided, only return alerts last seen before this date. \<br /\>Otherwise return all alerts.
     */
    toDate: Date;
    /**
     * If provided with toolName, only return alerts detected by this tool. \<br /\>Otherwise, return alerts detected by all tools.
     */
    toolName: string;
    /**
     * If provided, only return alerts with the validity specified here. If the validity status is Unknown, fetch alerts of all validity results. \<br /\>Only applicable for secret alerts. \<br /\>Filtering by validity status may cause less alerts to be returned than requested with TOP parameter. \<br /\>Due to this behavior, the ContinuationToken(\<![CDATA[\<header name\>]]\>) in the response header should be relied on to decide if another batch needs to be fetched.
     */
    validity: AlertValidityStatus[];
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

/**
 * An Analysis tool that can generate security alerts
 */
export interface Tool {
    /**
     * Name of the tool
     */
    name: string;
    /**
     * The rules that the tool defines
     */
    rules: Rule[];
}

export interface UxFilters {
    /**
     * Display alerts for specified branches. Show alerts for all branches if none are specified.
     */
    branches: Branch[];
    /**
     * Display alerts for specified confidence levels. Show alerts for all confidence levels. if none are specified.
     */
    confidenceLevels: Confidence[];
    /**
     * Display alerts for specified licenses. Show alerts for all licenses if none are specified.
     */
    licenses: License[];
    /**
     * Display alerts for specified packages. Show alerts for all packages if none are specified.
     */
    packages: Dependency[];
    /**
     * Display alerts for specified pipelines. Show alerts for all pipelines if none are specified.
     */
    pipelines: Pipeline[];
    progressPercentage: number;
    /**
     * Display alerts for specified rules. Show alerts for all rules if none are specified.
     */
    rules: Rule[];
    /**
     * Display alerts for specified secret types. Show alerts for all secret types if none are specified.
     */
    secretTypes: string[];
    /**
     * Display alerts for specified severities. Show alerts for all severities if none are specified.
     */
    severities: Severity[];
    /**
     * Display alerts for specified states. Show alerts for all states if none are specified.
     */
    states: State[];
    /**
     * Display alerts for specified tools. Show alerts for all tools if none are specified.
     */
    tools: Tool[];
    /**
     * Display alerts for specified validity. Show alerts for all validities if none are specified.
     */
    validity: AlertValidityStatus[];
}

export interface ValidationFingerprint {
    /**
     * The hash associated to the secret.
     */
    validationFingerprintHash: string;
    /**
     * The JSON representation of the secret. Be aware that this field may contain the secret in its unencrypted form. Please exercise caution when using this field.
     */
    validationFingerprintJson: string;
    /**
     * The date when the validity was last updated.
     */
    validityLastUpdatedDate: Date;
    /**
     * The result of the validation.
     */
    validityResult: ValidationResult;
}

/**
 * Data associated to a validation request for an alert. Along with the request status, this includes the validity data that is part of Get Alert(s) response.
 */
export interface ValidationRequestInfo extends AlertValidityInfo {
    alertValidationRequestStatus: AlertValidationRequestStatus;
}

export enum ValidationResult {
    /**
     * Default value, no information about the secret can be inferred from this.
     */
    None = 0,
    /**
     * Represents a secret that can be used to connect to a resource.
     */
    Exploitable = 1,
    /**
     * Represents a secret that can't be used to connect to a resource.
     */
    NotExploitable = 2,
    /**
     * Represents a secret where no determination can be made about its exploitability.
     */
    Inconclusive = 3
}

/**
 * Information for locating files in a source control system
 */
export interface VersionControlDetails {
    commitHash: string;
    itemUrl: string;
}

export interface VersionControlFilePath {
    /**
     * Path of the file in the version control system
     */
    filePath: string;
    /**
     * Hash of the file in the version control system
     */
    filePathHash: number[];
    /**
     * Unique ID for the file in the version control system
     */
    versionControlFilePathId: number;
}

export interface VersionControlResult {
    /**
     * The ID to associate this structure with the cooresponding Result
     */
    resultId: number;
    /**
     * Information about the snippet where the Result was found
     */
    versionControlSnippet: VersionControlSnippet;
}

export interface VersionControlSnippet {
    /**
     * column in the code file where the snippet ends
     */
    endColumn: number;
    /**
     * line in the code file where the snippet ends
     */
    endLine: number;
    /**
     * column in the code file where the snippet starts
     */
    startColumn: number;
    /**
     * line in the code file where the snippet starts
     */
    startLine: number;
    /**
     * path of the code file in the version control system
     */
    versionControlFilePath: VersionControlFilePath;
    /**
     * Unique Id number for the file path
     */
    versionControlFilePathId: number;
    /**
     * Unique Id number for this snippet
     */
    versionControlSnippetId: number;
}
