/**
 * From /Tfs/WebPlatform/Client/TFS/Dashboards/WidgetHelpers.ts
 */

import { CustomSettings, SaveStatus, WidgetStatus, WidgetStatusType } from "./WidgetContracts";

export class WidgetStatusHelper {
    /**
     * method to encapsulate a successful result for a widget loading operation (load, reload, openLightbox etc)
     * @param state any state information to be passed to the initiator of the loading call. 
     * @param title title for the lightbox of a widget when available. 
     * @returns promise encapsulating the status of the widget loading operations. 
     */
    public static Success(state?: string): Promise<WidgetStatus> {
        return Promise.resolve(<WidgetStatus>{
            state: state,
            statusType: WidgetStatusType.Success
        });
    }

    /**
     * method to encapsulate a failed result for a widget loading operation (load, reload, openLightbox etc)
     * @param message message to display as part within the widget error experience. 
     * @param isUserVisible indicates whether the message should be displayed to the user or a generic error message displayed. Defaults to true.
     * @param isRichText indicates whether the message is an html that can be rendered as a rich experience. Defaults to false. Only trusted extensions are 
     * allowed to set this to true. For any 3rd party widgets passing this value as true, it will be ignored. 
     * @returns promise encapsulating the status of the widget loading operations. 
     */
    public static Failure(message: string, isUserVisible: boolean = true, isRichText: boolean = false): Promise<WidgetStatus> {
        return Promise.reject({
            message: message,
            isRichText: isRichText,
            isUserVisible: isUserVisible
        });
    }

    /**
     * method to encapsulate a result for a widget loading operation that results in the widget being in an unconfigured state. 
     * @returns promise encapsulating the status of the widget loading operations. 
     */
    public static Unconfigured(): Promise<WidgetStatus> {
        return Promise.resolve(<WidgetStatus>{
            statusType: WidgetStatusType.Unconfigured
        });
    }
}

export class WidgetConfigurationSave {
    /**
     * method to encapsulate a valid state that is returned by the widget configuration
     * @param customSettings settings from the widget configuration to be returned as part of this state. 
     * @returns promise encapsulating the state being returned.
     */
    public static Valid(customSettings: CustomSettings): Promise<SaveStatus> {
        return Promise.resolve({
            customSettings: customSettings,
            isValid: true
        });
    }

    /**
     * method to encapsulate an invalid state that is returned by the widget configuration
     * @returns promise encapsulating the state being returned.
     */
    public static Invalid(): Promise<SaveStatus> {
        return Promise.reject({
            isValid: false
        });
    }
}

export class WidgetSizeConverter {
    /**
    * Cell width of the grid that is used to draw the widgets, this includes the border around the widget (i.e. this is the size of the div, border included)
    */
    private static CellWidth: number = 160;

    /**
    * Cell height of the grid that is used to draw the widgets, this includes the border around the widget (i.e. this is the size of the div, border included)
    */
    private static CellHeight: number = 160;

    /**
    * Cell gutter width between the cells that is used to draw the widget, this excludes the border around the widget (i.e. this is distance between widgets)
    */
    private static CellMarginWidth: number = 10;

    /**
    * Cell gutter height between the cells that is used to draw the widget, this excludes the border around the widget  (i.e. this is distance between widgets)
    */
    private static CellMarginHeight: number = 10;

    /**
    * Calculates a dimension in pixels, given widget cell size and grid dimensions
    * @returns size in pixels
    */
    private static CalculatePixelSize(cellCount: number, gridCellSize: number, gridMarginSize: number): number {
        //the dimensions of a multi-celled widget are a combination of space of the occupied cells AND the margins between those cells
        var marginCount = cellCount - 1;
        return gridCellSize * cellCount + gridMarginSize * marginCount;
    }

    /**
    * @returns width in pixels for 1x1 widget
    */
    public static GetWidgetWidth(): number {
        return WidgetSizeConverter.CellWidth;
    }

    /**
    * @returns height in pixels for 1x1 widget
    */
    public static GetWidgetHeight(): number {
        return WidgetSizeConverter.CellHeight;
    }

    /**
    * @returns width in pixels for widget gutter
    */
    public static GetWidgetMarginWidth(): number {
        return WidgetSizeConverter.CellMarginWidth;
    }

    /**
    *  @returns height in pixels for widget gutter
    */
    public static GetWidgetMarginHeight(): number {
        return WidgetSizeConverter.CellMarginHeight;
    }
    /**
    * Converts widget column span into pixels
    * @returns width in pixels
    */
    public static ColumnsToPixelWidth(columnSpan: number): number {
        return this.CalculatePixelSize(columnSpan, WidgetSizeConverter.GetWidgetWidth(), WidgetSizeConverter.GetWidgetMarginWidth());
    }

    /**
    * Converts widget row span into pixels
    * @returns height in pixels
    */
    public static RowsToPixelHeight(rowSpan: number): number {
        return this.CalculatePixelSize(rowSpan, WidgetSizeConverter.GetWidgetHeight(), WidgetSizeConverter.GetWidgetMarginHeight());
    }
}
