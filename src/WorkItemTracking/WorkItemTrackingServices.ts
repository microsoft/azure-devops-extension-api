import { WorkItem, WorkItemField, WorkItemRelation, WorkItemRelationType } from "./WorkItemTracking";
import { IdentityRef } from "../WebApi";

/**
 * Contribution ids of Azure Boards services which can be obtained from DevOps.getService
 */
export enum WorkItemTrackingServiceIds {

    /**
     * Host service for opening the work item form
     */
    WorkItemFormNavigationService = "ms.vss-work-web.work-item-form-navigation-service",

    /**
     * Host service for interacting with the currently active work item form (work item currently displayed in the UI).
     * Form service depends on the current active work item context. Will throw an error when there is no open work item.
     */
    WorkItemFormService = "ms.vss-work-web.work-item-form"
}

/**
 * Options for getting the values of a work item
 */
export interface WorkItemOptions {
    /**
     * Returns the original instead of updated value for the field
     */
    returnOriginalValue: boolean;
}

/**
* Host service for opening the work item form
*/
export interface IWorkItemFormNavigationService {
    /**
    * Opens the specified work item. The host page will display the work item in a dialog,
    * or it may update the current page view, depending on the current page.
    *
    * @param {number} workItemId The id of the work item to open
    * @param {boolean} openInNewTab (Optional) If true, opens the work item in a new tab. Default is false
    * @returns {Promise<WorkItem>} A promise that returns a work item when the work item dialog is closed. If openInNewTab is true, the promise will return null
    */
    openWorkItem(workItemId: number, openInNewTab?: boolean): Promise<WorkItem>;

    /**
    * Opens a new work item of the specified type. The host page will display the new work item in a dialog,
    * or it may update the current page view, depending on the current page.
    *
    * @param {string} workItemTypeName The name of the work item type to open
    * @param {{ [fieldName: string]: Object }} initialValues (Optional) A dictionary of any initial field values to set after opening the new work item.
    * @returns {Promise<WorkItem>} A promise that returns a work item when the work item dialog is closed. If the workitem was not saved before closing the dialog, the promise will return null
    */
    openNewWorkItem(workItemTypeName: string, initialValues?: { [fieldName: string]: Object }): Promise<WorkItem>;
}

