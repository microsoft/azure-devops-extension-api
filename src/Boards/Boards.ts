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
    boardColumns: BoardColumn[];
    /**
     * The last change date and time for all the columns in the collection.
     */
    eTag: string[];
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
    boardColumn: BoardColumn;
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
    column: string;
    /**
     * Next item unique identifier.
     */
    nextItemUniqueId: string;
    /**
     * Board row id for this item.
     */
    row: string;
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
     * The latest ETag for the item.
     */
    itemETag: string;
    /**
     * The id of the added item
     */
    itemId: string;
    /**
     * The type of the added item
     */
    itemType: string;
    /**
     * The unique id of the added item.
     */
    itemUniqueId: string;
    /**
     * The unique id of the next item in the list.
     */
    nextItemUniqueId: string;
    /**
     * The row id where the item was added.
     */
    rowId: string;
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
    boardItems: BoardItem[];
    /**
     * The last change date and time for all items in the collection.
     */
    eTag: string[];
}

/**
 * Item id and etag pair.
 */
export interface BoardItemIdAndEtag {
    /**
     * Item's etag.
     */
    etag: string;
    /**
     * Item's id.
     */
    itemId: string;
}

/**
 * Provides properties that describe an item's identifier and type in a board.
 */
export interface BoardItemIdAndType {
    /**
     * Item id.
     */
    itemId: string;
    /**
     * Item type.
     */
    itemType: string;
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
     * The latest ETag for the item.
     */
    itemETag: string;
    /**
     * The unique id of the moved item.
     */
    itemUniqueId: string;
    /**
     * The unique id of the next item in the list.
     */
    nextItemUniqueId: string;
    /**
     * The row id where the item was moved.
     */
    rowId: string;
}

export interface BoardItemReference extends BoardItemIdAndType {
    /**
     * Board's unique identifier. Compound identifier generated using the item identifier and item type.
     */
    uniqueId: string;
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
     * The unique id of the moved item.
     */
    itemUniqueId: string;
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
    boardRows: BoardRow[];
    /**
     * The last change date and time for all the rows in the collection.
     */
    eTag: string[];
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
     * The resulting collection of BoardRow.
     */
    boardRow: BoardRow;
    /**
     * The last change date and time for all the rows in the collection.
     */
    eTag: string[];
}

/**
 * Describes a row to update on a board.
 */
export interface BoardRowUpdate extends BoardRowCreate {
}

export const enum BoardTypeEnum {
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

export interface NewBoardItem extends BoardItemIdAndType {
    /**
     * Board column identifier.
     */
    columnId: string;
    /**
     * Next item unique identifier or supported directive: $first or $last.
     */
    nextItemUniqueId: string;
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
     * Next unique item identifier or supported directive: $first or $last.
     */
    nextItemUniqueId: string;
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
