/**
 * Contribution ids of core DevOps services which can be obtained from DevOps.getService
 */
export const enum CommonServiceIds {

    /**
     * Service for interacting with the extension data service
     */
    ExtensionDataService = "ms.vss-features.extension-data-service",

    /**
     * Service for showing global message banners at the top of the page
     */
    GlobalMessagesService = "ms.vss-tfs-web.tfs-global-messages-service",

    /**
     * Service for interacting with the host window's navigation (URLs, new windows, etc.)
     */
    HostNavigationService = "ms.vss-features.host-navigation-service",

    /**
     * Service for interacting with the layout of the page: managing full-screen mode,
     * opening dialogs and panels
     */
    HostPageLayoutService = "ms.vss-features.host-page-layout-service",

    /**
     * Service for getting URLs/locations from the host context
     */
    LocationService = "ms.vss-features.location-service",

    /**
     * Exposes project-related information from the current page
     */
    ProjectPageService = "ms.vss-tfs-web.tfs-page-data-service"
}

/**
 * Route information for the current page
 */
export interface IPageRoute {
    /**
     * Id of the contributed route
     */
    id: string;

    /**
     * The route values that were specified in the request
     */
    routeValues: { [key: string]: string };
}

/**
 * Information about a displayed navigation element
 */
export interface INavigationElement {
    /**
     * Unique id of the displayed navigation
     */
    id: string;

    /**
     * Name of the displayed navigation
     */
    name?: string;

    /**
     * Type of the navigation element
     */
    type: string;
}

/**
 * Service for interacting with the host window's navigation (URLs, new windows, etc.)
 */
export interface IHostNavigationService {

    /**
     * Gets the current hash.
     */
    getHash(): Promise<string>;

    /**
     * Gets the set of navigation elements (like hubs and hub groups) selected on the current page.
     */
    getPageNavigationElements(): Promise<INavigationElement[]>;

    /**
     * Gets information about the route that was matched for the current page
     */
    getPageRoute(): Promise<IPageRoute>;

    /**
     * Gets the current set of query parameters in the host page's URL.
     */
    getQueryParams(): Promise<{ [key: string]: string }>;

    /**
     * Navigate the parent page to the specified url
     *
     * @param url Url to navigate to
     */
    navigate(url: string): void;

    /**
     * Add a callback to be invoked each time the hash navigation has changed
     *
     * @param callback Method invoked on each navigation hash change
     */
    onHashChanged(callback: (hash: string) => void): void;

    /**
     * Open a new window to the specified url
     *
     * @param url Url of the new window
     * @param features Comma-separated list of features/specs sent as the 3rd parameter to window.open. For example: "height=400,width=400".
     */
    openNewWindow(url: string, features: string): void;

    /**
     * Reloads the parent frame
     */
    reload(): void;

    /**
     * Replace existing hash with the provided hash from the hosted content.
     */
    replaceHash(hash: string): void;

    /**
     * Update the host document's title (appears as the browser tab title).
     *
     * @param title The new title of the window
     */
    setDocumentTitle(title: string): void;

    /**
     * Sets the provided hash from the hosted content.
     */
    setHash(hash: string): void;

    /**
     * Sets one or more query parameters on the host page
     *
     * @param parameters Dictionary of query string parameters to add, update, or remove (pass an empty value to remove)
     */
    setQueryParams(parameters: { [key: string]: string }): void;
}

/**
 * Host level for a VSS service
 */
export const enum TeamFoundationHostType {
    /**
     * The Deployment host
     */
    Deployment = 1,

    /**
     * The Enterprise host
     */
    Enterprise = 2,

    /**
     * The organization/project collection host
     */
    Organization = 4
}

/**
 * Service for external content to get locations
 */
export interface ILocationService {

    /**
     * Gets the URL for the given REST resource area 
     * 
     * @param resourceAreaId - Id of the resource area
     */
    getResourceAreaLocation(resourceAreaId: string): Promise<string>;

