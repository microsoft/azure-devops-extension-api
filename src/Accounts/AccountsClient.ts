/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as Accounts from "../Accounts/Accounts";

export class AccountsRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "0d55247a-1c47-4462-9b1f-5e2125590ee6";

    /**
     * @param info - 
     * @param usePrecreated - 
     */
    public async createAccount(
        info: Accounts.AccountCreateInfoInternal,
        usePrecreated?: boolean
        ): Promise<Accounts.Account> {

        const queryValues: any = {
            usePrecreated: usePrecreated
        };

        return this.beginRequest<Accounts.Account>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/Accounts/{accountId}",
            queryParams: queryValues,
            body: info
        });
    }

    /**
     * @param accountId - 
     */
    public async getAccount(
        accountId: string
        ): Promise<Accounts.Account> {

        return this.beginRequest<Accounts.Account>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/Accounts/{accountId}",
            routeValues: {
                accountId: accountId
            }
        });
    }

    /**
     * Get a list of accounts for a specific owner or a specific member. One of the following parameters is required: ownerId, memberId.
     * 
     * @param ownerId - ID for the owner of the accounts.
     * @param memberId - ID for a member of the accounts.
     * @param properties - 
     */
    public async getAccounts(
        ownerId?: string,
        memberId?: string,
        properties?: string
        ): Promise<Accounts.Account[]> {

        const queryValues: any = {
            ownerId: ownerId,
            memberId: memberId,
            properties: properties
        };

        return this.beginRequest<Accounts.Account[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/Accounts/{accountId}",
            queryParams: queryValues
        });
    }

}
