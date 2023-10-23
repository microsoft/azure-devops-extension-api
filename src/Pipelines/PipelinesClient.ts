/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as Pipelines from "../Pipelines/Pipelines";

export class PipelinesRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    /**
     * Get a specific artifact from a pipeline run
     * 
     * @param project - Project ID or project name
     * @param pipelineId - ID of the pipeline.
     * @param runId - ID of the run of that pipeline.
     * @param artifactName - Name of the artifact.
     * @param expand - Expand options. Default is None.
     */
    public async getArtifact(
        project: string,
        pipelineId: number,
        runId: number,
        artifactName: string,
        expand?: Pipelines.GetArtifactExpandOptions
        ): Promise<Pipelines.Artifact> {

        const queryValues: any = {
            artifactName: artifactName,
            '$expand': expand
        };

        return this.beginRequest<Pipelines.Artifact>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/pipelines/{pipelineId}/runs/{runId}/artifacts",
            routeValues: {
                project: project,
                pipelineId: pipelineId,
                runId: runId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a specific log from a pipeline run
     * 
     * @param project - Project ID or project name
     * @param pipelineId - ID of the pipeline.
     * @param runId - ID of the run of that pipeline.
     * @param logId - ID of the log.
     * @param expand - Expand options. Default is None.
     */
    public async getLog(
        project: string,
        pipelineId: number,
        runId: number,
        logId: number,
        expand?: Pipelines.GetLogExpandOptions
        ): Promise<Pipelines.Log> {

        const queryValues: any = {
            '$expand': expand
        };

        return this.beginRequest<Pipelines.Log>({
            apiVersion: "7.2-preview.1",
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
     * 
     * @param project - Project ID or project name
     * @param pipelineId - ID of the pipeline.
     * @param runId - ID of the run of that pipeline.
     * @param expand - Expand options. Default is None.
     */
    public async listLogs(
        project: string,
        pipelineId: number,
        runId: number,
        expand?: Pipelines.GetLogExpandOptions
        ): Promise<Pipelines.LogCollection> {

        const queryValues: any = {
            '$expand': expand
        };

        return this.beginRequest<Pipelines.LogCollection>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/pipelines/{pipelineId}/runs/{runId}/logs/{logId}",
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
     * 
     * @param inputParameters - Input parameters.
     * @param project - Project ID or project name
     */
    public async createPipeline(
        inputParameters: Pipelines.CreatePipelineParameters,
        project: string
        ): Promise<Pipelines.Pipeline> {

        return this.beginRequest<Pipelines.Pipeline>({
            apiVersion: "7.2-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/pipelines/{pipelineId}",
            routeValues: {
                project: project
            },
            body: inputParameters
        });
    }

    /**
     * Gets a pipeline, optionally at the specified version
     * 
     * @param project - Project ID or project name
     * @param pipelineId - The pipeline ID
     * @param pipelineVersion - The pipeline version
     */
    public async getPipeline(
        project: string,
        pipelineId: number,
        pipelineVersion?: number
        ): Promise<Pipelines.Pipeline> {

        const queryValues: any = {
            pipelineVersion: pipelineVersion
        };

        return this.beginRequest<Pipelines.Pipeline>({
            apiVersion: "7.2-preview.1",
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
     * @param orderBy - A sort expression. Defaults to "name asc"
     * @param top - The maximum number of pipelines to return
     * @param continuationToken - A continuation token from a previous request, to retrieve the next page of results
     */
    public async listPipelines(
        project: string,
        orderBy?: string,
        top?: number,
        continuationToken?: string
        ): Promise<Pipelines.Pipeline[]> {

        const queryValues: any = {
            orderBy: orderBy,
            '$top': top,
            continuationToken: continuationToken
        };

        return this.beginRequest<Pipelines.Pipeline[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/pipelines/{pipelineId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Queues a dry run of the pipeline and returns an object containing the final yaml.
     * 
     * @param runParameters - Optional additional parameters for this run.
     * @param project - Project ID or project name
     * @param pipelineId - The pipeline ID.
     * @param pipelineVersion - The pipeline version.
     */
    public async preview(
        runParameters: Pipelines.RunPipelineParameters,
        project: string,
        pipelineId: number,
        pipelineVersion?: number
        ): Promise<Pipelines.PreviewRun> {

        const queryValues: any = {
            pipelineVersion: pipelineVersion
        };

        return this.beginRequest<Pipelines.PreviewRun>({
            apiVersion: "7.2-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/pipelines/{pipelineId}/preview",
            routeValues: {
                project: project,
                pipelineId: pipelineId
            },
            queryParams: queryValues,
            body: runParameters
        });
    }

    /**
     * Gets a run for a particular pipeline.
     * 
     * @param project - Project ID or project name
     * @param pipelineId - The pipeline id
     * @param runId - The run id
     */
    public async getRun(
        project: string,
        pipelineId: number,
        runId: number
        ): Promise<Pipelines.Run> {

        return this.beginRequest<Pipelines.Run>({
            apiVersion: "7.2-preview.1",
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
     * @param project - Project ID or project name
     * @param pipelineId - The pipeline id
     */
    public async listRuns(
        project: string,
        pipelineId: number
        ): Promise<Pipelines.Run[]> {

        return this.beginRequest<Pipelines.Run[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/pipelines/{pipelineId}/runs/{runId}",
            routeValues: {
                project: project,
                pipelineId: pipelineId
            }
        });
    }

    /**
     * Runs a pipeline.
     * 
     * @param runParameters - Optional additional parameters for this run.
     * @param project - Project ID or project name
     * @param pipelineId - The pipeline ID.
     * @param pipelineVersion - The pipeline version.
     */
    public async runPipeline(
        runParameters: Pipelines.RunPipelineParameters,
        project: string,
        pipelineId: number,
        pipelineVersion?: number
        ): Promise<Pipelines.Run> {

        const queryValues: any = {
            pipelineVersion: pipelineVersion
        };

        return this.beginRequest<Pipelines.Run>({
            apiVersion: "7.2-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/pipelines/{pipelineId}/runs/{runId}",
            routeValues: {
                project: project,
                pipelineId: pipelineId
            },
            queryParams: queryValues,
            body: runParameters
        });
    }

}
