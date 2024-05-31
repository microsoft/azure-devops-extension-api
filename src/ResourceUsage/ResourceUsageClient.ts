/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as ResourceUsage from "../ResourceUsage/ResourceUsage";

export class ResourceUsageRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "240a9b11-3dc7-4aa0-b3fe-2b7dc8a4e7ea";

    /**
     * Gets the Project Level limits and Usage for a project.
     * 
     * @param project - Project ID or project name
     */
    public async getProjectLimit(
        project: string
        ): Promise<{ [key: string] : ResourceUsage.Usage; }> {

        return this.beginRequest<{ [key: string] : ResourceUsage.Usage; }>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/ResourceUsage",
            routeValues: {
                project: project
            }
        });
    }

    /**
     */
    public async getLimits(
        ): Promise<{ [key: string] : ResourceUsage.Usage; }> {

        return this.beginRequest<{ [key: string] : ResourceUsage.Usage; }>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/ResourceUsage"
        });
    }

}
