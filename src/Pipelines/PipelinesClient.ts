/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as Pipelines from "../Pipelines/Pipelines"

export class PipelineRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    /**
     * Get a specific artifact from a pipeline run
     * @param pipelineId - ID of the pipeline.
     * @param project - Project ID or project name
     * @param runId - ID of the run of that pipeline.
     * @param artifactName - Name of the artifact.
     * @param expand - Expand options. Default is None.
     */
    public async getArtifact(
        pipelineId: number,
        project: string,
        runId: number,
        artifactName: string,
        expand: Pipelines.GetArtifactExpandOptions
    ): Promise<Pipelines.Artifact> {

        const queryValues: any = {
            artifactName: artifactName,
            '$expand': expand
        };

        return this.beginRequest<Pipelines.Artifact>({
            apiVersion: "6.0-preview.1",
            method: "GET",
            routeTemplate: "{project}/_apis/pipelines/{pipelineId}/runs/{runId}/artifacts?artifactName={artifactName}",
            routeValues: {
                project: project,
                pipelineId: pipelineId,
                runId: runId,
                artifactName: artifactName
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a specific log from a pipeline run
     * @param logId - ID of the log.
     * @param pipelineId - ID of the pipeline.
     * @param project - Project ID or project name
     * @param runId - ID of the run of that pipeline.
     * @param expand - 	Expand options. Default is None.
     */
    public async getLog(
        logId: number,
        pipelineId: number,
        project: string,
        runId: number,
        expand?: Pipelines.GetLogExpandOptions
    ): Promise<Pipelines.Log> {

        const queryValues: any = {
            '$expand': expand
        };

        return this.beginRequest<Pipelines.Log>({
            apiVersion: "6.0-preview.1",
            method: "GET",
            routeTemplate: "{project}/_apis/pipelines/{pipelineId}/runs/{runId}/logs/{logId}",
            routeValues: {
                project: project,
                pipelineId: pipelineId,
                runId: runId,
                logId: logId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a list of logs from a pipeline run.
     * @param pipelineId - 	ID of the pipeline.
     * @param project - Project ID or project name
     * @param runId - ID of the run of that pipeline.
     * @param expand - Expand options. Default is None.
     */
    public async listLogs(
        pipelineId: number,
        project: string,
        runId: number,
        expand?: Pipelines.GetLogExpandOptions
    ): Promise<Pipelines.LogCollection> {

        const queryValues: any = {
            '$expand': expand
        };

        return this.beginRequest<Pipelines.LogCollection>({
            apiVersion: "6.0-preview.1",
            method: "GET",
            routeTemplate: "{project}/_apis/pipelines/{pipelineId}/runs/{runId}/logs",
            routeValues: {
                project: project,
                pipelineId: pipelineId,
                runId: runId
            },
            queryParams: queryValues
        });
    }

    /**
     * Create a pipeline.
     * @param createPipelineParameters - Parameters to create a pipeline.
     * @param project - Project ID or project name
     */
    public async createPipeline(
        createPipelineParameters: Pipelines.CreatePipelineParameters,
        project: string
    ): Promise<Pipelines.Pipeline> {

        return this.beginRequest<Pipelines.Pipeline>({
            apiVersion: "6.0-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/pipelines",
            routeValues: {
                project: project
            },
            body: createPipelineParameters
        });
    }

    /**
     * Gets a pipeline, optionally at the specified version
     * 
     * @param pipelineId - The pipeline ID
     * @param project -  Project ID or project name
     * @param pipelineVersion - The pipeline version
     */
    public async getPipeline(
        pipelineId: number,
        project: string,
        pipelineVersion?: number
    ): Promise<Pipelines.Pipeline> {

        const queryValues: any = {
            pipelineVersion: pipelineVersion
        };

        return this.beginRequest<Pipelines.Pipeline>({
            apiVersion: "6.0-preview.1",
            method: "GET",
            routeTemplate: "{project}/_apis/pipelines/{pipelineId}",
            routeValues: {
                project: project,
                pipelineId: pipelineId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a list of pipelines.
     * 
     * @param project - Project ID or project name
     * @param top - The maximum number of pipelines to return
     * @param continuationToken - A continuation token from a previous request, to retrieve the next page of results
     * @param orderBy - A sort expression. Defaults to "name asc"
     */
    public async listPipelines(
        project: string,
        top?: number,
        continuationToken?: string,
        orderBy?: string
    ): Promise<Pipelines.Pipeline[]> {

        const queryValues: any = {
            '$top': top,
            continuationToken: continuationToken,
            orderBy: orderBy
        };

        return this.beginRequest<Pipelines.Pipeline[]>({
            apiVersion: "6.0-preview.1",
            method: "GET",
            routeTemplate: "{project}/_apis/pipelines",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets a run for a particular pipeline.
     * 
     * @param pipelineId - The pipeline id
     * @param project - Project ID or project name
     * @param runId - The run id
     */
    public async getPipelineRun(
        pipelineId: number,
        project: string,
        runId: number
    ): Promise<Pipelines.Run> {
        return this.beginRequest<Pipelines.Run>({
            apiVersion: "6.0-preview.1",
            method: "GET",
            routeTemplate: "{project}/_apis/pipelines/{pipelineId}/runs/{runId}",
            routeValues: {
                project: project,
                pipelineId: pipelineId,
                runId: runId
            }
        });
    }

    /**
     * Gets top 10000 runs for a particular pipeline.
     * 
     * @param pipelineId - The pipeline id
     * @param project - Project ID or project name
     */
    public async listPipelineRuns(
        pipelineId: number,
        project: string
    ): Promise<Pipelines.Run[]> {

        return this.beginRequest<Pipelines.Run[]>({
            apiVersion: "6.0-preview.1",
            method: "GET",
            routeTemplate: "{project}/_apis/pipelines/{pipelineId}/runs",
            routeValues: {
                project: project,
                pipelineId: pipelineId
            }
        });
    }

    /**
     * Runs a pipeline.
     * 
     * @param runPipelineParameters - Settings which influence pipeline runs.
     * @param pipelineId - The pipeline ID.
     * @param project - Project ID or project name.
     * @param pipelineVersion - The pipeline version.
     */
    public async runPipeline(
        runPipelineParameters: Pipelines.RunPipelineParameters,
        pipelineId: number,
        project: string,
        pipelineVersion?: number
    ): Promise<Pipelines.Run> {

        const queryValues: any = {
            pipelineVersion
        };

        return this.beginRequest<Pipelines.Run>({
            apiVersion: "6.0-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/pipelines/{pipelineId}/runs",
            routeValues: {
                project: project,
                pipelineId: pipelineId
            },
            queryParams: queryValues,
            body: runPipelineParameters
        });
    }
}
