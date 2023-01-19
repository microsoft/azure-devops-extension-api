/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as Operations from "../Operations/Operations";

export class OperationsRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    /**
     * Gets an operation from the operationId using the given pluginId.
     * 
     * @param operationId - The ID for the operation.
     * @param pluginId - The ID for the plugin.
     */
    public async getOperation(
        operationId: string,
        pluginId?: string
        ): Promise<Operations.Operation> {

        const queryValues: any = {
            pluginId: pluginId
        };

        return this.beginRequest<Operations.Operation>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/operations/{operationId}",
            routeValues: {
                operationId: operationId
            },
            queryParams: queryValues
        });
    }

}
