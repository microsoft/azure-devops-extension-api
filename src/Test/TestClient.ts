/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import { deserializeVssJsonObject } from "../Common/Util/Serialization";

import * as TfsCore from "../Core/Core";
import * as Test from "../Test/Test";

export class TestRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "c2aa639c-3ccc-4740-b3b6-ce2a1e1d984e";

    /**
     * Attach a file to test step result
     * 
     * @param attachmentRequestModel - Attachment details TestAttachmentRequestModel
     * @param project - Project ID or project name
     * @param runId - ID of the test run that contains the result.
     * @param testCaseResultId - ID of the test result that contains the iteration
     * @param iterationId - ID of the test result iteration.
     * @param actionPath - Hex value of test result action path.
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
            routeTemplate: "{project}/_apis/test/Runs/{runId}/Results/{testCaseResultId}/Attachments/{attachmentId}",
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
     * Attach a file to a test result.
     * 
     * @param attachmentRequestModel - Attachment details TestAttachmentRequestModel
     * @param project - Project ID or project name
     * @param runId - ID of the test run that contains the result.
     * @param testCaseResultId - ID of the test result against which attachment has to be uploaded.
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
            routeTemplate: "{project}/_apis/test/Runs/{runId}/Results/{testCaseResultId}/Attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId,
                testCaseResultId: testCaseResultId
            },
            body: attachmentRequestModel
        });
    }

    /**
     * Attach a file to a test result
     * 
     * @param attachmentRequestModel - Attachment Request Model.
     * @param project - Project ID or project name
     * @param runId - ID of the test run that contains the result.
     * @param testCaseResultId - ID of the test results that contains sub result.
     * @param testSubResultId - ID of the test sub results against which attachment has to be uploaded.
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
            routeTemplate: "{project}/_apis/test/Runs/{runId}/Results/{testCaseResultId}/Attachments/{attachmentId}",
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
     * Download a test result attachment by its ID.
     * 
     * @param project - Project ID or project name
     * @param runId - ID of the test run that contains the testCaseResultId.
     * @param testCaseResultId - ID of the test result whose attachment has to be downloaded.
     * @param attachmentId - ID of the test result attachment to be downloaded.
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
            routeTemplate: "{project}/_apis/test/Runs/{runId}/Results/{testCaseResultId}/Attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId,
                testCaseResultId: testCaseResultId,
                attachmentId: attachmentId
            }
        });
    }

    /**
     * Get list of test result attachments reference.
     * 
     * @param project - Project ID or project name
     * @param runId - ID of the test run that contains the result.
     * @param testCaseResultId - ID of the test result.
     */
    public async getTestResultAttachments(
        project: string,
        runId: number,
        testCaseResultId: number
        ): Promise<Test.TestAttachment[]> {

        return this.beginRequest<Test.TestAttachment[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/test/Runs/{runId}/Results/{testCaseResultId}/Attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId,
                testCaseResultId: testCaseResultId
            }
        });
    }

    /**
     * Download a test result attachment by its ID.
     * 
     * @param project - Project ID or project name
     * @param runId - ID of the test run that contains the testCaseResultId.
     * @param testCaseResultId - ID of the test result whose attachment has to be downloaded.
     * @param attachmentId - ID of the test result attachment to be downloaded.
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
            routeTemplate: "{project}/_apis/test/Runs/{runId}/Results/{testCaseResultId}/Attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId,
                testCaseResultId: testCaseResultId,
                attachmentId: attachmentId
            }
        });
    }

    /**
     * Download a test sub result attachment
     * 
     * @param project - Project ID or project name
     * @param runId - ID of the test run that contains the result.
     * @param testCaseResultId - ID of the test results that contains sub result.
     * @param attachmentId - ID of the test result attachment to be downloaded
     * @param testSubResultId - ID of the test sub result whose attachment has to be downloaded
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
            routeTemplate: "{project}/_apis/test/Runs/{runId}/Results/{testCaseResultId}/Attachments/{attachmentId}",
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
     * Get list of test sub result attachments
     * 
     * @param project - Project ID or project name
     * @param runId - ID of the test run that contains the result.
     * @param testCaseResultId - ID of the test results that contains sub result.
     * @param testSubResultId - ID of the test sub result whose attachment has to be downloaded
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
            routeTemplate: "{project}/_apis/test/Runs/{runId}/Results/{testCaseResultId}/Attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId,
                testCaseResultId: testCaseResultId
            },
            queryParams: queryValues
        });
    }

    /**
     * Download a test sub result attachment
     * 
     * @param project - Project ID or project name
     * @param runId - ID of the test run that contains the result.
     * @param testCaseResultId - ID of the test results that contains sub result.
     * @param attachmentId - ID of the test result attachment to be downloaded
     * @param testSubResultId - ID of the test sub result whose attachment has to be downloaded
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
            routeTemplate: "{project}/_apis/test/Runs/{runId}/Results/{testCaseResultId}/Attachments/{attachmentId}",
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
     * Attach a file to a test run.
     * 
     * @param attachmentRequestModel - Attachment details TestAttachmentRequestModel
     * @param project - Project ID or project name
     * @param runId - ID of the test run against which attachment has to be uploaded.
     */
    public async createTestRunAttachment(
        attachmentRequestModel: Test.TestAttachmentRequestModel,
        project: string,
        runId: number
        ): Promise<Test.TestAttachmentReference> {

        return this.beginRequest<Test.TestAttachmentReference>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/test/Runs/{runId}/Attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId
            },
            body: attachmentRequestModel
        });
    }

    /**
     * Download a test run attachment by its ID.
     * 
     * @param project - Project ID or project name
     * @param runId - ID of the test run whose attachment has to be downloaded.
     * @param attachmentId - ID of the test run attachment to be downloaded.
     */
    public async getTestRunAttachmentContent(
        project: string,
        runId: number,
        attachmentId: number
        ): Promise<ArrayBuffer> {

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "{project}/_apis/test/Runs/{runId}/Attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId,
                attachmentId: attachmentId
            }
        });
    }

    /**
     * Get list of test run attachments reference.
     * 
     * @param project - Project ID or project name
     * @param runId - ID of the test run.
     */
    public async getTestRunAttachments(
        project: string,
        runId: number
        ): Promise<Test.TestAttachment[]> {

        return this.beginRequest<Test.TestAttachment[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/test/Runs/{runId}/Attachments/{attachmentId}",
            routeValues: {
                project: project,
                runId: runId
            }
        });
    }

    /**
     * Download a test run attachment by its ID.
     * 
     * @param project - Project ID or project name
     * @param runId - ID of the test run whose attachment has to be downloaded.
     * @param attachmentId - ID of the test run attachment to be downloaded.
     */
    public async getTestRunAttachmentZip(
        project: string,
        runId: number,
        attachmentId: number
        ): Promise<ArrayBuffer> {

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/zip",
            routeTemplate: "{project}/_apis/test/Runs/{runId}/Attachments/{attachmentId}",
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
            routeTemplate: "{project}/_apis/test/Runs/{runId}/Results/{testCaseResultId}/Bugs",
            routeValues: {
                project: project,
                runId: runId,
                testCaseResultId: testCaseResultId
            }
        });
    }

    /**
     * Get code coverage data for a build.
     * 
     * @param project - Project ID or project name
     * @param buildId - ID of the build for which code coverage data needs to be fetched.
     * @param flags - Value of flags determine the level of code coverage details to be fetched. Flags are additive. Expected Values are 1 for Modules, 2 for Functions, 4 for BlockData.
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
            routeTemplate: "{project}/_apis/test/CodeCoverage",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Get Code Coverage Summary for Build.
     * 
     * @param project - Project ID or project name
     * @param buildId - ID of the build for which code coverage data needs to be fetched.
     * @param deltaBuildId - Delta Build id (optional)
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
            routeTemplate: "{project}/_apis/test/CodeCoverage",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * http://(tfsserver):8080/tfs/DefaultCollection/_apis/test/CodeCoverage?buildId=10 Request: Json of code coverage summary
     * 
     * @param coverageData - 
     * @param project - Project ID or project name
     * @param buildId - 
     */
    public async updateCodeCoverageSummary(
        coverageData: Test.CodeCoverageData,
        project: string,
        buildId: number
        ): Promise<void> {

        const queryValues: any = {
            buildId: buildId
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/test/CodeCoverage",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            body: coverageData
        });
    }

    /**
     * Get code coverage data for a test run
     * 
     * @param project - Project ID or project name
     * @param runId - ID of the test run for which code coverage data needs to be fetched.
     * @param flags - Value of flags determine the level of code coverage details to be fetched. Flags are additive. Expected Values are 1 for Modules, 2 for Functions, 4 for BlockData.
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
            routeTemplate: "{project}/_apis/test/Runs/{runId}/CodeCoverage",
            routeValues: {
                project: project,
                runId: runId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param newFields - 
     * @param project - Project ID or project name
     */
    public async addCustomFields(
        newFields: Test.CustomTestFieldDefinition[],
        project: string
        ): Promise<Test.CustomTestFieldDefinition[]> {

        return this.beginRequest<Test.CustomTestFieldDefinition[]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/test/ExtensionFields",
            routeValues: {
                project: project
            },
            body: newFields
        });
    }

    /**
     * @param project - Project ID or project name
     * @param scopeFilter - 
     */
    public async queryCustomFields(
        project: string,
        scopeFilter: Test.CustomTestFieldScope
        ): Promise<Test.CustomTestFieldDefinition[]> {

        const queryValues: any = {
            scopeFilter: scopeFilter
        };

        return this.beginRequest<Test.CustomTestFieldDefinition[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/test/ExtensionFields",
            routeValues: {
                project: project
            },
            queryParams: queryValues
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
            routeTemplate: "{project}/_apis/test/Results/History",
            routeValues: {
                project: project
            },
            body: filter
        });
    }

    /**
     * Get iteration for a result
     * 
     * @param project - Project ID or project name
     * @param runId - ID of the test run that contains the result.
     * @param testCaseResultId - ID of the test result that contains the iterations.
     * @param iterationId - Id of the test results Iteration.
     * @param includeActionResults - Include result details for each action performed in the test iteration. ActionResults refer to outcome (pass/fail) of test steps that are executed as part of a running a manual test. Including the ActionResults flag gets the outcome of test steps in the actionResults section and test parameters in the parameters section for each test iteration.
     */
    public async getTestIteration(
        project: string,
        runId: number,
        testCaseResultId: number,
        iterationId: number,
        includeActionResults?: boolean
        ): Promise<Test.TestIterationDetailsModel> {

        const queryValues: any = {
            includeActionResults: includeActionResults
        };

        return this.beginRequest<Test.TestIterationDetailsModel>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/_apis/test/Runs/{runId}/Results/{testCaseResultId}/Iterations/{iterationId}",
            routeValues: {
                project: project,
                runId: runId,
                testCaseResultId: testCaseResultId,
                iterationId: iterationId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get iterations for a result
     * 
     * @param project - Project ID or project name
     * @param runId - ID of the test run that contains the result.
     * @param testCaseResultId - ID of the test result that contains the iterations.
     * @param includeActionResults - Include result details for each action performed in the test iteration. ActionResults refer to outcome (pass/fail) of test steps that are executed as part of a running a manual test. Including the ActionResults flag gets the outcome of test steps in the actionResults section and test parameters in the parameters section for each test iteration.
     */
    public async getTestIterations(
        project: string,
        runId: number,
        testCaseResultId: number,
        includeActionResults?: boolean
        ): Promise<Test.TestIterationDetailsModel[]> {

        const queryValues: any = {
            includeActionResults: includeActionResults
        };

        return this.beginRequest<Test.TestIterationDetailsModel[]>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/_apis/test/Runs/{runId}/Results/{testCaseResultId}/Iterations/{iterationId}",
            routeValues: {
                project: project,
                runId: runId,
                testCaseResultId: testCaseResultId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param workItemQuery - 
     * @param project - Project ID or project name
     */
    public async getLinkedWorkItemsByQuery(
        workItemQuery: Test.LinkedWorkItemsQuery,
        project: string
        ): Promise<Test.LinkedWorkItemsQueryResult[]> {

        return this.beginRequest<Test.LinkedWorkItemsQueryResult[]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/test/LinkedWorkItemsQuery",
            routeValues: {
                project: project
            },
            body: workItemQuery
        });
    }

    /**
     * Get test run message logs
     * 
     * @param project - Project ID or project name
     * @param runId - ID of the run to get.
     */
    public async getTestRunLogs(
        project: string,
        runId: number
        ): Promise<Test.TestMessageLogDetails[]> {

        return this.beginRequest<Test.TestMessageLogDetails[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/test/Runs/{runId}/MessageLogs",
            routeValues: {
                project: project,
                runId: runId
            }
        });
    }

    /**
     * Get a test point.
     * 
     * @param project - Project ID or project name
     * @param planId - ID of the test plan.
     * @param suiteId - ID of the suite that contains the point.
     * @param pointIds - ID of the test point to get.
     * @param witFields - Comma-separated list of work item field names.
     */
    public async getPoint(
        project: string,
        planId: number,
        suiteId: number,
        pointIds: number,
        witFields?: string
        ): Promise<Test.TestPoint> {

        const queryValues: any = {
            witFields: witFields
        };

        return this.beginRequest<Test.TestPoint>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/test/Plans/{planId}/Suites/{suiteId}/Points/{pointIds}",
            routeValues: {
                project: project,
                planId: planId,
                suiteId: suiteId,
                pointIds: pointIds
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a list of test points.
     * 
     * @param project - Project ID or project name
     * @param planId - ID of the test plan.
     * @param suiteId - ID of the suite that contains the points.
     * @param witFields - Comma-separated list of work item field names.
     * @param configurationId - Get test points for specific configuration.
     * @param testCaseId - Get test points for a specific test case, valid when configurationId is not set.
     * @param testPointIds - Get test points for comma-separated list of test point IDs, valid only when configurationId and testCaseId are not set.
     * @param includePointDetails - Include all properties for the test point.
     * @param skip - Number of test points to skip..
     * @param top - Number of test points to return.
     */
    public async getPoints(
        project: string,
        planId: number,
        suiteId: number,
        witFields?: string,
        configurationId?: string,
        testCaseId?: string,
        testPointIds?: string,
        includePointDetails?: boolean,
        skip?: number,
        top?: number
        ): Promise<Test.TestPoint[]> {

        const queryValues: any = {
            witFields: witFields,
            configurationId: configurationId,
            testCaseId: testCaseId,
            testPointIds: testPointIds,
            includePointDetails: includePointDetails,
            '$skip': skip,
            '$top': top
        };

        return this.beginRequest<Test.TestPoint[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/test/Plans/{planId}/Suites/{suiteId}/Points/{pointIds}",
            routeValues: {
                project: project,
                planId: planId,
                suiteId: suiteId
            },
            queryParams: queryValues
        });
    }

    /**
     * Update test points.
     * 
     * @param pointUpdateModel - Data to update.
     * @param project - Project ID or project name
     * @param planId - ID of the test plan.
     * @param suiteId - ID of the suite that contains the points.
     * @param pointIds - ID of the test point to get. Use a comma-separated list of IDs to update multiple test points.
     */
    public async updateTestPoints(
        pointUpdateModel: Test.PointUpdateModel,
        project: string,
        planId: number,
        suiteId: number,
        pointIds: string
        ): Promise<Test.TestPoint[]> {

        return this.beginRequest<Test.TestPoint[]>({
            apiVersion: "7.1-preview.2",
            method: "PATCH",
            routeTemplate: "{project}/_apis/test/Plans/{planId}/Suites/{suiteId}/Points/{pointIds}",
            routeValues: {
                project: project,
                planId: planId,
                suiteId: suiteId,
                pointIds: pointIds
            },
            body: pointUpdateModel
        });
    }

    /**
     * Get test points using query.
     * 
     * @param query - TestPointsQuery to get test points.
     * @param project - Project ID or project name
     * @param skip - Number of test points to skip..
     * @param top - Number of test points to return.
     */
    public async getPointsByQuery(
        query: Test.TestPointsQuery,
        project: string,
        skip?: number,
        top?: number
        ): Promise<Test.TestPointsQuery> {

        const queryValues: any = {
            '$skip': skip,
            '$top': top
        };

        return this.beginRequest<Test.TestPointsQuery>({
            apiVersion: "7.1-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/test/Points",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            body: query
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
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/test/ResultDetailsByBuild",
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
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/test/ResultDetailsByRelease",
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
            routeTemplate: "{project}/_apis/test/Runs/{runId}/ResultDocument",
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
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/test/ResultGroupsByBuild",
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
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/_apis/test/ResultGroupsByRelease",
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
     * @param testReferenceIds - TestCaseReference Ids of the test Result to be queried, comma separated list of valid ids (limit no. of ids 200).
     * @param project - Project ID or project name
     */
    public async queryTestResultsMetaData(
        testReferenceIds: string[],
        project: string
        ): Promise<Test.TestResultMetaData[]> {

        return this.beginRequest<Test.TestResultMetaData[]>({
            apiVersion: "7.1-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/test/Results/ResultMetaData",
            routeValues: {
                project: project
            },
            body: testReferenceIds
        });
    }

    /**
     * Get test result retention settings
     * 
     * @param project - Project ID or project name
     */
    public async getResultRetentionSettings(
        project: string
        ): Promise<Test.ResultRetentionSettings> {

        return this.beginRequest<Test.ResultRetentionSettings>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/test/ResultRetentionSettings",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * Update test result retention settings
     * 
     * @param retentionSettings - Test result retention settings details to be updated
     * @param project - Project ID or project name
     */
    public async updateResultRetentionSettings(
        retentionSettings: Test.ResultRetentionSettings,
        project: string
        ): Promise<Test.ResultRetentionSettings> {

        return this.beginRequest<Test.ResultRetentionSettings>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/test/ResultRetentionSettings",
            routeValues: {
                project: project
            },
            body: retentionSettings
        });
    }

    /**
     * Add test results to a test run.
     * 
     * @param results - List of test results to add.
     * @param project - Project ID or project name
     * @param runId - Test run ID into which test results to add.
     */
    public async addTestResultsToTestRun(
        results: Test.TestCaseResult[],
        project: string,
        runId: number
        ): Promise<Test.TestCaseResult[]> {

        return this.beginRequest<Test.TestCaseResult[]>({
            apiVersion: "7.1-preview.6",
            method: "POST",
            routeTemplate: "{project}/_apis/test/Runs/{runId}/Results/{testCaseResultId}",
            routeValues: {
                project: project,
                runId: runId
            },
            body: results
        });
    }

    /**
     * Get a test result for a test run.
     * 
     * @param project - Project ID or project name
     * @param runId - Test run ID of a test result to fetch.
     * @param testCaseResultId - Test result ID.
     * @param detailsToInclude - Details to include with test results. Default is None. Other values are Iterations, WorkItems and SubResults.
     */
    public async getTestResultById(
        project: string,
        runId: number,
        testCaseResultId: number,
        detailsToInclude?: Test.ResultDetails
        ): Promise<Test.TestCaseResult> {

        const queryValues: any = {
            detailsToInclude: detailsToInclude
        };

        return this.beginRequest<Test.TestCaseResult>({
            apiVersion: "7.1-preview.6",
            routeTemplate: "{project}/_apis/test/Runs/{runId}/Results/{testCaseResultId}",
            routeValues: {
                project: project,
                runId: runId,
                testCaseResultId: testCaseResultId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get test results for a test run.
     * 
     * @param project - Project ID or project name
     * @param runId - Test run ID of test results to fetch.
     * @param detailsToInclude - Details to include with test results. Default is None. Other values are Iterations and WorkItems.
     * @param skip - Number of test results to skip from beginning.
     * @param top - Number of test results to return. Maximum is 1000 when detailsToInclude is None and 200 otherwise.
     * @param outcomes - Comma separated list of test outcomes to filter test results.
     */
    public async getTestResults(
        project: string,
        runId: number,
        detailsToInclude?: Test.ResultDetails,
        skip?: number,
        top?: number,
        outcomes?: Test.TestOutcome[]
        ): Promise<Test.TestCaseResult[]> {

        const queryValues: any = {
            detailsToInclude: detailsToInclude,
            '$skip': skip,
            '$top': top,
            outcomes: outcomes && outcomes.join(",")
        };

        return this.beginRequest<Test.TestCaseResult[]>({
            apiVersion: "7.1-preview.6",
            routeTemplate: "{project}/_apis/test/Runs/{runId}/Results/{testCaseResultId}",
            routeValues: {
                project: project,
                runId: runId
            },
            queryParams: queryValues
        });
    }

    /**
     * Update test results in a test run.
     * 
     * @param results - List of test results to update.
     * @param project - Project ID or project name
     * @param runId - Test run ID whose test results to update.
     */
    public async updateTestResults(
        results: Test.TestCaseResult[],
        project: string,
        runId: number
        ): Promise<Test.TestCaseResult[]> {

        return this.beginRequest<Test.TestCaseResult[]>({
            apiVersion: "7.1-preview.6",
            method: "PATCH",
            routeTemplate: "{project}/_apis/test/Runs/{runId}/Results/{testCaseResultId}",
            routeValues: {
                project: project,
                runId: runId
            },
            body: results
        });
    }

    /**
     * This API will return results by Ids with fields specified/trend for particular automated test method. We are still improving this API and have not finalized proper signature and contract.
     * 
     * @param query - 
     * @param project - Project ID or project name
     */
    public async getTestResultsByQuery(
        query: Test.TestResultsQuery,
        project: string
        ): Promise<Test.TestResultsQuery> {

        return this.beginRequest<Test.TestResultsQuery>({
            apiVersion: "7.1-preview.6",
            method: "POST",
            routeTemplate: "{project}/_apis/test/Results",
            routeValues: {
                project: project
            },
            body: query
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
            routeTemplate: "{project}/_apis/test/ResultsByBuild",
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
            routeTemplate: "{project}/_apis/test/ResultsByRelease",
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
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/_apis/test/ResultSummaryByBuild",
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
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/_apis/test/ResultSummaryByRelease",
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
            apiVersion: "7.1-preview.3",
            method: "POST",
            routeTemplate: "{project}/_apis/test/ResultSummaryByRelease",
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
            routeTemplate: "{project}/_apis/test/ResultSummaryByRequirement",
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
            routeTemplate: "{project}/_apis/test/ResultTrendByBuild",
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
            routeTemplate: "{project}/_apis/test/ResultTrendByRelease",
            routeValues: {
                project: project
            },
            body: filter
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
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/_apis/test/Runs/{runId}/Statistics",
            routeValues: {
                project: project,
                runId: runId
            }
        });
    }

    /**
     * Create new test run.
     * 
     * @param testRun - Run details RunCreateModel
     * @param project - Project ID or project name
     */
    public async createTestRun(
        testRun: Test.RunCreateModel,
        project: string
        ): Promise<Test.TestRun> {

        return this.beginRequest<Test.TestRun>({
            apiVersion: "7.1-preview.3",
            method: "POST",
            routeTemplate: "{project}/_apis/test/Runs/{runId}",
            routeValues: {
                project: project
            },
            body: testRun
        });
    }

    /**
     * Delete a test run by its ID.
     * 
     * @param project - Project ID or project name
     * @param runId - ID of the run to delete.
     */
    public async deleteTestRun(
        project: string,
        runId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.3",
            method: "DELETE",
            routeTemplate: "{project}/_apis/test/Runs/{runId}",
            routeValues: {
                project: project,
                runId: runId
            }
        });
    }

    /**
     * Get a test run by its ID.
     * 
     * @param project - Project ID or project name
     * @param runId - ID of the run to get.
     * @param includeDetails - Default value is true. It includes details like run statistics, release, build, test environment, post process state, and more.
     */
    public async getTestRunById(
        project: string,
        runId: number,
        includeDetails?: boolean
        ): Promise<Test.TestRun> {

        const queryValues: any = {
            includeDetails: includeDetails
        };

        return this.beginRequest<Test.TestRun>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/_apis/test/Runs/{runId}",
            routeValues: {
                project: project,
                runId: runId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a list of test runs.
     * 
     * @param project - Project ID or project name
     * @param buildUri - URI of the build that the runs used.
     * @param owner - Team foundation ID of the owner of the runs.
     * @param tmiRunId - 
     * @param planId - ID of the test plan that the runs are a part of.
     * @param includeRunDetails - If true, include all the properties of the runs.
     * @param automated - If true, only returns automated runs.
     * @param skip - Number of test runs to skip.
     * @param top - Number of test runs to return.
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
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/_apis/test/Runs/{runId}",
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
     * @param planIds - Plan Ids of the Runs to be queried, comma separated list of valid ids (limit no. of ids 10).
     * @param isAutomated - Automation type of the Runs to be queried.
     * @param publishContext - PublishContext of the Runs to be queried.
     * @param buildIds - Build Ids of the Runs to be queried, comma separated list of valid ids (limit no. of ids 10).
     * @param buildDefIds - Build Definition Ids of the Runs to be queried, comma separated list of valid ids (limit no. of ids 10).
     * @param branchName - Source Branch name of the Runs to be queried.
     * @param releaseIds - Release Ids of the Runs to be queried, comma separated list of valid ids (limit no. of ids 10).
     * @param releaseDefIds - Release Definition Ids of the Runs to be queried, comma separated list of valid ids (limit no. of ids 10).
     * @param releaseEnvIds - Release Environment Ids of the Runs to be queried, comma separated list of valid ids (limit no. of ids 10).
     * @param releaseEnvDefIds - Release Environment Definition Ids of the Runs to be queried, comma separated list of valid ids (limit no. of ids 10).
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
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/_apis/test/Runs/{runId}",
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
     * Update test run by its ID.
     * 
     * @param runUpdateModel - Run details RunUpdateModel
     * @param project - Project ID or project name
     * @param runId - ID of the run to update.
     */
    public async updateTestRun(
        runUpdateModel: Test.RunUpdateModel,
        project: string,
        runId: number
        ): Promise<Test.TestRun> {

        return this.beginRequest<Test.TestRun>({
            apiVersion: "7.1-preview.3",
            method: "PATCH",
            routeTemplate: "{project}/_apis/test/Runs/{runId}",
            routeValues: {
                project: project,
                runId: runId
            },
            body: runUpdateModel
        });
    }

    /**
     * Create a test session
     * 
     * @param testSession - Test session details for creation
     * @param teamContext - The team context for the operation
     */
    public async createTestSession(
        testSession: Test.TestSession,
        teamContext: TfsCore.TeamContext
        ): Promise<Test.TestSession> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Test.TestSession>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/{team}/_apis/test/Session/{testSessionId}",
            routeValues: {
                project: project,
                team: team
            },
            body: testSession
        });
    }

    /**
     * Get a list of test sessions
     * 
     * @param teamContext - The team context for the operation
     * @param period - Period in days from now, for which test sessions are fetched.
     * @param allSessions - If false, returns test sessions for current user. Otherwise, it returns test sessions for all users
     * @param includeAllProperties - If true, it returns all properties of the test sessions. Otherwise, it returns the skinny version.
     * @param source - Source of the test session.
     * @param includeOnlyCompletedSessions - If true, it returns test sessions in completed state. Otherwise, it returns test sessions for all states
     */
    public async getTestSessions(
        teamContext: TfsCore.TeamContext,
        period?: number,
        allSessions?: boolean,
        includeAllProperties?: boolean,
        source?: Test.TestSessionSource,
        includeOnlyCompletedSessions?: boolean
        ): Promise<Test.TestSession[]> {

        const queryValues: any = {
            period: period,
            allSessions: allSessions,
            includeAllProperties: includeAllProperties,
            source: source,
            includeOnlyCompletedSessions: includeOnlyCompletedSessions
        };

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Test.TestSession[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/{team}/_apis/test/Session/{testSessionId}",
            routeValues: {
                project: project,
                team: team
            },
            queryParams: queryValues
        });
    }

    /**
     * Update a test session
     * 
     * @param testSession - Test session details for update
     * @param teamContext - The team context for the operation
     */
    public async updateTestSession(
        testSession: Test.TestSession,
        teamContext: TfsCore.TeamContext
        ): Promise<Test.TestSession> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Test.TestSession>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/{team}/_apis/test/Session/{testSessionId}",
            routeValues: {
                project: project,
                team: team
            },
            body: testSession
        });
    }

    /**
     * @param project - Project ID or project name
     * @param sharedParameterId - 
     */
    public async deleteSharedParameter(
        project: string,
        sharedParameterId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/test/SharedParameter/{sharedParameterId}",
            routeValues: {
                project: project,
                sharedParameterId: sharedParameterId
            }
        });
    }

    /**
     * @param project - Project ID or project name
     * @param sharedStepId - 
     */
    public async deleteSharedStep(
        project: string,
        sharedStepId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/test/SharedStep/{sharedStepId}",
            routeValues: {
                project: project,
                sharedStepId: sharedStepId
            }
        });
    }

    /**
     * Add test cases to suite.
     * 
     * @param project - Project ID or project name
     * @param planId - ID of the test plan that contains the suite.
     * @param suiteId - ID of the test suite to which the test cases must be added.
     * @param testCaseIds - IDs of the test cases to add to the suite. Ids are specified in comma separated format.
     */
    public async addTestCasesToSuite(
        project: string,
        planId: number,
        suiteId: number,
        testCaseIds: string
        ): Promise<Test.SuiteTestCase[]> {

        return this.beginRequest<Test.SuiteTestCase[]>({
            apiVersion: "7.1-preview.3",
            method: "POST",
            routeTemplate: "{project}/_apis/test/Plans/{planId}/Suites/{suiteId}/{action}/{testCaseIds}",
            routeValues: {
                project: project,
                planId: planId,
                suiteId: suiteId,
                testCaseIds: testCaseIds,
                action: "TestCases"
            }
        });
    }

    /**
     * Get a specific test case in a test suite with test case id.
     * 
     * @param project - Project ID or project name
     * @param planId - ID of the test plan that contains the suites.
     * @param suiteId - ID of the suite that contains the test case.
     * @param testCaseIds - ID of the test case to get.
     */
    public async getTestCaseById(
        project: string,
        planId: number,
        suiteId: number,
        testCaseIds: number
        ): Promise<Test.SuiteTestCase> {

        return this.beginRequest<Test.SuiteTestCase>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/_apis/test/Plans/{planId}/Suites/{suiteId}/{action}/{testCaseIds}",
            routeValues: {
                project: project,
                planId: planId,
                suiteId: suiteId,
                testCaseIds: testCaseIds,
                action: "TestCases"
            }
        });
    }

    /**
     * Get all test cases in a suite.
     * 
     * @param project - Project ID or project name
     * @param planId - ID of the test plan that contains the suites.
     * @param suiteId - ID of the suite to get.
     */
    public async getTestCases(
        project: string,
        planId: number,
        suiteId: number
        ): Promise<Test.SuiteTestCase[]> {

        return this.beginRequest<Test.SuiteTestCase[]>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/_apis/test/Plans/{planId}/Suites/{suiteId}/{action}/{testCaseIds}",
            routeValues: {
                project: project,
                planId: planId,
                suiteId: suiteId,
                action: "TestCases"
            }
        });
    }

    /**
     * The test points associated with the test cases are removed from the test suite. The test case work item is not deleted from the system. See test cases resource to delete a test case permanently.
     * 
     * @param project - Project ID or project name
     * @param planId - ID of the test plan that contains the suite.
     * @param suiteId - ID of the suite to get.
     * @param testCaseIds - IDs of the test cases to remove from the suite.
     */
    public async removeTestCasesFromSuiteUrl(
        project: string,
        planId: number,
        suiteId: number,
        testCaseIds: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.3",
            method: "DELETE",
            routeTemplate: "{project}/_apis/test/Plans/{planId}/Suites/{suiteId}/{action}/{testCaseIds}",
            routeValues: {
                project: project,
                planId: planId,
                suiteId: suiteId,
                testCaseIds: testCaseIds,
                action: "TestCases"
            }
        });
    }

    /**
     * Updates the properties of the test case association in a suite.
     * 
     * @param suiteTestCaseUpdateModel - Model for updation of the properties of test case suite association.
     * @param project - Project ID or project name
     * @param planId - ID of the test plan that contains the suite.
     * @param suiteId - ID of the test suite to which the test cases must be added.
     * @param testCaseIds - IDs of the test cases to add to the suite. Ids are specified in comma separated format.
     */
    public async updateSuiteTestCases(
        suiteTestCaseUpdateModel: Test.SuiteTestCaseUpdateModel,
        project: string,
        planId: number,
        suiteId: number,
        testCaseIds: string
        ): Promise<Test.SuiteTestCase[]> {

        return this.beginRequest<Test.SuiteTestCase[]>({
            apiVersion: "7.1-preview.3",
            method: "PATCH",
            routeTemplate: "{project}/_apis/test/Plans/{planId}/Suites/{suiteId}/{action}/{testCaseIds}",
            routeValues: {
                project: project,
                planId: planId,
                suiteId: suiteId,
                testCaseIds: testCaseIds,
                action: "TestCases"
            },
            body: suiteTestCaseUpdateModel
        });
    }

    /**
     * Delete a test case.
     * 
     * @param project - Project ID or project name
     * @param testCaseId - Id of test case to delete.
     */
    public async deleteTestCase(
        project: string,
        testCaseId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/test/TestCases/{testCaseId}",
            routeValues: {
                project: project,
                testCaseId: testCaseId
            }
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
            routeTemplate: "{project}/_apis/test/Results/TestHistory",
            routeValues: {
                project: project
            },
            body: filter
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
            routeTemplate: "{project}/_apis/test/TestSettings/{testSettingsId}",
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

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/test/TestSettings/{testSettingsId}",
            routeValues: {
                project: project,
                testSettingsId: testSettingsId
            }
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

        return this.beginRequest<Test.TestSettings>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/test/TestSettings/{testSettingsId}",
            routeValues: {
                project: project,
                testSettingsId: testSettingsId
            }
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
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/test/TestMethods/WorkItems",
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
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/test/TestMethods/{testName}/WorkItems/{workItemId}",
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
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/test/TestMethods/{testName}/WorkItems/{workItemId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * @param project - Project ID or project name
     * @param workItemCategory - 
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
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/test/Results/WorkItems",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

}
