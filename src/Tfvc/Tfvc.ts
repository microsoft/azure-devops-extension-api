/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import TfsCore = require("../Core/Core");
import WebApi = require("../WebApi/WebApi");

export interface AssociatedWorkItem {
    assignedTo: string;
    /**
     * Id of associated the work item.
     */
    id: number;
    state: string;
    title: string;
    /**
     * REST Url of the work item.
     */
    url: string;
    webUrl: string;
    workItemType: string;
}

export interface Change<T> {
    /**
     * The type of change that was made to the item.
     */
    changeType: VersionControlChangeType;
    /**
     * Current version.
     */
    item: T;
    /**
     * Content of the item after the change.
     */
    newContent: ItemContent;
    /**
     * Path of the item on the server.
     */
    sourceServerItem: string;
    /**
     * URL to retrieve the item.
     */
    url: string;
}

export interface CheckinNote {
    name: string;
    value: string;
}

export interface FileContentMetadata {
    contentType: string;
    encoding: number;
    extension: string;
    fileName: string;
    isBinary: boolean;
    isImage: boolean;
    vsLink: string;
}

export interface GitRepository {
    _links: any;
    defaultBranch: string;
    id: string;
    /**
     * True if the repository was created as a fork
     */
    isFork: boolean;
    name: string;
    parentRepository: GitRepositoryRef;
    project: TfsCore.TeamProjectReference;
    remoteUrl: string;
    /**
     * Compressed size (bytes) of the repository.
     */
    size: number;
    sshUrl: string;
    url: string;
    validRemoteUrls: string[];
}

export interface GitRepositoryRef {
    /**
     * Team Project Collection where this Fork resides
     */
    collection: TfsCore.TeamProjectCollectionReference;
    id: string;
    /**
     * True if the repository was created as a fork
     */
    isFork: boolean;
    name: string;
    project: TfsCore.TeamProjectReference;
    remoteUrl: string;
    sshUrl: string;
    url: string;
}

export interface ItemContent {
    content: string;
    contentType: ItemContentType;
}

export enum ItemContentType {
    RawText = 0,
    Base64Encoded = 1
}

export interface ItemModel {
    _links: any;
    content: string;
    contentMetadata: FileContentMetadata;
    isFolder: boolean;
    isSymLink: boolean;
    path: string;
    url: string;
}

export interface TfvcBranch extends TfvcBranchRef {
    /**
     * List of children for the branch.
     */
    children: TfvcBranch[];
    /**
     * List of branch mappings.
     */
    mappings: TfvcBranchMapping[];
    /**
     * Path of the branch's parent.
     */
    parent: TfvcShallowBranchRef;
    /**
     * List of paths of the related branches.
     */
    relatedBranches: TfvcShallowBranchRef[];
}

export interface TfvcBranchMapping {
    /**
     * Depth of the branch.
     */
    depth: string;
    /**
     * Server item for the branch.
     */
    serverItem: string;
    /**
     * Type of the branch.
     */
    type: string;
}

export interface TfvcBranchRef extends TfvcShallowBranchRef {
    /**
     * A collection of REST reference links.
     */
    _links: any;
    /**
     * Creation date of the branch.
     */
    createdDate: Date;
    /**
     * Description of the branch.
     */
    description: string;
    /**
     * Is the branch deleted?
     */
    isDeleted: boolean;
    /**
     * Alias or display name of user
     */
    owner: WebApi.IdentityRef;
    /**
     * URL to retrieve the item.
     */
    url: string;
}

export interface TfvcChange extends Change<TfvcItem> {
    /**
     * List of merge sources in case of rename or branch creation.
     */
    mergeSources: TfvcMergeSource[];
    /**
     * Version at which a (shelved) change was pended against
     */
    pendingVersion: number;
}

