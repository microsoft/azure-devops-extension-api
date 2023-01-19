/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as Profile from "../Profile/Profile";
import * as WebApi from "../WebApi/WebApi";

export class ProfileRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "8ccfef3d-2b87-4e99-8ccb-66e343d2daa8";

    /**
     * @param id - 
     * @param descriptor - 
     */
    public async deleteProfileAttribute(
        id: string,
        descriptor: string
        ): Promise<void> {

        const queryValues: any = {
            descriptor: descriptor
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.2",
            method: "DELETE",
            routeTemplate: "_apis/Profile/Attributes/{id}",
            routeValues: {
                id: id
            },
            queryParams: queryValues
        });
    }

    /**
     * @param id - 
     * @param descriptor - 
     */
    public async getProfileAttribute(
        id: string,
        descriptor: string
        ): Promise<Profile.ProfileAttribute> {

        const queryValues: any = {
            descriptor: descriptor
        };

        return this.beginRequest<Profile.ProfileAttribute>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/Profile/Attributes/{id}",
            routeValues: {
                id: id
            },
            queryParams: queryValues
        });
    }

    /**
     * @param id - 
     * @param partition - 
     * @param modifiedSince - 
     * @param modifiedAfterRevision - 
     * @param withCoreAttributes - 
     * @param coreAttributes - 
     */
    public async getProfileAttributes(
        id: string,
        partition: string,
        modifiedSince?: string,
        modifiedAfterRevision?: string,
        withCoreAttributes?: boolean,
        coreAttributes?: string
        ): Promise<Profile.ProfileAttribute[]> {

        const queryValues: any = {
            partition: partition,
            modifiedSince: modifiedSince,
            modifiedAfterRevision: modifiedAfterRevision,
            withCoreAttributes: withCoreAttributes,
            coreAttributes: coreAttributes
        };

        return this.beginRequest<Profile.ProfileAttribute[]>({
            apiVersion: "7.1-preview.2",
            routeTemplate: "_apis/Profile/Attributes/{id}",
            routeValues: {
                id: id
            },
            queryParams: queryValues
        });
    }

    /**
     * @param container - 
     * @param id - 
     * @param descriptor - 
     */
    public async setProfileAttribute(
        container: any,
        id: string,
        descriptor: string
        ): Promise<void> {

        const queryValues: any = {
            descriptor: descriptor
        };

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.2",
            method: "PUT",
            routeTemplate: "_apis/Profile/Attributes/{id}",
            routeValues: {
                id: id
            },
            queryParams: queryValues,
            body: container
        });
    }

    /**
     * @param attributesCollection - 
     * @param id - 
     */
    public async setProfileAttributes(
        attributesCollection: WebApi.VssJsonCollectionWrapperV<Profile.ProfileAttributeBase<any>[]>,
        id: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.2",
            method: "PATCH",
            routeTemplate: "_apis/Profile/Attributes/{id}",
            routeValues: {
                id: id
            },
            body: attributesCollection
        });
    }

    /**
     * @param id - 
     * @param size - 
     * @param format - 
     */
    public async getAvatar(
        id: string,
        size?: string,
        format?: string
        ): Promise<Profile.Avatar> {

        const queryValues: any = {
            size: size,
            format: format
        };

        return this.beginRequest<Profile.Avatar>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/Profile/Avatar/{id}",
            routeValues: {
                id: id
            },
            queryParams: queryValues
        });
    }

    /**
     * @param container - 
     * @param id - 
     * @param size - 
     * @param format - 
     * @param displayName - 
     */
    public async getAvatarPreview(
        container: any,
        id: string,
        size?: string,
        format?: string,
        displayName?: string
        ): Promise<Profile.Avatar> {

        const queryValues: any = {
            size: size,
            format: format,
            displayName: displayName
        };

        return this.beginRequest<Profile.Avatar>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/Profile/Avatar/{id}",
            routeValues: {
                id: id
            },
            queryParams: queryValues,
            body: container
        });
    }

    /**
     * @param id - 
     */
    public async resetAvatar(
        id: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/Profile/Avatar/{id}",
            routeValues: {
                id: id
            }
        });
    }

    /**
     * @param container - 
     * @param id - 
     */
    public async setAvatar(
        container: any,
        id: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/Profile/Avatar/{id}",
            routeValues: {
                id: id
            },
            body: container
        });
    }

    /**
     * Create profile
     * 
     * @param createProfileContext - Context for profile creation
     * @param autoCreate - Create profile automatically
     */
    public async createProfile(
        createProfileContext: Profile.CreateProfileContext,
        autoCreate?: boolean
        ): Promise<Profile.Profile> {

        const queryValues: any = {
            autoCreate: autoCreate
        };

        return this.beginRequest<Profile.Profile>({
            apiVersion: "7.1-preview.3",
            method: "POST",
            routeTemplate: "_apis/Profile/Profiles/{id}",
            queryParams: queryValues,
            body: createProfileContext
        });
    }

    /**
     * Gets a user profile.
     * 
     * @param id - The ID of the target user profile within the same organization, or 'me' to get the profile of the current authenticated user.
     * @param details - Return public profile information such as display name, email address, country, etc. If false, the withAttributes parameter is ignored.
     * @param withAttributes - If true, gets the attributes (named key-value pairs of arbitrary data) associated with the profile. The partition parameter must also have a value.
     * @param partition - The partition (named group) of attributes to return.
     * @param coreAttributes - A comma-delimited list of core profile attributes to return. Valid values are Email, Avatar, DisplayName, and ContactWithOffers.
     * @param forceRefresh - Not used in this version of the API.
     */
    public async getProfile(
        id: string,
        details?: boolean,
        withAttributes?: boolean,
        partition?: string,
        coreAttributes?: string,
        forceRefresh?: boolean
        ): Promise<Profile.Profile> {

        const queryValues: any = {
            details: details,
            withAttributes: withAttributes,
            partition: partition,
            coreAttributes: coreAttributes,
            forceRefresh: forceRefresh
        };

        return this.beginRequest<Profile.Profile>({
            apiVersion: "7.1-preview.3",
            routeTemplate: "_apis/Profile/Profiles/{id}",
            routeValues: {
                id: id
            },
            queryParams: queryValues
        });
    }

    /**
     * Update profile
     * 
     * @param profile - Update profile
     * @param id - Profile ID
     */
    public async updateProfile(
        profile: Profile.Profile,
        id: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.3",
            method: "PATCH",
            routeTemplate: "_apis/Profile/Profiles/{id}",
            routeValues: {
                id: id
            },
            body: profile
        });
    }

}
