/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as TfsCore from "../Core/Core";
import * as Dashboard from "../Dashboard/Dashboard";

export class DashboardRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "31c84e0a-3ece-48fd-a29d-100849af99ba";

    /**
     * Create the supplied dashboard.
     * 
     * @param dashboard - The initial state of the dashboard
     * @param teamContext - The team context for the operation
     */
    public async createDashboard(
        dashboard: Dashboard.Dashboard,
        teamContext: TfsCore.TeamContext
        ): Promise<Dashboard.Dashboard> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Dashboard.Dashboard>({
            apiVersion: "7.1-preview.3",
            method: "POST",
            routeTemplate: "{project}/{team}/_apis/Dashboard/Dashboards/{dashboardId}",
            routeValues: {
                project: project,
                team: team
            },
            body: dashboard
        });
    }

    /**
     * Delete a dashboard given its ID. This also deletes the widgets associated with this dashboard.
     * 
     * @param teamContext - The team context for the operation
     * @param dashboardId - ID of the dashboard to delete.
     */
    public async deleteDashboard(
        teamContext: TfsCore.TeamContext,
        dashboardId: string
        ): Promise<void> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.3",
            method: "DELETE",
            routeTemplate: "{project}/{team}/_apis/Dashboard/Dashboards/{dashboardId}",
            routeValues: {
                project: project,
                team: team,
                dashboardId: dashboardId
            }
        });
    }

    /**
     * Get a dashboard by its ID.
     * 
     * @param teamContext - The team context for the operation
     * @param dashboardId - 
     */
    public async getDashboard(
        teamContext: TfsCore.TeamContext,
        dashboardId: string
        ): Promise<Dashboard.Dashboard> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Dashboard.Dashboard>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/{team}/_apis/Dashboard/Dashboards/{dashboardId}",
            routeValues: {
                project: project,
                team: team,
                dashboardId: dashboardId
            }
        });
    }

    /**
     * Get a list of dashboards under a project.
     * 
     * @param teamContext - The team context for the operation
     */
    public async getDashboardsByProject(
        teamContext: TfsCore.TeamContext
        ): Promise<Dashboard.Dashboard[]> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Dashboard.Dashboard[]>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "{project}/{team}/_apis/Dashboard/Dashboards/{dashboardId}",
            routeValues: {
                project: project,
                team: team
            }
        });
    }

    /**
     * Replace configuration for the specified dashboard. Replaces Widget list on Dashboard, only if property is supplied.
     * 
     * @param dashboard - The Configuration of the dashboard to replace.
     * @param teamContext - The team context for the operation
     * @param dashboardId - ID of the dashboard to replace.
     */
    public async replaceDashboard(
        dashboard: Dashboard.Dashboard,
        teamContext: TfsCore.TeamContext,
        dashboardId: string
        ): Promise<Dashboard.Dashboard> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Dashboard.Dashboard>({
            apiVersion: "7.1-preview.3",
            method: "PUT",
            routeTemplate: "{project}/{team}/_apis/Dashboard/Dashboards/{dashboardId}",
            routeValues: {
                project: project,
                team: team,
                dashboardId: dashboardId
            },
            body: dashboard
        });
    }

    /**
     * Update the name and position of dashboards in the supplied group, and remove omitted dashboards. Does not modify dashboard content.
     * 
     * @param group - 
     * @param teamContext - The team context for the operation
     */
    public async replaceDashboards(
        group: Dashboard.DashboardGroup,
        teamContext: TfsCore.TeamContext
        ): Promise<Dashboard.DashboardGroup> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Dashboard.DashboardGroup>({
            apiVersion: "7.1-preview.3",
            method: "PUT",
            routeTemplate: "{project}/{team}/_apis/Dashboard/Dashboards/{dashboardId}",
            routeValues: {
                project: project,
                team: team
            },
            body: group
        });
    }

    /**
     * Create a widget on the specified dashboard.
     * 
     * @param widget - State of the widget to add
     * @param teamContext - The team context for the operation
     * @param dashboardId - ID of dashboard the widget will be added to.
     */
    public async createWidget(
        widget: Dashboard.Widget,
        teamContext: TfsCore.TeamContext,
        dashboardId: string
        ): Promise<Dashboard.Widget> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Dashboard.Widget>({
            apiVersion: "7.1-preview.2",
            method: "POST",
            routeTemplate: "{project}/{team}/_apis/Dashboard/dashboards/{dashboardId}/Widgets/{widgetId}",
            routeValues: {
                project: project,
                team: team,
                dashboardId: dashboardId
            },
            body: widget
        });
    }

    /**
     * Delete the specified widget.
     * 
     * @param teamContext - The team context for the operation
     * @param dashboardId - ID of the dashboard containing the widget.
     * @param widgetId - ID of the widget to update.
     */
    public async deleteWidget(
        teamContext: TfsCore.TeamContext,
        dashboardId: string,
        widgetId: string
        ): Promise<Dashboard.Dashboard> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Dashboard.Dashboard>({
            apiVersion: "7.1-preview.2",
            method: "DELETE",
            routeTemplate: "{project}/{team}/_apis/Dashboard/dashboards/{dashboardId}/Widgets/{widgetId}",
            routeValues: {
                project: project,
                team: team,
                dashboardId: dashboardId,
                widgetId: widgetId
            }
        });
    }

    /**
     * Get the current state of the specified widget.
     * 
     * @param teamContext - The team context for the operation
     * @param dashboardId - ID of the dashboard containing the widget.
     * @param widgetId - ID of the widget to read.
     */
    public async getWidget(
        teamContext: TfsCore.TeamContext,
        dashboardId: string,
        widgetId: string
        ): Promise<Dashboard.Widget> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Dashboard.Widget>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "{project}/{team}/_apis/Dashboard/dashboards/{dashboardId}/Widgets/{widgetId}",
            routeValues: {
                project: project,
                team: team,
                dashboardId: dashboardId,
                widgetId: widgetId
            }
        });
    }

    /**
     * Override the  state of the specified widget.
     * 
     * @param widget - State to be written for the widget.
     * @param teamContext - The team context for the operation
     * @param dashboardId - ID of the dashboard containing the widget.
     * @param widgetId - ID of the widget to update.
     */
    public async replaceWidget(
        widget: Dashboard.Widget,
        teamContext: TfsCore.TeamContext,
        dashboardId: string,
        widgetId: string
        ): Promise<Dashboard.Widget> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Dashboard.Widget>({
            apiVersion: "7.1-preview.2",
            method: "PUT",
            routeTemplate: "{project}/{team}/_apis/Dashboard/dashboards/{dashboardId}/Widgets/{widgetId}",
            routeValues: {
                project: project,
                team: team,
                dashboardId: dashboardId,
                widgetId: widgetId
            },
            body: widget
        });
    }

    /**
     * Perform a partial update of the specified widget.
     * 
     * @param widget - Description of the widget changes to apply. All non-null fields will be replaced.
     * @param teamContext - The team context for the operation
     * @param dashboardId - ID of the dashboard containing the widget.
     * @param widgetId - ID of the widget to update.
     */
    public async updateWidget(
        widget: Dashboard.Widget,
        teamContext: TfsCore.TeamContext,
        dashboardId: string,
        widgetId: string
        ): Promise<Dashboard.Widget> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Dashboard.Widget>({
            apiVersion: "7.1-preview.2",
            method: "PATCH",
            routeTemplate: "{project}/{team}/_apis/Dashboard/dashboards/{dashboardId}/Widgets/{widgetId}",
            routeValues: {
                project: project,
                team: team,
                dashboardId: dashboardId,
                widgetId: widgetId
            },
            body: widget
        });
    }

    /**
     * Get the widget metadata satisfying the specified contribution ID.
     * 
     * @param contributionId - The ID of Contribution for the Widget
     * @param project - Project ID or project name
     */
    public async getWidgetMetadata(
        contributionId: string,
        project?: string
        ): Promise<Dashboard.WidgetMetadataResponse> {

        return this.beginRequest<Dashboard.WidgetMetadataResponse>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Dashboard/WidgetTypes/{contributionId}",
            routeValues: {
                project: project,
                contributionId: contributionId
            }
        });
    }

    /**
     * Get all available widget metadata in alphabetical order, including widgets marked with isVisibleFromCatalog == false.
     * 
     * @param scope - 
     * @param project - Project ID or project name
     */
    public async getWidgetTypes(
        scope: Dashboard.WidgetScope,
        project?: string
        ): Promise<Dashboard.WidgetTypesResponse> {

        const queryValues: any = {
            '$scope': scope
        };

        return this.beginRequest<Dashboard.WidgetTypesResponse>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "{project}/_apis/Dashboard/WidgetTypes/{contributionId}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

}
