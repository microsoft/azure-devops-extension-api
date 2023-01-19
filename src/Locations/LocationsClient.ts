/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as Locations from "../Locations/Locations";
import * as WebApi from "../WebApi/WebApi";

export class LocationsRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    /**
     * This was copied and adapted from TeamFoundationConnectionService.Connect()
     * 
     * @param connectOptions - 
     * @param lastChangeId - Obsolete 32-bit LastChangeId
     * @param lastChangeId64 - Non-truncated 64-bit LastChangeId
     */
    public async getConnectionData(
        connectOptions?: WebApi.ConnectOptions,
        lastChangeId?: number,
        lastChangeId64?: number
        ): Promise<Locations.ConnectionData> {

        const queryValues: any = {
            connectOptions: connectOptions,
            lastChangeId: lastChangeId,
            lastChangeId64: lastChangeId64
        };

        return this.beginRequest<Locations.ConnectionData>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/ConnectionData",
            queryParams: queryValues
        });
    }

    /**
     * @param areaId - 
     * @param enterpriseName - 
     * @param organizationName - 
     */
    public async getResourceArea(
        areaId: string,
        enterpriseName?: string,
        organizationName?: string
        ): Promise<Locations.ResourceAreaInfo> {

        const queryValues: any = {
            enterpriseName: enterpriseName,
            organizationName: organizationName
        };

        return this.beginRequest<Locations.ResourceAreaInfo>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/ResourceAreas/{areaId}",
            routeValues: {
                areaId: areaId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param areaId - 
     * @param hostId - 
     */
    public async getResourceAreaByHost(
        areaId: string,
        hostId: string
        ): Promise<Locations.ResourceAreaInfo> {

        const queryValues: any = {
            hostId: hostId
        };

        return this.beginRequest<Locations.ResourceAreaInfo>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/ResourceAreas/{areaId}",
            routeValues: {
                areaId: areaId
            },
            queryParams: queryValues
        });
    }

    /**
     * @param enterpriseName - 
     * @param organizationName - 
     */
    public async getResourceAreas(
        enterpriseName?: string,
        organizationName?: string
        ): Promise<Locations.ResourceAreaInfo[]> {

        const queryValues: any = {
            enterpriseName: enterpriseName,
            organizationName: organizationName
        };

        return this.beginRequest<Locations.ResourceAreaInfo[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/ResourceAreas/{areaId}",
            queryParams: queryValues
        });
    }

    /**
     * @param hostId - 
     */
    public async getResourceAreasByHost(
        hostId: string
        ): Promise<Locations.ResourceAreaInfo[]> {

        const queryValues: any = {
            hostId: hostId
        };

        return this.beginRequest<Locations.ResourceAreaInfo[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/ResourceAreas/{areaId}",
            queryParams: queryValues
        });
    }

    /**
     * @param serviceType - 
     * @param identifier - 
     */
    public async deleteServiceDefinition(
        serviceType: string,
        identifier: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/ServiceDefinitions/{serviceType}/{identifier}",
            routeValues: {
                serviceType: serviceType,
                identifier: identifier
            }
        });
    }

    /**
     * Finds a given service definition.
     * 
     * @param serviceType - 
     * @param identifier - 
     * @param allowFaultIn - If true, we will attempt to fault in a host instance mapping if in SPS.
     * @param previewFaultIn - If true, we will calculate and return a host instance mapping, but not persist it.
     */
    public async getServiceDefinition(
        serviceType: string,
        identifier: string,
        allowFaultIn?: boolean,
        previewFaultIn?: boolean
        ): Promise<Locations.ServiceDefinition> {

        const queryValues: any = {
            allowFaultIn: allowFaultIn,
            previewFaultIn: previewFaultIn
        };

        return this.beginRequest<Locations.ServiceDefinition>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/ServiceDefinitions/{serviceType}/{identifier}",
            routeValues: {
                serviceType: serviceType,
                identifier: identifier
            },
            queryParams: queryValues
        });
    }

    /**
     * @param serviceType - 
     */
    public async getServiceDefinitions(
        serviceType?: string
        ): Promise<Locations.ServiceDefinition[]> {

        return this.beginRequest<Locations.ServiceDefinition[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/ServiceDefinitions/{serviceType}/{identifier}",
            routeValues: {
                serviceType: serviceType
            }
        });
    }

    /**
     * @param serviceDefinitions - 
     */
    public async updateServiceDefinitions(
        serviceDefinitions: WebApi.VssJsonCollectionWrapperV<Locations.ServiceDefinition[]>
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/ServiceDefinitions/{serviceType}/{identifier}",
            body: serviceDefinitions
        });
    }

}
