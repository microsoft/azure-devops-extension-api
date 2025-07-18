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

export interface CloneTestCaseOperationInformation {
    /**
     * Various information related to the clone
     */
    cloneOperationResponse: CloneOperationCommonResponse;
    /**
     * Test Plan Clone create parameters
     */
    cloneOptions: Test.CloneTestCaseOptions;
    /**
     * Information of destination Test Suite
     */
    destinationTestSuite: TestSuiteReferenceWithProject;
    /**
     * Information of source Test Suite
     */
    sourceTestSuite: SourceTestSuiteResponse;
}

/**
 * Parameters for Test Suite clone operation
 */
export interface CloneTestCaseParams {
    /**
     * Test Case Clone create parameters
     */
    cloneOptions: Test.CloneTestCaseOptions;
    /**
     * Information about destination Test Plan
     */
    destinationTestPlan: TestPlanReference;
    /**
     * Information about destination Test Suite
     */
    destinationTestSuite: DestinationTestSuiteInfo;
    /**
     * Information about source Test Plan
     */
    sourceTestPlan: TestPlanReference;
    /**
     * Information about source Test Suite
     */
    sourceTestSuite: SourceTestSuiteInfo;
    /**
     * Test Case IDs
     */
    testCaseIds: number[];
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
 * This data model is used in TestRunDataProvider and provides the TestCaseResultsData for a Test run
 */
export interface CustomTestCaseResultData {
    /**
     * Reference to area path of test.
     */
    area: Test.ShallowReference;
    /**
     * Reference to bugs linked to test result.
     */
    associatedBugs: Test.ShallowReference[];
    /**
     * Fully qualified name of test executed.
     */
    automatedTestName: string;
    /**
     * Container to which test belongs.
     */
    automatedTestStorage: string;
    /**
     * Shallow reference to build associated with test result.
     */
    build: Test.ShallowReference;
    /**
     * Machine name where test executed.
     */
    computerName: string;
    /**
     * Reference to test configuration. Type ShallowReference.
     */
    configuration: Test.ShallowReference;
    /**
     * Duration of test execution in milliseconds. If not provided value will be set as CompletedDate - StartedDate
     */
    durationInMs: number;
    /**
     * Error message in test execution.
     */
    errorMessage: string;
    /**
     * ID of a test result.
     */
    id: number;
    /**
     * Iteration path of test.
     */
    iterationPath: string;
    /**
     * Test outcome of test result. Valid values = (Unspecified, None, Passed, Failed, Inconclusive, Timeout, Aborted, Blocked, NotExecuted, Warning, Error, NotApplicable, Paused, InProgress, NotImpacted)
     */
    outcome: string;
    /**
     * Reference to test owner.
     */
    owner: WebApi.IdentityRef;
    /**
     * Priority of test executed.
     */
    priority: number;
    /**
     * Reference to identity executed the test.
     */
    runBy: WebApi.IdentityRef;
    /**
     * Stacktrace with maxSize= 1000 chars.
     */
    stackTrace: string;
    /**
     * Reference to the test executed.
     */
    testCase: Test.ShallowReference;
    /**
     * Reference ID of test used by test result. Type TestResultMetaData
     */
    testCaseReferenceId: number;
    /**
     * Reference to test run.
     */
    testRun: Test.ShallowReference;
    /**
     * Reference to test suite test case workitem is part of.
     */
    testSuite: Test.ShallowReference;
}

/**
 * This data model is used in AllTestRunsViewDataProvider and provides Test Run Data
 */
export interface CustomTestRunData {
    /**
     * Build Id.
     */
    buildId: number;
    /**
     * Build Name.
     */
    buildName: string;
    /**
     * Completed date time of the run.
     */
    completedDate: string;
    /**
     * Duration of the run execution in milliseconds
     */
    durationInMs: number;
    /**
     * No. of tests failed in the run
     */
    failedTestsCount: number;
    /**
     * ID of the Test run.
     */
    id: number;
    /**
     * Name of the Test run.
     */
    name: string;
    /**
     * Pass rate of the run
     */
    passRate: string;
    /**
     * Start date time of the run.
     */
    startedDate: string;
    /**
     * The state of the run. Type TestRunState Valid states - Unspecified ,NotStarted, InProgress, Completed, Waiting, Aborted, NeedsInvestigation
     */
    state: string;
    /**
     * Id of the Test plan associated with this Test run.
     */
    testPlanId: number;
    /**
     * Name of the Test plan associated with this Test run.
     */
    testPlanName: string;
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

/**
 * Parameters for test case export operation
 */
export interface ExportTestCaseParams {
    /**
     * Columns needs to be exported
     */
    columnOptions: string[];
    /**
     * Test Case IDs to exported
     */
    testCaseIds: number[];
    /**
     * ID of test plan containing test cases
     */
    testPlanId: number;
    /**
     * ID of test suite containing test cases
     */
    testSuiteId: number;
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

/**
 * Enum representing the return code of data provider.
 */
export enum LibraryTestCasesDataReturnCode {
    Success = 0,
    Error = 1
}

/**
 * This data model is used in Work item-based tabs of Test Plans Library.
 */
export interface LibraryWorkItemsData {
    /**
     * Specifies the column option field names
     */
    columnOptions: string[];
    /**
     * Continuation token to fetch next set of elements. Present only when HasMoreElements is true.
     */
    continuationToken: string;
    /**
     * Boolean indicating if the WIQL query has exceeded the limit of items returned.
     */
    exceededWorkItemQueryLimit: boolean;
    /**
     * Boolean indicating if there are more elements present than what are being sent.
     */
    hasMoreElements: boolean;
    /**
     * Specifies if there was an error while execution of data provider.
     */
    returnCode: LibraryTestCasesDataReturnCode;
    /**
     * List of work items returned when OrderByField is sent something other than Id.
     */
    workItemIds: number[];
    /**
     * List of work items to be returned.
     */
    workItems: WorkItemDetails[];
}

/**
 * This is the request data contract for LibraryTestCaseDataProvider.
 */
export interface LibraryWorkItemsDataProviderRequest {
    /**
     * Specifies the list of column options to show in test cases table.
     */
    columnOptions: string[];
    /**
     * The continuation token required for paging of work items. This is required when getting subsequent sets of work items when OrderByField is Id.
     */
    continuationToken: string;
    /**
     * List of filter values to be supplied. Currently supported filters are Title, State, AssignedTo, Priority, AreaPath.
     */
    filterValues: TestPlansLibraryWorkItemFilter[];
    /**
     * Whether the data is to be sorted in ascending or descending order. When not supplied, defaults to descending.
     */
    isAscending: boolean;
    /**
     * The type of query to run.
     */
    libraryQueryType: TestPlansLibraryQuery;
    /**
     * Work item field on which to order the results. When not supplied, defaults to work item IDs.
     */
    orderByField: string;
    /**
     * List of work items to query for field details. This is required when getting subsequent sets of work item fields when OrderByField is other than Id.
     */
    workItemIds: number[];
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
 * Source Test Suite Response for Test Case clone operation
 */
export interface SourceTestSuiteResponse extends TestSuiteReference {
    /**
     * project reference
     */
    project: TfsCore.TeamProjectReference;
    /**
     * Id of suites to be cloned inside source Test Plan
     */
    testCaseIds: number[];
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

export interface TestCaseAssociatedResultExtended extends TestCaseAssociatedResult {
    areaPath: string;
    buildPipeline: Test.ShallowReference;
    iterationPath: string;
    owner: WebApi.IdentityRef;
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
 * This data model is used in TestCaseResultsDataProvider for extended data to populates the data required for initial page load
 */
export interface TestCaseResultsDataExtended {
    /**
     * Point information from where the execution history was viewed. Used to set initial filters.
     */
    contextPoint: TestPointDetailedReference;
    /**
     * Use to store the results displayed in the table
     */
    results: TestCaseAssociatedResultExtended[];
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
 * Test Entity Count Used to store test cases count (define tab) and test point count (execute tab) Used to store test cases count (define tab) and test point count (execute tab)
 */
export interface TestEntityCount {
    /**
     * Test Entity Count
     */
    count: number;
    /**
     * Test Plan under which the Test Entities are
     */
    testPlanId: number;
    /**
     * Test Suite under which the Test Entities are
     */
    testSuiteId: number;
    /**
     * Total test entities in the suite without the applied filters
     */
    totalCount: number;
}

export enum TestEntityTypes {
    TestCase = 0,
    TestPoint = 1
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
 * Test Plan/Suite restore request body params
 */
export interface TestPlanAndSuiteRestoreModel {
    /**
     * Indicates whether the deleted test plan/suite should be restored.
     */
    isDeleted: boolean;
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
    /**
     * The Yaml Release Reference associated with this test plan.
     */
    yamlReleaseReference: Test.YamlReleaseReference;
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
    defineTabCustomColumnFieldMap: { [key: string] : string; };
    errorMessage: string;
    executeColumnOptionFields: string[];
    executeTabCustomColumnFieldMap: { [key: string] : string; };
    isAdvancedExtensionEnabled: boolean;
    selectedPivotId: string;
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
 * Enum used to define the queries used in Test Plans Library.
 */
export enum TestPlansLibraryQuery {
    None = 0,
    AllTestCases = 1,
    TestCasesWithActiveBugs = 2,
    TestCasesNotLinkedToRequirements = 3,
    TestCasesLinkedToRequirements = 4,
    AllSharedSteps = 11,
    SharedStepsNotLinkedToRequirement = 12
}

/**
 * Container to hold information about a filter being applied in Test Plans Library.
 */
export interface TestPlansLibraryWorkItemFilter {
    /**
     * Work item field name on which the items are to be filtered.
     */
    fieldName: string;
    /**
     * Work item field values corresponding to the field name.
     */
    fieldValues: string[];
    /**
     * Mode of the filter.
     */
    filterMode: TestPlansLibraryWorkItemFilterMode;
}

export enum TestPlansLibraryWorkItemFilterMode {
    /**
     * Default. Have the field values separated by an OR clause.
     */
    Or = 0,
    /**
     * Have the field values separated by an AND clause.
     */
    And = 1
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
    Timeout = 7,
    Warning = 8,
    Error = 9,
    NotExecuted = 10,
    Inconclusive = 11,
    Aborted = 12,
    None = 13,
    NotImpacted = 14,
    Unspecified = 15,
    MaxValue = 15
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
