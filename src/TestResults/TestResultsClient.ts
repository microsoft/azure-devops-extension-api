/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import { deserializeVssJsonObject } from "../Common/Util/Serialization";

import * as Test from "../Test/Test";

export class TestResultsRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "c83eaf52-edf3-4034-ae11-17d38f25404c";

    /**
     * @param attachmentRequestModel - 
     * @param project - Project ID or project name
     * @param runId - 
     * @param testCaseResultId - 
     * @param iterationId - 
     * @param actionPath - 
     */
    public async createTestIterationResultAttachment(
        attachmentRequestModel: Test.TestAttachmentRequestModel,
        project: string,
        runId: number,
        testCaseResultId: number,
        iterationId: number,
        actionPath?: string
        ): Promise<Test.TestAttachmentReference> {

        const queryValues: any = {
            iterationId: iterationId,
            actionPath: actionPath
        };

        return this.beginRequest<Test.TestAttachmentReference>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{testCaseResultId}/attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId,
                testCaseResultId: testCaseResultId
            },
            queryParams: queryValues,
            body: attachmentRequestModel
        });
    }

    /**
     * @param attachmentRequestModel - 
     * @param project - Project ID or project name
     * @param runId - 
     * @param testCaseResultId - 
     */
    public async createTestResultAttachment(
        attachmentRequestModel: Test.TestAttachmentRequestModel,
        project: string,
        runId: number,
        testCaseResultId: number
        ): Promise<Test.TestAttachmentReference> {

        return this.beginRequest<Test.TestAttachmentReference>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{testCaseResultId}/attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId,
                testCaseResultId: testCaseResultId
            },
            body: attachmentRequestModel
        });
    }

    /**
     * @param attachmentRequestModel - 
     * @param project - Project ID or project name
     * @param runId - 
     * @param testCaseResultId - 
     * @param testSubResultId - 
     */
    public async createTestSubResultAttachment(
        attachmentRequestModel: Test.TestAttachmentRequestModel,
        project: string,
        runId: number,
        testCaseResultId: number,
        testSubResultId: number
        ): Promise<Test.TestAttachmentReference> {

        const queryValues: any = {
            testSubResultId: testSubResultId
        };

        return this.beginRequest<Test.TestAttachmentReference>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{testCaseResultId}/attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId,
                testCaseResultId: testCaseResultId
            },
            queryParams: queryValues,
            body: attachmentRequestModel
        });
    }

    /**
     * @param project - Project ID or project name
     * @param runId - 
     * @param testCaseResultId - 
     * @param attachmentId - 
     */
    public async deleteTestResultAttachment(
        project: string,
        runId: number,
        testCaseResultId: number,
        attachmentId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{testCaseResultId}/attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId,
                testCaseResultId: testCaseResultId,
                attachmentId: attachmentId
            }
        });
    }

    /**
     * Returns a test iteration attachment
     * 
     * @param project - Project ID or project name
     * @param runId - 
     * @param testCaseResultId - 
     * @param attachmentId - 
     * @param iterationId - 
     */
    public async getTestIterationAttachmentContent(
        project: string,
        runId: number,
        testCaseResultId: number,
        attachmentId: number,
        iterationId: number
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            iterationId: iterationId
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{testCaseResultId}/attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId,
                testCaseResultId: testCaseResultId,
                attachmentId: attachmentId
            },
            queryParams: queryValues
        });
    }

    /**
     * Returns a test iteration attachment
     * 
     * @param project - Project ID or project name
     * @param runId - 
     * @param testCaseResultId - 
     * @param attachmentId - 
     * @param iterationId - 
     */
    public async getTestIterationAttachmentZip(
        project: string,
        runId: number,
        testCaseResultId: number,
        attachmentId: number,
        iterationId: number
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            iterationId: iterationId
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/zip",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{testCaseResultId}/attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId,
                testCaseResultId: testCaseResultId,
                attachmentId: attachmentId
            },
            queryParams: queryValues
        });
    }

    /**
     * Returns a test result attachment
     * 
     * @param project - Project ID or project name
     * @param runId - 
     * @param testCaseResultId - 
     * @param attachmentId - 
     */
    public async getTestResultAttachmentContent(
        project: string,
        runId: number,
        testCaseResultId: number,
        attachmentId: number
        ): Promise<ArrayBuffer> {

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{testCaseResultId}/attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId,
                testCaseResultId: testCaseResultId,
                attachmentId: attachmentId
            }
        });
    }

    /**
     * @param project - Project ID or project name
     * @param runId - 
     * @param testCaseResultId - 
     */
    public async getTestResultAttachments(
        project: string,
        runId: number,
        testCaseResultId: number
        ): Promise<Test.TestAttachment[]> {

        return this.beginRequest<Test.TestAttachment[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{testCaseResultId}/attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId,
                testCaseResultId: testCaseResultId
            }
        });
    }

    /**
     * Returns a test result attachment
     * 
     * @param project - Project ID or project name
     * @param runId - 
     * @param testCaseResultId - 
     * @param attachmentId - 
     */
    public async getTestResultAttachmentZip(
        project: string,
        runId: number,
        testCaseResultId: number,
        attachmentId: number
        ): Promise<ArrayBuffer> {

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/zip",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{testCaseResultId}/attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId,
                testCaseResultId: testCaseResultId,
                attachmentId: attachmentId
            }
        });
    }

    /**
     * Returns a test sub result attachment
     * 
     * @param project - Project ID or project name
     * @param runId - 
     * @param testCaseResultId - 
     * @param attachmentId - 
     * @param testSubResultId - 
     */
    public async getTestSubResultAttachmentContent(
        project: string,
        runId: number,
        testCaseResultId: number,
        attachmentId: number,
        testSubResultId: number
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            testSubResultId: testSubResultId
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{testCaseResultId}/attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId,
                testCaseResultId: testCaseResultId,
                attachmentId: attachmentId
            },
            queryParams: queryValues
        });
    }

    /**
     * Returns attachment references for test sub result.
     * 
     * @param project - Project ID or project name
     * @param runId - 
     * @param testCaseResultId - 
     * @param testSubResultId - 
     */
    public async getTestSubResultAttachments(
        project: string,
        runId: number,
        testCaseResultId: number,
        testSubResultId: number
        ): Promise<Test.TestAttachment[]> {

        const queryValues: any = {
            testSubResultId: testSubResultId
        };

        return this.beginRequest<Test.TestAttachment[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{testCaseResultId}/attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId,
                testCaseResultId: testCaseResultId
            },
            queryParams: queryValues
        });
    }

    /**
     * Returns a test sub result attachment
     * 
     * @param project - Project ID or project name
     * @param runId - 
     * @param testCaseResultId - 
     * @param attachmentId - 
     * @param testSubResultId - 
     */
    public async getTestSubResultAttachmentZip(
        project: string,
        runId: number,
        testCaseResultId: number,
        attachmentId: number,
        testSubResultId: number
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            testSubResultId: testSubResultId
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/zip",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{testCaseResultId}/attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId,
                testCaseResultId: testCaseResultId,
                attachmentId: attachmentId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param attachmentRequestModel - 
     * @param project - Project ID or project name
     * @param runId - 
     */
    public async createTestRunAttachment(
        attachmentRequestModel: Test.TestAttachmentRequestModel,
        project: string,
        runId: number
        ): Promise<Test.TestAttachmentReference> {

        return this.beginRequest<Test.TestAttachmentReference>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId
            },
            body: attachmentRequestModel
        });
    }

    /**
     * @param project - Project ID or project name
     * @param runId - 
     * @param attachmentId - 
     */
    public async deleteTestRunAttachment(
        project: string,
        runId: number,
        attachmentId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId,
                attachmentId: attachmentId
            }
        });
    }

    /**
     * Returns a test run attachment
     * 
     * @param project - Project ID or project name
     * @param runId - 
     * @param attachmentId - 
     */
    public async getTestRunAttachmentContent(
        project: string,
        runId: number,
        attachmentId: number
        ): Promise<ArrayBuffer> {

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId,
                attachmentId: attachmentId
            }
        });
    }

    /**
     * @param project - Project ID or project name
     * @param runId - 
     */
    public async getTestRunAttachments(
        project: string,
        runId: number
        ): Promise<Test.TestAttachment[]> {

        return this.beginRequest<Test.TestAttachment[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId
            }
        });
    }

    /**
     * Returns a test run attachment
     * 
     * @param project - Project ID or project name
     * @param runId - 
     * @param attachmentId - 
     */
    public async getTestRunAttachmentZip(
        project: string,
        runId: number,
        attachmentId: number
        ): Promise<ArrayBuffer> {

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/zip",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId,
                attachmentId: attachmentId
            }
        });
    }

    /**
     * @param project - Project ID or project name
     * @param runId - 
     * @param testCaseResultId - 
     */
    public async getBugsLinkedToTestResult(
        project: string,
        runId: number,
        testCaseResultId: number
        ): Promise<Test.WorkItemReference[]> {

        return this.beginRequest<Test.WorkItemReference[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{testCaseResultId}/bugs",
            routeValues: {
                project: project,
                runId: runId,
                testCaseResultId: testCaseResultId
            }
        });
    }

    /**
     * @param project - Project ID or project name
     * @param buildId - 
     * @param flags - 
     */
    public async getBuildCodeCoverage(
        project: string,
        buildId: number,
        flags: number
        ): Promise<Test.BuildCoverage[]> {

        const queryValues: any = {
            buildId: buildId,
            flags: flags
        };

        return this.beginRequest<Test.BuildCoverage[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/codecoverage",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     * @param buildId - 
     * @param deltaBuildId - 
     */
    public async getCodeCoverageSummary(
        project: string,
        buildId: number,
        deltaBuildId?: number
        ): Promise<Test.CodeCoverageSummary> {

        const queryValues: any = {
            buildId: buildId,
            deltaBuildId: deltaBuildId
        };

        return this.beginRequest<Test.CodeCoverageSummary>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/codecoverage",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * http://(tfsserver):8080/tfs/DefaultCollection/_apis/test/CodeCoverage?buildId=10 Request: Json of code coverage summary
     * 
     * @param project - Project ID or project name
     * @param buildId - 
     * @param coverageData - 
     */
    public async updateCodeCoverageSummary(
        project: string,
        buildId: number,
        coverageData?: Test.CodeCoverageData
        ): Promise<void> {

        const queryValues: any = {
            buildId: buildId
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/codecoverage",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            body: coverageData
        });
    }

    /**
     * @param project - Project ID or project name
     * @param runId - 
     * @param flags - 
     */
    public async getTestRunCodeCoverage(
        project: string,
        runId: number,
        flags: number
        ): Promise<Test.TestRunCoverage[]> {

        const queryValues: any = {
            flags: flags
        };

        return this.beginRequest<Test.TestRunCoverage[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/codecoverage",
            routeValues: {
                project: project,
                runId: runId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get file coverage for the specified file
     * 
     * @param fileCoverageRequest - File details with pull request iteration context
     * @param project - Project ID or project name
     */
    public async getFileLevelCodeCoverage(
        fileCoverageRequest: Test.FileCoverageRequest,
        project: string
        ): Promise<string> {

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            httpResponseType: "text/plain",
            routeTemplate: "{project}/_apis/testresults/codecoverage/filecoverage",
            routeValues: {
                project: project
            },
            body: fileCoverageRequest
        });
    }

    /**
     * @param filter - 
     * @param project - Project ID or project name
     */
    public async queryTestResultHistory(
        filter: Test.ResultsFilter,
        project: string
        ): Promise<Test.TestResultHistory> {

        return this.beginRequest<Test.TestResultHistory>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/results/History",
            routeValues: {
                project: project
            },
            body: filter
        });
    }

    /**
     * Get test run message logs
     * 
     * @param project - Project ID or project name
     * @param runId - ID of the run to get.
     */
    public async getTestRunMessageLogs(
        project: string,
        runId: number
        ): Promise<Test.TestMessageLogDetails[]> {

        return this.beginRequest<Test.TestMessageLogDetails[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/MessageLogs",
            routeValues: {
                project: project,
                runId: runId
            }
        });
    }

    /**
     * Get summary of test results.
     * 
     * @param project - Project ID or project name
     * @param pipelineId - Pipeline Id. This is same as build Id.
     * @param stageName - Name of the stage. Maximum supported length for name is 256 character.
     * @param phaseName - Name of the phase. Maximum supported length for name is 256 character.
     * @param jobName - Matrixing in YAML generates copies of a job with different inputs in matrix. JobName is the name of those input. Maximum supported length for name is 256 character.
     * @param metricNames - 
     * @param groupByNode - Group summary for each node of the pipleine heirarchy
     */
    public async getTestPipelineMetrics(
        project: string,
        pipelineId: number,
        stageName?: string,
        phaseName?: string,
        jobName?: string,
        metricNames?: Test.Metrics[],
        groupByNode?: boolean
        ): Promise<Test.PipelineTestMetrics> {

        const queryValues: any = {
            pipelineId: pipelineId,
            stageName: stageName,
            phaseName: phaseName,
            jobName: jobName,
            metricNames: metricNames && metricNames.join(","),
            groupByNode: groupByNode
        };

        return this.beginRequest<Test.PipelineTestMetrics>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/metrics",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     * @param buildId - 
     * @param publishContext - 
     * @param groupBy - 
     * @param filter - 
     * @param orderby - 
     * @param shouldIncludeResults - 
     * @param queryRunSummaryForInProgress - 
     */
    public async getTestResultDetailsForBuild(
        project: string,
        buildId: number,
        publishContext?: string,
        groupBy?: string,
        filter?: string,
        orderby?: string,
        shouldIncludeResults?: boolean,
        queryRunSummaryForInProgress?: boolean
        ): Promise<Test.TestResultsDetails> {

        const queryValues: any = {
            buildId: buildId,
            publishContext: publishContext,
            groupBy: groupBy,
            '$filter': filter,
            '$orderby': orderby,
            shouldIncludeResults: shouldIncludeResults,
            queryRunSummaryForInProgress: queryRunSummaryForInProgress
        };

        return this.beginRequest<Test.TestResultsDetails>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/resultdetailsbybuild",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     * @param releaseId - 
     * @param releaseEnvId - 
     * @param publishContext - 
     * @param groupBy - 
     * @param filter - 
     * @param orderby - 
     * @param shouldIncludeResults - 
     * @param queryRunSummaryForInProgress - 
     */
    public async getTestResultDetailsForRelease(
        project: string,
        releaseId: number,
        releaseEnvId: number,
        publishContext?: string,
        groupBy?: string,
        filter?: string,
        orderby?: string,
        shouldIncludeResults?: boolean,
        queryRunSummaryForInProgress?: boolean
        ): Promise<Test.TestResultsDetails> {

        const queryValues: any = {
            releaseId: releaseId,
            releaseEnvId: releaseEnvId,
            publishContext: publishContext,
            groupBy: groupBy,
            '$filter': filter,
            '$orderby': orderby,
            shouldIncludeResults: shouldIncludeResults,
            queryRunSummaryForInProgress: queryRunSummaryForInProgress
        };

        return this.beginRequest<Test.TestResultsDetails>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/resultdetailsbyrelease",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * @param document - 
     * @param project - Project ID or project name
     * @param runId - 
     */
    public async publishTestResultDocument(
        document: Test.TestResultDocument,
        project: string,
        runId: number
        ): Promise<Test.TestResultDocument> {

        return this.beginRequest<Test.TestResultDocument>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/ResultDocument",
            routeValues: {
                project: project,
                runId: runId
            },
            body: document
        });
    }

    /**
     * @param project - Project ID or project name
     * @param buildId - 
     * @param publishContext - 
     * @param fields - 
     * @param continuationToken - 
     */
    public async getResultGroupsByBuild(
        project: string,
        buildId: number,
        publishContext: string,
        fields?: string[],
        continuationToken?: string
        ): Promise<Test.FieldDetailsForTestResults[]> {

        const queryValues: any = {
            buildId: buildId,
            publishContext: publishContext,
            fields: fields && fields.join(","),
            continuationToken: continuationToken
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/resultgroupsbybuild",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <Test.FieldDetailsForTestResults[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * @param project - Project ID or project name
     * @param releaseId - 
     * @param publishContext - 
     * @param releaseEnvId - 
     * @param fields - 
     * @param continuationToken - 
     */
    public async getResultGroupsByRelease(
        project: string,
        releaseId: number,
        publishContext: string,
        releaseEnvId?: number,
        fields?: string[],
        continuationToken?: string
        ): Promise<Test.FieldDetailsForTestResults[]> {

        const queryValues: any = {
            releaseId: releaseId,
            publishContext: publishContext,
            releaseEnvId: releaseEnvId,
            fields: fields && fields.join(","),
            continuationToken: continuationToken
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/resultgroupsbyrelease",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <Test.FieldDetailsForTestResults[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Get list of test Result meta data details for corresponding testcasereferenceId
     * 
     * @param testCaseReferenceIds - TestCaseReference Ids of the test Result to be queried, comma separated list of valid ids (limit no. of ids 200).
     * @param project - Project ID or project name
     * @param detailsToInclude - Details to include with test results metadata. Default is None. Other values are FlakyIdentifiers.
     */
    public async queryTestResultsMetaData(
        testCaseReferenceIds: string[],
        project: string,
        detailsToInclude?: Test.ResultMetaDataDetails
        ): Promise<Test.TestResultMetaData[]> {

        const queryValues: any = {
            detailsToInclude: detailsToInclude
        };

        return this.beginRequest<Test.TestResultMetaData[]>({
            apiVersion: "7.1-preview.4",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/results/ResultMetaData/{testCaseReferenceId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            body: testCaseReferenceIds
        });
    }

    /**
     * Update properties of test result meta data
     * 
     * @param testResultMetaDataUpdateInput - TestResultMetaData update input TestResultMetaDataUpdateInput
     * @param project - Project ID or project name
     * @param testCaseReferenceId - TestCaseReference Id of Test Result to be updated.
     */
    public async updateTestResultsMetaData(
        testResultMetaDataUpdateInput: Test.TestResultMetaDataUpdateInput,
        project: string,
        testCaseReferenceId: number
        ): Promise<Test.TestResultMetaData> {

        return this.beginRequest<Test.TestResultMetaData>({
            apiVersion: "7.1-preview.4",
            method: "PATCH",
            routeTemplate: "{project}/_apis/testresults/results/ResultMetaData/{testCaseReferenceId}",
            routeValues: {
                project: project,
                testCaseReferenceId: testCaseReferenceId
            },
            body: testResultMetaDataUpdateInput
        });
    }

    /**
     * @param query - 
     * @param project - Project ID or project name
     */
    public async getTestResultsByQuery(
        query: Test.TestResultsQuery,
        project: string
        ): Promise<Test.TestResultsQuery> {

        return this.beginRequest<Test.TestResultsQuery>({
            apiVersion: "7.1-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/results",
            routeValues: {
                project: project
            },
            body: query
        });
    }

    /**
     * @param queryModel - 
     * @param project - Project ID or project name
     * @param includeResultDetails - 
     * @param includeIterationDetails - 
     * @param skip - 
     * @param top - 
     */
    public async getTestResultsByQueryWiql(
        queryModel: Test.QueryModel,
        project: string,
        includeResultDetails?: boolean,
        includeIterationDetails?: boolean,
        skip?: number,
        top?: number
        ): Promise<Test.TestCaseResult[]> {

        const queryValues: any = {
            includeResultDetails: includeResultDetails,
            includeIterationDetails: includeIterationDetails,
            '$skip': skip,
            '$top': top
        };

        return this.beginRequest<Test.TestCaseResult[]>({
            apiVersion: "7.1-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/results/query",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            body: queryModel
        });
    }

    /**
     * @param results - 
     * @param project - Project ID or project name
     * @param runId - 
     */
    public async addTestResultsToTestRun(
        results: Test.TestCaseResult[],
        project: string,
        runId: number
        ): Promise<Test.TestCaseResult[]> {

        return this.beginRequest<Test.TestCaseResult[]>({
            apiVersion: "7.1-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{testResultId}",
            routeValues: {
                project: project,
                runId: runId
            },
            body: results
        });
    }

    /**
     * @param project - Project ID or project name
     * @param runId - 
     * @param testResultId - 
     * @param detailsToInclude - 
     */
    public async getTestResultById(
        project: string,
        runId: number,
        testResultId: number,
        detailsToInclude?: Test.ResultDetails
        ): Promise<Test.TestCaseResult> {

        const queryValues: any = {
            detailsToInclude: detailsToInclude
        };

        return this.beginRequest<Test.TestCaseResult>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{testResultId}",
            routeValues: {
                project: project,
                runId: runId,
                testResultId: testResultId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     * @param runId - 
     * @param detailsToInclude - 
     * @param skip - 
     * @param top - 
     * @param outcomes - 
     * @param newTestsOnly - 
     */
    public async getTestResults(
        project: string,
        runId: number,
        detailsToInclude?: Test.ResultDetails,
        skip?: number,
        top?: number,
        outcomes?: Test.TestOutcome[],
        newTestsOnly?: boolean
        ): Promise<Test.TestCaseResult[]> {

        const queryValues: any = {
            detailsToInclude: detailsToInclude,
            '$skip': skip,
            '$top': top,
            outcomes: outcomes && outcomes.join(","),
            '$newTestsOnly': newTestsOnly
        };

        return this.beginRequest<Test.TestCaseResult[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{testResultId}",
            routeValues: {
                project: project,
                runId: runId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param results - 
     * @param project - Project ID or project name
     * @param runId - 
     */
    public async updateTestResults(
        results: Test.TestCaseResult[],
        project: string,
        runId: number
        ): Promise<Test.TestCaseResult[]> {

        return this.beginRequest<Test.TestCaseResult[]>({
            apiVersion: "7.1-preview.2",
            method: "PATCH",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{testResultId}",
            routeValues: {
                project: project,
                runId: runId
            },
            body: results
        });
    }

    /**
     * @param project - Project ID or project name
     * @param buildId - 
     * @param publishContext - 
     * @param outcomes - 
     * @param top - 
     * @param continuationToken - 
     */
    public async getTestResultsByBuild(
        project: string,
        buildId: number,
        publishContext?: string,
        outcomes?: Test.TestOutcome[],
        top?: number,
        continuationToken?: string
        ): Promise<Test.ShallowTestCaseResult[]> {

        const queryValues: any = {
            buildId: buildId,
            publishContext: publishContext,
            outcomes: outcomes && outcomes.join(","),
            '$top': top,
            continuationToken: continuationToken
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/resultsbybuild",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <Test.ShallowTestCaseResult[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Get a list of results.
     * 
     * @param project - Project ID or project name
     * @param pipelineId - Pipeline Id. This is same as build Id.
     * @param stageName - Name of the stage. Maximum supported length for name is 256 character.
     * @param phaseName - Name of the phase. Maximum supported length for name is 256 character.
     * @param jobName - Matrixing in YAML generates copies of a job with different inputs in matrix. JobName is the name of those input. Maximum supported length for name is 256 character.
     * @param outcomes - List of outcome of results
     * @param top - Maximum number of results to return
     * @param continuationToken - Header to pass the continuationToken
     */
    public async getTestResultsByPipeline(
        project: string,
        pipelineId: number,
        stageName?: string,
        phaseName?: string,
        jobName?: string,
        outcomes?: Test.TestOutcome[],
        top?: number,
        continuationToken?: String
        ): Promise<Test.ShallowTestCaseResult[]> {

        const queryValues: any = {
            pipelineId: pipelineId,
            stageName: stageName,
            phaseName: phaseName,
            jobName: jobName,
            outcomes: outcomes && outcomes.join(","),
            '$top': top
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/resultsbypipeline",
            routeValues: {
                project: project
            },
            customHeaders: {
                "x-ms-continuationtoken": continuationToken,
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <Test.ShallowTestCaseResult[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * @param project - Project ID or project name
     * @param releaseId - 
     * @param releaseEnvid - 
     * @param publishContext - 
     * @param outcomes - 
     * @param top - 
     * @param continuationToken - 
     */
    public async getTestResultsByRelease(
        project: string,
        releaseId: number,
        releaseEnvid?: number,
        publishContext?: string,
        outcomes?: Test.TestOutcome[],
        top?: number,
        continuationToken?: string
        ): Promise<Test.ShallowTestCaseResult[]> {

        const queryValues: any = {
            releaseId: releaseId,
            releaseEnvid: releaseEnvid,
            publishContext: publishContext,
            outcomes: outcomes && outcomes.join(","),
            '$top': top,
            continuationToken: continuationToken
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/resultsbyrelease",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <Test.ShallowTestCaseResult[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Get all the available groups details and for these groups get failed and aborted results.
     * 
     * @param project - Project ID or project name
     * @param pipelineId - Pipeline Id. This is same as build Id.
     * @param stageName - Name of the stage. Maximum supported length for name is 256 character.
     * @param phaseName - Name of the phase. Maximum supported length for name is 256 character.
     * @param jobName - Matrixing in YAML generates copies of a job with different inputs in matrix. JobName is the name of those input. Maximum supported length for name is 256 character.
     * @param shouldIncludeFailedAndAbortedResults - If true, it will return Ids of failed and aborted results for each test group
     * @param queryGroupSummaryForInProgress - If true, it will calculate summary for InProgress runs as well.
     */
    public async testResultsGroupDetails(
        project: string,
        pipelineId: number,
        stageName?: string,
        phaseName?: string,
        jobName?: string,
        shouldIncludeFailedAndAbortedResults?: boolean,
        queryGroupSummaryForInProgress?: boolean
        ): Promise<Test.TestResultsDetails> {

        const queryValues: any = {
            pipelineId: pipelineId,
            stageName: stageName,
            phaseName: phaseName,
            jobName: jobName,
            shouldIncludeFailedAndAbortedResults: shouldIncludeFailedAndAbortedResults,
            queryGroupSummaryForInProgress: queryGroupSummaryForInProgress
        };

        return this.beginRequest<Test.TestResultsDetails>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/resultsgroupDetails",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     * @param buildId - 
     * @param publishContext - 
     * @param includeFailureDetails - 
     * @param buildToCompare - 
     */
    public async queryTestResultsReportForBuild(
        project: string,
        buildId: number,
        publishContext?: string,
        includeFailureDetails?: boolean,
        buildToCompare?: Test.BuildReference
        ): Promise<Test.TestResultSummary> {

        const queryValues: any = {
            buildId: buildId,
            publishContext: publishContext,
            includeFailureDetails: includeFailureDetails,
            buildToCompare: buildToCompare
        };

        return this.beginRequest<Test.TestResultSummary>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/resultsummarybybuild",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Get summary of test results.
     * 
     * @param project - Project ID or project name
     * @param pipelineId - Pipeline Id. This is same as build Id.
     * @param stageName - Name of the stage. Maximum supported length for name is 256 character.
     * @param phaseName - Name of the phase. Maximum supported length for name is 256 character.
     * @param jobName - Matrixing in YAML generates copies of a job with different inputs in matrix. JobName is the name of those input. Maximum supported length for name is 256 character.
     * @param includeFailureDetails - If true returns failure insights
     */
    public async queryTestResultsReportForPipeline(
        project: string,
        pipelineId: number,
        stageName?: string,
        phaseName?: string,
        jobName?: string,
        includeFailureDetails?: boolean
        ): Promise<Test.TestResultSummary> {

        const queryValues: any = {
            pipelineId: pipelineId,
            stageName: stageName,
            phaseName: phaseName,
            jobName: jobName,
            includeFailureDetails: includeFailureDetails
        };

        return this.beginRequest<Test.TestResultSummary>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/resultsummarybypipeline",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     * @param releaseId - 
     * @param releaseEnvId - 
     * @param publishContext - 
     * @param includeFailureDetails - 
     * @param releaseToCompare - 
     */
    public async queryTestResultsReportForRelease(
        project: string,
        releaseId: number,
        releaseEnvId: number,
        publishContext?: string,
        includeFailureDetails?: boolean,
        releaseToCompare?: Test.ReleaseReference
        ): Promise<Test.TestResultSummary> {

        const queryValues: any = {
            releaseId: releaseId,
            releaseEnvId: releaseEnvId,
            publishContext: publishContext,
            includeFailureDetails: includeFailureDetails,
            releaseToCompare: releaseToCompare
        };

        return this.beginRequest<Test.TestResultSummary>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/resultsummarybyrelease",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * @param releases - 
     * @param project - Project ID or project name
     */
    public async queryTestResultsSummaryForReleases(
        releases: Test.ReleaseReference[],
        project: string
        ): Promise<Test.TestResultSummary[]> {

        return this.beginRequest<Test.TestResultSummary[]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/resultsummarybyrelease",
            routeValues: {
                project: project
            },
            body: releases
        });
    }

    /**
     * @param resultsContext - 
     * @param project - Project ID or project name
     * @param workItemIds - 
     */
    public async queryTestSummaryByRequirement(
        resultsContext: Test.TestResultsContext,
        project: string,
        workItemIds?: number[]
        ): Promise<Test.TestSummaryForWorkItem[]> {

        const queryValues: any = {
            workItemIds: workItemIds && workItemIds.join(",")
        };

        return this.beginRequest<Test.TestSummaryForWorkItem[]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/resultsummarybyrequirement",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            body: resultsContext
        });
    }

    /**
     * @param filter - 
     * @param project - Project ID or project name
     */
    public async queryResultTrendForBuild(
        filter: Test.TestResultTrendFilter,
        project: string
        ): Promise<Test.AggregatedDataForResultTrend[]> {

        return this.beginRequest<Test.AggregatedDataForResultTrend[]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/ResultTrendByBuild",
            routeValues: {
                project: project
            },
            body: filter
        });
    }

    /**
     * @param filter - 
     * @param project - Project ID or project name
     */
    public async queryResultTrendForRelease(
        filter: Test.TestResultTrendFilter,
        project: string
        ): Promise<Test.AggregatedDataForResultTrend[]> {

        return this.beginRequest<Test.AggregatedDataForResultTrend[]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/ResultTrendByRelease",
            routeValues: {
                project: project
            },
            body: filter
        });
    }

    /**
     * @param testRun - 
     * @param project - Project ID or project name
     */
    public async createTestRun(
        testRun: Test.RunCreateModel,
        project: string
        ): Promise<Test.TestRun> {

        return this.beginRequest<Test.TestRun>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}",
            routeValues: {
                project: project
            },
            body: testRun
        });
    }

    /**
     * @param project - Project ID or project name
     * @param runId - 
     */
    public async deleteTestRun(
        project: string,
        runId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}",
            routeValues: {
                project: project,
                runId: runId
            }
        });
    }

    /**
     * @param project - Project ID or project name
     * @param runId - 
     * @param includeDetails - 
     * @param includeTags - 
     */
    public async getTestRunById(
        project: string,
        runId: number,
        includeDetails?: boolean,
        includeTags?: boolean
        ): Promise<Test.TestRun> {

        const queryValues: any = {
            includeDetails: includeDetails,
            includeTags: includeTags
        };

        return this.beginRequest<Test.TestRun>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}",
            routeValues: {
                project: project,
                runId: runId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     * @param buildUri - 
     * @param owner - 
     * @param tmiRunId - 
     * @param planId - 
     * @param includeRunDetails - 
     * @param automated - 
     * @param skip - 
     * @param top - 
     */
    public async getTestRuns(
        project: string,
        buildUri?: string,
        owner?: string,
        tmiRunId?: string,
        planId?: number,
        includeRunDetails?: boolean,
        automated?: boolean,
        skip?: number,
        top?: number
        ): Promise<Test.TestRun[]> {

        const queryValues: any = {
            buildUri: buildUri,
            owner: owner,
            tmiRunId: tmiRunId,
            planId: planId,
            includeRunDetails: includeRunDetails,
            automated: automated,
            '$skip': skip,
            '$top': top
        };

        return this.beginRequest<Test.TestRun[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Query Test Runs based on filters. Mandatory fields are minLastUpdatedDate and maxLastUpdatedDate.
     * 
     * @param project - Project ID or project name
     * @param minLastUpdatedDate - Minimum Last Modified Date of run to be queried (Mandatory).
     * @param maxLastUpdatedDate - Maximum Last Modified Date of run to be queried (Mandatory, difference between min and max date can be atmost 7 days).
     * @param state - Current state of the Runs to be queried.
     * @param planIds - Plan Ids of the Runs to be queried, comma separated list of valid ids.
     * @param isAutomated - Automation type of the Runs to be queried.
     * @param publishContext - PublishContext of the Runs to be queried.
     * @param buildIds - Build Ids of the Runs to be queried, comma separated list of valid ids.
     * @param buildDefIds - Build Definition Ids of the Runs to be queried, comma separated list of valid ids.
     * @param branchName - Source Branch name of the Runs to be queried.
     * @param releaseIds - Release Ids of the Runs to be queried, comma separated list of valid ids.
     * @param releaseDefIds - Release Definition Ids of the Runs to be queried, comma separated list of valid ids.
     * @param releaseEnvIds - Release Environment Ids of the Runs to be queried, comma separated list of valid ids.
     * @param releaseEnvDefIds - Release Environment Definition Ids of the Runs to be queried, comma separated list of valid ids.
     * @param runTitle - Run Title of the Runs to be queried.
     * @param top - Number of runs to be queried. Limit is 100
     * @param continuationToken - continuationToken received from previous batch or null for first batch. It is not supposed to be created (or altered, if received from last batch) by user.
     */
    public async queryTestRuns(
        project: string,
        minLastUpdatedDate: Date,
        maxLastUpdatedDate: Date,
        state?: Test.TestRunState,
        planIds?: number[],
        isAutomated?: boolean,
        publishContext?: Test.TestRunPublishContext,
        buildIds?: number[],
        buildDefIds?: number[],
        branchName?: string,
        releaseIds?: number[],
        releaseDefIds?: number[],
        releaseEnvIds?: number[],
        releaseEnvDefIds?: number[],
        runTitle?: string,
        top?: number,
        continuationToken?: string
        ): Promise<Test.TestRun[]> {

        const queryValues: any = {
            minLastUpdatedDate: minLastUpdatedDate,
            maxLastUpdatedDate: maxLastUpdatedDate,
            state: state,
            planIds: planIds && planIds.join(","),
            isAutomated: isAutomated,
            publishContext: publishContext,
            buildIds: buildIds && buildIds.join(","),
            buildDefIds: buildDefIds && buildDefIds.join(","),
            branchName: branchName,
            releaseIds: releaseIds && releaseIds.join(","),
            releaseDefIds: releaseDefIds && releaseDefIds.join(","),
            releaseEnvIds: releaseEnvIds && releaseEnvIds.join(","),
            releaseEnvDefIds: releaseEnvDefIds && releaseEnvDefIds.join(","),
            runTitle: runTitle,
            '$top': top,
            continuationToken: continuationToken
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <Test.TestRun[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * @param runUpdateModel - 
     * @param project - Project ID or project name
     * @param runId - 
     */
    public async updateTestRun(
        runUpdateModel: Test.RunUpdateModel,
        project: string,
        runId: number
        ): Promise<Test.TestRun> {

        return this.beginRequest<Test.TestRun>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}",
            routeValues: {
                project: project,
                runId: runId
            },
            body: runUpdateModel
        });
    }

    /**
     * Get test run summary, used when we want to get summary of a run by outcome. Test run should be in completed state.
     * 
     * @param project - Project ID or project name
     * @param runId - ID of the run to get.
     */
    public async getTestRunSummaryByOutcome(
        project: string,
        runId: number
        ): Promise<Test.TestRunStatistic> {

        return this.beginRequest<Test.TestRunStatistic>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/runsummary",
            routeValues: {
                project: project,
                runId: runId
            }
        });
    }

    /**
     * Get TestResultsSettings data
     * 
     * @param project - Project ID or project name
     * @param settingsType - 
     */
    public async getTestResultsSettings(
        project: string,
        settingsType?: Test.TestResultsSettingsType
        ): Promise<Test.TestResultsSettings> {

        const queryValues: any = {
            settingsType: settingsType
        };

        return this.beginRequest<Test.TestResultsSettings>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/_apis/testresults/settings",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Update project settings of test results
     * 
     * @param testResultsUpdateSettings - 
     * @param project - Project ID or project name
     */
    public async updatePipelinesTestSettings(
        testResultsUpdateSettings: Test.TestResultsUpdateSettings,
        project: string
        ): Promise<Test.TestResultsSettings> {

        return this.beginRequest<Test.TestResultsSettings>({
            apiVersion: "7.1-preview.3",
            method: "PATCH",
            routeTemplate: "{project}/_apis/testresults/settings",
            routeValues: {
                project: project
            },
            body: testResultsUpdateSettings
        });
    }

    /**
     * Gets the list of results whose failure matches with the provided one.
     * 
     * @param project - Project ID or project name
     * @param runId - id of test run
     * @param testResultId - id of test result inside a test run
     * @param testSubResultId - id of subresult inside a test result
     * @param top - Maximum number of results to return
     * @param continuationToken - Header to pass the continuationToken
     */
    public async getSimilarTestResults(
        project: string,
        runId: number,
        testResultId: number,
        testSubResultId: number,
        top?: number,
        continuationToken?: String
        ): Promise<Test.TestCaseResult[]> {

        const queryValues: any = {
            testSubResultId: testSubResultId,
            '$top': top
        };

        return this.beginRequest<Test.TestCaseResult[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{testResultId}/SimilarTestResults",
            routeValues: {
                project: project,
                runId: runId,
                testResultId: testResultId
            },
            customHeaders: {
                "x-ms-continuationtoken": continuationToken,
            },
            queryParams: queryValues
        });
    }

    /**
     * Get test run statistics , used when we want to get summary of a run by outcome.
     * 
     * @param project - Project ID or project name
     * @param runId - ID of the run to get.
     */
    public async getTestRunStatistics(
        project: string,
        runId: number
        ): Promise<Test.TestRunStatistic> {

        return this.beginRequest<Test.TestRunStatistic>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/statistics",
            routeValues: {
                project: project,
                runId: runId
            }
        });
    }

    /**
     * \<p\>Gets the coverage status for the last successful build of a definition, optionally scoped to a specific branch\</p\>
     * 
     * @param project - Project ID or project name
     * @param definition - The ID or name of the definition.
     * @param branchName - The branch name.
     * @param label - The String to replace the default text on the left side of the badge.
     */
    public async getCoverageStatusBadge(
        project: string,
        definition: string,
        branchName?: string,
        label?: string
        ): Promise<string> {

        const queryValues: any = {
            branchName: branchName,
            label: label
        };

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/codecoverage/status/{*definition}",
            routeValues: {
                project: project,
                definition: definition
            },
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     * @param buildId - 
     */
    public async getTestTagsForBuild(
        project: string,
        buildId: number
        ): Promise<Test.TestTag[]> {

        const queryValues: any = {
            buildId: buildId
        };

        return this.beginRequest<Test.TestTag[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/tags",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     * @param releaseId - 
     * @param releaseEnvId - 
     */
    public async getTestTagsForRelease(
        project: string,
        releaseId: number,
        releaseEnvId: number
        ): Promise<Test.TestTag[]> {

        const queryValues: any = {
            releaseId: releaseId,
            releaseEnvId: releaseEnvId
        };

        return this.beginRequest<Test.TestTag[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/tags",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * @param testTagsUpdateModel - 
     * @param project - Project ID or project name
     * @param runId - 
     */
    public async updateTestRunTags(
        testTagsUpdateModel: Test.TestTagsUpdateModel,
        project: string,
        runId: number
        ): Promise<Test.TestTag[]> {

        return this.beginRequest<Test.TestTag[]>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/tags",
            routeValues: {
                project: project,
                runId: runId
            },
            body: testTagsUpdateModel
        });
    }

    /**
     * @param project - Project ID or project name
     * @param buildId - 
     */
    public async getTestTagSummaryForBuild(
        project: string,
        buildId: number
        ): Promise<Test.TestTagSummary> {

        const queryValues: any = {
            buildId: buildId
        };

        return this.beginRequest<Test.TestTagSummary>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/tagsummary",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     * @param releaseId - 
     * @param releaseEnvId - 
     */
    public async getTestTagSummaryForRelease(
        project: string,
        releaseId: number,
        releaseEnvId: number
        ): Promise<Test.TestTagSummary> {

        const queryValues: any = {
            releaseId: releaseId,
            releaseEnvId: releaseEnvId
        };

        return this.beginRequest<Test.TestTagSummary>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/tagsummary",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Creates an attachment in the LogStore for the specified buildId.
     * 
     * @param attachmentRequestModel - Contains attachment info like stream, filename, comment, attachmentType
     * @param project - Project ID or project name
     * @param buildId - BuildId
     */
    public async createBuildAttachmentInLogStore(
        attachmentRequestModel: Test.TestAttachmentRequestModel,
        project: string,
        buildId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/uploadbuildattachments/{buildId}",
            routeValues: {
                project: project,
                buildId: buildId
            },
            body: attachmentRequestModel
        });
    }

    /**
     * Creates an attachment in the LogStore for the specified runId.
     * 
     * @param attachmentRequestModel - Contains attachment info like stream, filename, comment, attachmentType
     * @param project - Project ID or project name
     * @param runId - Test RunId
     */
    public async createTestRunLogStoreAttachment(
        attachmentRequestModel: Test.TestAttachmentRequestModel,
        project: string,
        runId: number
        ): Promise<Test.TestLogStoreAttachmentReference> {

        return this.beginRequest<Test.TestLogStoreAttachmentReference>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/testattachments",
            routeValues: {
                project: project,
                runId: runId
            },
            body: attachmentRequestModel
        });
    }

    /**
     * Deletes the attachment with the specified filename for the specified runId from the LogStore.
     * 
     * @param project - Project ID or project name
     * @param runId - Test RunId
     * @param filename - Attachment FileName
     */
    public async deleteTestRunLogStoreAttachment(
        project: string,
        runId: number,
        filename: string
        ): Promise<void> {

        const queryValues: any = {
            filename: filename
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/testattachments",
            routeValues: {
                project: project,
                runId: runId
            },
            queryParams: queryValues
        });
    }

    /**
     * Returns the attachment with the specified filename for the specified runId from the LogStore.
     * 
     * @param project - Project ID or project name
     * @param runId - Test RunId
     * @param filename - Attachment FileName
     */
    public async getTestRunLogStoreAttachmentContent(
        project: string,
        runId: number,
        filename: string
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            filename: filename
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/testattachments",
            routeValues: {
                project: project,
                runId: runId
            },
            queryParams: queryValues
        });
    }

    /**
     * Returns a list of attachments for the specified runId from the LogStore.
     * 
     * @param project - Project ID or project name
     * @param runId - Test RunId
     */
    public async getTestRunLogStoreAttachments(
        project: string,
        runId: number
        ): Promise<Test.TestLogStoreAttachment[]> {

        return this.beginRequest<Test.TestLogStoreAttachment[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/testattachments",
            routeValues: {
                project: project,
                runId: runId
            }
        });
    }

    /**
     * Returns the attachment with the specified filename for the specified runId from the LogStore.
     * 
     * @param project - Project ID or project name
     * @param runId - Test RunId
     * @param filename - Attachment FileName
     */
    public async getTestRunLogStoreAttachmentZip(
        project: string,
        runId: number,
        filename: string
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            filename: filename
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/zip",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/testattachments",
            routeValues: {
                project: project,
                runId: runId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get history of a test method using TestHistoryQuery
     * 
     * @param filter - TestHistoryQuery to get history
     * @param project - Project ID or project name
     */
    public async queryTestHistory(
        filter: Test.TestHistoryQuery,
        project: string
        ): Promise<Test.TestHistoryQuery> {

        return this.beginRequest<Test.TestHistoryQuery>({
            apiVersion: "7.1-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/results/TestHistory",
            routeValues: {
                project: project
            },
            body: filter
        });
    }

    /**
     * Get list of build attachments reference
     * 
     * @param project - Project ID or project name
     * @param buildId - Id of the build to get
     * @param type - type of the attachment to get
     * @param directoryPath - directory path for which attachments are needed
     * @param fileNamePrefix - file name prefix to filter the list of attachment
     * @param fetchMetaData - Default is false, set if metadata is needed
     * @param top - Number of test attachments reference to return
     * @param continuationToken - Header to pass the continuationToken
     */
    public async getTestLogsForBuild(
        project: string,
        buildId: number,
        type: Test.TestLogType,
        directoryPath?: string,
        fileNamePrefix?: string,
        fetchMetaData?: boolean,
        top?: number,
        continuationToken?: String
        ): Promise<Test.TestLog[]> {

        const queryValues: any = {
            buildId: buildId,
            type: type,
            directoryPath: directoryPath,
            fileNamePrefix: fileNamePrefix,
            fetchMetaData: fetchMetaData,
            top: top
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/testlog",
            routeValues: {
                project: project
            },
            customHeaders: {
                "x-ms-continuationtoken": continuationToken,
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <Test.TestLog[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Get list of test result attachments reference
     * 
     * @param project - Project ID or project name
     * @param runId - Id of the test run that contains the result
     * @param resultId - Id of the test result
     * @param type - type of attachments to get
     * @param directoryPath - directory path of attachments to get
     * @param fileNamePrefix - file name prefix to filter the list of attachment
     * @param fetchMetaData - Default is false, set if metadata is needed
     * @param top - Numbe of attachments reference to return
     * @param continuationToken - Header to pass the continuationToken
     */
    public async getTestResultLogs(
        project: string,
        runId: number,
        resultId: number,
        type: Test.TestLogType,
        directoryPath?: string,
        fileNamePrefix?: string,
        fetchMetaData?: boolean,
        top?: number,
        continuationToken?: String
        ): Promise<Test.TestLog[]> {

        const queryValues: any = {
            type: type,
            directoryPath: directoryPath,
            fileNamePrefix: fileNamePrefix,
            fetchMetaData: fetchMetaData,
            top: top
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{resultId}/testlog",
            routeValues: {
                project: project,
                runId: runId,
                resultId: resultId
            },
            customHeaders: {
                "x-ms-continuationtoken": continuationToken,
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <Test.TestLog[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Get list of test subresult attachments reference
     * 
     * @param project - Project ID or project name
     * @param runId - Id of the test run that contains the results
     * @param resultId - Id of the test result that contains subresult
     * @param subResultId - Id of the test subresult
     * @param type - type of the attachments to get
     * @param directoryPath - directory path of the attachment to get
     * @param fileNamePrefix - file name prefix to filter the list of attachments
     * @param fetchMetaData - Default is false, set if metadata is needed
     * @param top - Number of attachments reference to return
     * @param continuationToken - Header to pass the continuationToken
     */
    public async getTestSubResultLogs(
        project: string,
        runId: number,
        resultId: number,
        subResultId: number,
        type: Test.TestLogType,
        directoryPath?: string,
        fileNamePrefix?: string,
        fetchMetaData?: boolean,
        top?: number,
        continuationToken?: String
        ): Promise<Test.TestLog[]> {

        const queryValues: any = {
            subResultId: subResultId,
            type: type,
            directoryPath: directoryPath,
            fileNamePrefix: fileNamePrefix,
            fetchMetaData: fetchMetaData,
            top: top
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{resultId}/testlog",
            routeValues: {
                project: project,
                runId: runId,
                resultId: resultId
            },
            customHeaders: {
                "x-ms-continuationtoken": continuationToken,
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <Test.TestLog[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Get list of test run attachments reference
     * 
     * @param project - Project ID or project name
     * @param runId - Id of the test run
     * @param type - type of the attachments to get
     * @param directoryPath - directory path for which attachments are needed
     * @param fileNamePrefix - file name prefix to filter the list of attachment
     * @param fetchMetaData - Default is false, set if metadata is needed
     * @param top - Number of attachments reference to return
     * @param continuationToken - Header to pass the continuationToken
     */
    public async getTestRunLogs(
        project: string,
        runId: number,
        type: Test.TestLogType,
        directoryPath?: string,
        fileNamePrefix?: string,
        fetchMetaData?: boolean,
        top?: number,
        continuationToken?: String
        ): Promise<Test.TestLog[]> {

        const queryValues: any = {
            type: type,
            directoryPath: directoryPath,
            fileNamePrefix: fileNamePrefix,
            fetchMetaData: fetchMetaData,
            top: top
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/testlog",
            routeValues: {
                project: project,
                runId: runId
            },
            customHeaders: {
                "x-ms-continuationtoken": continuationToken,
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <Test.TestLog[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Get SAS Uri of a build attachment
     * 
     * @param project - Project ID or project name
     * @param build - Id of the build to get
     * @param type - type of the file
     * @param filePath - filePath for which sas uri is needed
     */
    public async getTestLogStoreEndpointDetailsForBuildLog(
        project: string,
        build: number,
        type: Test.TestLogType,
        filePath: string
        ): Promise<Test.TestLogStoreEndpointDetails> {

        const queryValues: any = {
            build: build,
            type: type,
            filePath: filePath
        };

        return this.beginRequest<Test.TestLogStoreEndpointDetails>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/testlogstoreendpoint",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Create and Get sas uri of the build container
     * 
     * @param project - Project ID or project name
     * @param buildId - Id of the build to get
     * @param testLogStoreOperationType - Type of operation to perform using sas uri
     */
    public async testLogStoreEndpointDetailsForBuild(
        project: string,
        buildId: number,
        testLogStoreOperationType: Test.TestLogStoreOperationType
        ): Promise<Test.TestLogStoreEndpointDetails> {

        const queryValues: any = {
            buildId: buildId,
            testLogStoreOperationType: testLogStoreOperationType
        };

        return this.beginRequest<Test.TestLogStoreEndpointDetails>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/testlogstoreendpoint",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Get SAS Uri of a test results attachment
     * 
     * @param project - Project ID or project name
     * @param runId - Id of the test run that contains result
     * @param resultId - Id of the test result whose files need to be downloaded
     * @param type - type of the file
     * @param filePath - filePath for which sas uri is needed
     */
    public async getTestLogStoreEndpointDetailsForResultLog(
        project: string,
        runId: number,
        resultId: number,
        type: Test.TestLogType,
        filePath: string
        ): Promise<Test.TestLogStoreEndpointDetails> {

        const queryValues: any = {
            type: type,
            filePath: filePath
        };

        return this.beginRequest<Test.TestLogStoreEndpointDetails>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{resultId}/testlogstoreendpoint",
            routeValues: {
                project: project,
                runId: runId,
                resultId: resultId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get SAS Uri of a test subresults attachment
     * 
     * @param project - Project ID or project name
     * @param runId - Id of the test run that contains result
     * @param resultId - Id of the test result that contains subresult
     * @param subResultId - Id of the test subresult whose file sas uri is needed
     * @param type - type of the file
     * @param filePath - filePath for which sas uri is needed
     */
    public async getTestLogStoreEndpointDetailsForSubResultLog(
        project: string,
        runId: number,
        resultId: number,
        subResultId: number,
        type: Test.TestLogType,
        filePath: string
        ): Promise<Test.TestLogStoreEndpointDetails> {

        const queryValues: any = {
            subResultId: subResultId,
            type: type,
            filePath: filePath
        };

        return this.beginRequest<Test.TestLogStoreEndpointDetails>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{resultId}/testlogstoreendpoint",
            routeValues: {
                project: project,
                runId: runId,
                resultId: resultId
            },
            queryParams: queryValues
        });
    }

    /**
     * Create empty file for a result and Get Sas uri for the file
     * 
     * @param project - Project ID or project name
     * @param runId - Id of the test run that contains the result
     * @param resultId - Id of the test results that contains sub result
     * @param subResultId - Id of the test sub result whose file sas uri is needed
     * @param filePath - file path inside the sub result for which sas uri is needed
     * @param type - Type of the file for download
     */
    public async testLogStoreEndpointDetailsForResult(
        project: string,
        runId: number,
        resultId: number,
        subResultId: number,
        filePath: string,
        type: Test.TestLogType
        ): Promise<Test.TestLogStoreEndpointDetails> {

        const queryValues: any = {
            subResultId: subResultId,
            filePath: filePath,
            type: type
        };

        return this.beginRequest<Test.TestLogStoreEndpointDetails>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{resultId}/testlogstoreendpoint",
            routeValues: {
                project: project,
                runId: runId,
                resultId: resultId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get SAS Uri of a test run attachment
     * 
     * @param project - Project ID or project name
     * @param runId - Id of the test run whose file has to be downloaded
     * @param type - type of the file
     * @param filePath - filePath for which sas uri is needed
     */
    public async getTestLogStoreEndpointDetailsForRunLog(
        project: string,
        runId: number,
        type: Test.TestLogType,
        filePath: string
        ): Promise<Test.TestLogStoreEndpointDetails> {

        const queryValues: any = {
            type: type,
            filePath: filePath
        };

        return this.beginRequest<Test.TestLogStoreEndpointDetails>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/testlogstoreendpoint",
            routeValues: {
                project: project,
                runId: runId
            },
            queryParams: queryValues
        });
    }

    /**
     * Create empty file for a run and Get Sas uri for the file
     * 
     * @param project - Project ID or project name
     * @param runId - Id of the run to get endpoint details
     * @param testLogStoreOperationType - Type of operation to perform using sas uri
     * @param filePath - file path to create an empty file
     * @param type - Default is GeneralAttachment, type of empty file to be created
     */
    public async testLogStoreEndpointDetailsForRun(
        project: string,
        runId: number,
        testLogStoreOperationType: Test.TestLogStoreOperationType,
        filePath?: string,
        type?: Test.TestLogType
        ): Promise<Test.TestLogStoreEndpointDetails> {

        const queryValues: any = {
            testLogStoreOperationType: testLogStoreOperationType,
            filePath: filePath,
            type: type
        };

        return this.beginRequest<Test.TestLogStoreEndpointDetails>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/testlogstoreendpoint",
            routeValues: {
                project: project,
                runId: runId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param testSettings - 
     * @param project - Project ID or project name
     */
    public async createTestSettings(
        testSettings: Test.TestSettings,
        project: string
        ): Promise<number> {

        return this.beginRequest<number>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/testsettings",
            routeValues: {
                project: project
            },
            body: testSettings
        });
    }

    /**
     * @param project - Project ID or project name
     * @param testSettingsId - 
     */
    public async deleteTestSettings(
        project: string,
        testSettingsId: number
        ): Promise<void> {

        const queryValues: any = {
            testSettingsId: testSettingsId
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/testresults/testsettings",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     * @param testSettingsId - 
     */
    public async getTestSettingsById(
        project: string,
        testSettingsId: number
        ): Promise<Test.TestSettings> {

        const queryValues: any = {
            testSettingsId: testSettingsId
        };

        return this.beginRequest<Test.TestSettings>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/testresults/testsettings",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * @param workItemToTestLinks - 
     * @param project - Project ID or project name
     */
    public async addWorkItemToTestLinks(
        workItemToTestLinks: Test.WorkItemToTestLinks,
        project: string
        ): Promise<Test.WorkItemToTestLinks> {

        return this.beginRequest<Test.WorkItemToTestLinks>({
            apiVersion: "7.1-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/testmethods/workitems",
            routeValues: {
                project: project
            },
            body: workItemToTestLinks
        });
    }

    /**
     * @param project - Project ID or project name
     * @param testName - 
     * @param workItemId - 
     */
    public async deleteTestMethodToWorkItemLink(
        project: string,
        testName: string,
        workItemId: number
        ): Promise<boolean> {

        const queryValues: any = {
            testName: testName,
            workItemId: workItemId
        };

        return this.beginRequest<boolean>({
            apiVersion: "7.1-preview.2",
            method: "DELETE",
            routeTemplate: "{project}/_apis/testresults/testmethods/{testName}/workitems/{workItemId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     * @param testName - 
     */
    public async queryTestMethodLinkedWorkItems(
        project: string,
        testName: string
        ): Promise<Test.TestToWorkItemLinks> {

        const queryValues: any = {
            testName: testName
        };

        return this.beginRequest<Test.TestToWorkItemLinks>({
            apiVersion: "7.1-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/testresults/testmethods/{testName}/workitems/{workItemId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     * @param runId - 
     * @param testCaseResultId - 
     */
    public async getTestResultWorkItemsById(
        project: string,
        runId: number,
        testCaseResultId: number
        ): Promise<Test.WorkItemReference[]> {

        return this.beginRequest<Test.WorkItemReference[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/testresults/runs/{runId}/results/{testCaseResultId}/workitems",
            routeValues: {
                project: project,
                runId: runId,
                testCaseResultId: testCaseResultId
            }
        });
    }

    /**
     * Query Test Result WorkItems based on filter
     * 
     * @param project - Project ID or project name
     * @param workItemCategory - can take values Microsoft.BugCategory or all(for getting all workitems)
     * @param automatedTestName - 
     * @param testCaseId - 
     * @param maxCompleteDate - 
     * @param days - 
     * @param workItemCount - 
     */
    public async queryTestResultWorkItems(
        project: string,
        workItemCategory: string,
        automatedTestName?: string,
        testCaseId?: number,
        maxCompleteDate?: Date,
        days?: number,
        workItemCount?: number
        ): Promise<Test.WorkItemReference[]> {

        const queryValues: any = {
            workItemCategory: workItemCategory,
            automatedTestName: automatedTestName,
            testCaseId: testCaseId,
            maxCompleteDate: maxCompleteDate,
            days: days,
            '$workItemCount': workItemCount
        };

        return this.beginRequest<Test.WorkItemReference[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/testresults/results/workitems",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

}