    /**
     * Gets the location of a remote service at a given host type.
     *
     * @param serviceInstanceType - The GUID of the service instance type to lookup
     * @param hostType - The host type to lookup (defaults to the host type of the current page data)
     */
    getServiceLocation(serviceInstanceType?: string, hostType?: TeamFoundationHostType): Promise<string>;

    /**
     * Attemps to create a url for the specified route template and paramaters.  The url will include host path.
     * For example, if the page url is https://dev.azure.com/foo and you try to create admin settings url for project "bar",
     * the output will be /foo/bar/_admin.
     * 
     * This will asynchronously fetch a route contribution if it has not been included in page data.
     * 
     * @param routeId - Id of the route contribution
     * @param routeValues - Route value replacements
     * @param hostPath - Optional host path to use rather than the default host path for the page.
     */
    routeUrl(routeId: string, routeValues?: { [key: string]: string }, hostPath?: string): Promise<string>;
}

/**
 * Options for showing host dialogs
 */
export interface IDialogOptions<TResult> {

    /**
     * Dialog title
     */
    title?: string;

    /**
     * Callback invoked when the dialog is closed
     */
    onClose?: (result: TResult | undefined) => void;

    /**
     * Optional initial configuration for the dialog content
     */
    configuration?: any;

    /**
     * If true, clicking outside the dialog closes it
     * @default true
     */
    lightDismiss?: boolean;
}

/**
 * Options for showing a message dialog
 */
export interface IMessageDialogOptions extends IDialogOptions<boolean> {

    /**
     * If true, show the cancel button
     */
    showCancel?: boolean;

    /**
     * Custom text for the OK button
     */
    okText?: string;

    /**
     * Custom text for the Cancel button
     */
    cancelText?: string;
}

/**
 * Size (width) options for panel
 */
export const enum PanelSize {
    Small = 0,
    Medium = 1,
    Large = 2,
}

/**
 * Options for showing panels
 */
export interface IPanelOptions<TResult> {

    /**
     * Callback invoked when the dialog is closed
     */
    onClose?: (result: TResult | undefined) => void;

    /**
     * The panel title you want to display.
     */
    title?: string;

    /**
     * Optional, description of panel.
     */
    description?: string;

    /**
     * Size of the panel. (defaults to PanelSize.Medium)
     */
    size?: PanelSize;

    /**
     * Optional initial configuration for the panel content
     */
    configuration?: any;
}

/**
 * Service for interacting with the layout of the page: managing full-screen mode,
 * opening dialogs and panels
 */
export interface IHostPageLayoutService {

    /**
     * Gets whether the page is currently in full screen mode
     */
    getFullScreenMode(): Promise<boolean>;

    /**
     * Open a dialog in the host frame, showing custom external content
     * 
     * @param contentContributionId - Id of the dialog content contribution that specifies the content to display in the dialog.
     * @param options - Dialog options
     */
    openCustomDialog: <TResult>(contentContributionId: string, options?: IDialogOptions<TResult>) => void;

    /**
     * Open a dialog in the host frame, showing the specified text message, an OK and optional Cancel button
     * 
     * @param message - Dialog message text
     * @param options - Dialog options
     */
    openMessageDialog: (message: string, options?: IMessageDialogOptions) => void;

    /**
     * Open a panel in the host frame, showing custom external content
     * 
     * @param contentContributionId - Id of the panel content contribution that specifies the content to display in the panel.
     * @param options - Panel display options
     */
    openPanel: <TResult>(contentContributionId: string, options: IPanelOptions<TResult>) => void;

    /**
     * Enter or exit full screen mode
     *
     * @param fullScreenMode True to enter full-screen mode, false to exit.
     */
    setFullScreenMode(fullScreenMode: boolean): void;
}

/**
* Interface for options that can be supplied with document actions
*/
export interface IDocumentOptions {

    /**
    * The scope of where the document is stored. Can be Default or User.
    */
    scopeType?: string;

    /**
    * The value of the scope where the document is stored. Can be Current or Me.
    */
    scopeValue?: string;

