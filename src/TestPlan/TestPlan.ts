﻿/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import * as TfsCore from "../Core/Core";
import * as Test from "../Test/Test";
import * as WebApi from "../WebApi/WebApi";

/**
 * The build definition reference resource
 */
export interface BuildDefinitionReference {
    /**
     * ID of the build definition
     */
    id: number;
    /**
     * Name of the build definition
     */
    name: string;
}

/**
 * Common Response for clone operation
 */
export interface CloneOperationCommonResponse {
    /**
     * Various statistics related to the clone operation
     */
    cloneStatistics: Test.CloneStatistics;
    /**
     * Completion data of the operation
     */
    completionDate: Date;
    /**
     * Creation data of the operation
     */
    creationDate: Date;
    /**
     * Reference links
     */
    links: any;
    /**
     * Message related to the job
     */
    message: string;
    /**
     * Clone operation Id
     */
    opId: number;
    /**
     * Clone operation state
     */
    state: Test.CloneOperationState;
}

/**
 * Response for Test Plan clone operation
 */
export interface CloneTestPlanOperationInformation {
    /**
     * Various information related to the clone
     */
    cloneOperationResponse: CloneOperationCommonResponse;
    /**
     * Test Plan Clone create parameters
     */
    cloneOptions: Test.CloneOptions;
    /**
     * Information of destination Test Plan
     */
    destinationTestPlan: TestPlan;
    /**
     * Information of source Test Plan
     */
    sourceTestPlan: SourceTestplanResponse;
}

/**
 * Parameters for Test Plan clone operation
 */
export interface CloneTestPlanParams {
    /**
     * Test Plan Clone create parameters
     */
    cloneOptions: Test.CloneOptions;
    /**
     * Information about destination Test Plan
     */
    destinationTestPlan: DestinationTestPlanCloneParams;
    /**
     * Information about source Test Plan
     */
    sourceTestPlan: SourceTestPlanInfo;
}

/**
 * Response for Test Suite clone operation
 */
export interface CloneTestSuiteOperationInformation {
    /**
     * Information of newly cloned Test Suite
     */
    clonedTestSuite: TestSuiteReferenceWithProject;
    /**
     * Various information related to the clone
     */
    cloneOperationResponse: CloneOperationCommonResponse;
    /**
     * Test Plan Clone create parameters
     */
    cloneOptions: Test.CloneOptions;
    /**
     * Information of destination Test Suite
     */
    destinationTestSuite: TestSuiteReferenceWithProject;
    /**
     * Information of source Test Suite
     */
    sourceTestSuite: TestSuiteReferenceWithProject;
}

/**
 * Parameters for Test Suite clone operation
 */
export interface CloneTestSuiteParams {
    /**
     * Test Plan Clone create parameters
     */
    cloneOptions: Test.CloneOptions;
    /**
     * Information about destination Test Suite
     */
    destinationTestSuite: DestinationTestSuiteInfo;
    /**
     * Information about source Test Suite
     */
    sourceTestSuite: SourceTestSuiteInfo;
}

/**
 * Configuration of the Test Point
 */
export interface Configuration {
    /**
     * Id of the Configuration Assigned to the Test Point
     */
    configurationId: number;
}

/**
 * Destination Test Plan create parameters
 */
export interface DestinationTestPlanCloneParams extends TestPlanCreateParams {
    /**
     * Destination Project Name
     */
    project: string;
}

/**
 * Destination Test Suite information for Test Suite clone operation
 */
export interface DestinationTestSuiteInfo {
    /**
     * Destination Suite Id
     */
    id: number;
    /**
     * Destination Project Name
     */
    project: string;
}

/**
 * Exclude Flags for suite test case object. Exclude Flags exclude various objects from payload depending on the value passed
 */
export enum ExcludeFlags {
    /**
     * To exclude nothing
     */
    None = 0,
    /**
     * To exclude point assignments, pass exclude = 1
     */
    PointAssignments = 1,
    /**
     * To exclude extra information (links, test plan, test suite), pass exclude = 2
     */
    ExtraInformation = 2
}

