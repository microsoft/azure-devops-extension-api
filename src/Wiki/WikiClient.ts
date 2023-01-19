/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import { deserializeVssJsonObject } from "../Common/Util/Serialization";

import * as Comments_Contracts from "../Comments/Comments";
import * as Git from "../Git/Git";
import * as WebApi from "../WebApi/WebApi";
import * as Wiki from "../Wiki/Wiki";

export class WikiRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "bf7d82a0-8aa5-4613-94ef-6172a5ea01f3";

    /**
     * Uploads an attachment on a comment on a wiki page.
     * 
     * @param content - Content to upload
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param pageId - Wiki page ID.
     */
    public async createCommentAttachment(
        content: any,
        project: string,
        wikiIdentifier: string,
        pageId: number
        ): Promise<Comments_Contracts.CommentAttachment> {

        return this.beginRequest<Comments_Contracts.CommentAttachment>({
            apiVersion: "5.2-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{pageId}/comments/attachments/{attachmentId}",
            routeValues: {
                project: project,
                wikiIdentifier: wikiIdentifier,
                pageId: pageId
            },
            customHeaders: {
                "Content-Type": "application/octet-stream",
            },
            body: content,
            isRawData: true
        });
    }

    /**
     * Downloads an attachment on a comment on a wiki page.
     * 
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param pageId - Wiki page ID.
     * @param attachmentId - Attachment ID.
     */
    public async getAttachmentContent(
        project: string,
        wikiIdentifier: string,
        pageId: number,
        attachmentId: string
        ): Promise<ArrayBuffer> {

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "5.2-preview.1",
            httpResponseType: "application/octet-stream",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{pageId}/comments/attachments/{attachmentId}",
            routeValues: {
                project: project,
                wikiIdentifier: wikiIdentifier,
                pageId: pageId,
                attachmentId: attachmentId
            }
        });
    }

    /**
     * Add a reaction on a wiki page comment.
     * 
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name
     * @param pageId - Wiki page ID
     * @param commentId - ID of the associated comment
     * @param type - Type of the reaction being added
     */
    public async addCommentReaction(
        project: string,
        wikiIdentifier: string,
        pageId: number,
        commentId: number,
        type: Comments_Contracts.CommentReactionType
        ): Promise<Comments_Contracts.CommentReaction> {

        return this.beginRequest<Comments_Contracts.CommentReaction>({
            apiVersion: "5.2-preview.1",
            method: "PUT",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{pageId}/comments/{commentId}/reactions/{type}",
            routeValues: {
                project: project,
                wikiIdentifier: wikiIdentifier,
                pageId: pageId,
                commentId: commentId,
                type: type
            }
        });
    }

    /**
     * Delete a reaction on a wiki page comment.
     * 
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or name
     * @param pageId - Wiki page ID
     * @param commentId - ID of the associated comment
     * @param type - Type of the reaction being deleted
     */
    public async deleteCommentReaction(
        project: string,
        wikiIdentifier: string,
        pageId: number,
        commentId: number,
        type: Comments_Contracts.CommentReactionType
        ): Promise<Comments_Contracts.CommentReaction> {

        return this.beginRequest<Comments_Contracts.CommentReaction>({
            apiVersion: "5.2-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{pageId}/comments/{commentId}/reactions/{type}",
            routeValues: {
                project: project,
                wikiIdentifier: wikiIdentifier,
                pageId: pageId,
                commentId: commentId,
                type: type
            }
        });
    }

    /**
     * Gets a list of users who have reacted for the given wiki comment with a given reaction type. Supports paging, with a default page size of 100 users at a time.
     * 
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param pageId - Wiki page ID.
     * @param commentId - ID of the associated comment
     * @param type - Type of the reaction for which the engaged users are being requested
     * @param top - Number of enagaged users to be returned in a given page. Optional, defaults to 100
     * @param skip - Number of engaged users to be skipped to page the next set of engaged users, defaults to 0
     */
    public async getEngagedUsers(
        project: string,
        wikiIdentifier: string,
        pageId: number,
        commentId: number,
        type: Comments_Contracts.CommentReactionType,
        top?: number,
        skip?: number
        ): Promise<WebApi.IdentityRef[]> {

        const queryValues: any = {
            '$top': top,
            '$skip': skip
        };

        return this.beginRequest<WebApi.IdentityRef[]>({
            apiVersion: "5.2-preview.1",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{pageId}/comments/{commentId}/reactions/{type}/users",
            routeValues: {
                project: project,
                wikiIdentifier: wikiIdentifier,
                pageId: pageId,
                commentId: commentId,
                type: type
            },
            queryParams: queryValues
        });
    }

    /**
     * Add a comment on a wiki page.
     * 
     * @param request - Comment create request.
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param pageId - Wiki page ID.
     */
    public async addComment(
        request: Comments_Contracts.CommentCreateParameters,
        project: string,
        wikiIdentifier: string,
        pageId: number
        ): Promise<Comments_Contracts.Comment> {

        return this.beginRequest<Comments_Contracts.Comment>({
            apiVersion: "5.2-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{pageId}/comments/{id}",
            routeValues: {
                project: project,
                wikiIdentifier: wikiIdentifier,
                pageId: pageId
            },
            body: request
        });
    }

    /**
     * Delete a comment on a wiki page.
     * 
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or name.
     * @param pageId - Wiki page ID.
     * @param id - Comment ID.
     */
    public async deleteComment(
        project: string,
        wikiIdentifier: string,
        pageId: number,
        id: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "5.2-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{pageId}/comments/{id}",
            routeValues: {
                project: project,
                wikiIdentifier: wikiIdentifier,
                pageId: pageId,
                id: id
            }
        });
    }

    /**
     * Returns a comment associated with the Wiki Page.
     * 
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param pageId - Wiki page ID.
     * @param id - ID of the comment to return.
     * @param excludeDeleted - Specify if the deleted comment should be skipped.
     * @param expand - Specifies the additional data retrieval options for comments.
     */
    public async getComment(
        project: string,
        wikiIdentifier: string,
        pageId: number,
        id: number,
        excludeDeleted?: boolean,
        expand?: Comments_Contracts.CommentExpandOptions
        ): Promise<Comments_Contracts.Comment> {

        const queryValues: any = {
            excludeDeleted: excludeDeleted,
            '$expand': expand
        };

        return this.beginRequest<Comments_Contracts.Comment>({
            apiVersion: "5.2-preview.1",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{pageId}/comments/{id}",
            routeValues: {
                project: project,
                wikiIdentifier: wikiIdentifier,
                pageId: pageId,
                id: id
            },
            queryParams: queryValues
        });
    }

    /**
     * Returns a pageable list of comments.
     * 
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param pageId - Wiki page ID.
     * @param top - Max number of comments to return.
     * @param continuationToken - Used to query for the next page of comments.
     * @param excludeDeleted - Specify if the deleted comments should be skipped.
     * @param expand - Specifies the additional data retrieval options for comments.
     * @param order - Order in which the comments should be returned.
     * @param parentId - CommentId of the parent comment.
     */
    public async listComments(
        project: string,
        wikiIdentifier: string,
        pageId: number,
        top?: number,
        continuationToken?: string,
        excludeDeleted?: boolean,
        expand?: Comments_Contracts.CommentExpandOptions,
        order?: Comments_Contracts.CommentSortOrder,
        parentId?: number
        ): Promise<Comments_Contracts.CommentList> {

        const queryValues: any = {
            '$top': top,
            continuationToken: continuationToken,
            excludeDeleted: excludeDeleted,
            '$expand': expand,
            order: order,
            parentId: parentId
        };

        return this.beginRequest<Comments_Contracts.CommentList>({
            apiVersion: "5.2-preview.1",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{pageId}/comments/{id}",
            routeValues: {
                project: project,
                wikiIdentifier: wikiIdentifier,
                pageId: pageId
            },
            queryParams: queryValues
        });
    }

    /**
     * Update a comment on a wiki page.
     * 
     * @param comment - Comment update request.
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param pageId - Wiki page ID.
     * @param id - Comment ID.
     */
    public async updateComment(
        comment: Comments_Contracts.CommentUpdateParameters,
        project: string,
        wikiIdentifier: string,
        pageId: number,
        id: number
        ): Promise<Comments_Contracts.Comment> {

        return this.beginRequest<Comments_Contracts.Comment>({
            apiVersion: "5.2-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{pageId}/comments/{id}",
            routeValues: {
                project: project,
                wikiIdentifier: wikiIdentifier,
                pageId: pageId,
                id: id
            },
            body: comment
        });
    }

    /**
     * Gets metadata or content of the wiki page for the provided path. Content negotiation is done based on the \`Accept\` header sent in the request.
     * 
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param path - Wiki page path.
     * @param recursionLevel - Recursion level for subpages retrieval. Defaults to \`None\` (Optional).
     * @param versionDescriptor - GitVersionDescriptor for the page. Defaults to the default branch (Optional).
     * @param includeContent - True to include the content of the page in the response for Json content type. Defaults to false (Optional)
     */
    public async getPageText(
        project: string,
        wikiIdentifier: string,
        path?: string,
        recursionLevel?: Git.VersionControlRecursionType,
        versionDescriptor?: Git.GitVersionDescriptor,
        includeContent?: boolean
        ): Promise<string> {

        const queryValues: any = {
            path: path,
            recursionLevel: recursionLevel,
            versionDescriptor: versionDescriptor,
            includeContent: includeContent
        };

        return this.beginRequest<string>({
            apiVersion: "5.2-preview.1",
            httpResponseType: "text/plain",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{*path}",
            routeValues: {
                project: project,
                wikiIdentifier: wikiIdentifier
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets metadata or content of the wiki page for the provided path. Content negotiation is done based on the \`Accept\` header sent in the request.
     * 
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param path - Wiki page path.
     * @param recursionLevel - Recursion level for subpages retrieval. Defaults to \`None\` (Optional).
     * @param versionDescriptor - GitVersionDescriptor for the page. Defaults to the default branch (Optional).
     * @param includeContent - True to include the content of the page in the response for Json content type. Defaults to false (Optional)
     */
    public async getPageZip(
        project: string,
        wikiIdentifier: string,
        path?: string,
        recursionLevel?: Git.VersionControlRecursionType,
        versionDescriptor?: Git.GitVersionDescriptor,
        includeContent?: boolean
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            path: path,
            recursionLevel: recursionLevel,
            versionDescriptor: versionDescriptor,
            includeContent: includeContent
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "5.2-preview.1",
            httpResponseType: "application/zip",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{*path}",
            routeValues: {
                project: project,
                wikiIdentifier: wikiIdentifier
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets metadata or content of the wiki page for the provided page id. Content negotiation is done based on the \`Accept\` header sent in the request.
     * 
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name..
     * @param id - Wiki page ID.
     * @param recursionLevel - Recursion level for subpages retrieval. Defaults to \`None\` (Optional).
     * @param includeContent - True to include the content of the page in the response for Json content type. Defaults to false (Optional)
     */
    public async getPageByIdText(
        project: string,
        wikiIdentifier: string,
        id: number,
        recursionLevel?: Git.VersionControlRecursionType,
        includeContent?: boolean
        ): Promise<string> {

        const queryValues: any = {
            recursionLevel: recursionLevel,
            includeContent: includeContent
        };

        return this.beginRequest<string>({
            apiVersion: "5.2-preview.1",
            httpResponseType: "text/plain",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{id}",
            routeValues: {
                project: project,
                wikiIdentifier: wikiIdentifier,
                id: id
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets metadata or content of the wiki page for the provided page id. Content negotiation is done based on the \`Accept\` header sent in the request.
     * 
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name..
     * @param id - Wiki page ID.
     * @param recursionLevel - Recursion level for subpages retrieval. Defaults to \`None\` (Optional).
     * @param includeContent - True to include the content of the page in the response for Json content type. Defaults to false (Optional)
     */
    public async getPageByIdZip(
        project: string,
        wikiIdentifier: string,
        id: number,
        recursionLevel?: Git.VersionControlRecursionType,
        includeContent?: boolean
        ): Promise<ArrayBuffer> {

        const queryValues: any = {
            recursionLevel: recursionLevel,
            includeContent: includeContent
        };

        return this.beginRequest<ArrayBuffer>({
            apiVersion: "5.2-preview.1",
            httpResponseType: "application/zip",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{id}",
            routeValues: {
                project: project,
                wikiIdentifier: wikiIdentifier,
                id: id
            },
            queryParams: queryValues
        });
    }

    /**
     * Returns pageable list of Wiki Pages
     * 
     * @param pagesBatchRequest - Wiki batch page request.
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param versionDescriptor - GitVersionDescriptor for the page. (Optional in case of ProjectWiki).
     */
    public async getPagesBatch(
        pagesBatchRequest: Wiki.WikiPagesBatchRequest,
        project: string,
        wikiIdentifier: string,
        versionDescriptor?: Git.GitVersionDescriptor
        ): Promise<Wiki.WikiPageDetail[]> {

        const queryValues: any = {
            versionDescriptor: versionDescriptor
        };

        return this.beginRequest<Response>({
            apiVersion: "5.2-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pagesBatch",
            routeValues: {
                project: project,
                wikiIdentifier: wikiIdentifier
            },
            queryParams: queryValues,
            body: pagesBatchRequest,
            returnRawResponse: true
        }).then(async response => {
            const body = <Wiki.WikiPageDetail[]>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Returns page detail corresponding to Page ID.
     * 
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param pageId - Wiki page ID.
     * @param pageViewsForDays - last N days from the current day for which page views is to be returned. It's inclusive of current day.
     */
    public async getPageData(
        project: string,
        wikiIdentifier: string,
        pageId: number,
        pageViewsForDays?: number
        ): Promise<Wiki.WikiPageDetail> {

        const queryValues: any = {
            pageViewsForDays: pageViewsForDays
        };

        return this.beginRequest<Wiki.WikiPageDetail>({
            apiVersion: "5.2-preview.1",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{pageId}/stats",
            routeValues: {
                project: project,
                wikiIdentifier: wikiIdentifier,
                pageId: pageId
            },
            queryParams: queryValues
        });
    }

    /**
     * Creates a new page view stats resource or updates an existing page view stats resource.
     * 
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param wikiVersion - Wiki version.
     * @param path - Wiki page path.
     * @param oldPath - Old page path. This is optional and required to rename path in existing page view stats.
     */
    public async createOrUpdatePageViewStats(
        project: string,
        wikiIdentifier: string,
        wikiVersion: Git.GitVersionDescriptor,
        path: string,
        oldPath?: string
        ): Promise<Wiki.WikiPageViewStats> {

        const queryValues: any = {
            wikiVersion: wikiVersion,
            path: path,
            oldPath: oldPath
        };

        return this.beginRequest<Wiki.WikiPageViewStats>({
            apiVersion: "5.2-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}/pageViewStats/{*path}",
            routeValues: {
                project: project,
                wikiIdentifier: wikiIdentifier
            },
            queryParams: queryValues
        });
    }

    /**
     * Creates the wiki resource.
     * 
     * @param wikiCreateParams - Parameters for the wiki creation.
     * @param project - Project ID or project name
     */
    public async createWiki(
        wikiCreateParams: Wiki.WikiCreateParametersV2,
        project?: string
        ): Promise<Wiki.WikiV2> {

        return this.beginRequest<Wiki.WikiV2>({
            apiVersion: "5.2-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}",
            routeValues: {
                project: project
            },
            body: wikiCreateParams
        });
    }

    /**
     * Deletes the wiki corresponding to the wiki ID or wiki name provided.
     * 
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param project - Project ID or project name
     */
    public async deleteWiki(
        wikiIdentifier: string,
        project?: string
        ): Promise<Wiki.WikiV2> {

        return this.beginRequest<Wiki.WikiV2>({
            apiVersion: "5.2-preview.2",
            method: "DELETE",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}",
            routeValues: {
                project: project,
                wikiIdentifier: wikiIdentifier
            }
        });
    }

    /**
     * Gets all wikis in a project or collection.
     * 
     * @param project - Project ID or project name
     */
    public async getAllWikis(
        project?: string
        ): Promise<Wiki.WikiV2[]> {

        return this.beginRequest<Wiki.WikiV2[]>({
            apiVersion: "5.2-preview.2",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * Gets the wiki corresponding to the wiki ID or wiki name provided.
     * 
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param project - Project ID or project name
     */
    public async getWiki(
        wikiIdentifier: string,
        project?: string
        ): Promise<Wiki.WikiV2> {

        return this.beginRequest<Wiki.WikiV2>({
            apiVersion: "5.2-preview.2",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}",
            routeValues: {
                project: project,
                wikiIdentifier: wikiIdentifier
            }
        });
    }

    /**
     * Updates the wiki corresponding to the wiki ID or wiki name provided using the update parameters.
     * 
     * @param updateParameters - Update parameters.
     * @param wikiIdentifier - Wiki ID or wiki name.
     * @param project - Project ID or project name
     */
    public async updateWiki(
        updateParameters: Wiki.WikiUpdateParameters,
        wikiIdentifier: string,
        project?: string
        ): Promise<Wiki.WikiV2> {

        return this.beginRequest<Wiki.WikiV2>({
            apiVersion: "5.2-preview.2",
            method: "PATCH",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}",
            routeValues: {
                project: project,
                wikiIdentifier: wikiIdentifier
            },
            body: updateParameters
        });
    }

}