    /**
    * The default value to return when using getValue(). If the document has no value,
    * this value will be used instead.
    */
    defaultValue?: any;
}

/**
 * Represents a single collection for extension data documents
 */
export interface ExtensionDataCollection {
    /**
     * The name of the collection
     */
    collectionName: string;
    /**
     * A list of documents belonging to the collection
     */
    documents: any[];
    /**
     * The type of the collection's scope, such as Default or User
     */
    scopeType: string;
    /**
     * The value of the collection's scope, such as Current or Me
     */
    scopeValue: string;
}

export interface IExtensionDataManager {

    /**
    * Returns a promise for retrieving a setting at the provided key and scope
    *
    * @param key - The key to retrieve a value for
    * @param documentOptions - Extension document options, the default scope value is account-wide
    */
    getValue<T>(key: string, documentOptions?: IDocumentOptions): Promise<T>;

    /**
    * Returns a promise for saving a setting at the provided key and scope
    *
    * @param key - The key to save a value for
    * @param value - The value to save
    * @param documentOptions - Extension document options, the default scope value is account-wide
    */
    setValue<T>(key: string, value: T, documentOptions?: IDocumentOptions): Promise<T>;

    /**
    * Returns a promise for getting a document with the provided id in the provided collection
    *
    * @param collectionName - The name of the collection where the document lives
    * @param id - The id of the document in the collection
    * @param documentOptions - Extension document options, the default scope value is account-wide
    */
    getDocument(collectionName: string, id: string, documentOptions?: IDocumentOptions): Promise<any>;

    /**
    * Returns a promise for getting all of the documents in the provided collection
    *
    * @param collectionName - The name of the collection where the document lives
    * @param documentOptions - Extension document options, the default scope value is account-wide
    */
    getDocuments(collectionName: string, documentOptions?: IDocumentOptions): Promise<any[]>;

    /**
    * Returns a promise for creating a document in the provided collection
    *
    * @param collectionName - The name of the collection where the document lives
    * @param doc - The document to store
    * @param documentOptions - Extension document options, the default scope value is account-wide
    */
    createDocument(collectionName: string, doc: any, documentOptions?: IDocumentOptions): Promise<any>;

    /**
    * Returns a promise for setting a document in the provided collection
    * Creates the document if it does not exist, otherwise updates the existing document with the id provided
    *
    * @param collectionName - The name of the collection where the document lives
    * @param doc - The document to store
    * @param documentOptions - Extension document options, the default scope value is account-wide
    */
    setDocument(collectionName: string, doc: any, documentOptions?: IDocumentOptions): Promise<any>;

    /**
    * Returns a promise for updating a document in the provided collection
    * A document with the id provided must exist
    *
    * @param collectionName - The name of the collection where the document lives
    * @param doc - The document to store
    * @param documentOptions - Extension document options, the default scope value is account-wide
    */
    updateDocument(collectionName: string, doc: any, documentOptions?: IDocumentOptions): Promise<any>;

    /**
    * Returns a promise for deleting the document at the provided scope, collection and id
    *
    * @param collectionName - The name of the collection where the document lives
    * @param id - The id of the document in the collection
    * @param documentOptions - Extension document options, the default scope value is account-wide
    */
    deleteDocument(collectionName: string, id: string, documentOptions?: IDocumentOptions): Promise<void>;

    /**
    * Returns a promise for querying a set of collections
    *
    * @param collections - The list of collections to query. Assumes Default Scope Type and Current Scope Value
    */
    queryCollectionsByName(collectionNames: string[]): Promise<ExtensionDataCollection[]>;

    /**
    * Returns a promise for querying a set of collections
    *
    * @param collections - The list of collections to query. Each collection will contain its collectionName, scopeType, and scopeValue
    */
    queryCollections(collections: ExtensionDataCollection[]): Promise<ExtensionDataCollection[]>;
}

export interface IExtensionDataService {

