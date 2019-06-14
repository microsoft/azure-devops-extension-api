import { GitVersionDescriptor, TfvcVersionDescriptor } from "./Git";

/**
 * Extensions to the code editor should implement this interface, which will be called when the exension is loaded.
 */
export interface ICodeEditorContribution {
    register(editorEndpoints: ICodeEditorContributionEndpoints): void;
}

export type ResourceChangedCallback = (resource: IResource) => void;

/**
 * These functions will be made available to extensions to interact with the code editor.
 */
export interface ICodeEditorContributionEndpoints {
    /** 
     * Get a resource URI for the specified resource.
     */
    getResourceUriFromResourceVersion(version: IResourceVersion): Promise<string>;

    /**
     * Get resource version from specified resource URI.
     */
    getResourceVersion(uri: string): Promise<IResourceVersion>;

    /**
     * Get the list of currently registered JSON schemas.
     */
    getJsonSchemas(): Promise<IJsonSchemaRegistration[]>;
    
    /**
     * Register a callback to be informed when a change happens to the current resource:
     *  - a new file is loaded
     *  - the user edits the file in the web UI
     *  - the detected language changes (ie after an extension registered a new language, and the file was detected to have that language)
     */
    onResourceChanged(callback: ResourceChangedCallback): void;

    /**
     * Register a language with the code editor.
     */
    registerLanguage(registration: ILanguageRegistration): void;

    /**
     * Register schemas with the code editor's built-in JSON language
     */
    registerJsonSchemas(schemas: IJsonSchemaRegistration[]): void;
}

export interface IResource {
    uri: string;
    getValue(): Promise<string>;
    languageId: string;
    versionInfo: IResourceVersion;
}

export type IResourceVersion = IGitResourceVersion | ITfvcResourceVersion;

/**
 * Identifies a file in Git.
 */
export interface IGitResourceVersion {
    repositoryId: string;
    versionControlType: "git";
    version: GitVersionDescriptor;
    path: string;
}

export type VersionControlType = "git" | "tfvc";

/**
 * Identifies a file in TFVC.
 */
export interface ITfvcResourceVersion {
    versionControlType: "tfvc";
    version: TfvcVersionDescriptor;
    path: string;
}

/**
 * Everything needed to register a language.
 * See https://github.com/Microsoft/monaco-languages/ for examples.
 */
export interface ILanguageRegistration {
    extensionPoint: ILanguageExtensionPoint;
    configuration: LanguageConfiguration;
    monarchLanguage: IMonarchLanguage;
}

/**
 * Describes a JSON schema
 */
export interface IJsonSchemaRegistration {
    /**
     * URI of the schema
     */
    uri: string;
    /**
     * File patterns the schema applies to.
     * @example ["tsconfig.json"]
     * @example ["*.myschema.json"]
     */
    fileMatch?: string[];
    /**
     * The JSON schema.
     * See https://github.com/Microsoft/vscode-json-languageservice/blob/master/src/jsonSchema.ts
     */
    schema?: any;
}

/** 
 * A monaco language extension point.
 * See https://github.com/Microsoft/monaco-editor/blob/master/monaco.d.ts
 */
export interface ILanguageExtensionPoint {
    id: string;
    extensions?: string[];
    filenames?: string[];
    filenamePatterns?: string[];
    firstLine?: string;
    aliases?: string[];
    mimetypes?: string[];
    configuration?: string;
}

/**
 * A Monarch language definition
 */
export interface IMonarchLanguage {
    // See https://microsoft.github.io/monaco-editor/monarch.html for the complete spec
}

 /**
 * Describes how comments for a language work.
 */
export interface CommentRule {
    /**
     * The line comment token, like `// this is a comment`
     */
    lineComment?: string;
    /**
     * The block comment character pair, like `/* block comment *&#47;`
     */
    blockComment?: CharacterPair;
}

/**
 * The language configuration interface defines the contract between extensions and
 * various editor features, like automatic bracket insertion, automatic indentation etc.
 */
