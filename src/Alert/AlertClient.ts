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
     * @param expand - Expand attributes of a secret alert. Possible values are \`None\` and \`ValidationFingerprint\`. Defaults to \`None\`. Be aware that if \`expand\` is set to \`ValidationFingerprint\`, the response may contain the secret in its unencrypted form. Please exercise caution when using this data.
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
            routeTemplate: "{project}/_apis/Alert/repositories/{repository}/alerts/{alertId}",
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
     * @param expand - 
     * @param continuationToken - If there are more alerts than can be returned, a continuation token is placed in the "x-ms-continuationtoken" header.  Use that token here to get the next page of alerts
     */
    public async getAlerts(
        project: string,
        repository: string,
        top?: number,
        orderBy?: string,
        criteria?: Alert.SearchCriteria,
        expand?: Alert.AlertListExpandOption,
        continuationToken?: string
        ): Promise<WebApi.PagedList<Alert.Alert>> {

        const queryValues: any = {
            top: top,
            orderBy: orderBy,
            criteria: criteria,
            expand: expand,
            continuationToken: continuationToken
        };

        return this.beginRequest<Response>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/Alert/repositories/{repository}/alerts/{alertId}",
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
     * @param expand - Expand attributes of a secret alert. Possible values are \`None\` and \`ValidationFingerprint\`. Defaults to \`None\`. Be aware that if \`expand\` is set to \`ValidationFingerprint\`, the response may contain the secret in its unencrypted form. Please exercise caution when using this data.
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
            routeTemplate: "{project}/_apis/Alert/repositories/{repository}/alerts/{alertId}",
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
            routeTemplate: "{project}/_apis/Alert/repositories/{repository}/alerts/{alertId}",
            routeValues: {
                project: project,
                alertId: alertId,
                repository: repository
            },
            body: stateUpdate
        });
    }

    /**
     * Returns the branches for which analysis results were submitted.
     * 
     * @param project - Project ID or project name
     * @param repository - 
     * @param alertType - The type of alert: Dependency Scanning (1), Secret (2), Code QL (3), etc.
     * @param continuationToken - A string variable that represents the branch name and is used to fetch branches that follow it in alphabetical order.
     * @param branchNameContains - A string variable used to fetch branches that contain this string anywhere in the branch name, case insensitive.
     * @param top - An int variable used to return the top k branches that satisfy the search criteria.
     * @param includePullRequestBranches - A bool variable indicating whether or not to include pull request branches.
     */
    public async getBranches(
        project: string,
        repository: string,
        alertType: Alert.AlertType,
        continuationToken?: string,
        branchNameContains?: string,
        top?: number,
        includePullRequestBranches?: boolean
        ): Promise<Alert.Branch[]> {

        const queryValues: any = {
            alertType: alertType,
            continuationToken: continuationToken,
            branchNameContains: branchNameContains,
            top: top,
            includePullRequestBranches: includePullRequestBranches
        };

        return this.beginRequest<Alert.Branch[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/Alert/repositories/{repository}/filters/{action}",
            routeValues: {
                project: project,
                repository: repository,
                action: "Branches"
            },
            queryParams: queryValues
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
            routeTemplate: "{project}/_apis/Alert/repositories/{repository}/filters/{action}",
            routeValues: {
                project: project,
                repository: repository,
                action: "Default"
            },
            queryParams: queryValues
        });
    }

    /**
     * Get instances of an alert on a branch specified with \@ref. If \@ref is not provided, return instances of an alert on default branch(if the alert exist in default branch) or latest affected branch.
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
     * Create legal review. This creates the legal review associated with the alert. It include the review work item url.
     * 
     * @param project - Project ID or project name
     * @param repository - Name or id  of a repository for the legal alert
     * @param alertId - Advance Security alert id of the legal alert to get the legal review
     * @param ref - 
     */
    public async createLegalReview(
        project: string,
        repository: string,
        alertId: number,
        ref?: string
        ): Promise<Alert.LegalReview> {

        const queryValues: any = {
            alertId: alertId,
            ref: ref
        };

        return this.beginRequest<Alert.LegalReview>({
            apiVersion: "7.2-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/Alert/repositories/{repository}/alerts/Metadata",
            routeValues: {
                project: project,
                repository: repository
            },
            queryParams: queryValues
        });
    }

    /**
     * Update alert metadata associations.
     * 
     * @param alertsMetadata - A list of metadata to associate with alerts.
     * @param project - Project ID or project name
     * @param repository - The name or ID of the repository.
     */
    public async updateAlertsMetadata(
        alertsMetadata: Alert.AlertMetadata[],
        project: string,
        repository: string
        ): Promise<Alert.AlertMetadataChange[]> {

        return this.beginRequest<Alert.AlertMetadataChange[]>({
            apiVersion: "7.2-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/Alert/repositories/{repository}/alerts/Metadata",
            routeValues: {
                project: project,
                repository: repository
            },
            body: alertsMetadata
        });
    }

    /**
     * Get alerts by their IDs at the organization level. Only retruns alerts that the user has permission to view. Only returns alerts of sku plans that are enabled.
     * 
     * @param alertIds - List of alert IDs to retrieve
     */
    public async getOrgLevelAlertsByIds(
        alertIds: number[]
        ): Promise<Alert.Alert[]> {

        const queryValues: any = {
            alertIds: alertIds && alertIds.join(",")
        };

        return this.beginRequest<Alert.Alert[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Alert/alerts",
            queryParams: queryValues
        });
    }

    /**
     * Upload a Sarif containing security alerts
     * 
     * @param content - Content to upload
     * @param project - Project ID or project name
     * @param repository - The name or ID of a repository
     * @param notificationFlag - Header to signal that this is a progress notification
     */
    public async uploadSarif(
        content: string,
        project: string,
        repository: string,
        notificationFlag?: String
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
                "X-AdvSec-NotificationSarif": notificationFlag,
            },
            body: content
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

    /**
     * Upload a Sarif file at the organization level
     * 
     * @param content - Content to upload
     */
    public async uploadOrgSarif(
        content: string
        ): Promise<number> {

        return this.beginRequest<number>({
            apiVersion: "7.2-preview.2",
            method: "POST",
            routeTemplate: "_apis/Alert/Sarifs/{sarifId}",
            customHeaders: {
                "Content-Type": "application/octet-stream",
            },
            body: content
        });
    }

    /**
     * Get the validity details for an alert.
     * 
     * @param project - Project ID or project name
     * @param repository - The name or ID of a repository
     * @param alertId - The ID of the alert
     */
    public async getValidityData(
        project: string,
        repository: string,
        alertId: number
        ): Promise<Alert.ValidationRequestInfo> {

        return this.beginRequest<Alert.ValidationRequestInfo>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "{project}/_apis/Alert/repositories/{repository}/alerts/{alertId}/Validate",
            routeValues: {
                project: project,
                repository: repository,
                alertId: alertId
            }
        });
    }

    /**
     * Initiate the validation process for a given alert
     * 
     * @param project - Project ID or project name
     * @param repository - The name or ID of a repository
     * @param alertId - The ID of the alert
     */
    public async initiateValidation(
        project: string,
        repository: string,
        alertId: number
        ): Promise<Alert.AlertValidationRequestStatus> {

        return this.beginRequest<Alert.AlertValidationRequestStatus>({
            apiVersion: "7.2-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/Alert/repositories/{repository}/alerts/{alertId}/Validate",
            routeValues: {
                project: project,
                repository: repository,
                alertId: alertId
            }
        });
    }

}
