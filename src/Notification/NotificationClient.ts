/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as Notification from "../Notification/Notification";
import * as WebApi from "../WebApi/WebApi";

export class NotificationRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    /**
     * @param operation - 
     */
    public async performBatchNotificationOperations(
        operation: Notification.BatchNotificationOperation
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/notification/BatchNotificationOperations",
            body: operation
        });
    }

    /**
     * Get a list of diagnostic logs for this service.
     * 
     * @param source - ID specifying which type of logs to check diagnostics for.
     * @param entryId - The ID of the specific log to query for.
     * @param startTime - Start time for the time range to query in.
     * @param endTime - End time for the time range to query in.
     */
    public async listLogs(
        source: string,
        entryId?: string,
        startTime?: Date,
        endTime?: Date
        ): Promise<Notification.INotificationDiagnosticLog[]> {

        const queryValues: any = {
            startTime: startTime,
            endTime: endTime
        };

        return this.beginRequest<Notification.INotificationDiagnosticLog[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/notification/DiagnosticLogs/{source}/entries/{entryId}",
            routeValues: {
                source: source,
                entryId: entryId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get the diagnostics settings for a subscription.
     * 
     * @param subscriptionId - The id of the notifications subscription.
     */
    public async getSubscriptionDiagnostics(
        subscriptionId: string
        ): Promise<Notification.SubscriptionDiagnostics> {

        return this.beginRequest<Notification.SubscriptionDiagnostics>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/notification/subscriptions/{subscriptionId}/diagnostics",
            routeValues: {
                subscriptionId: subscriptionId
            }
        });
    }

    /**
     * Update the diagnostics settings for a subscription.
     * 
     * @param updateParameters - 
     * @param subscriptionId - The id of the notifications subscription.
     */
    public async updateSubscriptionDiagnostics(
        updateParameters: Notification.UpdateSubscripitonDiagnosticsParameters,
        subscriptionId: string
        ): Promise<Notification.SubscriptionDiagnostics> {

        return this.beginRequest<Notification.SubscriptionDiagnostics>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/notification/subscriptions/{subscriptionId}/diagnostics",
            routeValues: {
                subscriptionId: subscriptionId
            },
            body: updateParameters
        });
    }

    /**
     * Publish an event. This request must be directed to the service "extmgmt".
     * 
     * @param notificationEvent - 
     */
    public async publishEvent(
        notificationEvent: WebApi.VssNotificationEvent
        ): Promise<WebApi.VssNotificationEvent> {

        return this.beginRequest<WebApi.VssNotificationEvent>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/notification/Events",
            body: notificationEvent
        });
    }

    /**
     * Tranform a notification event.
     * 
     * @param transformRequest - Object to be transformed.
     */
    public async transformEvent(
        transformRequest: Notification.EventTransformRequest
        ): Promise<Notification.EventTransformResult> {

        return this.beginRequest<Notification.EventTransformResult>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/notification/EventTransforms",
            body: transformRequest
        });
    }

    /**
     * @param inputValuesQuery - 
     * @param eventType - 
     */
    public async queryEventTypes(
        inputValuesQuery: Notification.FieldValuesQuery,
        eventType: string
        ): Promise<Notification.NotificationEventField[]> {

        return this.beginRequest<Notification.NotificationEventField[]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/notification/eventTypes/{eventType}/fieldValuesQuery",
            routeValues: {
                eventType: eventType
            },
            body: inputValuesQuery
        });
    }

    /**
     * Get a specific event type.
     * 
     * @param eventType - The ID of the event type.
     */
    public async getEventType(
        eventType: string
        ): Promise<Notification.NotificationEventType> {

        return this.beginRequest<Notification.NotificationEventType>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/notification/EventTypes/{eventType}",
            routeValues: {
                eventType: eventType
            }
        });
    }

    /**
     * List available event types for this service. Optionally filter by only event types for the specified publisher.
     * 
     * @param publisherId - Limit to event types for this publisher
     */
    public async listEventTypes(
        publisherId?: string
        ): Promise<Notification.NotificationEventType[]> {

        const queryValues: any = {
            publisherId: publisherId
        };

        return this.beginRequest<Notification.NotificationEventType[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/notification/EventTypes/{eventType}",
            queryParams: queryValues
        });
    }

    /**
     * @param notificationId - 
     */
    public async getNotificationReasons(
        notificationId: number
        ): Promise<Notification.NotificationReason> {

        return this.beginRequest<Notification.NotificationReason>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/notification/NotificationReasons/{notificationId}",
            routeValues: {
                notificationId: notificationId
            }
        });
    }

    /**
     * @param notificationIds - 
     */
    public async listNotificationReasons(
        notificationIds?: number
        ): Promise<Notification.NotificationReason[]> {

        const queryValues: any = {
            notificationIds: notificationIds
        };

        return this.beginRequest<Notification.NotificationReason[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/notification/NotificationReasons/{notificationId}",
            queryParams: queryValues
        });
    }

    /**
     */
    public async getSettings(
        ): Promise<Notification.NotificationAdminSettings> {

        return this.beginRequest<Notification.NotificationAdminSettings>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/notification/Settings"
        });
    }

    /**
     * @param updateParameters - 
     */
    public async updateSettings(
        updateParameters: Notification.NotificationAdminSettingsUpdateParameters
        ): Promise<Notification.NotificationAdminSettings> {

        return this.beginRequest<Notification.NotificationAdminSettings>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/notification/Settings",
            body: updateParameters
        });
    }

    /**
     * Get delivery preferences of a notifications subscriber.
     * 
     * @param subscriberId - ID of the user or group.
     */
    public async getSubscriber(
        subscriberId: string
        ): Promise<Notification.NotificationSubscriber> {

        return this.beginRequest<Notification.NotificationSubscriber>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/notification/Subscribers/{subscriberId}",
            routeValues: {
                subscriberId: subscriberId
            }
        });
    }

    /**
     * Update delivery preferences of a notifications subscriber.
     * 
     * @param updateParameters - 
     * @param subscriberId - ID of the user or group.
     */
    public async updateSubscriber(
        updateParameters: Notification.NotificationSubscriberUpdateParameters,
        subscriberId: string
        ): Promise<Notification.NotificationSubscriber> {

        return this.beginRequest<Notification.NotificationSubscriber>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/notification/Subscribers/{subscriberId}",
            routeValues: {
                subscriberId: subscriberId
            },
            body: updateParameters
        });
    }

    /**
     * Query for subscriptions. A subscription is returned if it matches one or more of the specified conditions.
     * 
     * @param subscriptionQuery - 
     */
    public async querySubscriptions(
        subscriptionQuery: Notification.SubscriptionQuery
        ): Promise<Notification.NotificationSubscription[]> {

        return this.beginRequest<Notification.NotificationSubscription[]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/notification/SubscriptionQuery",
            body: subscriptionQuery
        });
    }

    /**
     * Create a new subscription.
     * 
     * @param createParameters - 
     */
    public async createSubscription(
        createParameters: Notification.NotificationSubscriptionCreateParameters
        ): Promise<Notification.NotificationSubscription> {

        return this.beginRequest<Notification.NotificationSubscription>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/notification/Subscriptions/{subscriptionId}",
            body: createParameters
        });
    }

    /**
     * Delete a subscription.
     * 
     * @param subscriptionId - 
     */
    public async deleteSubscription(
        subscriptionId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/notification/Subscriptions/{subscriptionId}",
            routeValues: {
                subscriptionId: subscriptionId
            }
        });
    }

    /**
     * Get a notification subscription by its ID.
     * 
     * @param subscriptionId - 
     * @param queryFlags - 
     */
    public async getSubscription(
        subscriptionId: string,
        queryFlags?: Notification.SubscriptionQueryFlags
        ): Promise<Notification.NotificationSubscription> {

        const queryValues: any = {
            queryFlags: queryFlags
        };

        return this.beginRequest<Notification.NotificationSubscription>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/notification/Subscriptions/{subscriptionId}",
            routeValues: {
                subscriptionId: subscriptionId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a list of notification subscriptions, either by subscription IDs or by all subscriptions for a given user or group.
     * 
     * @param targetId - User or Group ID
     * @param ids - List of subscription IDs
     * @param queryFlags - 
     */
    public async listSubscriptions(
        targetId?: string,
        ids?: string[],
        queryFlags?: Notification.SubscriptionQueryFlags
        ): Promise<Notification.NotificationSubscription[]> {

        const queryValues: any = {
            targetId: targetId,
            ids: ids && ids.join(","),
            queryFlags: queryFlags
        };

        return this.beginRequest<Notification.NotificationSubscription[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/notification/Subscriptions/{subscriptionId}",
            queryParams: queryValues
        });
    }

    /**
     * Update an existing subscription. Depending on the type of subscription and permissions, the caller can update the description, filter settings, channel (delivery) settings and more.
     * 
     * @param updateParameters - 
     * @param subscriptionId - 
     */
    public async updateSubscription(
        updateParameters: Notification.NotificationSubscriptionUpdateParameters,
        subscriptionId: string
        ): Promise<Notification.NotificationSubscription> {

        return this.beginRequest<Notification.NotificationSubscription>({
            apiVersion: "7.1-preview.1",
            method: "PATCH",
            routeTemplate: "_apis/notification/Subscriptions/{subscriptionId}",
            routeValues: {
                subscriptionId: subscriptionId
            },
            body: updateParameters
        });
    }

    /**
     * Get available subscription templates.
     * 
     */
    public async getSubscriptionTemplates(
        ): Promise<Notification.NotificationSubscriptionTemplate[]> {

        return this.beginRequest<Notification.NotificationSubscriptionTemplate[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/notification/SubscriptionTemplates"
        });
    }

    /**
     * Publish an event. This request is only for the Token service since it's a deploy only service.
     * 
     * @param notificationEvent - 
     */
    public async publishTokenEvent(
        notificationEvent: WebApi.VssNotificationEvent
        ): Promise<WebApi.VssNotificationEvent> {

        return this.beginRequest<WebApi.VssNotificationEvent>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/notification/TokenNotificationEvent",
            body: notificationEvent
        });
    }

    /**
     * Update the specified user's settings for the specified subscription. This API is typically used to opt in or out of a shared subscription. User settings can only be applied to shared subscriptions, like team subscriptions or default subscriptions.
     * 
     * @param userSettings - 
     * @param subscriptionId - 
     * @param userId - ID of the user
     */
    public async updateSubscriptionUserSettings(
        userSettings: Notification.SubscriptionUserSettings,
        subscriptionId: string,
        userId: string
        ): Promise<Notification.SubscriptionUserSettings> {

        return this.beginRequest<Notification.SubscriptionUserSettings>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/notification/Subscriptions/{subscriptionId}/UserSettings/{userId}",
            routeValues: {
                subscriptionId: subscriptionId,
                userId: userId
            },
            body: userSettings
        });
    }

}