/**
* Host service for interacting with the currently active work item form (work item currently displayed in the UI).
* Form service depends on the current active work item context. Will throw an error when there is no open work item.
*/
export interface IWorkItemFormService {
    /**
    * Gets id of active work item.
    *
    * @returns {Promise<number>} A promise that returns the active work item id.
    */
    getId(): Promise<number>;
    /**
    * Gets active work item's latest revision.
    *
    * @returns {Promise<number>} A promise that returns the active work item's latest revision id.
    */
    getRevision(): Promise<number>;
    /**
    * Gets active work item fields.
    *
    * @returns {Promise<WorkItemField[]>} A promise that returns an array of work item field.
    */
    getFields(): Promise<WorkItemField[]>;
    /**
    * Gets field value of the active work item.  
    * 
    * @deprecated Please use options instead of returnOriginalValue
    *
    * @param {string} fieldReferenceName Field reference name
    * @param {boolean} returnOriginalValue (Optional) If false, gets unsaved field values. Default is false.
    * @returns {Promise<Object>} A promise that returns the value of the work item field.
    */
    getFieldValue(fieldReferenceName: string, returnOriginalValue?: boolean): Promise<Object>;
    /**
     * Gets field value of the active work item.
     *
     * @param {string} fieldReferenceName Field reference name
     * @param {WorkItemOptions} options work item options
     * @returns {Promise<Object>} A promise that returns the value of the work item field.
     */
    getFieldValue(fieldReferenceName: string, options?: WorkItemOptions): Promise<Object>;
    /**
     * Gets identity field value of the active work item.
     *
     * @param {string} fieldReferenceName Field reference name
     * @param {WorkItemOptions} options work item options
     * @returns {Promise<Object>} A promise that returns the value of the work item field.
     */
    getIdentityFieldValue(fieldReferenceName: string, options?: WorkItemOptions): Promise<IdentityRef>;
    /**
    * Gets field values of the active work item.
    * 
    * @deprecated Please use options instead of returnOriginalValue
    *
    * @param {string[]} fieldReferenceNames An arrary of field reference names
    * @param {boolean} returnOriginalValue (Optional) If false, gets unsaved field values. Default is false.
    * @returns {Promise<{ [fieldName: string]: Object }>} A promise that returns a dictionary of work item field values (refName to values pairs).
    */
    getFieldValues(fieldReferenceNames: string[], returnOriginalValue?: boolean): Promise<{ [fieldName: string]: Object }>;
    /**
    * Gets field values of the active work item.
    *
    * @param {string[]} fieldReferenceNames An arrary of field reference names
    * @param {WorkItemOptions} options work item options
    * @returns {Promise<{ [fieldName: string]: Object }>} A promise that returns a dictionary of work item field values (refName to values pairs).
    */
    getFieldValues(fieldReferenceNames: string[], options?: WorkItemOptions): Promise<{ [fieldName: string]: Object }>;
    /**
    * Sets field value of the active work item.
    *
    * @param {string} fieldReferenceName Field reference name
    * @param {Object} value Field value
    * @returns {Promise<boolean>} A promise that returns a boolean value indicates whether the function completed successfully.
    */
    setFieldValue(fieldReferenceName: string, value: Object): Promise<boolean>;
    /**
    * Sets field values of the active work item.
    *
    * @param {{ [fieldName: string]: Object }} fields A dictionary of field refName/values
    * @returns {Promise<{ [fieldName: string]: boolean }>} A promise that returns a dictionary of field value update results (refName to results pairs).
    */
    setFieldValues(fields: { [fieldName: string]: Object }): Promise<{ [fieldName: string]: boolean }>;
    /**
    * Gets the allowed values for the field on the active work item.
    *
    * @param {string} fieldReferenceName Field reference name
    * @returns {Promise<object[]>} A promise that returns an array of allowed values.
    */
    getAllowedFieldValues(fieldReferenceName: string): Promise<Object[]>;
    /**
    * Returns true if the active work item is dirty.
    *
    * @returns {Promise<boolean>} A promise that returns a boolean value indicates whether the active work item is dirty.
    */
    isDirty(): Promise<boolean>;
    /**
    * Returns true if the active work item is new.
    *
    * @returns {Promise<boolean>} A promise that returns a boolean value indicates whether the active work item is new.
    */
    isNew(): Promise<boolean>;
    /**
    * Returns true if the active work item fields are all valid.
    *
    * @returns {Promise<boolean>} A promise that returns a boolean value indicates whether all field values are valid.
    */
    isValid(): Promise<boolean>;
    /**
    * Marks the work item as invalid and disable saving the work item on the form.
    *
    * @param {string} errorMessage A custom error message that would be shown on top of the work item form.
    */
    setError(errorMessage: string): Promise<void>;
    /**
    * Clears the error set by setError method and unblocks saving of the work item in the form.
    */
    clearError(): Promise<void>;
    /**
    * Saves the active work item.
    *
    * @returns {Promise<void>} A promise that is resolved if the work item is saved successfully and rejected if it fails.
    */
    save(): Promise<void>;

    /**
    * Refreshes the active work item. Will prompt the user if the work item is dirty.
    */
    refresh(): Promise<void>;

    /**
    * Reset any changes in the active work item. Will prompt the user to confirm.
    */
    reset(): Promise<void>;

