/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

export interface Board extends BoardReference {
    /**
     * Links to other related objects.
     */
    _links: any;
    /**
     * Description of the board.
     */
    description: string;
}

/**
 * Provides properties that describe a column in a board.
 */
export interface BoardColumn extends BoardColumnBase {
    /**
     * Links to other related objects.
     */
    _links: any;
    /**
     * Id of the resource.
     */
    id: string;
    /**
     * Next column identifier.
     */
    nextColumnId: string;
    /**
     * Full http link to the resource.
     */
    url: string;
}

/**
 * Provides base properties that describe a column in a board.
 */
export interface BoardColumnBase {
    /**
     * Board column description.
     */
    description: string;
    /**
     * Name of the column.
     */
    name: string;
}

/**
 * Response collection for board column actions.
 */
export interface BoardColumnCollectionResponse {
    /**
     * Links to other related objects.
     */
    _links: any;
    /**
     * The resulting collection of BoardColumn.
     */
    columns: BoardColumn[];
}

/**
 * Describes a column to create on a board.
 */
export interface BoardColumnCreate extends BoardColumnBase {
    /**
     * Next column identifier or supported directive: $first or $last.
     */
    nextColumnId: string;
}

/**
 * INTERNAL. Event that is fired when a column is added.
 */
export interface BoardColumnCreatedRealtimeEvent extends RealtimeBoardEvent {
    /**
     * Ids of columns created.
     */
    columnIds: string[];
    /**
     * The latest ETag for the column.
     */
    eTag: string;
    /**
     * Gets the identifier of the next column.
     */
    nextColumnId: string;
}

/**
 * Describes a list of columns to create on a board.
 */
export interface BoardColumnCreateList {
    /**
     * New columns.
     */
    columns: BoardColumnBase[];
    /**
     * Next column identifier or supported directive: $first or $last.
     */
    nextColumnId: string;
}

/**
 * INTERNAL. Event that is fired when a column is deleted.
 */
export interface BoardColumnDeletedRealtimeEvent extends RealtimeBoardEvent {
    /**
     * Gets the column identifier.
     */
    columnId: string;
}

/**
 * Response for board column actions.
 */
export interface BoardColumnResponse {
    /**
     * The resulting BoardColumn.
     */
    column: BoardColumn;
    /**
     * The last change date and time for all the columns in the collection.
     */
    eTag: string[];
}

/**
 * Describes a column to update on a board.
 */
export interface BoardColumnUpdate extends BoardColumnCreate {
    /**
     * Name of the column.
     */
    name: string;
}

/**
 * INTERNAL. Event that is fired when a column is updated.
 */
export interface BoardColumnUpdatedRealtimeEvent extends RealtimeBoardEvent {
    /**
     * Gets the column identifier.
     */
    columnId: string;
    /**
     * The latest ETag for the column.
     */
    eTag: string;
    /**
     * Gets the identifier of the next column.
     */
    nextColumnId: string;
}

/**
 * Provides properties that describe an item in a board.
 */
export interface BoardItem extends BoardItemReference {
    /**
     * Links to other related objects.
     */
    _links: any;
    /**
     * Board id for this item.
     */
    boardId: number;
    /**
     * Board column id for this item.
     */
    columnId: string;
    /**
     * Next board item id.
     */
    nextId: string;
    /**
     * Board row id for this item.
     */
    rowId: string;
    /**
     * Error that occurred related to the source data for this item.
     */
    sourceErrorMessages: string[];
    /**
     * Indicates whether a change has occurred requiring a refresh of the source data for this item.
     */
    sourceRefreshRequired: boolean;
}

/**
 * Describe the action to apply when an item is moved to a column and the specified condition is met.
 */
export interface BoardItemAction extends PredicateAndAction {
    /**
     * Action Id.
     */
    id: string;
    /**
     * Item type.
     */
    itemType: string;
}

/**
 * Describes a board item action to create on a board.
 */
export interface BoardItemActionCreate extends PredicateAndAction {
    /**
     * Item Type.
     */
    itemType: string;
}

/**
 * Describes a board item action to update on a board.
 */
export interface BoardItemActionUpdate {
    /**
     * Action to execute. e.g. Change state
     */
    action: string;
    /**
     * Condition to meet before applying action.
     */
    predicate: string;
}

