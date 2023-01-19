/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as ProjectAnalysis from "../ProjectAnalysis/ProjectAnalysis";

export class ProjectAnalysisRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "7658fa33-b1bf-4580-990f-fac5896773d3";

    /**
     * @param project - Project ID or project name
     */
    public async getProjectLanguageAnalytics(
        project: string
        ): Promise<ProjectAnalysis.ProjectLanguageAnalytics> {

        return this.beginRequest<ProjectAnalysis.ProjectLanguageAnalytics>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/projectanalysis/languagemetrics",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * @param project - Project ID or project name
     * @param fromDate - 
     * @param aggregationType - 
     */
    public async getProjectActivityMetrics(
        project: string,
        fromDate: Date,
        aggregationType: ProjectAnalysis.AggregationType
        ): Promise<ProjectAnalysis.ProjectActivityMetrics> {

        const queryValues: any = {
            fromDate: fromDate,
            aggregationType: aggregationType
        };

        return this.beginRequest<ProjectAnalysis.ProjectActivityMetrics>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/projectanalysis/projectactivitymetrics",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Retrieves git activity metrics for repositories matching a specified criteria.
     * 
     * @param project - Project ID or project name
     * @param fromDate - Date from which, the trends are to be fetched.
     * @param aggregationType - Bucket size on which, trends are to be aggregated.
     * @param skip - The number of repositories to ignore.
     * @param top - The number of repositories for which activity metrics are to be retrieved.
     */
    public async getGitRepositoriesActivityMetrics(
        project: string,
        fromDate: Date,
        aggregationType: ProjectAnalysis.AggregationType,
        skip: number,
        top: number
        ): Promise<ProjectAnalysis.RepositoryActivityMetrics[]> {

        const queryValues: any = {
            fromDate: fromDate,
            aggregationType: aggregationType,
            '$skip': skip,
            '$top': top
        };

        return this.beginRequest<ProjectAnalysis.RepositoryActivityMetrics[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/projectanalysis/repositoryactivitymetrics/{repositoryId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     * @param repositoryId - 
     * @param fromDate - 
     * @param aggregationType - 
     */
    public async getRepositoryActivityMetrics(
        project: string,
        repositoryId: string,
        fromDate: Date,
        aggregationType: ProjectAnalysis.AggregationType
        ): Promise<ProjectAnalysis.RepositoryActivityMetrics> {

        const queryValues: any = {
            fromDate: fromDate,
            aggregationType: aggregationType
        };

        return this.beginRequest<ProjectAnalysis.RepositoryActivityMetrics>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/projectanalysis/repositoryactivitymetrics/{repositoryId}",
            routeValues: {
                project: project,
                repositoryId: repositoryId
            },
            queryParams: queryValues
        });
    }

}
