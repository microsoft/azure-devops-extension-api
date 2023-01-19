/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as FileContainer from "../FileContainer/FileContainer";
import * as WebApi from "../WebApi/WebApi";

export class FileContainerRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    /**
     * Creates the specified items in the referenced container.
     * 
     * @param items - 
     * @param containerId - 
     * @param scope - A guid representing the scope of the container. This is often the project id.
     */
    public async createItems(
        items: WebApi.VssJsonCollectionWrapperV<FileContainer.FileContainerItem[]>,
        containerId: number,
        scope?: string
        ): Promise<FileContainer.FileContainerItem[]> {

        const queryValues: any = {
            scope: scope
        };

        return this.beginRequest<FileContainer.FileContainerItem[]>({
            apiVersion: "7.1-preview.4",
            method: "POST",
            routeTemplate: "_apis/resources/Containers/{containerId}/{*itemPath}",
            routeValues: {
                containerId: containerId
            },
            queryParams: queryValues,
            body: items
        });
    }

    /**
     * Deletes the specified items in a container.
     * 
     * @param containerId - Container Id.
     * @param itemPath - Path to delete.
     * @param scope - A guid representing the scope of the container. This is often the project id.
     */
    public async deleteItem(
        containerId: number,
        itemPath: string,
        scope?: string
        ): Promise<void> {

        const queryValues: any = {
            itemPath: itemPath,
            scope: scope
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.4",
            method: "DELETE",
            routeTemplate: "_apis/resources/Containers/{containerId}/{*itemPath}",
            routeValues: {
                containerId: containerId
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets containers filtered by a comma separated list of artifact uris within the same scope, if not specified returns all containers
     * 
     * @param scope - A guid representing the scope of the container. This is often the project id.
     * @param artifactUris - 
     */
    public async getContainers(
        scope?: string,
        artifactUris?: string
        ): Promise<FileContainer.FileContainer[]> {

        const queryValues: any = {
            scope: scope,
            artifactUris: artifactUris
        };

        return this.beginRequest<FileContainer.FileContainer[]>({
            apiVersion: "7.1-preview.4",
            routeTemplate: "_apis/resources/Containers/{containerId}/{*itemPath}",
            queryParams: queryValues
        });
    }

    /**
     * @param containerId - 
     * @param scope - 
     * @param itemPath - 
     * @param metadata - 
     * @param format - 
     * @param downloadFileName - 
     * @param includeDownloadTickets - 
     * @param isShallow - 
     * @param ignoreRequestedMediaType - 
     * @param includeBlobMetadata - 
     * @param saveAbsolutePath - 
     */
    public async getItems(
        containerId: number,
        scope?: string,
        itemPath?: string,
        metadata?: boolean,
        format?: string,
        downloadFileName?: string,
        includeDownloadTickets?: boolean,
        isShallow?: boolean,
        ignoreRequestedMediaType?: boolean,
        includeBlobMetadata?: boolean,
        saveAbsolutePath?: boolean
        ): Promise<FileContainer.FileContainerItem[]> {

        const queryValues: any = {
            scope: scope,
            itemPath: itemPath,
            metadata: metadata,
            '$format': format,
            downloadFileName: downloadFileName,
            includeDownloadTickets: includeDownloadTickets,
            isShallow: isShallow,
            ignoreRequestedMediaType: ignoreRequestedMediaType,
            includeBlobMetadata: includeBlobMetadata,
            saveAbsolutePath: saveAbsolutePath
        };

        return this.beginRequest<FileContainer.FileContainerItem[]>({
            apiVersion: "7.1-preview.4",
            routeTemplate: "_apis/resources/Containers/{containerId}/{*itemPath}",
            routeValues: {
                containerId: containerId
            },
            queryParams: queryValues
        });
    }

}
