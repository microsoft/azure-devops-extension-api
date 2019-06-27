/**
 * Contribution ids of identity services which can be obtained from DevOps.getService
 */
export const enum IdentityServiceIds {
    /**
     * Provides a way to search for identities.
     */
    IdentityService = "ms.vss-features.identity-service"
}


export interface IIdentity {
    entityId: string;
    entityType: string;
    originDirectory: string;
    originId: string;
}

export interface IdentitiesGetConnectionsResponseModel {
    successors?: IIdentity[];
    managers?: IIdentity[];
    directReports?: IIdentity[];
}

export interface IdentitiesSearchRequestModel {
    query: string;
    identityTypes?: string[];
    operationScopes?: string[];
    queryTypeHint?: string;
    pagingToken?: string;
    properties?: string[];
    filterByAncestorEntityIds?: string[];
    filterByEntityIds?: string[];
    options?: any;
}


export interface IVssIdentityService {
    /**
     * Get a list of the Most Recently Used (MRU) identities
     *
     * @returns list of the Most Recently Used (MRU) identities
     */
    getIdentityMruAsync(): Promise<IIdentity[]>;

    /**
     * Given a search request model, return a list of Entities. If the filterIdentity callback is added, additionally filter the values before returning
     *
     * @param query The query to search the identities type with.
     * @param identityTypes The types of identities to search (default "user" and "group")
     * @param operationScopes The scope you would like to search (default "ims", "source")
     * @param queryTypeHint A hint of what property your query is trying to search
     * @param filterIdentity A filter passed in to alter the results of the identities found
     * @param options Additional options to pass into the search
     * @returns The list of filtered identities from the search.
     */
    searchIdentitiesAsync(
        query: string,
        identityTypes?: string[],
        operationScopes?: string[],
        queryTypeHint?: string,
        options?: any,
        filterIdentity?: (returnedEntities: IIdentity[]) => IIdentity[]
    ): Promise<IIdentity[]>;

    /**
     * Add a list of identities to the MRU
     *
     * @param identities list of IdentityRefs to add to the MRU
     * @returns True if the item was added, false otherwise
     */
    addMruIdentitiesAsync(identities: IIdentity[]): Promise<boolean>;

    /**
     * Remove a list of identities from the MRU
     *
     * @param identities list of IdentityRefs to remove from the MRU
     * @returns True if the item was removed, false otherwise
     */
    removeMruIdentitiesAsync(identity: IIdentity[]): Promise<boolean>;

    /**
     * Gets a list of connections for a given identity
     *
     * @param identity Entity to look up connections
     * @returns Connections for the given identity
     */
    getConnections(identity: IIdentity, getDirectReports?: boolean): Promise<IdentitiesGetConnectionsResponseModel>;
}