/**
 * INTERNAL. Event that is fired when a board item is added.
 */
export interface BoardItemAddedRealtimeEvent extends RealtimeBoardEvent {
    /**
     * The column id where the item was added.
     */
    columnId: string;
    /**
     * The latest eTag for the item.
     */
    eTag: string;
    /**
     * The id of the added item.
     */
    id: string;
    /**
     * The id of the added item
     */
    itemSourceId: string;
    /**
     * The type of the added item
     */
    itemType: string;
    /**
     * The id of the next item in the list.
     */
    nextId: string;
    /**
     * The row id where the item was added.
     */
    rowId: string;
}

/**
 * Data to perform an operation on a batch of board items.
 */
export interface BoardItemBatchOperation {
    /**
     * The data needed to perform the operation. This is optional based on the type of the operation.
     */
    data: UpdateBoardItem;
    /**
     * The list of items with etags to perform the operation on.
     */
    items: BoardItemIdAndEtag[];
    /**
     * Operation to perform.
     */
    operation: BoardItemBatchOperationTypeEnum;
}

/**
 * Describes board item batch operation types.
 */
export enum BoardItemBatchOperationTypeEnum {
    /**
     * Move a batch of items to a different location. The order of the items is implicit in the list of items and a single location is specified.
     */
    Reorder = 1
}

/**
 * Response collection for board items actions.
 */
export interface BoardItemCollectionResponse {
    /**
     * Links to other related objects.
     */
    _links: any;
    /**
     * The resulting collection of BoardItem.
     */
    items: BoardItem[];
}

/**
 * Board Item id and etag pair.
 */
export interface BoardItemIdAndEtag {
    /**
     * Board Item's etag.
     */
    eTag: string;
    /**
     * Board Item's id.
     */
    id: string;
}

/**
 * INTERNAL. Event that is fired when a board item moves.
 */
export interface BoardItemMovedRealtimeEvent extends RealtimeBoardEvent {
    /**
     * The column id where the item was moved.
     */
    columnId: string;
    /**
     * The latest eTag for the items.
     */
    eTag: string;
    /**
     * The ids of the moved item.
     */
    ids: string[];
    /**
     * The id of the next item in the list.
     */
    nextId: string;
    /**
     * The row id where the item was moved.
     */
    rowId: string;
}

export interface BoardItemReference extends BoardItemSourceIdAndType {
    /**
     * Board item identifier. Unique for each item in the board.
     */
    id: string;
    /**
     * Full http link to the resource.
     */
    url: string;
}

/**
 * INTERNAL. Event that is fired when a board item is removed.
 */
export interface BoardItemRemovedRealtimeEvent extends RealtimeBoardEvent {
    /**
     * The id of the removed item.
     */
    id: string;
}

/**
 * Provides a response for board item actions.
 */
export interface BoardItemResponse {
    /**
     * The last changed date for the board item.
     */
    eTag: string[];
    /**
     * The resulting BoardItem.
     */
    item: BoardItem;
}

/**
 * Provides properties that describe an item's source identifier and type in a board.
 */
export interface BoardItemSourceIdAndType {
    /**
     * Item id.
     */
    itemSourceId: string;
    /**
     * Item type.
     */
    itemType: string;
}

/**
 * Describe a two way sync from moving item on board OR from changing state of item outside of the board.
 */
export interface BoardItemStateSync extends SubTypeAndStateValue {
    /**
     * Sync Id.
     */
    id: string;
    /**
     * Item type.
     */
    itemType: string;
}

/**
 * Describes a board item state sync to create on a board.
 */
export interface BoardItemStateSyncCreate extends SubTypeAndStateValue {
    /**
     * The Item type.
     */
    itemType: string;
}

/**
 * Describes a board item state sync to update on a board.
 */
export interface BoardItemStateSyncUpdate {
    /**
     * The state value that will be synced to.
     */
    stateValue: string;
    /**
     * The sub-type that will be set for sync, for example, 'User Story' for work item.
     */
    subType: string;
}

export interface BoardReference extends EntityReference {
    /**
     * Id of the resource.
     */
    id: number;
}

/**
 * Response for board column actions.
 */
