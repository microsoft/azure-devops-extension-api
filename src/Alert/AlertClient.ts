/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import { deserializeVssJsonObject } from "../Common/Util/Serialization";

import * as Alert from "../Alert/Alert";
import * as WebApi from "../WebApi/WebApi";

export class AlertRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    /**
     * Get an alert.
     * 
     * @param project - Project ID or project name
     * @param alertId - ID of alert to retrieve
     * @param repository - Name or id  of a repository that alert is part of
     * @param ref - 
     * @param expand - Expand alert attributes. Possible options are \{ValidationFingerprint, None\}
     */
    public async getAlert(
        project: string,
        alertId: number,
        repository: string,
        ref?: string,
        expand?: Alert.ExpandOption
        ): Promise<Alert.Alert> {

        const queryValues: any = {
            ref: ref,
            expand: expand
        };

        return this.beginRequest<Alert.Alert>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/Alert/repositories/{repository}/Alerts/{alertId}",
            routeValues: {
                project: project,
                alertId: alertId,
                repository: repository
            },
            queryParams: queryValues
        });
    }

    /**
     * Get alerts for a repository
     * 
     * @param project - Project ID or project name
     * @param repository - The name or ID of the repository
     * @param top - The maximum number of alerts to return
     * @param orderBy - Must be "id" "firstSeen" "lastSeen" "fixedOn" or "severity"  Defaults to "id"
     * @param criteria - Options to limit the alerts returned
     * @param continuationToken - If there are more alerts than can be returned, a continuation token is placed in the "x-ms-continuationtoken" header.  Use that token here to get the next page of alerts
     */
    public async getAlerts(
        project: string,
        repository: string,
        top?: number,
        orderBy?: string,
        criteria?: Alert.SearchCriteria,
        continuationToken?: string
        ): Promise<WebApi.PagedList<Alert.Alert>> {

        const queryValues: any = {
            top: top,
            orderBy: orderBy,
            criteria: criteria,
            continuationToken: continuationToken
        };

        return this.beginRequest<Response>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/Alert/repositories/{repository}/Alerts/{alertId}",
            routeValues: {
                project: project,
                repository: repository
            },
            queryParams: queryValues,
            returnRawResponse: true
        }).then(async response => {
            const body = <WebApi.PagedList<Alert.Alert>>await response.text().then(deserializeVssJsonObject);
            body.continuationToken = response.headers.get("x-ms-continuationtoken");
            return body;
        });
    }

    /**
     * Get an alert.
     * 
     * @param project - Project ID or project name
     * @param alertId - ID of alert to retrieve
     * @param repository - Name or id  of a repository that alert is part of
     * @param ref - 
     * @param expand - Expand alert attributes. Possible options are \{ValidationFingerprint, None\}
     */
    public async getAlertSarif(
        project: string,
        alertId: number,
        repository: string,
        ref?: string,
        expand?: Alert.ExpandOption
        ): Promise<string> {

        const queryValues: any = {
            ref: ref,
            expand: expand
        };

        return this.beginRequest<string>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/Alert/repositories/{repository}/Alerts/{alertId}",
            routeValues: {
                project: project,
                alertId: alertId,
                repository: repository
            },
            queryParams: queryValues
        });
    }

    /**
     * Update the status of an alert
     * 
     * @param stateUpdate - The new status of the alert
     * @param project - Project ID or project name
     * @param alertId - The ID of the alert
     * @param repository - The name or ID of the repository
     */
    public async updateAlert(
        stateUpdate: Alert.AlertStateUpdate,
        project: string,
        alertId: number,
        repository: string
        ): Promise<Alert.Alert> {

        return this.beginRequest<Alert.Alert>({
            apiVersion: "7.2-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/Alert/repositories/{repository}/Alerts/{alertId}",
            routeValues: {
                project: project,
                alertId: alertId,
                repository: repository
            },
            body: stateUpdate
        });
    }

    /**
     * Get instances of an alert.
     * 
     * @param project - Project ID or project name
     * @param alertId - ID of alert to retrieve
     * @param repository - Name or id of a repository that alert is part of
     * @param ref - 
     */
    public async getAlertInstances(
        project: string,
        alertId: number,
        repository: string,
        ref?: string
        ): Promise<Alert.AlertAnalysisInstance[]> {

        const queryValues: any = {
            ref: ref
        };

        return this.beginRequest<Alert.AlertAnalysisInstance[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/Alert/repositories/{repository}/alerts/{alertId}/Instances",
            routeValues: {
                project: project,
                alertId: alertId,
                repository: repository
            },
            queryParams: queryValues
        });
    }

    /**
     * Upload a Sarif containing security alerts
     * 
     * @param content - Content to upload
     * @param project - Project ID or project name
     * @param repository - The name or ID of a repository
     */
    public async uploadSarif(
        content: string,
        project: string,
        repository: string
        ): Promise<number> {

        return this.beginRequest<number>({
            apiVersion: "7.2-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/Alert/repositories/{repository}/sarifs",
            routeValues: {
                project: project,
                repository: repository
            },
            customHeaders: {
                "Content-Type": "application/octet-stream",
            },
            body: content
        });
    }

    /**
     * @param project - Project ID or project name
     * @param repository - 
     * @param alertType - 
     */
    public async getUxFilters(
        project: string,
        repository: string,
        alertType: Alert.AlertType
        ): Promise<Alert.UxFilters> {

        const queryValues: any = {
            alertType: alertType
        };

        return this.beginRequest<Alert.UxFilters>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/Alert/repositories/{repository}/filters",
            routeValues: {
                project: project,
                repository: repository
            },
            queryParams: queryValues
        });
    }

    /**
     * Get the status of the Sarif processing job
     * 
     * @param sarifId - Sarif ID returned when the Sarif was uploaded
     */
    public async getSarif(
        sarifId: number
        ): Promise<Alert.SarifUploadStatus> {

        return this.beginRequest<Alert.SarifUploadStatus>({
            apiVersion: "7.2-preview.2",
            routeTemplate: "_apis/Alert/Sarifs/{sarifId}",
            routeValues: {
                sarifId: sarifId
            }
        });
    }

}
