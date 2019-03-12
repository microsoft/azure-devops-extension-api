/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as Git from "../Git/Git";
import * as Wiki from "../Wiki/Wiki";

export class WikiRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "bf7d82a0-8aa5-4613-94ef-6172a5ea01f3";

    /**
     * Gets metadata or content of the wiki page for the provided path. Content negotiation is done based on the \`Accept\` header sent in the request.
     * 
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki Id or name.
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
            apiVersion: "5.1-preview.1",
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
     * @param wikiIdentifier - Wiki Id or name.
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
            apiVersion: "5.1-preview.1",
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
     * @param wikiIdentifier - Wiki Id or name.
     * @param id - Wiki page id.
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
            apiVersion: "5.1-preview.1",
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
     * @param wikiIdentifier - Wiki Id or name.
     * @param id - Wiki page id.
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
            apiVersion: "5.1-preview.1",
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
     * Creates a new page view stats resource or updates an existing page view stats resource.
     * 
     * @param project - Project ID or project name
     * @param wikiIdentifier - Wiki name or Id.
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
            apiVersion: "5.1-preview.1",
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
            apiVersion: "5.1-preview.2",
            method: "POST",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}",
            routeValues: {
                project: project
            },
            body: wikiCreateParams
        });
    }

    /**
     * Deletes the wiki corresponding to the wiki name or Id provided.
     * 
     * @param wikiIdentifier - Wiki name or Id.
     * @param project - Project ID or project name
     */
    public async deleteWiki(
        wikiIdentifier: string,
        project?: string
        ): Promise<Wiki.WikiV2> {

        return this.beginRequest<Wiki.WikiV2>({
            apiVersion: "5.1-preview.2",
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
            apiVersion: "5.1-preview.2",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * Gets the wiki corresponding to the wiki name or Id provided.
     * 
     * @param wikiIdentifier - Wiki name or id.
     * @param project - Project ID or project name
     */
    public async getWiki(
        wikiIdentifier: string,
        project?: string
        ): Promise<Wiki.WikiV2> {

        return this.beginRequest<Wiki.WikiV2>({
            apiVersion: "5.1-preview.2",
            routeTemplate: "{project}/_apis/wiki/wikis/{wikiIdentifier}",
            routeValues: {
                project: project,
                wikiIdentifier: wikiIdentifier
            }
        });
    }

    /**
     * Updates the wiki corresponding to the wiki Id or name provided using the update parameters.
     * 
     * @param updateParameters - Update parameters.
     * @param wikiIdentifier - Wiki name or Id.
     * @param project - Project ID or project name
     */
    public async updateWiki(
        updateParameters: Wiki.WikiUpdateParameters,
        wikiIdentifier: string,
        project?: string
        ): Promise<Wiki.WikiV2> {

        return this.beginRequest<Wiki.WikiV2>({
            apiVersion: "5.1-preview.2",
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
