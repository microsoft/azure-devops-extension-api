/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as WebApi from "../WebApi/WebApi";
import * as WorkItemTracking from "../WorkItemTracking/WorkItemTracking";

export class WorkItemTrackingRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "5264459e-e5e0-4bd8-b118-0985e68a4ec5";

    /**
     * INTERNAL ONLY: USED BY ACCOUNT MY WORK PAGE. This returns Doing, Done, Follows and activity work items details.
     * 
     * @param queryOption - 
     */
    public async getAccountMyWorkData(
        queryOption?: WorkItemTracking.QueryOption
        ): Promise<WorkItemTracking.AccountMyWorkResult> {

        const queryValues: any = {
            '$queryOption': queryOption
        };

        return this.beginRequest<WorkItemTracking.AccountMyWorkResult>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "_apis/work/accountMyWork",
            queryParams: queryValues
        });
    }

    /**
     * Gets recent work item activities
     * 
     */
    public async getRecentActivityData(
        ): Promise<WorkItemTracking.AccountRecentActivityWorkItemModel2[]> {

        return this.beginRequest<WorkItemTracking.AccountRecentActivityWorkItemModel2[]>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "_apis/work/accountMyWorkRecentActivity"
        });
    }

    /**
     * INTERNAL ONLY: USED BY ACCOUNT MY WORK PAGE.
     * 
     */
    public async getRecentMentions(
        ): Promise<WorkItemTracking.AccountRecentMentionWorkItemModel[]> {

        return this.beginRequest<WorkItemTracking.AccountRecentMentionWorkItemModel[]>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "_apis/work/accountRecentMentions"
        });
    }

    /**
     * Get the list of work item tracking outbound artifact link types.
     * 
     */
    public async getWorkArtifactLinkTypes(
        ): Promise<WorkItemTracking.WorkArtifactLink[]> {

        return this.beginRequest<WorkItemTracking.WorkArtifactLink[]>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "_apis/wit/artifactLinkTypes"
        });
    }

    /**
     * Queries work items linked to a given list of artifact URI.
     * 
     * @param artifactUriQuery - Defines a list of artifact URI for querying work items.
     * @param project - Project ID or project name
     */
    public async queryWorkItemsForArtifactUris(
        artifactUriQuery: WorkItemTracking.ArtifactUriQuery,
        project?: string
        ): Promise<WorkItemTracking.ArtifactUriQueryResult> {

        return this.beginRequest<WorkItemTracking.ArtifactUriQueryResult>({
            apiVersion: "5.0-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/wit/artifactUriQuery",
            routeValues: {
                project: project
            },
            body: artifactUriQuery
        });
    }

    /**
     * Uploads an attachment.
     * 
     * @param content - Content to upload
     * @param project - Project ID or project name
     * @param fileName - The name of the file
     * @param uploadType - Attachment upload type: Simple or Chunked
     * @param areaPath - Target project Area Path
     */
    public async createAttachment(
        content: any,
        project?: string,
        fileName?: string,
        uploadType?: string,
        areaPath?: string
        ): Promise<WorkItemTracking.AttachmentReference> {

        const queryValues: any = {
            fileName: fileName,
            uploadType: uploadType,
            areaPath: areaPath
        };

        return this.beginRequest<WorkItemTracking.AttachmentReference>({
            apiVersion: "5.0-preview.3",
            method: "POST",
            routeTemplate: "{project}/_apis/wit/attachments/{id}",
            routeValues: {
                project: project
            },
            customHeaders: {
                "Content-Type": "application/octet-stream",
            },
            queryParams: queryValues,
            body: content,
            isRawData: true
        });
    }

    /**
     * Downloads an attachment.
     * 
     * @param id - Attachment ID
     * @param project - Project ID or project name
     * @param fileName - Name of the file
     * @param download - If set to \<c\>true\</c\> always download attachment
     */
    public async getAttachmentContent(
        id: string,
        project?: string,
        fileName?: string,
        download?: boolean
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            fileName: fileName,
            download: download
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "5.0-preview.3",
            httpResponseType: "application/octet-stream",
            routeTemplate: "{project}/_apis/wit/attachments/{id}",
            routeValues: {
                project: project,
                id: id
            },
            queryParams: queryValues
        });
    }

    /**
     * Downloads an attachment.
     * 
     * @param id - Attachment ID
     * @param project - Project ID or project name
     * @param fileName - Name of the file
     * @param download - If set to \<c\>true\</c\> always download attachment
     */
    public async getAttachmentZip(
        id: string,
        project?: string,
        fileName?: string,
        download?: boolean
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            fileName: fileName,
            download: download
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "5.0-preview.3",
            httpResponseType: "application/zip",
            routeTemplate: "{project}/_apis/wit/attachments/{id}",
            routeValues: {
                project: project,
                id: id
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets root classification nodes or list of classification nodes for a given list of nodes ids, for a given project. In case ids parameter is supplied you will  get list of classification nodes for those ids. Otherwise you will get root classification nodes for this project.
     * 
     * @param project - Project ID or project name
     * @param ids - Comma separated integer classification nodes ids. It's not required, if you want root nodes.
     * @param depth - Depth of children to fetch.
     * @param errorPolicy - Flag to handle errors in getting some nodes. Possible options are Fail and Omit.
     */
    public async getClassificationNodes(
        project: string,
        ids: number[],
        depth?: number,
        errorPolicy?: WorkItemTracking.ClassificationNodesErrorPolicy
        ): Promise<WorkItemTracking.WorkItemClassificationNode[]> {

        const queryValues: any = {
            ids: ids && ids.join(","),
            '$depth': depth,
            errorPolicy: errorPolicy
        };

        return this.beginRequest<WorkItemTracking.WorkItemClassificationNode[]>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "{project}/_apis/wit/classificationNodes",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets root classification nodes under the project.
     * 
     * @param project - Project ID or project name
     * @param depth - Depth of children to fetch.
     */
    public async getRootNodes(
        project: string,
        depth?: number
        ): Promise<WorkItemTracking.WorkItemClassificationNode[]> {

        const queryValues: any = {
            '$depth': depth
        };

        return this.beginRequest<WorkItemTracking.WorkItemClassificationNode[]>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "{project}/_apis/wit/classificationNodes",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Create new or update an existing classification node.
     * 
     * @param postedNode - Node to create or update.
     * @param project - Project ID or project name
     * @param structureGroup - Structure group of the classification node, area or iteration.
     * @param path - Path of the classification node.
     */
    public async createOrUpdateClassificationNode(
        postedNode: WorkItemTracking.WorkItemClassificationNode,
        project: string,
        structureGroup: WorkItemTracking.TreeStructureGroup,
        path?: string
        ): Promise<WorkItemTracking.WorkItemClassificationNode> {

        return this.beginRequest<WorkItemTracking.WorkItemClassificationNode>({
            apiVersion: "5.0-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/wit/classificationNodes/{structureGroup}/{*path}",
            routeValues: {
                project: project,
                structureGroup: structureGroup,
                path: path
            },
            body: postedNode
        });
    }

    /**
     * Delete an existing classification node.
     * 
     * @param project - Project ID or project name
     * @param structureGroup - Structure group of the classification node, area or iteration.
     * @param path - Path of the classification node.
     * @param reclassifyId - Id of the target classification node for reclassification.
     */
    public async deleteClassificationNode(
        project: string,
        structureGroup: WorkItemTracking.TreeStructureGroup,
        path?: string,
        reclassifyId?: number
        ): Promise<void> {

        const queryValues: any = {
            '$reclassifyId': reclassifyId
        };

        return this.beginRequest<void>({
            apiVersion: "5.0-preview.2",
            method: "DELETE",
            routeTemplate: "{project}/_apis/wit/classificationNodes/{structureGroup}/{*path}",
            routeValues: {
                project: project,
                structureGroup: structureGroup,
                path: path
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets the classification node for a given node path.
     * 
     * @param project - Project ID or project name
     * @param structureGroup - Structure group of the classification node, area or iteration.
     * @param path - Path of the classification node.
     * @param depth - Depth of children to fetch.
     */
    public async getClassificationNode(
        project: string,
        structureGroup: WorkItemTracking.TreeStructureGroup,
        path?: string,
        depth?: number
        ): Promise<WorkItemTracking.WorkItemClassificationNode> {

        const queryValues: any = {
            '$depth': depth
        };

        return this.beginRequest<WorkItemTracking.WorkItemClassificationNode>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "{project}/_apis/wit/classificationNodes/{structureGroup}/{*path}",
            routeValues: {
                project: project,
                structureGroup: structureGroup,
                path: path
            },
            queryParams: queryValues
        });
    }

    /**
     * Update an existing classification node.
     * 
     * @param postedNode - Node to create or update.
     * @param project - Project ID or project name
     * @param structureGroup - Structure group of the classification node, area or iteration.
     * @param path - Path of the classification node.
     */
    public async updateClassificationNode(
        postedNode: WorkItemTracking.WorkItemClassificationNode,
        project: string,
        structureGroup: WorkItemTracking.TreeStructureGroup,
        path?: string
        ): Promise<WorkItemTracking.WorkItemClassificationNode> {

        return this.beginRequest<WorkItemTracking.WorkItemClassificationNode>({
            apiVersion: "5.0-preview.2",
            method: "PATCH",
            routeTemplate: "{project}/_apis/wit/classificationNodes/{structureGroup}/{*path}",
            routeValues: {
                project: project,
                structureGroup: structureGroup,
                path: path
            },
            body: postedNode
        });
    }

    /**
     * Gets a comment for a work item at the specified revision.
     * 
     * @param id - Work item id
     * @param revision - Revision for which the comment need to be fetched
     * @param project - Project ID or project name
     */
    public async getComment(
        id: number,
        revision: number,
        project?: string
        ): Promise<WorkItemTracking.WorkItemComment> {

        return this.beginRequest<WorkItemTracking.WorkItemComment>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "{project}/_apis/wit/workItems/{id}/comments/{revision}",
            routeValues: {
                project: project,
                id: id,
                revision: revision
            }
        });
    }

    /**
     * Gets the specified number of comments for a work item from the specified revision.
     * 
     * @param id - Work item id
     * @param project - Project ID or project name
     * @param fromRevision - Revision from which comments are to be fetched (default is 1)
     * @param top - The number of comments to return (default is 200)
     * @param order - Ascending or descending by revision id (default is ascending)
     */
    public async getComments(
        id: number,
        project?: string,
        fromRevision?: number,
        top?: number,
        order?: WorkItemTracking.CommentSortOrder
        ): Promise<WorkItemTracking.WorkItemComments> {

        const queryValues: any = {
            fromRevision: fromRevision,
            '$top': top,
            order: order
        };

        return this.beginRequest<WorkItemTracking.WorkItemComments>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "{project}/_apis/wit/workItems/{id}/comments/{revision}",
            routeValues: {
                project: project,
                id: id
            },
            queryParams: queryValues
        });
    }

    /**
     * Create a new field.
     * 
     * @param workItemField - New field definition
     * @param project - Project ID or project name
     */
    public async createField(
        workItemField: WorkItemTracking.WorkItemField,
        project?: string
        ): Promise<WorkItemTracking.WorkItemField> {

        return this.beginRequest<WorkItemTracking.WorkItemField>({
            apiVersion: "5.0-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/wit/fields/{fieldNameOrRefName}",
            routeValues: {
                project: project
            },
            body: workItemField
        });
    }

    /**
     * Deletes the field. To undelete a filed, see "Update Field" API.
     * 
     * @param fieldNameOrRefName - Field simple name or reference name
     * @param project - Project ID or project name
     */
    public async deleteField(
        fieldNameOrRefName: string,
        project?: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "5.0-preview.2",
            method: "DELETE",
            routeTemplate: "{project}/_apis/wit/fields/{fieldNameOrRefName}",
            routeValues: {
                project: project,
                fieldNameOrRefName: fieldNameOrRefName
            }
        });
    }

    /**
     * Gets information on a specific field.
     * 
     * @param fieldNameOrRefName - Field simple name or reference name
     * @param project - Project ID or project name
     */
    public async getField(
        fieldNameOrRefName: string,
        project?: string
        ): Promise<WorkItemTracking.WorkItemField> {

        return this.beginRequest<WorkItemTracking.WorkItemField>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "{project}/_apis/wit/fields/{fieldNameOrRefName}",
            routeValues: {
                project: project,
                fieldNameOrRefName: fieldNameOrRefName
            }
        });
    }

    /**
     * Returns information for all fields. The project ID/name parameter is optional.
     * 
     * @param project - Project ID or project name
     * @param expand - Use ExtensionFields to include extension fields, otherwise exclude them. Unless the feature flag for this parameter is enabled, extension fields are always included.
     */
    public async getFields(
        project?: string,
        expand?: WorkItemTracking.GetFieldsExpand
        ): Promise<WorkItemTracking.WorkItemField[]> {

        const queryValues: any = {
            '$expand': expand
        };

        return this.beginRequest<WorkItemTracking.WorkItemField[]>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "{project}/_apis/wit/fields/{fieldNameOrRefName}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Update a field.
     * 
     * @param payload - Payload contains desired value of the field's properties
     * @param fieldNameOrRefName - Name/reference name of the field to be updated
     * @param project - Project ID or project name
     */
    public async updateField(
        payload: WorkItemTracking.UpdateWorkItemField,
        fieldNameOrRefName: string,
        project?: string
        ): Promise<WorkItemTracking.WorkItemField> {

        return this.beginRequest<WorkItemTracking.WorkItemField>({
            apiVersion: "5.0-preview.2",
            method: "PATCH",
            routeTemplate: "{project}/_apis/wit/fields/{fieldNameOrRefName}",
            routeValues: {
                project: project,
                fieldNameOrRefName: fieldNameOrRefName
            },
            body: payload
        });
    }

    /**
     * Creates a query, or moves a query.
     * 
     * @param postedQuery - The query to create.
     * @param project - Project ID or project name
     * @param query - The parent id or path under which the query is to be created.
     * @param validateWiqlOnly - If you only want to validate your WIQL query without actually creating one, set it to true. Default is false.
     */
    public async createQuery(
        postedQuery: WorkItemTracking.QueryHierarchyItem,
        project: string,
        query: string,
        validateWiqlOnly?: boolean
        ): Promise<WorkItemTracking.QueryHierarchyItem> {

        const queryValues: any = {
            validateWiqlOnly: validateWiqlOnly
        };

        return this.beginRequest<WorkItemTracking.QueryHierarchyItem>({
            apiVersion: "5.0-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/wit/queries/{*query}",
            routeValues: {
                project: project,
                query: query
            },
            queryParams: queryValues,
            body: postedQuery
        });
    }

    /**
     * Delete a query or a folder. This deletes any permission change on the deleted query or folder and any of its descendants if it is a folder. It is important to note that the deleted permission changes cannot be recovered upon undeleting the query or folder.
     * 
     * @param project - Project ID or project name
     * @param query - ID or path of the query or folder to delete.
     */
    public async deleteQuery(
        project: string,
        query: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "5.0-preview.2",
            method: "DELETE",
            routeTemplate: "{project}/_apis/wit/queries/{*query}",
            routeValues: {
                project: project,
                query: query
            }
        });
    }

    /**
     * Gets the root queries and their children
     * 
     * @param project - Project ID or project name
     * @param expand - Include the query string (wiql), clauses, query result columns, and sort options in the results.
     * @param depth - In the folder of queries, return child queries and folders to this depth.
     * @param includeDeleted - Include deleted queries and folders
     */
    public async getQueries(
        project: string,
        expand?: WorkItemTracking.QueryExpand,
        depth?: number,
        includeDeleted?: boolean
        ): Promise<WorkItemTracking.QueryHierarchyItem[]> {

        const queryValues: any = {
            '$expand': expand,
            '$depth': depth,
            '$includeDeleted': includeDeleted
        };

        return this.beginRequest<WorkItemTracking.QueryHierarchyItem[]>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "{project}/_apis/wit/queries/{*query}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Retrieves an individual query and its children
     * 
     * @param project - Project ID or project name
     * @param query - ID or path of the query.
     * @param expand - Include the query string (wiql), clauses, query result columns, and sort options in the results.
     * @param depth - In the folder of queries, return child queries and folders to this depth.
     * @param includeDeleted - Include deleted queries and folders
     * @param useIsoDateFormat - DateTime query clauses will be formatted using a ISO 8601 compliant format
     */
    public async getQuery(
        project: string,
        query: string,
        expand?: WorkItemTracking.QueryExpand,
        depth?: number,
        includeDeleted?: boolean,
        useIsoDateFormat?: boolean
        ): Promise<WorkItemTracking.QueryHierarchyItem> {

        const queryValues: any = {
            '$expand': expand,
            '$depth': depth,
            '$includeDeleted': includeDeleted,
            '$useIsoDateFormat': useIsoDateFormat
        };

        return this.beginRequest<WorkItemTracking.QueryHierarchyItem>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "{project}/_apis/wit/queries/{*query}",
            routeValues: {
                project: project,
                query: query
            },
            queryParams: queryValues
        });
    }

    /**
     * Searches all queries the user has access to in the current project
     * 
     * @param project - Project ID or project name
     * @param filter - The text to filter the queries with.
     * @param top - The number of queries to return (Default is 50 and maximum is 200).
     * @param expand - 
     * @param includeDeleted - Include deleted queries and folders
     */
    public async searchQueries(
        project: string,
        filter: string,
        top?: number,
        expand?: WorkItemTracking.QueryExpand,
        includeDeleted?: boolean
        ): Promise<WorkItemTracking.QueryHierarchyItemsResult> {

        const queryValues: any = {
            '$filter': filter,
            '$top': top,
            '$expand': expand,
            '$includeDeleted': includeDeleted
        };

        return this.beginRequest<WorkItemTracking.QueryHierarchyItemsResult>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "{project}/_apis/wit/queries/{*query}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Update a query or a folder. This allows you to update, rename and move queries and folders.
     * 
     * @param queryUpdate - The query to update.
     * @param project - Project ID or project name
     * @param query - The ID or path for the query to update.
     * @param undeleteDescendants - Undelete the children of this folder. It is important to note that this will not bring back the permission changes that were previously applied to the descendants.
     */
    public async updateQuery(
        queryUpdate: WorkItemTracking.QueryHierarchyItem,
        project: string,
        query: string,
        undeleteDescendants?: boolean
        ): Promise<WorkItemTracking.QueryHierarchyItem> {

        const queryValues: any = {
            '$undeleteDescendants': undeleteDescendants
        };

        return this.beginRequest<WorkItemTracking.QueryHierarchyItem>({
            apiVersion: "5.0-preview.2",
            method: "PATCH",
            routeTemplate: "{project}/_apis/wit/queries/{*query}",
            routeValues: {
                project: project,
                query: query
            },
            queryParams: queryValues,
            body: queryUpdate
        });
    }

    /**
     * Gets a list of queries by ids (Maximum 1000)
     * 
     * @param queryGetRequest - 
     * @param project - Project ID or project name
     */
    public async getQueriesBatch(
        queryGetRequest: WorkItemTracking.QueryBatchGetRequest,
        project: string
        ): Promise<WorkItemTracking.QueryHierarchyItem[]> {

        return this.beginRequest<WorkItemTracking.QueryHierarchyItem[]>({
            apiVersion: "5.0-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/wit/queriesBatch",
            routeValues: {
                project: project
            },
            body: queryGetRequest
        });
    }

    /**
     * Destroys the specified work item permanently from the Recycle Bin. This action can not be undone.
     * 
     * @param id - ID of the work item to be destroyed permanently
     * @param project - Project ID or project name
     */
    public async destroyWorkItem(
        id: number,
        project?: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "5.0-preview.2",
            method: "DELETE",
            routeTemplate: "{project}/_apis/wit/recyclebin/{id}",
            routeValues: {
                project: project,
                id: id
            }
        });
    }

    /**
     * Gets a deleted work item from Recycle Bin.
     * 
     * @param id - ID of the work item to be returned
     * @param project - Project ID or project name
     */
    public async getDeletedWorkItem(
        id: number,
        project?: string
        ): Promise<WorkItemTracking.WorkItemDelete> {

        return this.beginRequest<WorkItemTracking.WorkItemDelete>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "{project}/_apis/wit/recyclebin/{id}",
            routeValues: {
                project: project,
                id: id
            }
        });
    }

    /**
     * Gets the work items from the recycle bin, whose IDs have been specified in the parameters
     * 
     * @param ids - Comma separated list of IDs of the deleted work items to be returned
     * @param project - Project ID or project name
     */
    public async getDeletedWorkItems(
        ids: number[],
        project?: string
        ): Promise<WorkItemTracking.WorkItemDeleteReference[]> {

        const queryValues: any = {
            ids: ids && ids.join(",")
        };

        return this.beginRequest<WorkItemTracking.WorkItemDeleteReference[]>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "{project}/_apis/wit/recyclebin/{id}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets a list of the IDs and the URLs of the deleted the work items in the Recycle Bin.
     * 
     * @param project - Project ID or project name
     */
    public async getDeletedWorkItemShallowReferences(
        project?: string
        ): Promise<WorkItemTracking.WorkItemDeleteShallowReference[]> {

        return this.beginRequest<WorkItemTracking.WorkItemDeleteShallowReference[]>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "{project}/_apis/wit/recyclebin/{id}",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * Restores the deleted work item from Recycle Bin.
     * 
     * @param payload - Paylod with instructions to update the IsDeleted flag to false
     * @param id - ID of the work item to be restored
     * @param project - Project ID or project name
     */
    public async restoreWorkItem(
        payload: WorkItemTracking.WorkItemDeleteUpdate,
        id: number,
        project?: string
        ): Promise<WorkItemTracking.WorkItemDelete> {

        return this.beginRequest<WorkItemTracking.WorkItemDelete>({
            apiVersion: "5.0-preview.2",
            method: "PATCH",
            routeTemplate: "{project}/_apis/wit/recyclebin/{id}",
            routeValues: {
                project: project,
                id: id
            },
            body: payload
        });
    }

    /**
     * Returns a fully hydrated work item for the requested revision
     * 
     * @param id - 
     * @param revisionNumber - 
     * @param project - Project ID or project name
     * @param expand - 
     */
    public async getRevision(
        id: number,
        revisionNumber: number,
        project?: string,
        expand?: WorkItemTracking.WorkItemExpand
        ): Promise<WorkItemTracking.WorkItem> {

        const queryValues: any = {
            '$expand': expand
        };

        return this.beginRequest<WorkItemTracking.WorkItem>({
            apiVersion: "5.0-preview.3",
            routeTemplate: "{project}/_apis/wit/workItems/{id}/revisions/{revisionNumber}",
            routeValues: {
                project: project,
                id: id,
                revisionNumber: revisionNumber
            },
            queryParams: queryValues
        });
    }

    /**
     * Returns the list of fully hydrated work item revisions, paged.
     * 
     * @param id - 
     * @param project - Project ID or project name
     * @param top - 
     * @param skip - 
     * @param expand - 
     */
    public async getRevisions(
        id: number,
        project?: string,
        top?: number,
        skip?: number,
        expand?: WorkItemTracking.WorkItemExpand
        ): Promise<WorkItemTracking.WorkItem[]> {

        const queryValues: any = {
            '$top': top,
            '$skip': skip,
            '$expand': expand
        };

        return this.beginRequest<WorkItemTracking.WorkItem[]>({
            apiVersion: "5.0-preview.3",
            routeTemplate: "{project}/_apis/wit/workItems/{id}/revisions/{revisionNumber}",
            routeValues: {
                project: project,
                id: id
            },
            queryParams: queryValues
        });
    }

    /**
     * RESTful method to send mail for selected/queried work items.
     * 
     * @param body - 
     * @param project - Project ID or project name
     */
    public async sendMail(
        body: WorkItemTracking.SendMailBody,
        project?: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "5.0-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/wit/sendMail",
            routeValues: {
                project: project
            },
            body: body
        });
    }

    /**
     * Creates a template
     * 
     * @param template - Template contents
     * @param project - Project ID or project name
     * @param team - Team ID or team name
     */
    public async createTemplate(
        template: WorkItemTracking.WorkItemTemplate,
        project: string,
        team: string
        ): Promise<WorkItemTracking.WorkItemTemplate> {

        return this.beginRequest<WorkItemTracking.WorkItemTemplate>({
            apiVersion: "5.0-preview.1",
            method: "POST",
            routeTemplate: "{project}/{team}/_apis/wit/templates",
            routeValues: {
                project: project,
                team: team
            },
            body: template
        });
    }

    /**
     * Gets template
     * 
     * @param project - Project ID or project name
     * @param team - Team ID or team name
     * @param workitemtypename - Optional, When specified returns templates for given Work item type.
     */
    public async getTemplates(
        project: string,
        team: string,
        workitemtypename?: string
        ): Promise<WorkItemTracking.WorkItemTemplateReference[]> {

        const queryValues: any = {
            workitemtypename: workitemtypename
        };

        return this.beginRequest<WorkItemTracking.WorkItemTemplateReference[]>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/wit/templates",
            routeValues: {
                project: project,
                team: team
            },
            queryParams: queryValues
        });
    }

    /**
     * Deletes the template with given id
     * 
     * @param project - Project ID or project name
     * @param team - Team ID or team name
     * @param templateId - Template id
     */
    public async deleteTemplate(
        project: string,
        team: string,
        templateId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "5.0-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/{team}/_apis/wit/templates/{templateId}",
            routeValues: {
                project: project,
                team: team,
                templateId: templateId
            }
        });
    }

    /**
     * Gets the template with specified id
     * 
     * @param project - Project ID or project name
     * @param team - Team ID or team name
     * @param templateId - Template Id
     */
    public async getTemplate(
        project: string,
        team: string,
        templateId: string
        ): Promise<WorkItemTracking.WorkItemTemplate> {

        return this.beginRequest<WorkItemTracking.WorkItemTemplate>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/wit/templates/{templateId}",
            routeValues: {
                project: project,
                team: team,
                templateId: templateId
            }
        });
    }

    /**
     * Replace template contents
     * 
     * @param templateContent - Template contents to replace with
     * @param project - Project ID or project name
     * @param team - Team ID or team name
     * @param templateId - Template id
     */
    public async replaceTemplate(
        templateContent: WorkItemTracking.WorkItemTemplate,
        project: string,
        team: string,
        templateId: string
        ): Promise<WorkItemTracking.WorkItemTemplate> {

        return this.beginRequest<WorkItemTracking.WorkItemTemplate>({
            apiVersion: "5.0-preview.1",
            method: "PUT",
            routeTemplate: "{project}/{team}/_apis/wit/templates/{templateId}",
            routeValues: {
                project: project,
                team: team,
                templateId: templateId
            },
            body: templateContent
        });
    }

    /**
     * Returns a single update for a work item
     * 
     * @param id - 
     * @param updateNumber - 
     * @param project - Project ID or project name
     */
    public async getUpdate(
        id: number,
        updateNumber: number,
        project?: string
        ): Promise<WorkItemTracking.WorkItemUpdate> {

        return this.beginRequest<WorkItemTracking.WorkItemUpdate>({
            apiVersion: "5.0-preview.3",
            routeTemplate: "{project}/_apis/wit/workItems/{id}/updates/{updateNumber}",
            routeValues: {
                project: project,
                id: id,
                updateNumber: updateNumber
            }
        });
    }

    /**
     * Returns a the deltas between work item revisions
     * 
     * @param id - 
     * @param project - Project ID or project name
     * @param top - 
     * @param skip - 
     */
    public async getUpdates(
        id: number,
        project?: string,
        top?: number,
        skip?: number
        ): Promise<WorkItemTracking.WorkItemUpdate[]> {

        const queryValues: any = {
            '$top': top,
            '$skip': skip
        };

        return this.beginRequest<WorkItemTracking.WorkItemUpdate[]>({
            apiVersion: "5.0-preview.3",
            routeTemplate: "{project}/_apis/wit/workItems/{id}/updates/{updateNumber}",
            routeValues: {
                project: project,
                id: id
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets the results of the query given its WIQL.
     * 
     * @param wiql - The query containing the WIQL.
     * @param project - Project ID or project name
     * @param team - Team ID or team name
     * @param timePrecision - Whether or not to use time precision.
     * @param top - The max number of results to return.
     */
    public async queryByWiql(
        wiql: WorkItemTracking.Wiql,
        project?: string,
        team?: string,
        timePrecision?: boolean,
        top?: number
        ): Promise<WorkItemTracking.WorkItemQueryResult> {

        const queryValues: any = {
            timePrecision: timePrecision,
            '$top': top
        };

        return this.beginRequest<WorkItemTracking.WorkItemQueryResult>({
            apiVersion: "5.0-preview.2",
            method: "POST",
            routeTemplate: "{project}/{team}/_apis/wit/wiql",
            routeValues: {
                project: project,
                team: team
            },
            queryParams: queryValues,
            body: wiql
        });
    }

    /**
     * Gets the results of the query given the query ID.
     * 
     * @param id - The query ID.
     * @param project - Project ID or project name
     * @param team - Team ID or team name
     * @param timePrecision - Whether or not to use time precision.
     * @param top - The max number of results to return.
     */
    public async getQueryResultCount(
        id: string,
        project?: string,
        team?: string,
        timePrecision?: boolean,
        top?: number
        ): Promise<number> {

        const queryValues: any = {
            timePrecision: timePrecision,
            '$top': top
        };

        return this.beginRequest<Response>({
            apiVersion: "5.0-preview.2",
            method: "HEAD",
            routeTemplate: "{project}/{team}/_apis/wit/wiql/{id}",
            routeValues: {
                project: project,
                team: team,
                id: id
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            return Number(response.headers.get("X-Total-Count"));
        });
    }

    /**
     * Gets the results of the query given the query ID.
     * 
     * @param id - The query ID.
     * @param project - Project ID or project name
     * @param team - Team ID or team name
     * @param timePrecision - Whether or not to use time precision.
     * @param top - The max number of results to return.
     */
    public async queryById(
        id: string,
        project?: string,
        team?: string,
        timePrecision?: boolean,
        top?: number
        ): Promise<WorkItemTracking.WorkItemQueryResult> {

        const queryValues: any = {
            timePrecision: timePrecision,
            '$top': top
        };

        return this.beginRequest<WorkItemTracking.WorkItemQueryResult>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "{project}/{team}/_apis/wit/wiql/{id}",
            routeValues: {
                project: project,
                team: team,
                id: id
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a work item icon given the friendly name and icon color.
     * 
     * @param icon - The name of the icon
     * @param color - The 6-digit hex color for the icon
     * @param v - The version of the icon (used only for cache invalidation)
     */
    public async getWorkItemIconJson(
        icon: string,
        color?: string,
        v?: number
        ): Promise<WorkItemTracking.WorkItemIcon> {

        const queryValues: any = {
            color: color,
            v: v
        };

        return this.beginRequest<WorkItemTracking.WorkItemIcon>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "_apis/wit/workItemIcons/{icon}",
            routeValues: {
                icon: icon
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a list of all work item icons.
     * 
     */
    public async getWorkItemIcons(
        ): Promise<WorkItemTracking.WorkItemIcon[]> {

        return this.beginRequest<WorkItemTracking.WorkItemIcon[]>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "_apis/wit/workItemIcons/{icon}"
        });
    }

    /**
     * Get a work item icon given the friendly name and icon color.
     * 
     * @param icon - The name of the icon
     * @param color - The 6-digit hex color for the icon
     * @param v - The version of the icon (used only for cache invalidation)
     */
    public async getWorkItemIconSvg(
        icon: string,
        color?: string,
        v?: number
        ): Promise<any> {

        const queryValues: any = {
            color: color,
            v: v
        };

        return this.beginRequest<any>({
            apiVersion: "5.0-preview.1",
            httpResponseType: "image/svg+xml",
            routeTemplate: "_apis/wit/workItemIcons/{icon}",
            routeValues: {
                icon: icon
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a work item icon given the friendly name and icon color.
     * 
     * @param icon - The name of the icon
     * @param color - The 6-digit hex color for the icon
     * @param v - The version of the icon (used only for cache invalidation)
     */
    public async getWorkItemIconXaml(
        icon: string,
        color?: string,
        v?: number
        ): Promise<any> {

        const queryValues: any = {
            color: color,
            v: v
        };

        return this.beginRequest<any>({
            apiVersion: "5.0-preview.1",
            httpResponseType: "image/xaml+xml",
            routeTemplate: "_apis/wit/workItemIcons/{icon}",
            routeValues: {
                icon: icon
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a batch of work item links
     * 
     * @param project - Project ID or project name
     * @param linkTypes - A list of types to filter the results to specific link types. Omit this parameter to get work item links of all link types.
     * @param types - A list of types to filter the results to specific work item types. Omit this parameter to get work item links of all work item types.
     * @param continuationToken - Specifies the continuationToken to start the batch from. Omit this parameter to get the first batch of links.
     * @param startDateTime - Date/time to use as a starting point for link changes. Only link changes that occurred after that date/time will be returned. Cannot be used in conjunction with 'watermark' parameter.
     */
    public async getReportingLinksByLinkType(
        project?: string,
        linkTypes?: string[],
        types?: string[],
        continuationToken?: string,
        startDateTime?: Date
        ): Promise<WorkItemTracking.ReportingWorkItemLinksBatch> {

        const queryValues: any = {
            linkTypes: linkTypes && linkTypes.join(","),
            types: types && types.join(","),
            continuationToken: continuationToken,
            startDateTime: startDateTime
        };

        return this.beginRequest<WorkItemTracking.ReportingWorkItemLinksBatch>({
            apiVersion: "5.0-preview.3",
            routeTemplate: "{project}/_apis/wit/reporting/workItemLinks",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets the work item relation type definition.
     * 
     * @param relation - The relation name
     */
    public async getRelationType(
        relation: string
        ): Promise<WorkItemTracking.WorkItemRelationType> {

        return this.beginRequest<WorkItemTracking.WorkItemRelationType>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "_apis/wit/workItemRelationTypes/{relation}",
            routeValues: {
                relation: relation
            }
        });
    }

    /**
     * Gets the work item relation types.
     * 
     */
    public async getRelationTypes(
        ): Promise<WorkItemTracking.WorkItemRelationType[]> {

        return this.beginRequest<WorkItemTracking.WorkItemRelationType[]>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "_apis/wit/workItemRelationTypes/{relation}"
        });
    }

    /**
     * Get a batch of work item revisions with the option of including deleted items
     * 
     * @param project - Project ID or project name
     * @param fields - A list of fields to return in work item revisions. Omit this parameter to get all reportable fields.
     * @param types - A list of types to filter the results to specific work item types. Omit this parameter to get work item revisions of all work item types.
     * @param continuationToken - Specifies the watermark to start the batch from. Omit this parameter to get the first batch of revisions.
     * @param startDateTime - Date/time to use as a starting point for revisions, all revisions will occur after this date/time. Cannot be used in conjunction with 'watermark' parameter.
     * @param includeIdentityRef - Return an identity reference instead of a string value for identity fields.
     * @param includeDeleted - Specify if the deleted item should be returned.
     * @param includeTagRef - Specify if the tag objects should be returned for System.Tags field.
     * @param includeLatestOnly - Return only the latest revisions of work items, skipping all historical revisions
     * @param expand - Return all the fields in work item revisions, including long text fields which are not returned by default
     * @param includeDiscussionChangesOnly - Return only the those revisions of work items, where only history field was changed
     * @param maxPageSize - The maximum number of results to return in this batch
     */
    public async readReportingRevisionsGet(
        project?: string,
        fields?: string[],
        types?: string[],
        continuationToken?: string,
        startDateTime?: Date,
        includeIdentityRef?: boolean,
        includeDeleted?: boolean,
        includeTagRef?: boolean,
        includeLatestOnly?: boolean,
        expand?: WorkItemTracking.ReportingRevisionsExpand,
        includeDiscussionChangesOnly?: boolean,
        maxPageSize?: number
        ): Promise<WorkItemTracking.ReportingWorkItemRevisionsBatch> {

        const queryValues: any = {
            fields: fields && fields.join(","),
            types: types && types.join(","),
            continuationToken: continuationToken,
            startDateTime: startDateTime,
            includeIdentityRef: includeIdentityRef,
            includeDeleted: includeDeleted,
            includeTagRef: includeTagRef,
            includeLatestOnly: includeLatestOnly,
            '$expand': expand,
            includeDiscussionChangesOnly: includeDiscussionChangesOnly,
            '$maxPageSize': maxPageSize
        };

        return this.beginRequest<WorkItemTracking.ReportingWorkItemRevisionsBatch>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "{project}/_apis/wit/reporting/workItemRevisions",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a batch of work item revisions. This request may be used if your list of fields is large enough that it may run the URL over the length limit.
     * 
     * @param filter - An object that contains request settings: field filter, type filter, identity format
     * @param project - Project ID or project name
     * @param continuationToken - Specifies the watermark to start the batch from. Omit this parameter to get the first batch of revisions.
     * @param startDateTime - Date/time to use as a starting point for revisions, all revisions will occur after this date/time. Cannot be used in conjunction with 'watermark' parameter.
     * @param expand - 
     */
    public async readReportingRevisionsPost(
        filter: WorkItemTracking.ReportingWorkItemRevisionsFilter,
        project?: string,
        continuationToken?: string,
        startDateTime?: Date,
        expand?: WorkItemTracking.ReportingRevisionsExpand
        ): Promise<WorkItemTracking.ReportingWorkItemRevisionsBatch> {

        const queryValues: any = {
            continuationToken: continuationToken,
            startDateTime: startDateTime,
            '$expand': expand
        };

        return this.beginRequest<WorkItemTracking.ReportingWorkItemRevisionsBatch>({
            apiVersion: "5.0-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/wit/reporting/workItemRevisions",
            routeValues: {
                project: project
            },
            queryParams: queryValues,
            body: filter
        });
    }

    /**
     * Creates a single work item.
     * 
     * @param document - The JSON Patch document representing the work item
     * @param project - Project ID or project name
     * @param type - The work item type of the work item to create
     * @param validateOnly - Indicate if you only want to validate the changes without saving the work item
     * @param bypassRules - Do not enforce the work item type rules on this update
     * @param suppressNotifications - Do not fire any notifications for this change
     * @param expand - The expand parameters for work item attributes. Possible options are \{ None, Relations, Fields, Links, All \}.
     */
    public async createWorkItem(
        document: WebApi.JsonPatchDocument,
        project: string,
        type: string,
        validateOnly?: boolean,
        bypassRules?: boolean,
        suppressNotifications?: boolean,
        expand?: WorkItemTracking.WorkItemExpand
        ): Promise<WorkItemTracking.WorkItem> {

        const queryValues: any = {
            validateOnly: validateOnly,
            bypassRules: bypassRules,
            suppressNotifications: suppressNotifications,
            '$expand': expand
        };

        return this.beginRequest<WorkItemTracking.WorkItem>({
            apiVersion: "5.0-preview.3",
            method: "POST",
            routeTemplate: "{project}/_apis/wit/workItems/${type}",
            routeValues: {
                project: project,
                type: type
            },
            customHeaders: {
                "Content-Type": "application/json-patch+json",
            },
            queryParams: queryValues,
            body: document
        });
    }

    /**
     * Returns a single work item from a template.
     * 
     * @param project - Project ID or project name
     * @param type - The work item type name
     * @param fields - Comma-separated list of requested fields
     * @param asOf - AsOf UTC date time string
     * @param expand - The expand parameters for work item attributes. Possible options are \{ None, Relations, Fields, Links, All \}.
     */
    public async getWorkItemTemplate(
        project: string,
        type: string,
        fields?: string,
        asOf?: Date,
        expand?: WorkItemTracking.WorkItemExpand
        ): Promise<WorkItemTracking.WorkItem> {

        const queryValues: any = {
            fields: fields,
            asOf: asOf,
            '$expand': expand
        };

        return this.beginRequest<WorkItemTracking.WorkItem>({
            apiVersion: "5.0-preview.3",
            routeTemplate: "{project}/_apis/wit/workItems/${type}",
            routeValues: {
                project: project,
                type: type
            },
            queryParams: queryValues
        });
    }

    /**
     * Deletes the specified work item and sends it to the Recycle Bin, so that it can be restored back, if required. Optionally, if the destroy parameter has been set to true, it destroys the work item permanently. WARNING: If the destroy parameter is set to true, work items deleted by this command will NOT go to recycle-bin and there is no way to restore/recover them after deletion. It is recommended NOT to use this parameter. If you do, please use this parameter with extreme caution.
     * 
     * @param id - ID of the work item to be deleted
     * @param project - Project ID or project name
     * @param destroy - Optional parameter, if set to true, the work item is deleted permanently. Please note: the destroy action is PERMANENT and cannot be undone.
     */
    public async deleteWorkItem(
        id: number,
        project?: string,
        destroy?: boolean
        ): Promise<WorkItemTracking.WorkItemDelete> {

        const queryValues: any = {
            destroy: destroy
        };

        return this.beginRequest<WorkItemTracking.WorkItemDelete>({
            apiVersion: "5.0-preview.3",
            method: "DELETE",
            routeTemplate: "{project}/_apis/wit/workItems/{id}",
            routeValues: {
                project: project,
                id: id
            },
            queryParams: queryValues
        });
    }

    /**
     * Returns a single work item.
     * 
     * @param id - The work item id
     * @param project - Project ID or project name
     * @param fields - Comma-separated list of requested fields
     * @param asOf - AsOf UTC date time string
     * @param expand - The expand parameters for work item attributes. Possible options are \{ None, Relations, Fields, Links, All \}.
     */
    public async getWorkItem(
        id: number,
        project?: string,
        fields?: string[],
        asOf?: Date,
        expand?: WorkItemTracking.WorkItemExpand
        ): Promise<WorkItemTracking.WorkItem> {

        const queryValues: any = {
            fields: fields && fields.join(","),
            asOf: asOf,
            '$expand': expand
        };

        return this.beginRequest<WorkItemTracking.WorkItem>({
            apiVersion: "5.0-preview.3",
            routeTemplate: "{project}/_apis/wit/workItems/{id}",
            routeValues: {
                project: project,
                id: id
            },
            queryParams: queryValues
        });
    }

    /**
     * Returns a list of work items (Maximum 200)
     * 
     * @param ids - The comma-separated list of requested work item ids. (Maximum 200 ids allowed).
     * @param project - Project ID or project name
     * @param fields - Comma-separated list of requested fields
     * @param asOf - AsOf UTC date time string
     * @param expand - The expand parameters for work item attributes. Possible options are \{ None, Relations, Fields, Links, All \}.
     * @param errorPolicy - The flag to control error policy in a bulk get work items request. Possible options are \{Fail, Omit\}.
     */
    public async getWorkItems(
        ids: number[],
        project?: string,
        fields?: string[],
        asOf?: Date,
        expand?: WorkItemTracking.WorkItemExpand,
        errorPolicy?: WorkItemTracking.WorkItemErrorPolicy
        ): Promise<WorkItemTracking.WorkItem[]> {

        const queryValues: any = {
            ids: ids && ids.join(","),
            fields: fields && fields.join(","),
            asOf: asOf,
            '$expand': expand,
            errorPolicy: errorPolicy
        };

        return this.beginRequest<WorkItemTracking.WorkItem[]>({
            apiVersion: "5.0-preview.3",
            routeTemplate: "{project}/_apis/wit/workItems/{id}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Updates a single work item.
     * 
     * @param document - The JSON Patch document representing the update
     * @param id - The id of the work item to update
     * @param project - Project ID or project name
     * @param validateOnly - Indicate if you only want to validate the changes without saving the work item
     * @param bypassRules - Do not enforce the work item type rules on this update
     * @param suppressNotifications - Do not fire any notifications for this change
     * @param expand - The expand parameters for work item attributes. Possible options are \{ None, Relations, Fields, Links, All \}.
     */
    public async updateWorkItem(
        document: WebApi.JsonPatchDocument,
        id: number,
        project?: string,
        validateOnly?: boolean,
        bypassRules?: boolean,
        suppressNotifications?: boolean,
        expand?: WorkItemTracking.WorkItemExpand
        ): Promise<WorkItemTracking.WorkItem> {

        const queryValues: any = {
            validateOnly: validateOnly,
            bypassRules: bypassRules,
            suppressNotifications: suppressNotifications,
            '$expand': expand
        };

        return this.beginRequest<WorkItemTracking.WorkItem>({
            apiVersion: "5.0-preview.3",
            method: "PATCH",
            routeTemplate: "{project}/_apis/wit/workItems/{id}",
            routeValues: {
                project: project,
                id: id
            },
            customHeaders: {
                "Content-Type": "application/json-patch+json",
            },
            queryParams: queryValues,
            body: document
        });
    }

    /**
     * Gets work items for a list of work item ids (Maximum 200)
     * 
     * @param workItemGetRequest - 
     * @param project - Project ID or project name
     */
    public async getWorkItemsBatch(
        workItemGetRequest: WorkItemTracking.WorkItemBatchGetRequest,
        project?: string
        ): Promise<WorkItemTracking.WorkItem[]> {

        return this.beginRequest<WorkItemTracking.WorkItem[]>({
            apiVersion: "5.0-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/wit/workItemsBatch",
            routeValues: {
                project: project
            },
            body: workItemGetRequest
        });
    }

    /**
     * INTERNAL ONLY: It will be used for My account work experience. Get the work item type state color for multiple projects
     * 
     * @param projectNames - 
     */
    public async getWorkItemStateColors(
        projectNames: string[]
        ): Promise<WorkItemTracking.ProjectWorkItemStateColors[]> {

        return this.beginRequest<WorkItemTracking.ProjectWorkItemStateColors[]>({
            apiVersion: "5.0-preview.1",
            method: "POST",
            routeTemplate: "_apis/work/workitemStateColor",
            body: projectNames
        });
    }

    /**
     * Returns the next state on the given work item IDs.
     * 
     * @param ids - list of work item ids
     * @param action - possible actions. Currently only supports checkin
     */
    public async getWorkItemNextStatesOnCheckinAction(
        ids: number[],
        action?: string
        ): Promise<WorkItemTracking.WorkItemNextStateOnTransition[]> {

        const queryValues: any = {
            ids: ids && ids.join(","),
            action: action
        };

        return this.beginRequest<WorkItemTracking.WorkItemNextStateOnTransition[]>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "_apis/wit/workItemTransitions",
            queryParams: queryValues
        });
    }

    /**
     * Get all work item type categories.
     * 
     * @param project - Project ID or project name
     */
    public async getWorkItemTypeCategories(
        project: string
        ): Promise<WorkItemTracking.WorkItemTypeCategory[]> {

        return this.beginRequest<WorkItemTracking.WorkItemTypeCategory[]>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "{project}/_apis/wit/workItemTypeCategories/{category}",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * Get specific work item type category by name.
     * 
     * @param project - Project ID or project name
     * @param category - The category name
     */
    public async getWorkItemTypeCategory(
        project: string,
        category: string
        ): Promise<WorkItemTracking.WorkItemTypeCategory> {

        return this.beginRequest<WorkItemTracking.WorkItemTypeCategory>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "{project}/_apis/wit/workItemTypeCategories/{category}",
            routeValues: {
                project: project,
                category: category
            }
        });
    }

    /**
     * INTERNAL ONLY: It will be used for My account work experience. Get the wit type color for multiple projects
     * 
     * @param projectNames - 
     */
    public async getWorkItemTypeColors(
        projectNames: string[]
        ): Promise<{ key: string; value: WorkItemTracking.WorkItemTypeColor[] }[]> {

        return this.beginRequest<{ key: string; value: WorkItemTracking.WorkItemTypeColor[] }[]>({
            apiVersion: "5.0-preview.1",
            method: "POST",
            routeTemplate: "_apis/work/workitemTypeColor",
            body: projectNames
        });
    }

    /**
     * INTERNAL ONLY: It is used for color and icon providers. Get the wit type color for multiple projects
     * 
     * @param projectNames - 
     */
    public async getWorkItemTypeColorAndIcons(
        projectNames: string[]
        ): Promise<{ key: string; value: WorkItemTracking.WorkItemTypeColorAndIcon[] }[]> {

        return this.beginRequest<{ key: string; value: WorkItemTracking.WorkItemTypeColorAndIcon[] }[]>({
            apiVersion: "5.0-preview.1",
            method: "POST",
            routeTemplate: "_apis/wit/workItemTypeColorAndIcon",
            body: projectNames
        });
    }

    /**
     * Returns a work item type definition.
     * 
     * @param project - Project ID or project name
     * @param type - Work item type name
     */
    public async getWorkItemType(
        project: string,
        type: string
        ): Promise<WorkItemTracking.WorkItemType> {

        return this.beginRequest<WorkItemTracking.WorkItemType>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "{project}/_apis/wit/workItemTypes/{type}",
            routeValues: {
                project: project,
                type: type
            }
        });
    }

    /**
     * Returns the list of work item types
     * 
     * @param project - Project ID or project name
     */
    public async getWorkItemTypes(
        project: string
        ): Promise<WorkItemTracking.WorkItemType[]> {

        return this.beginRequest<WorkItemTracking.WorkItemType[]>({
            apiVersion: "5.0-preview.2",
            routeTemplate: "{project}/_apis/wit/workItemTypes/{type}",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * Get a list of fields for a work item type with detailed references.
     * 
     * @param project - Project ID or project name
     * @param type - Work item type.
     * @param expand - Expand level for the API response. Properties: to include allowedvalues, default value, isRequired etc. as a part of response; None: to skip these properties.
     */
    public async getWorkItemTypeFieldsWithReferences(
        project: string,
        type: string,
        expand?: WorkItemTracking.WorkItemTypeFieldsExpandLevel
        ): Promise<WorkItemTracking.WorkItemTypeFieldWithReferences[]> {

        const queryValues: any = {
            '$expand': expand
        };

        return this.beginRequest<WorkItemTracking.WorkItemTypeFieldWithReferences[]>({
            apiVersion: "5.0-preview.3",
            routeTemplate: "{project}/_apis/wit/workitemtypes/{type}/fields/{field}",
            routeValues: {
                project: project,
                type: type
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a field for a work item type with detailed references.
     * 
     * @param project - Project ID or project name
     * @param type - Work item type.
     * @param field - 
     * @param expand - Expand level for the API response. Properties: to include allowedvalues, default value, isRequired etc. as a part of response; None: to skip these properties.
     */
    public async getWorkItemTypeFieldWithReferences(
        project: string,
        type: string,
        field: string,
        expand?: WorkItemTracking.WorkItemTypeFieldsExpandLevel
        ): Promise<WorkItemTracking.WorkItemTypeFieldWithReferences> {

        const queryValues: any = {
            '$expand': expand
        };

        return this.beginRequest<WorkItemTracking.WorkItemTypeFieldWithReferences>({
            apiVersion: "5.0-preview.3",
            routeTemplate: "{project}/_apis/wit/workitemtypes/{type}/fields/{field}",
            routeValues: {
                project: project,
                type: type,
                field: field
            },
            queryParams: queryValues
        });
    }

    /**
     * Returns the state names and colors for a work item type.
     * 
     * @param project - Project ID or project name
     * @param type - The state name
     */
    public async getWorkItemTypeStates(
        project: string,
        type: string
        ): Promise<WorkItemTracking.WorkItemStateColor[]> {

        return this.beginRequest<WorkItemTracking.WorkItemStateColor[]>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/_apis/wit/workitemtypes/{type}/states",
            routeValues: {
                project: project,
                type: type
            }
        });
    }

    /**
     * Export work item type
     * 
     * @param project - Project ID or project name
     * @param type - 
     * @param exportGlobalLists - 
     */
    public async exportWorkItemTypeDefinition(
        project?: string,
        type?: string,
        exportGlobalLists?: boolean
        ): Promise<WorkItemTracking.WorkItemTypeTemplate> {

        const queryValues: any = {
            exportGlobalLists: exportGlobalLists
        };

        return this.beginRequest<WorkItemTracking.WorkItemTypeTemplate>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/_apis/wit/workItemTypeTemplate/{type}",
            routeValues: {
                project: project,
                type: type
            },
            queryParams: queryValues
        });
    }

    /**
     * Add/updates a work item type
     * 
     * @param updateModel - 
     * @param project - Project ID or project name
     */
    public async updateWorkItemTypeDefinition(
        updateModel: WorkItemTracking.WorkItemTypeTemplateUpdateModel,
        project?: string
        ): Promise<WorkItemTracking.ProvisioningResult> {

        return this.beginRequest<WorkItemTracking.ProvisioningResult>({
            apiVersion: "5.0-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/wit/workItemTypeTemplate/{type}",
            routeValues: {
                project: project
            },
            body: updateModel
        });
    }

}