export interface BoardResponse {
    /**
     * The resulting Board.
     */
    board: Board;
    /**
     * The last date and time the board was changed.
     */
    eTag: string[];
}

/**
 * Provides properties that describe a row in a board.
 */
export interface BoardRow extends BoardRowBase {
    /**
     * Links to other related objects.
     */
    _links: any;
    /**
     * Id of the resource.
     */
    id: string;
    /**
     * Next row identifier.
     */
    nextRowId: string;
    /**
     * Full http link to the resource.
     */
    url: string;
}

/**
 * Provides properties that describe a row in a board.
 */
export interface BoardRowBase {
    /**
     * Row name.
     */
    name: string;
}

/**
 * Response collection for board row actions.
 */
export interface BoardRowCollectionResponse {
    /**
     * Links to other related objects.
     */
    _links: any;
    /**
     * The resulting collection of BoardRow.
     */
    rows: BoardRow[];
}

/**
 * Describes a row to create on a board.
 */
export interface BoardRowCreate extends BoardRowBase {
    /**
     * Next row identifier or supported directive: $first or $last.
     */
    nextRowId: string;
}

/**
 * Describes a list of rows to create on a board.
 */
export interface BoardRowCreateList {
    /**
     * Next row identifier or supported directive: $first or $last.
     */
    nextRowId: string;
    /**
     * New rows.
     */
    rows: BoardRowBase[];
}

/**
 * Response for board row actions.
 */
export interface BoardRowResponse {
    /**
     * The last change date and time for all the rows in the collection.
     */
    eTag: string[];
    /**
     * The resulting collection of BoardRow.
     */
    row: BoardRow;
}

/**
 * Describes a row to update on a board.
 */
export interface BoardRowUpdate extends BoardRowCreate {
}

export enum BoardTypeEnum {
    IdBoundBoard = 1,
    QueryBoundBoard = 2,
    KanbanBoard = 3,
    TaskBoard = 4
}

export interface CreateBoard {
    /**
     * Description of the board.
     */
    description: string;
    /**
     * Name of the board to create.
     */
    name: string;
}

export interface EntityReference {
    /**
     * Name of the resource.
     */
    name: string;
    /**
     * Full http link to the resource.
     */
    url: string;
}

export interface NewBoardItem extends BoardItemSourceIdAndType {
    /**
     * Board column identifier.
     */
    columnId: string;
    /**
     * Next board item id or supported directive: $first or $last.
     */
    nextId: string;
    /**
     * Board row identifier.
     */
    rowId: string;
}

/**
 * Response containing ETag header with no content
 */
export interface NoContentResponse {
    /**
     * The place holder to stop genclient from creating invalid client code
     */
    data: any;
    /**
     * The last change date and time for all the rows/columns in the collection.
     */
    eTag: string[];
}

export interface PredicateAndAction {
    /**
     * Action to execute. e.g. Change state
     */
    action: string;
    /**
     * Condition to meet before applying action.
     */
    predicate: string;
}

/**
 * Base type for real time board events. All board events should inherit from this class.
 */
export interface RealtimeBoardEvent {
    /**
     * The Board ID of the event
     */
    boardId: number;
    /**
     * A unique ID for events, used for logging and tracing.
     */
    eventId: string;
    /**
     * The Project ID of the board.
     */
    projectId: string;
    /**
     * The type of this event, so the client can disambiguate
     */
    type: string;
}

export interface SubTypeAndStateValue {
    /**
     * The state value that will be synced to.
     */
    stateValue: string;
    /**
     * The sub-type that will be set for sync, for example, 'User Story' for work item.
     */
    subType: string;
}

export interface UpdateBoard {
    /**
     * New description of the board.
     */
    description: string;
    /**
     * New name of the board.
     */
    name: string;
}

export interface UpdateBoardItem {
    /**
     * Board column identifier.
     */
    columnId: string;
    /**
     * Next board item id or supported directive: $first or $last.
     */
    nextId: string;
    /**
     * Board row identifier.
     */
    rowId: string;
}

/**
 * List of items to update in the board.
 */
export interface UpdateBoardItemList extends UpdateBoardItem {
    /**
     * List of items by id and etag.
     */
    items: BoardItemIdAndEtag[];
}