    /**
     * Gets a class that can be used to manage extension data.
     * 
     * @param extensionId - Id of the extension (publisher.extension)
     * @param accessToken - Access token to use for the extension
     */
    getExtensionDataManager(extensionId: string, accessToken: string): Promise<IExtensionDataManager>;
}

export interface IProjectInfo {

    /**
     * Unique identifier (GUID) of the project
     */
    id: string;

    /**
     * Name of the project
     */
    name: string;
}

export interface IProjectPageService {

    /**
     * Gets the project associated with the current page
     */
    getProject(): Promise<IProjectInfo | undefined>;
}

/**
 * Definition which can be specified in a contributions "icon" property which can specify a set of values for different themes.
 */
export interface IContributedIconDefinition {
    /**
     * Icon property (absolute url or relative asset path) to use when the current theme is a "light" theme.
     */
    light: string;

    /**
     * Icon property (absolute url or relative asset path) to use when the current theme is a "dark" theme.
     */
    dark: string;
}

/**
 * Defines a button from a first- or third- party contribution
 */
export interface IContributedButton {
    /**
     * The id of a command contribution to execute when the button is clicked
     */
    command?: string;

    /**
     * Optional arugments to pass when invoking the supplied command
     */
    commandArguments?: any[];

    /**
     * Id of the contribution that the button was defined in (optional, used to resolve relative icon URLs)
     */
    contributionId?: string;

    /**
     * If true, the button cannot be interacted with.
     */
    disabled?: boolean;

    /**
     * Href to navigate to when the button is clicked.  Pass in if this is a link button.
     */
    href?: string;

    /**
     * Either a url (relative or fully qualified) or an IContributedIconDefinition with
     * urls for light and dark themes. This allows the caller to use different styles of
     * icons based on the theme type.
     */
    icon?: string | IContributedIconDefinition;

    /**
     * Set to true if this button should be styled with a primary color.
     */
    primary?: boolean;

    /**
     * Optional,context in which the linked resource will open.
     */
    target?: string;

    /**
     * Text to render inside the button.
     */
    text?: string;

    /**
     * Optional value to use as an aria-label and tooltip for the button.
     */
    tooltip?: string;
}

/**
 * Message links that will be formatted into the message.
 */
export interface IGlobalMessageLink {

    /**
     * Hyperlink text
     */
    name: string;

    /**
     * Url of the link target
     */
    href: string;
}

/**
 * Optional help icon info to show after global message text
 */
export interface IGlobalMessageHelpInfo {
    /**
     * If supplied the help icon will act as a hyperlink to the specified target href
     */
    href?: string;

    /**
     * If supplied, hovering/focusing the help icon will show the given tooltip text
     */
    tooltip?: string;
}

/**
 * The severity of the message.
 */
export const enum MessageBannerLevel {
    info = 0,
    warning = 1,
    error = 2,
    success = 3
}

/**
 * Banner Props specifying how it will be rendered by the service
 */
export interface IGlobalMessageBanner {
    /**
     * Buttons to display after the message
     */
    buttons?: IContributedButton[];

    /**
     * Custom icon name. Must be an icon in the Azure DevOps icon font.
     */
    customIcon?: string;

    /**
     * Whether or not the message banner is dismissable. If false, do not show the close (X) icon.
     * @default true
     */
    dismissable?: boolean;

    /**
     * Optional "?" icon to show after the message that has a tooltip with more information and/or a hyperlink.
     */
    helpInfo?: IGlobalMessageHelpInfo;

    /**
     * banner level (controls the background and icon of the banner)
     */
    level?: MessageBannerLevel;

    /**
     * Banner message. Ignored if messageFormat is also provided
     */
    message?: string;

    /**
     * Banner message format string. Arguments (like \{0\}, \{1\} are filled in with hyperlinks supplied in messageLinks)
     */
    messageFormat?: string;

    /**
     * Links to supply to the format arguments in `messageFormat`
     */
    messageLinks?: IGlobalMessageLink[];
}

/**
 * Dialog Props specifying how it will be rendered by the service
 */
