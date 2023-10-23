/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as Favorite from "../Favorite/Favorite";

export class FavoriteRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    /**
     * @param faultInMissingHost - 
     */
    public async getFavoriteProviders(
        faultInMissingHost?: boolean
        ): Promise<Favorite.FavoriteProvider[]> {

        const queryValues: any = {
            faultInMissingHost: faultInMissingHost
        };

        return this.beginRequest<Favorite.FavoriteProvider[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Favorite/FavoriteProviders",
            queryParams: queryValues
        });
    }

    /**
     * @param favorite - 
     */
    public async createFavorite(
        favorite: Favorite.FavoriteCreateParameters
        ): Promise<Favorite.Favorite> {

        return this.beginRequest<Favorite.Favorite>({
            apiVersion: "7.2-preview.1",
            method: "POST",
            routeTemplate: "_apis/Favorite/Favorites/{favoriteId}",
            body: favorite
        });
    }

    /**
     * @param favorite - 
     * @param ownerScopeType - 
     * @param ownerScopeId - 
     */
    public async createFavoriteOfOwner(
        favorite: Favorite.FavoriteCreateParameters,
        ownerScopeType: string,
        ownerScopeId: string
        ): Promise<Favorite.Favorite> {

        const queryValues: any = {
            ownerScopeType: ownerScopeType,
            ownerScopeId: ownerScopeId
        };

        return this.beginRequest<Favorite.Favorite>({
            apiVersion: "7.2-preview.1",
            method: "POST",
            routeTemplate: "_apis/Favorite/Favorites/{favoriteId}",
            queryParams: queryValues,
            body: favorite
        });
    }

    /**
     * @param favoriteId - 
     * @param artifactType - 
     * @param artifactScopeType - 
     * @param artifactScopeId - 
     */
    public async deleteFavoriteById(
        favoriteId: string,
        artifactType: string,
        artifactScopeType: string,
        artifactScopeId?: string
        ): Promise<void> {

        const queryValues: any = {
            artifactType: artifactType,
            artifactScopeType: artifactScopeType,
            artifactScopeId: artifactScopeId
        };

        return this.beginRequest<void>({
            apiVersion: "7.2-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/Favorite/Favorites/{favoriteId}",
            routeValues: {
                favoriteId: favoriteId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param favoriteId - 
     * @param ownerScopeType - 
     * @param ownerScopeId - 
     * @param artifactType - 
     * @param artifactScopeType - 
     * @param artifactScopeId - 
     */
    public async deleteFavoriteOfOwnerById(
        favoriteId: string,
        ownerScopeType: string,
        ownerScopeId: string,
        artifactType: string,
        artifactScopeType: string,
        artifactScopeId?: string
        ): Promise<void> {

        const queryValues: any = {
            ownerScopeType: ownerScopeType,
            ownerScopeId: ownerScopeId,
            artifactType: artifactType,
            artifactScopeType: artifactScopeType,
            artifactScopeId: artifactScopeId
        };

        return this.beginRequest<void>({
            apiVersion: "7.2-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/Favorite/Favorites/{favoriteId}",
            routeValues: {
                favoriteId: favoriteId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param artifactType - 
     * @param artifactId - 
     * @param artifactScopeType - 
     * @param artifactScopeId - 
     * @param includeExtendedDetails - 
     */
    public async getFavoriteByArtifact(
        artifactType: string,
        artifactId: string,
        artifactScopeType: string,
        artifactScopeId?: string,
        includeExtendedDetails?: boolean
        ): Promise<Favorite.Favorite> {

        const queryValues: any = {
            artifactType: artifactType,
            artifactId: artifactId,
            artifactScopeType: artifactScopeType,
            artifactScopeId: artifactScopeId,
            includeExtendedDetails: includeExtendedDetails
        };

        return this.beginRequest<Favorite.Favorite>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Favorite/Favorites/{favoriteId}",
            queryParams: queryValues
        });
    }

    /**
     * @param favoriteId - 
     * @param artifactScopeType - 
     * @param artifactType - 
     * @param artifactScopeId - 
     * @param includeExtendedDetails - 
     */
    public async getFavoriteById(
        favoriteId: string,
        artifactScopeType: string,
        artifactType: string,
        artifactScopeId?: string,
        includeExtendedDetails?: boolean
        ): Promise<Favorite.Favorite> {

        const queryValues: any = {
            artifactScopeType: artifactScopeType,
            artifactType: artifactType,
            artifactScopeId: artifactScopeId,
            includeExtendedDetails: includeExtendedDetails
        };

        return this.beginRequest<Favorite.Favorite>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Favorite/Favorites/{favoriteId}",
            routeValues: {
                favoriteId: favoriteId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param favoriteId - 
     * @param ownerScopeType - 
     * @param ownerScopeId - 
     * @param artifactScopeType - 
     * @param artifactType - 
     * @param artifactScopeId - 
     * @param includeExtendedDetails - 
     */
    public async getFavoriteOfOwnerById(
        favoriteId: string,
        ownerScopeType: string,
        ownerScopeId: string,
        artifactScopeType: string,
        artifactType: string,
        artifactScopeId?: string,
        includeExtendedDetails?: boolean
        ): Promise<Favorite.Favorite> {

        const queryValues: any = {
            ownerScopeType: ownerScopeType,
            ownerScopeId: ownerScopeId,
            artifactScopeType: artifactScopeType,
            artifactType: artifactType,
            artifactScopeId: artifactScopeId,
            includeExtendedDetails: includeExtendedDetails
        };

        return this.beginRequest<Favorite.Favorite>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Favorite/Favorites/{favoriteId}",
            routeValues: {
                favoriteId: favoriteId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param artifactType - 
     * @param artifactScopeType - 
     * @param artifactScopeId - 
     * @param includeExtendedDetails - 
     */
    public async getFavorites(
        artifactType?: string,
        artifactScopeType?: string,
        artifactScopeId?: string,
        includeExtendedDetails?: boolean
        ): Promise<Favorite.Favorite[]> {

        const queryValues: any = {
            artifactType: artifactType,
            artifactScopeType: artifactScopeType,
            artifactScopeId: artifactScopeId,
            includeExtendedDetails: includeExtendedDetails
        };

        return this.beginRequest<Favorite.Favorite[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Favorite/Favorites/{favoriteId}",
            queryParams: queryValues
        });
    }

    /**
     * @param ownerScopeType - 
     * @param ownerScopeId - 
     * @param artifactType - 
     * @param artifactScopeType - 
     * @param artifactScopeId - 
     * @param includeExtendedDetails - 
     */
    public async getFavoritesOfOwner(
        ownerScopeType: string,
        ownerScopeId: string,
        artifactType?: string,
        artifactScopeType?: string,
        artifactScopeId?: string,
        includeExtendedDetails?: boolean
        ): Promise<Favorite.Favorite[]> {

        const queryValues: any = {
            ownerScopeType: ownerScopeType,
            ownerScopeId: ownerScopeId,
            artifactType: artifactType,
            artifactScopeType: artifactScopeType,
            artifactScopeId: artifactScopeId,
            includeExtendedDetails: includeExtendedDetails
        };

        return this.beginRequest<Favorite.Favorite[]>({
            apiVersion: "7.2-preview.1",
            routeTemplate: "_apis/Favorite/Favorites/{favoriteId}",
            queryParams: queryValues
        });
    }

}
