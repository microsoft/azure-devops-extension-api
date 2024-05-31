/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

/**
 * Represents usage data that includes a count and a limit for a specific aspect.
 */
export interface Usage {
    /**
     * Gets the current count or usage.
     */
    count: number;
    /**
     * Gets the maximum limit or capacity.
     */
    limit: number;
}
