import {  getService } from "azure-devops-extension-sdk";
import { CommonServiceIds, IVssIdentityService, IIdentity, IdentitiesGetConnectionsResponseModel, IdentitiesSearchRequestModel } from "../Common/CommonServices";

export interface IPeoplePickerProvider {
    /**
     * Add identities to the MRU
     * @returns A promise that returns true if successful false otherwise
     */
    addIdentitiesToMRU?: (identities: IIdentity[]) => Promise<boolean>;

    /**
     * Request Entity information given an entityId
     */
    getEntityFromUniqueAttribute: (entityId: string) => IIdentity | PromiseLike<IIdentity>;

    /**
     * If no input is in the search box when clicked, provide a set of identities to show (used for MRU)
     */
    onEmptyInputFocus?: () => IIdentity[] | PromiseLike<IIdentity[]> | null;

    /**
     * Given a list of currently selected items and a filter string, return a list of suggestions to put in the suggestion list
     */
    onFilterIdentities: (filter: string, selectedItems?: IIdentity[]) => IIdentity[] | PromiseLike<IIdentity[]> | null;

    /**
     * Request connection information about a given Entity.
     */
    onRequestConnectionInformation: (entity: IIdentity, getDirectReports?: boolean) => IdentitiesGetConnectionsResponseModel | PromiseLike<IdentitiesGetConnectionsResponseModel>;

    /**
     * Remove identities from the MRU
     * @returns A promise that returns true if successful false otherwise
     */
    removeIdentitiesFromMRU?: (identities: IIdentity[]) => Promise<boolean>;
}

export class PeoplePickerProvider implements IPeoplePickerProvider {
    private identityService: Promise<IVssIdentityService>;

    constructor() {
        this.identityService = getService<IVssIdentityService>(CommonServiceIds.IIVssIdentityService);
    }

    public addIdentitiesToMRU = (identities: IIdentity[]): Promise<boolean> => {
         return this.identityService.then(identityService => {return identityService.addMruIdentitiesAsync(identities);});
    };

    public getEntityFromUniqueAttribute = (entityId: string): IIdentity | PromiseLike<IIdentity> => {
        return this.identityService.then(identityService => {return identityService
            .searchIdentitiesAsync(entityId, ["user"], ["ims", "source"], "uid")
            .then(x => x[0]);});
    };

    public onEmptyInputFocus = (): IIdentity[] | PromiseLike<IIdentity[]> => {
        return this.identityService.then(identityService => {return identityService.getIdentityMruAsync().then(identities => {
            return identities;
        });;});
    }

    public onFilterIdentities = (filter: string, selectedItems?: IIdentity[]): Promise<IIdentity[]> | IIdentity[] => {
        return this._onSearchPersona(filter, selectedItems ? selectedItems : []);
    };

    public onRequestConnectionInformation =  (
        entity: IIdentity,
        getDirectReports?: boolean
    ): IdentitiesGetConnectionsResponseModel | PromiseLike<IdentitiesGetConnectionsResponseModel> => {
        return this.identityService.then(identityService => {return identityService.getConnections(entity, getDirectReports);});
    };

    public removeIdentitiesFromMRU = (identities: IIdentity[]): Promise<boolean> => {
        return this.identityService.then(identityService => {return identityService.removeMruIdentitiesAsync(identities);});
    };

    private _onSearchPersona = (searchText: string, items: IIdentity[]): Promise<IIdentity[]> => {
        const searchRequest: IdentitiesSearchRequestModel = {  query: searchText };
        return this.identityService.then(identityService => {return identityService
            .searchIdentitiesAsync(
                searchRequest.query,
                searchRequest.identityTypes,
                searchRequest.operationScopes,
                searchRequest.queryTypeHint,
                searchRequest.options
            )
            .then((identities: IIdentity[]) => {
                return identities.filter(identity => !items.some(selectedIdentity => selectedIdentity.entityId === identity.entityId));
            });});
    };
}