export interface TfvcChangeset extends TfvcChangesetRef {
    /**
     * Account Id of the changeset.
     */
    accountId: string;
    /**
     * List of associated changes.
     */
    changes: TfvcChange[];
    /**
     * Checkin Notes for the changeset.
     */
    checkinNotes: CheckinNote[];
    /**
     * Collection Id of the changeset.
     */
    collectionId: string;
    /**
     * Are more changes available.
     */
    hasMoreChanges: boolean;
    /**
     * Policy Override for the changeset.
     */
    policyOverride: TfvcPolicyOverrideInfo;
    /**
     * Team Project Ids for the changeset.
     */
    teamProjectIds: string[];
    /**
     * List of work items associated with the changeset.
     */
    workItems: AssociatedWorkItem[];
}

export interface TfvcChangesetRef {
    /**
     * A collection of REST reference links.
     */
    _links: any;
    /**
     * Alias or display name of user
     */
    author: WebApi.IdentityRef;
    /**
     * Id of the changeset.
     */
    changesetId: number;
    /**
     * Alias or display name of user
     */
    checkedInBy: WebApi.IdentityRef;
    /**
     * Comment for the changeset.
     */
    comment: string;
    /**
     * Was the Comment result truncated?
     */
    commentTruncated: boolean;
    /**
     * Creation date of the changeset.
     */
    createdDate: Date;
    /**
     * URL to retrieve the item.
     */
    url: string;
}

/**
 * Criteria used in a search for change lists
 */
export interface TfvcChangesetSearchCriteria {
    /**
     * Alias or display name of user who made the changes
     */
    author: string;
    /**
     * Whether or not to follow renames for the given item being queried
     */
    followRenames: boolean;
    /**
     * If provided, only include changesets created after this date (string) Think of a better name for this.
     */
    fromDate: string;
    /**
     * If provided, only include changesets after this changesetID
     */
    fromId: number;
    /**
     * Whether to include the _links field on the shallow references
     */
    includeLinks: boolean;
    /**
     * Path of item to search under
     */
    itemPath: string;
    mappings: TfvcMappingFilter[];
    /**
     * If provided, only include changesets created before this date (string) Think of a better name for this.
     */
    toDate: string;
    /**
     * If provided, a version descriptor for the latest change list to include
     */
    toId: number;
}

export interface TfvcChangesetsRequestData {
    /**
     * List of changeset Ids.
     */
    changesetIds: number[];
    /**
     * Length of the comment.
     */
    commentLength: number;
    /**
     * Whether to include the _links field on the shallow references
     */
    includeLinks: boolean;
}

export interface TfvcItem extends ItemModel {
    changeDate: Date;
    deletionId: number;
    /**
     * File encoding from database, -1 represents binary.
     */
    encoding: number;
    /**
     * MD5 hash as a base 64 string, applies to files only.
     */
    hashValue: string;
    isBranch: boolean;
    isPendingChange: boolean;
    /**
     * The size of the file, if applicable.
     */
    size: number;
    version: number;
}

/**
 * Item path and Version descriptor properties
 */
export interface TfvcItemDescriptor {
    path: string;
    recursionLevel: VersionControlRecursionType;
    version: string;
    versionOption: TfvcVersionOption;
    versionType: TfvcVersionType;
}

export interface TfvcItemRequestData {
    /**
     * If true, include metadata about the file type
     */
    includeContentMetadata: boolean;
    /**
     * Whether to include the _links field on the shallow references
     */
    includeLinks: boolean;
    itemDescriptors: TfvcItemDescriptor[];
}

export interface TfvcLabel extends TfvcLabelRef {
    items: TfvcItem[];
}

export interface TfvcLabelRef {
    _links: any;
    description: string;
    id: number;
    labelScope: string;
    modifiedDate: Date;
    name: string;
    owner: WebApi.IdentityRef;
    url: string;
}

export interface TfvcLabelRequestData {
    /**
     * Whether to include the _links field on the shallow references
     */
    includeLinks: boolean;
    itemLabelFilter: string;
    labelScope: string;
    maxItemCount: number;
    name: string;
    owner: string;
}