export interface LanguageConfiguration {
    /**
     * The language's comment settings.
     */
    comments?: CommentRule;
    /**
     * The language's brackets.
     * This configuration implicitly affects pressing Enter around these brackets.
     */
    brackets?: CharacterPair[];
    /**
     * The language's word definition.
     * If the language supports Unicode identifiers (e.g. JavaScript), it is preferable
     * to provide a word definition that uses exclusion of known separators.
     * e.g.: A regex that matches anything except known separators (and dot is allowed to occur in a floating point number):
     *   /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g
     */
    wordPattern?: RegExp;
    /**
     * The language's indentation settings.
     */
    indentationRules?: IndentationRule;
    /**
     * The language's rules to be evaluated when pressing Enter.
     */
    onEnterRules?: OnEnterRule[];
    /**
     * The language's auto closing pairs. The 'close' character is automatically inserted with the
     * 'open' character is typed. If not set, the configured brackets will be used.
     */
    autoClosingPairs?: IAutoClosingPairConditional[];
    /**
     * The language's surrounding pairs. When the 'open' character is typed on a selection, the
     * selected string is surrounded by the open and close characters. If not set, the autoclosing pairs
     * settings will be used.
     */
    surroundingPairs?: IAutoClosingPair[];
    /**
     * The language's folding rules.
     */
    folding?: FoldingRules;
}

/**
 * Describes indentation rules for a language.
 */
export interface IndentationRule {
    /**
     * If a line matches this pattern, then all the lines after it should be unindendented once (until another rule matches).
     */
    decreaseIndentPattern: RegExp;
    /**
     * If a line matches this pattern, then all the lines after it should be indented once (until another rule matches).
     */
    increaseIndentPattern: RegExp;
    /**
     * If a line matches this pattern, then **only the next line** after it should be indented once.
     */
    indentNextLinePattern?: RegExp;
    /**
     * If a line matches this pattern, then its indentation should not be changed and it should not be evaluated against the other rules.
     */
    unIndentedLinePattern?: RegExp;
}

/**
 * Describes language specific folding markers such as '#region' and '#endregion'.
 * The start and end regexes will be tested against the contents of all lines and must be designed efficiently:
 * - the regex should start with '^'
 * - regexp flags (i, g) are ignored
 */
export interface FoldingMarkers {
    start: RegExp;
    end: RegExp;
}

/**
 * Describes folding rules for a language.
 */
export interface FoldingRules {
    /**
     * Used by the indentation based strategy to decide wheter empty lines belong to the previous or the next block.
     * A language adheres to the off-side rule if blocks in that language are expressed by their indentation.
     * See [wikipedia](https://en.wikipedia.org/wiki/Off-side_rule) for more information.
     * If not set, `false` is used and empty lines belong to the previous block.
     */
    offSide?: boolean;
    /**
     * Region markers used by the language.
     */
    markers?: FoldingMarkers;
}

/**
 * Describes a rule to be evaluated when pressing Enter.
 */
export interface OnEnterRule {
    /**
     * This rule will only execute if the text before the cursor matches this regular expression.
     */
    beforeText: RegExp;
    /**
     * This rule will only execute if the text after the cursor matches this regular expression.
     */
    afterText?: RegExp;
    /**
     * The action to execute.
     */
    action: EnterAction;
}

/**
 * Describes what to do when pressing Enter.
 */
export interface EnterAction {
    /**
     * Describe what to do with the indentation.
     */
    indentAction: IndentAction;
    /**
     * Describe whether to outdent current line.
     */
    outdentCurrentLine?: boolean;
    /**
     * Describes text to be appended after the new line and after the indentation.
     */
    appendText?: string;
    /**
     * Describes the number of characters to remove from the new line's indentation.
     */
    removeText?: number;
}

/**
 * Definition of documentation comments (e.g. Javadoc/JSdoc)
 */
export interface IDocComment {
    /**
     * The string that starts a doc comment (e.g. '/**')
     */
    open: string;
    /**
     * The string that appears on the last line and closes the doc comment (e.g. ' * /').
     */
    close: string;
}

/**
 * A tuple of two characters, like a pair of
 * opening and closing brackets.
 */
export type CharacterPair = [string, string];

export interface IAutoClosingPair {
    open: string;
    close: string;
}

export interface IAutoClosingPairConditional extends IAutoClosingPair {
    notIn?: string[];
}

/**
 * Describes what to do with the indentation when pressing Enter.
 */
export enum IndentAction {
    /**
     * Insert new line and copy the previous line's indentation.
     */
    None = 0,
    /**
     * Insert new line and indent once (relative to the previous line's indentation).
     */
    Indent = 1,
    /**
     * Insert two new lines:
     *  - the first one indented which will hold the cursor
     *  - the second one at the same indentation level
     */
    IndentOutdent = 2,
    /**
     * Insert new line and outdent once (relative to the previous line's indentation).
     */
    Outdent = 3,
}
