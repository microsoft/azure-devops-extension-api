/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import Boards = require("../Boards/Boards");

export class BoardsRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "11635d5f-a4f9-43ea-a48b-d56be43fee0f";

    /**
     * Add a new board for the project.
     * 
     * @param postedBoard - Board definition.
     * @param project - Project ID or project name
     */
    public async createBoard(
        postedBoard: Boards.CreateBoard,
        project: string
        ): Promise<Boards.BoardResponse> {

        return this.beginRequest<Boards.BoardResponse>({
            apiVersion: "5.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/boards/boards/{id}",
            routeValues: {
                project: project
            },
            body: postedBoard
        });
    }

    /**
     * Deletes a board.
     * 
     * @param project - Project ID or project name
     * @param id - Board identifier.
     */
    public async deleteBoard(
        project: string,
        id: number
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "5.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/boards/boards/{id}",
            routeValues: {
                project: project,
                id: id
            }
        });
    }

    /**
     * Returns information for a board given its unique identifier.
     * 
     * @param project - Project ID or project name
     * @param id - Board's unique identifier.
     */
    public async getBoard(
        project: string,
        id: number
        ): Promise<Boards.BoardResponse> {

        return this.beginRequest<Boards.BoardResponse>({
            apiVersion: "5.1-preview.1",
            routeTemplate: "{project}/_apis/boards/boards/{id}",
            routeValues: {
                project: project,
                id: id
            }
        });
    }

    /**
     * Get boards.
     * 
     * @param project - Project ID or project name
     * @param top - The maximum number of boards to get.
     * @param skip - The number of boards to skip.
     */
    public async getBoards(
        project: string,
        top?: number,
        skip?: number
        ): Promise<Boards.BoardReference[]> {

        const queryValues: any = {
            '$top': top,
            '$skip': skip
        };

        return this.beginRequest<Boards.BoardReference[]>({
            apiVersion: "5.1-preview.1",
            routeTemplate: "{project}/_apis/boards/boards/{id}",
            routeValues: {
                project: project
            },
            queryParams: queryValues
        });
    }

    /**
     * Updates a board.
     * 
     * @param updatedBoard - New board data.
     * @param project - Project ID or project name
     * @param id - Id of the board to update.
     * @param eTag - Board Latest Changed Date
     */
    public async updateBoard(
        updatedBoard: Boards.UpdateBoard,
        project: string,
        id: number,
        eTag: String
        ): Promise<Boards.BoardResponse> {

        return this.beginRequest<Boards.BoardResponse>({
            apiVersion: "5.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/boards/boards/{id}",
            routeValues: {
                project: project,
                id: id
            },
            customHeaders: {
                "ETag": eTag,
            },
            body: updatedBoard
        });
    }

    /**
     * Creates a new column on a board.
     * 
     * @param boardColumn - Column data.
     * @param project - Project ID or project name
     * @param board - Board identifier.
     */
    public async createBoardColumn(
        boardColumn: Boards.BoardColumnCreate,
        project: string,
        board: number
        ): Promise<Boards.BoardColumnResponse> {

        return this.beginRequest<Boards.BoardColumnResponse>({
            apiVersion: "5.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/boards/boards/{board}/columns/{id}",
            routeValues: {
                project: project,
                board: board
            },
            body: boardColumn
        });
    }

    /**
     * Deletes a column from a board.
     * 
     * @param project - Project ID or project name
     * @param board - Board identifier.
     * @param id - Column identifier.
     * @param forceRemoveItems - Boolean indicating if items are to be force removed during the column delete.
     */
    public async deleteBoardColumn(
        project: string,
        board: number,
        id: string,
        forceRemoveItems: boolean
        ): Promise<void> {

        const queryValues: any = {
            forceRemoveItems: forceRemoveItems
        };

        return this.beginRequest<void>({
            apiVersion: "5.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/boards/boards/{board}/columns/{id}",
            routeValues: {
                project: project,
                board: board,
                id: id
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets column data for a board given its identifier.
     * 
     * @param project - Project ID or project name
     * @param board - Board identifier.
     * @param id - Column identifier.
     */
    public async getBoardColumn(
        project: string,
        board: number,
        id: string
        ): Promise<Boards.BoardColumnResponse> {

        return this.beginRequest<Boards.BoardColumnResponse>({
            apiVersion: "5.1-preview.1",
            routeTemplate: "{project}/_apis/boards/boards/{board}/columns/{id}",
            routeValues: {
                project: project,
                board: board,
                id: id
            }
        });
    }

    /**
     * Get columns in a board.
     * 
     * @param project - Project ID or project name
     * @param board - Board identifier.
     */
    public async getBoardColumns(
        project: string,
        board: number
        ): Promise<Boards.BoardColumnCollectionResponse> {

        return this.beginRequest<Boards.BoardColumnCollectionResponse>({
            apiVersion: "5.1-preview.1",
            routeTemplate: "{project}/_apis/boards/boards/{board}/columns/{id}",
            routeValues: {
                project: project,
                board: board
            }
        });
    }

    /**
     * Updates a board column.
     * 
     * @param boardColumn - Column data.
     * @param project - Project ID or project name
     * @param board - Board identifier.
     * @param id - Column identifier.
     * @param eTag - Column Latest Changed Date
     */
    public async updateBoardColumn(
        boardColumn: Boards.BoardColumnUpdate,
        project: string,
        board: number,
        id: string,
        eTag: String
        ): Promise<Boards.BoardColumnResponse> {

        return this.beginRequest<Boards.BoardColumnResponse>({
            apiVersion: "5.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/boards/boards/{board}/columns/{id}",
            routeValues: {
                project: project,
                board: board,
                id: id
            },
            customHeaders: {
                "ETag": eTag,
            },
            body: boardColumn
        });
    }

    /**
     * Adds a single item to a board.
     * 
     * @param item - Item to add to the board.
     * @param project - Project ID or project name
     * @param board - Board identifier.
     */
    public async addBoardItem(
        item: Boards.NewBoardItem,
        project: string,
        board: number
        ): Promise<Boards.BoardItemResponse> {

        return this.beginRequest<Boards.BoardItemResponse>({
            apiVersion: "5.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/boards/boards/{board}/items/{*id}",
            routeValues: {
                project: project,
                board: board
            },
            body: item
        });
    }

    /**
     * Gets data for a single board's item.
     * 
     * @param project - Project ID or project name
     * @param board - Board identifier.
     * @param id - Item identifier.
     */
    public async getBoardItem(
        project: string,
        board: number,
        id: string
        ): Promise<Boards.BoardItemResponse> {

        return this.beginRequest<Boards.BoardItemResponse>({
            apiVersion: "5.1-preview.1",
            routeTemplate: "{project}/_apis/boards/boards/{board}/items/{*id}",
            routeValues: {
                project: project,
                board: board,
                id: id
            }
        });
    }

    /**
     * Get items information for a board given its identifier.
     * 
     * @param project - Project ID or project name
     * @param board - Board identifier.
     */
    public async getBoardItems(
        project: string,
        board: number
        ): Promise<Boards.BoardItemCollectionResponse> {

        return this.beginRequest<Boards.BoardItemCollectionResponse>({
            apiVersion: "5.1-preview.1",
            routeTemplate: "{project}/_apis/boards/boards/{board}/items/{*id}",
            routeValues: {
                project: project,
                board: board
            }
        });
    }

    /**
     * Removes an item from a board.
     * 
     * @param project - Project ID or project name
     * @param board - Board identifier.
     * @param id - Board Item identifier to remove.
     */
    public async removeBoardItem(
        project: string,
        board: number,
        id: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "5.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/boards/boards/{board}/items/{*id}",
            routeValues: {
                project: project,
                board: board,
                id: id
            }
        });
    }

    /**
     * Updates a single item in a board.
     * 
     * @param updateItemDef - Updated item data.
     * @param project - Project ID or project name
     * @param board - Board identifier.
     * @param id - Update item id.
     * @param eTag - Item Latest Changed Date
     */
    public async updateBoardItem(
        updateItemDef: Boards.UpdateBoardItem,
        project: string,
        board: number,
        id: string,
        eTag: String
        ): Promise<Boards.BoardItemResponse> {

        return this.beginRequest<Boards.BoardItemResponse>({
            apiVersion: "5.1-preview.1",
            method: "PUT",
            routeTemplate: "{project}/_apis/boards/boards/{board}/items/{*id}",
            routeValues: {
                project: project,
                board: board,
                id: id
            },
            customHeaders: {
                "ETag": eTag,
            },
            body: updateItemDef
        });
    }

    /**
     * Do an operation on a batch of items.
     * 
     * @param batchRequest - Data defining the batch operation.
     * @param project - Project ID or project name
     * @param board - The id of the board containing the items.
     */
    public async updateBoardItems(
        batchRequest: Boards.BoardItemBatchOperation,
        project: string,
        board: number
        ): Promise<Boards.BoardItemCollectionResponse> {

        return this.beginRequest<Boards.BoardItemCollectionResponse>({
            apiVersion: "5.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/boards/boards/{board}/itemsbatch",
            routeValues: {
                project: project,
                board: board
            },
            body: batchRequest
        });
    }

    /**
     * Creates a new row on a board.
     * 
     * @param boardRow - Row data.
     * @param project - Project ID or project name
     * @param board - Board identifier.
     */
    public async createBoardRow(
        boardRow: Boards.BoardRowCreate,
        project: string,
        board: number
        ): Promise<Boards.BoardRowResponse> {

        return this.beginRequest<Boards.BoardRowResponse>({
            apiVersion: "5.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/boards/boards/{board}/rows/{id}",
            routeValues: {
                project: project,
                board: board
            },
            body: boardRow
        });
    }

    /**
     * Deletes a row from a board.
     * 
     * @param project - Project ID or project name
     * @param board - Board identifier.
     * @param id - Row identifier.
     * @param forceRemoveItems - Boolean indicating if items are to be force removed during the row delete.
     */
    public async deleteBoardRow(
        project: string,
        board: number,
        id: string,
        forceRemoveItems: boolean
        ): Promise<void> {

        const queryValues: any = {
            forceRemoveItems: forceRemoveItems
        };

        return this.beginRequest<void>({
            apiVersion: "5.1-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/boards/boards/{board}/rows/{id}",
            routeValues: {
                project: project,
                board: board,
                id: id
            },
            queryParams: queryValues
        });
    }

    /**
     * Gets a row given its identifier and board.
     * 
     * @param project - Project ID or project name
     * @param board - Board identifier.
     * @param id - Board row identifier.
     */
    public async getBoardRow(
        project: string,
        board: number,
        id: string
        ): Promise<Boards.BoardRowResponse> {

        return this.beginRequest<Boards.BoardRowResponse>({
            apiVersion: "5.1-preview.1",
            routeTemplate: "{project}/_apis/boards/boards/{board}/rows/{id}",
            routeValues: {
                project: project,
                board: board,
                id: id
            }
        });
    }

    /**
     * Get rows in a board given its identifier.
     * 
     * @param project - Project ID or project name
     * @param board - Board identifier.
     */
    public async getBoardRows(
        project: string,
        board: number
        ): Promise<Boards.BoardRowCollectionResponse> {

        return this.beginRequest<Boards.BoardRowCollectionResponse>({
            apiVersion: "5.1-preview.1",
            routeTemplate: "{project}/_apis/boards/boards/{board}/rows/{id}",
            routeValues: {
                project: project,
                board: board
            }
        });
    }

    /**
     * Updates a board row.
     * 
     * @param boardRow - Row data.
     * @param project - Project ID or project name
     * @param board - Board identifier.
     * @param id - Row identifier.
     * @param eTag - Row Latest Changed Date
     */
    public async updateBoardRow(
        boardRow: Boards.BoardRowUpdate,
        project: string,
        board: number,
        id: string,
        eTag: String
        ): Promise<Boards.BoardRowResponse> {

        return this.beginRequest<Boards.BoardRowResponse>({
            apiVersion: "5.1-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/_apis/boards/boards/{board}/rows/{id}",
            routeValues: {
                project: project,
                board: board,
                id: id
            },
            customHeaders: {
                "ETag": eTag,
            },
            body: boardRow
        });
    }

    /**
     * Creates a new sync for a column on a board.
     * 
     * @param boardSync - 
     * @param project - Project ID or project name
     * @param board - 
     * @param column - 
     */
    public async createBoardSyncAction(
        boardSync: Boards.BoardItemStateSyncCreate,
        project: string,
        board: number,
        column: string
        ): Promise<Boards.BoardItemStateSync> {

        return this.beginRequest<Boards.BoardItemStateSync>({
            apiVersion: "5.1-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/boards/boards/{board}/columns/{column}/syncActions/{id}",
            routeValues: {
                project: project,
                board: board,
                column: column
            },
            body: boardSync
        });
    }

}
