/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

export interface Run {
    /**
     * The class to represent a collection of REST reference links.
     */
    _links: any;
    createdDate: Date;
    finalYaml: string;
    finishedDate: Date;
    id: number;
    name: string;
    /**
     * A reference to a Pipeline.
     */
    pipeline: PipelineReference;
    resources: RunResources;
    result: RunResult;
    state: RunState;
    url: string;
    variables: { [key: string]: Variable }
}

/**
 * A reference to a Pipeline.
 */
export interface PipelineReference {
    /**
     * Pipeline folder
     */
    folder: string;
    /**
     * Pipeline ID
     */
    id: number;
    /**
     * Pipeline name
     */
    name: string;
    /**
     * Revision number
     */
    revision: number;
    url: string;
}

export interface RunResources {
    repositories: { [key: string]: RepositoryResource };
}

export interface RepositoryResource {
    refName: string;
    repository: Repository;
    version: string;
}

export interface Repository {
    type: RepositoryType;
}

export enum RepositoryType {
    azureReposGit = 0,
    azureReposGitHyphenated = 1,
    gitHub = 2,
    unknown = 3
}

export interface RunResult {
    canceled: string;
    failed: string;
    succedded: string;
    unknown: string;
}

export interface RunState {
    canceling: string;
    completed: string;
    inProgress: string;
    unknown: string;
}

export interface Variable {
    isSecret: boolean;
    value: string;
}

export interface RunResourcesParameters {
    builds?: { [key: string]: BuildResourceParameters };
    containers?: { [key: string]: ContainerResourceParameters };
    packages?: { [key: string]: PackageResourceParameters };
    pipelines?: { [key: string]: PipelineResourceParameters };
    repositories?: { [key: string]: RepositoryResourceParameters };
}

export interface BuildResourceParameters {
    version: string;
}

export interface ContainerResourceParameters {
    version: string;
}

export interface PackageResourceParameters {
    version: string;
}

export interface PipelineResourceParameters {
    version: string;
}

export interface RepositoryResourceParameters {
    refName: string;
    /**
     * This is the security token to use when connecting to the repository.
     */
    token: string;
    /**
     * Optional. This is the type of the token given. If not provided, a type of "Bearer" is assumed. Note: Use "Basic" for a PAT token.
     */
    tokenType: string;
    version: string;
}

/**
 * Settings which influence pipeline runs.
 */
export interface RunPipelineParameters {
    /**
     * If true, don't actually create a new run. Instead, return the final YAML document after parsing templates.
     */
    previewRun?: boolean;
    /**
     * The resources the run requires.
     */
    resources?: RunResourcesParameters
    stagesToSkip?: string[];
    templateParameters?: object;
    variables?: { [key: string]: Variable };
    /**
     * If you use the preview run option, you may optionally supply different YAML. This allows you to preview the final YAML document without committing a changed file.
     */
    yamlOverride?: string;
}

/**
 * Type of configuration.
 */
export enum ConfigurationType {
    /**
     * Designer-JSON.
     */
    designerHyphenJson = "designerHyphenJson",
    /**
     * Designer JSON.
     */
    designerJson = "designerJson ",
    /**
     * Just-in-time.
     */
    justInTime = "justInTime",
    /**
     * Unknown type.
     */
    unknown = "unknown",
    /**
     * YAML.
     */
    yaml = "yaml"
}

export interface PipelineConfiguration {
    type: ConfigurationType
}

export interface Pipeline {
    /**
     * The class to represent a collection of REST reference links.
     */
    _links: any,
    configuration: PipelineConfiguration,
    /**
     * Pipeline folder
     */
    folder: string,
    /**
     * Pipeline ID
     */
    id: number,
    /**
     * Pipeline name
     */
    name: string,
    /**
     * Revision number
     */
    revision: number,
    /**
     * URL of the pipeline
     */
    url: string
}

/**
 * Configuration parameters of the pipeline.
 */
export interface CreatePipelineConfigurationParameters {
    /**
     * Type of configuration.
     */
    type: ConfigurationType
}

/**
 * Parameters to create a pipeline.
 */
export interface CreatePipelineParameters {
    /**
     * Configuration parameters of the pipeline.
     */
    configuration: CreatePipelineConfigurationParameters,
    /**
     * Folder of the pipeline.
     */
    folder: string,
    /**
     * Name of the pipeline.
     */
    name: string
}

/**
 * Expand options. Default is None.
 */
export interface GetLogExpandOptions {
    none: string,
    signedContent: string
}

/**
 * Log for a pipeline.
 */
export interface Log {
    /**
     * The date and time the log was created.
     */
    createdOn: Date,
    /**
     * 	
    The ID of the log.
     */
    id: number,
    /**
     * The date and time the log was last changed.
     */
    lastChangedOn: Date,
    /**
     * 	The number of lines in the log.
     */
    lineCount: number
    /**
     * A signed url allowing limited-time anonymous access to private resources.
     */
    signedContent: SignedUrl,
    url: string
}

/**
 * A collection of logs.
 */
export interface LogCollection {
    /**
     * The list of logs.
     */
    logs: Log[],
    /**
     * A signed url allowing limited-time anonymous access to private resources.
     */
    signedContent: SignedUrl
    /**
     * URL of the log.
     */
    url: string
}

/**
 * A signed url allowing limited-time anonymous access to private resources.
 */
export interface SignedUrl {
    /**
     * Timestamp when access expires.
     */
    signatureExpires: Date,
    /**
     * The URL to allow access to.
     */
    url: string
}

/**
 * Artifacts are collections of files produced by a pipeline. Use artifacts to share files between stages in a pipeline or between different pipelines.
 */
export interface Artifact {
    /**
     * The name of the artifact.
     */
    name: string,
    /**
     * Signed url for downloading this artifact
     */
    signedContent: SignedUrl,
    /**
    * Self-referential url
    */
    url: string
}

/**
 * Expand options. Default is None.
 */
export interface GetArtifactExpandOptions {
    /**
     * No expansion.
     */
    none: string,
    /**
     * Include signed content.
     */
    signedContent: string
}