export interface TfvcMappingFilter {
    exclude: boolean;
    serverPath: string;
}

export interface TfvcMergeSource {
    /**
     * Indicates if this a rename source. If false, it is a merge source.
     */
    isRename: boolean;
    /**
     * The server item of the merge source
     */
    serverItem: string;
    /**
     * Start of the version range
     */
    versionFrom: number;
    /**
     * End of the version range
     */
    versionTo: number;
}

export interface TfvcPolicyFailureInfo {
    message: string;
    policyName: string;
}

export interface TfvcPolicyOverrideInfo {
    comment: string;
    policyFailures: TfvcPolicyFailureInfo[];
}

export interface TfvcShallowBranchRef {
    /**
     * Path for the branch.
     */
    path: string;
}

/**
 * This is the deep shelveset class
 */
export interface TfvcShelveset extends TfvcShelvesetRef {
    changes: TfvcChange[];
    notes: CheckinNote[];
    policyOverride: TfvcPolicyOverrideInfo;
    workItems: AssociatedWorkItem[];
}

/**
 * This is the shallow shelveset class
 */
export interface TfvcShelvesetRef {
    _links: any;
    comment: string;
    commentTruncated: boolean;
    createdDate: Date;
    id: string;
    name: string;
    owner: WebApi.IdentityRef;
    url: string;
}

export interface TfvcShelvesetRequestData {
    /**
     * Whether to include policyOverride and notes Only applies when requesting a single deep shelveset
     */
    includeDetails: boolean;
    /**
     * Whether to include the _links field on the shallow references. Does not apply when requesting a single deep shelveset object. Links will always be included in the deep shelveset.
     */
    includeLinks: boolean;
    /**
     * Whether to include workItems
     */
    includeWorkItems: boolean;
    /**
     * Max number of changes to include
     */
    maxChangeCount: number;
    /**
     * Max length of comment
     */
    maxCommentLength: number;
    /**
     * Shelveset's name
     */
    name: string;
    /**
     * Owner's ID. Could be a name or a guid.
     */
    owner: string;
}

export interface TfvcStatistics {
    /**
     * Id of the last changeset the stats are based on.
     */
    changesetId: number;
    /**
     * Count of files at the requested scope.
     */
    fileCountTotal: number;
}

export interface TfvcVersionDescriptor {
    version: string;
    versionOption: TfvcVersionOption;
    versionType: TfvcVersionType;
}

export enum TfvcVersionOption {
    None = 0,
    Previous = 1,
    UseRename = 2
}

export enum TfvcVersionType {
    None = 0,
    Changeset = 1,
    Shelveset = 2,
    Change = 3,
    Date = 4,
    Latest = 5,
    Tip = 6,
    MergeSource = 7
}

export enum VersionControlChangeType {
    None = 0,
    Add = 1,
    Edit = 2,
    Encoding = 4,
    Rename = 8,
    Delete = 16,
    Undelete = 32,
    Branch = 64,
    Merge = 128,
    Lock = 256,
    Rollback = 512,
    SourceRename = 1024,
    TargetRename = 2048,
    Property = 4096,
    All = 8191
}

export interface VersionControlProjectInfo {
    defaultSourceControlType: TfsCore.SourceControlTypes;
    project: TfsCore.TeamProjectReference;
    supportsGit: boolean;
    supportsTFVC: boolean;
}

export enum VersionControlRecursionType {
    /**
     * Only return the specified item.
     */
    None = 0,
    /**
     * Return the specified item and its direct children.
     */
    OneLevel = 1,
    /**
     * Return the specified item and its direct children, as well as recursive chains of nested child folders that only contain a single folder.
     */
    OneLevelPlusNestedEmptyFolders = 4,
    /**
     * Return specified item and all descendants
     */
    Full = 120
}
