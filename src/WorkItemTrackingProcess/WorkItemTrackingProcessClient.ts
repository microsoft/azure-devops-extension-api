/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as WorkItemTrackingProcess from "../WorkItemTrackingProcess/WorkItemTrackingProcess";

export class WorkItemTrackingProcessRestClient extends RestClientBase {
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
    public async createProcessBehavior(
        behavior: WorkItemTrackingProcess.ProcessBehaviorCreateRequest,
        processId: string
        ): Promise<WorkItemTrackingProcess.ProcessBehavior> {

        return this.beginRequest<WorkItemTrackingProcess.ProcessBehavior>({
            apiVersion: "7.1-preview.2",
            method: "POST",
            routeTemplate: "_apis/work/processes/{processId}/behaviors/{behaviorRefName}",
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
     * @param behaviorRefName - The reference name of the behavior
     */
    public async deleteProcessBehavior(
        processId: string,
        behaviorRefName: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.2",
            method: "DELETE",
            routeTemplate: "_apis/work/processes/{processId}/behaviors/{behaviorRefName}",
            routeValues: {
                processId: processId,
                behaviorRefName: behaviorRefName
            }
        });
    }

    /**
     * Returns a behavior of the process.
     * 
     * @param processId - The ID of the process
     * @param behaviorRefName - The reference name of the behavior
     * @param expand - 
     */
    public async getProcessBehavior(
        processId: string,
        behaviorRefName: string,
        expand?: WorkItemTrackingProcess.GetBehaviorsExpand
        ): Promise<WorkItemTrackingProcess.ProcessBehavior> {

        const queryValues: any = {
            '$expand': expand
        };

        return this.beginRequest<WorkItemTrackingProcess.ProcessBehavior>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/work/processes/{processId}/behaviors/{behaviorRefName}",
            routeValues: {
                processId: processId,
                behaviorRefName: behaviorRefName
            },
            queryParams: queryValues
        });
    }

    /**
     * Returns a list of all behaviors in the process.
     * 
     * @param processId - The ID of the process
     * @param expand - 
     */
    public async getProcessBehaviors(
        processId: string,
        expand?: WorkItemTrackingProcess.GetBehaviorsExpand
        ): Promise<WorkItemTrackingProcess.ProcessBehavior[]> {

        const queryValues: any = {
            '$expand': expand
        };

        return this.beginRequest<WorkItemTrackingProcess.ProcessBehavior[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/work/processes/{processId}/behaviors/{behaviorRefName}",
            routeValues: {
                processId: processId
            },
            queryParams: queryValues
        });
    }

    /**
     * Replaces a behavior in the process.
     * 
     * @param behaviorData - 
     * @param processId - The ID of the process
     * @param behaviorRefName - The reference name of the behavior
     */
    public async updateProcessBehavior(
        behaviorData: WorkItemTrackingProcess.ProcessBehaviorUpdateRequest,
        processId: string,
        behaviorRefName: string
        ): Promise<WorkItemTrackingProcess.ProcessBehavior> {

        return this.beginRequest<WorkItemTrackingProcess.ProcessBehavior>({
            apiVersion: "7.1-preview.2",
            method: "PUT",
            routeTemplate: "_apis/work/processes/{processId}/behaviors/{behaviorRefName}",
            routeValues: {
                processId: processId,
                behaviorRefName: behaviorRefName
            },
            body: behaviorData
        });
    }

    /**
     * Creates a control in a group.
     * 
     * @param control - The control.
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param groupId - The ID of the group to add the control to.
     */
    public async createControlInGroup(
        control: WorkItemTrackingProcess.Control,
        processId: string,
        witRefName: string,
        groupId: string
        ): Promise<WorkItemTrackingProcess.Control> {

        return this.beginRequest<WorkItemTrackingProcess.Control>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/groups/{groupId}/Controls/{controlId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                groupId: groupId
            },
            body: control
        });
    }

    /**
     * Moves a control to a specified group.
     * 
     * @param control - The control.
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param groupId - The ID of the group to move the control to.
     * @param controlId - The ID of the control.
     * @param removeFromGroupId - The group ID to remove the control from.
     */
    public async moveControlToGroup(
        control: WorkItemTrackingProcess.Control,
        processId: string,
        witRefName: string,
        groupId: string,
        controlId: string,
        removeFromGroupId?: string
        ): Promise<WorkItemTrackingProcess.Control> {

        const queryValues: any = {
            removeFromGroupId: removeFromGroupId
        };

        return this.beginRequest<WorkItemTrackingProcess.Control>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/groups/{groupId}/Controls/{controlId}",
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
     * Removes a control from the work item form.
     * 
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param groupId - The ID of the group.
     * @param controlId - The ID of the control to remove.
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
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/groups/{groupId}/Controls/{controlId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                groupId: groupId,
                controlId: controlId
            }
        });
    }

    /**
     * Updates a control on the work item form.
     * 
     * @param control - The updated control.
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param groupId - The ID of the group.
     * @param controlId - The ID of the control.
     */
    public async updateControl(
        control: WorkItemTrackingProcess.Control,
        processId: string,
        witRefName: string,
        groupId: string,
        controlId: string
        ): Promise<WorkItemTrackingProcess.Control> {

        return this.beginRequest<WorkItemTrackingProcess.Control>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/groups/{groupId}/Controls/{controlId}",
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
     * Adds a field to a work item type.
     * 
     * @param field - 
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     */
    public async addFieldToWorkItemType(
        field: WorkItemTrackingProcess.AddProcessWorkItemTypeFieldRequest,
        processId: string,
        witRefName: string
        ): Promise<WorkItemTrackingProcess.ProcessWorkItemTypeField> {

        return this.beginRequest<WorkItemTrackingProcess.ProcessWorkItemTypeField>({
            apiVersion: "7.1-preview.2",
            method: "POST",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/fields/{fieldRefName}",
            routeValues: {
                processId: processId,
                witRefName: witRefName
            },
            body: field
        });
    }

    /**
     * Returns a list of all fields in a work item type.
     * 
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     */
    public async getAllWorkItemTypeFields(
        processId: string,
        witRefName: string
        ): Promise<WorkItemTrackingProcess.ProcessWorkItemTypeField[]> {

        return this.beginRequest<WorkItemTrackingProcess.ProcessWorkItemTypeField[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/fields/{fieldRefName}",
            routeValues: {
                processId: processId,
                witRefName: witRefName
            }
        });
    }

    /**
     * Returns a field in a work item type.
     * 
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param fieldRefName - The reference name of the field.
     * @param expand - 
     */
    public async getWorkItemTypeField(
        processId: string,
        witRefName: string,
        fieldRefName: string,
        expand?: WorkItemTrackingProcess.ProcessWorkItemTypeFieldsExpandLevel
        ): Promise<WorkItemTrackingProcess.ProcessWorkItemTypeField> {

        const queryValues: any = {
            '$expand': expand
        };

        return this.beginRequest<WorkItemTrackingProcess.ProcessWorkItemTypeField>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/fields/{fieldRefName}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                fieldRefName: fieldRefName
            },
            queryParams: queryValues
        });
    }

    /**
     * Removes a field from a work item type. Does not permanently delete the field.
     * 
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param fieldRefName - The reference name of the field.
     */
    public async removeWorkItemTypeField(
        processId: string,
        witRefName: string,
        fieldRefName: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.2",
            method: "DELETE",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/fields/{fieldRefName}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                fieldRefName: fieldRefName
            }
        });
    }

    /**
     * Updates a field in a work item type.
     * 
     * @param field - 
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param fieldRefName - The reference name of the field.
     */
    public async updateWorkItemTypeField(
        field: WorkItemTrackingProcess.UpdateProcessWorkItemTypeFieldRequest,
        processId: string,
        witRefName: string,
        fieldRefName: string
        ): Promise<WorkItemTrackingProcess.ProcessWorkItemTypeField> {

        return this.beginRequest<WorkItemTrackingProcess.ProcessWorkItemTypeField>({
            apiVersion: "7.1-preview.2",
            method: "PATCH",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/fields/{fieldRefName}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                fieldRefName: fieldRefName
            },
            body: field
        });
    }

    /**
     * Adds a group to the work item form.
     * 
     * @param group - The group.
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param pageId - The ID of the page to add the group to.
     * @param sectionId - The ID of the section to add the group to.
     */
    public async addGroup(
        group: WorkItemTrackingProcess.Group,
        processId: string,
        witRefName: string,
        pageId: string,
        sectionId: string
        ): Promise<WorkItemTrackingProcess.Group> {

        return this.beginRequest<WorkItemTrackingProcess.Group>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/pages/{pageId}/sections/{sectionId}/Groups/{groupId}",
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
     * Moves a group to a different page and section.
     * 
     * @param group - The updated group.
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param pageId - The ID of the page the group is in.
     * @param sectionId - The ID of the section the group is i.n
     * @param groupId - The ID of the group.
     * @param removeFromPageId - ID of the page to remove the group from.
     * @param removeFromSectionId - ID of the section to remove the group from.
     */
    public async moveGroupToPage(
        group: WorkItemTrackingProcess.Group,
        processId: string,
        witRefName: string,
        pageId: string,
        sectionId: string,
        groupId: string,
        removeFromPageId: string,
        removeFromSectionId: string
        ): Promise<WorkItemTrackingProcess.Group> {

        const queryValues: any = {
            removeFromPageId: removeFromPageId,
            removeFromSectionId: removeFromSectionId
        };

        return this.beginRequest<WorkItemTrackingProcess.Group>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/pages/{pageId}/sections/{sectionId}/Groups/{groupId}",
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
     * Moves a group to a different section.
     * 
     * @param group - The updated group.
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param pageId - The ID of the page the group is in.
     * @param sectionId - The ID of the section the group is in.
     * @param groupId - The ID of the group.
     * @param removeFromSectionId - ID of the section to remove the group from.
     */
    public async moveGroupToSection(
        group: WorkItemTrackingProcess.Group,
        processId: string,
        witRefName: string,
        pageId: string,
        sectionId: string,
        groupId: string,
        removeFromSectionId: string
        ): Promise<WorkItemTrackingProcess.Group> {

        const queryValues: any = {
            removeFromSectionId: removeFromSectionId
        };

        return this.beginRequest<WorkItemTrackingProcess.Group>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/pages/{pageId}/sections/{sectionId}/Groups/{groupId}",
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
     * Removes a group from the work item form.
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
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/pages/{pageId}/sections/{sectionId}/Groups/{groupId}",
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
     * Updates a group in the work item form.
     * 
     * @param group - The updated group.
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param pageId - The ID of the page the group is in.
     * @param sectionId - The ID of the section the group is in.
     * @param groupId - The ID of the group.
     */
    public async updateGroup(
        group: WorkItemTrackingProcess.Group,
        processId: string,
        witRefName: string,
        pageId: string,
        sectionId: string,
        groupId: string
        ): Promise<WorkItemTrackingProcess.Group> {

        return this.beginRequest<WorkItemTrackingProcess.Group>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/pages/{pageId}/sections/{sectionId}/Groups/{groupId}",
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
     * Gets the form layout.
     * 
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     */
    public async getFormLayout(
        processId: string,
        witRefName: string
        ): Promise<WorkItemTrackingProcess.FormLayout> {

        return this.beginRequest<WorkItemTrackingProcess.FormLayout>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout",
            routeValues: {
                processId: processId,
                witRefName: witRefName
            }
        });
    }

    /**
     * Creates a picklist.
     * 
     * @param picklist - Picklist
     */
    public async createList(
        picklist: WorkItemTrackingProcess.PickList
        ): Promise<WorkItemTrackingProcess.PickList> {

        return this.beginRequest<WorkItemTrackingProcess.PickList>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/work/processes/lists/{listId}",
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
            routeTemplate: "_apis/work/processes/lists/{listId}",
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
        ): Promise<WorkItemTrackingProcess.PickList> {

        return this.beginRequest<WorkItemTrackingProcess.PickList>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/work/processes/lists/{listId}",
            routeValues: {
                listId: listId
            }
        });
    }

    /**
     * Returns meta data of the picklist.
     * 
     */
    public async getListsMetadata(
        ): Promise<WorkItemTrackingProcess.PickListMetadata[]> {

        return this.beginRequest<WorkItemTrackingProcess.PickListMetadata[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/work/processes/lists/{listId}"
        });
    }

    /**
     * Updates a list.
     * 
     * @param picklist - 
     * @param listId - The ID of the list
     */
    public async updateList(
        picklist: WorkItemTrackingProcess.PickList,
        listId: string
        ): Promise<WorkItemTrackingProcess.PickList> {

        return this.beginRequest<WorkItemTrackingProcess.PickList>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/work/processes/lists/{listId}",
            routeValues: {
                listId: listId
            },
            body: picklist
        });
    }

    /**
     * Adds a page to the work item form.
     * 
     * @param page - The page.
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     */
    public async addPage(
        page: WorkItemTrackingProcess.Page,
        processId: string,
        witRefName: string
        ): Promise<WorkItemTrackingProcess.Page> {

        return this.beginRequest<WorkItemTrackingProcess.Page>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/Pages/{pageId}",
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
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/Pages/{pageId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                pageId: pageId
            }
        });
    }

    /**
     * Updates a page on the work item form
     * 
     * @param page - The page
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    public async updatePage(
        page: WorkItemTrackingProcess.Page,
        processId: string,
        witRefName: string
        ): Promise<WorkItemTrackingProcess.Page> {

        return this.beginRequest<WorkItemTrackingProcess.Page>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/Pages/{pageId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName
            },
            body: page
        });
    }

    /**
     * Creates a process.
     * 
     * @param createRequest - CreateProcessModel.
     */
    public async createNewProcess(
        createRequest: WorkItemTrackingProcess.CreateProcessModel
        ): Promise<WorkItemTrackingProcess.ProcessInfo> {

        return this.beginRequest<WorkItemTrackingProcess.ProcessInfo>({
            apiVersion: "7.1-preview.2",
            method: "POST",
            routeTemplate: "_apis/work/processes/{processTypeId}",
            body: createRequest
        });
    }

    /**
     * Removes a process of a specific ID.
     * 
     * @param processTypeId - 
     */
    public async deleteProcessById(
        processTypeId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.2",
            method: "DELETE",
            routeTemplate: "_apis/work/processes/{processTypeId}",
            routeValues: {
                processTypeId: processTypeId
            }
        });
    }

    /**
     * Edit a process of a specific ID.
     * 
     * @param updateRequest - 
     * @param processTypeId - 
     */
    public async editProcess(
        updateRequest: WorkItemTrackingProcess.UpdateProcessModel,
        processTypeId: string
        ): Promise<WorkItemTrackingProcess.ProcessInfo> {

        return this.beginRequest<WorkItemTrackingProcess.ProcessInfo>({
            apiVersion: "7.1-preview.2",
            method: "PATCH",
            routeTemplate: "_apis/work/processes/{processTypeId}",
            routeValues: {
                processTypeId: processTypeId
            },
            body: updateRequest
        });
    }

    /**
     * Get list of all processes including system and inherited.
     * 
     * @param expand - 
     */
    public async getListOfProcesses(
        expand?: WorkItemTrackingProcess.GetProcessExpandLevel
        ): Promise<WorkItemTrackingProcess.ProcessInfo[]> {

        const queryValues: any = {
            '$expand': expand
        };

        return this.beginRequest<WorkItemTrackingProcess.ProcessInfo[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/work/processes/{processTypeId}",
            queryParams: queryValues
        });
    }

    /**
     * Get a single process of a specified ID.
     * 
     * @param processTypeId - 
     * @param expand - 
     */
    public async getProcessByItsId(
        processTypeId: string,
        expand?: WorkItemTrackingProcess.GetProcessExpandLevel
        ): Promise<WorkItemTrackingProcess.ProcessInfo> {

        const queryValues: any = {
            '$expand': expand
        };

        return this.beginRequest<WorkItemTrackingProcess.ProcessInfo>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/work/processes/{processTypeId}",
            routeValues: {
                processTypeId: processTypeId
            },
            queryParams: queryValues
        });
    }

    /**
     * Adds a rule to work item type in the process.
     * 
     * @param processRuleCreate - 
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    public async addProcessWorkItemTypeRule(
        processRuleCreate: WorkItemTrackingProcess.CreateProcessRuleRequest,
        processId: string,
        witRefName: string
        ): Promise<WorkItemTrackingProcess.ProcessRule> {

        return this.beginRequest<WorkItemTrackingProcess.ProcessRule>({
            apiVersion: "7.1-preview.2",
            method: "POST",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/rules/{ruleId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName
            },
            body: processRuleCreate
        });
    }

    /**
     * Removes a rule from the work item type in the process.
     * 
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param ruleId - The ID of the rule
     */
    public async deleteProcessWorkItemTypeRule(
        processId: string,
        witRefName: string,
        ruleId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.2",
            method: "DELETE",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/rules/{ruleId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                ruleId: ruleId
            }
        });
    }

    /**
     * Returns a single rule in the work item type of the process.
     * 
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param ruleId - The ID of the rule
     */
    public async getProcessWorkItemTypeRule(
        processId: string,
        witRefName: string,
        ruleId: string
        ): Promise<WorkItemTrackingProcess.ProcessRule> {

        return this.beginRequest<WorkItemTrackingProcess.ProcessRule>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/rules/{ruleId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                ruleId: ruleId
            }
        });
    }

    /**
     * Returns a list of all rules in the work item type of the process.
     * 
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    public async getProcessWorkItemTypeRules(
        processId: string,
        witRefName: string
        ): Promise<WorkItemTrackingProcess.ProcessRule[]> {

        return this.beginRequest<WorkItemTrackingProcess.ProcessRule[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/rules/{ruleId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName
            }
        });
    }

    /**
     * Updates a rule in the work item type of the process.
     * 
     * @param processRule - 
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param ruleId - The ID of the rule
     */
    public async updateProcessWorkItemTypeRule(
        processRule: WorkItemTrackingProcess.UpdateProcessRuleRequest,
        processId: string,
        witRefName: string,
        ruleId: string
        ): Promise<WorkItemTrackingProcess.ProcessRule> {

        return this.beginRequest<WorkItemTrackingProcess.ProcessRule>({
            apiVersion: "7.1-preview.2",
            method: "PUT",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/rules/{ruleId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                ruleId: ruleId
            },
            body: processRule
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
        stateModel: WorkItemTrackingProcess.WorkItemStateInputModel,
        processId: string,
        witRefName: string
        ): Promise<WorkItemTrackingProcess.WorkItemStateResultModel> {

        return this.beginRequest<WorkItemTrackingProcess.WorkItemStateResultModel>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/states/{stateId}",
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
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/states/{stateId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                stateId: stateId
            }
        });
    }

    /**
     * Returns a single state definition in a work item type of the process.
     * 
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param stateId - The ID of the state
     */
    public async getStateDefinition(
        processId: string,
        witRefName: string,
        stateId: string
        ): Promise<WorkItemTrackingProcess.WorkItemStateResultModel> {

        return this.beginRequest<WorkItemTrackingProcess.WorkItemStateResultModel>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/states/{stateId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                stateId: stateId
            }
        });
    }

    /**
     * Returns a list of all state definitions in a work item type of the process.
     * 
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    public async getStateDefinitions(
        processId: string,
        witRefName: string
        ): Promise<WorkItemTrackingProcess.WorkItemStateResultModel[]> {

        return this.beginRequest<WorkItemTrackingProcess.WorkItemStateResultModel[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/states/{stateId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName
            }
        });
    }

    /**
     * Hides a state definition in the work item type of the process.Only states with customizationType:System can be hidden.
     * 
     * @param hideStateModel - 
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param stateId - The ID of the state
     */
    public async hideStateDefinition(
        hideStateModel: WorkItemTrackingProcess.HideStateModel,
        processId: string,
        witRefName: string,
        stateId: string
        ): Promise<WorkItemTrackingProcess.WorkItemStateResultModel> {

        return this.beginRequest<WorkItemTrackingProcess.WorkItemStateResultModel>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/states/{stateId}",
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
        stateModel: WorkItemTrackingProcess.WorkItemStateInputModel,
        processId: string,
        witRefName: string,
        stateId: string
        ): Promise<WorkItemTrackingProcess.WorkItemStateResultModel> {

        return this.beginRequest<WorkItemTrackingProcess.WorkItemStateResultModel>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/states/{stateId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                stateId: stateId
            },
            body: stateModel
        });
    }

    /**
     * Deletes a system control modification on the work item form.
     * 
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param controlId - The ID of the control.
     */
    public async deleteSystemControl(
        processId: string,
        witRefName: string,
        controlId: string
        ): Promise<WorkItemTrackingProcess.Control[]> {

        return this.beginRequest<WorkItemTrackingProcess.Control[]>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/systemcontrols/{controlId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                controlId: controlId
            }
        });
    }

    /**
     * Gets edited system controls for a work item type in a process. To get all system controls (base + edited) use layout API(s)
     * 
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     */
    public async getSystemControls(
        processId: string,
        witRefName: string
        ): Promise<WorkItemTrackingProcess.Control[]> {

        return this.beginRequest<WorkItemTrackingProcess.Control[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/systemcontrols/{controlId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName
            }
        });
    }

    /**
     * Updates/adds a system control on the work item form.
     * 
     * @param control - 
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param controlId - The ID of the control.
     */
    public async updateSystemControl(
        control: WorkItemTrackingProcess.Control,
        processId: string,
        witRefName: string,
        controlId: string
        ): Promise<WorkItemTrackingProcess.Control> {

        return this.beginRequest<WorkItemTrackingProcess.Control>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}/layout/systemcontrols/{controlId}",
            routeValues: {
                processId: processId,
                witRefName: witRefName,
                controlId: controlId
            },
            body: control
        });
    }

    /**
     * Creates a work item type in the process.
     * 
     * @param workItemType - 
     * @param processId - The ID of the process on which to create work item type.
     */
    public async createProcessWorkItemType(
        workItemType: WorkItemTrackingProcess.CreateProcessWorkItemTypeRequest,
        processId: string
        ): Promise<WorkItemTrackingProcess.ProcessWorkItemType> {

        return this.beginRequest<WorkItemTrackingProcess.ProcessWorkItemType>({
            apiVersion: "7.1-preview.2",
            method: "POST",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}",
            routeValues: {
                processId: processId
            },
            body: workItemType
        });
    }

    /**
     * Removes a work item type in the process.
     * 
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     */
    public async deleteProcessWorkItemType(
        processId: string,
        witRefName: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.2",
            method: "DELETE",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}",
            routeValues: {
                processId: processId,
                witRefName: witRefName
            }
        });
    }

    /**
     * Returns a single work item type in a process.
     * 
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param expand - Flag to determine what properties of work item type to return
     */
    public async getProcessWorkItemType(
        processId: string,
        witRefName: string,
        expand?: WorkItemTrackingProcess.GetWorkItemTypeExpand
        ): Promise<WorkItemTrackingProcess.ProcessWorkItemType> {

        const queryValues: any = {
            '$expand': expand
        };

        return this.beginRequest<WorkItemTrackingProcess.ProcessWorkItemType>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}",
            routeValues: {
                processId: processId,
                witRefName: witRefName
            },
            queryParams: queryValues
        });
    }

    /**
     * Returns a list of all work item types in a process.
     * 
     * @param processId - The ID of the process
     * @param expand - Flag to determine what properties of work item type to return
     */
    public async getProcessWorkItemTypes(
        processId: string,
        expand?: WorkItemTrackingProcess.GetWorkItemTypeExpand
        ): Promise<WorkItemTrackingProcess.ProcessWorkItemType[]> {

        const queryValues: any = {
            '$expand': expand
        };

        return this.beginRequest<WorkItemTrackingProcess.ProcessWorkItemType[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}",
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
    public async updateProcessWorkItemType(
        workItemTypeUpdate: WorkItemTrackingProcess.UpdateProcessWorkItemTypeRequest,
        processId: string,
        witRefName: string
        ): Promise<WorkItemTrackingProcess.ProcessWorkItemType> {

        return this.beginRequest<WorkItemTrackingProcess.ProcessWorkItemType>({
            apiVersion: "7.1-preview.2",
            method: "PATCH",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypes/{witRefName}",
            routeValues: {
                processId: processId,
                witRefName: witRefName
            },
            body: workItemTypeUpdate
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
        behavior: WorkItemTrackingProcess.WorkItemTypeBehavior,
        processId: string,
        witRefNameForBehaviors: string
        ): Promise<WorkItemTrackingProcess.WorkItemTypeBehavior> {

        return this.beginRequest<WorkItemTrackingProcess.WorkItemTypeBehavior>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypesBehaviors/{witRefNameForBehaviors}/behaviors/{behaviorRefName}",
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
        ): Promise<WorkItemTrackingProcess.WorkItemTypeBehavior> {

        return this.beginRequest<WorkItemTrackingProcess.WorkItemTypeBehavior>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypesBehaviors/{witRefNameForBehaviors}/behaviors/{behaviorRefName}",
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
        ): Promise<WorkItemTrackingProcess.WorkItemTypeBehavior[]> {

        return this.beginRequest<WorkItemTrackingProcess.WorkItemTypeBehavior[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypesBehaviors/{witRefNameForBehaviors}/behaviors/{behaviorRefName}",
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
            routeTemplate: "_apis/work/processes/{processId}/workItemTypesBehaviors/{witRefNameForBehaviors}/behaviors/{behaviorRefName}",
            routeValues: {
                processId: processId,
                witRefNameForBehaviors: witRefNameForBehaviors,
                behaviorRefName: behaviorRefName
            }
        });
    }

    /**
     * Updates a behavior for the work item type of the process.
     * 
     * @param behavior - 
     * @param processId - The ID of the process
     * @param witRefNameForBehaviors - Work item type reference name for the behavior
     */
    public async updateBehaviorToWorkItemType(
        behavior: WorkItemTrackingProcess.WorkItemTypeBehavior,
        processId: string,
        witRefNameForBehaviors: string
        ): Promise<WorkItemTrackingProcess.WorkItemTypeBehavior> {

        return this.beginRequest<WorkItemTrackingProcess.WorkItemTypeBehavior>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/work/processes/{processId}/workItemTypesBehaviors/{witRefNameForBehaviors}/behaviors/{behaviorRefName}",
            routeValues: {
                processId: processId,
                witRefNameForBehaviors: witRefNameForBehaviors
            },
            body: behavior
        });
    }

}
