import { BuildDefinitionReference, BuildReference } from "./Build";

/**
 * Contribution ids of Azure Pipelines services which can be obtained from DevOps.getService
 */
export enum BuildServiceIds {

    /**
     * Service for getting contextual information when on a builds page
     */
    BuildPageDataService = "ms.vss-build-web.build-page-data-service"
}

/**
 * Contextual information for a build page
 */
export interface IBuildPageData {

    /**
     * The currently selected build result when on a build page
     */
    build?: BuildReference;

    /**
     * The currently selected build definition when on a build page
     */
    definition?: BuildDefinitionReference;
}

/**
 * Service for getting contextual information when on a builds page
 */
export interface IBuildPageDataService {

    /**
     * Gets contextual information for a build page
     */
    getBuildPageData(): IBuildPageData | undefined;
}