export interface IGlobalDialog {
    /**
     * Props to pass to buttons in the footer.
     */
    buttonProps?: Array<Object>;

    /**
     * Props to pass to the close button.
     */
    closeButtonProps?: Object;

    /**
     * Props (type: ICustomDialogProps) to pass to the custom contribution.
     */
    contentProperties?: Object;

    /**
     * The id of the custom contribution to host in the dialog. Used to render a customized dialog.
     */
    contributionId?: string;

    /**
     * Optional initial configuration for the contributed content. Used in pair with contributionId.
     */
    contributionConfiguration?: Object;

    /**
     * The text of the dialog message. Ignored if contributionId is specified.
     */
    message?: string;

    /**
     * The format to use to replace links within the message.
     */
    messageFormat?: string;

    /**
     * Links to be formatted into the message.
     */
    messageLinks?: IGlobalMessageLink[];

    /**
     * Method that is called when the dialog is dismissed.
     */
    onDismiss?: () => void;

    /**
     * The priority of the dialog determines if it will be shown over others.
     */
    priority?: number;

    /**
     * The id used to check if the dialog has been dismissed.
     */
    settingId?: string;

    /**
     * The title of the dialog.
     */
    title?: string;
}

/**
 * Toast Props with metadata to specify how it will be rendered by the service
 */
export interface IToast {
    /**
     * Optional text for the Call to Action
     */
    callToAction?: string;

    /**
     * Duration in ms the toast will appear for
     */
    duration: number;

    /**
     * If true, we'll immediately take down any existing toast and display this instead
     * Otherwise, it adds it to an internal queue in the GlobalToast and will display after others in the queue
     */
    forceOverrideExisting?: boolean;

    /**
     * Message to display on the Toast
     */
    message: string;

    /**
     * Optional handler for when the Call to Action is clicked
     */
    onCallToActionClick?: () => void;
}

export interface IGlobalMessagesService {
    /**
     * Adds a new message banner to the displayed banners
     * @param banner - The message banner to display
     */
    addBanner(banner: IGlobalMessageBanner): void;

    /**
     * Adds a new dialog to the displayed dialogs. CornerDialog or CustomDialog can be added
     * @param dialog - The dialog to display
     */
    addDialog(dialog: IGlobalDialog): void;

    /**
     * Displays or queues a Toast to display at the bottom of the page
     * @param toast - The toast to display
     */
    addToast(toast: IToast): void;

    /**
     * Closes the currently active global message banner
     */
    closeBanner(): void;

    /**
     * Closes the currently active global dialog
     */
    closeDialog(): void;
}

/**
 * Color used in some UI components
 */
export interface IColor {
    /**
     * Red coordinate: 0-255
     */
    red: number;

    /**
     * Blue coordinate: 0-255
     */
    blue: number;

    /**
     * Green coordinate: 0-255
     */
    green: number;

    /**
     * Optional color name; may or may not be used by various controls
     */
    name?: string;
}

/**
 * Defines a pill from a contribution
 */
export interface IContributedPill {
    /**
     * Background color for the pill
     * Ignored unless variant is set to Colored
     * If variant is set to Colored and this is not provided, we'll render as Standard and emit a warning to the console
     */
    color?: IColor;

    /**
     * Id of the contribution that the button was defined in (optional, used to resolve relative icon URLs)
     */
    contributionId?: string;

    /**
     * Either a url (relative or fully qualified) or an IContributedIconDefinition with
     * urls for light and dark themes. This allows the caller to use different styles of
     * icons based on the theme type.
     */
    icon?: string | IContributedIconDefinition;

    /**
     * onClick handler for the pill itself
     */
    onClick?: () => void;

    /**
     * Renders the remove button if provided
     * Handler to remove the pill
     */
    onRemoveClick?: () => void;

    /**
     * The text to render inside the pill.
     */
    text: string;

    /**
     * Optional value to use as an aria-label and tooltip for the pill.
     */
    tooltip?: string;
}