export enum FailureType {
    None = 0,
    Regression = 1,
    New_Issue = 2,
    Known_Issue = 3,
    Unknown = 4,
    Null_Value = 5,
    MaxValue = 5
}

export enum LastResolutionState {
    None = 0,
    NeedsInvestigation = 1,
    TestIssue = 2,
    ProductIssue = 3,
    ConfigurationIssue = 4,
    NullValue = 5,
    MaxValue = 5
}

export enum Outcome {
    /**
     * Only used during an update to preserve the existing value.
     */
    Unspecified = 0,
    /**
     * Test has not been completed, or the test type does not report pass/failure.
     */
    None = 1,
    /**
     * Test was executed w/o any issues.
     */
    Passed = 2,
    /**
     * Test was executed, but there were issues. Issues may involve exceptions or failed assertions.
     */
    Failed = 3,
    /**
     * Test has completed, but we can't say if it passed or failed. May be used for aborted tests...
     */
    Inconclusive = 4,
    /**
     * The test timed out
     */
    Timeout = 5,
    /**
     * Test was aborted. This was not caused by a user gesture, but rather by a framework decision.
     */
    Aborted = 6,
    /**
     * Test had it chance for been executed but was not, as ITestElement.IsRunnable == false.
     */
    Blocked = 7,
    /**
     * Test was not executed. This was caused by a user gesture - e.g. user hit stop button.
     */
    NotExecuted = 8,
    /**
     * To be used by Run level results. This is not a failure.
     */
    Warning = 9,
    /**
     * There was a system error while we were trying to execute a test.
     */
    Error = 10,
    /**
     * Test is Not Applicable for execution.
     */
    NotApplicable = 11,
    /**
     * Test is paused.
     */
    Paused = 12,
    /**
     * Test is currently executing. Added this for TCM charts
     */
    InProgress = 13,
    /**
     * Test is not impacted. Added fot TIA.
     */
    NotImpacted = 14,
    MaxValue = 14
}

/**
 * Assignments for the Test Point
 */
export interface PointAssignment extends Configuration {
    /**
     * Name of the Configuration Assigned to the Test Point
     */
    configurationName: string;
    /**
     * Id of the Test Point
     */
    id: number;
    /**
     * Tester Assigned to the Test Point
     */
    tester: WebApi.IdentityRef;
}

export enum PointState {
    /**
     * Default
     */
    None = 0,
    /**
     * The test point needs to be executed in order for the test pass to be considered complete.  Either the test has not been run before or the previous run failed.
     */
    Ready = 1,
    /**
     * The test has passed successfully and does not need to be re-run for the test pass to be considered complete.
     */
    Completed = 2,
    /**
     * The test point needs to be executed but is not able to.
     */
    NotReady = 3,
    /**
     * The test is being executed.
     */
    InProgress = 4,
    MaxValue = 4
}

/**
 * Results class for Test Point
 */
export interface Results {
    /**
     * Outcome of the Test Point
     */
    outcome: Outcome;
}

export enum ResultState {
    /**
     * Only used during an update to preserve the existing value.
     */
    Unspecified = 0,
    /**
     * Test is in the execution queue, was not started yet.
     */
    Pending = 1,
    /**
     * Test has been queued. This is applicable when a test case is queued for execution
     */
    Queued = 2,
    /**
     * Test is currently executing.
     */
    InProgress = 3,
    /**
     * Test has been paused. This is applicable when a test case is paused by the user (For e.g. Manual Tester can pause the execution of the manual test case)
     */
    Paused = 4,
    /**
     * Test has completed, but there is no quantitative measure of completeness. This may apply to load tests.
     */
    Completed = 5,
    MaxValue = 5
}

/**
 * Source Test Plan information for Test Plan clone operation
 */
