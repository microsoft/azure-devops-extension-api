/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as WorkItemTrackingProcessDefinitions from "../WorkItemTrackingProcessDefinitions/WorkItemTrackingProcessDefinitions";

export class WorkItemTrackingProcessDefinitionsRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "5264459e-e5e0-4bd8-b118-0985e68a4ec5";

    /**
     * Creates a single behavior in the given process.
     * 
     * @param behavior - 
     * @param processId - The ID of the process
     */
    public async createBehavior(
        behavior: WorkItemTrackingProcessDefinitions.BehaviorCreateModel,
        processId: string
        ): Promise<WorkItemTrackingProcessDefinitions.BehaviorModel> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.BehaviorModel>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/work/processDefinitions/{processId}/behaviors/{behaviorId}",
            routeValues: {
                processId: processId
            },
            body: behavior
        });
    }

    /**
     * Removes a behavior in the process.
     * 
     * @param processId - The ID of the process
     * @param behaviorId - The ID of the behavior
     */
    public async deleteBehavior(
        processId: string,
        behaviorId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/work/processDefinitions/{processId}/behaviors/{behaviorId}",
            routeValues: {
                processId: processId,
                behaviorId: behaviorId
            }
        });
    }

    /**
     * Returns a single behavior in the process.
     * 
     * @param processId - The ID of the process
     * @param behaviorId - The ID of the behavior
     */
    public async getBehavior(
        processId: string,
        behaviorId: string
        ): Promise<WorkItemTrackingProcessDefinitions.BehaviorModel> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.BehaviorModel>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/work/processDefinitions/{processId}/behaviors/{behaviorId}",
            routeValues: {
                processId: processId,
                behaviorId: behaviorId
            }
        });
    }

    /**
     * Returns a list of all behaviors in the process.
     * 
     * @param processId - The ID of the process
     */
    public async getBehaviors(
        processId: string
        ): Promise<WorkItemTrackingProcessDefinitions.BehaviorModel[]> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.BehaviorModel[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/work/processDefinitions/{processId}/behaviors/{behaviorId}",
            routeValues: {
                processId: processId
            }
        });
    }

    /**
     * Replaces a behavior in the process.
     * 
     * @param behaviorData - 
     * @param processId - The ID of the process
     * @param behaviorId - The ID of the behavior
     */
    public async replaceBehavior(
        behaviorData: WorkItemTrackingProcessDefinitions.BehaviorReplaceModel,
        processId: string,
        behaviorId: string
        ): Promise<WorkItemTrackingProcessDefinitions.BehaviorModel> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.BehaviorModel>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/work/processDefinitions/{processId}/behaviors/{behaviorId}",
            routeValues: {
                processId: processId,
                behaviorId: behaviorId
            },
            body: behaviorData
        });
    }

    /**
     * Creates a control in a group
     * 
     * @param control - The control
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param groupId - The ID of the group to add the control to
     */
    public async addControlToGroup(
        control: WorkItemTrackingProcessDefinitions.Control,
        processId: string,
        witRefName: string,
        groupId: string
        ): Promise<WorkItemTrackingProcessDefinitions.Control> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.Control>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/groups/{groupId}/Controls/{controlId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                groupId: groupId
            },
            body: control
        });
    }

    /**
     * Updates a control on the work item form
     * 
     * @param control - The updated control
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param groupId - The ID of the group
     * @param controlId - The ID of the control
     */
    public async editControl(
        control: WorkItemTrackingProcessDefinitions.Control,
        processId: string,
        witRefName: string,
        groupId: string,
        controlId: string
        ): Promise<WorkItemTrackingProcessDefinitions.Control> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.Control>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/groups/{groupId}/Controls/{controlId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                groupId: groupId,
                controlId: controlId
            },
            body: control
        });
    }

    /**
     * Removes a control from the work item form
     * 
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param groupId - The ID of the group
     * @param controlId - The ID of the control to remove
     */
    public async removeControlFromGroup(
        processId: string,
        witRefName: string,
        groupId: string,
        controlId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/groups/{groupId}/Controls/{controlId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                groupId: groupId,
                controlId: controlId
            }
        });
    }

    /**
     * Moves a control to a new group
     * 
     * @param control - The control
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param groupId - The ID of the group to move the control to
     * @param controlId - The id of the control
     * @param removeFromGroupId - The group to remove the control from
     */
    public async setControlInGroup(
        control: WorkItemTrackingProcessDefinitions.Control,
        processId: string,
        witRefName: string,
        groupId: string,
        controlId: string,
        removeFromGroupId?: string
        ): Promise<WorkItemTrackingProcessDefinitions.Control> {

        const queryValues: any = {
            removeFromGroupId: removeFromGroupId
        };

        return this.beginRequest<WorkItemTrackingProcessDefinitions.Control>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/groups/{groupId}/Controls/{controlId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                groupId: groupId,
                controlId: controlId
            },
            queryParams: queryValues,
            body: control
        });
    }

    /**
     * Creates a single field in the process.
     * 
     * @param field - 
     * @param processId - The ID of the process
     */
    public async createField(
        field: WorkItemTrackingProcessDefinitions.FieldModel,
        processId: string
        ): Promise<WorkItemTrackingProcessDefinitions.FieldModel> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.FieldModel>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/work/processDefinitions/{processId}/fields/{field}",
            routeValues: {
                processId: processId
            },
            body: field
        });
    }

    /**
     * Updates a given field in the process.
     * 
     * @param field - 
     * @param processId - The ID of the process
     */
    public async updateField(
        field: WorkItemTrackingProcessDefinitions.FieldUpdate,
        processId: string
        ): Promise<WorkItemTrackingProcessDefinitions.FieldModel> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.FieldModel>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/work/processDefinitions/{processId}/fields/{field}",
            routeValues: {
                processId: processId
            },
            body: field
        });
    }

    /**
     * Adds a group to the work item form
     * 
     * @param group - The group
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param pageId - The ID of the page to add the group to
     * @param sectionId - The ID of the section to add the group to
     */
    public async addGroup(
        group: WorkItemTrackingProcessDefinitions.Group,
        processId: string,
        witRefName: string,
        pageId: string,
        sectionId: string
        ): Promise<WorkItemTrackingProcessDefinitions.Group> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.Group>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/pages/{pageId}/sections/{sectionId}/Groups/{groupId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                pageId: pageId,
                sectionId: sectionId
            },
            body: group
        });
    }

    /**
     * Updates a group in the work item form
     * 
     * @param group - The updated group
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param pageId - The ID of the page the group is in
     * @param sectionId - The ID of the section the group is in
     * @param groupId - The ID of the group
     */
    public async editGroup(
        group: WorkItemTrackingProcessDefinitions.Group,
        processId: string,
        witRefName: string,
        pageId: string,
        sectionId: string,
        groupId: string
        ): Promise<WorkItemTrackingProcessDefinitions.Group> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.Group>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/pages/{pageId}/sections/{sectionId}/Groups/{groupId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                pageId: pageId,
                sectionId: sectionId,
                groupId: groupId
            },
            body: group
        });
    }

    /**
     * Removes a group from the work item form
     * 
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param pageId - The ID of the page the group is in
     * @param sectionId - The ID of the section to the group is in
     * @param groupId - The ID of the group
     */
    public async removeGroup(
        processId: string,
        witRefName: string,
        pageId: string,
        sectionId: string,
        groupId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/pages/{pageId}/sections/{sectionId}/Groups/{groupId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                pageId: pageId,
                sectionId: sectionId,
                groupId: groupId
            }
        });
    }

    /**
     * Moves a group to a different page and section
     * 
     * @param group - The updated group
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param pageId - The ID of the page the group is in
     * @param sectionId - The ID of the section the group is in
     * @param groupId - The ID of the group
     * @param removeFromPageId - ID of the page to remove the group from
     * @param removeFromSectionId - ID of the section to remove the group from
     */
    public async setGroupInPage(
        group: WorkItemTrackingProcessDefinitions.Group,
        processId: string,
        witRefName: string,
        pageId: string,
        sectionId: string,
        groupId: string,
        removeFromPageId: string,
        removeFromSectionId: string
        ): Promise<WorkItemTrackingProcessDefinitions.Group> {

        const queryValues: any = {
            removeFromPageId: removeFromPageId,
            removeFromSectionId: removeFromSectionId
        };

        return this.beginRequest<WorkItemTrackingProcessDefinitions.Group>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/pages/{pageId}/sections/{sectionId}/Groups/{groupId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                pageId: pageId,
                sectionId: sectionId,
                groupId: groupId
            },
            queryParams: queryValues,
            body: group
        });
    }

    /**
     * Moves a group to a different section
     * 
     * @param group - The updated group
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param pageId - The ID of the page the group is in
     * @param sectionId - The ID of the section the group is in
     * @param groupId - The ID of the group
     * @param removeFromSectionId - ID of the section to remove the group from
     */
    public async setGroupInSection(
        group: WorkItemTrackingProcessDefinitions.Group,
        processId: string,
        witRefName: string,
        pageId: string,
        sectionId: string,
        groupId: string,
        removeFromSectionId: string
        ): Promise<WorkItemTrackingProcessDefinitions.Group> {

        const queryValues: any = {
            removeFromSectionId: removeFromSectionId
        };

        return this.beginRequest<WorkItemTrackingProcessDefinitions.Group>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/pages/{pageId}/sections/{sectionId}/Groups/{groupId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                pageId: pageId,
                sectionId: sectionId,
                groupId: groupId
            },
            queryParams: queryValues,
            body: group
        });
    }

    /**
     * Gets the form layout
     * 
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    public async getFormLayout(
        processId: string,
        witRefName: string
        ): Promise<WorkItemTrackingProcessDefinitions.FormLayout> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.FormLayout>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout",
            routeValues: {
                processId: processId,
                witRefName: witRefName
            }
        });
    }

    /**
     * Returns meta data of the picklist.
     * 
     */
    public async getListsMetadata(
        ): Promise<WorkItemTrackingProcessDefinitions.PickListMetadataModel[]> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.PickListMetadataModel[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/work/processDefinitions/lists"
        });
    }

    /**
     * Creates a picklist.
     * 
     * @param picklist - 
     */
    public async createList(
        picklist: WorkItemTrackingProcessDefinitions.PickListModel
        ): Promise<WorkItemTrackingProcessDefinitions.PickListModel> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.PickListModel>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/work/processDefinitions/lists/{listId}",
            body: picklist
        });
    }

    /**
     * Removes a picklist.
     * 
     * @param listId - The ID of the list
     */
    public async deleteList(
        listId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/work/processDefinitions/lists/{listId}",
            routeValues: {
                listId: listId
            }
        });
    }

    /**
     * Returns a picklist.
     * 
     * @param listId - The ID of the list
     */
    public async getList(
        listId: string
        ): Promise<WorkItemTrackingProcessDefinitions.PickListModel> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.PickListModel>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/work/processDefinitions/lists/{listId}",
            routeValues: {
                listId: listId
            }
        });
    }

    /**
     * Updates a list.
     * 
     * @param picklist - 
     * @param listId - The ID of the list
     */
    public async updateList(
        picklist: WorkItemTrackingProcessDefinitions.PickListModel,
        listId: string
        ): Promise<WorkItemTrackingProcessDefinitions.PickListModel> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.PickListModel>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/work/processDefinitions/lists/{listId}",
            routeValues: {
                listId: listId
            },
            body: picklist
        });
    }

    /**
     * Adds a page to the work item form
     * 
     * @param page - The page
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    public async addPage(
        page: WorkItemTrackingProcessDefinitions.Page,
        processId: string,
        witRefName: string
        ): Promise<WorkItemTrackingProcessDefinitions.Page> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.Page>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/Pages/{pageId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName
            },
            body: page
        });
    }

    /**
     * Updates a page on the work item form
     * 
     * @param page - The page
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    public async editPage(
        page: WorkItemTrackingProcessDefinitions.Page,
        processId: string,
        witRefName: string
        ): Promise<WorkItemTrackingProcessDefinitions.Page> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.Page>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/Pages/{pageId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName
            },
            body: page
        });
    }

    /**
     * Removes a page from the work item form
     * 
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param pageId - The ID of the page
     */
    public async removePage(
        processId: string,
        witRefName: string,
        pageId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/layout/Pages/{pageId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                pageId: pageId
            }
        });
    }

    /**
     * Creates a state definition in the work item type of the process.
     * 
     * @param stateModel - 
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    public async createStateDefinition(
        stateModel: WorkItemTrackingProcessDefinitions.WorkItemStateInputModel,
        processId: string,
        witRefName: string
        ): Promise<WorkItemTrackingProcessDefinitions.WorkItemStateResultModel> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.WorkItemStateResultModel>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/states/{stateId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName
            },
            body: stateModel
        });
    }

    /**
     * Removes a state definition in the work item type of the process.
     * 
     * @param processId - ID of the process
     * @param witRefName - The reference name of the work item type
     * @param stateId - ID of the state
     */
    public async deleteStateDefinition(
        processId: string,
        witRefName: string,
        stateId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/states/{stateId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                stateId: stateId
            }
        });
    }

    /**
     * Returns a state definition in the work item type of the process.
     * 
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param stateId - The ID of the state
     */
    public async getStateDefinition(
        processId: string,
        witRefName: string,
        stateId: string
        ): Promise<WorkItemTrackingProcessDefinitions.WorkItemStateResultModel> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.WorkItemStateResultModel>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/states/{stateId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                stateId: stateId
            }
        });
    }

    /**
     * Returns a list of all state definitions in the work item type of the process.
     * 
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    public async getStateDefinitions(
        processId: string,
        witRefName: string
        ): Promise<WorkItemTrackingProcessDefinitions.WorkItemStateResultModel[]> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.WorkItemStateResultModel[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/states/{stateId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName
            }
        });
    }

    /**
     * Hides a state definition in the work item type of the process.
     * 
     * @param hideStateModel - 
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param stateId - The ID of the state
     */
    public async hideStateDefinition(
        hideStateModel: WorkItemTrackingProcessDefinitions.HideStateModel,
        processId: string,
        witRefName: string,
        stateId: string
        ): Promise<WorkItemTrackingProcessDefinitions.WorkItemStateResultModel> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.WorkItemStateResultModel>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/states/{stateId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                stateId: stateId
            },
            body: hideStateModel
        });
    }

    /**
     * Updates a given state definition in the work item type of the process.
     * 
     * @param stateModel - 
     * @param processId - ID of the process
     * @param witRefName - The reference name of the work item type
     * @param stateId - ID of the state
     */
    public async updateStateDefinition(
        stateModel: WorkItemTrackingProcessDefinitions.WorkItemStateInputModel,
        processId: string,
        witRefName: string,
        stateId: string
        ): Promise<WorkItemTrackingProcessDefinitions.WorkItemStateResultModel> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.WorkItemStateResultModel>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}/states/{stateId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                stateId: stateId
            },
            body: stateModel
        });
    }

    /**
     * Adds a behavior to the work item type of the process.
     * 
     * @param behavior - 
     * @param processId - The ID of the process
     * @param witRefNameForBehaviors - Work item type reference name for the behavior
     */
    public async addBehaviorToWorkItemType(
        behavior: WorkItemTrackingProcessDefinitions.WorkItemTypeBehavior,
        processId: string,
        witRefNameForBehaviors: string
        ): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeBehavior> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.WorkItemTypeBehavior>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefNameForBehaviors}/behaviors/{behaviorRefName}",
            routeValues: {
                processId: processId,
                witRefNameForBehaviors: witRefNameForBehaviors
            },
            body: behavior
        });
    }

    /**
     * Returns a behavior for the work item type of the process.
     * 
     * @param processId - The ID of the process
     * @param witRefNameForBehaviors - Work item type reference name for the behavior
     * @param behaviorRefName - The reference name of the behavior
     */
    public async getBehaviorForWorkItemType(
        processId: string,
        witRefNameForBehaviors: string,
        behaviorRefName: string
        ): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeBehavior> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.WorkItemTypeBehavior>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefNameForBehaviors}/behaviors/{behaviorRefName}",
            routeValues: {
                processId: processId,
                witRefNameForBehaviors: witRefNameForBehaviors,
                behaviorRefName: behaviorRefName
            }
        });
    }

    /**
     * Returns a list of all behaviors for the work item type of the process.
     * 
     * @param processId - The ID of the process
     * @param witRefNameForBehaviors - Work item type reference name for the behavior
     */
    public async getBehaviorsForWorkItemType(
        processId: string,
        witRefNameForBehaviors: string
        ): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeBehavior[]> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.WorkItemTypeBehavior[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefNameForBehaviors}/behaviors/{behaviorRefName}",
            routeValues: {
                processId: processId,
                witRefNameForBehaviors: witRefNameForBehaviors
            }
        });
    }

    /**
     * Removes a behavior for the work item type of the process.
     * 
     * @param processId - The ID of the process
     * @param witRefNameForBehaviors - Work item type reference name for the behavior
     * @param behaviorRefName - The reference name of the behavior
     */
    public async removeBehaviorFromWorkItemType(
        processId: string,
        witRefNameForBehaviors: string,
        behaviorRefName: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefNameForBehaviors}/behaviors/{behaviorRefName}",
            routeValues: {
                processId: processId,
                witRefNameForBehaviors: witRefNameForBehaviors,
                behaviorRefName: behaviorRefName
            }
        });
    }

    /**
     * Updates default work item type for the behavior of the process.
     * 
     * @param behavior - 
     * @param processId - The ID of the process
     * @param witRefNameForBehaviors - Work item type reference name for the behavior
     */
    public async updateBehaviorToWorkItemType(
        behavior: WorkItemTrackingProcessDefinitions.WorkItemTypeBehavior,
        processId: string,
        witRefNameForBehaviors: string
        ): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeBehavior> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.WorkItemTypeBehavior>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefNameForBehaviors}/behaviors/{behaviorRefName}",
            routeValues: {
                processId: processId,
                witRefNameForBehaviors: witRefNameForBehaviors
            },
            body: behavior
        });
    }

    /**
     * Creates a work item type in the process.
     * 
     * @param workItemType - 
     * @param processId - The ID of the process
     */
    public async createWorkItemType(
        workItemType: WorkItemTrackingProcessDefinitions.WorkItemTypeModel,
        processId: string
        ): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeModel> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.WorkItemTypeModel>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}",
            routeValues: {
                processId: processId
            },
            body: workItemType
        });
    }

    /**
     * Removes a work item type in the process.
     * 
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    public async deleteWorkItemType(
        processId: string,
        witRefName: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}",
            routeValues: {
                processId: processId,
                witRefName: witRefName
            }
        });
    }

    /**
     * Returns a work item type of the process.
     * 
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param expand - 
     */
    public async getWorkItemType(
        processId: string,
        witRefName: string,
        expand?: WorkItemTrackingProcessDefinitions.GetWorkItemTypeExpand
        ): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeModel> {

        const queryValues: any = {
            '$expand': expand
        };

        return this.beginRequest<WorkItemTrackingProcessDefinitions.WorkItemTypeModel>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}",
            routeValues: {
                processId: processId,
                witRefName: witRefName
            },
            queryParams: queryValues
        });
    }

    /**
     * Returns a list of all work item types in the process.
     * 
     * @param processId - The ID of the process
     * @param expand - 
     */
    public async getWorkItemTypes(
        processId: string,
        expand?: WorkItemTrackingProcessDefinitions.GetWorkItemTypeExpand
        ): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeModel[]> {

        const queryValues: any = {
            '$expand': expand
        };

        return this.beginRequest<WorkItemTrackingProcessDefinitions.WorkItemTypeModel[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}",
            routeValues: {
                processId: processId
            },
            queryParams: queryValues
        });
    }

    /**
     * Updates a work item type of the process.
     * 
     * @param workItemTypeUpdate - 
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    public async updateWorkItemType(
        workItemTypeUpdate: WorkItemTrackingProcessDefinitions.WorkItemTypeUpdateModel,
        processId: string,
        witRefName: string
        ): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeModel> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.WorkItemTypeModel>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefName}",
            routeValues: {
                processId: processId,
                witRefName: witRefName
            },
            body: workItemTypeUpdate
        });
    }

    /**
     * Adds a field to the work item type in the process.
     * 
     * @param field - 
     * @param processId - The ID of the process
     * @param witRefNameForFields - Work item type reference name for the field
     */
    public async addFieldToWorkItemType(
        field: WorkItemTrackingProcessDefinitions.WorkItemTypeFieldModel2,
        processId: string,
        witRefNameForFields: string
        ): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeFieldModel2> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.WorkItemTypeFieldModel2>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefNameForFields}/fields/{fieldRefName}",
            routeValues: {
                processId: processId,
                witRefNameForFields: witRefNameForFields
            },
            body: field
        });
    }

    /**
     * Returns a single field in the work item type of the process.
     * 
     * @param processId - The ID of the process
     * @param witRefNameForFields - Work item type reference name for fields
     * @param fieldRefName - The reference name of the field
     */
    public async getWorkItemTypeField(
        processId: string,
        witRefNameForFields: string,
        fieldRefName: string
        ): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeFieldModel2> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.WorkItemTypeFieldModel2>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefNameForFields}/fields/{fieldRefName}",
            routeValues: {
                processId: processId,
                witRefNameForFields: witRefNameForFields,
                fieldRefName: fieldRefName
            }
        });
    }

    /**
     * Returns a list of all fields in the work item type of the process.
     * 
     * @param processId - The ID of the process
     * @param witRefNameForFields - Work item type reference name for fields
     */
    public async getWorkItemTypeFields(
        processId: string,
        witRefNameForFields: string
        ): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeFieldModel2[]> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.WorkItemTypeFieldModel2[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefNameForFields}/fields/{fieldRefName}",
            routeValues: {
                processId: processId,
                witRefNameForFields: witRefNameForFields
            }
        });
    }

    /**
     * Removes a field in the work item type of the process.
     * 
     * @param processId - The ID of the process
     * @param witRefNameForFields - Work item type reference name for fields
     * @param fieldRefName - The reference name of the field
     */
    public async removeFieldFromWorkItemType(
        processId: string,
        witRefNameForFields: string,
        fieldRefName: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefNameForFields}/fields/{fieldRefName}",
            routeValues: {
                processId: processId,
                witRefNameForFields: witRefNameForFields,
                fieldRefName: fieldRefName
            }
        });
    }

    /**
     * Updates a single field in the scope of the given process and work item type.
     * 
     * @param field - The model with which to update the field
     * @param processId - The ID of the process
     * @param witRefNameForFields - Work item type reference name for fields
     */
    public async updateWorkItemTypeField(
        field: WorkItemTrackingProcessDefinitions.WorkItemTypeFieldModel2,
        processId: string,
        witRefNameForFields: string
        ): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeFieldModel2> {

        return this.beginRequest<WorkItemTrackingProcessDefinitions.WorkItemTypeFieldModel2>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/work/processDefinitions/{processId}/workItemTypes/{witRefNameForFields}/fields/{fieldRefName}",
            routeValues: {
                processId: processId,
                witRefNameForFields: witRefNameForFields
            },
            body: field
        });
    }

}
