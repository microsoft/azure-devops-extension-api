/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import * as FormInput from "../FormInput/FormInput";
import * as Notification from "../Notification/Notification";
import * as ServiceHooks from "../ServiceHooks/ServiceHooks";

export class ServiceHooksRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    /**
     * Get details about a specific consumer action.
     * 
     * @param consumerId - ID for a consumer.
     * @param consumerActionId - ID for a consumerActionId.
     * @param publisherId - 
     */
    public async getConsumerAction(
        consumerId: string,
        consumerActionId: string,
        publisherId?: string
        ): Promise<ServiceHooks.ConsumerAction> {

        const queryValues: any = {
            publisherId: publisherId
        };

        return this.beginRequest<ServiceHooks.ConsumerAction>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/hooks/consumers/{consumerId}/Actions/{consumerActionId}",
            routeValues: {
                consumerId: consumerId,
                consumerActionId: consumerActionId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a list of consumer actions for a specific consumer.
     * 
     * @param consumerId - ID for a consumer.
     * @param publisherId - 
     */
    public async listConsumerActions(
        consumerId: string,
        publisherId?: string
        ): Promise<ServiceHooks.ConsumerAction[]> {

        const queryValues: any = {
            publisherId: publisherId
        };

        return this.beginRequest<ServiceHooks.ConsumerAction[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/hooks/consumers/{consumerId}/Actions/{consumerActionId}",
            routeValues: {
                consumerId: consumerId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a specific consumer service. Optionally filter out consumer actions that do not support any event types for the specified publisher.
     * 
     * @param consumerId - ID for a consumer.
     * @param publisherId - 
     */
    public async getConsumer(
        consumerId: string,
        publisherId?: string
        ): Promise<ServiceHooks.Consumer> {

        const queryValues: any = {
            publisherId: publisherId
        };

        return this.beginRequest<ServiceHooks.Consumer>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/hooks/Consumers/{consumerId}",
            routeValues: {
                consumerId: consumerId
            },
            queryParams: queryValues
        });
    }

    /**
     * Get a list of available service hook consumer services. Optionally filter by consumers that support at least one event type from the specific publisher.
     * 
     * @param publisherId - 
     */
    public async listConsumers(
        publisherId?: string
        ): Promise<ServiceHooks.Consumer[]> {

        const queryValues: any = {
            publisherId: publisherId
        };

        return this.beginRequest<ServiceHooks.Consumer[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/hooks/Consumers/{consumerId}",
            queryParams: queryValues
        });
    }

    /**
     * @param subscriptionId - 
     */
    public async getSubscriptionDiagnostics(
        subscriptionId: string
        ): Promise<Notification.SubscriptionDiagnostics> {

        return this.beginRequest<Notification.SubscriptionDiagnostics>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/hooks/subscriptions/{subscriptionId}/diagnostics",
            routeValues: {
                subscriptionId: subscriptionId
            }
        });
    }

    /**
     * @param updateParameters - 
     * @param subscriptionId - 
     */
    public async updateSubscriptionDiagnostics(
        updateParameters: Notification.UpdateSubscripitonDiagnosticsParameters,
        subscriptionId: string
        ): Promise<Notification.SubscriptionDiagnostics> {

        return this.beginRequest<Notification.SubscriptionDiagnostics>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/hooks/subscriptions/{subscriptionId}/diagnostics",
            routeValues: {
                subscriptionId: subscriptionId
            },
            body: updateParameters
        });
    }

    /**
     * Get a specific event type.
     * 
     * @param publisherId - ID for a publisher.
     * @param eventTypeId - 
     */
    public async getEventType(
        publisherId: string,
        eventTypeId: string
        ): Promise<ServiceHooks.EventTypeDescriptor> {

        return this.beginRequest<ServiceHooks.EventTypeDescriptor>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/hooks/publishers/{publisherId}/EventTypes/{eventTypeId}",
            routeValues: {
                publisherId: publisherId,
                eventTypeId: eventTypeId
            }
        });
    }

    /**
     * Get the event types for a specific publisher.
     * 
     * @param publisherId - ID for a publisher.
     */
    public async listEventTypes(
        publisherId: string
        ): Promise<ServiceHooks.EventTypeDescriptor[]> {

        return this.beginRequest<ServiceHooks.EventTypeDescriptor[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/hooks/publishers/{publisherId}/EventTypes/{eventTypeId}",
            routeValues: {
                publisherId: publisherId
            }
        });
    }

    /**
     * Publish an external event.
     * 
     * @param publisherId - 
     * @param channelId - 
     */
    public async publishExternalEvent(
        publisherId: string,
        channelId?: string
        ): Promise<ServiceHooks.PublisherEvent[]> {

        const queryValues: any = {
            publisherId: publisherId,
            channelId: channelId
        };

        return this.beginRequest<ServiceHooks.PublisherEvent[]>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/public/hooks/ExternalEvents",
            queryParams: queryValues
        });
    }

    /**
     * Get a specific notification for a subscription.
     * 
     * @param subscriptionId - ID for a subscription.
     * @param notificationId - 
     */
    public async getNotification(
        subscriptionId: string,
        notificationId: number
        ): Promise<ServiceHooks.Notification> {

        return this.beginRequest<ServiceHooks.Notification>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/hooks/subscriptions/{subscriptionId}/Notifications/{notificationId}",
            routeValues: {
                subscriptionId: subscriptionId,
                notificationId: notificationId
            }
        });
    }

    /**
     * Get a list of notifications for a specific subscription. A notification includes details about the event, the request to and the response from the consumer service.
     * 
     * @param subscriptionId - ID for a subscription.
     * @param maxResults - Maximum number of notifications to return. Default is **100**.
     * @param status - Get only notifications with this status.
     * @param result - Get only notifications with this result type.
     */
    public async getNotifications(
        subscriptionId: string,
        maxResults?: number,
        status?: ServiceHooks.NotificationStatus,
        result?: ServiceHooks.NotificationResult
        ): Promise<ServiceHooks.Notification[]> {

        const queryValues: any = {
            maxResults: maxResults,
            status: status,
            result: result
        };

        return this.beginRequest<ServiceHooks.Notification[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/hooks/subscriptions/{subscriptionId}/Notifications/{notificationId}",
            routeValues: {
                subscriptionId: subscriptionId
            },
            queryParams: queryValues
        });
    }

    /**
     * Query for notifications. A notification includes details about the event, the request to and the response from the consumer service.
     * 
     * @param query - 
     */
    public async queryNotifications(
        query: ServiceHooks.NotificationsQuery
        ): Promise<ServiceHooks.NotificationsQuery> {

        return this.beginRequest<ServiceHooks.NotificationsQuery>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/hooks/NotificationsQuery",
            body: query
        });
    }

    /**
     * @param inputValuesQuery - 
     * @param publisherId - 
     */
    public async queryInputValues(
        inputValuesQuery: FormInput.InputValuesQuery,
        publisherId: string
        ): Promise<FormInput.InputValuesQuery> {

        return this.beginRequest<FormInput.InputValuesQuery>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/hooks/publishers/{publisherId}/inputValuesQuery",
            routeValues: {
                publisherId: publisherId
            },
            body: inputValuesQuery
        });
    }

    /**
     * Get a specific service hooks publisher.
     * 
     * @param publisherId - ID for a publisher.
     */
    public async getPublisher(
        publisherId: string
        ): Promise<ServiceHooks.Publisher> {

        return this.beginRequest<ServiceHooks.Publisher>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/hooks/Publishers/{publisherId}",
            routeValues: {
                publisherId: publisherId
            }
        });
    }

    /**
     * Get a list of publishers.
     * 
     */
    public async listPublishers(
        ): Promise<ServiceHooks.Publisher[]> {

        return this.beginRequest<ServiceHooks.Publisher[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/hooks/Publishers/{publisherId}"
        });
    }

    /**
     * Query for service hook publishers.
     * 
     * @param query - 
     */
    public async queryPublishers(
        query: ServiceHooks.PublishersQuery
        ): Promise<ServiceHooks.PublishersQuery> {

        return this.beginRequest<ServiceHooks.PublishersQuery>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/hooks/PublishersQuery",
            body: query
        });
    }

    /**
     * Create a subscription.
     * 
     * @param subscription - Subscription to be created.
     */
    public async createSubscription(
        subscription: ServiceHooks.Subscription
        ): Promise<ServiceHooks.Subscription> {

        return this.beginRequest<ServiceHooks.Subscription>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/hooks/Subscriptions/{subscriptionId}",
            body: subscription
        });
    }

    /**
     * Delete a specific service hooks subscription.
     * 
     * @param subscriptionId - ID for a subscription.
     */
    public async deleteSubscription(
        subscriptionId: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "7.1-preview.1",
            method: "DELETE",
            routeTemplate: "_apis/hooks/Subscriptions/{subscriptionId}",
            routeValues: {
                subscriptionId: subscriptionId
            }
        });
    }

    /**
     * Get a specific service hooks subscription.
     * 
     * @param subscriptionId - ID for a subscription.
     */
    public async getSubscription(
        subscriptionId: string
        ): Promise<ServiceHooks.Subscription> {

        return this.beginRequest<ServiceHooks.Subscription>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/hooks/Subscriptions/{subscriptionId}",
            routeValues: {
                subscriptionId: subscriptionId
            }
        });
    }

    /**
     * Get a list of subscriptions.
     * 
     * @param publisherId - ID for a subscription.
     * @param eventType - The event type to filter on (if any).
     * @param consumerId - ID for a consumer.
     * @param consumerActionId - ID for a consumerActionId.
     */
    public async listSubscriptions(
        publisherId?: string,
        eventType?: string,
        consumerId?: string,
        consumerActionId?: string
        ): Promise<ServiceHooks.Subscription[]> {

        const queryValues: any = {
            publisherId: publisherId,
            eventType: eventType,
            consumerId: consumerId,
            consumerActionId: consumerActionId
        };

        return this.beginRequest<ServiceHooks.Subscription[]>({
            apiVersion: "7.1-preview.1",
            routeTemplate: "_apis/hooks/Subscriptions/{subscriptionId}",
            queryParams: queryValues
        });
    }

    /**
     * Update a subscription. \<param name="subscriptionId"\>ID for a subscription that you wish to update.\</param\>
     * 
     * @param subscription - 
     * @param subscriptionId - 
     */
    public async replaceSubscription(
        subscription: ServiceHooks.Subscription,
        subscriptionId?: string
        ): Promise<ServiceHooks.Subscription> {

        return this.beginRequest<ServiceHooks.Subscription>({
            apiVersion: "7.1-preview.1",
            method: "PUT",
            routeTemplate: "_apis/hooks/Subscriptions/{subscriptionId}",
            routeValues: {
                subscriptionId: subscriptionId
            },
            body: subscription
        });
    }

    /**
     * Query for service hook subscriptions.
     * 
     * @param query - 
     */
    public async createSubscriptionsQuery(
        query: ServiceHooks.SubscriptionsQuery
        ): Promise<ServiceHooks.SubscriptionsQuery> {

        return this.beginRequest<ServiceHooks.SubscriptionsQuery>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/hooks/SubscriptionsQuery",
            body: query
        });
    }

    /**
     * Sends a test notification. This is useful for verifying the configuration of an updated or new service hooks subscription.
     * 
     * @param testNotification - 
     * @param useRealData - Only allow testing with real data in existing subscriptions.
     */
    public async createTestNotification(
        testNotification: ServiceHooks.Notification,
        useRealData?: boolean
        ): Promise<ServiceHooks.Notification> {

        const queryValues: any = {
            useRealData: useRealData
        };

        return this.beginRequest<ServiceHooks.Notification>({
            apiVersion: "7.1-preview.1",
            method: "POST",
            routeTemplate: "_apis/hooks/TestNotifications/{notificationId}",
            queryParams: queryValues,
            body: testNotification
        });
    }

}