export interface SourceTestPlanInfo {
    /**
     * ID of the source Test Plan
     */
    id: number;
    /**
     * Id of suites to be cloned inside source Test Plan
     */
    suiteIds: number[];
}

/**
 * Source Test Plan Response for Test Plan clone operation
 */
export interface SourceTestplanResponse extends TestPlanReference {
    /**
     * project reference
     */
    project: TfsCore.TeamProjectReference;
    /**
     * Id of suites to be cloned inside source Test Plan
     */
    suiteIds: number[];
}

/**
 * Source Test Suite information for Test Suite clone operation
 */
export interface SourceTestSuiteInfo {
    /**
     * Id of the Source Test Suite
     */
    id: number;
}

/**
 * A suite entry defines properties for a test suite.
 */
export interface SuiteEntry extends SuiteEntryUpdateParams {
    /**
     * Id for the test suite.
     */
    suiteId: number;
}

export enum SuiteEntryTypes {
    /**
     * Test Case
     */
    TestCase = 0,
    /**
     * Child Suite
     */
    Suite = 1
}

/**
 * A suite entry defines properties for a test suite.
 */
export interface SuiteEntryUpdateParams {
    /**
     * Id of the suite entry in the test suite: either a test case id or child suite id.
     */
    id: number;
    /**
     * Sequence number for the suite entry object in the test suite.
     */
    sequenceNumber: number;
    /**
     * Defines whether the entry is of type test case or suite.
     */
    suiteEntryType: SuiteEntryTypes;
}

/**
 * Option to get details in response
 */
export enum SuiteExpand {
    /**
     * Dont include any of the expansions in output.
     */
    None = 0,
    /**
     * Include children in response.
     */
    Children = 1,
    /**
     * Include default testers in response.
     */
    DefaultTesters = 2
}

/**
 * Create and Update Suite Test Case Parameters
 */
export interface SuiteTestCaseCreateUpdateParameters {
    /**
     * Configurations Ids
     */
    pointAssignments: Configuration[];
    /**
     * Id of Test Case to be updated or created
     */
    workItem: WorkItem;
}

/**
 * Test Case Class
 */
export interface TestCase {
    /**
     * Reference links
     */
    links: any;
    /**
     * Order of the TestCase in the Suite
     */
    order: number;
    /**
     * List of Points associated with the Test Case
     */
    pointAssignments: PointAssignment[];
    /**
     * Project under which the Test Case is
     */
    project: TfsCore.TeamProjectReference;
    /**
     * Test Plan under which the Test Case is
     */
    testPlan: TestPlanReference;
    /**
     * Test Suite under which the Test Case is
     */
    testSuite: TestSuiteReference;
    /**
     * Work Item details of the TestCase
     */
    workItem: WorkItemDetails;
}

export interface TestCaseAssociatedResult {
    completedDate: Date;
    configuration: TestConfigurationReference;
    outcome: UserFriendlyTestOutcome;
    plan: TestPlanReference;
    pointId: number;
    resultId: number;
    runBy: WebApi.IdentityRef;
    runId: number;
    suite: TestSuiteReference;
    tester: WebApi.IdentityRef;
}

/**
 * Test Case Reference
 */
export interface TestCaseReference {
    /**
     * Identity to whom the test case is assigned
     */
    assignedTo: WebApi.IdentityRef;
    /**
     * Test Case Id
     */
    id: number;
    /**
     * Test Case Name
     */
    name: string;
    /**
     * State of the test case work item
     */
    state: string;
}

/**
 * This data model is used in TestCaseResultsDataProvider and populates the data required for initial page load
 */
export interface TestCaseResultsData {
    /**
     * Point information from where the execution history was viewed. Used to set initial filters.
     */
    contextPoint: TestPointDetailedReference;
    /**
     * Use to store the results displayed in the table
     */
    results: TestCaseAssociatedResult[];
    /**
     * Test Case Name to be displayed in the table header
     */
    testCaseName: string;
}

/**
 * Test configuration
 */