    /**
    * Gets fields who are in an invalid state according to the work item rules. These fields need to be changed before the work item can be saved.
    *
    * @returns {Promise<WorkItemField[]>} A promise that returns an array of invalid work item fields.
    */
    getInvalidFields(): Promise<WorkItemField[]>;
    /**
    * Gets fields that have been changed either by user or by a work item rule and are in a dirty state.
    *
    * @param {boolean} includeSystemChanges A boolean value indicating if the result should include changes set by work item rules.
    * @returns {Promise<WorkItemField[]>} A promise that returns an array of dirty work item fields.
    */
    getDirtyFields(includeSystemChanges?: boolean): Promise<WorkItemField[]>;
    /**
    * Adds links of another work items or artifacts (e.g. commits, hyperlinks) to the work item. Attachment is currently not supported by this function.
    *
    * @param {WorkItemRelation[]} workItemRelations Work item links to add.
    * @returns {Promise<void>} An empty promise.
    */
    addWorkItemRelations(workItemRelations: WorkItemRelation[]): Promise<void>;
    /**
    * Removes links to another work items or artifacts (e.g. commits, hyperlinks) from the work item. Attachment is currently not supported by this function. 
    *
    * @param {WorkItemRelation[]} workItemRelations Work item links to remove.
    * @returns {Promise<void>} An empty promise.
    */
    removeWorkItemRelations(workItemRelations: WorkItemRelation[]): Promise<void>;
    /**
    * Returns an array of  work item links to other work items or artifacts (e.g. commits, hyperlinks). Attachment is currently not supported by this function.
    *
    * @returns {Promise<WorkItemRelation[]>} A promise that returns an array of work item relations of active work item.
    */
    getWorkItemRelations(): Promise<WorkItemRelation[]>;
    /**
    * Returns the REST API url of the specified work item resource.
    *
    * @param {number} workItemId Id of the work item that the resource url is requested for.
    * @returns {Promise<string>} A promise that returns the requested resource url of the work item.
    */
    getWorkItemResourceUrl(workItemId: number): Promise<string>;
    /**
    * Returns an array of work item relation types.
    *
    * @returns {Promise<WorkItemRelationType[]>} A promise that returns an array of work item relation types.
    */
    getWorkItemRelationTypes(): Promise<WorkItemRelationType[]>;
    /**
    * Returns true if the active work item available.
    *
    * @returns {Promise<boolean>} A promise that returns a boolean value indicates whether the active work item is available.
    */
    hasActiveWorkItem(): Promise<boolean>;

    /**
    * @deprecated: Please use save
    */
    beginSaveWorkItem(successCallback: () => void, errorCallback: () => void): Promise<void>;
}

/**
* Interface defining the arguments for notifications sent by the ActiveWorkItemService
*/
export interface IWorkItemChangedArgs {
    /**
    * Id of the work item.
    */
    id: number;
}

/**
* Interface defining the arguments for the 'onLoaded' notification sent by the ActiveWorkItemService
*/
export interface IWorkItemLoadedArgs extends IWorkItemChangedArgs {
    /**
    * 'true' if the work item is a 'new', unsaved work item, 'false' otherwise.
    */
    isNew: boolean;
    /**
     * 'true' write rest apis are disabled. All controls should be rendered as readonly
     */
    isReadOnly: boolean;
}

/**
* Interface defining the arguments for the 'onFieldChanged' notification sent by the ActiveWorkItemService
*/
export interface IWorkItemFieldChangedArgs extends IWorkItemChangedArgs {
    /**
    * Set of fields that have been changed.  'key' is the field reference name.
    */
    changedFields: { [key: string]: any };
}

/**
* Interface defining notifications provided by the ActiveWorkItemService
*/
export interface IWorkItemNotificationListener {

    /**
    * Called when an extension is loaded
    *
    * @param workItemLoadedArgs Information about the work item that was loaded.
    */
    onLoaded(workItemLoadedArgs: IWorkItemLoadedArgs): void;

    /**
    * Called when a field is modified
    *
    * @param fieldChangedArgs Information about the work item that was modified and the fields that were changed.
    */
    onFieldChanged(fieldChangedArgs: IWorkItemFieldChangedArgs): void;

    /**
    * Called when a work item is saved
    *
    * @param savedEventArgs Information about the work item that was saved.
    */
    onSaved(savedEventArgs: IWorkItemChangedArgs): void;

    /**
    * Called when a work item is refreshed
    *
    * @param refreshEventArgs Information about the work item that was refreshed.
    */
    onRefreshed(refreshEventArgs: IWorkItemChangedArgs): void;

    /**
    * Called when a work item is reset (undo back to unchanged state)
    *
    * @param undoEventArgs Information about the work item that was reset.
    */
    onReset(undoEventArgs: IWorkItemChangedArgs): void;

    /**
    * Called when a work item is unloaded
    *
    * @param unloadedEventArgs Information about the work item that was saved.
    */
    onUnloaded(unloadedEventArgs: IWorkItemChangedArgs): void;
}
