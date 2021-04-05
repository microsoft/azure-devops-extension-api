/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as TestPlan from "../TestPlan/TestPlan";

export class TestPlanRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    /**
     * Create a test configuration.
     * 
     * @param testConfigurationCreateUpdateParameters - TestConfigurationCreateUpdateParameters
     * @param project - Project ID or project name
     */
    public async createTestConfiguration(
        testConfigurationCreateUpdateParameters: TestPlan.TestConfigurationCreateUpdateParameters,
        project: string
        ): Promise<TestPlan.TestConfiguration> {

        return this.beginRequest<TestPlan.TestConfiguration>({
            apiVersion: "5.2-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/testplan/Configurations/{testConfigurationId}",
            routeValues: {
                project: project
            },
            body: testConfigurationCreateUpdateParameters
        });
    }

    /**
     * Delete a test configuration by its ID.
     * 
     * @param project - Project ID or project name
     * @param testConfiguartionId - ID of the test configuration to delete.
     */
    public async deleteTestConfiguration(
        project: string,
        testConfiguartionId: number
        ): Promise<void> {

        const queryValues: any = {
            testConfiguartionId: testConfiguartionId
        };

        return this.beginRequest<void>({
            apiVersion: "5.2-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/testplan/Configurations/{testConfigurationId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a test configuration
     * 
     * @param project - Project ID or project name
     * @param testConfigurationId - ID of the test configuration to get.
     */
    public async getTestConfigurationById(
        project: string,
        testConfigurationId: number
        ): Promise<TestPlan.TestConfiguration> {

        return this.beginRequest<TestPlan.TestConfiguration>({
            apiVersion: "5.2-preview.1",
            routeTemplate: "{project}/_apis/testplan/Configurations/{testConfigurationId}",
            routeValues: {
                project: project,
                testConfigurationId: testConfigurationId
            }
        });
    }

    /**
     * Get a list of test configurations.
     * 
     * @param project - Project ID or project name
     * @param continuationToken - If the list of configurations returned is not complete, a continuation token to query next batch of configurations is included in the response header as "x-ms-continuationtoken". Omit this parameter to get the first batch of test configurations.
     */
    public async getTestConfigurations(
        project: string,
        continuationToken?: string
        ): Promise<TestPlan.TestConfiguration[]> {

        const queryValues: any = {
            continuationToken: continuationToken
        };

        return this.beginRequest<TestPlan.TestConfiguration[]>({
            apiVersion: "5.2-preview.1",
            routeTemplate: "{project}/_apis/testplan/Configurations/{testConfigurationId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Update a test configuration by its ID.
     * 
     * @param testConfigurationCreateUpdateParameters - TestConfigurationCreateUpdateParameters
     * @param project - Project ID or project name
     * @param testConfiguartionId - ID of the test configuration to update.
     */
    public async updateTestConfiguration(
        testConfigurationCreateUpdateParameters: TestPlan.TestConfigurationCreateUpdateParameters,
        project: string,
        testConfiguartionId: number
        ): Promise<TestPlan.TestConfiguration> {

        const queryValues: any = {
            testConfiguartionId: testConfiguartionId
        };

        return this.beginRequest<TestPlan.TestConfiguration>({
            apiVersion: "5.2-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/testplan/Configurations/{testConfigurationId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            body: testConfigurationCreateUpdateParameters
        });
    }

    /**
     * @param project - Project ID or project name
     * @param planId - 
     * @param states - 
     * @param outcome - 
     * @param configurations - 
     * @param testers - 
     * @param assignedTo - 
     */
    public async getTestPointCountByPlanId(
        project: string,
        planId: number,
        states?: string,
        outcome?: TestPlan.UserFriendlyTestOutcome,
        configurations?: string,
        testers?: string,
        assignedTo?: string
        ): Promise<TestPlan.TestPointCount[]> {

        const queryValues: any = {
            states: states,
            outcome: outcome,
            configurations: configurations,
            testers: testers,
            assignedTo: assignedTo
        };

        return this.beginRequest<TestPlan.TestPointCount[]>({
            apiVersion: "5.2-preview.1",
            routeTemplate: "{project}/_apis/testplan/Count/{planId}",
            routeValues: {
                project: project,
                planId: planId
            },
            queryParams: queryValues
        });
    }

    /**
     * Create a test plan.
     * 
     * @param testPlanCreateParams - A testPlanCreateParams object.TestPlanCreateParams
     * @param project - Project ID or project name
     */
    public async createTestPlan(
        testPlanCreateParams: TestPlan.TestPlanCreateParams,
        project: string
        ): Promise<TestPlan.TestPlan> {

        return this.beginRequest<TestPlan.TestPlan>({
            apiVersion: "5.2-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/testplan/Plans/{planId}",
            routeValues: {
                project: project
            },
            body: testPlanCreateParams
        });
    }

    /**
     * Delete a test plan.
     * 
     * @param project - Project ID or project name
     * @param planId - ID of the test plan to be deleted.
     */
    public async deleteTestPlan(
        project: string,
        planId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "5.2-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/testplan/Plans/{planId}",
            routeValues: {
                project: project,
                planId: planId
            }
        });
    }

    /**
     * Get a test plan by Id.
     * 
     * @param project - Project ID or project name
     * @param planId - ID of the test plan to get.
     */
    public async getTestPlanById(
        project: string,
        planId: number
        ): Promise<TestPlan.TestPlan> {

        return this.beginRequest<TestPlan.TestPlan>({
            apiVersion: "5.2-preview.1",
            routeTemplate: "{project}/_apis/testplan/Plans/{planId}",
            routeValues: {
                project: project,
                planId: planId
            }
        });
    }

    /**
     * Get a list of test plans
     * 
     * @param project - Project ID or project name
     * @param owner - Filter for test plan by owner ID or name
     * @param continuationToken - If the list of plans returned is not complete, a continuation token to query next batch of plans is included in the response header as "x-ms-continuationtoken". Omit this parameter to get the first batch of test plans.
     * @param includePlanDetails - Get all properties of the test plan
     * @param filterActivePlans - Get just the active plans
     */
    public async getTestPlans(
        project: string,
        owner?: string,
        continuationToken?: string,
        includePlanDetails?: boolean,
        filterActivePlans?: boolean
        ): Promise<TestPlan.TestPlan[]> {

        const queryValues: any = {
            owner: owner,
            continuationToken: continuationToken,
            includePlanDetails: includePlanDetails,
            filterActivePlans: filterActivePlans
        };

        return this.beginRequest<TestPlan.TestPlan[]>({
            apiVersion: "5.2-preview.1",
            routeTemplate: "{project}/_apis/testplan/Plans/{planId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Update a test plan.
     * 
     * @param testPlanUpdateParams - A testPlanUpdateParams object.TestPlanUpdateParams
     * @param project - Project ID or project name
     * @param planId - ID of the test plan to be updated.
     */
    public async updateTestPlan(
        testPlanUpdateParams: TestPlan.TestPlanUpdateParams,
        project: string,
        planId: number
        ): Promise<TestPlan.TestPlan> {

        return this.beginRequest<TestPlan.TestPlan>({
            apiVersion: "5.2-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/testplan/Plans/{planId}",
            routeValues: {
                project: project,
                planId: planId
            },
            body: testPlanUpdateParams
        });
    }

    /**
     * Get a list of test suite entries in the test suite.
     * 
     * @param project - Project ID or project name
     * @param suiteId - Id of the parent suite.
     * @param suiteEntryType - 
     */
    public async getSuiteEntries(
        project: string,
        suiteId: number,
        suiteEntryType?: TestPlan.SuiteEntryTypes
        ): Promise<TestPlan.SuiteEntry[]> {

        const queryValues: any = {
            suiteEntryType: suiteEntryType
        };

        return this.beginRequest<TestPlan.SuiteEntry[]>({
            apiVersion: "5.2-preview.1",
            routeTemplate: "{project}/_apis/testplan/SuiteEntry/{suiteId}",
            routeValues: {
                project: project,
                suiteId: suiteId
            },
            queryParams: queryValues
        });
    }

    /**
     * Reorder test suite entries in the test suite.
     * 
     * @param suiteEntries - List of SuiteEntry to reorder.
     * @param project - Project ID or project name
     * @param suiteId - Id of the parent test suite.
     */
    public async reorderSuiteEntries(
        suiteEntries: TestPlan.SuiteEntryUpdateParams[],
        project: string,
        suiteId: number
        ): Promise<TestPlan.SuiteEntry[]> {

        return this.beginRequest<TestPlan.SuiteEntry[]>({
            apiVersion: "5.2-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/testplan/SuiteEntry/{suiteId}",
            routeValues: {
                project: project,
                suiteId: suiteId
            },
            body: suiteEntries
        });
    }

    /**
     * Create test suite.
     * 
     * @param testSuiteCreateParams - Parameters for suite creation
     * @param project - Project ID or project name
     * @param planId - ID of the test plan that contains the suites.
     */
    public async createTestSuite(
        testSuiteCreateParams: TestPlan.TestSuiteCreateParams,
        project: string,
        planId: number
        ): Promise<TestPlan.TestSuite> {

        return this.beginRequest<TestPlan.TestSuite>({
            apiVersion: "5.2-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/testplan/Plans/{planId}/Suites/{suiteId}",
            routeValues: {
                project: project,
                planId: planId
            },
            body: testSuiteCreateParams
        });
    }

    /**
     * Delete test suite.
     * 
     * @param project - Project ID or project name
     * @param planId - ID of the test plan that contains the suite.
     * @param suiteId - ID of the test suite to delete.
     */
    public async deleteTestSuite(
        project: string,
        planId: number,
        suiteId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "5.2-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/testplan/Plans/{planId}/Suites/{suiteId}",
            routeValues: {
                project: project,
                planId: planId,
                suiteId: suiteId
            }
        });
    }

    /**
     * Get test suite by suite id.
     * 
     * @param project - Project ID or project name
     * @param planId - ID of the test plan that contains the suites.
     * @param suiteId - ID of the suite to get.
     * @param expand - Include the children suites and testers details
     */
    public async getTestSuiteById(
        project: string,
        planId: number,
        suiteId: number,
        expand?: TestPlan.SuiteExpand
        ): Promise<TestPlan.TestSuite> {

        const queryValues: any = {
            expand: expand
        };

        return this.beginRequest<TestPlan.TestSuite>({
            apiVersion: "5.2-preview.1",
            routeTemplate: "{project}/_apis/testplan/Plans/{planId}/Suites/{suiteId}",
            routeValues: {
                project: project,
                planId: planId,
                suiteId: suiteId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get test suites for plan.
     * 
     * @param project - Project ID or project name
     * @param planId - ID of the test plan for which suites are requested.
     * @param expand - Include the children suites and testers details.
     * @param continuationToken - If the list of suites returned is not complete, a continuation token to query next batch of suites is included in the response header as "x-ms-continuationtoken". Omit this parameter to get the first batch of test suites.
     * @param asTreeView - If the suites returned should be in a tree structure.
     */
    public async getTestSuitesForPlan(
        project: string,
        planId: number,
        expand?: TestPlan.SuiteExpand,
        continuationToken?: string,
        asTreeView?: boolean
        ): Promise<TestPlan.TestSuite[]> {

        const queryValues: any = {
            expand: expand,
            continuationToken: continuationToken,
            asTreeView: asTreeView
        };

        return this.beginRequest<TestPlan.TestSuite[]>({
            apiVersion: "5.2-preview.1",
            routeTemplate: "{project}/_apis/testplan/Plans/{planId}/Suites/{suiteId}",
            routeValues: {
                project: project,
                planId: planId
            },
            queryParams: queryValues
        });
    }

    /**
     * Update test suite.
     * 
     * @param testSuiteUpdateParams - Parameters for suite updation
     * @param project - Project ID or project name
     * @param planId - ID of the test plan that contains the suites.
     * @param suiteId - ID of the parent suite.
     */
    public async updateTestSuite(
        testSuiteUpdateParams: TestPlan.TestSuiteUpdateParams,
        project: string,
        planId: number,
        suiteId: number
        ): Promise<TestPlan.TestSuite> {

        return this.beginRequest<TestPlan.TestSuite>({
            apiVersion: "5.2-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/testplan/Plans/{planId}/Suites/{suiteId}",
            routeValues: {
                project: project,
                planId: planId,
                suiteId: suiteId
            },
            body: testSuiteUpdateParams
        });
    }

    /**
     * Find the list of all test suites in which a given test case is present. This is helpful if you need to find out which test suites are using a test case, when you need to make changes to a test case.
     * 
     * @param testCaseId - ID of the test case for which suites need to be fetched.
     */
    public async getSuitesByTestCaseId(
        testCaseId: number
        ): Promise<TestPlan.TestSuite[]> {

        const queryValues: any = {
            testCaseId: testCaseId
        };

        return this.beginRequest<TestPlan.TestSuite[]>({
            apiVersion: "5.2-preview.1",
            routeTemplate: "_apis/testplan/Suites",
            queryParams: queryValues
        });
    }

    /**
     * Add test cases to a suite with specified configurations
     * 
     * @param suiteTestCaseCreateUpdateParameters - SuiteTestCaseCreateUpdateParameters object.
     * @param project - Project ID or project name
     * @param planId - ID of the test plan to which test cases are to be added.
     * @param suiteId - ID of the test suite to which test cases are to be added.
     */
    public async addTestCasesToSuite(
        suiteTestCaseCreateUpdateParameters: TestPlan.SuiteTestCaseCreateUpdateParameters[],
        project: string,
        planId: number,
        suiteId: number
        ): Promise<TestPlan.TestCase[]> {

        return this.beginRequest<TestPlan.TestCase[]>({
            apiVersion: "5.2-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/testplan/Plans/{planId}/Suites/{suiteId}/TestCase/{testCaseIds}",
            routeValues: {
                project: project,
                planId: planId,
                suiteId: suiteId
            },
            body: suiteTestCaseCreateUpdateParameters
        });
    }

    /**
     * Get Test Cases For a Suite.
     * 
     * @param project - Project ID or project name
     * @param planId - ID of the test plan for which test cases are requested.
     * @param suiteId - ID of the test suite for which test cases are requested.
     * @param testCaseIds - Test Case Ids to be fetched.
     * @param witFields - Get the list of witFields.
     * @param returnIdentityRef - If set to true, returns all identity fields, like AssignedTo, ActivatedBy etc., as IdentityRef objects. If set to false, these fields are returned as unique names in string format. This is false by default.
     */
    public async getTestCase(
        project: string,
        planId: number,
        suiteId: number,
        testCaseIds: string,
        witFields?: string,
        returnIdentityRef?: boolean
        ): Promise<TestPlan.TestCase[]> {

        const queryValues: any = {
            witFields: witFields,
            returnIdentityRef: returnIdentityRef
        };

        return this.beginRequest<TestPlan.TestCase[]>({
            apiVersion: "5.2-preview.2",
            routeTemplate: "{project}/_apis/testplan/Plans/{planId}/Suites/{suiteId}/TestCase/{testCaseIds}",
            routeValues: {
                project: project,
                planId: planId,
                suiteId: suiteId,
                testCaseIds: testCaseIds
            },
            queryParams: queryValues
        });
    }

    /**
     * Get Test Case List return those test cases which have all the configuration Ids as mentioned in the optional paramter. If configuration Ids is null, it return all the test cases
     * 
     * @param project - Project ID or project name
     * @param planId - ID of the test plan for which test cases are requested.
     * @param suiteId - ID of the test suite for which test cases are requested.
     * @param testIds - Test Case Ids to be fetched.
     * @param configurationIds - Fetch Test Cases which contains all the configuration Ids specified.
     * @param witFields - Get the list of witFields.
     * @param continuationToken - If the list of test cases returned is not complete, a continuation token to query next batch of test cases is included in the response header as "x-ms-continuationtoken". Omit this parameter to get the first batch of test cases.
     * @param returnIdentityRef - If set to true, returns all identity fields, like AssignedTo, ActivatedBy etc., as IdentityRef objects. If set to false, these fields are returned as unique names in string format. This is false by default.
     * @param expand - If set to false, will get a smaller payload containing only basic details about the suite test case object
     * @param excludeFlags - Flag to exclude various values from payload. For example to remove point assignments pass exclude = 1. To remove extra information (links, test plan , test suite) pass exclude = 2. To remove both extra information and point assignments pass exclude = 3 (1 + 2).
     */
    public async getTestCaseList(
        project: string,
        planId: number,
        suiteId: number,
        testIds?: string,
        configurationIds?: string,
        witFields?: string,
        continuationToken?: string,
        returnIdentityRef?: boolean,
        expand?: boolean,
        excludeFlags?: TestPlan.ExcludeFlags
        ): Promise<TestPlan.TestCase[]> {

        const queryValues: any = {
            testIds: testIds,
            configurationIds: configurationIds,
            witFields: witFields,
            continuationToken: continuationToken,
            returnIdentityRef: returnIdentityRef,
            expand: expand,
            excludeFlags: excludeFlags
        };

        return this.beginRequest<TestPlan.TestCase[]>({
            apiVersion: "5.2-preview.2",
            routeTemplate: "{project}/_apis/testplan/Plans/{planId}/Suites/{suiteId}/TestCase/{testCaseIds}",
            routeValues: {
                project: project,
                planId: planId,
                suiteId: suiteId
            },
            queryParams: queryValues
        });
    }

    /**
     * Removes test cases from a suite based on the list of test case Ids provided.
     * 
     * @param project - Project ID or project name
     * @param planId - ID of the test plan from which test cases are to be removed.
     * @param suiteId - ID of the test suite from which test cases are to be removed.
     * @param testCaseIds - Test Case Ids to be removed.
     */
    public async removeTestCasesFromSuite(
        project: string,
        planId: number,
        suiteId: number,
        testCaseIds: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "5.2-preview.2",
            method: "DELETE",
            routeTemplate: "{project}/_apis/testplan/Plans/{planId}/Suites/{suiteId}/TestCase/{testCaseIds}",
            routeValues: {
                project: project,
                planId: planId,
                suiteId: suiteId,
                testCaseIds: testCaseIds
            }
        });
    }

    /**
     * Update the configurations for test cases
     * 
     * @param suiteTestCaseCreateUpdateParameters - A SuiteTestCaseCreateUpdateParameters object.
     * @param project - Project ID or project name
     * @param planId - ID of the test plan to which test cases are to be updated.
     * @param suiteId - ID of the test suite to which test cases are to be updated.
     */
    public async updateSuiteTestCases(
        suiteTestCaseCreateUpdateParameters: TestPlan.SuiteTestCaseCreateUpdateParameters[],
        project: string,
        planId: number,
        suiteId: number
        ): Promise<TestPlan.TestCase[]> {

        return this.beginRequest<TestPlan.TestCase[]>({
            apiVersion: "5.2-preview.2",
            method: "PATCH",
            routeTemplate: "{project}/_apis/testplan/Plans/{planId}/Suites/{suiteId}/TestCase/{testCaseIds}",
            routeValues: {
                project: project,
                planId: planId,
                suiteId: suiteId
            },
            body: suiteTestCaseCreateUpdateParameters
        });
    }

    /**
     * Delete a test case.
     * 
     * @param project - Project ID or project name
     * @param testCaseId - Id of test case to be deleted.
     */
    public async deleteTestCase(
        project: string,
        testCaseId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "5.2-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/testplan/TestCases/{testCaseId}",
            routeValues: {
                project: project,
                testCaseId: testCaseId
            }
        });
    }

    /**
     * Clone test plan
     * 
     * @param cloneRequestBody - Plan Clone Request Body detail TestPlanCloneRequest
     * @param project - Project ID or project name
     * @param deepClone - Clones all the associated test cases as well
     */
    public async cloneTestPlan(
        cloneRequestBody: TestPlan.CloneTestPlanParams,
        project: string,
        deepClone?: boolean
        ): Promise<TestPlan.CloneTestPlanOperationInformation> {

        const queryValues: any = {
            deepClone: deepClone
        };

        return this.beginRequest<TestPlan.CloneTestPlanOperationInformation>({
            apiVersion: "5.2-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/testplan/Plans/CloneOperation/{cloneOperationId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            body: cloneRequestBody
        });
    }

    /**
     * Get clone information.
     * 
     * @param project - Project ID or project name
     * @param cloneOperationId - Operation ID returned when we queue a clone operation
     */
    public async getCloneInformation(
        project: string,
        cloneOperationId: number
        ): Promise<TestPlan.CloneTestPlanOperationInformation> {

        return this.beginRequest<TestPlan.CloneTestPlanOperationInformation>({
            apiVersion: "5.2-preview.2",
            routeTemplate: "{project}/_apis/testplan/Plans/CloneOperation/{cloneOperationId}",
            routeValues: {
                project: project,
                cloneOperationId: cloneOperationId
            }
        });
    }

    /**
     * Get a list of points based on point Ids provided.
     * 
     * @param project - Project ID or project name
     * @param planId - ID of the test plan for which test points are requested.
     * @param suiteId - ID of the test suite for which test points are requested.
     * @param pointIds - ID of test points to be fetched.
     * @param returnIdentityRef - If set to true, returns the AssignedTo field in TestCaseReference as IdentityRef object.
     * @param includePointDetails - If set to false, will get a smaller payload containing only basic details about the test point object
     */
    public async getPoints(
        project: string,
        planId: number,
        suiteId: number,
        pointIds: string,
        returnIdentityRef?: boolean,
        includePointDetails?: boolean
        ): Promise<TestPlan.TestPoint[]> {

        const queryValues: any = {
            returnIdentityRef: returnIdentityRef,
            includePointDetails: includePointDetails
        };

        return this.beginRequest<TestPlan.TestPoint[]>({
            apiVersion: "5.2-preview.2",
            routeTemplate: "{project}/_apis/testplan/Plans/{planId}/Suites/{suiteId}/TestPoint/{pointIds}",
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
     * Get all the points inside a suite based on some filters
     * 
     * @param project - Project ID or project name
     * @param planId - ID of the test plan for which test points are requested.
     * @param suiteId - ID of the test suite for which test points are requested
     * @param testPointIds - ID of test points to fetch.
     * @param testCaseId - Get Test Points for specific test case Ids.
     * @param continuationToken - If the list of test point returned is not complete, a continuation token to query next batch of test points is included in the response header as "x-ms-continuationtoken". Omit this parameter to get the first batch of test points.
     * @param returnIdentityRef - If set to true, returns the AssignedTo field in TestCaseReference as IdentityRef object.
     * @param includePointDetails - If set to false, will get a smaller payload containing only basic details about the test point object
     */
    public async getPointsList(
        project: string,
        planId: number,
        suiteId: number,
        testPointIds?: string,
        testCaseId?: string,
        continuationToken?: string,
        returnIdentityRef?: boolean,
        includePointDetails?: boolean
        ): Promise<TestPlan.TestPoint[]> {

        const queryValues: any = {
            testPointIds: testPointIds,
            testCaseId: testCaseId,
            continuationToken: continuationToken,
            returnIdentityRef: returnIdentityRef,
            includePointDetails: includePointDetails
        };

        return this.beginRequest<TestPlan.TestPoint[]>({
            apiVersion: "5.2-preview.2",
            routeTemplate: "{project}/_apis/testplan/Plans/{planId}/Suites/{suiteId}/TestPoint/{pointIds}",
            routeValues: {
                project: project,
                planId: planId,
                suiteId: suiteId
            },
            queryParams: queryValues
        });
    }

    /**
     * Update Test Points. This is used to Reset test point to active, update the outcome of a test point or update the tester of a test point
     * 
     * @param testPointUpdateParams - A TestPointUpdateParams Object.
     * @param project - Project ID or project name
     * @param planId - ID of the test plan for which test points are requested.
     * @param suiteId - ID of the test suite for which test points are requested.
     * @param includePointDetails - If set to false, will get a smaller payload containing only basic details about the test point object
     * @param returnIdentityRef - If set to true, returns the AssignedTo field in TestCaseReference as IdentityRef object.
     */
    public async updateTestPoints(
        testPointUpdateParams: TestPlan.TestPointUpdateParams[],
        project: string,
        planId: number,
        suiteId: number,
        includePointDetails?: boolean,
        returnIdentityRef?: boolean
        ): Promise<TestPlan.TestPoint[]> {

        const queryValues: any = {
            includePointDetails: includePointDetails,
            returnIdentityRef: returnIdentityRef
        };

        return this.beginRequest<TestPlan.TestPoint[]>({
            apiVersion: "5.2-preview.2",
            method: "PATCH",
            routeTemplate: "{project}/_apis/testplan/Plans/{planId}/Suites/{suiteId}/TestPoint/{pointIds}",
            routeValues: {
                project: project,
                planId: planId,
                suiteId: suiteId
            },
            queryParams: queryValues,
            body: testPointUpdateParams
        });
    }

    /**
     * Clone test suite
     * 
     * @param cloneRequestBody - Suite Clone Request Body detail TestSuiteCloneRequest
     * @param project - Project ID or project name
     * @param deepClone - Clones all the associated test cases as well
     */
    public async cloneTestSuite(
        cloneRequestBody: TestPlan.CloneTestSuiteParams,
        project: string,
        deepClone?: boolean
        ): Promise<TestPlan.CloneTestSuiteOperationInformation> {

        const queryValues: any = {
            deepClone: deepClone
        };

        return this.beginRequest<TestPlan.CloneTestSuiteOperationInformation>({
            apiVersion: "5.2-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/testplan/Suites/CloneOperation/{cloneOperationId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            body: cloneRequestBody
        });
    }

    /**
     * Get clone information.
     * 
     * @param project - Project ID or project name
     * @param cloneOperationId - Operation ID returned when we queue a clone operation
     */
    public async getSuiteCloneInformation(
        project: string,
        cloneOperationId: number
        ): Promise<TestPlan.CloneTestSuiteOperationInformation> {

        return this.beginRequest<TestPlan.CloneTestSuiteOperationInformation>({
            apiVersion: "5.2-preview.2",
            routeTemplate: "{project}/_apis/testplan/Suites/CloneOperation/{cloneOperationId}",
            routeValues: {
                project: project,
                cloneOperationId: cloneOperationId
            }
        });
    }

    /**
     * Create a test variable.
     * 
     * @param testVariableCreateUpdateParameters - TestVariableCreateUpdateParameters
     * @param project - Project ID or project name
     */
    public async createTestVariable(
        testVariableCreateUpdateParameters: TestPlan.TestVariableCreateUpdateParameters,
        project: string
        ): Promise<TestPlan.TestVariable> {

        return this.beginRequest<TestPlan.TestVariable>({
            apiVersion: "5.2-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/testplan/Variables/{testVariableId}",
            routeValues: {
                project: project
            },
            body: testVariableCreateUpdateParameters
        });
    }

    /**
     * Delete a test variable by its ID.
     * 
     * @param project - Project ID or project name
     * @param testVariableId - ID of the test variable to delete.
     */
    public async deleteTestVariable(
        project: string,
        testVariableId: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "5.2-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/testplan/Variables/{testVariableId}",
            routeValues: {
                project: project,
                testVariableId: testVariableId
            }
        });
    }

    /**
     * Get a test variable by its ID.
     * 
     * @param project - Project ID or project name
     * @param testVariableId - ID of the test variable to get.
     */
    public async getTestVariableById(
        project: string,
        testVariableId: number
        ): Promise<TestPlan.TestVariable> {

        return this.beginRequest<TestPlan.TestVariable>({
            apiVersion: "5.2-preview.1",
            routeTemplate: "{project}/_apis/testplan/Variables/{testVariableId}",
            routeValues: {
                project: project,
                testVariableId: testVariableId
            }
        });
    }

    /**
     * Get a list of test variables.
     * 
     * @param project - Project ID or project name
     * @param continuationToken - If the list of variables returned is not complete, a continuation token to query next batch of variables is included in the response header as "x-ms-continuationtoken". Omit this parameter to get the first batch of test variables.
     */
    public async getTestVariables(
        project: string,
        continuationToken?: string
        ): Promise<TestPlan.TestVariable[]> {

        const queryValues: any = {
            continuationToken: continuationToken
        };

        return this.beginRequest<TestPlan.TestVariable[]>({
            apiVersion: "5.2-preview.1",
            routeTemplate: "{project}/_apis/testplan/Variables/{testVariableId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Update a test variable by its ID.
     * 
     * @param testVariableCreateUpdateParameters - TestVariableCreateUpdateParameters
     * @param project - Project ID or project name
     * @param testVariableId - ID of the test variable to update.
     */
    public async updateTestVariable(
        testVariableCreateUpdateParameters: TestPlan.TestVariableCreateUpdateParameters,
        project: string,
        testVariableId: number
        ): Promise<TestPlan.TestVariable> {

        return this.beginRequest<TestPlan.TestVariable>({
            apiVersion: "5.2-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/testplan/Variables/{testVariableId}",
            routeValues: {
                project: project,
                testVariableId: testVariableId
            },
            body: testVariableCreateUpdateParameters
        });
    }

}