export interface TestConfiguration extends TestConfigurationCreateUpdateParameters {
    /**
     * Id of the configuration
     */
    id: number;
    /**
     * Id of the test configuration variable
     */
    project: TfsCore.TeamProjectReference;
}

/**
 * Test Configuration Create or Update Parameters
 */
export interface TestConfigurationCreateUpdateParameters {
    /**
     * Description of the configuration
     */
    description: string;
    /**
     * Is the configuration a default for the test plans
     */
    isDefault: boolean;
    /**
     * Name of the configuration
     */
    name: string;
    /**
     * State of the configuration
     */
    state: Test.TestConfigurationState;
    /**
     * Dictionary of Test Variable, Selected Value
     */
    values: Test.NameValuePair[];
}

/**
 * Test Configuration Reference
 */
export interface TestConfigurationReference {
    /**
     * Id of the configuration
     */
    id: number;
    /**
     * Name of the configuration
     */
    name: string;
}

/**
 * The test plan resource.
 */
export interface TestPlan extends TestPlanUpdateParams {
    /**
     * Relevant links
     */
    _links: any;
    /**
     * ID of the test plan.
     */
    id: number;
    /**
     * Previous build Id associated with the test plan
     */
    previousBuildId: number;
    /**
     * Project which contains the test plan.
     */
    project: TfsCore.TeamProjectReference;
    /**
     * Root test suite of the test plan.
     */
    rootSuite: TestSuiteReference;
    /**
     * Identity Reference for the last update of the test plan
     */
    updatedBy: WebApi.IdentityRef;
    /**
     * Updated date of the test plan
     */
    updatedDate: Date;
}

/**
 * The test plan create parameters.
 */
export interface TestPlanCreateParams {
    /**
     * Area of the test plan.
     */
    areaPath: string;
    automatedTestEnvironment: Test.TestEnvironment;
    automatedTestSettings: Test.TestSettings;
    /**
     * The Build Definition that generates a build associated with this test plan.
     */
    buildDefinition: BuildDefinitionReference;
    /**
     * Build to be tested.
     */
    buildId: number;
    /**
     * Description of the test plan.
     */
    description: string;
    /**
     * End date for the test plan.
     */
    endDate: Date;
    /**
     * Iteration path of the test plan.
     */
    iteration: string;
    manualTestEnvironment: Test.TestEnvironment;
    manualTestSettings: Test.TestSettings;
    /**
     * Name of the test plan.
     */
    name: string;
    /**
     * Owner of the test plan.
     */
    owner: WebApi.IdentityRef;
    /**
     * Release Environment to be used to deploy the build and run automated tests from this test plan.
     */
    releaseEnvironmentDefinition: Test.ReleaseEnvironmentDefinitionReference;
    /**
     * Start date for the test plan.
     */
    startDate: Date;
    /**
     * State of the test plan.
     */
    state: string;
    /**
     * Value to configure how same tests across test suites under a test plan need to behave
     */
    testOutcomeSettings: Test.TestOutcomeSettings;
}

/**
 * The test plan detailed reference resource. Contains additional workitem realted information
 */
export interface TestPlanDetailedReference extends TestPlanReference {
    /**
     * Area of the test plan.
     */
    areaPath: string;
    /**
     * End date for the test plan.
     */
    endDate: Date;
    /**
     * Iteration path of the test plan.
     */
    iteration: string;
    /**
     * Root Suite Id
     */
    rootSuiteId: number;
    /**
     * Start date for the test plan.
     */
    startDate: Date;
}

/**
 * The test plan reference resource.
 */
export interface TestPlanReference {
    /**
     * ID of the test plan.
     */
    id: number;
    /**
     * Name of the test plan.
     */
    name: string;
}

/**
 * This data model is used in TestPlansHubRefreshDataProvider and populates the data required for initial page load
 */
