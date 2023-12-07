/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import * as WebApi from "../WebApi/WebApi";

export interface Alert {
    /**
     * Identifier for the alert. It is unqiue within Azure DevOps organization.
     */
    alertId: number;
    /**
     * Type of the alert. E.g. secret, code, etc.
     */
    alertType: AlertType;
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

export interface AlertStateUpdate {
    dismissedComment: string;
    dismissedReason: DismissalType;
    state: State;
}

export enum AlertType {
    Unknown = 0,
    Dependency = 1,
    Secret = 2,
    Code = 3
}

/**
 * AnalysisConfiguration class models a build definition.
 */
export interface AnalysisConfiguration {
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

export interface Dependency {
    componentName: string;
    componentType: ComponentType;
    componentVersion: string;
    dependencyId: number;
}

export interface DependencyResult {
    dependency: Dependency;
    dependencyResultId: number;
    resultId: number;
    rootDependencyId: number;
    versionControlFilePath: VersionControlFilePath;
}

export interface Dismissal {
    dismissalId: number;
    dismissalType: DismissalType;
    message: string;
    requestedOn: Date;
    stateChangedBy: string;
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
    FalsePositive = 3
}

export interface LogicalLocation {
    fullyQualifiedName: string;
    /**
     * Possible values: "unknown" "rootDependency" and "vulnerableDependency"
     */
    kind: string;
}

export interface PhysicalLocation {
    filePath: string;
    region: Region;
    versionControl: VersionControlDetails;
}

export interface Pipeline {
    adoPipelineId: number;
    name: string;
    phase: string;
    phaseId: string;
}

export interface Region {
    columnEnd: number;
    columnStart: number;
    highlightSnippet: string;
    lineEnd: number;
    lineStart: number;
    snippet: string;
}

export interface Result {
    dependencyResult: DependencyResult;
    fingerprint: string;
    fingerprintId: number;
    resultId: number;
    /**
     * This is the index into the SARIF Results array. If we have to do any tool specific insertions, we'll use this key to index back into the SARIF Results array.
     */
    resultIndex: number;
    resultMessage: string;
    resultType: ResultType;
    ruleId: number;
    ruleShortDescription: string;
    severity: Severity;
    versionControlResult: VersionControlResult;
}

/**
 * This enum defines the different result types.
 */
export enum ResultType {
    Unknown = 0,
    Dependency = 1,
    VersionControl = 2
}

/**
 * The analysis rule that caused the alert.
 */
export interface Rule {
    description: string;
    friendlyName: string;
    helpMessage: string;
    opaqueId: string;
    /**
     * Markdown-formatted list of resources to learn more about the Rule. In some cases, RuleInfo.AdditionalProperties.advisoryUrls is used instead.
     */
    resources: string;
    tags: string[];
}

export interface SearchCriteria {
    /**
     * If provided, only return alerts of this type. Otherwise, return alerts of all types.
     */
    alertType: AlertType;
    /**
     * If provided, only alerts for this dependency are returned. \<br /\>Otherwise, return alerts for all dependencies. \<br /\>In a sarif submission, a dependency (or a vulnerable component) is specified in result.RelatedLocations[].logicalLocation.
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
     * If true, only return alerts found on the default branch of the repository. \<br /\>If there have been no runs completed on the default branch, the last run is used instead regardless of the branch used for that run. \<br /\>This option is ignored if branchName or ref are provided.
     */
    onlyDefaultBranchAlerts: boolean;
    /**
     * If provided with pipelineName, only return alerts detected in this pipeline phase \<br /\>Otherwise, return alerts detected in all phases.
     */
    phaseId: string;
    /**
     * If provided with pipelineName, only return alerts detected in this pipeline phase \<br /\>Otherwise, return alerts detected in all phases.
     */
    phaseName: string;
    /**
     * If provided, only return alerts detected in this pipeline. \<br /\>Otherwise, return alerts detected in all pipelines.
     */
    pipelineName: string;
    /**
     * If provided, only include alerts for this ref. \<br /\>If not provided and OnlyDefaultBranch is true, only include alerts found on the default branch or last run branch if there is no analysis configuration for the default branch. \<br /\>Otherwise, include alerts from all branches.
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
     * If provided, only return alerts at these severities. \<br /\>Otherwise, return alerts at any serverity.
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
}

export enum Severity {
    Low = 0,
    Medium = 1,
    High = 2,
    Critical = 3
}

export enum State {
    Unknown = 0,
    Active = 1,
    Dismissed = 2,
    Fixed = 4,
    AutoDismissed = 8
}

export interface Tool {
    name: string;
    rules: Rule[];
}

export interface UxFilters {
    branches: Branch[];
    packages: Dependency[];
    pipelines: Pipeline[];
    progressPercentage: number;
    rules: Rule[];
    secretTypes: string[];
    severities: Severity[];
    states: State[];
}

export interface VersionControlDetails {
    commitHash: string;
    itemUrl: string;
}

export interface VersionControlFilePath {
    filePath: string;
    filePathHash: number[];
    versionControlFilePathId: number;
}

export interface VersionControlResult {
    resultId: number;
    versionControlSnippet: VersionControlSnippet;
}

export interface VersionControlSnippet {
    endColumn: number;
    endLine: number;
    highlightSnippet: string;
    snippet: string;
    startColumn: number;
    startLine: number;
    versionControl: string;
    versionControlFilePath: VersionControlFilePath;
    versionControlFilePathId: number;
    versionControlSnippetId: number;
}
