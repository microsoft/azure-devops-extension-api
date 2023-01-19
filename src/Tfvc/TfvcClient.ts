/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import { deserializeVssJsonObject } from "../Common/Util/Serialization";

import * as Tfvc from "../Tfvc/Tfvc";

export class TfvcRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "8aa40520-446d-40e6-89f6-9c9f9ce44c48";

    /**
     * Get a single branch hierarchy at the given path with parents or children as specified.
     * 
     * @param path - Full path to the branch.  Default: $/ Examples: $/, $/MyProject, $/MyProject/SomeFolder.
     * @param project - Project ID or project name
     * @param includeParent - Return the parent branch, if there is one. Default: False
     * @param includeChildren - Return child branches, if there are any. Default: False
     */
    public async getBranch(
        path: string,
        project?: string,
        includeParent?: boolean,
        includeChildren?: boolean
        ): Promise<Tfvc.TfvcBranch> {

        const queryValues: any = {
            path: path,
            includeParent: includeParent,
            includeChildren: includeChildren
        };

        return this.beginRequest<Tfvc.TfvcBranch>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/tfvc/Branches/{*path}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a collection of branch roots -- first-level children, branches with no parents.
     * 
     * @param project - Project ID or project name
     * @param includeParent - Return the parent branch, if there is one. Default: False
     * @param includeChildren - Return the child branches for each root branch. Default: False
     * @param includeDeleted - Return deleted branches. Default: False
     * @param includeLinks - Return links. Default: False
     */
    public async getBranches(
        project?: string,
        includeParent?: boolean,
        includeChildren?: boolean,
        includeDeleted?: boolean,
        includeLinks?: boolean
        ): Promise<Tfvc.TfvcBranch[]> {

        const queryValues: any = {
            includeParent: includeParent,
            includeChildren: includeChildren,
            includeDeleted: includeDeleted,
            includeLinks: includeLinks
        };

        return this.beginRequest<Tfvc.TfvcBranch[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/tfvc/Branches/{*path}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Get branch hierarchies below the specified scopePath
     * 
     * @param scopePath - Full path to the branch.  Default: $/ Examples: $/, $/MyProject, $/MyProject/SomeFolder.
     * @param project - Project ID or project name
     * @param includeDeleted - Return deleted branches. Default: False
     * @param includeLinks - Return links. Default: False
     */
    public async getBranchRefs(
        scopePath: string,
        project?: string,
        includeDeleted?: boolean,
        includeLinks?: boolean
        ): Promise<Tfvc.TfvcBranchRef[]> {

        const queryValues: any = {
            scopePath: scopePath,
            includeDeleted: includeDeleted,
            includeLinks: includeLinks
        };

        return this.beginRequest<Tfvc.TfvcBranchRef[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/tfvc/Branches/{*path}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Retrieve Tfvc changes for a given changeset.
     * 
     * @param id - ID of the changeset. Default: null
     * @param skip - Number of results to skip. Default: null
     * @param top - The maximum number of results to return. Default: null
     */
    public async getChangesetChanges(
        id?: number,
        skip?: number,
        top?: number
        ): Promise<Tfvc.TfvcChange[]> {

        const queryValues: any = {
            '$skip': skip,
            '$top': top
        };

        return this.beginRequest<Response>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/tfvc/changesets/{id}/changes",
            routeValues: {
                id: id
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <Tfvc.TfvcChange[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Create a new changeset.
     * 
     * @param changeset - 
     * @param project - Project ID or project name
     */
    public async createChangeset(
        changeset: Tfvc.TfvcChangeset,
        project?: string
        ): Promise<Tfvc.TfvcChangesetRef> {

        return this.beginRequest<Tfvc.TfvcChangesetRef>({
            apiVersion: "7.1-preview.3",
            method: "POST",
            routeTemplate: "{project}/_apis/tfvc/changesets/{id}",
            routeValues: {
                project: project
            },
            body: changeset
        });
    }

    /**
     * Retrieve a Tfvc Changeset
     * 
     * @param id - Changeset Id to retrieve.
     * @param project - Project ID or project name
     * @param maxChangeCount - Number of changes to return (maximum 100 changes) Default: 0
     * @param includeDetails - Include policy details and check-in notes in the response. Default: false
     * @param includeWorkItems - Include workitems. Default: false
     * @param maxCommentLength - Include details about associated work items in the response. Default: null
     * @param includeSourceRename - Include renames.  Default: false
     * @param skip - Number of results to skip. Default: null
     * @param top - The maximum number of results to return. Default: null
     * @param orderby - Results are sorted by ID in descending order by default. Use id asc to sort by ID in ascending order.
     * @param searchCriteria - Following criteria available (.itemPath, .version, .versionType, .versionOption, .author, .fromId, .toId, .fromDate, .toDate) Default: null
     */
    public async getChangeset(
        id: number,
        project?: string,
        maxChangeCount?: number,
        includeDetails?: boolean,
        includeWorkItems?: boolean,
        maxCommentLength?: number,
        includeSourceRename?: boolean,
        skip?: number,
        top?: number,
        orderby?: string,
        searchCriteria?: Tfvc.TfvcChangesetSearchCriteria
        ): Promise<Tfvc.TfvcChangeset> {

        const queryValues: any = {
            maxChangeCount: maxChangeCount,
            includeDetails: includeDetails,
            includeWorkItems: includeWorkItems,
            maxCommentLength: maxCommentLength,
            includeSourceRename: includeSourceRename,
            '$skip': skip,
            '$top': top,
            '$orderby': orderby,
            searchCriteria: searchCriteria
        };

        return this.beginRequest<Tfvc.TfvcChangeset>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/_apis/tfvc/changesets/{id}",
            routeValues: {
                project: project,
                id: id
            },
            queryParams: queryValues
        });
    }

    /**
     * Retrieve Tfvc Changesets
     * 
     * @param project - Project ID or project name
     * @param maxCommentLength - Include details about associated work items in the response. Default: null
     * @param skip - Number of results to skip. Default: null
     * @param top - The maximum number of results to return. Default: null
     * @param orderby - Results are sorted by ID in descending order by default. Use id asc to sort by ID in ascending order.
     * @param searchCriteria - Following criteria available (.itemPath, .version, .versionType, .versionOption, .author, .fromId, .toId, .fromDate, .toDate) Default: null
     */
    public async getChangesets(
        project?: string,
        maxCommentLength?: number,
        skip?: number,
        top?: number,
        orderby?: string,
        searchCriteria?: Tfvc.TfvcChangesetSearchCriteria
        ): Promise<Tfvc.TfvcChangesetRef[]> {

        const queryValues: any = {
            maxCommentLength: maxCommentLength,
            '$skip': skip,
            '$top': top,
            '$orderby': orderby,
            searchCriteria: searchCriteria
        };

        return this.beginRequest<Tfvc.TfvcChangesetRef[]>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/_apis/tfvc/changesets/{id}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Returns changesets for a given list of changeset Ids.
     * 
     * @param changesetsRequestData - List of changeset IDs.
     */
    public async getBatchedChangesets(
        changesetsRequestData: Tfvc.TfvcChangesetsRequestData
        ): Promise<Tfvc.TfvcChangesetRef[]> {

        return this.beginRequest<Tfvc.TfvcChangesetRef[]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/tfvc/ChangesetsBatch",
            body: changesetsRequestData
        });
    }

    /**
     * Retrieves the work items associated with a particular changeset.
     * 
     * @param id - ID of the changeset.
     */
    public async getChangesetWorkItems(
        id?: number
        ): Promise<Tfvc.AssociatedWorkItem[]> {

        return this.beginRequest<Tfvc.AssociatedWorkItem[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/tfvc/changesets/{id}/workItems",
            routeValues: {
                id: id
            }
        });
    }

    /**
     * Post for retrieving a set of items given a list of paths or a long path. Allows for specifying the recursionLevel and version descriptors for each path.
     * 
     * @param itemRequestData - 
     * @param project - Project ID or project name
     */
    public async getItemsBatch(
        itemRequestData: Tfvc.TfvcItemRequestData,
        project?: string
        ): Promise<Tfvc.TfvcItem[][]> {

        return this.beginRequest<Tfvc.TfvcItem[][]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/tfvc/ItemBatch",
            routeValues: {
                project: project
            },
            body: itemRequestData
        });
    }

    /**
     * Post for retrieving a set of items given a list of paths or a long path. Allows for specifying the recursionLevel and version descriptors for each path.
     * 
     * @param itemRequestData - 
     * @param project - Project ID or project name
     */
    public async getItemsBatchZip(
        itemRequestData: Tfvc.TfvcItemRequestData,
        project?: string
        ): Promise<ArrayBuffer> {

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            httpResponseType: "application/zip",
            routeTemplate: "{project}/_apis/tfvc/ItemBatch",
            routeValues: {
                project: project
            },
            body: itemRequestData
        });
    }

    /**
     * Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     * 
     * @param path - Version control path of an individual item to return.
     * @param project - Project ID or project name
     * @param fileName - file name of item returned.
     * @param download - If true, create a downloadable attachment.
     * @param scopePath - Version control path of a folder to return multiple items.
     * @param recursionLevel - None (just the item), or OneLevel (contents of a folder).
     * @param versionDescriptor - Version descriptor.  Default is null.
     * @param includeContent - Set to true to include item content when requesting json.  Default is false.
     */
    public async getItem(
        path: string,
        project?: string,
        fileName?: string,
        download?: boolean,
        scopePath?: string,
        recursionLevel?: Tfvc.VersionControlRecursionType,
        versionDescriptor?: Tfvc.TfvcVersionDescriptor,
        includeContent?: boolean
        ): Promise<Tfvc.TfvcItem> {

        const queryValues: any = {
            path: path,
            fileName: fileName,
            download: download,
            scopePath: scopePath,
            recursionLevel: recursionLevel,
            versionDescriptor: versionDescriptor,
            includeContent: includeContent
        };

        return this.beginRequest<Tfvc.TfvcItem>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/tfvc/Items/{*path}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     * 
     * @param path - Version control path of an individual item to return.
     * @param project - Project ID or project name
     * @param fileName - file name of item returned.
     * @param download - If true, create a downloadable attachment.
     * @param scopePath - Version control path of a folder to return multiple items.
     * @param recursionLevel - None (just the item), or OneLevel (contents of a folder).
     * @param versionDescriptor - Version descriptor.  Default is null.
     * @param includeContent - Set to true to include item content when requesting json.  Default is false.
     */
    public async getItemContent(
        path: string,
        project?: string,
        fileName?: string,
        download?: boolean,
        scopePath?: string,
        recursionLevel?: Tfvc.VersionControlRecursionType,
        versionDescriptor?: Tfvc.TfvcVersionDescriptor,
        includeContent?: boolean
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            path: path,
            fileName: fileName,
            download: download,
            scopePath: scopePath,
            recursionLevel: recursionLevel,
            versionDescriptor: versionDescriptor,
            includeContent: includeContent
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "{project}/_apis/tfvc/Items/{*path}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a list of Tfvc items
     * 
     * @param project - Project ID or project name
     * @param scopePath - Version control path of a folder to return multiple items.
     * @param recursionLevel - None (just the item), or OneLevel (contents of a folder).
     * @param includeLinks - True to include links.
     * @param versionDescriptor - 
     */
    public async getItems(
        project?: string,
        scopePath?: string,
        recursionLevel?: Tfvc.VersionControlRecursionType,
        includeLinks?: boolean,
        versionDescriptor?: Tfvc.TfvcVersionDescriptor
        ): Promise<Tfvc.TfvcItem[]> {

        const queryValues: any = {
            scopePath: scopePath,
            recursionLevel: recursionLevel,
            includeLinks: includeLinks,
            versionDescriptor: versionDescriptor
        };

        return this.beginRequest<Tfvc.TfvcItem[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/tfvc/Items/{*path}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     * 
     * @param path - Version control path of an individual item to return.
     * @param project - Project ID or project name
     * @param fileName - file name of item returned.
     * @param download - If true, create a downloadable attachment.
     * @param scopePath - Version control path of a folder to return multiple items.
     * @param recursionLevel - None (just the item), or OneLevel (contents of a folder).
     * @param versionDescriptor - Version descriptor.  Default is null.
     * @param includeContent - Set to true to include item content when requesting json.  Default is false.
     */
    public async getItemText(
        path: string,
        project?: string,
        fileName?: string,
        download?: boolean,
        scopePath?: string,
        recursionLevel?: Tfvc.VersionControlRecursionType,
        versionDescriptor?: Tfvc.TfvcVersionDescriptor,
        includeContent?: boolean
        ): Promise<string> {

        const queryValues: any = {
            path: path,
            fileName: fileName,
            download: download,
            scopePath: scopePath,
            recursionLevel: recursionLevel,
            versionDescriptor: versionDescriptor,
            includeContent: includeContent
        };

        return this.beginRequest<string>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "text/plain",
            routeTemplate: "{project}/_apis/tfvc/Items/{*path}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Get Item Metadata and/or Content for a single item. The download parameter is to indicate whether the content should be available as a download or just sent as a stream in the response. Doesn't apply to zipped content which is always returned as a download.
     * 
     * @param path - Version control path of an individual item to return.
     * @param project - Project ID or project name
     * @param fileName - file name of item returned.
     * @param download - If true, create a downloadable attachment.
     * @param scopePath - Version control path of a folder to return multiple items.
     * @param recursionLevel - None (just the item), or OneLevel (contents of a folder).
     * @param versionDescriptor - Version descriptor.  Default is null.
     * @param includeContent - Set to true to include item content when requesting json.  Default is false.
     */
    public async getItemZip(
        path: string,
        project?: string,
        fileName?: string,
        download?: boolean,
        scopePath?: string,
        recursionLevel?: Tfvc.VersionControlRecursionType,
        versionDescriptor?: Tfvc.TfvcVersionDescriptor,
        includeContent?: boolean
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            path: path,
            fileName: fileName,
            download: download,
            scopePath: scopePath,
            recursionLevel: recursionLevel,
            versionDescriptor: versionDescriptor,
            includeContent: includeContent
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "7.1-preview.1",
            httpResponseType: "application/zip",
            routeTemplate: "{project}/_apis/tfvc/Items/{*path}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Get items under a label.
     * 
     * @param labelId - Unique identifier of label
     * @param top - Max number of items to return
     * @param skip - Number of items to skip
     */
    public async getLabelItems(
        labelId: string,
        top?: number,
        skip?: number
        ): Promise<Tfvc.TfvcItem[]> {

        const queryValues: any = {
            '$top': top,
            '$skip': skip
        };

        return this.beginRequest<Tfvc.TfvcItem[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/tfvc/labels/{labelId}/items",
            routeValues: {
                labelId: labelId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a single deep label.
     * 
     * @param labelId - Unique identifier of label
     * @param requestData - maxItemCount
     * @param project - Project ID or project name
     */
    public async getLabel(
        labelId: string,
        requestData: Tfvc.TfvcLabelRequestData,
        project?: string
        ): Promise<Tfvc.TfvcLabel> {

        const queryValues: any = {
            requestData: requestData
        };

        return this.beginRequest<Tfvc.TfvcLabel>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/tfvc/Labels/{labelId}",
            routeValues: {
                project: project,
                labelId: labelId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a collection of shallow label references.
     * 
     * @param requestData - labelScope, name, owner, and itemLabelFilter
     * @param project - Project ID or project name
     * @param top - Max number of labels to return, defaults to 100 when undefined
     * @param skip - Number of labels to skip
     */
    public async getLabels(
        requestData: Tfvc.TfvcLabelRequestData,
        project?: string,
        top?: number,
        skip?: number
        ): Promise<Tfvc.TfvcLabelRef[]> {

        const queryValues: any = {
            requestData: requestData,
            '$top': top,
            '$skip': skip
        };

        return this.beginRequest<Tfvc.TfvcLabelRef[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/tfvc/Labels/{labelId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Get changes included in a shelveset.
     * 
     * @param shelvesetId - Shelveset's unique ID
     * @param top - Max number of changes to return
     * @param skip - Number of changes to skip
     */
    public async getShelvesetChanges(
        shelvesetId: string,
        top?: number,
        skip?: number
        ): Promise<Tfvc.TfvcChange[]> {

        const queryValues: any = {
            shelvesetId: shelvesetId,
            '$top': top,
            '$skip': skip
        };

        return this.beginRequest<Tfvc.TfvcChange[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/tfvc/shelvesets/changes",
            queryParams: queryValues
        });
    }

    /**
     * Get a single deep shelveset.
     * 
     * @param shelvesetId - Shelveset's unique ID
     * @param requestData - includeDetails, includeWorkItems, maxChangeCount, and maxCommentLength
     */
    public async getShelveset(
        shelvesetId: string,
        requestData?: Tfvc.TfvcShelvesetRequestData
        ): Promise<Tfvc.TfvcShelveset> {

        const queryValues: any = {
            shelvesetId: shelvesetId,
            requestData: requestData
        };

        return this.beginRequest<Tfvc.TfvcShelveset>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/tfvc/shelvesets",
            queryParams: queryValues
        });
    }

    /**
     * Return a collection of shallow shelveset references.
     * 
     * @param requestData - name, owner, and maxCommentLength
     * @param top - Max number of shelvesets to return
     * @param skip - Number of shelvesets to skip
     */
    public async getShelvesets(
        requestData?: Tfvc.TfvcShelvesetRequestData,
        top?: number,
        skip?: number
        ): Promise<Tfvc.TfvcShelvesetRef[]> {

        const queryValues: any = {
            requestData: requestData,
            '$top': top,
            '$skip': skip
        };

        return this.beginRequest<Tfvc.TfvcShelvesetRef[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/tfvc/shelvesets",
            queryParams: queryValues
        });
    }

    /**
     * Get work items associated with a shelveset.
     * 
     * @param shelvesetId - Shelveset's unique ID
     */
    public async getShelvesetWorkItems(
        shelvesetId: string
        ): Promise<Tfvc.AssociatedWorkItem[]> {

        const queryValues: any = {
            shelvesetId: shelvesetId
        };

        return this.beginRequest<Tfvc.AssociatedWorkItem[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/tfvc/shelvesets/workitems",
            queryParams: queryValues
        });
    }

    /**
     * Provides File Count and Uncompressed Bytes for a Collection/Project at a particular scope for TFVC.
     * 
     * @param project - Project ID or project name
     * @param scopePath - '$/' for collection, '$/project' for specific project
     */
    public async getTfvcStatistics(
        project?: string,
        scopePath?: string
        ): Promise<Tfvc.TfvcStatistics> {

        const queryValues: any = {
            scopePath: scopePath
        };

        return this.beginRequest<Tfvc.TfvcStatistics>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/tfvc/stats",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

}