export interface TestPlansHubRefreshData {
    defineColumnOptionFields: string[];
    executeColumnOptionFields: string[];
    isAdvancedExtensionEnabled: boolean;
    selectedSuiteId: number;
    testCasePageSize: number;
    testCases: TestCase[];
    testCasesContinuationToken: string;
    testPlan: TestPlanDetailedReference;
    testPointPageSize: number;
    testPoints: TestPoint[];
    testPointsContinuationToken: string;
    testSuites: TestSuite[];
    testSuitesContinuationToken: string;
}

/**
 * The test plan update parameters.
 */
export interface TestPlanUpdateParams extends TestPlanCreateParams {
    /**
     * Revision of the test plan.
     */
    revision: number;
}

/**
 * Test Point Class
 */
export interface TestPoint {
    /**
     * Comment associated to the Test Point
     */
    comment: string;
    /**
     * Configuration associated with the Test Point
     */
    configuration: TestConfigurationReference;
    /**
     * Id of the Test Point
     */
    id: number;
    /**
     * Variable to decide whether the test case is Active or not
     */
    isActive: boolean;
    /**
     * Is the Test Point for Automated Test Case or Manual
     */
    isAutomated: boolean;
    /**
     * Last Reset to Active Time Stamp for the Test Point
     */
    lastResetToActive: Date;
    /**
     * Last Updated details for the Test Point
     */
    lastUpdatedBy: WebApi.IdentityRef;
    /**
     * Last Update Time Stamp for the Test Point
     */
    lastUpdatedDate: Date;
    /**
     * Reference links
     */
    links: any;
    /**
     * Project under which the Test Point is
     */
    project: TfsCore.TeamProjectReference;
    /**
     * Results associated to the Test Point
     */
    results: TestPointResults;
    /**
     * Test Case Reference
     */
    testCaseReference: TestCaseReference;
    /**
     * Tester associated with the Test Point
     */
    tester: WebApi.IdentityRef;
    /**
     * Test Plan under which the Test Point is
     */
    testPlan: TestPlanReference;
    /**
     * Test Suite under which the Test Point is
     */
    testSuite: TestSuiteReference;
}

/**
 * Test Point Count
 */
export interface TestPointCount {
    /**
     * Test Point Count
     */
    count: number;
    /**
     * Test Plan under which the Test Points are
     */
    testPlanId: number;
    /**
     * Test Suite under which the Test Points are
     */
    testSuiteId: number;
}

export interface TestPointDetailedReference {
    configuration: TestConfigurationReference;
    plan: TestPlanReference;
    pointId: number;
    suite: TestSuiteReference;
    tester: WebApi.IdentityRef;
}

/**
 * Test Point Results
 */
export interface TestPointResults {
    /**
     * Failure Type for the Test Point
     */
    failureType: FailureType;
    /**
     * Last Resolution State Id for the Test Point
     */
    lastResolutionState: LastResolutionState;
    /**
     * Last Result Details for the Test Point
     */
    lastResultDetails: Test.LastResultDetails;
    /**
     * Last Result Id
     */
    lastResultId: number;
    /**
     * Last Result State of the Test Point
     */
    lastResultState: ResultState;
    /**
     * Last RUn Build Number for the Test Point
     */
    lastRunBuildNumber: string;
    /**
     * Last Test Run Id for the Test Point
     */
    lastTestRunId: number;
    /**
     * Outcome of the Test Point
     */
    outcome: Outcome;
    /**
     * State of the Test Point
     */
    state: PointState;
}

/**
 * Test Point Update Parameters
 */
export interface TestPointUpdateParams {
    /**
     * Id of Test Point to be updated
     */
    id: number;
    /**
     * Reset the Test Point to Active
     */
    isActive: boolean;
    /**
     * Results of the test point
     */
    results: Results;
    /**
     * Tester of the Test Point
     */
    tester: WebApi.IdentityRef;
}

/**
 * Test suite
 */
export interface TestSuite extends TestSuiteCreateParams {
    /**
     * Links: self, testPoints, testCases, parent
     */
    _links: any;
    /**
     * Child test suites of current test suite.
     */
    children: TestSuite[];
    /**
     * Boolean value dictating if Child test suites are present
     */
    hasChildren: boolean;
    /**
     * Id of test suite.
     */
    id: number;
    /**
     * Last error for test suite.
     */
    lastError: string;
    /**
     * Last populated date.
     */
    lastPopulatedDate: Date;
    /**
     * IdentityRef of user who has updated test suite recently.
     */
    lastUpdatedBy: WebApi.IdentityRef;
    /**
     * Last update date.
     */
    lastUpdatedDate: Date;
    /**
     * Test plan to which the test suite belongs.
     */
    plan: TestPlanReference;
    /**
     * Test suite project shallow reference.
     */
    project: TfsCore.TeamProjectReference;
    /**
     * Test suite revision.
     */
    revision: number;
}

/**
 * Test suite Create Parameters
 */
export interface TestSuiteCreateParams extends TestSuiteCreateUpdateCommonParams {
    /**
     * Test suite requirement id.
     */
    requirementId: number;
    /**
     * Test suite type.
     */
    suiteType: TestSuiteType;
}

/**
 * Test Suite Create/Update Common Parameters
 */
export interface TestSuiteCreateUpdateCommonParams {
    /**
     * Test suite default configurations.
     */
    defaultConfigurations: TestConfigurationReference[];
    /**
     * Test suite default testers.
     */
    defaultTesters: WebApi.IdentityRef[];
    /**
     * Default configuration was inherited or not.
     */
    inheritDefaultConfigurations: boolean;
    /**
     * Name of test suite.
     */
    name: string;
    /**
     * Test suite parent shallow reference.
     */
    parentSuite: TestSuiteReference;
    /**
     * Test suite query string, for dynamic suites.
     */
    queryString: string;
}

/**
 * The test suite reference resource.
 */
export interface TestSuiteReference {
    /**
     * ID of the test suite.
     */
    id: number;
    /**
     * Name of the test suite.
     */
    name: string;
}

/**
 * Test Suite Reference with Project
 */
export interface TestSuiteReferenceWithProject extends TestSuiteReference {
    /**
     * Reference of destination Project
     */
    project: TfsCore.TeamProjectReference;
}

/**
 * Type of TestSuite
 */
export enum TestSuiteType {
    /**
     * Default suite type
     */
    None = 0,
    /**
     * Query Based test Suite
     */
    DynamicTestSuite = 1,
    /**
     * Static Test Suite
     */
    StaticTestSuite = 2,
    /**
     * Requirement based Test Suite
     */
    RequirementTestSuite = 3
}

/**
 * Test Suite Update Parameters
 */
export interface TestSuiteUpdateParams extends TestSuiteCreateUpdateCommonParams {
    /**
     * Test suite revision.
     */
    revision: number;
}

/**
 * Test Variable
 */
export interface TestVariable extends TestVariableCreateUpdateParameters {
    /**
     * Id of the test variable
     */
    id: number;
    /**
     * Id of the test variable
     */
    project: TfsCore.TeamProjectReference;
}

/**
 * Test Variable Create or Update Parameters
 */
export interface TestVariableCreateUpdateParameters {
    /**
     * Description of the test variable
     */
    description: string;
    /**
     * Name of the test variable
     */
    name: string;
    /**
     * List of allowed values
     */
    values: string[];
}

export enum UserFriendlyTestOutcome {
    InProgress = 0,
    Blocked = 1,
    Failed = 2,
    Passed = 3,
    Ready = 4,
    NotApplicable = 5,
    Paused = 6,
    MaxValue = 6
}

/**
 * Work Item
 */
export interface WorkItem {
    /**
     * Id of the Work Item
     */
    id: number;
}

/**
 * Work Item Class
 */
export interface WorkItemDetails {
    /**
     * Work Item Id
     */
    id: number;
    /**
     * Work Item Name
     */
    name: string;
    /**
     * Work Item Fields
     */
    workItemFields: any[];
}
